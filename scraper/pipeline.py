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
OUTPUT_FILE = BASE_DIR / "data/publications.json"
CONFIG_FILE = BASE_DIR / "lab.config.json"
PUBLIC_DIR = BASE_DIR / "public"
PDF_DIR = PUBLIC_DIR / "papers"
THUMBNAIL_DIR = PUBLIC_DIR / "images" / "publications"

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
    venue = (pub.get("venue") or "").lower()

    if len(title) < MIN_TITLE_LENGTH: return f"title too short ({len(title)} chars)"
    for pattern in NON_PAPER_TITLE_PATTERNS:
        if re.search(pattern, title_lower): return f"patent/non-paper title"
    normalized = re.sub(r'[^a-z0-9\s]', '', title_lower).strip()
    for pattern in GARBAGE_TITLE_PATTERNS:
        if re.match(pattern, normalized): return f"garbage title"
    for pattern in NON_PAPER_VENUE_PATTERNS:
        if pattern in venue: return f"non-paper venue"
    return ""

def filter_publications(publications: List[Dict]) -> List[Dict]:
    kept = []
    removed = 0
    for pub in publications:
        if is_non_paper(pub): removed += 1
        else: kept.append(pub)
    print(f"\n🗑️ Filtered out {removed} non-papers. Remaining: {len(kept)}")
    return kept

def load_lab_members(config_file: Path = CONFIG_FILE) -> List[Dict]:
    """
    Reads the author roster from lab.config.json (semanticScholar.authorIds),
    which is the single source of truth for who the pipeline scrapes.
    An author with id: "" is kept in the roster but skipped for fetching
    (e.g. someone without a Semantic Scholar profile yet).
    """
    with open(config_file, encoding="utf-8") as f:
        cfg = json.load(f)
    authors = cfg.get("semanticScholar", {}).get("authorIds", [])
    return [
        {
            "name": a.get("name", ""),
            "s2_id": a.get("id", ""),
            "start_year": a.get("startYear"),
            "end_year": a.get("endYear"),
        }
        for a in authors
    ]

SUMMARIZE_WITH_AI = True
DOWNLOAD_PDFS = True
EXTRACT_THUMBNAILS = True
FORCE_RESUMMARY = os.getenv("FORCE_RESUMMARY", "false").lower() == "true"
# Fallback only for authors that don't specify their own startYear/endYear in lab.config.json.
DEFAULT_START_YEAR = int(os.getenv("START_YEAR_OVERRIDE", "2014"))
DEFAULT_END_YEAR = None

# Fields a human/AI has curated that the scraper should never blank out once set.
ALWAYS_PRESERVE = ["imagePath", "award", "featured", "bibtex", "press", "summaryModel"]
# Fields where a fresh, non-empty scrape value always wins (authoritative source).
SCRAPER_CONTROLLED = ["authors", "tags"]

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

def _normalize_title(title: str) -> str:
    t = html.unescape(title or "").lower()
    t = re.sub(r'[^a-z0-9\s]', '', t)
    return re.sub(r'\s+', ' ', t).strip()

_ID_STOPWORDS = {"a", "an", "the", "on", "of", "for", "to", "in", "with", "and", "towards", "toward"}

def _topic_word(title: str) -> str:
    """Pick a short topic word from the title, for generating a new publication's id."""
    words = re.findall(r"[A-Za-z0-9]+", html.unescape(title or ""))
    for w in words:
        if w.lower() not in _ID_STOPWORDS:
            return re.sub(r'[^a-z0-9]', '', w.lower()) or "paper"
    return re.sub(r'[^a-z0-9]', '', words[0].lower()) if words else "untitled"

def _generate_new_id(pub: Dict, taken_ids: set) -> str:
    """author-year-topic id, in the style of the existing curated dataset (e.g. kandel-2024-pdinsighter)."""
    authors = pub.get("authors") or []
    first_author = authors[0] if authors else ""
    lastname = re.sub(r'[^a-z0-9]', '', first_author.split()[-1].lower()) if first_author else "unknown"
    year = pub.get("year") or "0000"
    topic = _topic_word(pub.get("title", ""))
    base = f"{lastname}-{year}-{topic}"
    candidate, n = base, 2
    while candidate in taken_ids:
        candidate = f"{base}-{n}"
        n += 1
    return candidate

def merge_with_existing(new_pubs: List[Dict], existing_file: Path) -> List[Dict]:
    """
    Matches freshly-scraped papers against the existing curated dataset using
    Semantic Scholar paperId, then DOI, then normalized title as a last resort —
    NOT by slug/id equality, since existing entries use a hand-curated
    author-year-topic id scheme the scraper has no way to reproduce exactly.
    A matched existing publication always keeps its existing "id"; only genuinely
    new publications get a freshly generated one.
    """
    try:
        with open(existing_file, "r", encoding="utf-8") as f:
            existing_pubs = json.load(f)
    except FileNotFoundError:
        existing_pubs = []

    by_s2id = {p["semanticScholarId"]: p for p in existing_pubs if p.get("semanticScholarId")}
    by_doi = {p["doi"].strip().lower(): p for p in existing_pubs if p.get("doi")}
    by_title: Dict[str, Dict] = {}
    for p in existing_pubs:
        nt = _normalize_title(p.get("title", ""))
        if nt:
            by_title.setdefault(nt, p)  # first-seen wins on duplicate titles

    taken_ids = {p["id"] for p in existing_pubs if p.get("id")}
    matched_existing_ids = set()
    merged = []
    new_count = 0

    for pub in new_pubs:
        s2id = pub.get("semanticScholarId") or ""
        doi = (pub.get("doi") or "").strip().lower()
        nt = _normalize_title(pub.get("title", ""))

        existing = None
        if s2id and s2id in by_s2id:
            existing = by_s2id[s2id]
        elif doi and doi in by_doi:
            existing = by_doi[doi]
        elif nt and nt in by_title:
            existing = by_title[nt]

        if existing:
            merged_pub = {}
            all_keys = set(existing.keys()) | set(pub.keys())
            for k in all_keys:
                if k.startswith("_"): continue
                merged_pub[k] = _merge_field(existing, pub, k)
            merged_pub["id"] = existing["id"]  # never overwrite a curated id
            merged.append(merged_pub)
            matched_existing_ids.add(existing["id"])
        else:
            new_id = _generate_new_id(pub, taken_ids)
            taken_ids.add(new_id)
            clean = {k: v for k, v in pub.items() if not k.startswith("_")}
            clean["id"] = new_id
            merged.append(clean)
            new_count += 1

    carried_over = 0
    for pub in existing_pubs:
        if pub.get("id") not in matched_existing_ids:
            merged.append(pub)
            carried_over += 1

    print(f"\n🔗 Merge: {len(matched_existing_ids)} matched existing, "
          f"{new_count} new, {carried_over} existing carried over unchanged "
          f"(not present in this scrape batch)")

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

    lab_members = load_lab_members()
    print(f"Roster ({len(lab_members)} from lab.config.json):")
    for m in lab_members:
        years = f"{m['start_year']}–{m['end_year']}" if m.get("end_year") else f"{m['start_year']}+"
        s2 = m["s2_id"] or "(no S2 id, skipped)"
        print(f"  {m['name']}: {s2} [{years}]")

    scraper = SemanticScholarScraper()
    publications = scraper.scrape_multiple_authors(lab_members, DEFAULT_START_YEAR, DEFAULT_END_YEAR)
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