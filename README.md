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
scripts/
  update-publications.ts # Semantic Scholar + Gemini pipeline
  scrape-telepresence.ts # Scraper for telepresence.web.unc.edu
  transform-data.ts      # Transforms scraped data to schemas
  download-photos.ts     # Downloads team photos
scraper/                 # Python scraper (legacy, kept for reference)
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

Automated via `scripts/update-publications.ts`:

1. Fetches papers from Semantic Scholar for each configured author
2. Generates BibTeX entries
3. Summarizes key contributions via Gemini API (optional)
4. Downloads open-access PDFs
5. Merges into `data/publications.json`

Run manually:
```bash
npx tsx scripts/update-publications.ts            # full run
npx tsx scripts/update-publications.ts --dry-run   # preview
```

### Adding Semantic Scholar Author IDs

1. Find the author on [semanticscholar.org](https://www.semanticscholar.org/)
2. Copy the numeric ID from the URL
3. Add to `lab.config.json` under `semanticScholar.authorIds`

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
- **Pipeline**: Semantic Scholar API + Gemini API
- **CI**: GitHub Actions
- **Hosting**: Vercel (free tier)
