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
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero banner section */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <img 
          src="/publications_banner.jpg" 
          alt="Publications and Research Banner" 
          className="w-full h-full object-cover object-center rounded-b-lg shadow-md" 
        />
        <div className="absolute inset-0 bg-carolina-blue bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Publications</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* Introduction section */}
          <section className="section-card">
            <h2 className="section-title text-center">PUBLICATIONS</h2>
            <p className="text-lg text-center text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Explore our cutting-edge research in visual computing and augmented intelligence. 
              Our publications span computational imaging, computer vision, AR/VR, nano-optics, and machine learning.
            </p>
          </section>

          {/* Search and filter section */}
          <section className="section-card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-neutral-700 mb-2">
                  Search Publications
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by title, author, or venue..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-carolina-blue focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Tag Filter */}
              <div className="md:w-1/4">
                <label htmlFor="tag-filter" className="block text-sm font-medium text-neutral-700 mb-2">
                  Filter by Category
                </label>
                <select
                  id="tag-filter"
                  value={selectedTag}
                  onChange={e => setSelectedTag(e.target.value)}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-carolina-blue focus:border-transparent transition-all duration-300"
                >
                  <option value="All">All Categories</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-center">
              <p className="text-neutral-600">
                Showing <span className="font-semibold text-carolina-blue">{filteredPubs.length}</span> publications
              </p>
            </div>
          </section>

          {/* Publications by year */}
          <div className="space-y-12">
            {pubsByYear.map(({ year, pubs }) =>
              pubs.length > 0 ? (
                <section key={year} className="section-card">
                  <h2 className="text-3xl font-bold text-unc-navy mb-8 border-b-2 border-carolina-blue pb-4">
                    {year}
                  </h2>
                  <div className="grid gap-8">
                    {pubs.map((pub, idx) => (
                      <div 
                        key={pub.title + idx} 
                        className="card p-6 group hover:shadow-card-hover transition-all duration-300"
                      >
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-shrink-0">
                            <img 
                              src={pub.image} 
                              alt={pub.title} 
                              className="w-32 h-32 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105" 
                            />
                          </div>
                          <div className="flex-1">
                            <Link 
                              href={`/publications/${pub.slug}`} 
                              className="group"
                            >
                              <h3 className="text-xl font-bold mb-3 text-carolina-blue group-hover:text-orange transition-colors duration-300 leading-tight">
                                {pub.title}
                              </h3>
                            </Link>
                            <p className="text-neutral-700 mb-2 font-medium">{pub.authors}</p>
                            <p className="text-neutral-600 mb-4 italic">{pub.meta}</p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {pub.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="bg-carolina-blue text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-orange transition-colors duration-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            {/* Links */}
                            <div className="flex flex-wrap gap-4">
                              <Link 
                                href={`/publications/${pub.slug}`}
                                className="link-hover font-semibold inline-flex items-center"
                              >
                                Read More
                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </Link>
                              {pub.link && (
                                <Link 
                                  href={pub.link} 
                                  target="_blank"
                                  rel="noopener noreferrer" 
                                  className="link-hover font-semibold inline-flex items-center"
                                >
                                  View Publication
                                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null
            )}
          </div>

          {/* Research impact section */}
          <section className="section-card">
            <h3 className="section-title text-center">Research Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-carolina-blue rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-orange transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-unc-navy mb-2">Award-Winning Research</h4>
                <p className="text-neutral-600">Multiple best paper awards and conference highlights.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-carolina-blue rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-orange transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-unc-navy mb-2">Cutting-Edge Innovation</h4>
                <p className="text-neutral-600">Pioneering advances in computational imaging and AI.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-carolina-blue rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-orange transition-colors duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-unc-navy mb-2">Global Collaboration</h4>
                <p className="text-neutral-600">International partnerships and cross-disciplinary research.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}