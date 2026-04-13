/**
 * Publications pipeline: fetches new papers from Semantic Scholar,
 * enriches with Gemini key-contribution summaries, downloads PDFs.
 *
 * Usage:
 *   npx tsx scripts/update-publications.ts          # full run
 *   npx tsx scripts/update-publications.ts --dry-run # print author IDs only
 *
 * Environment:
 *   SEMANTIC_SCHOLAR_API_KEY  (optional, raises rate limits)
 *   GEMINI_API_KEY            (optional, needed for key-contribution generation)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── paths ──
const CONFIG_PATH = path.join(__dirname, '..', 'lab.config.json');
const PUBS_PATH = path.join(__dirname, '..', 'data', 'publications.json');
const PAPERS_DIR = path.join(__dirname, '..', 'public', 'papers');

// ── types ──
interface AuthorConfig {
  name: string;
  id: string;
  startYear: number;
}

interface LabConfig {
  semanticScholar: {
    authorIds: AuthorConfig[];
    defaultStartYear: number;
  };
}

interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  abstract: string;
  pdfPath: string;
  pdfUrl: string;
  doi: string;
  semanticScholarId: string;
  bibtex: string;
  keyContributions: string;
  tags: string[];
  featured: boolean;
}

interface S2Paper {
  paperId: string;
  title: string;
  authors: { name: string }[];
  year: number;
  venue: string;
  abstract: string | null;
  externalIds: { DOI?: string } | null;
  openAccessPdf: { url: string } | null;
  publicationTypes: string[] | null;
}

// ── helpers ──
const STOPWORDS = new Set(['a','an','the','towards','learning','deep','neural','on','via','for','with','using','from','of','in','and','to','by','at','as','or','its','into']);

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function publicationSlug(authors: string[], year: number, title: string): string {
  const lastName = (authors[0] ?? 'unknown').split(' ').pop()!.toLowerCase();
  const words = title.toLowerCase().split(/\s+/).filter(w => !STOPWORDS.has(w));
  const keyword = words[0] ?? 'paper';
  return slugify(`${lastName}-${year}-${keyword}`);
}

function detectTags(venue: string, types: string[] | null): string[] {
  const tags: string[] = [];
  const v = venue.toLowerCase();
  if (types?.includes('JournalArticle') || v.includes('journal') || v.includes('transactions')) {
    tags.push('Journal');
  } else if (v.includes('workshop')) {
    tags.push('Workshop');
  } else if (v.includes('arxiv')) {
    tags.push('ArXiv');
  } else {
    tags.push('Conference');
  }
  // Extract venue acronym
  const match = venue.match(/^[A-Z]{2,}/);
  if (match) tags.push(match[0]);
  return tags;
}

function generateBibtex(pub: { id: string; title: string; authors: string[]; year: number; venue: string; doi: string }): string {
  const v = pub.venue.toLowerCase();
  const type = v.includes('journal') || v.includes('transactions') ? 'article' : 'inproceedings';
  const authorStr = pub.authors.join(' and ');
  if (type === 'article') {
    return `@article{${pub.id.replace(/-/g, '_')},\n  title     = {${pub.title}},\n  author    = {${authorStr}},\n  journal   = {${pub.venue}},\n  year      = {${pub.year}}${pub.doi ? `,\n  doi       = {${pub.doi}}` : ''}\n}`;
  }
  return `@inproceedings{${pub.id.replace(/-/g, '_')},\n  title     = {${pub.title}},\n  author    = {${authorStr}},\n  booktitle = {${pub.venue}},\n  year      = {${pub.year}}${pub.doi ? `,\n  doi       = {${pub.doi}}` : ''}\n}`;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Semantic Scholar fetch ──
async function fetchAuthorPapers(authorId: string, startYear: number): Promise<S2Paper[]> {
  const fields = 'paperId,title,authors,year,venue,abstract,externalIds,openAccessPdf,publicationTypes';
  const baseUrl = `https://api.semanticscholar.org/graph/v1/author/${authorId}/papers?fields=${fields}&limit=500`;
  const headers: Record<string, string> = {};
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) {
    headers['x-api-key'] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  }

  const res = await fetch(baseUrl, { headers });
  if (!res.ok) {
    console.warn(`  S2 API error for author ${authorId}: ${res.status} ${res.statusText}`);
    return [];
  }
  const json = await res.json();
  const papers: S2Paper[] = json.data ?? [];
  return papers.filter(p => p.year >= startYear && p.title);
}

// ── Gemini summarization ──
async function summarizeWithGemini(title: string, abstract: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !abstract) return '';

  const prompt = `Given this research paper title and abstract, write 2-3 sentences summarizing the key contributions. Be specific and technical.\n\nTitle: ${title}\nAbstract: ${abstract}\n\nKey contributions:`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.3 },
        }),
      }
    );
    if (!res.ok) return '';
    const json = await res.json();
    return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
  } catch {
    return '';
  }
}

// ── PDF download ──
async function downloadPdf(url: string, filename: string): Promise<string> {
  if (!fs.existsSync(PAPERS_DIR)) fs.mkdirSync(PAPERS_DIR, { recursive: true });
  const outPath = path.join(PAPERS_DIR, filename);
  if (fs.existsSync(outPath)) return `/papers/${filename}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return '';
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 10240) return ''; // < 10KB likely not a valid PDF
    fs.writeFileSync(outPath, buffer);
    return `/papers/${filename}`;
  } catch {
    return '';
  }
}

// ── Main ──
async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const config: LabConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  const authors = config.semanticScholar.authorIds;

  console.log(`Publications pipeline — ${authors.length} authors configured`);
  for (const a of authors) {
    console.log(`  ${a.name} (S2 ID: ${a.id}, from ${a.startYear})`);
  }

  if (dryRun) {
    console.log('\n--dry-run: exiting without changes.');
    return;
  }

  // Load existing publications
  let existing: Publication[] = [];
  if (fs.existsSync(PUBS_PATH)) {
    existing = JSON.parse(fs.readFileSync(PUBS_PATH, 'utf-8'));
  }
  const existingS2Ids = new Set(existing.filter(p => p.semanticScholarId).map(p => p.semanticScholarId));
  const existingIds = new Set(existing.map(p => p.id));

  // Fetch papers from all authors
  const allPapers: S2Paper[] = [];
  for (const author of authors) {
    console.log(`\nFetching papers for ${author.name}...`);
    const papers = await fetchAuthorPapers(author.id, author.startYear);
    console.log(`  Found ${papers.length} papers`);
    allPapers.push(...papers);
    await sleep(1000); // rate limit
  }

  // Deduplicate by paperId
  const uniquePapers = new Map<string, S2Paper>();
  for (const p of allPapers) {
    if (p.paperId && !uniquePapers.has(p.paperId)) {
      uniquePapers.set(p.paperId, p);
    }
  }

  // Find new papers
  const newPapers = [...uniquePapers.values()].filter(p => !existingS2Ids.has(p.paperId));
  console.log(`\n${uniquePapers.size} unique papers total, ${newPapers.length} new`);

  // Process new papers
  let added = 0;
  for (const paper of newPapers) {
    const authorNames = paper.authors.map(a => a.name);
    let id = publicationSlug(authorNames, paper.year, paper.title);
    // Ensure unique ID
    let suffix = 1;
    let candidateId = id;
    while (existingIds.has(candidateId)) {
      candidateId = `${id}-${suffix++}`;
    }
    id = candidateId;

    const doi = paper.externalIds?.DOI ?? '';
    const tags = [String(paper.year), ...detectTags(paper.venue, paper.publicationTypes)];

    // Generate key contributions via Gemini
    let keyContributions = '';
    if (paper.abstract) {
      keyContributions = await summarizeWithGemini(paper.title, paper.abstract);
      await sleep(500);
    }

    // Download PDF
    let pdfPath = '';
    if (paper.openAccessPdf?.url) {
      pdfPath = await downloadPdf(paper.openAccessPdf.url, `${id}.pdf`);
    }

    const pub: Publication = {
      id,
      title: paper.title,
      authors: authorNames,
      year: paper.year,
      venue: paper.venue || 'Preprint',
      abstract: paper.abstract ?? '',
      pdfPath,
      pdfUrl: paper.openAccessPdf?.url ?? '',
      doi,
      semanticScholarId: paper.paperId,
      bibtex: generateBibtex({ id, title: paper.title, authors: authorNames, year: paper.year, venue: paper.venue || 'Preprint', doi }),
      keyContributions,
      tags,
      featured: false,
    };

    existing.push(pub);
    existingIds.add(id);
    existingS2Ids.add(paper.paperId);
    added++;
    console.log(`  + ${paper.title.slice(0, 60)}... (${paper.year})`);
  }

  // Retroactive summarization: existing entries missing keyContributions
  let summarized = 0;
  for (const pub of existing) {
    if (!pub.keyContributions && pub.abstract) {
      pub.keyContributions = await summarizeWithGemini(pub.title, pub.abstract);
      if (pub.keyContributions) summarized++;
      await sleep(500);
    }
  }

  // Sort by year desc
  existing.sort((a, b) => b.year - a.year);

  // Save
  fs.writeFileSync(PUBS_PATH, JSON.stringify(existing, null, 2));
  console.log(`\nDone: ${added} added, ${summarized} retroactively summarized, ${existing.length} total`);
}

main().catch(err => {
  console.error('Pipeline failed:', err);
  process.exit(1);
});
