'use client'
import '../animations.css';

export default function OpportunitiesPage() {
  const opportunities = [
    {
      title: "Undergraduate Research Opportunities",
      deadline: "Applications due: May 1, 2025",
      description: "Open to undergraduate students in computer science, engineering, or related fields. Interns will work on hands-on research in computational imaging, computer vision, or AR/VR systems.",
      requirements: ["Junior or Senior standing", "Strong programming skills", "GPA > 3.0", "Interest in visual computing"],
      type: "Undergraduate"
    },
    {
      title: "Graduate Student Positions",
      deadline: "Rolling applications",
      description: "PhD and MS positions available for motivated students interested in visual computing research. Full funding available for qualified candidates.",
      requirements: ["BS/MS in Computer Science or related field", "Research experience preferred", "Strong mathematical background", "Programming proficiency"],
      type: "Graduate"
    },
    {
      title: "Postdoctoral Research Associate",
      deadline: "Applications accepted year-round",
      description: "Seeking postdocs with expertise in computational imaging, computer vision, or AR/VR. Opportunity to lead independent research projects.",
      requirements: ["PhD in relevant field", "Strong publication record", "Independent research experience", "Collaboration skills"],
      type: "Postdoc"
    },
    {
      title: "Independent Study",
      deadline: "Contact before semester starts",
      description: "Work with our faculty on ongoing research as part of a for-credit independent study. Perfect for UNC students seeking research experience.",
      requirements: ["UNC student", "Completed data science or computer vision course", "Available 10+ hours/week", "Academic advisor approval"],
      type: "Independent Study"
    }
  ];

  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero banner section */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <img 
          src="/opportunities_banner.jpg" 
          alt="Opportunities and Careers Banner" 
          className="w-full h-full object-cover object-center rounded-b-lg shadow-md" 
        />
        <div className="absolute inset-0 bg-carolina-blue bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Opportunities</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* Introduction section */}
          <section className="section-card">
            <h2 className="section-title text-center">JOIN US</h2>
            <p className="text-lg text-center text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Interested in joining our lab? We offer diverse research opportunities for undergraduate and graduate students, 
              postdocs, and collaborators. Join us in pushing the boundaries of visual computing and augmented intelligence.
            </p>
          </section>

          {/* Current openings */}
          <section className="section-card">
            <h3 className="section-title">Current Openings</h3>
            <div className="grid gap-8">
              {opportunities.map((opportunity, index) => (
                <div 
                  key={opportunity.title} 
                  className="card p-6 group hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-xl font-bold text-carolina-blue group-hover:text-orange transition-colors duration-300">
                          {opportunity.title}
                        </h4>
                        <span className="bg-carolina-blue text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-orange transition-colors duration-300">
                          {opportunity.type}
                        </span>
                      </div>
                      
                      <p className="text-sm text-unc-navy font-medium mb-3">{opportunity.deadline}</p>
                      <p className="text-neutral-700 leading-relaxed mb-4">{opportunity.description}</p>
                      
                      <div>
                        <h5 className="text-sm font-semibold text-unc-navy mb-2">Requirements:</h5>
                        <ul className="list-disc list-inside text-neutral-600 space-y-1">
                          {opportunity.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="hover:text-orange transition-colors duration-300">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <a 
                        href="mailto:cpk@cs.unc.edu?subject=Application for Visual Computing Lab"
                        className="btn-primary inline-flex items-center justify-center"
                      >
                        Apply Now
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Application process */}
          <section className="section-card">
            <h3 className="section-title">Application Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-unc-navy mb-4">What to Include</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-carolina-blue rounded-full mt-2 hover:bg-orange transition-colors duration-300"></div>
                    <span className="text-neutral-700">CV or Resume</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-carolina-blue rounded-full mt-2 hover:bg-orange transition-colors duration-300"></div>
                    <span className="text-neutral-700">Brief statement of interest (1-2 paragraphs)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-carolina-blue rounded-full mt-2 hover:bg-orange transition-colors duration-300"></div>
                    <span className="text-neutral-700">Transcripts (for students)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-carolina-blue rounded-full mt-2 hover:bg-orange transition-colors duration-300"></div>
                    <span className="text-neutral-700">Portfolio or code samples (if available)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-unc-navy mb-4">Next Steps</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-carolina-blue text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-orange transition-colors duration-300">1</div>
                    <span className="text-neutral-700">Submit application via email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-carolina-blue text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-orange transition-colors duration-300">2</div>
                    <span className="text-neutral-700">Initial review (1-2 weeks)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-carolina-blue text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-orange transition-colors duration-300">3</div>
                    <span className="text-neutral-700">Interview with lab members</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-carolina-blue text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-orange transition-colors duration-300">4</div>
                    <span className="text-neutral-700">Final decision and onboarding</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact section */}
          <section className="section-card">
            <h3 className="section-title text-center">Contact Information</h3>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg text-neutral-600 mb-6">
                Have questions about our research or opportunities? We'd love to hear from you.
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

          {/* Call to action */}
          <section className="text-center py-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-unc-navy mb-6">Ready to Join Our Team?</h2>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Take the first step towards advancing the future of visual computing and augmented intelligence. 
                We're excited to welcome passionate researchers to our lab.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:cpk@cs.unc.edu?subject=Interest in Visual Computing Lab" className="btn-primary inline-flex items-center justify-center">
                  Contact Us
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a href="/people" className="btn-secondary inline-flex items-center justify-center">
                  Meet Our Team
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
