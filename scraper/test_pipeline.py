"""
Test script for the VCAIL publication scraper pipeline.
Rigorous schema validation against publications.json / Publication interface.
Uses SemanticScholarScraper and verifies all components work end-to-end.

Usage:
    # Full rigorous test (multiple authors, schema validation)
    python test_pipeline.py

    # Also test AI summarization (needs GEMINI_API_KEY)
    python test_pipeline.py --with-ai
"""

import os
import re
import sys
import json
import tempfile
from pathlib import Path
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from semantic_scholar_scraper import SemanticScholarScraper
from ai_summarizer import AISummarizer
from pipeline import filter_publications, merge_with_existing, save_publications

# ─────────────────────────────────────────────
# Schema: matches src/lib/publications.ts Publication interface
# ─────────────────────────────────────────────
REQUIRED_FIELDS = ["title", "slug", "authors", "meta", "image", "link", "tags"]
OPTIONAL_FIELDS = ["summary", "keyContributions", "project"]
ALLOWED_KEYS = set(REQUIRED_FIELDS + OPTIONAL_FIELDS)

# Multiple authors with S2 IDs for broader coverage
TEST_AUTHORS = [
    {"name": "Pranav Wagh", "s2_id": "2280805939", "start_year": 2023},
    {"name": "Jade Kandel", "s2_id": "2215952216", "start_year": 2020},
    {"name": "Qian Zhang", "s2_id": "2308022912", "start_year": 2020},
]
TEST_START_YEAR = 2023
TEST_END_YEAR = 2025


def validate_publication_schema(pub: Dict[str, Any], index: int) -> List[str]:
    """
    Validate a single publication against the Publication interface.
    Returns list of error messages (empty if valid).
    """
    errors: List[str] = []

    # 1. Required fields present
    for field in REQUIRED_FIELDS:
        if field not in pub:
            errors.append(f"[{index}] Missing required field: {field}")

    # 2. No extra keys (only schema fields)
    extra = set(pub.keys()) - ALLOWED_KEYS
    if extra:
        extra_clean = [k for k in extra if not k.startswith("_")]
        if extra_clean:
            errors.append(f"[{index}] Extra keys (not in schema): {extra_clean}")

    # 3. Type validation
    if "title" in pub and not isinstance(pub["title"], str):
        errors.append(f"[{index}] title must be string, got {type(pub['title'])}")
    if "slug" in pub:
        if not isinstance(pub["slug"], str):
            errors.append(f"[{index}] slug must be string, got {type(pub['slug'])}")
        elif not pub["slug"]:
            errors.append(f"[{index}] slug must be non-empty")
        elif not re.match(r"^[a-z0-9-]+$", pub["slug"]):
            errors.append(f"[{index}] slug must be URL-safe (lowercase, hyphens, digits): {pub['slug'][:40]}")
    if "authors" in pub and not isinstance(pub["authors"], str):
        errors.append(f"[{index}] authors must be string, got {type(pub['authors'])}")
    if "meta" in pub and not isinstance(pub["meta"], str):
        errors.append(f"[{index}] meta must be string, got {type(pub['meta'])}")
    if "image" in pub and not isinstance(pub["image"], str):
        errors.append(f"[{index}] image must be string, got {type(pub['image'])}")
    if "link" in pub and not isinstance(pub["link"], str):
        errors.append(f"[{index}] link must be string, got {type(pub['link'])}")
    if "tags" in pub:
        if not isinstance(pub["tags"], list):
            errors.append(f"[{index}] tags must be array, got {type(pub['tags'])}")
        else:
            for i, t in enumerate(pub["tags"]):
                if not isinstance(t, str):
                    errors.append(f"[{index}] tags[{i}] must be string, got {type(t)}")
    if "summary" in pub and pub["summary"] is not None and not isinstance(pub["summary"], str):
        errors.append(f"[{index}] summary must be string or null, got {type(pub['summary'])}")
    if "keyContributions" in pub and pub["keyContributions"] is not None:
        if not isinstance(pub["keyContributions"], list):
            errors.append(f"[{index}] keyContributions must be array, got {type(pub['keyContributions'])}")
        else:
            for i, c in enumerate(pub["keyContributions"]):
                if not isinstance(c, str):
                    errors.append(f"[{index}] keyContributions[{i}] must be string, got {type(c)}")
    if "project" in pub and pub["project"] is not None and not isinstance(pub["project"], str):
        errors.append(f"[{index}] project must be string or null, got {type(pub['project'])}")

    # 4. Tags should contain a 4-digit year when paper has venue/year
    if "tags" in pub and isinstance(pub["tags"], list) and "meta" in pub:
        meta = str(pub["meta"])
        year_in_meta = re.search(r"\b(19|20)\d{2}\b", meta)
        if year_in_meta:
            year = year_in_meta.group(0)
            if year not in pub["tags"]:
                errors.append(f"[{index}] tags should include year {year} from meta '{meta[:40]}'")

    return errors


def validate_all_publications(publications: List[Dict], label: str) -> None:
    """Validate every publication and raise on first error."""
    all_errors: List[str] = []
    for i, pub in enumerate(publications):
        clean = {k: v for k, v in pub.items() if not k.startswith("_")}
        errs = validate_publication_schema(clean, i)
        all_errors.extend(errs)

    if all_errors:
        raise AssertionError(f"{label} schema validation failed:\n  " + "\n  ".join(all_errors))


def test_semantic_scholar_scraping():
    """Test Semantic Scholar scraping with multiple authors."""
    print("\n" + "=" * 70)
    print("TEST 1: Semantic Scholar Scraping (multi-author)")
    print("=" * 70)

    scraper = SemanticScholarScraper()
    all_papers: List[Dict] = []
    for author in TEST_AUTHORS:
        papers = scraper.scrape_author(author, start_year=TEST_START_YEAR, end_year=TEST_END_YEAR)
        all_papers.extend(papers)

    assert len(all_papers) > 0, "Semantic Scholar returned no papers"
    print(f"✓ Fetched {len(all_papers)} papers from {len(TEST_AUTHORS)} authors")

    # Rigorous schema validation on raw scraper output
    validate_all_publications(all_papers, "Scraper output")
    print("✓ All papers match Publication schema (types, required fields, slug format)")

    sample = all_papers[0]
    clean_sample = {k: v for k, v in sample.items() if not k.startswith("_")}
    print(f"\n  Sample (clean):")
    for k in REQUIRED_FIELDS:
        v = clean_sample.get(k, "")
        if isinstance(v, list):
            print(f"    {k}: {v}")
        else:
            print(f"    {k}: {(str(v) or '')[:60]}...")

    return all_papers


def test_deduplication_and_filter(papers):
    """Test deduplication and pipeline filter."""
    print("\n" + "=" * 70)
    print("TEST 2: Deduplication + Filter")
    print("=" * 70)

    scraper = SemanticScholarScraper()
    deduped = scraper.deduplicate(papers)
    filtered = filter_publications(deduped)

    assert len(filtered) <= len(deduped), "Filter should not add papers"
    print(f"✓ Dedup: {len(papers)} → {len(deduped)}, Filter → {len(filtered)} papers")

    validate_all_publications(filtered, "Filtered output")
    print("✓ Filtered papers still match schema")

    return filtered


def test_save_format_and_roundtrip(publications):
    """Test pipeline save format and JSON round-trip."""
    print("\n" + "=" * 70)
    print("TEST 3: Save Format + JSON Round-trip")
    print("=" * 70)

    clean_pubs = [{k: v for k, v in p.items() if not k.startswith("_")} for p in publications]

    # No internal fields in output
    for pub in clean_pubs:
        internal = [k for k in pub.keys() if k.startswith("_")]
        assert len(internal) == 0, f"Internal fields in clean output: {internal}"

    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        tmp_path = f.name
    save_publications(publications, Path(tmp_path))

    with open(tmp_path, "r", encoding="utf-8") as f:
        loaded = json.load(f)

    assert isinstance(loaded, list), "JSON root must be array"
    assert len(loaded) == len(clean_pubs), f"Round-trip count mismatch: {len(loaded)} vs {len(clean_pubs)}"

    validate_all_publications(loaded, "Loaded JSON")
    print("✓ Save/load round-trip preserves schema")

    os.unlink(tmp_path)
    return loaded


def test_merge_with_existing(publications):
    """Test merge logic produces valid schema."""
    print("\n" + "=" * 70)
    print("TEST 4: Merge with Existing")
    print("=" * 70)

    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        # Seed with one existing pub
        existing = [{
            "title": "Existing Paper",
            "slug": "existing-paper",
            "authors": "A. Author",
            "meta": "Test 2020",
            "image": "/publication-photos/existing.jpg",
            "link": "https://example.com",
            "tags": ["Conference", "2020"],
            "summary": "Old summary",
            "keyContributions": ["Contribution 1"],
            "project": "",
        }]
        json.dump(existing, f, indent=2)
        tmp_path = f.name

    merged = merge_with_existing(publications, Path(tmp_path))
    os.unlink(tmp_path)

    # Merged should have new + existing (existing preserved)
    assert len(merged) >= len(publications), "Merge should preserve or add"
    slugs = [p.get("slug") for p in merged if p.get("slug")]
    assert "existing-paper" in slugs, "Existing publication should be preserved"

    validate_all_publications(merged, "Merged output")
    print("✓ Merge produces valid schema, preserves existing")

    return merged


def test_ai_summarization(publications):
    """Test AI summarization (requires GEMINI_API_KEY)."""
    print("\n" + "=" * 70)
    print("TEST 5: AI Summarization (Gemini)")
    print("=" * 70)

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_AI_API_KEY")
    if not api_key:
        print("⚠ GEMINI_API_KEY not set — skipping")
        return

    summarizer = AISummarizer(api_key=api_key)
    test_pub = next((p for p in publications if p.get("_abstract") and len(p.get("_abstract", "")) > 50), None)
    if not test_pub:
        print("⚠ No paper with abstract — skipping")
        return

    print(f"  Testing on: {test_pub['title'][:60]}...")
    result = summarizer.analyze_from_text(test_pub["title"], test_pub["_abstract"])

    if result:
        assert isinstance(result, list), "keyContributions must be list"
        assert len(result) >= 1, "At least one contribution"
        for c in result:
            assert isinstance(c, str), "Each contribution must be string"
        print(f"  ✓ Generated {len(result)} key contributions")
    else:
        print("  ✗ No result (check API key)")


def main():
    with_ai = "--with-ai" in sys.argv

    print("=" * 70)
    print("VCAIL PUBLICATION PIPELINE — RIGOROUS SCHEMA TEST")
    print("=" * 70)

    papers = test_semantic_scholar_scraping()
    filtered = test_deduplication_and_filter(papers)
    loaded = test_save_format_and_roundtrip(filtered)
    test_merge_with_existing(filtered)

    if with_ai:
        test_ai_summarization(filtered)

    print("\n" + "=" * 70)
    print("ALL TESTS PASSED ✓")
    print("=" * 70)
    print(f"\nValidated {len(loaded)} publications against Publication schema")

    if not with_ai:
        print("\nOptional: --with-ai  Test AI summarization (needs GEMINI_API_KEY)")


if __name__ == "__main__":
    main()
