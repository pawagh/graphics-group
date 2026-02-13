'use client'
import '../animations.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import pastResearchProjects from '@/data/past-research.json';
import type { PastResearchProject } from '@/types/data';
import type { Publication } from '@/lib/publications';

export default function PastResearch() {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    fetch('/api/publications')
      .then((r) => r.ok ? r.json() : [])
      .then(setPublications)
      .catch(() => {});
  }, []);
  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero banner section */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <Image
          src="/lab-photos/lab-work-15.jpg"
          alt="Past research projects"
          fill
          className="object-cover object-center rounded-b-lg shadow-md"
        />
      </div>

      {/* Page banner */}
      <div className="w-full bg-campus-sandstone backdrop-blur-sm py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-dome-copper text-center mb-3">PAST RESEARCH</h2>
          <p className="text-md text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            The Graphics and Virtual Reality group has been around since 1978 at UNC Chapel Hill, under various names: Pixel-Planes, Tracker, Ultrasound, Office of the Future, as part of BeingThere Centre, and others.
            Our group has been interested in such a variety of topics over the years that we&apos;ve had many different names for our projects and web pages.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">

          {/* Disclaimer note */}
          <div className="bg-carolina-blue/10 border-l-4 border-carolina-blue rounded-r-lg p-4 max-w-4xl mx-auto">
            <p className="text-neutral-700 text-sm">
              This list is not exhaustive. See our{' '}
              <Link href="/publications" className="text-carolina-blue underline hover:text-unc-navy transition-colors duration-200">
                publications page
              </Link>{' '}
              for a complete list of research output.
            </p>
          </div>

          {/* Historical links */}
          <section className="section-card">
            <h2 className="section-title text-center">HISTORICAL WEB PAGES</h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {[
                { label: 'Office of the Future', href: 'http://www.cs.unc.edu/Research/ootf/' },
                { label: 'Ultrasound', href: 'http://www.cs.unc.edu/Research/us/' },
                { label: 'Pixel-Planes & PixelFlow', href: 'http://www.cs.unc.edu/~pxfl/' },
                { label: 'BeingThere Centre', href: 'https://beingthere.web.unc.edu/' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border border-neutral-200 rounded-lg px-4 py-2 text-sm font-medium text-carolina-blue hover:bg-carolina-blue hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {link.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </section>

          {/* Research Projects Grid */}
          <section className="section-card">
            <h2 className="section-title text-center">RESEARCH PROJECTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {pastResearchProjects.map((project, index) => (
                <div
                  key={project.slug}
                  className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group stagger-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-unc-navy mb-3 group-hover:text-carolina-blue transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    {publications.filter((p) => p.project === project.slug).length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-unc-navy uppercase tracking-wide mb-2">Linked publications</p>
                        <ul className="space-y-1">
                          {publications.filter((p) => p.project === project.slug).map((pub) => (
                            <li key={pub.slug}>
                              <Link href={`/publications/${pub.slug}`} className="text-carolina-blue text-sm hover:text-unc-navy hover:underline">
                                {pub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.externalLink && (
                      <a
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-carolina-blue text-sm font-medium hover:text-unc-navy transition-colors duration-200"
                      >
                        Learn more
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
