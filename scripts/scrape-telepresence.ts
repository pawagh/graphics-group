/**
 * Scrapes https://telepresence.web.unc.edu/ for people, publications, research, and news.
 * Outputs raw JSON files to scripts/scraped/.
 *
 * Usage: npx ts-node scripts/scrape-telepresence.ts
 */

import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = 'https://telepresence.web.unc.edu';
const OUTPUT_DIR = path.join(__dirname, 'scraped');

async function fetchPage(url: string): Promise<string> {
  console.log(`  Fetching: ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ─── PEOPLE ───────────────────────────────────────────────────────────────────

interface RawPerson {
  name: string;
  role: string;
  category: string;
  email: string;
  office: string;
  homepage: string;
  photoUrl: string;
  institution: string;
  graduationYear: string;
  currentPosition: string;
}

async function scrapePeople(): Promise<RawPerson[]> {
  const html = await fetchPage(`${BASE_URL}/people/`);
  const $ = cheerio.load(html);
  const people: RawPerson[] = [];

  // The page has sections separated by headers/dividers
  // Each person entry is in the page content area
  const content = $('.entry-content, .page-content, article, main').first();
  if (!content.length) {
    console.warn('  Could not find content area, trying body');
  }

  let currentCategory = 'unknown';
  const categoryMap: Record<string, string> = {};

  // Walk through all elements looking for headers and person entries
  $('h2, h3, h4, strong, b').each((_i, el) => {
    const text = $(el).text().trim().toLowerCase();
    if (text.includes('faculty')) categoryMap[text] = 'faculty';
    else if (text.includes('staff')) categoryMap[text] = 'staff';
    else if (text.includes('graduate student')) categoryMap[text] = 'phd';
    else if (text.includes('undergraduate')) categoryMap[text] = 'undergrad';
    else if (text.includes('current collaborator')) categoryMap[text] = 'collaborator';
    else if (text.includes('former') && text.includes('collaborator')) categoryMap[text] = 'former-collaborator';
    else if (text.includes('alumni') && text.includes('faculty')) categoryMap[text] = 'alumni-faculty';
    else if (text.includes('alumni') && text.includes('staff')) categoryMap[text] = 'alumni-staff';
    else if (text.includes('alumni') && text.includes('phd')) categoryMap[text] = 'alumni-phd';
    else if (text.includes('alumni') && text.includes('master')) categoryMap[text] = 'alumni-ms';
    else if (text.includes('alumni') && text.includes('undergrad')) categoryMap[text] = 'alumni-undergrad';
  });

  // Parse the page structure - look for person entries
  // Typically each person has their name in a link or bold text, followed by details
  const allText = $('body').html() || '';

  // Since the HTML structure is WordPress-based and varies,
  // let's parse the text content more carefully
  const sections = allText.split(/<h[2-4][^>]*>/i);

  for (const section of sections) {
    const sectionLower = section.toLowerCase();

    // Determine category from section header
    if (sectionLower.includes('faculty') && !sectionLower.includes('alumni')) currentCategory = 'faculty';
    else if (sectionLower.startsWith('staff') || (sectionLower.includes('staff') && !sectionLower.includes('alumni'))) currentCategory = 'staff';
    else if (sectionLower.includes('graduate student')) currentCategory = 'phd';
    else if (sectionLower.includes('undergraduate student') && !sectionLower.includes('alumni')) currentCategory = 'undergrad';
    else if (sectionLower.includes('current collaborator')) currentCategory = 'collaborator';
    else if (sectionLower.includes('former') || sectionLower.includes('future')) currentCategory = 'former-collaborator';
    else if (sectionLower.includes('alumni') && sectionLower.includes('faculty')) currentCategory = 'alumni-faculty';
    else if (sectionLower.includes('alumni') && sectionLower.includes('staff')) currentCategory = 'alumni-staff';
    else if (sectionLower.includes('alumni') && sectionLower.includes('ph')) currentCategory = 'alumni-phd';
    else if (sectionLower.includes('alumni') && sectionLower.includes('master')) currentCategory = 'alumni-ms';
    else if (sectionLower.includes('alumni') && sectionLower.includes('undergrad')) currentCategory = 'alumni-undergrad';

    // Extract person entries from each section
    const $section = cheerio.load(section);

    // Look for person entries - typically in paragraphs, list items, or table rows
    $section('a, strong, b').each((_i, el) => {
      const name = $section(el).text().trim();
      // Skip if it's not a person name (too short, has special chars, etc.)
      if (!name || name.length < 3 || name.length > 60) return;
      if (name.match(/^(email|homepage|office|phone|fax)/i)) return;
      if (name.match(/^(http|www|@)/i)) return;
    });
  }

  // Since HTML parsing is complex for this WordPress site,
  // we'll output what we can parse and supplement with manual data
  console.log(`  Parsed ${people.length} people from HTML (may need supplementing)`);
  return people;
}

// ─── PUBLICATIONS ─────────────────────────────────────────────────────────────

interface RawPublication {
  title: string;
  authors: string;
  year: number;
  venue: string;
  paperUrl: string;
  projectUrl: string;
  doi: string;
  thumbnailUrl: string;
  awards: string;
}

async function scrapePublications(): Promise<RawPublication[]> {
  const html = await fetchPage(`${BASE_URL}/publications/`);
  const $ = cheerio.load(html);
  const pubs: RawPublication[] = [];

  // Publications page has entries in chronological order
  // Each pub typically has title (bold/link), authors, venue, and links
  const content = $('.entry-content, .page-content, article').first();

  let currentYear = 0;

  // Look for year headers and publication entries
  content.find('h2, h3, h4, p, li, div').each((_i, el) => {
    const text = $(el).text().trim();

    // Check if this is a year header
    const yearMatch = text.match(/^(20\d{2}|19\d{2})$/);
    if (yearMatch) {
      currentYear = parseInt(yearMatch[1]);
      return;
    }

    // Check if this element contains a publication
    const strongEl = $(el).find('strong, b').first();
    const linkEl = $(el).find('a').first();

    if (strongEl.length || (linkEl.length && text.length > 30)) {
      const title = (strongEl.text() || linkEl.text()).trim();
      if (title.length < 10) return;

      // Extract links
      const links: string[] = [];
      $(el).find('a').each((_j, a) => {
        const href = $(a).attr('href') || '';
        if (href && !href.startsWith('#')) links.push(href);
      });

      // Try to extract authors and venue from surrounding text
      const fullText = text;

      pubs.push({
        title,
        authors: '',
        year: currentYear,
        venue: '',
        paperUrl: links[0] || '',
        projectUrl: links.length > 1 ? links[1] : '',
        doi: links.find(l => l.includes('doi.org')) || '',
        thumbnailUrl: $(el).find('img').attr('src') || '',
        awards: fullText.toLowerCase().includes('best paper') || fullText.toLowerCase().includes('award') ? 'award' : '',
      });
    }
  });

  console.log(`  Parsed ${pubs.length} publications from HTML`);
  return pubs;
}

// ─── RESEARCH ─────────────────────────────────────────────────────────────────

interface RawResearch {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  active: boolean;
}

async function scrapeResearch(): Promise<RawResearch[]> {
  const html = await fetchPage(`${BASE_URL}/research/`);
  const $ = cheerio.load(html);
  const projects: RawResearch[] = [];

  let isCurrentSection = true;

  $('h2, h3, h4, li, p, a').each((_i, el) => {
    const text = $(el).text().trim().toLowerCase();
    if (text.includes('past research')) isCurrentSection = false;
    if (text.includes('current research')) isCurrentSection = true;
  });

  // Parse project entries
  const content = $('.entry-content, .page-content, article').first();
  let currentSection = true;

  content.find('*').each((_i, el) => {
    const text = $(el).text().trim();
    const textLower = text.toLowerCase();

    if (textLower === 'past research' || textLower === 'past research projects') currentSection = false;
    if (textLower === 'current research' || textLower === 'current research projects') currentSection = true;

    // Look for project links/titles
    if ($(el).is('a') && $(el).attr('href')?.includes('/research/')) {
      const title = text;
      const url = $(el).attr('href') || '';
      if (title.length > 5 && !title.toLowerCase().includes('research')) {
        projects.push({
          title,
          description: '',
          imageUrl: $(el).closest('div, li, p').find('img').attr('src') || '',
          projectUrl: url.startsWith('http') ? url : `${BASE_URL}${url}`,
          active: currentSection,
        });
      }
    }
  });

  console.log(`  Parsed ${projects.length} research projects from HTML`);
  return projects;
}

// ─── NEWS ─────────────────────────────────────────────────────────────────────

interface RawNews {
  title: string;
  date: string;
  summary: string;
  link: string;
  type: string;
}

async function scrapeNews(): Promise<RawNews[]> {
  const html = await fetchPage(`${BASE_URL}/`);
  const $ = cheerio.load(html);
  const news: RawNews[] = [];

  // Look for recent posts/news on homepage
  $('article, .post, .entry').each((_i, el) => {
    const title = $(el).find('h2, h3, .entry-title').first().text().trim();
    const link = $(el).find('a').first().attr('href') || '';
    const summary = $(el).find('p, .entry-summary, .excerpt').first().text().trim();
    const dateEl = $(el).find('time, .date, .posted-on').first();
    const date = dateEl.attr('datetime') || dateEl.text().trim();

    if (title) {
      news.push({
        title,
        date,
        summary: summary.substring(0, 300),
        link,
        type: title.toLowerCase().includes('award') || title.toLowerCase().includes('best') ? 'award' :
              title.toLowerCase().includes('accepted') || title.toLowerCase().includes('paper') ? 'paper' : 'other',
      });
    }
  });

  console.log(`  Parsed ${news.length} news items from HTML`);
  return news;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Telepresence Site Scraper ===\n');

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('Scraping people...');
  const people = await scrapePeople();

  console.log('\nScraping publications...');
  const publications = await scrapePublications();

  console.log('\nScraping research...');
  const research = await scrapeResearch();

  console.log('\nScraping news...');
  const news = await scrapeNews();

  // Write outputs
  const write = (name: string, data: unknown) => {
    const filepath = path.join(OUTPUT_DIR, name);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    console.log(`  Wrote ${filepath}`);
  };

  write('people-raw.json', people);
  write('publications-raw.json', publications);
  write('research-raw.json', research);
  write('news-raw.json', news);

  console.log(`\nSummary:`);
  console.log(`  People: ${people.length}`);
  console.log(`  Publications: ${publications.length}`);
  console.log(`  Research: ${research.length}`);
  console.log(`  News: ${news.length}`);

  if (people.length === 0) {
    console.log('\n⚠ HTML parsing found 0 people — the WordPress structure may need manual supplementation.');
    console.log('  Run scripts/transform-data.ts which includes hardcoded data from the site as fallback.');
  }
}

main().catch(err => {
  console.error('Scraper failed:', err);
  process.exit(1);
});
