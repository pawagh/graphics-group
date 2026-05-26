#!/usr/bin/env python3
"""
Scrape people from telepresence.web.unc.edu/people/ and merge into data/people.json
Downloads photos to public/images/people/
"""

import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from urllib.parse import urlparse

BASE_URL = "https://telepresence.web.unc.edu/people/"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.join(SCRIPT_DIR, "..")
PEOPLE_JSON = os.path.join(REPO_ROOT, "data", "people.json")
PHOTOS_DIR = os.path.join(REPO_ROOT, "public", "images", "people")

os.makedirs(PHOTOS_DIR, exist_ok=True)

def fetch(url, retries=3):
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; vcail-scraper/1.0)'}
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as r:
                return r.read().decode('utf-8', errors='replace')
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
            else:
                print(f"  Failed to fetch {url}: {e}")
                return ""

def fetch_binary(url, retries=3):
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; vcail-scraper/1.0)'}
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as r:
                return r.read()
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1)
            else:
                return None

def clean_name(name):
    """Strip degree suffixes, parenthetical advisor notes, etc."""
    # Remove parenthetical advisor notes: (co-advised with ...) etc.
    name = re.sub(r'\s*\(.*?\)\s*', ' ', name).strip()
    # Remove trailing degree suffixes
    name = re.sub(r',?\s*(PhD|Ph\.D\.?|Postdoctoral|Postdoc|MD|MS|M\.S\.?|BS|BA)\s*$', '', name, flags=re.IGNORECASE).strip()
    # Remove trailing comma
    name = name.rstrip(',').strip()
    return name

def slugify(name):
    name = name.lower()
    name = re.sub(r"[^a-z0-9\s-]", "", name)
    name = re.sub(r"\s+", "-", name.strip())
    return name

def download_photo(img_url, person_id):
    """Download photo, return /images/people/person_id.ext or '' on failure"""
    if not img_url:
        return ""
    # Check if file already exists with common extensions
    for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
        path = os.path.join(PHOTOS_DIR, f"{person_id}{ext}")
        if os.path.exists(path):
            return f"/images/people/{person_id}{ext}"

    # Get extension from URL
    parsed = urlparse(img_url)
    path_part = parsed.path
    basename = os.path.basename(path_part)
    # Remove WordPress size suffix like -150x150 before extension
    basename_clean = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', basename)
    ext = os.path.splitext(basename_clean)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
        ext = '.jpg'

    # Try to get the original (full-size) URL by stripping WordPress size suffix
    orig_url = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', img_url)

    data = None
    if orig_url != img_url:
        data = fetch_binary(orig_url)
    if not data:
        data = fetch_binary(img_url)
    if not data or len(data) < 500:
        return ""

    out_path = os.path.join(PHOTOS_DIR, f"{person_id}{ext}")
    with open(out_path, 'wb') as f:
        f.write(data)
    print(f"    Downloaded photo → /images/people/{person_id}{ext}")
    return f"/images/people/{person_id}{ext}"

def strip_tags(html):
    """Remove all HTML tags from a string."""
    return re.sub(r'<[^>]+>', '', html)

def decode_entities(text):
    """Decode common HTML entities."""
    text = text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    text = text.replace('&quot;', '"').replace('&#8217;', "'").replace('&#8216;', "'")
    text = text.replace('&nbsp;', ' ').replace('&#38;', '&')
    return text

def parse_person_block(block, section_heading, is_alumni_section):
    """
    Parse a <div style="clear:both">...</div> block into a person dict.
    Returns dict with: name, title, email, website, photo_url, section
    or None if no valid person found.
    """
    # Remove leading/trailing whitespace
    block = block.strip()
    if not block:
        return None

    # Extract photo URL
    img_match = re.search(r'<img[^>]+src="([^"]+)"', block, re.IGNORECASE)
    photo_url = img_match.group(1) if img_match else ''

    # Extract name (in <strong> tag)
    strong_match = re.search(r'<strong>([^<]+)</strong>', block, re.IGNORECASE)
    if not strong_match:
        return None
    name = strong_match.group(1).strip()
    name = decode_entities(name)
    name = clean_name(name)

    if not name or len(name) < 3:
        return None

    # Extract title — it may be:
    # (a) on same line after </strong>: <strong>Name</strong>, Title</p>
    # (b) on line immediately after closing </p> of name line
    # (c) in a separate <p> block after the name paragraph

    title = ''

    # Option (a): comma after strong tag on same p tag
    # Look for text after </strong> in first <p>
    first_p = re.search(r'<p[^>]*>.*?</p>', block, re.DOTALL | re.IGNORECASE)
    if first_p:
        p_text = strip_tags(first_p.group(0))
        # Remove the name itself
        if name in p_text:
            after_name = p_text[p_text.index(name) + len(name):].strip().lstrip(',').strip()
            if after_name:
                title = after_name

    # Option (b): text immediately after the first </p> tag (before next <p>)
    if not title:
        after_first_p = re.search(r'</p>\s*([^\n<][^\n]*?)\s*\n', block, re.IGNORECASE)
        if after_first_p:
            candidate = after_first_p.group(1).strip()
            candidate = strip_tags(candidate).strip()
            if candidate and len(candidate) > 2 and len(candidate) < 150:
                title = candidate

    # Option (c): second <p> block (not email) contains title
    if not title:
        all_ps = re.findall(r'<p[^>]*>(.*?)</p>', block, re.DOTALL | re.IGNORECASE)
        for p in all_ps[1:]:
            p_text = strip_tags(p).strip()
            # Skip if it looks like an email/contact line
            if '[AT]' in p_text or 'Office:' in p_text or re.search(r'\.(edu|com|org)', p_text):
                continue
            if p_text and len(p_text) > 2 and len(p_text) < 200:
                title = p_text
                break

    title = decode_entities(title.strip())

    # Extract email — look for pattern "xxx [AT] xxx.xxx"
    email_match = re.search(r'([a-zA-Z0-9._%+-]+)\s*\[AT\]\s*([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', block)
    if email_match:
        email = f"{email_match.group(1)}@{email_match.group(2)}"
    else:
        email = ''

    # Extract website — look for <a href="...">Homepage</a>
    website_match = re.search(r'<a[^>]+href="([^"]+)"[^>]*>(?:Homepage|Website|Personal Site)', block, re.IGNORECASE)
    if not website_match:
        # Any external link
        website_match = re.search(r'<a[^>]+href="(https?://[^"]+)"', block, re.IGNORECASE)
    website = website_match.group(1) if website_match else ''

    # Determine alumni position/year for alumni sections
    alumni_position = ''
    if is_alumni_section and title:
        alumni_position = title

    return {
        'name': name,
        'title': title,
        'email': email,
        'website': website,
        'photo_url': photo_url,
        'section': section_heading,
        'alumni_position': alumni_position,
    }


def map_section_to_role(section, is_alumni):
    """Map section heading to role."""
    s = section.lower()
    if is_alumni:
        return 'alumni'
    if 'faculty' in s:
        return 'faculty'
    if 'staff' in s:
        return 'staff'
    # Check undergrad BEFORE graduate (since 'undergraduate' contains 'graduate')
    if 'undergraduate' in s or 'undergrad' in s:
        return 'undergrad'
    if 'graduate' in s or 'phd' in s or 'ph.d' in s:
        return 'phd'
    if 'master' in s or 'ms ' in s or 'm.s' in s:
        return 'ms'
    if 'postdoc' in s:
        return 'postdoc'
    if 'collaborator' in s or 'visitor' in s or 'visiting' in s:
        return 'visitor'
    return 'phd'


def scrape_people():
    print(f"Fetching {BASE_URL}...")
    html = fetch(BASE_URL)
    if not html:
        print("ERROR: Could not fetch people page")
        return []

    print(f"  Fetched {len(html)} chars")

    # Remove script and style content
    html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL|re.IGNORECASE)
    html = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL|re.IGNORECASE)
    html = re.sub(r'<noscript[^>]*>.*?</noscript>', '', html, flags=re.DOTALL|re.IGNORECASE)

    # Get main content section
    main_match = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL|re.IGNORECASE)
    content = main_match.group(1) if main_match else html

    # Parse sections. Track h2 (main sections) and h3 (sub-sections in alumni)
    # We need to split the content at each heading, keeping track of:
    # - Current top-level section (h2): Faculty, Staff, Graduate students, etc., Alumni
    # - Current sub-section (h3): within Alumni: Faculty, Staff, PhD, Master, Undergrads

    people = []

    # Find all headings with positions
    heading_re = re.compile(r'<h([23])[^>]*>(.*?)</h\1>', re.DOTALL | re.IGNORECASE)
    headings = [(m.start(), int(m.group(1)), strip_tags(m.group(2)).strip()) for m in heading_re.finditer(content)]

    print(f"  Found {len(headings)} headings:")
    for pos, level, text in headings:
        print(f"    h{level}: '{text}'")

    # Split into segments
    # A segment = (start_pos, end_pos, h2_section, h3_section)
    segments = []
    current_h2 = "Faculty"
    current_h3 = None
    is_alumni = False

    for i, (pos, level, text) in enumerate(headings):
        next_pos = headings[i+1][0] if i+1 < len(headings) else len(content)
        segment_content = content[pos:next_pos]

        if level == 2:
            current_h2 = text
            current_h3 = None
            is_alumni = 'alumni' in text.lower()
        elif level == 3:
            current_h3 = text

        effective_section = current_h3 if current_h3 else current_h2
        segments.append((segment_content, effective_section, is_alumni))

    # Parse each segment
    for seg_content, section, alumni in segments:
        # Find all person blocks
        blocks = re.findall(r'<div style="clear:both">(.*?)</div>', seg_content, re.DOTALL | re.IGNORECASE)

        for block in blocks:
            person = parse_person_block(block, section, alumni)
            if person:
                person['is_alumni'] = alumni
                people.append(person)

    # Deduplicate by name
    seen = {}
    unique = []
    for p in people:
        key = p['name'].lower().strip()
        if key not in seen:
            seen[key] = True
            unique.append(p)

    return unique


def build_person_entry(scraped, existing_by_id, existing_by_name):
    """Build/update a person dict from scraped data."""
    name = scraped['name'].strip()
    person_id = slugify(name)
    section = scraped.get('section', '')
    is_alumni = scraped.get('is_alumni', False)

    role = map_section_to_role(section, is_alumni)

    # Override for known people
    if name == "Praneeth Chakravarthula":
        role = "faculty"

    # Check if already exists
    existing = existing_by_id.get(person_id) or existing_by_name.get(name.lower())

    if existing:
        entry = dict(existing)
        # Don't downgrade faculty
        if existing['role'] == 'faculty':
            pass
        elif role != existing['role'] and role != 'alumni':
            entry['role'] = role

        # Update empty fields
        if not entry.get('title') and scraped.get('title'):
            entry['title'] = scraped['title']
        if not entry.get('email') and scraped.get('email'):
            entry['email'] = scraped['email']
        if not entry.get('website') and scraped.get('website'):
            entry['website'] = scraped['website']

        # Download photo if missing
        if not entry.get('photoPath') and scraped.get('photo_url'):
            photo = download_photo(scraped['photo_url'], entry['id'])
            if photo:
                entry['photoPath'] = photo

        return entry
    else:
        # New person - download photo
        photo_path = ''
        if scraped.get('photo_url'):
            photo_path = download_photo(scraped['photo_url'], person_id)

        title = scraped.get('title', '')

        entry = {
            "id": person_id,
            "name": name,
            "role": role,
            "title": title,
            "email": scraped.get('email', ''),
            "photoPath": photo_path,
            "bio": "",
            "website": scraped.get('website', ''),
            "googleScholar": "",
            "github": "",
            "twitter": "",
            "interests": []
        }

        if role == 'alumni':
            alumni_pos = scraped.get('alumni_position', '') or title
            if alumni_pos:
                entry['alumniPosition'] = alumni_pos

        return entry


def main():
    # Load existing people
    with open(PEOPLE_JSON) as f:
        existing = json.load(f)

    existing_by_id = {p['id']: p for p in existing}
    existing_by_name = {p['name'].lower(): p for p in existing}

    print(f"Loaded {len(existing)} existing people")

    # Scrape new people
    scraped_people = scrape_people()

    if not scraped_people:
        print("No people scraped — check HTML structure")
        return

    print(f"\nScraped {len(scraped_people)} people total")
    for p in scraped_people:
        flag = '[NEW]' if p['name'].lower() not in existing_by_name else ''
        print(f"  {'[ALUMNI] ' if p['is_alumni'] else ''}[{p['section']}] {p['name']} {flag}")

    print(f"\nBuilding merged people list...")

    # Build merged list
    merged = []
    seen_ids = set()

    for scraped in scraped_people:
        entry = build_person_entry(scraped, existing_by_id, existing_by_name)
        if entry['id'] not in seen_ids:
            merged.append(entry)
            seen_ids.add(entry['id'])

    # Keep existing people not in scraped (they may have been removed from site but keep them)
    for ep in existing:
        if ep['id'] not in seen_ids:
            merged.append(ep)
            seen_ids.add(ep['id'])
            print(f"  Keeping existing (not on site): {ep['name']}")

    # Sort: active first by role order, then alumni; within each group sort by last name
    role_order = {'faculty': 0, 'staff': 1, 'postdoc': 2, 'phd': 3, 'ms': 4, 'undergrad': 5, 'visitor': 6, 'alumni': 7}
    def sort_key(p):
        last = p['name'].strip().split()[-1].lower() if p['name'].strip() else 'z'
        return (role_order.get(p['role'], 8), last)
    merged.sort(key=sort_key)

    # Save
    with open(PEOPLE_JSON, 'w') as f:
        json.dump(merged, f, indent=2)

    active = sum(1 for p in merged if p['role'] != 'alumni')
    alumni = sum(1 for p in merged if p['role'] == 'alumni')
    new_count = len(merged) - len(existing)
    print(f"\nSaved {len(merged)} people ({active} active, {alumni} alumni) to data/people.json")
    print(f"Added {new_count} new people")


if __name__ == '__main__':
    main()
