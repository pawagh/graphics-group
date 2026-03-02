import json
import base64
import time
import requests
from pathlib import Path
from typing import Optional, Dict, List
import os

STRUCTURED_PROMPT = """You are analyzing an academic research paper from a Visual Computing and Augmented Intelligence lab.
The summary of this paper has already been handled. Your ONLY task is to extract the key contributions.

Generate a list of 3-5 KEY CONTRIBUTIONS — short, specific bullet points (one sentence each). Focus on the introduction and conclusion sections.

Respond with ONLY valid JSON in this exact format, no markdown fences:
{
  "keyContributions": [
    "First key contribution...",
    "Second key contribution...",
    "Third key contribution..."
  ]
}"""

class AISummarizer:
    def __init__(self, api_key: str, model: str = "gemini-2.5-flash-lite"):
        self.api_key = api_key
        self.model = model
        self.base_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

    def _call_gemini(self, contents: List[Dict], max_retries: int = 3) -> Optional[str]:
        gen_config = {
            "maxOutputTokens": 300,
            "temperature": 0.2,
            "responseMimeType": "application/json"
        }

        for attempt in range(max_retries):
            try:
                response = requests.post(
                    f"{self.base_url}?key={self.api_key}",
                    headers={"Content-Type": "application/json"},
                    json={"contents": contents, "generationConfig": gen_config},
                    timeout=60
                )

                if response.status_code == 429:
                    wait = 15 * (attempt + 1)
                    time.sleep(wait)
                    continue

                if response.status_code == 200:
                    data = response.json()
                    candidates = data.get("candidates", [])
                    
                    # Fix: Handle safety blocks and empty content securely
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

    def _parse_structured_response(self, raw_text: str) -> Optional[List[str]]:
        if not raw_text: return None
        text = raw_text.strip()
        if text.startswith("```"):
            lines = [l for l in text.split("\n") if not l.strip().startswith("```")]
            text = "\n".join(lines).strip()
        
        try:
            parsed = json.loads(text)
            contribs = parsed.get("keyContributions", [])
            return [str(c).strip() for c in contribs if str(c).strip()]
        except json.JSONDecodeError:
            return None

    def analyze_from_pdf(self, pdf_path: Path, title: str = "") -> Optional[List[str]]:
        try:
            with open(pdf_path, "rb") as f:
                pdf_data = base64.standard_b64encode(f.read()).decode("utf-8")

            prompt = STRUCTURED_PROMPT
            if title: prompt += f"\n\nPaper title: {title}"

            contents = [{"parts": [{"inline_data": {"mime_type": "application/pdf", "data": pdf_data}}, {"text": prompt}]}]
            raw = self._call_gemini(contents)
            return self._parse_structured_response(raw)
        except Exception as e:
            print(f"   ✗ PDF analysis error: {e}")
            return None

    def analyze_from_text(self, title: str, abstract: str) -> Optional[List[str]]:
        """Fallback to analyzing from abstract if PDF is unavailable."""
        if not abstract or len(abstract.strip()) < 50:
            return None
        
        prompt = f"{STRUCTURED_PROMPT}\n\nPaper title: {title}\n\nAbstract: {abstract}"
        contents = [{"parts": [{"text": prompt}]}]
        raw = self._call_gemini(contents)
        return self._parse_structured_response(raw)

    def summarize_all(self, publications: List[Dict], pdf_dir: Path, force: bool = False, rate_limit_delay: float = 4.0) -> List[Dict]:
        need_analysis = [p for p in publications if force or not p.get("keyContributions")]

        print(f"\n{'='*70}")
        print(f"AI Extraction: {len(need_analysis)} papers missing Key Contributions")
        print(f"{'='*70}")

        stats = {"pdf": 0, "text": 0, "skipped": 0, "failed": 0}

        for i, pub in enumerate(publications, 1):
            if pub.get("keyContributions") and not force:
                stats["skipped"] += 1
                continue

            print(f"\n[{i}/{len(publications)}] {pub.get('title', 'Unknown')[:60]}...")
            
            local_pdf = pub.get("_local_pdf", "")
            abstract = pub.get("_abstract", "")
            contributions = None

            # Try PDF first
            if local_pdf:
                pdf_path = pdf_dir / local_pdf.lstrip("/").replace("papers/", "")
                if pdf_path.exists():
                    print(f"   📄 Extracting from PDF...")
                    contributions = self.analyze_from_pdf(pdf_path, pub.get("title", ""))
                    if contributions:
                        stats["pdf"] += 1

            # Fallback to Text
            if not contributions and abstract:
                print(f"   📝 Extracting from abstract text...")
                contributions = self.analyze_from_text(pub.get("title", ""), abstract)
                if contributions:
                    stats["text"] += 1

            if contributions:
                pub["keyContributions"] = contributions
                print(f"   ✓ Extracted {len(contributions)} contributions")
            else:
                stats["failed"] += 1
                print(f"   ✗ Extraction failed")

            time.sleep(rate_limit_delay)

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
    JSON_PATH = BASE_DIR / "src/data/publications.json"
    PDF_DIR = BASE_DIR / "public/papers"
    
    if "--resummary" in sys.argv:
        resummary_existing(JSON_PATH, PDF_DIR, force="--force" in sys.argv)