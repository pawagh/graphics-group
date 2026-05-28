# Website Maintenance Guide

Practical instructions for keeping the VCAIL website up to date.  
No coding experience required for content updates — everything is done by editing JSON files and pushing to GitHub.

---

## Table of Contents

1. [First-time setup](#1-first-time-setup)
2. [Updating People](#2-updating-people)
3. [Updating Publications](#3-updating-publications)
4. [Adding News Items](#4-adding-news-items)
5. [Making Design / Code Changes](#5-making-design--code-changes)
6. [How Deployment Works](#6-how-deployment-works)

---

## 1. First-time setup

You only need to do this once.

```bash
# Clone the repo
git clone https://github.com/pawagh/graphics-group.git
cd graphics-group

# Install dependencies
npm install
```

**Preview the site locally:**
```bash
npm run dev
# Open http://localhost:3000
```
Every change you save will hot-reload in the browser.

---

## 2. Updating People

All team data lives in **`data/people.json`**. Each entry looks like:

```json
{
  "id": "first-last",
  "name": "First Last",
  "role": "phd",
  "title": "PhD Student",
  "email": "user@cs.unc.edu",
  "photoPath": "/images/people/first-last.jpg",
  "bio": "",
  "website": "https://...",
  "googleScholar": "",
  "github": "",
  "twitter": "",
  "interests": []
}
```

### Roles

| Role | Use for |
|------|---------|
| `faculty` | Professors |
| `staff` | Research scientists, engineers, lab managers |
| `postdoc` | Postdoctoral researchers |
| `phd` | Current PhD students |
| `ms` | Current MS students |
| `undergrad` | Current undergrad researchers |
| `visitor` | Collaborators / visiting researchers |
| `alumni` | Former members |

Alumni entries also support:
```json
"alumniYear": 2024,
"alumniPosition": "Engineer, Google DeepMind"
```

### Adding a new person

1. Add their photo to `public/images/people/` — name it `first-last.jpg` (or `.png`)
2. Open `data/people.json` and add a new entry (copy an existing one as a template)
3. Set `"id"` to match the photo filename without the extension
4. Fill in their details

### Updating an existing person

Find their entry in `data/people.json` by searching for their name, and edit the fields directly.

**Common updates:**
- Student graduated → change `role` to `"alumni"`, add `alumniYear` and `alumniPosition`
- Title change → update the `title` field
- New website → update the `website` field

### Moving someone to alumni

```json
{
  "id": "jane-smith",
  "name": "Jane Smith",
  "role": "alumni",
  "title": "PhD",
  "alumniYear": 2025,
  "alumniPosition": "Postdoctoral Researcher, MIT"
  ...
}
```

### Removing someone

Delete their entry from `data/people.json`. Their photo file can stay in `public/images/people/` (no harm leaving it).

### Re-syncing from the telepresence site

If you want to pull in all people from [telepresence.web.unc.edu/people](https://telepresence.web.unc.edu/people/):

```bash
python3 scripts/scrape-people.py
```

This merges scraped data with your existing entries (won't overwrite manual edits to existing people).

---

## 3. Updating Publications

### Automatic updates (recommended)

Publications are fetched automatically from **Semantic Scholar** every 2 months via GitHub Actions. When a lab member publishes a new paper, it will appear on the site within the next scheduled run.

To trigger an immediate update manually:
1. Go to the [GitHub repo](https://github.com/pawagh/graphics-group)
2. Click **Actions** → **Update Publications** → **Run workflow**

This will:
- Fetch new papers for all configured authors
- Download open-access PDFs
- Generate BibTeX entries
- Generate AI key-contribution summaries via Gemini

### Adding a new author to the pipeline

When a new faculty member joins, add their Semantic Scholar author ID to `lab.config.json`:

```json
"semanticScholar": {
  "authorIds": [
    { "name": "Henry Fuchs",             "id": "144791223", "startYear": 1970 },
    { "name": "Praneeth Chakravarthula", "id": "2118843103", "startYear": 2017 },
    { "name": "New Faculty Member",      "id": "XXXXXXXXX",  "startYear": 2024 }
  ]
}
```

To find the ID: search the author on [semanticscholar.org](https://www.semanticscholar.org/), then copy the number from the URL (e.g., `semanticscholar.org/author/Name/144791223`).

### Adding a paper manually

If a paper isn't on Semantic Scholar, add it directly to `data/publications.json`:

```json
{
  "id": "smith-2025-neural",
  "title": "Neural Rendering for AR Displays",
  "authors": ["Jane Smith", "Henry Fuchs"],
  "year": 2025,
  "venue": "SIGGRAPH 2025",
  "abstract": "We present...",
  "tldr": "",
  "pdfPath": "/papers/smith-2025-neural.pdf",
  "pdfUrl": "",
  "doi": "10.1145/...",
  "semanticScholarId": "",
  "bibtex": "@inproceedings{smith_2025_neural,\n  title={...},\n  author={...},\n  booktitle={SIGGRAPH 2025},\n  year={2025}\n}",
  "keyContributions": "",
  "tags": ["2025", "Conference", "SIGGRAPH"],
  "featured": false,
  "imagePath": "/images/publications/smith-2025-neural.jpg"
}
```

- Put the PDF in `public/papers/` (tracked via Git LFS)
- Put a thumbnail image in `public/images/publications/`
- The `id` should be `lastname-year-keyword` (all lowercase, hyphens)

### Enriching papers with AI summaries

To fill in missing **Key Contributions** (Gemini) and **Paper Summary** (Semantic Scholar) for papers that don't have them:

```bash
# Requires API keys in .env.local:
# GEMINI_API_KEY=...
# SEMANTIC_SCHOLAR_API_KEY=...  (optional, raises rate limits)

npx tsx scripts/enrich-publications.ts
```

This is rate-limited (20 calls/min on the free Gemini tier), so it may need multiple runs to process all papers. Running it again is always safe — it only processes papers missing summaries.

### Marking a paper as featured

Set `"featured": true` in the paper's entry — featured papers appear prominently on the home page.

### Adding a publication thumbnail

Save an image (screenshot or figure from the paper) to `public/images/publications/ID.jpg` where `ID` matches the publication's `id` field. Then add:
```json
"imagePath": "/images/publications/ID.jpg"
```

### Adding an award to a paper

```json
"award": "Best Paper Award"
```

---

## 4. Adding News Items

Edit `data/news.json`. Add a new object at the **top** of the array (most recent first):

```json
{
  "id": "2025-smith-award",
  "title": "Jane Smith wins Best Paper at SIGGRAPH 2025",
  "date": "2025-08-01",
  "summary": "PhD student Jane Smith received the Best Paper Award for her work on neural AR displays.",
  "link": "",
  "type": "award"
}
```

**Types:** `award` · `paper` · `talk` · `media` · `hiring` · `other`

The `link` field is optional — leave it as `""` if there's no external URL.

---

## 5. Making Design / Code Changes

### Where things live

```
src/app/
  page.tsx                    ← Home page
  people/page.tsx             ← People page
  publications/page.tsx       ← Publications list
  publications/[id]/page.tsx  ← Individual paper page
  research/page.tsx           ← Research page
  news/page.tsx               ← News page

src/components/
  Navbar.tsx                  ← Navigation bar
  Footer.tsx                  ← Footer

public/
  images/people/              ← Profile photos
  images/publications/        ← Paper thumbnails
  papers/                     ← PDF files (Git LFS)
```

### Workflow for code changes

```bash
# 1. Pull latest changes first
git pull origin main

# 2. Start the dev server
npm run dev

# 3. Make your changes and verify in the browser at http://localhost:3000

# 4. Check the build works before committing
npm run build

# 5. Commit and push
git add -A
git commit -m "Brief description of what changed"
git push origin main
```

Vercel will automatically deploy within ~2 minutes of pushing to `main`.

### Changing colors / branding

Edit the `theme` section in `lab.config.json`:

```json
"theme": {
  "primaryColor": "#4B9CD3",
  "primaryColorDark": "#13294B"
}
```

The UNC blue (`#4B9CD3`) is used throughout as `--unc-blue`.

### Changing the lab name or PI info

Edit `lab.config.json` — the lab name, PI name, and contact info all flow from there into the site automatically.

---

## 6. How Deployment Works

- The site is hosted on **Vercel** (free tier)
- Every push to the `main` branch triggers an automatic deploy (~2 min)
- Publications are auto-updated every 2 months via **GitHub Actions**

### Required GitHub Secrets

For GitHub Actions to run the publication pipeline, two secrets must be set in the repo:

1. Go to **Settings → Secrets and variables → Actions**
2. Add:
   - `GEMINI_API_KEY` — from [aistudio.google.com](https://aistudio.google.com/app/apikey)
   - `SEMANTIC_SCHOLAR_API_KEY` — from [semanticscholar.org/product/api](https://www.semanticscholar.org/product/api) (optional but recommended)

### Checking deploy status

- Vercel: [vercel.com/dashboard](https://vercel.com/dashboard)
- GitHub Actions: repo → **Actions** tab

---

## Quick Reference

| Task | Where |
|------|-------|
| Add/update a person | `data/people.json` |
| Add a news item | `data/news.json` (top of array) |
| Add a paper manually | `data/publications.json` |
| Run publication pipeline | GitHub Actions → "Update Publications" → Run workflow |
| Change lab name/colors | `lab.config.json` |
| Add a paper PDF | `public/papers/ID.pdf` |
| Add a paper thumbnail | `public/images/publications/ID.jpg` |
| Add a profile photo | `public/images/people/first-last.jpg` |
