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

    def download(self, pdf_url: str, slug: str) -> str:
        """
        Download a PDF and save it locally.
        Returns the local path (relative to website/public) or empty string on failure.
        """
        if not pdf_url:
            return ""

        filename = self._safe_filename(slug)
        output_path = self.output_dir / filename
        local_url = f"/papers/{filename}"

        if output_path.exists():
            print(f"   ↩ Already downloaded: {filename}")
            return local_url

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
        """Download PDFs for all publications that have a _pdf_url."""
        print(f"\n{'='*70}")
        print(f"Downloading PDFs for {len(publications)} publications")
        print(f"Output: {self.output_dir.resolve()}")
        print(f"{'='*70}")

        downloaded = 0
        skipped = 0
        failed = 0

        for i, pub in enumerate(publications, 1):
            pdf_url = pub.get("_pdf_url", "")
            slug = pub.get("slug", f"paper-{i}")

            print(f"\n[{i}/{len(publications)}] {pub.get('title', 'Unknown')[:60]}...")

            if not pdf_url:
                print(f"   ℹ No PDF URL available")
                skipped += 1
                continue

            local_path = self.download(pdf_url, slug)

            if local_path:
                pub["_local_pdf"] = local_path
                downloaded += 1
            else:
                failed += 1

            time.sleep(delay)

        print(f"\n{'='*70}")
        print(f"PDF Download Summary:")
        print(f"  ✓ Downloaded: {downloaded}")
        print(f"  ↩ Skipped (already exists): -")
        print(f"  ✗ Failed: {failed}")
        print(f"  ℹ No URL: {skipped}")
        print(f"{'='*70}")

        return publications