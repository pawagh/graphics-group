'use client'
import '../animations.css';
import Image from 'next/image';

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

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* Group Philosophy - moved to top */}
          <section className="section-card">
            <h2 className="section-title text-center">GROUP PHILOSOPHY</h2>
            <p className="text-lg text-center text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              We believe in interdisciplinary collaboration, open science, and fostering a supportive environment for innovation and learning. 
              Our group values curiosity, diversity, and impact-driven research that pushes the boundaries of what's possible in visual computing. 
              Together, we bring expertise in optics, computer vision, machine learning, and human-computer interaction to solve 
              real-world problems and shape the future of how humans interact with technology.
            </p>
          </section>

          {/* Team members grid */}
          <section className="section-card">
            <h2 className="section-title text-center">OUR TEAM</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {people.map((person, index) => (
                <div 
                  key={person.name} 
                  className={`card p-6 text-center group hover-lift magnetic-hover enhanced-shadow stagger-item`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 relative">
                    <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full border-4 border-carolina-blue group-hover:border-unc-navy transition-colors duration-500">
                      <Image 
                        src={person.image} 
                        alt={person.name} 
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2" 
                      />
                    </div>
                    {/* Floating badge for position */}
                    <div className="absolute -top-2 -right-2 bg-carolina-blue text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                      {person.role}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-unc-navy mb-2 group-hover:text-carolina-blue transition-colors duration-300">
                    {person.name}
                  </h3>
                  <p className="text-carolina-blue font-semibold mb-3 group-hover:text-unc-navy transition-colors duration-300">
                    {person.role}
                  </p>
                  <p className="text-neutral-600 mb-4 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                    {person.bio}
                  </p>
                  <div className="flex justify-center space-x-4 pt-4 border-t border-neutral-200 group-hover:border-carolina-blue transition-colors duration-300">
                    {person.website && (
                      <a 
                        href={person.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-carolina-blue hover:text-unc-navy transition-all duration-300 transform hover:scale-125 spring-hover"
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
                        className="text-carolina-blue hover:text-unc-navy transition-all duration-300 transform hover:scale-125 spring-hover"
                        aria-label={`Email ${person.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    )}
                    <a 
                      href="/publications" 
                      className="text-carolina-blue hover:text-unc-navy transition-all duration-300 transform hover:scale-125 spring-hover"
                      aria-label={`${person.name}'s publications`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </a>
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