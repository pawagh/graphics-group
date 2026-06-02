/**
 * Enrich publications:
 *   1. Fetch abstract + tldr from Semantic Scholar (by ID or title search)
 *   2. Fetch abstract from CrossRef if S2 misses (older papers)
 *   3. Generate bulleted Key Contributions via Gemini 2.5 Flash
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
  tldr: string;
  keyContributions: string;
  semanticScholarId: string;
  doi: string;
  [key: string]: unknown;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Semantic Scholar: direct ID lookup (abstract + tldr) ──
async function fetchByS2Id(s2Id: string): Promise<{ abstract: string; tldr: string }> {
  const url = `https://api.semanticscholar.org/graph/v1/paper/${s2Id}?fields=abstract,tldr`;
  const headers: Record<string, string> = {};
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) headers['x-api-key'] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return { abstract: '', tldr: '' };
    const json = await res.json() as { abstract?: string; tldr?: { text?: string } };
    return { abstract: json.abstract ?? '', tldr: json.tldr?.text ?? '' };
  } catch { return { abstract: '', tldr: '' }; }
}

// ── Semantic Scholar: title search ──
async function fetchByS2Title(title: string, year: number): Promise<{ abstract: string; tldr: string; s2Id: string; doi: string }> {
  const words = title.split(/\s+/).slice(0, 7).join(' ');
  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(words)}&fields=abstract,tldr,paperId,year,externalIds&limit=8`;
  const headers: Record<string, string> = {};
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) headers['x-api-key'] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return { abstract: '', tldr: '', s2Id: '', doi: '' };
    const json = await res.json() as { data?: Array<{ year?: number; abstract?: string; tldr?: { text?: string }; paperId?: string; externalIds?: { DOI?: string } }> };
    const papers = json.data ?? [];
    let best = papers.find(p => Math.abs((p.year ?? 0) - year) <= 1 && (p.abstract || p.tldr));
    if (!best) best = papers.find(p => Math.abs((p.year ?? 0) - year) <= 3 && (p.abstract || p.tldr));
    if (!best) best = papers.find(p => p.abstract || p.tldr);
    if (best) return { abstract: best.abstract ?? '', tldr: best.tldr?.text ?? '', s2Id: best.paperId ?? '', doi: best.externalIds?.DOI ?? '' };
  } catch { /* ignore */ }
  return { abstract: '', tldr: '', s2Id: '', doi: '' };
}

// ── CrossRef: abstract only (older papers not in S2) ──
async function fetchByCrossRef(title: string, firstAuthor: string, year: number): Promise<{ abstract: string; doi: string }> {
  const q = encodeURIComponent(title.slice(0, 80));
  const author = encodeURIComponent(firstAuthor.split(' ').pop() ?? '');
  const url = `https://api.crossref.org/works?query.title=${q}&query.author=${author}&filter=from-pub-date:${year - 1},until-pub-date:${year + 1}&rows=3&select=abstract,DOI`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'vcail-website/1.0' } });
    if (!res.ok) return { abstract: '', doi: '' };
    const json = await res.json() as { message?: { items?: Array<{ abstract?: string; DOI?: string }> } };
    const hit = (json.message?.items ?? []).find(it => it.abstract);
    if (hit) return { abstract: hit.abstract!.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(), doi: hit.DOI ?? '' };
  } catch { /* ignore */ }
  return { abstract: '', doi: '' };
}

// ── Validate abstract isn't a CrossRef mismatch ──
function abstractMatchesTitle(title: string, abstract: string): boolean {
  const stopwords = new Set(['a','an','the','of','in','for','with','on','to','and','or','by','via','using','from','at','is','are','as','its','into','be']);
  const kw = (s: string) => new Set(s.toLowerCase().match(/[a-z]{4,}/g)?.filter(w => !stopwords.has(w)) ?? []);
  const tk = kw(title);
  const ak = kw(abstract);
  const overlap = [...tk].filter(w => ak.has(w)).length;
  return tk.size < 3 || overlap > 0;
}

// ── Gemini: bulleted key contributions ──
async function keyContributionsWithGemini(title: string, abstract: string, retries = 3): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !abstract) return '';
  const prompt = `Extract 3-5 key contributions from this computer science paper as a bullet list. Output ONLY the bullets — no intro sentence, no preamble, no section header. Each bullet must start with "•", be one sentence, name a concrete technique/system/result, and avoid starting with "We" or "This paper".

Title: ${title}
Abstract: ${abstract}

•`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 800, temperature: 0.2 },
          }),
        }
      );
      if (res.status === 429) { await sleep(20000 * (attempt + 1)); continue; }
      if (!res.ok) return '';
      const json = await res.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
      let text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
      // The prompt ends with "•" so prepend it back if the model continued without it
      if (text && !text.startsWith('•')) text = '• ' + text;
      if (text) return text;
    } catch { /* ignore */ }
    await sleep(2000 * (attempt + 1));
  }
  return '';
}

async function main() {
  const pubs: Publication[] = JSON.parse(fs.readFileSync(PUBS_PATH, 'utf-8'));

  // Ensure tldr field exists on all entries
  for (const p of pubs) {
    if (p.tldr === undefined) p.tldr = '';
  }

  const needsS2 = pubs.filter(p => !p.tldr && !p.abstract);
  const needsGemini = pubs.filter(p => p.abstract && !p.keyContributions);
  console.log(`Total: ${pubs.length} | Need S2 lookup: ${needsS2.length + pubs.filter(p => !p.tldr && p.semanticScholarId).length} | Need Gemini: ${needsGemini.length}\n`);

  let tldrAdded = 0, abstractsAdded = 0, keysAdded = 0;

  for (let i = 0; i < pubs.length; i++) {
    const pub = pubs[i];
    const prog = `[${i + 1}/${pubs.length}]`;

    // ── Step 1: S2 lookup for tldr + abstract ──
    if (!pub.tldr || !pub.abstract) {
      let abstract = pub.abstract;
      let tldr = pub.tldr;
      let s2Id = pub.semanticScholarId;
      let doi = pub.doi;

      if (s2Id) {
        process.stdout.write(`${prog} S2 ID lookup: ${pub.title.slice(0, 50)}... `);
        const r = await fetchByS2Id(s2Id);
        abstract = abstract || r.abstract;
        tldr = tldr || r.tldr;
        await sleep(200);
        console.log(tldr ? '✓ (tldr)' : abstract ? '✓ (abstract)' : '(no tldr)');
      } else if (!abstract) {
        process.stdout.write(`${prog} S2 search: ${pub.title.slice(0, 50)}... `);
        const r = await fetchByS2Title(pub.title, pub.year);
        abstract = abstract || r.abstract;
        tldr = tldr || r.tldr;
        s2Id = s2Id || r.s2Id;
        doi = doi || r.doi;
        await sleep(300);
        console.log(tldr ? '✓ (tldr)' : abstract ? '✓ (abstract)' : '(not found)');
      }

      if (tldr && tldr !== pub.tldr) { pub.tldr = tldr; tldrAdded++; }
      if (abstract && abstract !== pub.abstract) { pub.abstract = abstract; abstractsAdded++; }
      if (s2Id && !pub.semanticScholarId) pub.semanticScholarId = s2Id;
      if (doi && !pub.doi) pub.doi = doi;
    }

    // ── Step 2: Gemini key contributions ──
    if (pub.abstract && !pub.keyContributions) {
      process.stdout.write(`${prog} Gemini: ${pub.title.slice(0, 50)}... `);
      const kc = await keyContributionsWithGemini(pub.title, pub.abstract);
      if (kc) { pub.keyContributions = kc; keysAdded++; console.log('✓'); }
      else console.log('(quota)');
      await sleep(3100); // gemini-2.5-flash-lite: 20 RPM free tier → 3s/call
    }
  }

  fs.writeFileSync(PUBS_PATH, JSON.stringify(pubs, null, 2));
  console.log(`\nDone. TLDRs: +${tldrAdded}, abstracts: +${abstractsAdded}, key contributions: +${keysAdded}`);
}

main().catch(console.error);
