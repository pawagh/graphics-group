import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getResearch, getResearchById, getPublicationById } from '@/lib/data';
import type { Publication } from '@/lib/types';

export function generateStaticParams() {
  return getResearch().map(r => ({ id: r.id }));
}

export default async function ResearchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getResearchById(id);
  if (!project) notFound();

  const linkedPubs: Publication[] = (project.publicationIds ?? [])
    .map((pid: string) => getPublicationById(pid))
    .filter(Boolean) as Publication[];

  // Sort linked publications newest first
  linkedPubs.sort((a, b) => b.year - a.year);

  return (
    <div>
      <div className="page-banner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/research" className="text-white/60 hover:text-white text-sm mb-4 inline-block">&larr; All Research</Link>
          <h1 className="text-2xl sm:text-3xl">{project.title}</h1>
          {project.active && (
            <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-200 font-medium">
              Active
            </span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {project.imagePath && (
          <div className="mb-8 rounded-lg overflow-hidden" style={{ maxHeight: '320px' }}>
            <Image
              src={project.imagePath}
              alt={project.title}
              width={800}
              height={320}
              className="w-full object-cover"
              style={{ maxHeight: '320px' }}
            />
          </div>
        )}

        <section className="mb-8">
          <p className="leading-relaxed text-lg" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
        </section>

        {project.tags.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>Tags</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>
          </section>
        )}

        {linkedPubs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-muted)' }}>
              Related Publications
            </h2>
            <div className="space-y-3">
              {linkedPubs.map(pub => (
                <Link
                  key={pub.id}
                  href={`/publications/${pub.id}`}
                  className="card block p-4 hover:border-[var(--unc-blue)] transition-colors"
                >
                  <div className="flex gap-3 items-start">
                    <span className="text-xs font-semibold flex-shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {pub.year}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {pub.title}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {pub.authors.join(', ')} &middot; {pub.venue}
                      </p>
                      {pub.award && (
                        <p className="text-xs mt-1" style={{ color: '#D97706' }}>🏆 {pub.award}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
