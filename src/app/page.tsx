'use client'
import './animations.css';
import Image from 'next/image';

import Link from 'next/link';

export default function Home() {

  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Enhanced Hero image carousel with parallax effect */}
      <div className="w-full h-[60vh] relative overflow-hidden bg-gradient-to-br from-unc-navy to-unc-navy">
        {[
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80", // Modern technology/computing
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80", // Computational imaging/holography
          "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80", // Advanced optics/nano-technology
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"  // AI and neural networks
        ].map((src, index, arr) => {
          const total = arr.length;
          const duration = 20; // Slower, more elegant timing
          const delay = (index * duration) / total;
          const altTexts = [
            "Modern Computing and Technology Research",
            "Computational Imaging and Holography", 
            "Advanced Optics and Nano-technology",
            "AI and Neural Network Systems"
          ];
          return (
            <Image
              key={index}
              src={src}
              alt={altTexts[index]}
              fill
              className={`absolute object-cover fade-image-enhanced ${index === 0 ? 'first-image-enhanced' : ''}`}
              style={{ 
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
              priority={index === 0}
            />
          );
        })}
        {/* Sophisticated overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-unc-navy/40 via-unc-navy/20 to-unc-navy/30 z-10" />
        
        {/* Floating research indicators */}
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <div className="float-gentle bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Visual Computing & AI Research</h3>
            <p className="text-sm opacity-90">Advancing the frontiers of computational imaging, AR/VR, and augmented intelligence</p>
          </div>
        </div>
      </div>
      
      {/* Enhanced fade animation with smoother transitions */}
      <style jsx>{`
        @keyframes fadeAnimationEnhanced {
          0% { opacity: 1; transform: scale(1); }
          20% { opacity: 1; transform: scale(1.01); }
          25% { opacity: 0; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(1); }
        }
        .fade-image-enhanced {
          opacity: 0;
          animation: fadeAnimationEnhanced 20s infinite ease-in-out;
        }
        .first-image-enhanced {
          opacity: 1;
          animation-delay: 0s !important;
        }
      `}</style>

      {/* Main content container */}
      <div className="content-container">
        <div className="flex-2 space-y-16">

          {/* Enhanced About Us section */}
          <section className="section-card unc-shadow-hover">
            <div className="flex flex-col items-center gap-8">
              <div className="flex-1">
                <h2 className="section-title text-center text-carolina-blue text-reveal mb-8">ABOUT US</h2>
                <p className="text-lg leading-relaxed text-neutral-600 font-medium max-w-3xl mx-auto">
                  Welcome to the <span className="font-bold text-carolina-blue transition-colors duration-300">Visual Computing and Augmented Intelligence Lab</span> at UNC Chapel Hill. 
                  Our team is dedicated to advancing research in computational imaging, visual perception, and AI-driven solutions. 
                  We collaborate across disciplines to create transformative technologies that redefine the future of visual computing.
                </p>
              </div>
            </div>
          </section>

          {/* Enhanced Featured Projects section */}
          <section className="section-card unc-shadow-hover">
            <h2 className="section-title text-center text-carolina-blue text-reveal mb-12">PROJECTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              
              {/* Project 1 with enhanced interactions */}
              <div className="project-card group stagger-item shadow-lg hover:shadow-xl transition-all duration-300 unc-shadow-hover transform hover:scale-105 flex flex-col h-full md:cursor-pointer"
                style={{
                  boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.15), 0 6px 10px -5px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px -8px rgba(19, 41, 75, 0.4), 0 15px 25px -5px rgba(19, 41, 75, 0.3), 0 8px 15px -3px rgba(19, 41, 75, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 20px -5px rgba(0, 0, 0, 0.15), 0 6px 10px -5px rgba(0, 0, 0, 0.1)';
                }}
                onClick={() => {
                  if (window.innerWidth >= 768) {
                    window.open('https://www.nature.com/articles/s41467-025-58208-4', '_blank');
                  }
                }}
              >
                <div className="w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded">
                  <Image 
                    src="https://www.cs.unc.edu/~cpk/data/thumbnails/1cm-metalens.PNG" 
                    alt="Beating bandwidth limits for large aperture broadband nano-optics" 
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                <h3 className="text-xl font-bold mb-4 text-carolina-blue text-center project-title transition-all duration-300 group-hover:text-unc-navy group-hover:scale-105 min-h-[4rem] flex items-center justify-center">
                  Beating bandwidth limits for large aperture broadband nano-optics
                </h3>
                <p className="text-neutral-700 mb-4 flex-1 transition-all duration-300 group-hover:text-unc-navy group-hover:scale-102 text-center">
                  Breakthrough in nano-optics, overcoming bandwidth limits for large aperture broadband metalenses with revolutionary optical designs.
                </p>
                {/* Mobile-only Read More button */}
                <div className="md:hidden flex justify-center">
                  <a 
                    href="https://www.nature.com/articles/s41467-025-58208-4" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-carolina-blue border-2 border-carolina-blue font-medium px-3 py-1 rounded-lg transition-all duration-300 text-sm hover:bg-carolina-blue hover:text-white"
                  >
                    Read More
                  </a>
                </div>
              </div>

              {/* Project 2 with enhanced interactions */}
              <div className="project-card group stagger-item shadow-lg hover:shadow-xl transition-all duration-300 unc-shadow-hover transform hover:scale-105 flex flex-col h-full md:cursor-pointer"
                style={{
                  boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.15), 0 6px 10px -5px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px -8px rgba(19, 41, 75, 0.4), 0 15px 25px -5px rgba(19, 41, 75, 0.3), 0 8px 15px -3px rgba(19, 41, 75, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 20px -5px rgba(0, 0, 0, 0.15), 0 6px 10px -5px rgba(0, 0, 0, 0.1)';
                }}
                onClick={() => {
                  if (window.innerWidth >= 768) {
                    window.open('https://arxiv.org/abs/2405.17351', '_blank');
                  }
                }}
              >
                <div className="w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded">
                  <Image 
                    src="https://www.cs.unc.edu/~cpk/data/thumbnails/dof-gs.PNG" 
                    alt="DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting" 
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                <h3 className="text-xl font-bold mb-4 text-carolina-blue text-center project-title transition-all duration-300 group-hover:text-unc-navy group-hover:scale-105 min-h-[4rem] flex items-center justify-center">
                  DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting
                </h3>
                <p className="text-neutral-700 mb-4 flex-1 transition-all duration-300 group-hover:text-unc-navy group-hover:scale-102 text-center">
                  Novel 3D Gaussian Splatting technique for flexible depth-of-field control in computational photography applications.
                </p>
                {/* Mobile-only Read More button */}
                <div className="md:hidden flex justify-center">
                  <a 
                    href="https://arxiv.org/abs/2405.17351" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-carolina-blue border-2 border-carolina-blue font-medium px-3 py-1 rounded-lg transition-all duration-300 text-sm hover:bg-carolina-blue hover:text-white"
                  >
                    Read More
                  </a>
                </div>
              </div>

              {/* Project 3 with enhanced interactions */}
              <div className="project-card group stagger-item shadow-lg hover:shadow-xl transition-all duration-300 unc-shadow-hover transform hover:scale-105 flex flex-col h-full md:cursor-pointer"
                style={{
                  boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.15), 0 6px 10px -5px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px -8px rgba(19, 41, 75, 0.4), 0 15px 25px -5px rgba(19, 41, 75, 0.3), 0 8px 15px -3px rgba(19, 41, 75, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 20px -5px rgba(0, 0, 0, 0.15), 0 6px 10px -5px rgba(0, 0, 0, 0.1)';
                }}
                onClick={() => {
                  if (window.innerWidth >= 768) {
                    window.open('https://arxiv.org/abs/2412.06191', '_blank');
                  }
                }}
              >
                <div className="w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded">
                  <Image 
                    src="https://www.cs.unc.edu/~cpk/data/thumbnails/eventfield.png" 
                    alt="Event fields: Capturing light fields at high speed, resolution, and dynamic range" 
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                <h3 className="text-xl font-bold mb-4 text-carolina-blue text-center project-title transition-all duration-300 group-hover:text-unc-navy group-hover:scale-105 min-h-[4rem] flex items-center justify-center">
                  Event fields: Capturing light fields at high speed, resolution, and dynamic range
                </h3>
                <p className="text-neutral-700 mb-4 flex-1 transition-all duration-300 group-hover:text-unc-navy group-hover:scale-102 text-center">
                  Pioneering event-based light field capture for high-speed, high-resolution, and high-dynamic-range imaging systems.
                </p>
                {/* Mobile-only Read More button */}
                <div className="md:hidden flex justify-center">
                  <a 
                    href="https://arxiv.org/abs/2412.06191" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-carolina-blue border-2 border-carolina-blue font-medium px-3 py-1 rounded-lg transition-all duration-300 text-sm hover:bg-carolina-blue hover:text-white"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Highlights section */}
          <section className="section-card unc-shadow-hover">
            <h2 className="section-title text-center text-carolina-blue text-reveal mb-12">HIGHLIGHTS</h2>
            
            {/* Horizontal scroll container */}
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#13294B #f1f1f1' }}>
                
                {/* Highlight 1 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Computational Imaging Research" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        Computational Imaging Breakthroughs
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Highlight 2 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Award-Winning Research" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        Award-Winning Research
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Highlight 3 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="AR/VR Innovation" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        AR/VR Innovation
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Highlight 4 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Machine Learning Applications" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        AI-Driven Solutions
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Highlight 5 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Nano-optics Research" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        Nano-optics Research
                      </h3>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Scroll gradient overlays */}
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-neutral-50 to-transparent pointer-events-none"></div>
            </div>

            {/* More button */}
            <div className="flex justify-center mt-8">
              <Link 
                href="/publications" 
                className="bg-white text-carolina-blue border-2 border-carolina-blue font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2 text-sm hover:bg-unc-navy hover:text-white hover:border-unc-navy"
              >
                View More Research
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

          </section>

        </div>
      </div>
    </div>
  );
}