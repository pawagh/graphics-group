import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPublications, getPublicationById } from '@/lib/data';
import CopyBibtexButton from './CopyBibtexButton';

export function generateStaticParams() {
  return getPublications().map(p => ({ id: p.id }));
}

export default async function PublicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pub = getPublicationById(id);
  if (!pub) notFound();

  return (
    <div>
      <div className="page-banner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/publications" className="text-white/60 hover:text-white text-sm mb-4 inline-block">&larr; All Publications</Link>
          <h1 className="text-2xl sm:text-3xl">{pub.title}</h1>
          <p className="mt-2 text-white/70">{pub.venue} &middot; {pub.year}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* Thumbnail */}
        {pub.imagePath && (
          <div className="mb-8 rounded-lg overflow-hidden" style={{ maxHeight: 340, background: 'var(--bg-secondary)' }}>
            <Image
              src={pub.imagePath}
              alt={pub.title}
              width={800}
              height={340}
              className="w-full object-contain"
              style={{ maxHeight: 340 }}
            />
          </div>
        )}

        {/* Award badge */}
        {pub.award && (
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              🏆 {pub.award}
            </span>
          </div>
        )}

        {/* Authors */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>Authors</h2>
          <p style={{ color: 'var(--text-primary)' }}>{pub.authors.join(', ')}</p>
        </section>

        {/* Abstract */}
        {pub.abstract && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>Abstract</h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{pub.abstract}</p>
          </section>
        )}

        {/* Key Contributions */}
        {pub.keyContributions && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>Key Contributions</h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{pub.keyContributions}</p>
          </section>
        )}

        {/* Links */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>Links</h2>
          <div className="flex flex-wrap gap-3">
            {(pub.pdfPath || pub.pdfUrl) && (
              <a href={pub.pdfPath || pub.pdfUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--unc-blue)] text-white hover:opacity-90 transition-opacity">
                PDF
              </a>
            )}
            {pub.doi && (
              <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: 'var(--badge-bg)', color: 'var(--badge-text)' }}>
                DOI
              </a>
            )}
            {pub.semanticScholarId && (
              <a href={`https://www.semanticscholar.org/paper/${pub.semanticScholarId}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: 'var(--badge-bg)', color: 'var(--badge-text)' }}>
                Semantic Scholar
              </a>
            )}
          </div>
        </section>

        {/* Tags */}
        {pub.tags.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>Tags</h2>
            <div className="flex flex-wrap gap-2">
              {pub.tags.filter(t => !/^\d{4}$/.test(t)).map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>
          </section>
        )}

        {/* BibTeX */}
        {pub.bibtex && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>BibTeX</h2>
              <CopyBibtexButton bibtex={pub.bibtex} />
            </div>
            <pre className="p-4 rounded-lg text-xs overflow-x-auto" style={{ background: 'var(--code-bg)', color: 'var(--text-secondary)' }}>
              {pub.bibtex}
            </pre>
          </section>
        )}
      </div>
    </div>
  );
}
