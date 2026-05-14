/**
 * Run Gemini summarization for all publications that lack keyContributions.
 * Usage: npx tsx scripts/run-gemini-summaries.ts
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
  abstract: string;
  keyContributions: string;
  [key: string]: unknown;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    if (!res.ok) {
      console.warn(`  Gemini error: ${res.status}`);
      return '';
    }
    const json = await res.json();
    return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
  } catch (e) {
    console.warn('  Gemini fetch failed:', e);
    return '';
  }
}

async function main() {
  const pubs: Publication[] = JSON.parse(fs.readFileSync(PUBS_PATH, 'utf-8'));
  const needsSummary = pubs.filter(p => p.abstract && !p.keyContributions);
  console.log(`Found ${needsSummary.length} publications needing summaries (of ${pubs.length} total)`);

  if (needsSummary.length === 0) {
    console.log('Nothing to do.');
    return;
  }

  let updated = 0;
  for (const pub of pubs) {
    if (!pub.abstract || pub.keyContributions) continue;
    process.stdout.write(`  Summarizing: ${pub.title.slice(0, 60)}... `);
    const summary = await summarizeWithGemini(pub.title, pub.abstract);
    if (summary) {
      pub.keyContributions = summary;
      updated++;
      console.log('✓');
    } else {
      console.log('(no summary)');
    }
    await sleep(500); // avoid rate limits
  }

  fs.writeFileSync(PUBS_PATH, JSON.stringify(pubs, null, 2));
  console.log(`\nDone. Updated ${updated} publications.`);
}

main().catch(console.error);
