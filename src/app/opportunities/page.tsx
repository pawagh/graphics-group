'use client'
import '../animations.css';
import Image from 'next/image';
import { useState } from 'react';

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState('undergrad');
  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero banner section */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <Image 
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Career opportunities and growth" 
          fill
          className="object-cover object-center rounded-b-lg shadow-md" 
        />
      </div>

      {/* Join Us Philosophy - Dome Copper translucent banner */}
      <div className="w-full bg-campus-sandstone backdrop-blur-sm py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-dome-copper text-center mb-3">JOIN US</h2>
          <p className="text-md text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            Interested in joining our lab? We offer diverse research opportunities for undergraduate and graduate students, 
            postdocs, and collaborators. Join us in pushing the boundaries of VCAIL.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* Opportunities Tabs */}
          <section className="section-card">
            <h2 className="section-title text-center">OPPORTUNITIES</h2>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('undergrad')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                    activeTab === 'undergrad'
                      ? 'bg-carolina-blue text-white'
                      : 'text-neutral-600 hover:text-carolina-blue'
                  }`}
                >
                  Undergraduate
                </button>
                <button
                  onClick={() => setActiveTab('grad')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                    activeTab === 'grad'
                      ? 'bg-carolina-blue text-white'
                      : 'text-neutral-600 hover:text-carolina-blue'
                  }`}
                >
                  Graduate
                </button>
                <button
                  onClick={() => setActiveTab('postdoc')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                    activeTab === 'postdoc'
                      ? 'bg-carolina-blue text-white'
                      : 'text-neutral-600 hover:text-carolina-blue'
                  }`}
                >
                  Postdoc
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl mx-auto">
              {/* Undergraduate Tab */}
              {activeTab === 'undergrad' && (
                <div className="bg-white rounded-lg p-8 border border-neutral-200" style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-carolina-blue/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-carolina-blue mb-4 text-center">Undergraduate Research Opportunities</h3>
                  <div className="space-y-4 text-neutral-600 leading-relaxed">
                    <p>
                      We welcome motivated undergraduate students to join our research team and gain hands-on experience in visual computing and augmented intelligence.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-carolina-blue mb-2">Research Areas</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Computational Imaging</li>
                          <li>• Computer Vision</li>
                          <li>• AR/VR Systems</li>
                          <li>• Machine Learning</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-carolina-blue mb-2">What You&apos;ll Gain</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Research experience</li>
                          <li>• Technical skills</li>
                          <li>• Publication opportunities</li>
                          <li>• Graduate school preparation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Graduate Tab */}
              {activeTab === 'grad' && (
                <div className="bg-white rounded-lg p-8 border border-neutral-200" style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-carolina-blue/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-carolina-blue mb-4 text-center">Graduate Student Positions</h3>
                  <div className="space-y-4 text-neutral-600 leading-relaxed">
                    <p>
                      We are looking for exceptional graduate students (MS and PhD) to conduct cutting-edge research in visual computing and augmented intelligence.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-carolina-blue mb-2">PhD Focus Areas</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Novel imaging systems</li>
                          <li>• AR/VR optics</li>
                          <li>• Computational photography</li>
                          <li>• AI-driven vision systems</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-carolina-blue mb-2">Ideal Candidates</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Strong programming skills</li>
                          <li>• Mathematics/Physics background</li>
                          <li>• Research experience preferred</li>
                          <li>• Passion for innovation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Postdoc Tab */}
              {activeTab === 'postdoc' && (
                <div className="bg-white rounded-lg p-8 border border-neutral-200" style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-carolina-blue/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2V8a2 2 0 00-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-carolina-blue mb-4 text-center">Postdoctoral Research Positions</h3>
                  <div className="space-y-4 text-neutral-600 leading-relaxed">
                    <p>
                      We offer postdoctoral positions for researchers interested in pushing the boundaries of visual computing and developing next-generation augmented intelligence systems.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-carolina-blue mb-2">Research Opportunities</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Independent research projects</li>
                          <li>• Collaborative initiatives</li>
                          <li>• Industry partnerships</li>
                          <li>• Grant writing opportunities</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-carolina-blue mb-2">Requirements</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• PhD in related field</li>
                          <li>• Strong publication record</li>
                          <li>• Expertise in relevant areas</li>
                          <li>• Leadership potential</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
