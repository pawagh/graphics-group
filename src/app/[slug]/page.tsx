import { redirect, notFound } from 'next/navigation';
import { getPublicationBySlug } from '@/lib/publications';

// List of reserved routes that should not be treated as publication slugs
const RESERVED_ROUTES = [
  'api',
  'publications',
  'people',
  'opportunities',
  'teaching',
  'past-research',
  'news',
];

export default async function SlugRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Don't redirect reserved routes
  if (RESERVED_ROUTES.includes(slug)) {
    notFound();
  }

  // Check if this slug corresponds to a publication
  const publication = await getPublicationBySlug(slug);

  if (publication) {
    // Redirect to the publication page
    redirect(`/publications/${slug}`);
  }

  // If not a publication, show 404
  notFound();
}

