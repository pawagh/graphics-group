/**
 * Enrich publications: fetch abstracts via Semantic Scholar + CrossRef,
 * then run Gemini 2.5 Flash to generate keyContributions.
 *
 * Usage: npx tsx scripts/enrich-publications.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBS_PATH = path.join(__dirname, '..', 'data', 'publications.json');

interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  abstract: string;
  keyContributions: string;
  semanticScholarId: string;
  doi: string;
  [key: string]: unknown;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Semantic Scholar: direct ID lookup ──
async function fetchAbstractByS2Id(s2Id: string): Promise<string> {
  const url = `https://api.semanticscholar.org/graph/v1/paper/${s2Id}?fields=abstract`;
  const headers: Record<string, string> = {};
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) headers['x-api-key'] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return '';
    const json = await res.json() as { abstract?: string };
    return json.abstract ?? '';
  } catch { return ''; }
}

// ── Semantic Scholar: title search (short prefix, year-tolerant) ──
async function fetchByS2TitleSearch(title: string, year: number): Promise<{ abstract: string; s2Id: string; doi: string }> {
  // Use first 6-8 words as query to improve match rate
  const words = title.split(/\s+/).slice(0, 7).join(' ');
  const query = encodeURIComponent(words);
  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${query}&fields=abstract,paperId,year,externalIds&limit=8`;
  const headers: Record<string, string> = {};
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) headers['x-api-key'] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return { abstract: '', s2Id: '', doi: '' };
    const json = await res.json() as { data?: Array<{ year?: number; abstract?: string; paperId?: string; externalIds?: { DOI?: string } }> };
    const papers = json.data ?? [];
    // Match by year proximity and require an abstract
    let best = papers.find(p => Math.abs((p.year ?? 0) - year) <= 1 && p.abstract);
    if (!best) best = papers.find(p => Math.abs((p.year ?? 0) - year) <= 3 && p.abstract);
    if (!best) best = papers.find(p => p.abstract);
    if (best) return { abstract: best.abstract ?? '', s2Id: best.paperId ?? '', doi: best.externalIds?.DOI ?? '' };
  } catch { /* ignore */ }
  return { abstract: '', s2Id: '', doi: '' };
}

// ── CrossRef: title + author search ──
async function fetchByCrossRef(title: string, firstAuthor: string, year: number): Promise<{ abstract: string; doi: string }> {
  const q = encodeURIComponent(title.slice(0, 80));
  const author = encodeURIComponent(firstAuthor.split(' ').pop() ?? '');
  const url = `https://api.crossref.org/works?query.title=${q}&query.author=${author}&filter=from-pub-date:${year - 1},until-pub-date:${year + 1}&rows=3&select=abstract,DOI,title,published`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'vcail-website/1.0 (mailto:admin@example.com)' } });
    if (!res.ok) return { abstract: '', doi: '' };
    const json = await res.json() as { message?: { items?: Array<{ abstract?: string; DOI?: string }> } };
    const items = json.message?.items ?? [];
    const hit = items.find(it => it.abstract);
    if (hit) return { abstract: stripHtmlTags(hit.abstract ?? ''), doi: hit.DOI ?? '' };
  } catch { /* ignore */ }
  return { abstract: '', doi: '' };
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// ── Gemini summarization with retry ──
async function summarizeWithGemini(title: string, abstract: string, retries = 3): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !abstract) return '';
  const prompt = `Given this research paper title and abstract, write 2-3 sentences summarizing the key contributions. Be specific and technical.\n\nTitle: ${title}\nAbstract: ${abstract}\n\nKey contributions:`;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 300, temperature: 0.3 },
          }),
        }
      );
      if (res.status === 429) {
        await sleep(5000 * (attempt + 1)); // back off on rate limit
        continue;
      }
      if (!res.ok) return '';
      const json = await res.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
      if (text) return text;
    } catch { /* ignore */ }
    await sleep(1000 * (attempt + 1));
  }
  return '';
}

async function main() {
  const pubs: Publication[] = JSON.parse(fs.readFileSync(PUBS_PATH, 'utf-8'));
  const needsAbstract = pubs.filter(p => !p.abstract);
  const needsSummary = pubs.filter(p => p.abstract && !p.keyContributions);
  console.log(`Total: ${pubs.length}  |  Need abstract: ${needsAbstract.length}  |  Need summary: ${needsSummary.length}\n`);

  let abstractsAdded = 0;
  let summariesAdded = 0;

  for (let i = 0; i < pubs.length; i++) {
    const pub = pubs[i];
    const progress = `[${i + 1}/${pubs.length}]`;

    // ── Step 1: fetch abstract ──
    if (!pub.abstract) {
      process.stdout.write(`${progress} Abstract: ${pub.title.slice(0, 55)}... `);
      let abstract = '';
      let s2Id = '';
      let doi = '';

      // Strategy A: direct S2 ID
      if (pub.semanticScholarId) {
        abstract = await fetchAbstractByS2Id(pub.semanticScholarId);
        s2Id = pub.semanticScholarId;
        await sleep(200);
      }

      // Strategy B: S2 title search
      if (!abstract) {
        const r = await fetchByS2TitleSearch(pub.title, pub.year);
        abstract = r.abstract; s2Id = s2Id || r.s2Id; doi = doi || r.doi;
        await sleep(300);
      }

      // Strategy C: CrossRef (good for older papers)
      if (!abstract) {
        const r = await fetchByCrossRef(pub.title, pub.authors[0] ?? '', pub.year);
        abstract = r.abstract; doi = doi || r.doi;
        await sleep(300);
      }

      if (abstract) {
        pub.abstract = abstract;
        if (s2Id && !pub.semanticScholarId) pub.semanticScholarId = s2Id;
        if (doi && !pub.doi) pub.doi = doi;
        abstractsAdded++;
        console.log('✓');
      } else {
        console.log('(not found)');
      }
    }

    // ── Step 2: generate key contributions ──
    if (pub.abstract && !pub.keyContributions) {
      process.stdout.write(`${progress} Summary:  ${pub.title.slice(0, 55)}... `);
      const summary = await summarizeWithGemini(pub.title, pub.abstract);
      if (summary) {
        pub.keyContributions = summary;
        summariesAdded++;
        console.log('✓');
      } else {
        console.log('(failed)');
      }
      await sleep(600);
    }
  }

  fs.writeFileSync(PUBS_PATH, JSON.stringify(pubs, null, 2));
  console.log(`\nDone. Abstracts added: ${abstractsAdded}, summaries added: ${summariesAdded}`);
}

main().catch(console.error);
