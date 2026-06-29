"""
WordPress REST API sync for VCAIL lab site.

Reads data/*.json and creates/updates standard WordPress posts and pages.
No custom plugin or theme required — works within UNC managed WordPress TOS.

Publications  → standard Posts  (browse at /publications/ = WP posts page)
People        → Page  /people/
Research      → Page  /research/
News          → Page  /news/
Join Us       → Page  /join/
About         → front Page (home)

Usage:
  python sync.py                    # sync everything
  python sync.py --publications     # only publications
  python sync.py --pages            # only static pages
  python sync.py --dry-run          # print what would change, no writes

Required env vars (put in .env or export):
  WP_URL            https://yoursite.unc.edu
  WP_USER           your-onyen
  WP_APP_PASSWORD   xxxx xxxx xxxx xxxx xxxx xxxx   (from WP Admin > Users > Profile)

Optional:
  SYNC_BATCH_SIZE   how many publications to upsert per run (default: all)
  PUBLIC_DIR        path to the project's public/ folder (default: auto-detected)
                    Set this if thumbnails live in a different location, e.g.:
                    PUBLIC_DIR=/Users/you/VisualComputingLabWebsite/public
"""

import json
import mimetypes
import os
import sys
import time
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Allow overriding data/ and public/ dirs when running from a git worktree
# that has different or incomplete data from the main project.
_data_override = os.getenv("DATA_DIR", "")
DATA_DIR = Path(_data_override) if _data_override else BASE_DIR / "data"
CONFIG_FILE = (Path(_data_override).parent if _data_override else BASE_DIR) / "lab.config.json"

_public_override = os.getenv("PUBLIC_DIR", "")
PUBLIC_DIR = Path(_public_override) if _public_override else BASE_DIR / "public"

MEDIA_CACHE_FILE = Path(__file__).parent / ".media-cache.json"
PEOPLE_MEDIA_CACHE_FILE = Path(__file__).parent / ".people-media-cache.json"
RESEARCH_MEDIA_CACHE_FILE = Path(__file__).parent / ".research-media-cache.json"

WP_URL = os.getenv("WP_URL", "").rstrip("/")
WP_USER = os.getenv("WP_USER", "")
WP_APP_PASSWORD = os.getenv("WP_APP_PASSWORD", "")
DRY_RUN = "--dry-run" in sys.argv

ONLY_PUBLICATIONS = "--publications" in sys.argv
ONLY_PAGES = "--pages" in sys.argv
SYNC_ALL = not ONLY_PUBLICATIONS and not ONLY_PAGES


def _check_env():
    missing = [k for k in ("WP_URL", "WP_USER", "WP_APP_PASSWORD") if not os.getenv(k)]
    if missing:
        print(f"✗ Missing env vars: {', '.join(missing)}")
        sys.exit(1)


session = requests.Session()


def _setup_session():
    session.auth = (WP_USER, WP_APP_PASSWORD)
    session.headers.update({"Accept": "application/json"})


def _api(method: str, path: str, **kwargs) -> requests.Response:
    url = f"{WP_URL}/wp-json/wp/v2/{path.lstrip('/')}"
    if DRY_RUN:
        print(f"   [dry-run] {method.upper()} {url}")
        return _FakeResponse()
    r = session.request(method, url, **kwargs)
    if not r.ok:
        print(f"   ✗ {method.upper()} {path} → {r.status_code}: {r.text[:200]}")
    return r


class _FakeResponse:
    ok = True
    status_code = 200

    def json(self):
        return {"id": 0}


# ─────────────────────────────────────────────
# Tag / Category helpers
# ─────────────────────────────────────────────

_tag_cache: dict[str, int] = {}
_cat_cache: dict[str, int] = {}


def _get_or_create_term(name: str, endpoint: str, cache: dict) -> int:
    name = name.strip()
    if name in cache:
        return cache[name]

    r = _api("GET", f"{endpoint}?search={requests.utils.quote(name)}&per_page=20")
    if r.ok:
        for term in (r.json() if isinstance(r.json(), list) else []):
            if term.get("name", "").lower() == name.lower():
                cache[name] = term["id"]
                return term["id"]

    r = _api("POST", endpoint, json={"name": name})
    term_id = r.json().get("id", 0) if r.ok else 0
    cache[name] = term_id
    return term_id


def tag_id(name: str) -> int:
    return _get_or_create_term(name, "tags", _tag_cache)


def cat_id(name: str) -> int:
    return _get_or_create_term(name, "categories", _cat_cache)


# ─────────────────────────────────────────────
# Media upload (thumbnails → WP featured images)
# ─────────────────────────────────────────────

def _load_media_cache() -> dict:
    if MEDIA_CACHE_FILE.exists():
        with open(MEDIA_CACHE_FILE) as f:
            return json.load(f)
    return {}


def _save_media_cache(cache: dict):
    with open(MEDIA_CACHE_FILE, "w") as f:
        json.dump(cache, f, indent=2)


_media_cache: dict = {}
_people_media_cache: dict = {}
_research_media_cache: dict = {}


def _fetch_media_urls() -> dict:
    """Batch-fetch WP source_url for every media item in the cache. Returns {pub_id: url}."""
    if not _media_cache:
        return {}
    id_to_pub = {v: k for k, v in _media_cache.items() if isinstance(v, int) and v}
    if not id_to_pub:
        return {}
    urls: dict = {}
    ids = list(id_to_pub.keys())
    for i in range(0, len(ids), 100):
        batch = ",".join(str(x) for x in ids[i:i+100])
        r = _api("GET", f"media?include={batch}&per_page=100")
        if r.ok and isinstance(r.json(), list):
            for item in r.json():
                pub_id = id_to_pub.get(item.get("id"))
                if pub_id:
                    urls[pub_id] = item.get("source_url", "")
    return urls


def _upload_media(image_path: Path, pub_id: str) -> int:
    """Upload image to WP media library; return attachment ID. Cached per pub_id."""
    if pub_id in _media_cache:
        return _media_cache[pub_id]

    if DRY_RUN:
        print(f"   [dry-run] upload media: {image_path.name}")
        return 0

    mime, _ = mimetypes.guess_type(str(image_path))
    mime = mime or "image/png"

    with open(image_path, "rb") as f:
        data = f.read()

    r = session.post(
        f"{WP_URL}/wp-json/wp/v2/media",
        headers={
            "Content-Disposition": f'attachment; filename="{image_path.name}"',
            "Content-Type": mime,
        },
        data=data,
    )

    if r.ok:
        media_id = r.json().get("id", 0)
        _media_cache[pub_id] = media_id
        _save_media_cache(_media_cache)
        print(f"   🖼 Uploaded thumbnail: {image_path.name}")
        return media_id
    else:
        print(f"   ✗ Media upload failed ({r.status_code}): {r.text[:100]}")
        return 0


# ─────────────────────────────────────────────
# People photo upload
# ─────────────────────────────────────────────

def _load_people_media_cache() -> dict:
    if PEOPLE_MEDIA_CACHE_FILE.exists():
        with open(PEOPLE_MEDIA_CACHE_FILE) as f:
            return json.load(f)
    return {}


def _save_people_media_cache():
    with open(PEOPLE_MEDIA_CACHE_FILE, "w") as f:
        json.dump(_people_media_cache, f, indent=2)


def _upload_person_photo(image_path: Path, person_id: str) -> int:
    if person_id in _people_media_cache:
        return _people_media_cache[person_id]
    if DRY_RUN:
        print(f"   [dry-run] upload person photo: {image_path.name}")
        return 0
    mime, _ = mimetypes.guess_type(str(image_path))
    mime = mime or "image/jpeg"
    with open(image_path, "rb") as f:
        data = f.read()
    r = session.post(
        f"{WP_URL}/wp-json/wp/v2/media",
        headers={
            "Content-Disposition": f'attachment; filename="person-{image_path.name}"',
            "Content-Type": mime,
        },
        data=data,
    )
    if r.ok:
        media_id = r.json().get("id", 0)
        _people_media_cache[person_id] = media_id
        _save_people_media_cache()
        print(f"   👤 Uploaded photo: {image_path.name}")
        return media_id
    else:
        print(f"   ✗ Photo upload failed ({r.status_code}): {r.text[:100]}")
        return 0


def _sync_people_photos(people: list) -> None:
    print(f"\n{'='*60}\nPeople Photos → WordPress\n{'='*60}")
    uploaded = 0
    for person in people:
        person_id = person.get("id", "")
        photo_path = person.get("photoPath", "")
        if not person_id or not photo_path:
            continue
        if person_id in _people_media_cache:
            continue
        img_file = PUBLIC_DIR / photo_path.lstrip("/")
        if not img_file.exists():
            continue
        _upload_person_photo(img_file, person_id)
        uploaded += 1
    already = len([k for k, v in _people_media_cache.items() if isinstance(v, int) and v])
    print(f"   ✓ {uploaded} new, {already} total in media library")


def _fetch_people_photo_urls() -> dict:
    """Batch-fetch WP source_url for every person photo. Returns {person_id: url}."""
    if not _people_media_cache:
        return {}
    id_to_person = {v: k for k, v in _people_media_cache.items() if isinstance(v, int) and v}
    if not id_to_person:
        return {}
    urls: dict = {}
    for i in range(0, len(id_to_person), 100):
        batch_ids = list(id_to_person.keys())[i:i+100]
        batch = ",".join(str(x) for x in batch_ids)
        r = _api("GET", f"media?include={batch}&per_page=100")
        if r.ok and isinstance(r.json(), list):
            for item in r.json():
                pid = id_to_person.get(item.get("id"))
                if pid:
                    urls[pid] = item.get("source_url", "")
    return urls


# ─────────────────────────────────────────────
# Research image upload
# ─────────────────────────────────────────────

def _load_research_media_cache() -> dict:
    if RESEARCH_MEDIA_CACHE_FILE.exists():
        with open(RESEARCH_MEDIA_CACHE_FILE) as f:
            return json.load(f)
    return {}


def _save_research_media_cache():
    with open(RESEARCH_MEDIA_CACHE_FILE, "w") as f:
        json.dump(_research_media_cache, f, indent=2)


def _upload_research_image(image_path: Path, research_id: str) -> int:
    if research_id in _research_media_cache:
        return _research_media_cache[research_id]
    if DRY_RUN:
        print(f"   [dry-run] upload research image: {image_path.name}")
        return 0
    mime, _ = mimetypes.guess_type(str(image_path))
    mime = mime or "image/jpeg"
    with open(image_path, "rb") as f:
        data = f.read()
    r = session.post(
        f"{WP_URL}/wp-json/wp/v2/media",
        headers={
            "Content-Disposition": f'attachment; filename="research-{image_path.name}"',
            "Content-Type": mime,
        },
        data=data,
    )
    if r.ok:
        media_id = r.json().get("id", 0)
        _research_media_cache[research_id] = media_id
        _save_research_media_cache()
        print(f"   🔬 Uploaded research image: {image_path.name}")
        return media_id
    else:
        print(f"   ✗ Research image upload failed ({r.status_code}): {r.text[:100]}")
        return 0


def _sync_research_images(research: list) -> None:
    print(f"\n{'='*60}\nResearch Images → WordPress\n{'='*60}")
    uploaded = 0
    for item in research:
        rid = item.get("id", "")
        image_path = item.get("imagePath", "")
        if not rid or not image_path:
            continue
        if rid in _research_media_cache:
            continue
        img_file = PUBLIC_DIR / image_path.lstrip("/")
        if not img_file.exists():
            continue
        _upload_research_image(img_file, rid)
        uploaded += 1
    already = len([k for k, v in _research_media_cache.items() if isinstance(v, int) and v])
    print(f"   ✓ {uploaded} new, {already} total in media library")


def _fetch_research_image_urls() -> dict:
    """Batch-fetch WP source_url for every research image. Returns {research_id: url}."""
    if not _research_media_cache:
        return {}
    id_to_research = {v: k for k, v in _research_media_cache.items() if isinstance(v, int) and v}
    if not id_to_research:
        return {}
    urls: dict = {}
    for i in range(0, len(id_to_research), 100):
        batch_ids = list(id_to_research.keys())[i:i + 100]
        batch = ",".join(str(x) for x in batch_ids)
        r = _api("GET", f"media?include={batch}&per_page=100")
        if r.ok and isinstance(r.json(), list):
            for item in r.json():
                rid = id_to_research.get(item.get("id"))
                if rid:
                    urls[rid] = item.get("source_url", "")
    return urls


# ─────────────────────────────────────────────
# Publications → Posts
# ─────────────────────────────────────────────

def _format_pub_html(pub: dict) -> str:
    authors = pub.get("authors", [])
    venue = pub.get("venue", "")
    year = pub.get("year", "")
    doi = pub.get("doi", "")

    # Schema.org microdata + hidden search index (makes year/venue/authors/tags
    # findable via WordPress's native search without custom plugins)
    schema_authors = "".join(
        f'<span itemprop="author" itemscope itemtype="https://schema.org/Person">'
        f'<meta itemprop="name" content="{a}"></span>'
        for a in authors
    )
    all_tags = pub.get("tags", [])
    search_tokens = " | ".join(filter(None, [
        str(year), venue,
        " ".join(authors),
        pub.get("award", ""),
        " ".join(all_tags),
    ]))
    schema = (
        f'<div itemscope itemtype="https://schema.org/ScholarlyArticle" style="display:none">'
        f'<meta itemprop="name" content="{pub.get("title", "")}">'
        f'<meta itemprop="datePublished" content="{year}">'
        f'<meta itemprop="isPartOf" content="{venue}">'
        f'{"<meta itemprop=&quot;identifier&quot; content=&quot;https://doi.org/" + doi + "&quot;>" if doi else ""}'
        f'{schema_authors}'
        f'<span class="search-index">{search_tokens}</span>'
        f'</div>'
    )

    parts = [schema]

    # Metadata summary block
    meta = []
    if authors:
        meta.append(f"<strong>Authors:</strong> {', '.join(authors)}")
    if venue:
        meta.append(f"<strong>Venue:</strong> {venue}")
    if year:
        meta.append(f"<strong>Year:</strong> {year}")
    if pub.get("award"):
        meta.append(f"<strong>Award:</strong> &#127942; {pub['award']}")
    if meta:
        parts.append('<p style="background:#f5f5f5;padding:12px;border-radius:4px;line-height:1.8">'
                     + "<br>\n".join(meta) + "</p>")

    # Action links
    links = []
    if pub.get("driveUrl"):
        links.append(f'<a href="{pub["driveUrl"]}" target="_blank" rel="noopener">&#128196; Download PDF</a>')
    elif pub.get("pdfUrl"):
        links.append(f'<a href="{pub["pdfUrl"]}" target="_blank" rel="noopener">&#128196; View PDF</a>')
    if doi:
        links.append(f'<a href="https://doi.org/{doi}" target="_blank" rel="noopener">DOI</a>')
    if pub.get("semanticScholarId"):
        s2id = pub["semanticScholarId"]
        links.append(f'<a href="https://www.semanticscholar.org/paper/{s2id}" target="_blank" rel="noopener">Semantic Scholar</a>')
    if links:
        parts.append("<p>" + " &nbsp;&middot;&nbsp; ".join(links) + "</p>")

    # Press coverage
    press = pub.get("press")
    if press:
        press_items = []
        for item in press:
            outlet = item.get("outlet", "")
            url = item.get("url", "")
            if not outlet:
                continue
            press_items.append(
                f'<a href="{url}" target="_blank" rel="noopener">{outlet}</a>' if url else outlet
            )
        if press_items:
            parts.append(
                '<p style="background:#eef6fc;padding:10px 14px;border-radius:4px">'
                '&#128240; <strong>Press coverage:</strong> Featured in '
                + ", ".join(press_items) + "</p>"
            )

    # TL;DR
    if pub.get("tldr"):
        parts.append(f'<p><strong>TL;DR:</strong> <em>{pub["tldr"]}</em></p>')

    # Abstract
    if pub.get("abstract"):
        parts.append(f"<h2>Abstract</h2>\n<p>{pub['abstract']}</p>")

    # Key contributions
    kc = pub.get("keyContributions")
    if kc:
        items_html = ""
        if isinstance(kc, list):
            items_html = "".join(f"<li>{c}</li>" for c in kc if c)
        elif isinstance(kc, str) and kc.strip():
            items_html = f"<li>{kc}</li>"
        if items_html:
            model = pub.get("summaryModel", "")
            model_display = model.replace("-", " ").replace("gemini", "Gemini").strip() if model else ""
            attribution = f'\n<p><em>Summary generated by {model_display}</em></p>' if model_display else ""
            parts.append(f"<h2>Key Contributions</h2>\n<ul>{items_html}</ul>{attribution}")

    # BibTeX
    if pub.get("bibtex"):
        bibtex = pub["bibtex"].replace("<", "&lt;").replace(">", "&gt;")
        parts.append(f'<h2>BibTeX</h2>\n<pre style="background:#f5f5f5;padding:12px;overflow-x:auto;font-size:.85em">{bibtex}</pre>')

    return "\n\n".join(parts)


def _upsert_publication(pub: dict) -> None:
    slug = pub.get("id", "")
    title = pub.get("title", "Untitled")
    year = pub.get("year", 2000)

    tags = []
    if pub.get("venue"):
        tags.append(tag_id(pub["venue"]))
    if year:
        tags.append(tag_id(str(year)))
    if pub.get("award"):
        tags.append(tag_id("Award Winner"))

    # Card excerpt mirrors telepresence.unc.edu layout: venue · year → authors → award
    authors = pub.get("authors", [])
    author_str = ", ".join(authors)
    venue = pub.get("venue", "")
    card_excerpt = ", ".join(filter(None, [venue, str(year)]))
    if author_str:
        card_excerpt += f"\n{author_str}"
    if pub.get("award"):
        card_excerpt += f"\n\U0001f3c6 {pub['award']}"

    post_data = {
        "title": title,
        "content": _format_pub_html(pub),
        "excerpt": card_excerpt,
        "slug": slug,
        "status": "publish",
        "date": f"{year}-06-01T00:00:00",
        "tags": [t for t in tags if t],
    }

    # Upload thumbnail and set as featured image
    image_path_str = pub.get("imagePath", "")
    if image_path_str:
        img_path = PUBLIC_DIR / image_path_str.lstrip("/")
        if img_path.exists():
            media_id = _upload_media(img_path, slug)
            if media_id:
                post_data["featured_media"] = media_id

    r = _api("GET", f"posts?slug={slug}&per_page=1")
    existing = r.json() if r.ok and isinstance(r.json(), list) else []

    if existing:
        post_id = existing[0]["id"]
        _api("PUT", f"posts/{post_id}", json=post_data)
        print(f"   ↩ Updated: {slug}")
    else:
        _api("POST", "posts", json=post_data)
        print(f"   + Created: {slug}")


def sync_publications():
    with open(DATA_DIR / "publications.json", encoding="utf-8") as f:
        pubs = json.load(f)

    batch = int(os.getenv("SYNC_BATCH_SIZE", len(pubs)))
    pubs = pubs[:batch]

    print(f"\n{'='*60}\nPublications → WordPress Posts ({len(pubs)} total)\n{'='*60}")

    for i, pub in enumerate(pubs, 1):
        print(f"\n[{i}/{len(pubs)}] {pub.get('title', '')[:70]}")
        _upsert_publication(pub)
        time.sleep(0.2)


# ─────────────────────────────────────────────
# Page helpers
# ─────────────────────────────────────────────

def _upsert_page(slug: str, title: str, content: str, parent_id: int = 0) -> int:
    r = _api("GET", f"pages?slug={slug}&per_page=1")
    existing = r.json() if r.ok and isinstance(r.json(), list) else []

    page_data: dict = {"title": title, "content": content, "slug": slug, "status": "publish"}
    if parent_id:
        page_data["parent"] = parent_id

    if existing:
        page_id = existing[0]["id"]
        _api("PUT", f"pages/{page_id}", json=page_data)
        print(f"   ↩ Updated page: /{slug}/")
        return page_id
    else:
        r2 = _api("POST", "pages", json=page_data)
        page_id = r2.json().get("id", 0) if r2.ok else 0
        print(f"   + Created page: /{slug}/")
        return page_id


# ─────────────────────────────────────────────
# Page: About (front page)
# ─────────────────────────────────────────────

def _about_html(cfg: dict) -> str:
    lab = cfg.get("lab", {})
    name = lab.get("name", "")
    dept = lab.get("department", "")
    uni = lab.get("university", "")
    desc = lab.get("description", "")
    email = lab.get("contactEmail", "")

    return f"""<p style="font-size:1.2rem;color:#6b7280;margin-bottom:.25rem">About Us</p>
<h1 style="margin-top:0;margin-bottom:.25rem">{dept}</h1>
<p style="font-size:1.15rem;color:#555;margin-top:0">{uni}</p>

<p>{desc}</p>

<ul>
  <li><a href="/research/">Our Research</a></li>
  <li><a href="/publications/">Publications</a></li>
  <li><a href="/people/">People</a></li>
  <li><a href="/news/">News</a></li>
  <li><a href="/join/">Join Us</a></li>
</ul>

<h2>Contact</h2>
<p>General inquiries: <a href="mailto:{email}">{email}</a></p>"""


# ─────────────────────────────────────────────
# Page: People
# ─────────────────────────────────────────────

ROLE_GROUPS = [
    (["faculty"],                       "Faculty"),
    (["staff"],                         "Research Staff"),
    (["phd", "ms", "undergrad", "postdoc"], "Students"),
    (["visitor"],                       "Current Collaborators"),
    (["alumni"],                        "Alumni"),
    (["past_collaborator"],             "Past / Possible Future Collaborators"),
]


GRID_COLS = 4  # people per row in the photo grid


def _person_card_td(p: dict, photo_url: str) -> str:
    """Returns a <td> containing one person's card for use inside a grid table."""
    name = p.get("name", "")
    title = p.get("title", "")
    email = p.get("email", "")
    website = p.get("website", "")
    scholar = p.get("googleScholar", "")

    if photo_url:
        photo_html = (
            f'<img src="{photo_url}" alt="{name}" loading="lazy"'
            f' style="width:110px;height:110px;border-radius:50%;object-fit:cover;'
            f'margin:0 auto;border:2px solid #e5e7eb">'
        )
    else:
        initials = "".join(w[0].upper() for w in name.split()[:2] if w)
        photo_html = (
            f'<p style="width:110px;height:110px;border-radius:50%;background:#c8d5e8;'
            f'margin:0 auto;text-align:center;font-size:2rem;font-weight:600;'
            f'color:#4a6fa5;padding-top:28px;box-sizing:border-box">{initials}</p>'
        )

    name_html = (
        f'<a href="{website}" target="_blank" rel="noopener"'
        f' style="font-weight:600;font-size:1.35rem;text-decoration:none">{name}</a>'
        if website else
        f'<strong style="font-size:1.35rem">{name}</strong>'
    )

    links = []
    if email:
        links.append(f'<a href="mailto:{email}" style="text-decoration:none">Email</a>')
    if scholar:
        links.append(f'<a href="{scholar}" target="_blank" rel="noopener" style="text-decoration:none">Scholar</a>')
    links_html = " &middot; ".join(links)

    return (
        f'<td style="vertical-align:top;text-align:center;padding:12px 8px;width:{100//GRID_COLS}%">'
        f'{photo_html}'
        f'<div style="margin-top:8px">{name_html}</div>'
        f'<div style="font-size:1.15rem;color:#555;margin-top:3px;line-height:1.3">{title}</div>'
        f'<div style="font-size:1.1rem;margin-top:5px">{links_html}</div>'
        f'</td>'
    )


def _people_grid_table(members: list, photo_urls: dict) -> str:
    """Render members as a GRID_COLS-column table grid."""
    rows_html = ""
    for i in range(0, len(members), GRID_COLS):
        chunk = members[i:i + GRID_COLS]
        cells = "".join(_person_card_td(p, photo_urls.get(p.get("id", ""), "")) for p in chunk)
        # Pad incomplete last row with empty cells
        empty = GRID_COLS - len(chunk)
        cells += f'<td style="width:{100//GRID_COLS}%"></td>' * empty
        rows_html += f"<tr>{cells}</tr>\n"
    return f'<table style="width:100%;border-collapse:collapse;margin-bottom:8px"><tbody>{rows_html}</tbody></table>'


def _people_html(people: list, photo_urls: dict) -> str:
    by_role: dict[str, list] = {}
    for p in people:
        role = p.get("role", "")
        by_role.setdefault(role, []).append(p)

    parts = []
    for roles, label in ROLE_GROUPS:
        members = []
        for r in roles:
            members.extend(by_role.get(r, []))
        if not members:
            continue

        parts.append(f"<h2>{label}</h2>")
        sorted_members = sorted(members, key=lambda p: p.get("name", "").split()[-1].lower())

        if "alumni" in roles or "past_collaborator" in roles:
            rows = ""
            for p in sorted_members:
                name = p.get("name", "")
                href = p.get("website") or p.get("linkedIn") or ""
                name_cell = (
                    f'<a href="{href}" target="_blank" rel="noopener">{name}</a>'
                    if href else name
                )
                year = p.get("alumniYear") or ""
                position = p.get("alumniPosition") or ""
                if "alumni" in roles:
                    rows += (
                        f"<tr>"
                        f"<td style='padding:6px 8px'>{name_cell}</td>"
                        f"<td style='padding:6px 8px'>{year}</td>"
                        f"<td style='padding:6px 8px'>{position}</td>"
                        f"</tr>\n"
                    )
                else:
                    rows += f"<tr><td style='padding:6px 8px'>{name_cell}</td></tr>\n"
            if "alumni" in roles:
                parts.append(
                    f'<table style="width:100%;border-collapse:collapse">'
                    f'<thead><tr>'
                    f'<th style="text-align:left;padding:8px;border-bottom:2px solid #ddd">Name</th>'
                    f'<th style="text-align:left;padding:8px;border-bottom:2px solid #ddd">Year</th>'
                    f'<th style="text-align:left;padding:8px;border-bottom:2px solid #ddd">Current Position</th>'
                    f'</tr></thead><tbody>{rows}</tbody></table>'
                )
            else:
                parts.append(
                    f'<table style="width:100%;border-collapse:collapse"><tbody>{rows}</tbody></table>'
                )
        else:
            parts.append(_people_grid_table(sorted_members, photo_urls))

    return "\n".join(parts)


# ─────────────────────────────────────────────
# Page: Research
# ─────────────────────────────────────────────

def _research_html(research: list, image_urls: dict) -> str:
    active = [r for r in research if r.get("active")]
    inactive = [r for r in research if not r.get("active")]

    def _card(r: dict) -> str:
        title = r.get("title", "")
        desc  = r.get("description", "")
        rid   = r.get("id", "")
        img   = image_urls.get(rid, "")

        if img:
            thumb = (
                f'<a href="{WP_URL}/research/{rid}/">'
                f'<img src="{img}" alt="{title}" loading="lazy"'
                f' style="width:200px;height:130px;object-fit:cover;border-radius:4px;'
                f'vertical-align:top">'
                f'</a>'
            )
        else:
            thumb = (
                f'<a href="{WP_URL}/research/{rid}/"'
                f' style="width:200px;height:130px;background:#e5e7eb;border-radius:4px;'
                f'vertical-align:top;text-decoration:none;padding:8px;color:#999;'
                f'font-size:.8rem">{title[:30]}</a>'
            )

        return (
            f'<table style="width:100%;border-collapse:collapse;margin-bottom:20px;'
            f'background:#f9f9f9;border-radius:4px">'
            f'<tr>'
            f'<td style="width:216px;padding:12px;vertical-align:top">{thumb}</td>'
            f'<td style="padding:12px;vertical-align:top">'
            f'<h3 style="margin-top:0;margin-bottom:6px">'
            f'<a href="{WP_URL}/research/{rid}/">{title}</a></h3>'
            f'<p style="margin:0;font-size:.95rem;color:#444;line-height:1.5">{desc}</p>'
            f'</td>'
            f'</tr>'
            f'</table>'
        )

    def _section(items: list, heading: str) -> str:
        if not items:
            return ""
        cards = "".join(_card(r) for r in sorted(items, key=lambda x: x.get("order", 99)))
        return f"<h2>{heading}</h2>\n{cards}"

    return _section(active, "Active Research") + _section(inactive, "Past Research")


# ─────────────────────────────────────────────
# Page: News
# ─────────────────────────────────────────────

TYPE_LABELS = {
    "award": "Award",
    "paper": "Publication",
    "talk": "Talk",
    "media": "Media",
    "hiring": "Hiring",
}


def _news_html(news: list) -> str:
    items = sorted(news, key=lambda n: n.get("date", ""), reverse=True)
    parts = []
    for item in items:
        type_label = TYPE_LABELS.get(item.get("type", ""), "News")
        date = item.get("date", "")
        title = item.get("title", "")
        summary = item.get("summary", "")
        link = item.get("link", "")
        title_html = f'<a href="{link}" target="_blank" rel="noopener">{title}</a>' if link else title
        parts.append(f"""<div style="margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid #eee">
  <p style="margin:0 0 4px"><strong>{title_html}</strong> <small style="color:#666">[{type_label}]</small></p>
  <p style="margin:0 0 4px;color:#444">{summary}</p>
  <p style="margin:0;color:#999;font-size:.85em">{date}</p>
</div>""")
    return "\n".join(parts)


# ─────────────────────────────────────────────
# Page: Join Us
# ─────────────────────────────────────────────

def _join_html(cfg: dict) -> str:
    lab = cfg.get("lab", {})
    name = lab.get("name", "the lab")
    return f"""<h2>Prospective PhD Students</h2>
<p>We are always looking for motivated PhD students with strong backgrounds in computer science, electrical engineering, optics, or related fields. Research areas of interest include:</p>
<ul>
  <li>3D scene acquisition &amp; reconstruction</li>
  <li>3D tracking and sensing</li>
  <li>Near-eye and head-mounted displays</li>
  <li>Holographic and autostereoscopic 3D displays</li>
  <li>Telepresence systems</li>
  <li>Computational imaging and neural rendering</li>
  <li>Medical applications of AR/VR</li>
</ul>
<p>To apply, submit your application through the <a href="https://gradschool.unc.edu/admissions/" target="_blank" rel="noopener">UNC Graduate School Admissions</a> portal and mention the faculty member(s) you are interested in working with.</p>

<h2>Undergraduate Researchers</h2>
<p>We welcome UNC undergraduates interested in gaining research experience in graphics, AR/VR, and visual computing through independent study courses or summer research programs. Email a faculty member with your resume, transcript, and a brief description of your interests.</p>

<h2>Postdoctoral Researchers &amp; Visitors</h2>
<p>We occasionally have openings for postdoctoral researchers and visiting scholars. Please reach out directly to a faculty member with your CV and research statement.</p>

<h2>Contact</h2>
<p>
  <strong>Prof. Praneeth Chakravarthula</strong> &mdash; <a href="mailto:cpk@cs.unc.edu">cpk@cs.unc.edu</a><br>
  <strong>Prof. Henry Fuchs</strong> &mdash; <a href="mailto:fuchs@cs.unc.edu">fuchs@cs.unc.edu</a>
</p>"""


# ─────────────────────────────────────────────
# Set homepage and posts page in WP settings
# ─────────────────────────────────────────────

def _publications_page_html(pubs: list) -> str:
    """Publications grouped by year with anchor navigation. No JS/CSS injection needed."""
    media_urls = _fetch_media_urls()
    total = len(pubs)

    # Group by year (descending)
    from collections import defaultdict
    by_year: dict = defaultdict(list)
    for pub in pubs:
        by_year[pub.get("year", 0)].append(pub)
    years = sorted(by_year.keys(), reverse=True)

    # Jump-to-year nav
    year_links = " &nbsp;·&nbsp; ".join(
        f'<a href="#year-{y}" style="color:#4b5563;text-decoration:none;font-size:.95rem">{y}</a>'
        for y in years if y
    )

    sections = []
    for year in years:
        year_pubs = by_year[year]
        rows = []
        for pub in year_pubs:
            pub_id  = pub.get("id", "")
            authors = ", ".join(pub.get("authors", []))
            venue   = pub.get("venue", "")
            award   = pub.get("award", "")
            post_url = f"{WP_URL}/{pub_id}/"

            img_url = media_urls.get(pub_id, "")
            if img_url:
                thumb = (
                    f'<a href="{post_url}">'
                    f'<img src="{img_url}" width="140" height="98" loading="lazy"'
                    f' style="object-fit:cover;border-radius:4px;display:block">'
                    f'</a>'
                )
            else:
                thumb = (
                    f'<a href="{post_url}" style="display:block;width:140px;height:98px;'
                    f'background:#e5e7eb;border-radius:4px;text-decoration:none">&nbsp;</a>'
                )

            award_badge = (
                f'<div style="margin-top:4px;color:#b45309;font-size:1.15rem">&#127942; {award}</div>'
                if award else ""
            )

            rows.append(
                f'<tr>'
                f'<td style="padding:10px 8px;border-bottom:1px solid #e5e7eb;'
                f'width:156px;vertical-align:top">{thumb}</td>'
                f'<td style="padding:10px 8px;border-bottom:1px solid #e5e7eb;vertical-align:top">'
                f'<a href="{post_url}" style="font-weight:600;font-size:1.4rem;'
                f'line-height:1.4;display:block;margin-bottom:4px">{pub.get("title","Untitled")}</a>'
                f'<div style="color:#555;font-size:1.2rem;margin-bottom:2px">{authors}</div>'
                f'<div style="color:#777;font-size:1.15rem">{venue}</div>'
                f'{award_badge}'
                f'</td>'
                f'</tr>'
            )

        rows_html = "\n".join(rows)
        label = str(year) if year else "Unknown"
        sections.append(
            f'<h2 id="year-{year}" style="margin-top:2rem;margin-bottom:.5rem;'
            f'padding-bottom:.25rem;border-bottom:2px solid #e5e7eb">{label}</h2>'
            f'<table style="width:100%;border-collapse:collapse"><tbody>{rows_html}</tbody></table>'
        )

    sections_html = "\n".join(sections)

    # wp:search block marker survives WP content sanitization and renders a native search form.
    # query.post_type adds a hidden <input name="post_type" value="post"> to the rendered form,
    # which scopes WordPress's search to posts (publications) only — excluding pages
    # (About, People, Research, etc.) from results.
    return f"""<!-- wp:search {{"label":"Search publications","buttonText":"Search","placeholder":"Author, title, venue, year…","query":{{"post_type":"post"}}}} /-->

<p style="color:#6b7280;font-size:.875rem;margin-top:1rem;margin-bottom:.25rem">{total} publications &mdash; jump to year:</p>
<p style="margin-bottom:1.5rem;line-height:2">{year_links}</p>

{sections_html}"""


WIDGETS_TO_REMOVE = {"recent-posts", "recent-comments", "archives", "categories", "meta"}


def _remove_sidebar_widgets():
    """Delete the default WordPress sidebar widgets (Recent Posts, Comments, Archives, etc.)."""
    r = _api("GET", "widgets?per_page=100")
    if not r.ok or not isinstance(r.json(), list):
        print("   ⚠ Could not fetch widgets (may need admin permission)")
        return

    removed = 0
    for widget in r.json():
        id_base = widget.get("id_base", "")
        if id_base in WIDGETS_TO_REMOVE:
            wid = widget["id"]
            r2 = _api("DELETE", f"widgets/{wid}", params={"force": True})
            if r2.ok:
                removed += 1
                print(f"   - Removed widget: {id_base}")

    if removed == 0:
        print("   ↩ No default widgets found (already removed or not present)")
    else:
        print(f"   ↩ Removed {removed} sidebar widget(s)")


def _configure_reading(home_id: int):
    _api("PUT", "settings", json={
        "show_on_front": "page",
        "page_on_front": home_id,
        "page_for_posts": 0,
    })
    print("   ↩ Reading settings updated (static front page)")


# ─────────────────────────────────────────────
# Sync all static pages
# ─────────────────────────────────────────────

def sync_pages():
    with open(CONFIG_FILE, encoding="utf-8") as f:
        cfg = json.load(f)
    with open(DATA_DIR / "people.json", encoding="utf-8") as f:
        people = json.load(f)
    with open(DATA_DIR / "research.json", encoding="utf-8") as f:
        research = json.load(f)
    with open(DATA_DIR / "news.json", encoding="utf-8") as f:
        news = json.load(f)

    lab_name = cfg.get("lab", {}).get("name", "Lab")

    with open(DATA_DIR / "publications.json", encoding="utf-8") as f:
        pubs = json.load(f)

    _sync_people_photos(people)
    photo_urls = _fetch_people_photo_urls()

    _sync_research_images(research)
    research_image_urls = _fetch_research_image_urls()

    print(f"\n{'='*60}\nStatic Pages → WordPress\n{'='*60}")
    home_id = _upsert_page("about", lab_name, _about_html(cfg))
    _upsert_page("publications", "Publications", _publications_page_html(pubs))
    _upsert_page("people", "People", _people_html(people, photo_urls))
    _upsert_page("research", "Research", _research_html(research, research_image_urls))
    _upsert_page("news", "News", _news_html(news))
    _upsert_page("join", "Join Us", _join_html(cfg))

    _configure_reading(home_id)
    _remove_sidebar_widgets()


# ─────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────

def main():
    global _media_cache, _people_media_cache, _research_media_cache
    _check_env()
    _setup_session()
    _media_cache = _load_media_cache()
    _people_media_cache = _load_people_media_cache()
    _research_media_cache = _load_research_media_cache()

    if DRY_RUN:
        print("DRY RUN — no writes will be made\n")

    if SYNC_ALL or ONLY_PUBLICATIONS:
        sync_publications()
    if SYNC_ALL or ONLY_PAGES:
        sync_pages()

    print("\nDone.")


if __name__ == "__main__":
    main()
