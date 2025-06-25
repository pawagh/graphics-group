import { publications, Publication } from '../data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PublicationImage from '../../components/PublicationImage';

export default async function PublicationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const publication = publications.find((pub: Publication) => pub.slug === slug);

  if (!publication) {
    notFound();
  }

  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900 min-h-screen">
      {/* Hero section with gradient background */}
      <div className="relative bg-gradient-to-br from-unc-navy via-unc-navy to-unc-navy py-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Back navigation */}
        <div className="relative z-10 max-w-6xl mx-auto mb-6">
          <Link 
            href="/publications" 
            className="inline-flex items-center text-white hover:text-dome-copper transition-colors duration-300 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Publications
          </Link>
        </div>
        
        {/* Publication header */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                {publication.title}
              </h1>
              <p className="text-lg text-blue-100 mb-3 font-medium">{publication.authors}</p>
              <p className="text-base text-blue-200 mb-4 italic">{publication.meta}</p>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {publication.link && (
                  <a 
                    href={publication.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary bg-white text-carolina-blue hover:bg-dome-copper hover:text-white inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Full Publication
                  </a>
                )}
                <button className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20 inline-flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
            
            {/* Publication image */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-dome-copper/30 to-dome-copper/10 rounded-2xl transform rotate-3"></div>
                <PublicationImage 
                  src={publication.image} 
                  alt={publication.title} 
                  width={250}
                  height={250}
                  className="relative object-cover rounded-2xl shadow-2xl border-4 border-white/20 backdrop-blur transition-transform duration-500 hover:scale-105" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main content area */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              
              {/* Abstract/Description */}
              <section className="section-card">
                <h2 className="section-title flex items-center">
                  <svg className="w-6 h-6 mr-3 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Abstract
                </h2>
                <p className="text-neutral-700 leading-relaxed text-lg">
                  This groundbreaking research presents novel approaches and methodologies in the field of visual computing and augmented intelligence. 
                  The work demonstrates significant advances in computational techniques while addressing real-world applications and challenges 
                  in the intersection of computer vision, machine learning, and human-computer interaction.
                </p>
              </section>

              {/* Key Contributions */}
              <section className="section-card">
                <h2 className="section-title flex items-center">
                  <svg className="w-6 h-6 mr-3 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Contributions
                </h2>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-dome-copper rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Novel algorithmic approach that significantly improves performance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-dome-copper rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Comprehensive evaluation on multiple benchmark datasets</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-dome-copper rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Open-source implementation and reproducible results</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-dome-copper rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Real-world applications and use cases demonstration</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              
              {/* Citation - Moved to top */}
              <div className="section-card">
                <h3 className="section-title text-lg">Citation</h3>
                <div className="bg-neutral-50 p-3 rounded-lg border-l-4 border-unc-navy">
                  <pre className="text-xs text-neutral-700 font-mono whitespace-pre-wrap break-words overflow-x-auto">
{`@article{${publication.slug.replace(/-/g, '_')},
  title={${publication.title}},
  author={${publication.authors}},
  journal={${publication.meta}},
  year={2025}
}`}
                  </pre>
                </div>
                <button className="mt-2 text-sm text-carolina-blue hover:text-dome-copper transition-colors duration-300 font-medium">
                  Copy Citation
                </button>
              </div>
              
              {/* Publication Info */}
              <div className="section-card">
                <h3 className="section-title text-lg">Publication Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-neutral-600">Authors:</span>
                    <p className="text-neutral-800">{publication.authors}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-600">Published:</span>
                    <p className="text-neutral-800">{publication.meta}</p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="section-card">
                <h3 className="section-title text-lg">Resources</h3>
                <div className="space-y-3">
                  {publication.link && (
                    <a 
                      href={publication.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-dome-copper hover:bg-dome-copper-50 transition-all duration-300 group"
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-carolina-blue group-hover:text-dome-copper mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-4-8V2" />
                        </svg>
                        <span className="font-medium text-neutral-800 group-hover:text-dome-copper">PDF Download</span>
                      </div>
                    </a>
                  )}
                  <div className="block p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-dome-copper hover:bg-dome-copper-50 transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-carolina-blue group-hover:text-dome-copper mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <span className="font-medium text-neutral-800 group-hover:text-dome-copper">Source Code</span>
                    </div>
                  </div>
                  <div className="block p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-dome-copper hover:bg-dome-copper-50 transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-carolina-blue group-hover:text-dome-copper mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v12a1 1 0 001 1h8a1 1 0 001-1V7M7 7h10M7 7L5 5m2 2v12" />
                      </svg>
                      <span className="font-medium text-neutral-800 group-hover:text-dome-copper">Supplemental Material</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 