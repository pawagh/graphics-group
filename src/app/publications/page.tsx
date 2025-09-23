'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '../animations.css';
import Link from 'next/link';
import { Publication } from '@/lib/publications';

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await fetch('/api/publications');
      if (response.ok) {
        const data = await response.json();
        setPublications(data);
      }
    } catch (error) {
      console.error('Error fetching publications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract years and tags - simplified categories
  const years = Array.from(
    new Set(publications.flatMap(pub => pub.tags.filter(tag => /^\d{4}$/.test(tag))))
  ).sort((a, b) => b.localeCompare(a));

  // Simplified categories - only keep main research areas
  const mainCategories = ['Conference', 'Journal', 'Workshop', 'ArXiv'];
  const allTags = Array.from(
    new Set(publications.flatMap(pub => pub.tags.filter(tag => 
      !(/^\d{4}$/.test(tag)) && mainCategories.includes(tag)
    )))
  );

  // Add Award Winning Papers as a special category
  const specialCategories = ['Award Winning Papers'];

  const filteredPubs = publications.filter(pub => {
    let matchesTag;
    
    if (selectedTag === 'All') {
      matchesTag = true;
    } else if (selectedTag === 'Award Winning Papers') {
      // Check if publication has awards in meta field
      const metaLower = pub.meta.toLowerCase();
      matchesTag = metaLower.includes('best paper') || 
                   metaLower.includes('award') || 
                   metaLower.includes('honorable mention');
    } else {
      matchesTag = pub.tags.includes(selectedTag);
    }
    
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-carolina-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading publications...</p>
        </div>
      </div>
    );
  }

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

      {/* Publications Philosophy - Campus Sandstone translucent banner */}
      <div className="w-full bg-campus-sandstone backdrop-blur-sm py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-dome-copper text-center mb-3">PUBLICATIONS</h2>
          <p className="text-md text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            Explore our cutting-edge research in visual computing and augmented intelligence. 
            Our publications span computational imaging, computer vision, AR/VR, nano-optics, and machine learning.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-neutral-700 mb-2">
                Search Publications
              </label>
              <input
                id="search"
                type="text"
                placeholder={`Showing ${filteredPubs.length} publications — search by author, title, venue, or keywords`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-0 focus:border-neutral-300 transition-all duration-300 bg-transparent"
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
                className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unc-navy focus:border-transparent transition-all duration-300 bg-transparent"
              >
                <option value="All">All Categories</option>
                {specialCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Publications by year */}
          <div className="space-y-12">
            {pubsByYear.map(({ year, pubs }) =>
              pubs.length > 0 ? (
                <section key={year} className="section-card">
                  <h2 className="text-3xl font-bold text-carolina-blue mb-8 border-b-2 border-carolina-blue pb-4">
                    {year}
                  </h2>
                  <div className="grid gap-4">
                    {pubs.map((pub, idx) => (
                                              <div 
                          key={pub.title + idx}
                          className={`group transition-all duration-300 stagger-item mb-2 border border-neutral-200 rounded-lg p-6 md:cursor-pointer transform hover:-translate-y-3 unc-shadow-hover ${
                            pub.meta.toLowerCase().includes('best paper') || 
                            pub.meta.toLowerCase().includes('award') || 
                            pub.meta.toLowerCase().includes('honorable mention')
                              ? 'bg-campus-sandstone border-dome-copper'
                              : 'bg-white'
                          }`}
                          style={{
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            animationDelay: `${idx * 0.1}s`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 20px 20px -10px rgba(0, 0, 0, 0.15)';
                            const isAward = pub.meta.toLowerCase().includes('best paper') || 
                                          pub.meta.toLowerCase().includes('award') || 
                                          pub.meta.toLowerCase().includes('honorable mention');
                            e.currentTarget.style.backgroundColor = isAward ? '#F4E8DD' : '#f8fafc';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
                            const isAward = pub.meta.toLowerCase().includes('best paper') || 
                                          pub.meta.toLowerCase().includes('award') || 
                                          pub.meta.toLowerCase().includes('honorable mention');
                            e.currentTarget.style.backgroundColor = isAward ? '#F4E8DD' : '#ffffff';
                          }}
                        onClick={() => {
                          // Only make div clickable on desktop (md and up)
                          if (window.innerWidth >= 768) {
                            window.location.href = `/publications/${pub.slug}`;
                          }
                        }}
                      >
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-shrink-0 relative">
                            <div className="relative overflow-hidden rounded-lg border-2 border-dome-copper/20 transition-colors duration-500">
                              <Image 
                                src={pub.image && pub.image.trim() !== "" ? pub.image : "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"} 
                                alt={pub.title} 
                                width={128}
                                height={128}
                                className="object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105" 
                                onError={(e) => {
                                  console.log(`Failed to load image for ${pub.title}:`, pub.image);
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80";
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-carolina-blue mb-3 transition-colors duration-300 leading-tight">
                              {pub.title}
                            </h3>
                            <p className="mb-2 transition-colors duration-300 font-medium text-neutral-600">
                              {pub.authors}
                            </p>
                            <div className="font-semibold mb-4 transition-colors duration-300">
                              {pub.meta.split(',').map((part, index) => {
                                const trimmedPart = part.trim();
                                const isAwardPart = trimmedPart.toLowerCase().includes('best paper') || 
                                                   trimmedPart.toLowerCase().includes('award') || 
                                                   trimmedPart.toLowerCase().includes('honorable mention');
                                const isAwardPaper = pub.meta.toLowerCase().includes('best paper') || 
                                                    pub.meta.toLowerCase().includes('award') || 
                                                    pub.meta.toLowerCase().includes('honorable mention');
                                
                                return (
                                  <div 
                                    key={index} 
                                    className={`leading-tight ${index > 0 ? 'mt-1' : ''} ${
                                      isAwardPaper && isAwardPart 
                                        ? 'text-carolina-blue group-hover:text-azalea-pink'
                                        : isAwardPaper 
                                          ? 'text-carolina-blue group-hover:text-carolina-blue'
                                          : 'text-carolina-blue group-hover:text-dome-copper'
                                    }`}
                                  >
                                    {trimmedPart}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex flex-col gap-3 md:hidden">
                              <Link 
                                href={`/publications/${pub.slug}`}
                                className="bg-carolina-blue text-white px-4 py-2 rounded-lg font-medium text-center transition-colors duration-300 hover:bg-unc-navy"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View Details
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