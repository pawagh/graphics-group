'use client'

import { publications } from './data';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <Image 
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Research and academic publications" 
          fill
          className="object-cover object-center rounded-b-lg shadow-md" 
        />
      </div>

      {/* Publications Philosophy - Orange translucent banner */}
      <div className="w-full bg-orange/20 backdrop-blur-sm border-t-4 border-orange py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-orange text-center mb-3">PUBLICATIONS</h2>
          <p className="text-md text-center text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            Explore our cutting-edge research in visual computing and augmented intelligence. 
            Our publications span computational imaging, computer vision, AR/VR, nano-optics, and machine learning.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
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
                        className="card p-6 group hover-lift magnetic-hover enhanced-shadow transition-all duration-500 stagger-item"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-shrink-0 relative">
                            <div className="relative overflow-hidden rounded-lg border-2 border-carolina-blue/20 group-hover:border-carolina-blue transition-colors duration-500">
                              <Image 
                                src={pub.image} 
                                alt={pub.title} 
                                width={128}
                                height={128}
                                className="object-cover rounded-lg shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-1" 
                              />
                              {/* Subtle overlay on hover */}
                              <div className="absolute inset-0 bg-carolina-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                            </div>
                            {/* Floating publication type badge */}
                            <div className="absolute -top-2 -left-2 bg-unc-navy text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                              {pub.tags[0]}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-unc-navy mb-3 group-hover:text-carolina-blue transition-colors duration-300 leading-tight">
                              {pub.title}
                            </h3>
                            <p className="text-neutral-600 mb-2 group-hover:text-neutral-700 transition-colors duration-300 font-medium">
                              {pub.authors}
                            </p>
                            <p className="text-carolina-blue font-semibold mb-4 group-hover:text-unc-navy transition-colors duration-300">
                              {pub.meta}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {pub.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="px-3 py-1 bg-carolina-blue/10 text-carolina-blue text-sm rounded-full border border-carolina-blue/20 group-hover:bg-carolina-blue group-hover:text-white transition-all duration-300 spring-hover"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-4">
                              <a 
                                href={pub.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="link-hover font-semibold spring-hover flex items-center gap-2"
                              >
                                Read Paper
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                              <Link 
                                href={`/publications/${pub.slug}`} 
                                className="text-neutral-600 hover:text-carolina-blue transition-colors duration-300 font-medium spring-hover flex items-center gap-2"
                              >
                                View Details
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
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

        </div>
      </div>
    </div>
  );
}