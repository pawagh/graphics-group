"""
Extracts representative thumbnail images from PDFs using PyMuPDF.
No API needed — uses heuristics to find the best figure.
"""

import fitz  # pymupdf
from PIL import Image
from pathlib import Path
import io

MIN_WIDTH = 150
MIN_HEIGHT = 150
MAX_COVERAGE_RATIO = 0.85
PRIORITY_PAGES = 3

class ThumbnailExtractor:
    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def extract(self, pdf_path: Path, slug: str) -> str:
        """
        Extract the best representative image from a PDF.
        Returns local URL path or empty string on failure.
        """
        filename = f"{slug[:80]}.jpg"
        output_path = self.output_dir / filename
        local_url = f"/publication-photos/{filename}"

        if output_path.exists():
            print(f"   ↩ Thumbnail already exists: {filename}")
            return local_url

        try:
            # Fix: Ensure document is properly closed using a context manager
            with fitz.open(pdf_path) as doc:
                page_count = len(doc)
                best = self._find_best_image(doc, range(min(PRIORITY_PAGES, page_count)))

                if not best and page_count > PRIORITY_PAGES:
                    print(f"   ℹ No figure in first {PRIORITY_PAGES} pages, scanning full doc...")
                    best = self._find_best_image(doc, range(page_count))

                if not best:
                    print(f"   ℹ No embedded images found, rendering page 1...")
                    best = self._render_page(doc, page_num=0)

            if not best:
                print(f"   ✗ Could not extract any image")
                return ""

            return self._save(best, output_path, local_url)

        except Exception as e:
            print(f"   ✗ Extraction error: {e}")
            return ""

    def _find_best_image(self, doc: fitz.Document, page_range) -> dict | None:
        best_image = None
        best_area = 0

        for page_num in page_range:
            page = doc[page_num]
            page_w = page.rect.width
            page_h = page.rect.height

            images = page.get_images(full=True)

            for img in images:
                xref = img[0]
                try:
                    base_image = doc.extract_image(xref)
                    w = base_image.get("width", 0)
                    h = base_image.get("height", 0)
                    area = w * h

                    if w < MIN_WIDTH or h < MIN_HEIGHT:
                        continue

                    if (w / page_w > MAX_COVERAGE_RATIO and h / page_h > MAX_COVERAGE_RATIO):
                        continue

                    if area > best_area:
                        best_area = area
                        best_image = base_image
                        best_image["_page"] = page_num + 1

                except Exception:
                    continue

        return best_image

    def _render_page(self, doc: fitz.Document, page_num: int = 0) -> dict | None:
        try:
            page = doc[page_num]
            mat = fitz.Matrix(1.5, 1.5)
            pix = page.get_pixmap(matrix=mat)
            return {
                "image": pix.tobytes("jpeg"),
                "ext": "jpeg",
                "width": pix.width,
                "height": pix.height,
                "_page": page_num + 1,
                "_rendered": True,
            }
        except Exception as e:
            print(f"   ✗ Page render error: {e}")
            return None

    def _save(self, image_data: dict, output_path: Path, local_url: str) -> str:
        try:
            raw = image_data.get("image", b"")
            img = Image.open(io.BytesIO(raw))

            # Fix: Handle transparent backgrounds before converting to RGB
            # Otherwise PNG lines/graphs render as black boxes
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                bg = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P': img = img.convert('RGBA')
                bg.paste(img, mask=img.split()[3])
                img = bg
            elif img.mode != "RGB":
                img = img.convert("RGB")

            max_width = 800
            if img.width > max_width:
                ratio = max_width / img.width
                img = img.resize((max_width, int(img.height * ratio)), Image.LANCZOS)

            img.save(output_path, "JPEG", quality=85, optimize=True)

            page_info = f"page {image_data.get('_page', '?')}"
            rendered = " (rendered)" if image_data.get("_rendered") else ""
            size_kb = output_path.stat().st_size / 1024
            print(f"   ✓ Thumbnail saved: {output_path.name} "
                  f"({img.width}×{img.height}, {size_kb:.0f} KB, {page_info}{rendered})")

            return local_url

        except Exception as e:
            print(f"   ✗ Save error: {e}")
            return ""

    def extract_all(self, publications: list, base_public_dir: Path) -> list:
        print(f"\n{'='*70}")
        print(f"Extracting thumbnails for {len(publications)} publications")
        print(f"Output: {self.output_dir.resolve()}")
        print(f"{'='*70}")

        done = skipped = failed = no_pdf = 0

        for i, pub in enumerate(publications, 1):
            title = pub.get("title", "Unknown")[:60]
            print(f"\n[{i}/{len(publications)}] {title}...")

            existing = pub.get("image", "")
            if existing and existing.strip():
                print(f"   ↩ Already has image: {existing}")
                skipped += 1
                continue

            local_pdf = pub.get("_local_pdf", "")
            if not local_pdf:
                print(f"   ℹ No local PDF, skipping")
                no_pdf += 1
                continue

            # Resolve local PDF correctly based on absolute root path
            pdf_path = base_public_dir / local_pdf.lstrip("/")
            if not pdf_path.exists():
                print(f"   ✗ PDF file not found: {pdf_path}")
                no_pdf += 1
                continue

            slug = pub.get("slug", f"paper-{i}")
            thumbnail_url = self.extract(pdf_path, slug)

            if thumbnail_url:
                pub["image"] = thumbnail_url
                done += 1
            else:
                failed += 1

        print(f"\n{'='*70}")
        print(f"Thumbnail extraction complete:")
        print(f"  ✓ Extracted : {done}")
        print(f"  ↩ Skipped   : {skipped}")
        print(f"  ✗ Failed    : {failed}")
        print(f"  ℹ No PDF    : {no_pdf}")
        print(f"{'='*70}")

        return publications