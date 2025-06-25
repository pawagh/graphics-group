'use client'
import './animations.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
        <div className="flex-2 space-y-16">

          {/* Enhanced About Us section */}
          <section className={`section-card transition-all duration-1000 ${
            visibleSections.includes(0) ? 'scroll-reveal revealed' : 'scroll-reveal'
          }`}>
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
          <section className={`section-card transition-all duration-1000 delay-300 ${
            visibleSections.includes(1) ? 'scroll-reveal revealed' : 'scroll-reveal'
          }`}>
            <h2 className="section-title text-center text-carolina-blue text-reveal mb-12">PROJECTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              
              {/* Project 1 with enhanced interactions */}
              <Link href="https://www.nature.com/articles/s41467-025-58208-4" target="_blank" className="project-card group stagger-item shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer block">
                <Image 
                  src="https://www.cs.unc.edu/~cpk/data/thumbnails/1cm-metalens.PNG" 
                  alt="Beating bandwidth limits for large aperture broadband nano-optics" 
                  width={128}
                  height={128}
                  className="object-cover rounded mb-6 transition-transform duration-300 group-hover:scale-105" 
                />
                <h3 className="text-xl font-bold mb-4 text-carolina-blue text-center project-title transition-all duration-300">
                  Beating bandwidth limits for large aperture broadband nano-optics
                </h3>
                <p className="text-neutral-700 mb-2 flex-1 transition-colors duration-300">
                  Breakthrough in nano-optics, overcoming bandwidth limits for large aperture broadband metalenses with revolutionary optical designs.
                </p>
              </Link>

              {/* Project 2 with enhanced interactions */}
              <Link href="https://arxiv.org/abs/2405.17351" target="_blank" className="project-card group stagger-item shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer block">
                <Image 
                  src="https://www.cs.unc.edu/~cpk/data/thumbnails/dof-gs.PNG" 
                  alt="DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting" 
                  width={128}
                  height={128}
                  className="object-cover rounded mb-6 transition-transform duration-300 group-hover:scale-105" 
                />
                <h3 className="text-xl font-bold mb-4 text-carolina-blue text-center project-title transition-all duration-300">
                  DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting
                </h3>
                <p className="text-neutral-700 mb-2 flex-1 transition-colors duration-300">
                  Novel 3D Gaussian Splatting technique for flexible depth-of-field control in computational photography applications.
                </p>
              </Link>

              {/* Project 3 with enhanced interactions */}
              <Link href="https://arxiv.org/abs/2412.06191" target="_blank" className="project-card group stagger-item shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer block">
                <Image 
                  src="https://www.cs.unc.edu/~cpk/data/thumbnails/eventfield.png" 
                  alt="Event fields: Capturing light fields at high speed, resolution, and dynamic range" 
                  width={128}
                  height={128}
                  className="object-cover rounded mb-6 transition-transform duration-300 group-hover:scale-105" 
                />
                <h3 className="text-xl font-bold mb-4 text-carolina-blue text-center project-title transition-all duration-300">
                  Event fields: Capturing light fields at high speed, resolution, and dynamic range
                </h3>
                <p className="text-neutral-700 mb-2 flex-1 transition-colors duration-300">
                  Pioneering event-based light field capture for high-speed, high-resolution, and high-dynamic-range imaging systems.
                </p>
              </Link>
            </div>
          </section>

          {/* Recent Awards & News section */}
          <section className={`section-card transition-all duration-1000 delay-600 ${visibleSections.includes(2) ? 'scroll-reveal revealed' : 'scroll-reveal'}`}>
            <h2 className="section-title text-center text-carolina-blue text-reveal mb-12">RECENT AWARDS & NEWS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-20 max-w-5xl mx-auto">
              <ul className="list-disc list-inside space-y-4 text-neutral-700 text-lg">
                <li><span className="font-semibold text-carolina-blue">Best Paper Award</span> at GMCV & WACV 2025 for &ldquo;FlatTrack: Eye-tracking with ultra-thin lensless cameras&rdquo;</li>
                <li><span className="font-semibold text-carolina-blue">CVPR 2025</span>: &ldquo;DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting&rdquo; accepted</li>
                <li><span className="font-semibold text-carolina-blue">Nature Communications 2025</span>: &ldquo;Beating bandwidth limits for large aperture broadband nano-optics&rdquo; published</li>
              </ul>
              <ul className="list-disc list-inside space-y-4 text-neutral-700 text-lg">
                <li><span className="font-semibold text-carolina-blue">Science Advances 2024</span>: &ldquo;Spatially Varying Nanophotonic Neural Networks&rdquo; published</li>
                <li><span className="font-semibold text-carolina-blue">Best Paper Award</span> at OmniCV & CVPR 2024 for &ldquo;Cross-Domain Synthetic-to-Real In-the-Wild Depth and Normal Estimation&rdquo;</li>
                <li><span className="font-semibold text-carolina-blue">SIGGRAPH Asia 2024</span>: &ldquo;End-to-End Hybrid Refractive-Diffractive Lens Design&rdquo; accepted</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}