'use client'
import './animations.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  useEffect(() => {
    // Stagger the visibility of sections for enhanced reveal
    const timeouts = [0, 800, 1600, 2400].map((delay, index) =>
      setTimeout(() => {
        setVisibleSections(prev => [...prev, index]);
      }, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

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
        <div className="flex-2 space-y-10">

          {/* Enhanced About Us section */}
          <section className={`section-card hover-lift transition-all duration-1000 ${
            visibleSections.includes(0) ? 'scroll-reveal revealed' : 'scroll-reveal'
          }`}>
            <div className="flex flex-col items-center gap-6">
              <div className="flex-1">
                <h2 className="section-title text-center text-reveal">ABOUT US</h2>
                <p className="text-lg leading-relaxed text-neutral-600 font-medium max-w-3xl mx-auto">
                  Welcome to the <span className="font-bold text-unc-navy hover:text-dome-copper transition-colors duration-300">Visual Computing and Augmented Intelligence Lab</span> at UNC Chapel Hill. 
                  Our team is dedicated to advancing research in computational imaging, visual perception, and AI-driven solutions. 
                  We collaborate across disciplines to create transformative technologies that redefine the future of visual computing.
                </p>
              </div>
            </div>
          </section>

          {/* Enhanced Featured Projects section */}
          <section className={`section-card hover-lift transition-all duration-1000 delay-300 ${
            visibleSections.includes(1) ? 'scroll-reveal revealed' : 'scroll-reveal'
          }`}>
            <h2 className="section-title text-center text-reveal">PROJECTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
              
              {/* Project 1 with enhanced interactions */}
              <div className="project-card group magnetic-hover stagger-item enhanced-shadow">
                <Image 
                  src="https://www.cs.unc.edu/~cpk/data/thumbnails/1cm-metalens.PNG" 
                  alt="Beating bandwidth limits for large aperture broadband nano-optics" 
                  width={128}
                  height={128}
                  className="object-cover rounded mb-4 transition-all duration-500 group-hover:scale-110" 
                />
                <h3 className="text-xl font-bold mb-2 text-unc-navy text-center project-title transition-all duration-300 group-hover:text-dome-copper">
                  Beating bandwidth limits for large aperture broadband nano-optics
                </h3>
                <p className="text-neutral-700 mb-2 flex-1 group-hover:text-neutral-800 transition-colors duration-300">
                  Breakthrough in nano-optics, overcoming bandwidth limits for large aperture broadband metalenses with revolutionary optical designs.
                </p>
                <a href="https://www.nature.com/articles/s41467-025-58208-4" target="_blank" className="link-hover font-semibold spring-hover">
                  Read more →
                </a>
              </div>

              {/* Project 2 with enhanced interactions */}
              <div className="project-card group magnetic-hover stagger-item enhanced-shadow">
                <Image 
                  src="https://www.cs.unc.edu/~cpk/data/thumbnails/dof-gs.PNG" 
                  alt="DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting" 
                  width={128}
                  height={128}
                  className="object-cover rounded mb-4 transition-all duration-500 group-hover:scale-110" 
                />
                <h3 className="text-xl font-bold mb-2 text-unc-navy text-center project-title transition-all duration-300 group-hover:text-dome-copper">
                  DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting
                </h3>
                <p className="text-neutral-700 mb-2 flex-1 group-hover:text-neutral-800 transition-colors duration-300">
                  Novel 3D Gaussian Splatting technique for flexible depth-of-field control in computational photography applications.
                </p>
                <a href="https://arxiv.org/abs/2405.17351" target="_blank" className="link-hover font-semibold spring-hover">
                  Read more →
                </a>
              </div>

              {/* Project 3 with enhanced interactions */}
              <div className="project-card group magnetic-hover stagger-item enhanced-shadow">
                <Image 
                  src="https://www.cs.unc.edu/~cpk/data/thumbnails/eventfield.png" 
                  alt="Event fields: Capturing light fields at high speed, resolution, and dynamic range" 
                  width={128}
                  height={128}
                  className="object-cover rounded mb-4 transition-all duration-500 group-hover:scale-110" 
                />
                <h3 className="text-xl font-bold mb-2 text-unc-navy text-center project-title transition-all duration-300 group-hover:text-dome-copper">
                  Event fields: Capturing light fields at high speed, resolution, and dynamic range
                </h3>
                <p className="text-neutral-700 mb-2 flex-1 group-hover:text-neutral-800 transition-colors duration-300">
                  Pioneering event-based light field capture for high-speed, high-resolution, and high-dynamic-range imaging systems.
                </p>
                <a href="https://arxiv.org/abs/2412.06191" target="_blank" className="link-hover font-semibold spring-hover">
                  Read more →
                </a>
              </div>
            </div>
          </section>

          {/* Enhanced Highlights section */}
          <section className={`section-card hover-lift transition-all duration-1000 delay-600 ${
            visibleSections.includes(2) ? 'scroll-reveal revealed' : 'scroll-reveal'
          }`}>
            <h2 className="section-title text-center text-reveal">HIGHLIGHTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
              
              {/* Highlight 1 */}
              <div className="project-card group magnetic-hover enhanced-shadow">
                <a href="https://www.nature.com/articles/s41467-025-58208-4" target="_blank" className="block">
                  <Image 
                    src="https://www.cs.unc.edu/~cpk/data/thumbnails/1cm-metalens.PNG"
                    alt="Large aperture broadband nano-optics"
                    width={400}
                    height={300}
                    className="w-full object-cover rounded-lg mb-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <p className="text-center text-neutral-700 group-hover:text-unc-navy transition-colors duration-300">
                    Breakthrough in nano-optics: Large aperture broadband metalenses for next-generation optical systems
                  </p>
                </a>
              </div>

              {/* Highlight 2 */}
              <div className="project-card group magnetic-hover enhanced-shadow">
                <a href="https://arxiv.org/abs/2412.06191" target="_blank" className="block">
                  <Image 
                    src="https://www.cs.unc.edu/~cpk/data/thumbnails/eventfield.png"
                    alt="Event fields research"
                    width={400}
                    height={300}
                    className="w-full object-cover rounded-lg mb-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <p className="text-center text-neutral-700 group-hover:text-unc-navy transition-colors duration-300">
                    Event fields: Revolutionary approach to capturing light fields with unprecedented capabilities
                  </p>
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}