'use client'
import '../animations.css';
import Image from 'next/image';

export default function OpportunitiesPage() {
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
      <div className="w-full bg-campus-sandstone backdrop-blur-sm border-t-4 py-3 mb-8">
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
          
          {/* Current openings */}
          <section className="section-card">
            <h2 className="section-title text-center">CURRENT OPENINGS</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-neutral-100 rounded-lg p-8 border border-neutral-200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-unc-navy/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-carolina-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2V8a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-carolina-blue mb-3">No Current Openings</h3>
                <p className="text-neutral-600 leading-relaxed">
                  We don&apos;t have any open positions at the moment, but we&apos;re always interested in connecting with talented researchers. 
                  Please feel free to reach out if you&apos;re interested in future opportunities or potential collaborations.
        </p>
              </div>
            </div>
          </section>

          {/* Contact section */}
          <section className="section-card">
            <h3 className="section-title text-center">CONTACT INFORMATION</h3>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-neutral-600 mb-6">
                Have questions about our research or opportunities? We&apos;d love to hear from you.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-unc-navy rounded-full flex items-center justify-center mx-auto mb-3 hover:bg-dome-copper transition-colors duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-carolina-blue">Email</h4>
                  <a href="mailto:cpk@cs.unc.edu" className="link-hover">cpk@cs.unc.edu</a>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-unc-navy rounded-full flex items-center justify-center mx-auto mb-3 hover:bg-dome-copper transition-colors duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
          </div>
                  <h4 className="font-semibold text-carolina-blue">Location</h4>
                  <p className="text-neutral-600">Sitterson 205<br />UNC Chapel Hill</p>
          </div>
          </div>
          </div>
          </section>


        </div>
      </div>
    </div>
  );
}
