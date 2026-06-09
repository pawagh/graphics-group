"""
Sync all lab data to WordPress via the REST API.

Reads data/*.json from the repo root and creates/updates:
  - Publications  → /wp-json/wp/v2/publications
  - People        → /wp-json/wp/v2/people
  - Research areas→ /wp-json/wp/v2/research
  - News items    → /wp-json/wp/v2/lab-news

Also uploads PDFs and images to the WP media library.

Usage:
  pip install -r requirements.txt
  cp .env.example .env          # fill in WP_URL, WP_USER, WP_APP_PASSWORD
  python3 sync.py

Re-running is safe: existing posts (matched by slug) are updated, not duplicated.
"""

import json
import os
import sys
import time
import mimetypes
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# ── Config ───────────────────────────────────────────────────────────────────

WP_URL   = os.environ.get("WP_URL", "").rstrip("/")
WP_USER  = os.environ.get("WP_USER", "")
WP_PASS  = os.environ.get("WP_APP_PASSWORD", "")

if not all([WP_URL, WP_USER, WP_PASS]):
    sys.exit("ERROR: Set WP_URL, WP_USER, and WP_APP_PASSWORD in your .env file.")

AUTH    = (WP_USER, WP_PASS)
API     = f"{WP_URL}/wp-json/wp/v2"
HEADERS = {"Accept": "application/json"}

# Path to the repo root (one level up from this script's directory)
REPO_ROOT   = Path(__file__).parent.parent.parent
DATA_DIR    = REPO_ROOT / "data"
PUBLIC_DIR  = REPO_ROOT / "public"

# ── Helpers ──────────────────────────────────────────────────────────────────

def get_by_slug(endpoint: str, slug: str) -> dict | None:
    """Return an existing WP post matching the slug, or None."""
    r = requests.get(f"{API}/{endpoint}", params={"slug": slug}, auth=AUTH, headers=HEADERS)
    r.raise_for_status()
    results = r.json()
    return results[0] if results else None


def upsert(endpoint: str, slug: str, payload: dict) -> dict:
    """Create or update a WP post. Returns the post dict."""
    existing = get_by_slug(endpoint, slug)
    if existing:
        r = requests.post(f"{API}/{endpoint}/{existing['id']}", json=payload, auth=AUTH, headers=HEADERS)
    else:
        r = requests.post(f"{API}/{endpoint}", json=payload, auth=AUTH, headers=HEADERS)
    r.raise_for_status()
    return r.json()


def upload_file(local_path: str | Path) -> tuple[int, str]:
    """
    Upload a file to the WP media library.
    Returns (attachment_id, source_url).
    Returns (0, '') if file doesn't exist.
    """
    path = Path(local_path)
    if not path.exists():
        return 0, ""

    mime, _ = mimetypes.guess_type(str(path))
    mime = mime or "application/octet-stream"

    with open(path, "rb") as f:
        data = f.read()

    headers = {
        "Content-Disposition": f'attachment; filename="{path.name}"',
        "Content-Type": mime,
    }
    r = requests.post(f"{API}/media", data=data, headers=headers, auth=AUTH)
    if not r.ok:
        print(f"    WARN: media upload failed for {path.name}: {r.status_code}")
        return 0, ""

    j = r.json()
    return j.get("id", 0), j.get("source_url", "")


# ── Sync publications ─────────────────────────────────────────────────────────

def sync_publications():
    pubs = json.loads((DATA_DIR / "publications.json").read_text())
    print(f"\nSyncing {len(pubs)} publications...")

    for i, pub in enumerate(pubs):
        prog = f"[{i+1}/{len(pubs)}]"

        # Upload PDF to WP media library if it exists locally
        pdf_wp_url = ""
        if pub.get("pdfPath"):
            local_pdf = PUBLIC_DIR / pub["pdfPath"].lstrip("/")
            if local_pdf.exists():
                _, pdf_wp_url = upload_file(local_pdf)

        # Upload image if present
        img_wp_url = ""
        if pub.get("imagePath"):
            local_img = PUBLIC_DIR / pub["imagePath"].lstrip("/")
            if local_img.exists():
                _, img_wp_url = upload_file(local_img)

        payload = {
            "slug":   pub["id"],
            "title":  pub["title"],
            "status": "publish",
            "meta": {
                "abstract":           pub.get("abstract", ""),
                "tldr":               pub.get("tldr", ""),
                "authors":            json.dumps(pub.get("authors", [])),
                "year":               str(pub.get("year", "")),
                "venue":              pub.get("venue", ""),
                "doi":                pub.get("doi", ""),
                "pdf_path":           pdf_wp_url or pub.get("pdfPath", ""),
                "pdf_url":            pub.get("pdfUrl", ""),
                "key_contributions":  pub.get("keyContributions", ""),
                "semantic_scholar_id": pub.get("semanticScholarId", ""),
                "bibtex":             pub.get("bibtex", ""),
                "tags":               json.dumps(pub.get("tags", [])),
                "featured":           bool(pub.get("featured", False)),
                "image_path":         img_wp_url or pub.get("imagePath", ""),
                "award":              pub.get("award", ""),
            },
        }

        try:
            result = upsert("publications", pub["id"], payload)
            print(f"{prog} OK  {pub['title'][:60]}")
        except requests.HTTPError as e:
            print(f"{prog} FAIL {pub['id']}: {e}")

        time.sleep(0.1)


# ── Sync people ───────────────────────────────────────────────────────────────

def sync_people():
    people = json.loads((DATA_DIR / "people.json").read_text())
    print(f"\nSyncing {len(people)} people...")

    for i, person in enumerate(people):
        prog = f"[{i+1}/{len(people)}]"

        # Upload photo
        photo_wp_url = ""
        if person.get("photoPath"):
            local_photo = PUBLIC_DIR / person["photoPath"].lstrip("/")
            if local_photo.exists():
                _, photo_wp_url = upload_file(local_photo)

        payload = {
            "slug":   person["id"],
            "title":  person["name"],
            "status": "publish",
            "meta": {
                "role":           person.get("role", ""),
                "title":          person.get("title", ""),
                "email":          person.get("email", ""),
                "photo_path":     photo_wp_url or person.get("photoPath", ""),
                "bio":            person.get("bio", ""),
                "website":        person.get("website", ""),
                "google_scholar": person.get("googleScholar", ""),
                "github":         person.get("github", ""),
                "twitter":        person.get("twitter", ""),
                "interests":      json.dumps(person.get("interests", [])),
            },
        }

        try:
            upsert("people", person["id"], payload)
            print(f"{prog} OK  {person['name']}")
        except requests.HTTPError as e:
            print(f"{prog} FAIL {person['id']}: {e}")

        time.sleep(0.1)


# ── Sync research areas ───────────────────────────────────────────────────────

def sync_research():
    areas = json.loads((DATA_DIR / "research.json").read_text())
    print(f"\nSyncing {len(areas)} research areas...")

    for i, area in enumerate(areas):
        prog = f"[{i+1}/{len(areas)}]"

        img_wp_url = ""
        if area.get("imagePath"):
            local_img = PUBLIC_DIR / area["imagePath"].lstrip("/")
            if local_img.exists():
                _, img_wp_url = upload_file(local_img)

        payload = {
            "slug":   area["id"],
            "title":  area["title"],
            "status": "publish",
            "meta": {
                "description":    area.get("description", ""),
                "image_path":     img_wp_url or area.get("imagePath", ""),
                "tags":           json.dumps(area.get("tags", [])),
                "publication_ids": json.dumps(area.get("publicationIds", [])),
                "active":         bool(area.get("active", True)),
                "order":          int(area.get("order", 0)),
            },
        }

        try:
            upsert("research", area["id"], payload)
            print(f"{prog} OK  {area['title']}")
        except requests.HTTPError as e:
            print(f"{prog} FAIL {area['id']}: {e}")

        time.sleep(0.1)


# ── Sync news ─────────────────────────────────────────────────────────────────

def sync_news():
    news = json.loads((DATA_DIR / "news.json").read_text())
    print(f"\nSyncing {len(news)} news items...")

    for i, item in enumerate(news):
        prog = f"[{i+1}/{len(news)}]"

        payload = {
            "slug":   item["id"],
            "title":  item["title"],
            "status": "publish",
            "meta": {
                "date":    item.get("date", ""),
                "summary": item.get("summary", ""),
                "link":    item.get("link", ""),
                "type":    item.get("type", "other"),
            },
        }

        try:
            upsert("lab-news", item["id"], payload)
            print(f"{prog} OK  {item['title'][:60]}")
        except requests.HTTPError as e:
            print(f"{prog} FAIL {item['id']}: {e}")

        time.sleep(0.1)


# ── Main ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Sync lab data to WordPress")
    parser.add_argument("--publications", action="store_true", help="Sync publications only")
    parser.add_argument("--people",       action="store_true", help="Sync people only")
    parser.add_argument("--research",     action="store_true", help="Sync research areas only")
    parser.add_argument("--news",         action="store_true", help="Sync news only")
    args = parser.parse_args()

    # If no flags given, sync everything
    run_all = not any([args.publications, args.people, args.research, args.news])

    if run_all or args.publications:
        sync_publications()
    if run_all or args.people:
        sync_people()
    if run_all or args.research:
        sync_research()
    if run_all or args.news:
        sync_news()

    print("\nDone.")
