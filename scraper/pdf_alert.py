"""
Generates a GitHub Actions output + markdown report listing publications
flagged with pdfMissing: true (set by pdf_downloader.py when a PDF couldn't
be auto-downloaded). Used by .github/workflows/scrape-publications.yml to
open/update/close a tracking issue alerting the site maintainer.
"""

import json
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLICATIONS_FILE = BASE_DIR / "data" / "publications.json"
REPORT_FILE = BASE_DIR / "missing_pdfs_report.md"


def run():
    with open(PUBLICATIONS_FILE, encoding="utf-8") as f:
        publications = json.load(f)

    missing = [p for p in publications if p.get("pdfMissing")]

    github_output = os.getenv("GITHUB_OUTPUT")

    if not missing:
        REPORT_FILE.write_text("", encoding="utf-8")
        if github_output:
            with open(github_output, "a") as f:
                f.write("has_missing=false\n")
        print("✓ No publications need a manual PDF upload.")
        return

    lines = [
        f"{len(missing)} publication(s) need a PDF uploaded manually to the shared Google Drive folder.",
        "",
        "| Title | Slug/ID | Expected filename |",
        "|---|---|---|",
    ]
    for pub in missing:
        slug = pub.get("id") or pub.get("slug", "")
        filename = f"{slug}.pdf"
        title = pub.get("title", "Unknown")[:80]
        lines.append(f"| {title} | `{slug}` | `{filename}` |")

    lines.append("")
    lines.append(
        "To resolve: upload the PDF with the exact filename shown above directly to the "
        "shared Google Drive folder, then remove `pdfMissing: true` from the entry in "
        "`data/publications.json` and push. The next pipeline run will detect the file on "
        "Drive and record the link."
    )

    report = "\n".join(lines)
    REPORT_FILE.write_text(report, encoding="utf-8")
    print(report)

    if github_output:
        with open(github_output, "a") as f:
            f.write("has_missing=true\n")


if __name__ == "__main__":
    run()
