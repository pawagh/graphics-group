import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getResearch, getResearchById } from '@/lib/data';

export function generateStaticParams() {
  return getResearch().map(r => ({ id: r.id }));
}

export default async function ResearchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getResearchById(id);
  if (!project) notFound();

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
      </div>
    </div>
  );
}
