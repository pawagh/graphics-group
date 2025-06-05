'use client'
import '../animations.css';
import Image from 'next/image';
import Link from 'next/link';

export default function People() {
  const people = [
    {
      name: "Praneeth Chakravarthula",
      role: "Assistant Professor",
      image: "/praneeth.jpeg",
      bio: "Computational imaging, AR/VR, nano-optics, human-computer interaction",
      email: "cpk@cs.unc.edu",
      website: "https://www.cs.unc.edu/~cpk/",
    },
    {
      name: "Xi Peng",
      role: "PhD Student",
      image: "/XiPeng.jpg",
      bio: "Acoustic fields, neural rendering, VR/AR audio",
      email: "xipeng@cs.unc.edu",
      website: "https://scholar.google.com/citations?user=example",
    },
    {
      name: "Zihao Zou",
      role: "PhD Student", 
      image: "/zihao.png",
      bio: "Event cameras, computational photography, computer vision",
      email: "zihaozou@cs.unc.edu",
      website: "https://scholar.google.com/citations?user=example",
    },
    {
      name: "Hengyu Lian",
      role: "PhD Student",
      image: "/Hengyu.jpeg", 
      bio: "Holography, computational optics, display technology",
      email: "Lianhy0@cs.unc.edu",
      website: "https://scholar.google.com/citations?user=example",
    },
  ];

  // Separate assistant professor from other team members
  const assistantProfessor = people.find(person => person.role === "Assistant Professor");
  const otherTeamMembers = people.filter(person => person.role !== "Assistant Professor");

  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero banner section */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <Image 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Research team collaboration" 
          fill
          className="object-cover object-center rounded-b-lg shadow-md" 
        />
      </div>

      {/* Group Philosophy - Dome Copper translucent banner */}
      <div className="w-full bg-campus-sandstone backdrop-blur-sm border-t-4 py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-dome-copper text-center mb-3">GROUP PHILOSOPHY</h2>
          <p className="text-md text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            Our group values curiosity, diversity, and impact-driven research that pushes the boundaries of what&apos;s possible in visual computing. 
            Together, we bring expertise in optics, computer vision, and machine learning.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* Assistant Professor - Full width card */}
          {assistantProfessor && (
            <section className="section-card">
              <div className="max-w-4xl mx-auto">
                <div className="card p-8 group hover-lift magnetic-hover enhanced-shadow">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-48 h-48 relative overflow-hidden rounded-full border-4 border-unc-navy group-hover:border-dome-copper transition-colors duration-500">
                        <Image 
                          src={assistantProfessor.image} 
                          alt={assistantProfessor.name} 
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110" 
                        />
                      </div>
                    </div>
                    <div className="flex-1 md:text-left">
                      <h3 className="text-3xl font-bold text-unc-navy mb-3 group-hover:text-dome-copper transition-colors duration-300">
                        {assistantProfessor.name}
                      </h3>
                      <p className="text-xl text-unc-navy font-semibold mb-4 group-hover:text-dome-copper transition-colors duration-300">
                        {assistantProfessor.role}
                      </p>
                      <p className="text-lg text-neutral-600 mb-6 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                        {assistantProfessor.bio}
                      </p>
                      <div className="flex justify-center md:justify-start space-x-6">
                        {assistantProfessor.website && (
                          <a 
                            href={assistantProfessor.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-unc-navy hover:text-dome-copper transition-all duration-300 transform hover:scale-125 spring-hover"
                            aria-label={`${assistantProfessor.name}'s website`}
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                            </svg>
                          </a>
                        )}
                        {assistantProfessor.email && (
                          <a 
                            href={`mailto:${assistantProfessor.email}`} 
                            className="text-unc-navy hover:text-dome-copper transition-all duration-300 transform hover:scale-125 spring-hover"
                            aria-label={`Email ${assistantProfessor.name}`}
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                        )}
                        <Link 
                          href="/publications" 
                          className="text-unc-navy hover:text-dome-copper transition-all duration-300 transform hover:scale-125 spring-hover"
                          aria-label={`${assistantProfessor.name}'s publications`}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Other Team Members - Grid layout */}
          <section className="section-card">
            <h2 className="section-title text-center">TEAM MEMBERS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {otherTeamMembers.map((person, index) => (
                <div 
                  key={person.name} 
                  className={`card p-6 text-center group hover-lift magnetic-hover enhanced-shadow stagger-item`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 relative">
                    <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full border-4 border-unc-navy group-hover:border-dome-copper transition-colors duration-500">
                      <Image 
                        src={person.image} 
                        alt={person.name} 
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110" 
                      />
                    </div>
                    {/* Floating badge for position */}
                    <div className="absolute -top-2 -right-2 bg-unc-navy text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                      {person.role}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-unc-navy mb-2 group-hover:text-dome-copper transition-colors duration-300">
                    {person.name}
                  </h3>
                  <p className="text-unc-navy font-semibold mb-3 group-hover:text-dome-copper transition-colors duration-300">
                    {person.role}
                  </p>
                  <p className="text-neutral-600 mb-4 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                    {person.bio}
                  </p>
                  <div className="flex justify-center space-x-4 pt-4 border-t border-neutral-200 group-hover:border-unc-navy transition-colors duration-300">
                    {person.website && (
                      <a 
                        href={person.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-unc-navy hover:text-dome-copper transition-all duration-300 transform hover:scale-125 spring-hover"
                        aria-label={`${person.name}'s website`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                      </a>
                    )}
                    {person.email && (
                      <a 
                        href={`mailto:${person.email}`} 
                        className="text-unc-navy hover:text-dome-copper transition-all duration-300 transform hover:scale-125 spring-hover"
                        aria-label={`Email ${person.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    )}
                    <Link 
                      href="/publications" 
                      className="text-unc-navy hover:text-dome-copper transition-all duration-300 transform hover:scale-125 spring-hover"
                      aria-label={`${person.name}'s publications`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </Link>
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