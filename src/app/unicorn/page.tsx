'use client';

import { useState, useEffect, useCallback } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Publication } from '@/lib/publications';

export default function UnicornProject() {
  const [publication, setPublication] = useState<Publication | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPublication = useCallback(async () => {
    try {
      const response = await fetch('/api/publications');
      if (response.ok) {
        const publications = await response.json();
        const pub = publications.find((p: Publication) => p.slug === 'unicorn');
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
  }, []);

  useEffect(() => {
    fetchPublication();
  }, [fetchPublication]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-carolina-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
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
            href="/" 
            className="inline-flex items-center text-white hover:text-dome-copper transition-colors duration-300 font-medium text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        {/* Project header */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
            {publication.title}
          </h1>
          <p className="text-base text-blue-100 mb-2 font-medium">{publication.authors}</p>
          <p className="text-sm text-blue-200 mb-4 italic">{publication.meta}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          
          {/* Project Description */}
          <section className="section-card">
            <h2 className="text-lg font-bold text-carolina-blue mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Project Overview
            </h2>
            <p className="text-neutral-700 leading-relaxed text-base">
              This is the Unicorn project page. Add your project details, description, and information here.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

