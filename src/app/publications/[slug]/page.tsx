'use client';

import { useState, useEffect, useCallback } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PublicationImage from '../../components/PublicationImage';
import { Publication } from '@/lib/publications';

export default function PublicationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const [publication, setPublication] = useState<Publication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getParams();
  }, [params]);

  const fetchPublication = useCallback(async () => {
    try {
      const response = await fetch(`/api/publications`);
      if (response.ok) {
        const publications = await response.json();
        const pub = publications.find((p: Publication) => p.slug === slug);
        if (pub) {
          setPublication(pub);
        } else {
          notFound();
        }
      }
    } catch (error) {
      console.error('Error fetching publication:', error);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchPublication();
    }
  }, [slug, fetchPublication]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-carolina-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading publication...</p>
        </div>
      </div>
    );
  }

  if (!publication) {
    notFound();
  }

  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900 min-h-screen">
      {/* Hero section with gradient background */}
      <div className="relative bg-gradient-to-br from-unc-navy via-unc-navy to-unc-navy py-6 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Back navigation */}
        <div className="relative z-10 max-w-6xl mx-auto mb-4">
          <Link 
            href="/publications" 
            className="inline-flex items-center text-white hover:text-dome-copper transition-colors duration-300 font-medium text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Publications
          </Link>
        </div>
        
        {/* Publication header */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main title and info */}
            <div className="lg:col-span-3">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                {publication.title}
              </h1>
              <p className="text-base text-blue-100 mb-2 font-medium">{publication.authors}</p>
              <p className="text-sm text-blue-200 mb-4 italic">{publication.meta}</p>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                {/* Paper button */}
                {publication.link && (
                  <a 
                    href={publication.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white text-carolina-blue hover:bg-dome-copper hover:text-white inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-300 shadow-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Paper
                  </a>
                )}
                
                {/* Supplemental button */}
                <button className="bg-white/10 text-white border border-white/30 hover:bg-white/20 inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-300 shadow-lg">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Suppl
                </button>
                
                {/* Code button */}
                <button className="bg-white/10 text-white border border-white/30 hover:bg-white/20 inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-300 shadow-lg">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Code
                </button>
                
                {/* BibTeX button */}
                <button 
                  className="bg-white/10 text-white border border-white/30 hover:bg-white/20 inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-300 shadow-lg"
                  onClick={() => {
                    const citation = `@article{${publication.slug.replace(/-/g, '_')},
  title={${publication.title}},
  author={${publication.authors}},
  journal={${publication.meta}},
  year={2025}
}`;
                    navigator.clipboard.writeText(citation);
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Bib
                </button>
              </div>
            </div>
            
            {/* Publication image */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-dome-copper/30 to-dome-copper/10 rounded-xl transform rotate-2"></div>
                <PublicationImage 
                  src={publication.image} 
                  alt={publication.title} 
                  width={180}
                  height={180}
                  className="relative object-cover rounded-xl shadow-xl border-3 border-white/20 backdrop-blur transition-transform duration-500 hover:scale-105" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - Full width */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          
          {/* Abstract/Description */}
          <section className="section-card">
            <h2 className="text-lg font-bold text-carolina-blue mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Abstract
            </h2>
            <p className="text-neutral-700 leading-relaxed text-base">
              This groundbreaking research presents novel approaches and methodologies in the field of visual computing and augmented intelligence. 
              The work demonstrates significant advances in computational techniques while addressing real-world applications and challenges 
              in the intersection of computer vision, machine learning, and human-computer interaction.
            </p>
          </section>

          {/* Key Contributions */}
          <section className="section-card">
            <h2 className="text-lg font-bold text-carolina-blue mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Contributions
            </h2>
            <ul className="space-y-2 text-neutral-700 text-sm">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-dome-copper rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <span>Novel algorithmic approach that significantly improves performance metrics</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-dome-copper rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <span>Comprehensive evaluation on multiple benchmark datasets</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-dome-copper rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <span>Open-source implementation and reproducible results</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-dome-copper rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <span>Real-world applications and use cases demonstration</span>
              </li>
            </ul>
          </section>


        </div>
      </div>
    </div>
  );
} 