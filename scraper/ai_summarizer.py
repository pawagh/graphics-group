import json
import base64
import time
import requests
from pathlib import Path
from typing import Optional, Dict, List
import os

# Minimum abstract length (characters) to attempt text-only analysis.
# A 50-char abstract is barely a sentence — too short to extract real contributions
# without the model drawing from prior knowledge (hallucination).
MIN_ABSTRACT_CHARS = 300

# Sent when a PDF is available. Asks Gemini to first verify the title matches
# the document before extracting anything, so a wrong PDF is caught immediately.
PDF_PROMPT = """\
You are given a PDF of an academic research paper.

STEP 1 — Verify the paper.
Check whether the title of the paper in this PDF matches (or closely matches) the expected title below.
If the PDF does NOT appear to contain this paper — for example if it is a different paper, a proceedings cover page, or unrelated content — respond with:
{{"keyContributions": [], "verified": false, "reason": "title mismatch or unrelated content"}}

Expected title: {title}

STEP 2 — Extract key contributions (only if verified).
If the PDF IS this paper, extract 3-5 KEY CONTRIBUTIONS as short, specific bullet points.
- One sentence each.
- Drawn ONLY from the text of this PDF — do not use any prior knowledge about this paper or similar papers.
- Focus on the introduction, contributions section, and conclusion.

Respond with ONLY valid JSON, no markdown fences:
{{"keyContributions": ["...", "..."], "verified": true}}"""

# Sent when no PDF is available, only an abstract from Semantic Scholar.
# Explicitly forbids the model from drawing on training-data knowledge.
TEXT_PROMPT = """\
You are given the abstract of an academic research paper.

Expected title: {title}

Abstract:
{abstract}

Extract 3-5 KEY CONTRIBUTIONS based ONLY on the abstract text provided above.
Do NOT use any prior knowledge about this paper, similar papers, or anything outside the abstract.
If the abstract does not contain enough detail to identify distinct contributions, return fewer items rather than inventing them.

Respond with ONLY valid JSON, no markdown fences:
{{"keyContributions": ["...", "..."]}}"""


class AISummarizer:
    def __init__(self, api_key: str, model: str = "gemini-2.5-flash-lite"):
        self.api_key = api_key
        self.model = model
        self.base_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

    def _call_gemini(self, contents: List[Dict], max_retries: int = 3) -> Optional[str]:
        gen_config = {
            "maxOutputTokens": 500,
            "temperature": 0.1,
            "responseMimeType": "application/json",
        }

        for attempt in range(max_retries):
            try:
                response = requests.post(
                    f"{self.base_url}?key={self.api_key}",
                    headers={"Content-Type": "application/json"},
                    json={"contents": contents, "generationConfig": gen_config},
                    timeout=60,
                )

                if response.status_code == 429:
                    wait = 15 * (attempt + 1)
                    time.sleep(wait)
                    continue

                if response.status_code == 200:
                    data = response.json()
                    candidates = data.get("candidates", [])
                    if not candidates:
                        return None
                    content = candidates[0].get("content", {})
                    if not content:
                        finish_reason = candidates[0].get("finishReason", "UNKNOWN")
                        print(f"   ⚠ Gemini returned empty content. Reason: {finish_reason}")
                        return None
                    return content.get("parts", [])[0].get("text", "").strip()

            except Exception as e:
                print(f"   ✗ Gemini API error: {e}")
                time.sleep(2 ** attempt)

        return None

    def _parse_response(self, raw_text: str) -> Optional[List[str]]:
        if not raw_text:
            return None
        text = raw_text.strip()
        if text.startswith("```"):
            lines = [l for l in text.split("\n") if not l.strip().startswith("```")]
            text = "\n".join(lines).strip()
        try:
            parsed = json.loads(text)
            contribs = parsed.get("keyContributions", [])
            return [str(c).strip() for c in contribs if str(c).strip()] or None
        except json.JSONDecodeError:
            return None

    def _parse_pdf_response(self, raw_text: str, title: str) -> Optional[List[str]]:
        """Parse PDF analysis response and enforce title-verification gate."""
        if not raw_text:
            return None
        text = raw_text.strip()
        if text.startswith("```"):
            lines = [l for l in text.split("\n") if not l.strip().startswith("```")]
            text = "\n".join(lines).strip()
        try:
            parsed = json.loads(text)
        except json.JSONDecodeError:
            return None

        if not parsed.get("verified", True):
            reason = parsed.get("reason", "unknown")
            print(f"   ⚠ PDF verification failed: {reason} — skipping to avoid hallucination")
            return None

        contribs = parsed.get("keyContributions", [])
        return [str(c).strip() for c in contribs if str(c).strip()] or None

    def analyze_from_pdf(self, pdf_path: Path, title: str = "") -> Optional[List[str]]:
        if not title:
            print("   ⚠ No title provided for PDF verification — skipping")
            return None
        try:
            with open(pdf_path, "rb") as f:
                pdf_data = base64.standard_b64encode(f.read()).decode("utf-8")

            prompt = PDF_PROMPT.format(title=title)
            contents = [{
                "parts": [
                    {"inline_data": {"mime_type": "application/pdf", "data": pdf_data}},
                    {"text": prompt},
                ]
            }]
            raw = self._call_gemini(contents)
            return self._parse_pdf_response(raw, title)
        except Exception as e:
            print(f"   ✗ PDF analysis error: {e}")
            return None

    def analyze_from_text(self, title: str, abstract: str) -> Optional[List[str]]:
        """Abstract-only fallback. Requires a substantial abstract to avoid hallucination."""
        if not abstract or len(abstract.strip()) < MIN_ABSTRACT_CHARS:
            if abstract:
                print(f"   ⚠ Abstract too short ({len(abstract.strip())} chars, need {MIN_ABSTRACT_CHARS}) — skipping to avoid hallucination")
            return None

        prompt = TEXT_PROMPT.format(title=title, abstract=abstract.strip())
        contents = [{"parts": [{"text": prompt}]}]
        raw = self._call_gemini(contents)
        return self._parse_response(raw)

    def summarize_all(self, publications: List[Dict], pdf_dir: Path, force: bool = False, rate_limit_delay: float = 4.0) -> List[Dict]:
        need_analysis = [p for p in publications if force or not p.get("keyContributions")]

        print(f"\n{'='*70}")
        print(f"AI Extraction: {len(need_analysis)} papers need Key Contributions")
        print(f"{'='*70}")

        stats = {"pdf": 0, "text": 0, "skipped": 0, "failed": 0, "hallucination_blocked": 0}

        for i, pub in enumerate(publications, 1):
            if pub.get("keyContributions") and not force:
                stats["skipped"] += 1
                continue

            title = pub.get("title", "")
            print(f"\n[{i}/{len(publications)}] {title[:70]}...")

            local_pdf = pub.get("pdfPath") or pub.get("_local_pdf", "")
            abstract = pub.get("abstract") or pub.get("_abstract", "")
            contributions = None

            if local_pdf:
                pdf_path = pdf_dir / local_pdf.lstrip("/").replace("papers/", "")
                if pdf_path.exists():
                    print(f"   📄 Extracting from PDF (with title verification)...")
                    contributions = self.analyze_from_pdf(pdf_path, title)
                    if contributions:
                        stats["pdf"] += 1
                    elif contributions is None and local_pdf:
                        stats["hallucination_blocked"] += 1

            if not contributions and abstract:
                print(f"   📝 Extracting from abstract ({len(abstract.strip())} chars)...")
                contributions = self.analyze_from_text(title, abstract)
                if contributions:
                    stats["text"] += 1
                elif not contributions and len(abstract.strip()) < MIN_ABSTRACT_CHARS:
                    stats["hallucination_blocked"] += 1

            if contributions:
                pub["keyContributions"] = contributions
                pub["summaryModel"] = self.model
                print(f"   ✓ Extracted {len(contributions)} contributions")
            else:
                stats["failed"] += 1
                print(f"   ✗ Could not extract (no verified PDF or substantial abstract)")

            time.sleep(rate_limit_delay)

        print(f"\n{'='*70}")
        print(f"AI Extraction Summary:")
        print(f"  ✓ From PDF:              {stats['pdf']}")
        print(f"  ✓ From abstract:         {stats['text']}")
        print(f"  ↩ Already had data:      {stats['skipped']}")
        print(f"  🛡 Hallucination blocked: {stats['hallucination_blocked']}")
        print(f"  ✗ Failed/no source:      {stats['failed']}")
        print(f"{'='*70}")

        return publications


def resummary_existing(json_path: Path, pdf_dir: Path, force: bool = False):
    """Utility to run just the AI extraction on existing JSON data."""
    from dotenv import load_dotenv
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_AI_API_KEY")

    with open(json_path, "r", encoding="utf-8") as f:
        publications = json.load(f)

    summarizer = AISummarizer(api_key=api_key)
    publications = summarizer.summarize_all(publications, pdf_dir=pdf_dir, force=force)

    clean_pubs = [{k: v for k, v in pub.items() if not k.startswith("_")} for pub in publications]
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(clean_pubs, f, indent=2, ensure_ascii=False)
    print(f"\n✓ Saved updated publications")


if __name__ == "__main__":
    import sys
    BASE_DIR = Path(__file__).resolve().parent.parent
    JSON_PATH = BASE_DIR / "data/publications.json"
    PDF_DIR = BASE_DIR / "public/papers"

    if "--resummary" in sys.argv:
        resummary_existing(JSON_PATH, PDF_DIR, force="--force" in sys.argv)
