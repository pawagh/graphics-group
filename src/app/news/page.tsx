'use client'
import '../animations.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Publication } from '@/lib/publications';

export default function News() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  // Get the latest 6 publications for news
  const latestPublications = publications.slice(0, 6);

  // Extract categories for filtering
  const categories = ['All', ...Array.from(new Set(publications.flatMap(pub => pub.tags.filter(tag => ['Conference', 'Journal', 'Workshop'].includes(tag)))))];

  const filteredNews = selectedCategory === 'All' 
    ? latestPublications 
    : latestPublications.filter(pub => pub.tags.includes(selectedCategory));

  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero banner section */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <Image 
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Latest research news and updates" 
          fill
          className="object-cover object-center rounded-b-lg shadow-md" 
        />
      </div>

      {/* News Philosophy - Dome Copper translucent banner */}
      <div className="w-full bg-campus-sandstone backdrop-blur-sm py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-dome-copper text-center mb-3">LATEST NEWS</h2>
          <p className="text-md text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            Stay up to date with our latest research breakthroughs, publications, awards, and lab updates. 
            Discover the cutting-edge work happening at VCAIL.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* News Filter Section */}
          <section className="section-card">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <h2 className="section-title">RECENT UPDATES</h2>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-carolina-blue text-white'
                        : 'bg-white text-carolina-blue border border-carolina-blue hover:bg-carolina-blue hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-carolina-blue"></div>
              </div>
            )}

            {/* News Grid */}
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((publication, index) => (
                  <div 
                    key={publication.slug} 
                    className={`group transition-all duration-300 stagger-item bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-2xl transform hover:-translate-y-2 unc-shadow-hover ${
                      publication.meta.toLowerCase().includes('best paper') || 
                      publication.meta.toLowerCase().includes('award') || 
                      publication.meta.toLowerCase().includes('honorable mention')
                        ? 'border-dome-copper bg-campus-sandstone'
                        : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Publication Image */}
                    {publication.image && (
                      <div className="w-full h-40 relative mb-4 overflow-hidden rounded-lg">
                        <Image 
                          src={publication.image} 
                          alt={publication.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Award Badge */}
                    {(publication.meta.toLowerCase().includes('best paper') || 
                      publication.meta.toLowerCase().includes('award') || 
                      publication.meta.toLowerCase().includes('honorable mention')) && (
                      <div className="inline-flex items-center gap-1 bg-dome-copper text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Award Winner
                      </div>
                    )}

                    {/* Publication Title */}
                    <h3 className="text-lg font-semibold text-carolina-blue mb-3 line-clamp-2 group-hover:text-unc-navy transition-colors duration-300">
                      {publication.title}
                    </h3>

                    {/* Publication Meta */}
                    <p className="text-sm text-neutral-600 mb-2 font-medium">
                      {publication.meta}
                    </p>

                    {/* Authors */}
                    <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                      {publication.authors}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {publication.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-carolina-blue/10 text-carolina-blue text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-neutral-200">
                      <Link
                        href={`/publications/${publication.slug}`}
                        className="flex-1 text-center bg-carolina-blue text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-unc-navy"
                      >
                        Read More
                      </Link>
                      {publication.link && (
                        <a
                          href={publication.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-carolina-blue border border-carolina-blue px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-carolina-blue hover:text-white"
                        >
                          Paper
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && filteredNews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 mb-4">No news found for the selected category.</p>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="bg-carolina-blue text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-unc-navy"
                >
                  View All News
                </button>
              </div>
            )}

            {/* View All Publications Link */}
            <div className="text-center mt-12 pt-8 border-t border-neutral-200">
              <Link
                href="/publications"
                className="inline-flex items-center gap-2 bg-white text-carolina-blue border-2 border-carolina-blue font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-unc-navy hover:text-white hover:border-unc-navy"
              >
                View All Publications
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
