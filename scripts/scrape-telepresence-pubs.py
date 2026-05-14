#!/usr/bin/env python3
"""Scrape all publications from telepresence.web.unc.edu and merge into publications.json."""

import json, re, os, sys, time, unicodedata
from urllib.parse import urljoin
from urllib.request import urlopen, Request, urlretrieve
from urllib.error import URLError
from html.parser import HTMLParser

BASE_URL = "https://telepresence.web.unc.edu/publications/"
PUBS_JSON = os.path.join(os.path.dirname(__file__), '..', 'data', 'publications.json')
PAPERS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'papers')
IMAGES_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'publications')
os.makedirs(PAPERS_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; research-scraper/1.0)'}
STOPWORDS = {'a','an','the','towards','learning','deep','neural','on','via','for','with',
             'using','from','of','in','and','to','by','at','as','or','its','into','is','are','be'}

def slugify(text):
    text = unicodedata.normalize('NFKD', text).encode('ascii','ignore').decode()
    text = re.sub(r'[^a-z0-9]+', '-', text.lower())
    return text.strip('-')

def pub_slug(authors, year, title):
    last = (authors[0].split()[-1] if authors else 'unknown').lower()
    words = [w for w in re.split(r'\s+', title.lower()) if w not in STOPWORDS and re.match(r'[a-z]', w)]
    kw = words[0] if words else 'paper'
    return slugify(f"{last}-{year}-{kw}")

def fetch(url, retries=3):
    for i in range(retries):
        try:
            req = Request(url, headers=HEADERS)
            with urlopen(req, timeout=20) as r:
                return r.read().decode('utf-8', errors='replace')
        except Exception as e:
            if i == retries - 1:
                print(f"  WARN: Failed to fetch {url}: {e}")
                return ''
            time.sleep(2 ** i)
    return ''

def download_file(url, dest_path):
    if os.path.exists(dest_path):
        return True
    try:
        req = Request(url, headers=HEADERS)
        with urlopen(req, timeout=30) as r:
            data = r.read()
        if len(data) < 5000:
            return False
        with open(dest_path, 'wb') as f:
            f.write(data)
        return True
    except Exception:
        return False

class TableParser(HTMLParser):
    """Extract rows from the publications table."""
    def __init__(self):
        super().__init__()
        self.rows = []          # list of (thumbnail_url, citation_text, pdf_url)
        self._in_table = False
        self._in_td = False
        self._td_idx = 0
        self._row_data = ['', '', '']  # [thumb, text, pdf]
        self._link_href = ''
        self._depth = 0
        self._stack = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self._stack.append(tag)
        if tag == 'tr':
            self._row_data = ['', '', '']
            self._td_idx = 0
        elif tag == 'td':
            self._in_td = True
        elif tag == 'img' and self._td_idx == 0:
            src = attrs.get('src','')
            if src and 'wp-content' in src:
                self._row_data[0] = src
        elif tag == 'a' and self._td_idx == 1:
            href = attrs.get('href','')
            if href and ('.pdf' in href.lower() or 'paper' in attrs.get('class','').lower()):
                self._row_data[2] = href
            elif href and not self._row_data[2]:
                self._row_data[2] = href

    def handle_endtag(self, tag):
        if self._stack and self._stack[-1] == tag:
            self._stack.pop()
        if tag == 'td':
            self._td_idx += 1
            self._in_td = False
        elif tag == 'tr':
            if self._row_data[1].strip():
                self.rows.append(tuple(self._row_data))

    def handle_data(self, data):
        if self._in_td and self._td_idx == 1:
            self._row_data[1] += data

def parse_citation(text):
    """Parse 'Authors. "Title," Venue Year.' into components."""
    text = text.strip()
    # Remove [Paper] [Slides] etc.
    text = re.sub(r'\[.*?\]', '', text).strip()
    # Replace HTML entities
    text = text.replace('“', '"').replace('”', '"').replace('‘', "'").replace('’', "'")
    text = text.replace('&amp;', '&').replace('&#8220;', '"').replace('&#8221;', '"')

    # Try to find title in quotes
    title_match = re.search(r'["“](.+?)["”]', text)
    if not title_match:
        # Try double quotes
        title_match = re.search(r'"(.+?)"', text)

    if title_match:
        title = title_match.group(1).rstrip('.,').strip()
        before = text[:title_match.start()].strip().rstrip('.')
        after = text[title_match.end():].strip().lstrip('.,').strip()
    else:
        return None

    # Authors are before the title
    authors_raw = before.strip()
    # Split authors by comma or semicolon
    if authors_raw:
        # Try to detect last name, first name patterns
        raw_parts = re.split(r',\s*and\s+|;\s*and\s+|,\s*(?=[A-Z])|;\s*', authors_raw)
        authors = [p.strip().rstrip('.') for p in raw_parts if p.strip() and len(p.strip()) > 1]
    else:
        authors = []

    # Parse venue and year from after
    # Year is typically a 4-digit number at the end
    year_match = re.search(r'\b(19|20)\d{2}\b', after)
    year = int(year_match.group()) if year_match else None

    # Venue is everything before the year (and after any comma)
    if year_match:
        venue = after[:year_match.start()].strip().rstrip('.,').strip()
    else:
        venue = after.strip().rstrip('.,').strip()

    # Clean venue - remove trailing comma/period and leading comma
    venue = venue.lstrip('.,').strip()

    return {
        'title': title,
        'authors': authors,
        'year': year,
        'venue': venue,
    }

def detect_tags(venue):
    v = venue.lower()
    tags = []
    if any(x in v for x in ['journal', 'transactions', 'tvcg', 'tog', 'tpami', 'tip']):
        tags.append('Journal')
    elif any(x in v for x in ['workshop', 'ws ']):
        tags.append('Workshop')
    elif 'arxiv' in v:
        tags.append('ArXiv')
    else:
        tags.append('Conference')
    return tags

def generate_bibtex(pub):
    pid = pub['id'].replace('-', '_')
    v = pub['venue'].lower()
    btype = 'article' if any(x in v for x in ['journal','transactions','tvcg','tog','tpami']) else 'inproceedings'
    author_str = ' and '.join(pub['authors'])
    doi_line = f"\n  doi       = {{{pub['doi']}}}," if pub.get('doi') else ''
    if btype == 'article':
        return f"@article{{{pid},\n  title     = {{{pub['title']}}},\n  author    = {{{author_str}}},\n  journal   = {{{pub['venue']}}},\n  year      = {{{pub['year']}}}{doi_line}\n}}"
    return f"@inproceedings{{{pid},\n  title     = {{{pub['title']}}},\n  author    = {{{author_str}}},\n  booktitle = {{{pub['venue']}}},\n  year      = {{{pub['year']}}}{doi_line}\n}}"

def scrape_all_pages():
    rows = []
    page = 1
    while True:
        url = BASE_URL if page == 1 else f"{BASE_URL}page/{page}/"
        print(f"Fetching page {page}: {url}")
        html = fetch(url)
        if not html:
            break

        parser = TableParser()
        parser.feed(html)
        new_rows = parser.rows

        if not new_rows:
            print(f"  No rows found on page {page}, stopping.")
            break

        print(f"  Found {len(new_rows)} rows")
        rows.extend(new_rows)

        # Check for next page link
        if f'/publications/page/{page + 1}/' not in html and f'publications/page/{page+1}' not in html:
            # Check generic "next" link
            if 'class="next page-numbers"' not in html and '?page=' not in html:
                print(f"  No next page found, done.")
                break

        page += 1
        time.sleep(0.5)

    return rows

def main():
    # Load existing publications
    with open(PUBS_JSON) as f:
        existing = json.load(f)
    existing_titles = {p['title'].lower().strip() for p in existing}
    existing_ids = {p['id'] for p in existing}
    print(f"Loaded {len(existing)} existing publications")

    # Scrape all pages
    rows = scrape_all_pages()
    print(f"\nTotal rows scraped: {len(rows)}")

    new_pubs = []
    skipped = 0
    parse_errors = 0

    for thumb_url, citation_text, pdf_url in rows:
        parsed = parse_citation(citation_text)
        if not parsed or not parsed.get('title') or not parsed.get('year'):
            parse_errors += 1
            continue

        title = parsed['title']
        # Skip if already in existing publications (by title match)
        if title.lower().strip() in existing_titles:
            skipped += 1
            # But update imagePath and pdfPath if missing
            for existing_pub in existing:
                if existing_pub['title'].lower().strip() == title.lower().strip():
                    if thumb_url and not existing_pub.get('imagePath'):
                        # Download thumbnail
                        ext = os.path.splitext(thumb_url.split('?')[0])[1] or '.jpg'
                        img_name = f"{existing_pub['id']}{ext}"
                        img_path = os.path.join(IMAGES_DIR, img_name)
                        if download_file(thumb_url, img_path):
                            existing_pub['imagePath'] = f"/images/publications/{img_name}"
                    if pdf_url and not existing_pub.get('pdfPath') and not existing_pub.get('pdfUrl'):
                        existing_pub['pdfUrl'] = pdf_url
                    break
            continue

        # Generate slug
        slug = pub_slug(parsed['authors'], parsed['year'], title)
        # Ensure unique slug
        base_slug = slug
        counter = 2
        while slug in existing_ids or any(p.get('id') == slug for p in new_pubs):
            slug = f"{base_slug}-{counter}"
            counter += 1

        # Download thumbnail
        image_path = ''
        if thumb_url:
            ext = os.path.splitext(thumb_url.split('?')[0])[1] or '.jpg'
            if not ext.startswith('.') or len(ext) > 5:
                ext = '.jpg'
            img_name = f"{slug}{ext}"
            img_path = os.path.join(IMAGES_DIR, img_name)
            if download_file(thumb_url, img_path):
                image_path = f"/images/publications/{img_name}"
                print(f"  Downloaded thumbnail: {img_name}")

        # Download PDF
        pdf_path_local = ''
        if pdf_url and pdf_url.endswith('.pdf'):
            pdf_name = f"{slug}.pdf"
            pdf_dest = os.path.join(PAPERS_DIR, pdf_name)
            if download_file(pdf_url, pdf_dest):
                pdf_path_local = f"/papers/{pdf_name}"
                print(f"  Downloaded PDF: {pdf_name}")

        tags = detect_tags(parsed.get('venue', ''))

        pub = {
            'id': slug,
            'title': title,
            'authors': parsed['authors'],
            'year': parsed['year'],
            'venue': parsed.get('venue', ''),
            'abstract': '',
            'pdfPath': pdf_path_local,
            'pdfUrl': pdf_url if not pdf_path_local else '',
            'doi': '',
            'semanticScholarId': '',
            'bibtex': '',
            'keyContributions': '',
            'tags': tags,
            'featured': False,
            'imagePath': image_path,
            'award': '',
        }
        pub['bibtex'] = generate_bibtex(pub)
        new_pubs.append(pub)
        existing_titles.add(title.lower().strip())
        existing_ids.add(slug)

    print(f"\nResults:")
    print(f"  New publications: {len(new_pubs)}")
    print(f"  Skipped (already exist): {skipped}")
    print(f"  Parse errors: {parse_errors}")

    # Merge and save
    all_pubs = existing + new_pubs
    with open(PUBS_JSON, 'w') as f:
        json.dump(all_pubs, f, indent=2)
    print(f"\nSaved {len(all_pubs)} total publications to {PUBS_JSON}")

if __name__ == '__main__':
    main()
