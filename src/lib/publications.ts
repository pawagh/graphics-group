import fs from 'fs';
import path from 'path';

/**
 * Publication interface for VCAIL website.
 * The scraper outputs data matching this exact schema.
 */
export interface Publication {
  title: string;
  slug: string;
  authors: string;       // Comma-separated author names
  meta: string;          // e.g., "CVPR 2025" or "Best Paper Award, SIGGRAPH 2024"
  image: string;         // Path to thumbnail image
  link: string;          // Primary link (paper URL, arXiv, DOI, etc.)
  tags: string[];        // ["Conference", "CVPR", "2025"] for filtering
  summary?: string;      // AI-generated or manually written 1-2 sentence summary
  keyContributions?: string[];  // AI-generated list of 3-5 key contributions
  project?: string;      // Slug of related past-research project
}

const PUBLICATIONS_FILE_PATH = path.join(process.cwd(), 'src/data/publications.json');

/**
 * Generate URL-friendly slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get all publications, sorted by year (newest first)
 */
export async function getPublications(): Promise<Publication[]> {
  try {
    const jsonContent = fs.readFileSync(PUBLICATIONS_FILE_PATH, 'utf-8');
    const publications: Publication[] = JSON.parse(jsonContent);

    // Sort newest-first by year tag
    publications.sort((a, b) => {
      const yearA = a.tags.find(t => /^\d{4}$/.test(t)) ?? '0000';
      const yearB = b.tags.find(t => /^\d{4}$/.test(t)) ?? '0000';
      if (yearA !== yearB) return yearB.localeCompare(yearA);
      return 0;
    });

    return publications;
  } catch (error) {
    console.error('Error reading publications:', error);
    return [];
  }
}

/**
 * Get publications grouped by year
 */
export async function getPublicationsByYear(): Promise<Record<string, Publication[]>> {
  const publications = await getPublications();
  const grouped: Record<string, Publication[]> = {};
  
  for (const pub of publications) {
    const year = pub.tags.find(t => /^\d{4}$/.test(t)) || 'Unknown';
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(pub);
  }
  
  return grouped;
}

/**
 * Get award-winning publications
 */
export async function getAwardPublications(): Promise<Publication[]> {
  const publications = await getPublications();
  return publications.filter(p => {
    const metaLower = p.meta.toLowerCase();
    return metaLower.includes('best paper') || 
           metaLower.includes('award') || 
           metaLower.includes('honorable mention');
  });
}

/**
 * Search publications by query string
 */
export async function searchPublications(query: string): Promise<Publication[]> {
  const publications = await getPublications();
  const queryLower = query.toLowerCase();
  
  return publications.filter(pub => {
    return (
      pub.title.toLowerCase().includes(queryLower) ||
      pub.authors.toLowerCase().includes(queryLower) ||
      pub.meta.toLowerCase().includes(queryLower) ||
      pub.summary?.toLowerCase().includes(queryLower) ||
      pub.tags.some(t => t.toLowerCase().includes(queryLower))
    );
  });
}

/**
 * Get publication statistics
 */
export async function getPublicationStats(): Promise<{
  total: number;
  byYear: Record<string, number>;
  withSummary: number;
  awards: number;
}> {
  const publications = await getPublications();
  
  const byYear: Record<string, number> = {};
  let withSummary = 0;
  let awards = 0;
  
  for (const pub of publications) {
    const year = pub.tags.find(t => /^\d{4}$/.test(t)) || 'Unknown';
    byYear[year] = (byYear[year] || 0) + 1;
    
    if (pub.summary && pub.summary.trim()) withSummary++;
    
    const metaLower = pub.meta.toLowerCase();
    if (metaLower.includes('best paper') || metaLower.includes('award') || metaLower.includes('honorable mention')) {
      awards++;
    }
  }
  
  return { total: publications.length, byYear, withSummary, awards };
}

export async function addPublication(publicationData: Omit<Publication, 'slug'>): Promise<Publication | null> {
  try {
    const publications = await getPublications();
    const slug = generateSlug(publicationData.title);
    
    // Check if slug already exists
    const existingPublication = publications.find(p => p.slug === slug);
    if (existingPublication) {
      throw new Error('Publication with this title already exists');
    }
    
    const newPublication: Publication = {
      ...publicationData,
      slug
    };
    
    publications.unshift(newPublication); // Add to beginning for latest first
    
    fs.writeFileSync(PUBLICATIONS_FILE_PATH, JSON.stringify(publications, null, 2));
    return newPublication;
  } catch (error) {
    console.error('Error adding publication:', error);
    return null;
  }
}

export async function updatePublication(slug: string, updateData: Partial<Omit<Publication, 'slug'>>): Promise<boolean> {
  try {
    const publications = await getPublications();
    const index = publications.findIndex(p => p.slug === slug);
    
    if (index === -1) {
      return false;
    }
    
    publications[index] = { ...publications[index], ...updateData };
    
    // If title changed, update slug
    if (updateData.title && updateData.title !== publications[index].title) {
      const newSlug = generateSlug(updateData.title);
      publications[index].slug = newSlug;
    }
    
    fs.writeFileSync(PUBLICATIONS_FILE_PATH, JSON.stringify(publications, null, 2));
    return true;
  } catch (error) {
    console.error('Error updating publication:', error);
    return false;
  }
}

export async function deletePublication(slug: string): Promise<boolean> {
  try {
    const publications = await getPublications();
    const filteredPublications = publications.filter(p => p.slug !== slug);
    
    if (filteredPublications.length === publications.length) {
      return false; // Publication not found
    }
    
    fs.writeFileSync(PUBLICATIONS_FILE_PATH, JSON.stringify(filteredPublications, null, 2));
    return true;
  } catch (error) {
    console.error('Error deleting publication:', error);
    return false;
  }
}

export async function getPublicationBySlug(slug: string): Promise<Publication | null> {
  try {
    const publications = await getPublications();
    return publications.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error('Error finding publication by slug:', error);
    return null;
  }
}
