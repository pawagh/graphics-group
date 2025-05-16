'use client'

import { publications } from './data';
import React, { useState } from 'react';
import Link from 'next/link';
import '../animations.css';

export default function Publications() {
  // Extract years and tags
  const years = Array.from(
    new Set(publications.flatMap(pub => pub.tags.filter(tag => /^\d{4}$/.test(tag))))
  ).sort((a, b) => b.localeCompare(a));
  const allTags = Array.from(
    new Set(publications.flatMap(pub => pub.tags.filter(tag => !/^\d{4}$/.test(tag))))
  );

  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filteredPubs = publications.filter(pub => {
    const matchesTag = selectedTag === 'All' || pub.tags.includes(selectedTag);
    const matchesSearch =
      pub.title.toLowerCase().includes(search.toLowerCase()) ||
      pub.authors.toLowerCase().includes(search.toLowerCase()) ||
      pub.meta.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const pubsByYear = years.map(year => ({
    year,
    pubs: filteredPubs.filter(pub => pub.tags.includes(year)),
  }));

  return (
    <div className="fade-in min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Banner */}
      <div className="w-full h-64 md:h-80 relative">
        <img src="/publications_banner.jpg" alt="Publications Banner" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Publications</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl w-full mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search publications..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-carolina w-full md:w-1/2"
          />

          {/* Tag Dropdown */}
          <select
            value={selectedTag}
            onChange={e => setSelectedTag(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-carolina w-full md:w-1/4"
          >
            <option value="All">All</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Publications grouped by year */}
        {pubsByYear.map(({ year, pubs }) =>
          pubs.length > 0 ? (
            <div key={year}>
              <h2 className="text-2xl font-bold mt-12 mb-6 text-carolina border-b-2 border-carolina pb-2">{year}</h2>
              <div className="grid gap-8">
                {pubs.map((pub, idx) => (
                  <div key={pub.title + idx} className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6 items-center transition hover:shadow-lg">
                    <img src={pub.image} alt={pub.title} className="w-32 h-32 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">
                        <Link href={`/publications/${pub.slug}`} className="text-carolina underline">
                          {pub.title}
                        </Link>
                      </h3>
                      <p className="text-gray-700 mb-1">{pub.authors}</p>
                      <p className="text-gray-500 mb-2">{pub.meta}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {pub.tags.map(tag => (
                          <span key={tag} className="bg-carolina text-white px-2 py-1 rounded text-xs">{tag}</span>
                        ))}
                      </div>
                      {pub.link && (
                        <Link href={pub.link} target="_blank" className="text-carolina underline font-semibold">
                          View Publication
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}