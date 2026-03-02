"""
Publication Scraper Pipeline for VCAIL Website
Scrapes S2 → Filters → Downloads PDFs → AI Extracts Contributions → Merges → Saves
"""

import os
import re
import json
import html
from pathlib import Path
from typing import List, Dict, Any
from dotenv import load_dotenv

from semantic_scholar_scraper import SemanticScholarScraper
from ai_summarizer import AISummarizer
from pdf_downloader import PDFDownloader

try:
    from thumbnail_extractor import ThumbnailExtractor
    THUMBNAIL_AVAILABLE = True
except ImportError:
    THUMBNAIL_AVAILABLE = False
    print("Note: Thumbnail extraction unavailable (install PyMuPDF and Pillow for this feature)")

load_dotenv()

# Fix: Path resolution makes the script runnable from anywhere
BASE_DIR = Path(__file__).resolve().parent.parent 
OUTPUT_FILE = BASE_DIR / "src/data/publications.json"
PUBLIC_DIR = BASE_DIR / "public"
PDF_DIR = PUBLIC_DIR / "papers"
THUMBNAIL_DIR = PUBLIC_DIR / "publication-photos"

NON_PAPER_TITLE_PATTERNS = [
    r"^system and method", r"^apparatus", r"^systems,?\s+methods",     
    r"^method and", r"sensor mount", r"loupe display", r"keynote events?$",         
    r"^erratum", r"^corrigendum", r"^message from the", r"^front matter",            
    r"^index$", r"^table of contents",       
]

GARBAGE_TITLE_PATTERNS = [
    r"^[a-z]{1,5}$", r"^[^a-z]*$", r"^\w+\s+\w+$", r"^abst",           
]

NON_PAPER_VENUE_PATTERNS = ["zenodo", "patent", "us patent", "project", "technical report", "tech report"]
MIN_TITLE_LENGTH = 15

def is_non_paper(pub: Dict) -> str:
    title = html.unescape(pub.get("title", "")).strip()
    title_lower = title.lower()
    meta = (pub.get("meta") or "").lower()

    if len(title) < MIN_TITLE_LENGTH: return f"title too short ({len(title)} chars)"
    for pattern in NON_PAPER_TITLE_PATTERNS:
        if re.search(pattern, title_lower): return f"patent/non-paper title"
    normalized = re.sub(r'[^a-z0-9\s]', '', title_lower).strip()
    for pattern in GARBAGE_TITLE_PATTERNS:
        if re.match(pattern, normalized): return f"garbage title"
    for pattern in NON_PAPER_VENUE_PATTERNS:
        if pattern in meta: return f"non-paper venue"
    return ""

def filter_publications(publications: List[Dict]) -> List[Dict]:
    kept = []
    removed = 0
    for pub in publications:
        if is_non_paper(pub): removed += 1
        else: kept.append(pub)
    print(f"\n🗑️ Filtered out {removed} non-papers. Remaining: {len(kept)}")
    return kept

LAB_MEMBERS = [
    { "name": "Praneeth Chakravarthula", "s2_id": "51151674", "start_year": 2014 },
    { "name": "Henry Fuchs", "s2_id": "145472944", "start_year": 1975 },
    { "name": "Adrian Ilie", "s2_id": "2044671", "start_year": 2002 },
    { "name": "Andrei State", "s2_id": "144379239", "start_year": 1994 },
    { "name": "Kurtis Keller", "s2_id": "", "start_year": 1998 },
    { "name": "Jade Kandel", "s2_id": "2215952216", "start_year": 2020 },
    { "name": "Ashley Neall", "s2_id": "2296783777", "start_year": 2023 },
    { "name": "Qian Zhang", "s2_id": "2308022912", "start_year": 2020 }, 
    { "name": "Pranav Wagh", "s2_id": "2280805939", "start_year": 2023 },
    { "name": "Jayden Lim", "s2_id": "", "start_year": 2023 }, 
]

SUMMARIZE_WITH_AI = True
DOWNLOAD_PDFS = True
EXTRACT_THUMBNAILS = True
FORCE_RESUMMARY = os.getenv("FORCE_RESUMMARY", "false").lower() == "true"
START_YEAR = int(os.getenv("START_YEAR_OVERRIDE", "2014"))
END_YEAR = None

ALWAYS_PRESERVE = ["image", "summary", "keyContributions", "project"]
SCRAPER_CONTROLLED = ["authors", "meta", "link", "tags"]

def _is_empty(val) -> bool:
    if val is None: return True
    if isinstance(val, str) and val.strip() == "": return True
    if isinstance(val, list) and len(val) == 0: return True
    return False

def _merge_field(existing: Dict, new_pub: Dict, key: str) -> Any:
    existing_val = existing.get(key)
    new_val = new_pub.get(key)
    if key in ALWAYS_PRESERVE:
        if not _is_empty(existing_val): return existing_val
        return new_val
    if key in SCRAPER_CONTROLLED:
        return new_val if not _is_empty(new_val) else existing_val
    return new_val if not _is_empty(new_val) else existing_val

def merge_with_existing(new_pubs: List[Dict], existing_file: Path) -> List[Dict]:
    try:
        with open(existing_file, "r", encoding="utf-8") as f:
            existing_pubs = json.load(f)
    except FileNotFoundError:
        return new_pubs

    # Fix: Ensure empty slugs don't overwrite each other in the lookup dict
    existing_by_slug = {p.get("slug"): p for p in existing_pubs if p.get("slug")}
    merged = []
    merged_slugs = set()

    for pub in new_pubs:
        slug = pub.get("slug", "")
        if slug:
            merged_slugs.add(slug)
            
        existing = existing_by_slug.get(slug) if slug else None
        
        if existing:
            merged_pub = {}
            all_keys = set(existing.keys()) | set(pub.keys())
            for k in all_keys:
                if k.startswith("_"): continue
                merged_pub[k] = _merge_field(existing, pub, k)
            merged.append(merged_pub)
        else:
            merged.append({k: v for k, v in pub.items() if not k.startswith("_")})

    for pub in existing_pubs:
        if pub.get("slug", "") not in merged_slugs:
            merged.append(pub)

    return merged

def save_publications(publications: List[Dict], output_file: Path):
    clean_pubs = [{k: v for k, v in p.items() if not k.startswith("_")} for p in publications]
    
    def get_year(pub):
        for tag in pub.get("tags", []):
            if tag.isdigit() and len(tag) == 4: return int(tag)
        return 0

    sorted_pubs = sorted(clean_pubs, key=lambda x: (-get_year(x), x.get("title", "")))
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(sorted_pubs, f, indent=2, ensure_ascii=False)

def run_pipeline():
    print(f"\n{'='*70}\nVCAIL PUBLICATION SCRAPER PIPELINE\n{'='*70}")
    
    scraper = SemanticScholarScraper()
    publications = scraper.scrape_multiple_authors(LAB_MEMBERS, START_YEAR, END_YEAR)
    publications = scraper.deduplicate(publications)
    publications = filter_publications(publications)

    if DOWNLOAD_PDFS:
        downloader = PDFDownloader(output_dir=PDF_DIR)
        publications = downloader.download_all(publications)

    if EXTRACT_THUMBNAILS and THUMBNAIL_AVAILABLE:
        extractor = ThumbnailExtractor(output_dir=THUMBNAIL_DIR)
        publications = extractor.extract_all(publications, base_public_dir=PUBLIC_DIR)

    if SUMMARIZE_WITH_AI:
        gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_AI_API_KEY")
        if gemini_key:
            summarizer = AISummarizer(api_key=gemini_key)
            publications = summarizer.summarize_all(publications, pdf_dir=PDF_DIR, force=FORCE_RESUMMARY)
        else:
            print("⚠ Skipping AI Summary: GEMINI_API_KEY not found in environment")

    publications = merge_with_existing(publications, OUTPUT_FILE)
    save_publications(publications, OUTPUT_FILE)
    print(f"\nPIPELINE COMPLETE. Saved to {OUTPUT_FILE}.")

if __name__ == "__main__":
    run_pipeline()