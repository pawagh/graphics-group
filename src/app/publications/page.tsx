'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Publication } from '@/lib/types';

// Data is fetched at build time and embedded via the client boundary
import publicationsData from '../../../data/publications.json';

const publications: Publication[] = publicationsData as Publication[];

// Sort by year desc
const sorted = [...publications].sort((a, b) => b.year - a.year);

// Extract unique years and category tags
const years = [...new Set(sorted.map(p => p.year))].sort((a, b) => b - a);
const categories = ['Conference', 'Journal', 'Workshop', 'ArXiv', 'Dissertation'];

function hasAward(pub: Publication): boolean {
  return !!(pub.award && pub.award.length > 0);
}

export default function PublicationsPage() {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = sorted;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.authors.some(a => a.toLowerCase().includes(q)) ||
        p.venue.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (yearFilter) {
      result = result.filter(p => p.year === yearFilter);
    }
    if (categoryFilter) {
      result = result.filter(p => p.tags.some(t => t.toLowerCase() === categoryFilter.toLowerCase()));
    }
    return result;
  }, [search, yearFilter, categoryFilter]);

  // Group by year
  const grouped: Record<number, Publication[]> = {};
  for (const pub of filtered) {
    if (!grouped[pub.year]) grouped[pub.year] = [];
    grouped[pub.year].push(pub);
  }
  const groupedYears = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  return (
    <div>
      <div className="page-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1>Publications</h1>
          <p>{publications.length} papers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <input
            type="text"
            placeholder="Search papers, authors, venues..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg text-sm flex-1 min-w-[200px]"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          />
          <select
            value={yearFilter ?? ''}
            onChange={e => setYearFilter(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-2 rounded-lg text-sm"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            <option value="">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select
            value={categoryFilter ?? ''}
            onChange={e => setCategoryFilter(e.target.value || null)}
            className="px-3 py-2 rounded-lg text-sm"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {(search || yearFilter || categoryFilter) && (
            <button
              onClick={() => { setSearch(''); setYearFilter(null); setCategoryFilter(null); }}
              className="px-3 py-2 rounded-lg text-sm text-[var(--unc-blue)] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Showing {filtered.length} of {publications.length} publications
        </p>

        {/* Publication list grouped by year */}
        {groupedYears.map(year => (
          <section key={year} className="mb-10">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
              {year}
            </h2>
            <div className="space-y-4">
              {grouped[year].map(pub => (
                <Link
                  key={pub.id}
                  href={`/publications/${pub.id}`}
                  className={`card p-5 block hover:border-[var(--unc-blue)] transition-colors ${hasAward(pub) ? 'award-highlight' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {pub.imagePath && (
                      <div className="flex-shrink-0 w-full sm:w-32 h-24 relative rounded overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                        <Image
                          src={pub.imagePath}
                          alt={pub.title}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {pub.title}
                      </h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                        {pub.authors.length > 5
                          ? pub.authors.slice(0, 5).join(', ') + ' et al.'
                          : pub.authors.join(', ')}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="badge">{pub.venue}</span>
                        {pub.tags.filter(t => !/^\d{4}$/.test(t) && t.toLowerCase() !== 'award').map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-muted)',
                          }}>
                            {tag}
                          </span>
                        ))}
                        {hasAward(pub) && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">
                            {pub.award}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <p className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
            No publications match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
