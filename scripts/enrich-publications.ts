/**
 * Enrich publications: fetch abstracts from Semantic Scholar (by title search
 * or semanticScholarId), then run Gemini to generate keyContributions.
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

async function fetchAbstractByS2Id(s2Id: string): Promise<string> {
  const url = `https://api.semanticscholar.org/graph/v1/paper/${s2Id}?fields=abstract`;
  const headers: Record<string, string> = {};
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) headers['x-api-key'] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return '';
    const json = await res.json();
    return json.abstract ?? '';
  } catch { return ''; }
}

async function fetchAbstractByTitle(title: string, year: number): Promise<{ abstract: string; s2Id: string }> {
  const query = encodeURIComponent(title);
  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${query}&fields=abstract,paperId,year&limit=5`;
  const headers: Record<string, string> = {};
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) headers['x-api-key'] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return { abstract: '', s2Id: '' };
    const json = await res.json();
    const papers = json.data ?? [];
    // Find closest match by year
    const match = papers.find((p: { year: number; abstract: string; paperId: string }) =>
      Math.abs((p.year ?? 0) - year) <= 1 && p.abstract
    );
    if (match) return { abstract: match.abstract ?? '', s2Id: match.paperId ?? '' };
    // Fallback: first result with an abstract
    const any = papers.find((p: { abstract: string; paperId: string }) => p.abstract);
    return any ? { abstract: any.abstract ?? '', s2Id: any.paperId ?? '' } : { abstract: '', s2Id: '' };
  } catch { return { abstract: '', s2Id: '' }; }
}

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
  } catch { return ''; }
}

async function main() {
  const pubs: Publication[] = JSON.parse(fs.readFileSync(PUBS_PATH, 'utf-8'));
  console.log(`Processing ${pubs.length} publications...\n`);

  let abstractsAdded = 0;
  let summariesAdded = 0;

  for (let i = 0; i < pubs.length; i++) {
    const pub = pubs[i];
    const progress = `[${i + 1}/${pubs.length}]`;

    // Step 1: fetch abstract if missing
    if (!pub.abstract) {
      process.stdout.write(`${progress} Fetching abstract: ${pub.title.slice(0, 50)}... `);
      let abstract = '';
      let s2Id = '';

      if (pub.semanticScholarId) {
        abstract = await fetchAbstractByS2Id(pub.semanticScholarId);
        s2Id = pub.semanticScholarId;
      }

      if (!abstract) {
        const result = await fetchAbstractByTitle(pub.title, pub.year);
        abstract = result.abstract;
        s2Id = s2Id || result.s2Id;
      }

      if (abstract) {
        pub.abstract = abstract;
        if (s2Id && !pub.semanticScholarId) pub.semanticScholarId = s2Id;
        abstractsAdded++;
        console.log('✓');
      } else {
        console.log('(not found)');
      }
      await sleep(300);
    }

    // Step 2: generate keyContributions if we have an abstract but no summary
    if (pub.abstract && !pub.keyContributions) {
      process.stdout.write(`${progress} Summarizing: ${pub.title.slice(0, 50)}... `);
      const summary = await summarizeWithGemini(pub.title, pub.abstract);
      if (summary) {
        pub.keyContributions = summary;
        summariesAdded++;
        console.log('✓');
      } else {
        console.log('(no summary)');
      }
      await sleep(400);
    }
  }

  fs.writeFileSync(PUBS_PATH, JSON.stringify(pubs, null, 2));
  console.log(`\nDone. Abstracts added: ${abstractsAdded}, summaries added: ${summariesAdded}`);
}

main().catch(console.error);
