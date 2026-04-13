# Deployment Guide

## Vercel (Recommended)

### Initial Setup

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project" and import your repository
3. Framework preset: **Next.js** (auto-detected)
4. No environment variables needed for the base site
5. Click "Deploy"

### Custom Domain

1. In Vercel dashboard > Settings > Domains
2. Add your domain (e.g., `telepresence.web.unc.edu`)
3. Configure DNS as instructed by Vercel

### Environment Variables (for publications pipeline)

These are only needed in GitHub Actions, not in Vercel:

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Optional | Enables AI key-contribution summaries |
| `SEMANTIC_SCHOLAR_API_KEY` | Optional | Raises API rate limits |

Set them in GitHub > Settings > Secrets and variables > Actions.

## GitHub Actions

The publications pipeline runs automatically every 2 months. To trigger manually:

1. Go to Actions > "Update Publications"
2. Click "Run workflow"
3. The workflow fetches new papers, generates summaries, and commits to the repo
4. Vercel auto-deploys on push

## Build Requirements

- Node.js 20+
- npm

```bash
npm ci
npm run build
```

The build produces a static site with ISR-capable pages. All routes are pre-rendered at build time.

## Migrating to Another Host

The site is a standard Next.js application. It can be deployed on any platform that supports Next.js:

- **Netlify**: `npm run build` with Next.js plugin
- **AWS Amplify**: auto-detects Next.js
- **Self-hosted**: `npm run build && npm start`

For static export (if no server-side features are needed), add `output: 'export'` to `next.config.ts`.
