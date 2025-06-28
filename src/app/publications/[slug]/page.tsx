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
              
              {/* Publication details in banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Citation */}
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                  <h3 className="text-sm font-semibold text-white mb-2">Citation</h3>
                  <div className="bg-black/20 p-2 rounded text-xs text-blue-100 font-mono">
                    <div className="truncate">{publication.slug.replace(/-/g, '_')}_2025</div>
                  </div>
                  <button className="mt-2 text-xs text-blue-200 hover:text-white transition-colors duration-300 font-medium">
                    Copy Citation
                  </button>
                </div>
                
                {/* Resources */}
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                  <h3 className="text-sm font-semibold text-white mb-2">Resources</h3>
                  <div className="space-y-1">
                    {publication.link && (
                      <a 
                        href={publication.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-xs text-blue-200 hover:text-white transition-colors duration-300"
                      >
                        • PDF Download
                      </a>
                    )}
                    <div className="text-xs text-blue-200 hover:text-white transition-colors duration-300 cursor-pointer">
                      • Source Code
                    </div>
                    <div className="text-xs text-blue-200 hover:text-white transition-colors duration-300 cursor-pointer">
                      • Supplemental
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  {publication.link && (
                    <a 
                      href={publication.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white text-carolina-blue hover:bg-dome-copper hover:text-white inline-flex items-center justify-center px-3 py-2 rounded-lg font-medium text-sm transition-colors duration-300"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Publication
                    </a>
                  )}
                  <button className="bg-white/10 text-white border border-white/30 hover:bg-white/20 inline-flex items-center justify-center px-3 py-2 rounded-lg font-medium text-sm transition-colors duration-300">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
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

          {/* Full Citation - Expanded version */}
          <section className="section-card">
            <h2 className="text-lg font-bold text-carolina-blue mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Citation
            </h2>
            <div className="bg-neutral-50 p-4 rounded-lg border-l-4 border-unc-navy">
              <pre className="text-xs text-neutral-700 font-mono whitespace-pre-wrap break-words overflow-x-auto">
{`@article{${publication.slug.replace(/-/g, '_')},
  title={${publication.title}},
  author={${publication.authors}},
  journal={${publication.meta}},
  year={2025}
}`}
              </pre>
            </div>
            <button className="mt-3 text-sm text-carolina-blue hover:text-dome-copper transition-colors duration-300 font-medium">
              Copy Citation
            </button>
          </section>
        </div>
      </div>
    </div>
  );
} 