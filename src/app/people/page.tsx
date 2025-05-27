'use client'
import '../animations.css';

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
        <img 
          src="/team_banner.jpg" 
          alt="Visual Computing Team Banner" 
          className="w-full h-full object-cover object-center rounded-b-lg shadow-md" 
        />
        <div className="absolute inset-0 bg-carolina-blue bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Our Team</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* Introduction section */}
          <section className="section-card">
            <h2 className="section-title text-center">PEOPLE</h2>
            <p className="text-lg text-center text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Meet the talented researchers and students advancing the frontiers of visual computing and augmented intelligence. 
              Our diverse team brings together expertise in optics, computer vision, machine learning, and human-computer interaction.
            </p>
          </section>

          {/* Team members grid */}
          <section className="section-card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {people.map((person, index) => (
                <div 
                  key={person.name} 
                  className="card overflow-hidden group transition-all duration-300 hover:shadow-card-hover"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 hover:text-orange transition-colors duration-300 mb-2">
                        {person.name}
                      </h3>
                      <p className="text-sm text-carolina-blue font-medium mb-2">{person.role}</p>
                      <p className="text-xs text-neutral-600 mb-4 leading-relaxed">{person.bio}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <a 
                        href={`mailto:${person.email}`} 
                        className="icon-hover text-neutral-400"
                        aria-label="Email"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                      <a 
                        href={person.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="icon-hover text-neutral-400"
                        aria-label="Personal Homepage"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lab philosophy and info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Group Philosophy */}
            <section className="section-card">
              <h3 className="section-title">Group Philosophy</h3>
              <p className="text-neutral-700 leading-relaxed">
                We believe in interdisciplinary collaboration, open science, and fostering a supportive environment for innovation and learning. 
                Our group values curiosity, diversity, and impact-driven research that pushes the boundaries of what's possible in visual computing.
              </p>
            </section>

            {/* Team Impact */}
            <section className="section-card">
              <h3 className="section-title">Team Impact</h3>
              <p className="text-neutral-700 leading-relaxed">
                Our team brings together expertise in optics, computer vision, machine learning, and human-computer interaction to solve 
                real-world problems in visual computing and augmented intelligence. Together, we're shaping the future of how humans interact with technology.
              </p>
            </section>
          </div>

          {/* Join us section */}
          <section className="text-center py-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-unc-navy mb-6">Join Our Team</h2>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                We're always looking for passionate students and researchers to join our lab. 
                Check out our current opportunities and see how you can contribute to cutting-edge research in visual computing.
              </p>
              <a href="/opportunities" className="btn-primary inline-flex items-center justify-center">
                View Opportunities
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}