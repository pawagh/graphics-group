import fs from 'fs';
import path from 'path';

export interface Publication {
  title: string;
  slug: string;
  authors: string;
  meta: string;
  image: string;
  link: string;
  tags: string[];
}

const PUBLICATIONS_FILE_PATH = path.join(process.cwd(), 'src/data/publications.json');

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getPublications(): Promise<Publication[]> {
  try {
    // Ensure JSON store exists, migrate if missing
    if (!fs.existsSync(PUBLICATIONS_FILE_PATH)) {
      await migratePublicationsData();
    }

    // Load publications from JSON
    const jsonContent = fs.readFileSync(PUBLICATIONS_FILE_PATH, 'utf-8');
    const jsonPublications: Publication[] = JSON.parse(jsonContent);

    // Also load publications from static data.ts, then merge unique by slug
    let staticPublications: Publication[] = [];
    try {
      const mod = await import('@/app/publications/data');
      staticPublications = (mod.publications ?? []) as Publication[];
    } catch {
      staticPublications = [];
    }

    const slugToPublication = new Map<string, Publication>();
    // Prefer JSON (newer, editable) entries; then fill with static
    for (const p of jsonPublications) slugToPublication.set(p.slug, p);
    for (const p of staticPublications) if (!slugToPublication.has(p.slug)) slugToPublication.set(p.slug, p);

    // Return newest-first ordering by year in tags if present; otherwise keep insertion
    const merged = Array.from(slugToPublication.values());
    merged.sort((a, b) => {
      const yearA = (a.tags.find(t => /^\d{4}$/.test(t)) ?? '0000');
      const yearB = (b.tags.find(t => /^\d{4}$/.test(t)) ?? '0000');
      if (yearA !== yearB) return yearB.localeCompare(yearA);
      return 0;
    });
    return merged;
  } catch (error) {
    console.error('Error reading publications:', error);
    return [];
  }
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

// Migration function to move from data.ts to JSON file
async function migratePublicationsData(): Promise<void> {
  try {
    // Import the existing publications data
    const { publications } = await import('@/app/publications/data');
    
    // Ensure data directory exists
    const dataDir = path.dirname(PUBLICATIONS_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Write to JSON file
    fs.writeFileSync(PUBLICATIONS_FILE_PATH, JSON.stringify(publications, null, 2));
    console.log('Publications data migrated successfully');
  } catch (error) {
    console.error('Error migrating publications data:', error);
  }
}
