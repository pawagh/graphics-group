import os
import re
import time
import requests
from pathlib import Path

class PDFDownloader:
    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.session = requests.Session()
        # Fix: Standard browser user agent to bypass basic Cloudflare/ArXiv blocks
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
        })

    def _safe_filename(self, slug: str) -> str:
        """Convert slug to safe filename."""
        return re.sub(r'[^a-z0-9-]', '', slug)[:80] + ".pdf"

    def expected_path(self, slug: str) -> Path:
        """The exact local path a manually-supplied PDF for this slug must use."""
        return self.output_dir / self._safe_filename(slug)

    def download(self, pdf_url: str, slug: str) -> str:
        """
        Download a PDF and save it locally, or pick up a manually-placed file
        at the expected path if one already exists (auto-download or maintainer-supplied).
        Returns the local path (relative to website/public) or empty string on failure.
        """
        filename = self._safe_filename(slug)
        output_path = self.output_dir / filename
        local_url = f"/papers/{filename}"

        # A file already at the expected path wins regardless of pdf_url — this is how
        # a maintainer's manually-supplied PDF (for a paper the auto-download couldn't reach)
        # gets picked up on the next run.
        if output_path.exists():
            print(f"   ↩ Found local PDF: {filename}")
            return local_url

        if not pdf_url:
            return ""

        try:
            print(f"   ⬇ Downloading: {filename}")
            resp = self.session.get(pdf_url, timeout=30, stream=True)
            resp.raise_for_status()

            # Fix: Avoid tearing the stream by grabbing a standard chunk first
            iterator = resp.iter_content(chunk_size=8192)
            first_chunk = next(iterator, b"")

            content_type = resp.headers.get("content-type", "").lower()
            if "pdf" not in content_type and not pdf_url.endswith(".pdf"):
                if not first_chunk.startswith(b"%PDF"):
                    print(f"   ⚠ Not a PDF (content-type: {content_type}), skipping")
                    return ""

            with open(output_path, "wb") as f:
                f.write(first_chunk)
                for chunk in iterator:
                    f.write(chunk)

            size_kb = output_path.stat().st_size / 1024
            print(f"   ✓ Saved: {filename} ({size_kb:.0f} KB)")
            return local_url

        except Exception as e:
            print(f"   ✗ Failed to download {pdf_url}: {e}")
            if output_path.exists():
                output_path.unlink()
            return ""

    def download_all(self, publications: list, delay: float = 0.5) -> list:
        """
        Download PDFs for all publications. Sets pdfPath (persisted) and _local_pdf
        (transient, used by the same-run AI summarizer/thumbnail extractor).
        Sets pdfMissing=True on publications that need a maintainer to manually supply
        a PDF — printed in a report at the end with the exact filename expected.
        """
        print(f"\n{'='*70}")
        print(f"Downloading PDFs for {len(publications)} publications")
        print(f"Output: {self.output_dir.resolve()}")
        print(f"{'='*70}")

        downloaded = 0
        failed = 0
        no_url = 0
        needs_manual = []

        for i, pub in enumerate(publications, 1):
            pdf_url = pub.get("pdfUrl") or pub.get("_pdf_url", "")
            slug = pub.get("id") or pub.get("_slug") or pub.get("slug", f"paper-{i}")

            print(f"\n[{i}/{len(publications)}] {pub.get('title', 'Unknown')[:60]}...")

            local_path = self.download(pdf_url, slug)

            if local_path:
                pub["pdfPath"] = local_path
                pub["_local_pdf"] = local_path
                pub["pdfMissing"] = False
                downloaded += 1
            else:
                pub["pdfMissing"] = True
                reason = "no PDF URL found (closed access)" if not pdf_url else "download failed"
                needs_manual.append((pub.get("title", "Unknown"), slug, self._safe_filename(slug), reason))
                if not pdf_url:
                    no_url += 1
                else:
                    failed += 1

            time.sleep(delay)

        print(f"\n{'='*70}")
        print(f"PDF Download Summary:")
        print(f"  ✓ Downloaded/found locally: {downloaded}")
        print(f"  ✗ Download failed:          {failed}")
        print(f"  ℹ No URL (closed access):   {no_url}")
        print(f"{'='*70}")

        if needs_manual:
            print(f"\n{'='*70}")
            print(f"⚠ {len(needs_manual)} publication(s) need a MANUAL PDF upload:")
            print(f"{'='*70}")
            for title, slug, filename, reason in needs_manual:
                print(f"  • {title[:65]}")
                print(f"      slug: {slug}  |  reason: {reason}")
                print(f"      → place file at: public/papers/{filename}")
            print(f"{'='*70}")

        return publications
