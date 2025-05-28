'use client'
import '../animations.css';
import Image from 'next/image';

export default function OpportunitiesPage() {
  const opportunities = [
    {
      title: "Graduate Student Positions",
      deadline: "Rolling applications",
      description: "PhD and MS positions available for motivated students interested in visual computing research. Full funding available for qualified candidates.",
      requirements: ["BS/MS in Computer Science or related field", "Research experience preferred", "Strong mathematical background", "Programming proficiency"],
      type: "Graduate"
    }
  ];

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

      {/* Join Us Philosophy - Orange translucent banner */}
      <div className="w-full bg-orange/20 backdrop-blur-sm border-t-4 border-orange py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-orange text-center mb-3">JOIN US</h2>
          <p className="text-md text-center text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            Interested in joining our lab? We offer diverse research opportunities for undergraduate and graduate students, 
            postdocs, and collaborators. Join us in pushing the boundaries of visual computing and augmented intelligence.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* Current openings */}
          <section className="section-card">
            <h2 className="section-title text-center">CURRENT OPENINGS</h2>
            <div className="grid gap-8 max-w-5xl mx-auto">
              {opportunities.map((opportunity, index) => (
                <div 
                  key={opportunity.title} 
                  className="card p-8 group hover-lift magnetic-hover enhanced-shadow transition-all duration-500 stagger-item"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-unc-navy mb-2 group-hover:text-carolina-blue transition-colors duration-300">
                            {opportunity.title}
                          </h3>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="px-4 py-2 bg-carolina-blue/10 text-carolina-blue text-sm font-semibold rounded-full border border-carolina-blue/20 group-hover:bg-carolina-blue group-hover:text-white transition-all duration-300">
                              {opportunity.type}
                            </span>
                            <span className="text-neutral-600 font-medium group-hover:text-neutral-700 transition-colors duration-300">
                              {opportunity.deadline}
                            </span>
                          </div>
                        </div>
                        {/* Floating type indicator */}
                        <div className="w-12 h-12 bg-carolina-blue rounded-full flex items-center justify-center group-hover:bg-unc-navy transition-colors duration-500 flex-shrink-0 ml-4">
                          <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2V8a2 2 0 00-2-2z" />
                          </svg>
                        </div>
                      </div>
                      
                      <p className="text-neutral-600 mb-6 leading-relaxed text-lg group-hover:text-neutral-700 transition-colors duration-300">
                        {opportunity.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-unc-navy mb-3 group-hover:text-carolina-blue transition-colors duration-300">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {opportunity.requirements.map((req, reqIndex) => (
                            <li 
                              key={reqIndex} 
                              className="flex items-start gap-3 text-neutral-600 group-hover:text-neutral-700 transition-colors duration-300"
                            >
                              <div className="w-2 h-2 bg-carolina-blue rounded-full mt-2 flex-shrink-0 group-hover:bg-unc-navy transition-colors duration-300" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="btn-primary spring-hover inline-flex items-center justify-center gap-2">
                          Apply Now
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                        <button className="btn-secondary spring-hover">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact section */}
          <section className="section-card">
            <h3 className="section-title text-center">Contact Information</h3>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg text-neutral-600 mb-6">
                Have questions about our research or opportunities? We&apos;d love to hear from you.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-carolina-blue rounded-full flex items-center justify-center mx-auto mb-3 hover:bg-orange transition-colors duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-unc-navy">Email</h4>
                  <a href="mailto:cpk@cs.unc.edu" className="link-hover">cpk@cs.unc.edu</a>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-carolina-blue rounded-full flex items-center justify-center mx-auto mb-3 hover:bg-orange transition-colors duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-unc-navy">Location</h4>
                  <p className="text-neutral-600">Department of Computer Science<br />UNC Chapel Hill</p>
                </div>
              </div>
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}
