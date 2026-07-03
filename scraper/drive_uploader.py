"""
Upload publication PDFs to Google Drive and store shareable URLs in publications.json.

Setup:
  1. Create a Google Cloud project, enable the Drive API.
  2. Create a Service Account, download the JSON key.
  3. Create a Shared Drive (Drive > Shared drives > New) and add the service
     account's email (the key file's "client_email" field) as a member with
     at least Content Manager access. A regular "My Drive" folder will NOT
     work here even if shared with the service account as Editor — service
     accounts have no storage quota of their own, so creating a file fails
     with "storageQuotaExceeded" regardless of folder permissions. It must
     be a Shared Drive (or a folder inside one), whose storage belongs to
     the organization rather than an individual.
  4. Set env vars: GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
                   GOOGLE_DRIVE_FOLDER_ID=the Shared Drive's (or subfolder's) id

Usage:
  python drive_uploader.py
  FORCE_REUPLOAD=true python drive_uploader.py
"""

import json
import os
import sys
import time
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
PUBLICATIONS_FILE = BASE_DIR / "data" / "publications.json"
PDF_DIR = BASE_DIR / "public" / "papers"
SCOPES = ["https://www.googleapis.com/auth/drive"]


class DriveUploader:
    def __init__(self, credentials_path: str, folder_id: str):
        from google.oauth2 import service_account
        from googleapiclient.discovery import build

        creds = service_account.Credentials.from_service_account_file(
            credentials_path, scopes=SCOPES
        )
        self.service = build("drive", "v3", credentials=creds)
        self.folder_id = folder_id

    def _find_existing(self, filename: str) -> str | None:
        results = self.service.files().list(
            q=f"name='{filename}' and '{self.folder_id}' in parents and trashed=false",
            fields="files(id)",
            supportsAllDrives=True,
            includeItemsFromAllDrives=True,
        ).execute()
        files = results.get("files", [])
        return files[0]["id"] if files else None

    def upload_pdf(self, pdf_path: Path, pub_id: str) -> str | None:
        from googleapiclient.http import MediaFileUpload

        filename = f"{pub_id}.pdf"
        existing_id = self._find_existing(filename)
        media = MediaFileUpload(str(pdf_path), mimetype="application/pdf", resumable=True)

        if existing_id:
            # Replace content of existing Drive file (handles stale/corrupt uploads).
            self.service.files().update(
                fileId=existing_id,
                media_body=media,
                supportsAllDrives=True,
            ).execute()
            print(f"   ↺ Re-uploaded (replaced): {filename}")
            return f"https://drive.google.com/file/d/{existing_id}/view"

        file_meta = {"name": filename, "parents": [self.folder_id]}
        file = self.service.files().create(
            body=file_meta, media_body=media, fields="id", supportsAllDrives=True
        ).execute()
        file_id = file["id"]

        self.service.permissions().create(
            fileId=file_id,
            body={"type": "anyone", "role": "reader"},
            supportsAllDrives=True,
        ).execute()

        print(f"   ✓ Uploaded: {filename}")
        return f"https://drive.google.com/file/d/{file_id}/view"

    def upload_all(self, publications: list, force: bool = False) -> list:
        print(f"\n{'='*70}\nGoogle Drive Upload\n{'='*70}")

        uploaded = skipped = failed = no_pdf = 0

        for i, pub in enumerate(publications, 1):
            pdf_path_str = pub.get("pdfPath", "")
            if not pdf_path_str:
                no_pdf += 1
                continue

            if pub.get("driveUrl") and not force:
                skipped += 1
                continue

            pdf_filename = Path(pdf_path_str).name
            pdf_path = PDF_DIR / pdf_filename

            if not pdf_path.exists():
                no_pdf += 1
                continue

            print(f"\n[{i}/{len(publications)}] {pub.get('title', '')[:60]}...")
            try:
                url = self.upload_pdf(pdf_path, pub["id"])
                if url:
                    pub["driveUrl"] = url
                    uploaded += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"   ✗ Upload failed: {e}")
                failed += 1

            time.sleep(0.3)

        print(f"\nDrive Upload: ✓ {uploaded} uploaded | ↩ {skipped} skipped | ✗ {failed} failed | ℹ {no_pdf} no PDF")
        return publications


def run():
    credentials = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    folder_id = os.getenv("GOOGLE_DRIVE_FOLDER_ID")
    force = os.getenv("FORCE_REUPLOAD", "false").lower() == "true"

    if not credentials or not folder_id:
        print("✗ Set GOOGLE_APPLICATION_CREDENTIALS and GOOGLE_DRIVE_FOLDER_ID")
        sys.exit(1)

    with open(PUBLICATIONS_FILE, encoding="utf-8") as f:
        publications = json.load(f)

    uploader = DriveUploader(credentials, folder_id)
    publications = uploader.upload_all(publications, force=force)

    with open(PUBLICATIONS_FILE, "w", encoding="utf-8") as f:
        json.dump(publications, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Saved updated publications.json")


if __name__ == "__main__":
    run()
