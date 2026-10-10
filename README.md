# Graphics and Virtual Reality Group — Publications Pipeline

This repo automatically keeps the lab's WordPress site up to date with publications from Semantic Scholar. The pipeline fetches papers, downloads PDFs, generates AI summaries, uploads files to Google Drive, and syncs everything to WordPress via the REST API.

## How it works

1. **Scrape** (`scraper/pipeline.py`, weekly via GitHub Actions): fetches papers from Semantic Scholar for each author in `lab.config.json`, downloads open-access PDFs, extracts thumbnail images, and generates key-contribution summaries.
2. **Drive upload** (`scraper/drive_uploader.py`): uploads PDFs to a Shared Google Drive folder and records the shareable link in `data/publications.json`.
3. **WordPress sync** (`wordpress/sync/sync.py`): pushes publications as standard WordPress posts and updates the People, Research, News, and other pages via the WP REST API. Triggered automatically when `data/publications.json` changes.

```
lab.config.json          # Lab name, author roster, contact info
data/
  publications.json      # Paper records (auto-updated by pipeline)
  people.json            # Team members and alumni
  research.json          # Research projects
  news.json              # News items
scraper/                 # Semantic Scholar fetch, PDF download, thumbnail extraction, Drive upload
wordpress/sync/          # WordPress REST API sync
.github/workflows/
  scrape-publications.yml   # Weekly scrape + Drive upload
  sync-to-wordpress.yml     # Triggered on data/ changes
```

---

## Setup

### 1. lab.config.json

Update the following fields before running anything:

```json
{
  "lab": {
    "name": "Your Lab Name",
    "shortName": "Short Name",
    "university": "Your University",
    "department": "Department of ...",
    "description": "One paragraph about the lab.",
    "contactEmail": "pi@university.edu"
  },
  "semanticScholar": {
    "authorIds": [
      { "name": "Jane Doe", "id": "123456789", "startYear": 2018 }
    ]
  }
}
```

To find a Semantic Scholar author ID, search for the author at [semanticscholar.org](https://www.semanticscholar.org/) and copy the numeric ID from the URL. Set `"id": ""` for authors without a Semantic Scholar profile; the pipeline skips fetching for them but keeps them in the roster. Add `"endYear"` for authors who have left the lab to stop fetching new papers for them.

### 2. Google Drive (Shared Drive)

PDFs are stored in a Google Shared Drive. A regular My Drive folder will not work because service accounts have no personal storage quota.

**Create the Shared Drive:**

1. Go to [drive.google.com](https://drive.google.com) and create a new Shared Drive (left sidebar > "Shared drives" > "New").
2. Note the folder ID from the URL: `drive.google.com/drive/folders/<FOLDER_ID>`.

**Create a service account:**

1. Go to the [Google Cloud Console](https://console.cloud.google.com/), create a project, and enable the **Google Drive API**.
2. Under "IAM & Admin" > "Service Accounts", create a new service account.
3. Create a JSON key for the service account and download it.
4. Copy the `client_email` from the JSON key (looks like `name@project.iam.gserviceaccount.com`).
5. In the Shared Drive, click "Manage members" and add that email with **Content Manager** access.

### 3. WordPress application password

The sync uses a WordPress application password, not your login password.

1. In WordPress admin, go to **Users > Profile**.
2. Scroll to "Application Passwords", enter a name (e.g. "Pipeline"), and click "Add New Application Password".
3. Copy the generated password (shown only once).

### 4. GitHub repository secrets

Go to **Settings > Secrets and variables > Actions** and add the following secrets:

| Secret | Value |
|---|---|
| `WP_URL` | Your WordPress site URL, e.g. `https://yoursite.unc.edu` |
| `WP_USER` | Your WordPress username |
| `WP_APP_PASSWORD` | The application password from step 3 |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | The full contents of the service account JSON key file |
| `GOOGLE_DRIVE_FOLDER_ID` | The folder ID from the Shared Drive URL |
| `GEMINI_API_KEY` | *(optional)* Gemini API key for AI summaries (see below) |

### 5. AI summaries (optional)

The pipeline uses the [Gemini API](https://ai.google.dev/) to extract key contributions from each paper. Without a key, papers are added without the "Key Contributions" section.

To enable:

1. Get an API key from [Google AI Studio](https://aistudio.google.com/).
2. Add it as the `GEMINI_API_KEY` repository secret.

The pipeline verifies the paper title matches the PDF before extracting anything, and requires a minimum abstract length for text-only analysis, to avoid generating content from the wrong document.

---

## Running manually

**WordPress sync:**
```bash
cd wordpress/sync
pip install -r requirements.txt
# create a .env file with WP_URL, WP_USER, WP_APP_PASSWORD
python sync.py                   # sync everything
python sync.py --publications    # publications only
python sync.py --pages           # static pages only
python sync.py --dry-run         # preview without writing
```

**Publications scrape + Drive upload:**
```bash
cd scraper
pip install -r requirements.txt
# set GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json and GOOGLE_DRIVE_FOLDER_ID
python pipeline.py               # full scrape
python drive_uploader.py         # Drive upload only
```

---

## GitHub Actions workflows

**`scrape-publications.yml`** runs every Sunday at 2am UTC. It can also be triggered manually from the Actions tab with two options:
- "Skip re-scraping" to only run the Drive uploader (useful after manually uploading a PDF to Drive).
- "Force resummary" to regenerate all AI key-contribution summaries.

**`sync-to-wordpress.yml`** runs automatically whenever `data/publications.json`, `data/people.json`, `data/research.json`, or `data/news.json` changes on main. It also runs weekly on Monday at 3am UTC and can be triggered manually with a choice of what to sync (all, publications only, or pages only).

---

## Adding publications manually

PDFs are stored in the shared Google Drive folder and are not committed to git. If the pipeline cannot find a PDF for a paper automatically, it opens a GitHub issue listing the missing files.

To add a PDF manually:

1. Upload the PDF to the shared Google Drive folder with the filename `<publication-id>.pdf`.
2. Remove `"pdfMissing": true` from the entry in `data/publications.json` (if present), commit, and push.
3. Go to Actions > "Scrape & Update Publications" > "Run workflow" and check "Skip re-scraping". The Drive uploader will detect the new file and record the link in `data/publications.json`.
4. The WordPress sync triggers automatically once `data/publications.json` is updated.

If a PDF cannot be found anywhere, set `"pdfMissing": true` on the entry in `data/publications.json` to stop the pipeline from flagging it.

---

## Editing content

All content is in `data/*.json`. Edit directly and commit.

The About, Publications, People, Research, News, and Join Us pages are generated from these files on every sync. Changes made to those pages in the WordPress editor are overwritten the next time the sync runs, so make changes in this repo instead. Publication posts are regenerated the same way.

- **People**: `data/people.json`. Roles: `faculty`, `phd`, `ms`, `undergrad`, `postdoc`, `alumni`, `visitor`. Alumni entries can include `alumniYear` and `alumniPosition`. Photos go in `public/images/people/`.
- **Research projects**: `data/research.json`. Set `"active": true/false` to control which section a project appears in, and `order` to control position. `imagePath` points to a file in `public/images/research/`. `url` is where the title and image link to: a path starting with `/` links to a page on this site (for example `/wang-2023-bringing/` for a publication post), and a full `https://` address links elsewhere. Leave `url` empty for no link.
- **News**: `data/news.json`. Types: `award`, `paper`, `talk`, `media`, `hiring`, `other`.

### How images reach the site

Images live in this repo under `public/images/`. During a sync, any image that is not already in the WordPress media library is uploaded there, and the generated pages point to the uploaded copy. To change a research image, replace the file in `public/images/research/` under a new filename, update `imagePath`, and remove that project's entry from `wordpress/sync/.research-media-cache.json` so the sync uploads the new file.

The WordPress site has a storage limit. If uploads fail with `rest_upload_limited_space`, the media library is full.
