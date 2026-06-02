"""
Extract abstracts from local PDFs for publications that have no abstract and no DOI.
Uses pymupdf (fitz) for text extraction with multi-column handling.

Usage: python3 scripts/extract-pdf-abstracts.py
"""

import json
import os
import re
import fitz  # pymupdf

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.join(SCRIPT_DIR, "..")
PUBS_PATH = os.path.join(REPO_ROOT, "data", "publications.json")
PAPERS_DIR = os.path.join(REPO_ROOT, "public", "papers")


def clean_text(text):
    """Normalize whitespace and common ligatures."""
    text = text.replace('ﬁ', 'fi').replace('ﬂ', 'fl')
    text = text.replace('‘', "'").replace('’', "'")
    text = text.replace('“', '"').replace('”', '"')
    text = text.replace('–', '-').replace('—', '-')
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()


def extract_blocks(pdf_path, max_pages=4):
    """
    Extract text blocks sorted by vertical position.
    Returns list of (y0, text) tuples so we can reconstruct reading order.
    """
    try:
        doc = fitz.open(pdf_path)
        all_blocks = []
        for i, page in enumerate(doc):
            if i >= max_pages:
                break
            blocks = page.get_text("blocks", sort=True)
            for b in blocks:
                x0, y0, x1, y1, text, *_ = b
                text = text.strip()
                if text and len(text) > 10:
                    all_blocks.append((i, y0, text))
        return all_blocks
    except Exception as e:
        return []


def find_abstract(blocks):
    """
    Find the abstract in a list of text blocks.
    Returns the abstract string or '' if not found.
    """
    if not blocks:
        return ''

    # Concatenate all block text for pattern matching
    full_text = '\n'.join(clean_text(b[2]) for b in blocks)

    # Strategy 1: Explicit "Abstract" label followed by content
    # Covers: "Abstract—", "Abstract:", "ABSTRACT\n", "Abstract\n"
    # Separator after "Abstract": em-dash, en-dash, hyphen, colon, or whitespace
    sep = r'[-–—:\s]+'
    stop = r'(?:Index Terms|Keywords?|CCS|ACM|1[\s.]|I\s*\n|Introduction)'
    patterns = [
        # "Abstract— " / "Abstract- " / "Abstract: " inline (IEEE/ACM/SIGGRAPH)
        r'\bAbstract' + sep + r'([A-Z].{80,}?)(?=\n\s*' + stop + r')',
        # "Abstract" on its own line, content on next line(s)
        r'\bAbstract\b\s*\n+([A-Z].{80,}?)(?=\n\s*(?:Keywords?|Index Terms|CCS|1[\s.]|Introduction))',
        # "ABSTRACT" heading
        r'\bABSTRACT\b\s*\n+(.{80,}?)(?=\n\s*(?:Keywords?|Index Terms|1[\s.]|Introduction))',
        # Looser: paragraph after "Abstract" heading, at least 100 chars
        r'\bAbstract\b' + sep + r'(.{100,1200})(?=\n\n|\nKeywords?|\nIndex|\nCCS|\n1\s)',
    ]

    for pattern in patterns:
        m = re.search(pattern, full_text, re.DOTALL | re.IGNORECASE)
        if m:
            candidate = clean_text(m.group(1))
            # Reject if it looks like a copyright/permission notice
            if any(kw in candidate.lower() for kw in ['permission to make', 'all rights reserved', 'copyright', 'abstracting with']):
                continue
            if 80 < len(candidate) < 2500:
                return candidate

    # Strategy 2: Look for the word "Abstract" in block text,
    # then grab the next substantial block
    abstract_block_idx = None
    for i, (page, y, text) in enumerate(blocks):
        t = clean_text(text)
        # Check for a block that IS the abstract heading or starts with Abstract
        if re.match(r'^Abstract[\s:—–]', t, re.IGNORECASE) and len(t) < 30:
            abstract_block_idx = i
            break
        # Or a block that starts with "Abstract" and contains content
        m = re.match(r'^Abstract[\s:—–]+(.{80,})', t, re.IGNORECASE | re.DOTALL)
        if m:
            candidate = clean_text(m.group(1))
            if 80 < len(candidate) < 2500 and 'permission' not in candidate.lower():
                return candidate

    if abstract_block_idx is not None:
        # Collect next 1-3 blocks as the abstract content
        content_parts = []
        for j in range(abstract_block_idx + 1, min(abstract_block_idx + 4, len(blocks))):
            t = clean_text(blocks[j][2])
            # Stop if we hit a section heading or keywords
            if re.match(r'^(?:Keywords?|Index Terms?|CCS|ACM|\d+\s*\.?\s*Introduction|1\s*\.)', t, re.IGNORECASE):
                break
            if len(t) > 30:
                content_parts.append(t)
        if content_parts:
            candidate = ' '.join(content_parts)
            if len(candidate) >= 80:
                return candidate

    # Strategy 3: For older papers without "Abstract" label,
    # find the first paragraph that looks like body text (50-1500 chars, not a heading)
    heading_re = re.compile(r'^(?:\d+[\.\s]|[A-Z][A-Z\s]{3,}$|Fig\.|Table\s|References?|Acknowledgm|Editor\b)', re.IGNORECASE)
    skip_re = re.compile(r'@|©|http|www\.|doi:|^\d{4}$|permission|copyright|^\w+\s+Editor\b', re.IGNORECASE)

    candidates = []
    for page, y, text in blocks:
        t = clean_text(text)
        if len(t) < 80 or len(t) > 2000:
            continue
        if heading_re.match(t):
            continue
        if skip_re.search(t):
            continue
        # Must have multiple sentences (rough check: contains '. ')
        if t.count('. ') < 1 and t.count('.\n') < 1:
            continue
        candidates.append(t)

    # Return the first candidate that appears in the first 2 pages
    # (heuristic: abstract is usually near the top)
    if candidates:
        return candidates[0]

    return ''


def main():
    pubs = json.load(open(PUBS_PATH))

    # Only process papers that:
    # - have no abstract
    # - have no DOI (papers with DOIs will be handled by the S2 DOI lookup in enrich-publications.ts)
    # - have a local PDF
    targets = [
        p for p in pubs
        if not p.get('abstract') and not p.get('doi') and p.get('pdfPath')
    ]

    print(f"Extracting abstracts from {len(targets)} PDFs (no-DOI papers only)...\n")

    extracted = 0
    failed = 0
    scanned = 0

    for i, pub in enumerate(targets):
        pdf_path = os.path.join(REPO_ROOT, "public", pub['pdfPath'].lstrip('/'))
        if not os.path.exists(pdf_path):
            print(f"[{i+1}/{len(targets)}] MISSING: {pub['id']}")
            failed += 1
            continue

        blocks = extract_blocks(pdf_path)
        if not blocks:
            print(f"[{i+1}/{len(targets)}] SCANNED (no text): {pub['id']}")
            scanned += 1
            continue

        abstract = find_abstract(blocks)
        if abstract and len(abstract) >= 80:
            for p in pubs:
                if p['id'] == pub['id']:
                    p['abstract'] = abstract
                    break
            extracted += 1
            print(f"[{i+1}/{len(targets)}] OK  ({len(abstract):4d} chars): {pub['title'][:65]}")
        else:
            print(f"[{i+1}/{len(targets)}] MISS            : {pub['id']} — {pub['title'][:55]}")
            failed += 1

    json.dump(pubs, open(PUBS_PATH, 'w'), indent=2)
    print(f"\nDone. Extracted: {extracted}, Scanned/no-text: {scanned}, Failed: {failed}")
    print(f"\nNext step — run S2 DOI lookups + Gemini KC generation:")
    print(f"  GEMINI_API_KEY=... npx tsx scripts/enrich-publications.ts")


if __name__ == '__main__':
    main()
