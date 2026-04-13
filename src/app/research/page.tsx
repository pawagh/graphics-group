import Link from 'next/link';
import Image from 'next/image';
import { getResearch } from '@/lib/data';
import type { ResearchProject } from '@/lib/types';

function ResearchCard({ project, faded }: { project: ResearchProject; faded?: boolean }) {
  return (
    <Link
      href={`/research/${project.id}`}
      className={`card block hover:border-[var(--unc-blue)] transition-colors overflow-hidden ${faded ? 'opacity-80' : ''}`}
    >
      {project.imagePath && (
        <div className="relative w-full h-40 bg-[var(--bg-secondary)]">
          <Image
            src={project.imagePath}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className={`font-semibold mb-2 ${project.imagePath ? '' : 'text-lg'}`} style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="text-sm line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map(tag => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function ResearchPage() {
  const projects = getResearch();
  const current = projects.filter(p => p.active);
  const past = projects.filter(p => !p.active);

  return (
    <div>
      <div className="page-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1>Research</h1>
          <p>{current.length} active projects, {past.length} past projects</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Current Research */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Current Research</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.map(project => (
              <ResearchCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Past Research */}
        {past.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Past Research</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map(project => (
                <ResearchCard key={project.id} project={project} faded />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
