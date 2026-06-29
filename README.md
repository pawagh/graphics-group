# Graphics and Virtual Reality Group — Website

Website for the [Graphics and Virtual Reality Group](https://telepresence.web.unc.edu/) at UNC Chapel Hill, led by Henry Fuchs.

Built with **Next.js 16**, **TypeScript**, **Tailwind CSS 3**, and **React 19**. All content is statically generated from JSON data files.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
```

## Architecture

```
lab.config.json          # Central config: lab name, PI, Semantic Scholar IDs, theme
data/
  people.json            # Team members and alumni
  publications.json      # Papers (auto-updated by pipeline)
  research.json          # Research projects
  news.json              # News items
src/
  lib/config.ts          # Typed re-export of lab.config.json
  lib/data.ts            # Server-side helpers reading data/*.json
  lib/types.ts           # Shared TypeScript interfaces
  components/            # Navbar, Footer, ThemeProvider
  app/                   # Next.js App Router pages
scripts/                 # One-off / manual maintenance tools (see MAINTENANCE.md)
scraper/                 # Automated publications pipeline (Semantic Scholar + Gemini + Drive)
wordpress/sync/          # Syncs data/*.json + lab.config.json to the WordPress REST API
```

## Editing Content

All content lives in `data/*.json`. Edit directly and commit — no admin UI needed.

### People

Add/edit entries in `data/people.json`. Roles: `faculty`, `phd`, `ms`, `undergrad`, `postdoc`, `alumni`, `visitor`. Alumni can include `alumniYear` and `alumniPosition`.

### Publications

Publications are auto-updated every 2 months via GitHub Actions. Manual additions go in `data/publications.json`.

### Research Projects

Edit `data/research.json`. Set `active: true/false` to control which section a project appears in.

### News

Add entries to `data/news.json`. Types: `award`, `paper`, `talk`, `media`, `hiring`, `other`.

## Configuration

All lab-specific strings come from `lab.config.json` — no hardcoded names in components.

Key fields:
- `lab.name` / `lab.shortName` — displayed in navbar, footer, hero
- `pi` — principal investigator details
- `semanticScholar.authorIds` — drives the publications pipeline
- `social` — footer links (Twitter, GitHub, Google Scholar)
- `theme` — color tokens

## Publications Pipeline

Automated via `scraper/pipeline.py` (Python), run weekly by `.github/workflows/scrape-publications.yml`:

1. Reads the author roster from `lab.config.json` → `semanticScholar.authorIds`
2. Fetches papers from Semantic Scholar for each configured author
3. Merges with the existing `data/publications.json` by Semantic Scholar ID → DOI → normalized title (never by a regenerated slug — existing curated `id`s are always preserved)
4. Downloads open-access PDFs to `public/papers/` (Git LFS) and extracts thumbnails to `public/images/publications/`
5. Summarizes key contributions via Gemini (PDF-title-verified, or abstract-only if the abstract is substantial — both guarded against hallucinating from training data instead of the actual paper)
6. Uploads PDFs to a shared Google Drive folder, recording the link back into `data/publications.json` (`driveUrl`)
7. Flags any publication it couldn't get a PDF for (`pdfMissing: true`) and opens/updates a GitHub issue listing exactly which file to manually add and where

The resulting commit to `data/publications.json` automatically triggers `.github/workflows/sync-to-wordpress.yml`, which pushes the updated content to the WordPress site.

Run manually:
```bash
cd scraper
pip install -r requirements.txt
python pipeline.py                              # full run
FORCE_RESUMMARY=true python pipeline.py         # regenerate all AI summaries
python drive_uploader.py                        # Drive upload only (needs GOOGLE_APPLICATION_CREDENTIALS + GOOGLE_DRIVE_FOLDER_ID)
```

For one-off manual tasks (enriching an individual paper, re-running Gemini summaries, scraping people photos, etc.) see [MAINTENANCE.md](MAINTENANCE.md) — those tools in `scripts/` are unaffected by this pipeline and safe to keep using.

### Adding a lab member to the pipeline

1. Find the author on [semanticscholar.org](https://www.semanticscholar.org/) and copy the numeric ID from the URL.
2. Add an entry to `lab.config.json` under `semanticScholar.authorIds`:
   ```json
   { "name": "Jane Doe", "id": "123456789", "startYear": 2022 }
   ```
3. Optional `"endYear"` stops fetching new papers for that author after a given year (e.g. once they've left the lab) — papers already in `data/publications.json` are never removed.
4. If someone has no Semantic Scholar profile yet, use `"id": ""` — the pipeline skips fetching for them but keeps them in the roster.

## Dark Mode

Toggle in navbar. Uses `data-theme="dark"` on `<html>` with CSS custom properties. Persisted in localStorage, falls back to OS preference.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel setup instructions.

## Using as a Template

1. Fork the repo
2. Edit `lab.config.json` with your group's details
3. Replace `data/*.json` with your content
4. Update `semanticScholar.authorIds` for your team
5. Deploy to Vercel

## Tech Stack

- **Framework**: Next.js 16 (App Router, static generation)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3 + CSS custom properties
- **Data**: JSON files read at build time
- **Pipeline**: Semantic Scholar API + Gemini API + Google Drive API
- **CI**: GitHub Actions
- **Hosting**: Vercel (free tier)
- **WordPress sync**: REST API (`wordpress/sync/`), for the parallel WordPress deployment
