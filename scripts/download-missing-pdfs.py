"""
Download PDFs for publications that have pdfUrl but no local pdfPath.
Updates publications.json with pdfPath once downloaded.

Usage: python3 scripts/download-missing-pdfs.py
"""

import json
import os
import time
import urllib.request
import urllib.error

PUBS_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'publications.json')
PAPERS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'papers')

os.makedirs(PAPERS_DIR, exist_ok=True)

pubs = json.load(open(PUBS_PATH))
to_download = [p for p in pubs if not p.get('pdfPath') and p.get('pdfUrl')]

print(f'{len(to_download)} PDFs to download\n')

downloaded = 0
failed = 0

for i, pub in enumerate(to_download):
    fname = pub['id'] + '.pdf'
    out_path = os.path.join(PAPERS_DIR, fname)
    url = pub['pdfUrl']

    print(f'[{i+1}/{len(to_download)}] {pub["title"][:60]}...')
    print(f'  URL: {url[:80]}')

    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()

        if len(data) < 10240:
            print(f'  SKIP: too small ({len(data)} bytes), likely not a valid PDF')
            failed += 1
            continue

        with open(out_path, 'wb') as f:
            f.write(data)

        pub['pdfPath'] = f'/papers/{fname}'
        downloaded += 1
        print(f'  OK ({len(data)//1024} KB)')

    except Exception as e:
        print(f'  FAIL: {e}')
        failed += 1

    time.sleep(0.5)

with open(PUBS_PATH, 'w') as f:
    json.dump(pubs, f, indent=2)

print(f'\nDone. Downloaded: {downloaded}, Failed/skipped: {failed}')
