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

          {/* Highlights section */}
          <section className="section-card unc-shadow-hover">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="section-title text-center sm:text-left text-carolina-blue text-reveal">LATEST NEWS</h2>
              <Link 
                href="/publications" 
                className="bg-white text-carolina-blue border-2 border-carolina-blue font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2 text-sm hover:bg-unc-navy hover:text-white hover:border-unc-navy self-center sm:self-auto"
              >
                View All
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Horizontal scroll container */}
            <div className="relative">
              <div id="highlights-scroll" className="flex gap-6 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                
                {/* Highlight 1 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Computational Imaging Research" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    {/* Progressive fade around title for better readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/80 via-unc-navy/40 via-30% to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 transition-colors duration-300">
                        Computational Imaging Breakthroughs
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Latest advances in computational imaging techniques, pushing the boundaries of optical systems and image reconstruction algorithms.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlight 2 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Award-Winning Research" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        Award-Winning Research
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Recognition for outstanding contributions to visual computing and augmented intelligence research at top-tier conferences.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlight 3 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="AR/VR Innovation" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        AR/VR Innovation
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Pioneering augmented and virtual reality technologies for next-generation immersive experiences and applications.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlight 4 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Machine Learning Applications" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        AI-Driven Solutions
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Advanced machine learning algorithms powering intelligent visual computing systems and automated analysis.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlight 5 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Nano-optics Research" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        Nano-optics Research
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Cutting-edge research in nano-scale optical structures and metamaterials for advanced photonic applications.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlight 6 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Research Collaboration" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        Research Collaboration
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Interdisciplinary partnerships fostering innovation across visual computing, optics, and artificial intelligence domains.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Navigation buttons */}
              <button 
                onClick={() => {
                  const container = document.getElementById('highlights-scroll');
                  if (container) {
                    container.scrollBy({ left: -400, behavior: 'smooth' });
                  }
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-unc-navy p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 backdrop-blur-sm"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={() => {
                  const container = document.getElementById('highlights-scroll');
                  if (container) {
                    container.scrollBy({ left: 400, behavior: 'smooth' });
                  }
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-unc-navy p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 backdrop-blur-sm"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Right fade only */}
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none"></div>
            </div>

          </section>

          {/* Enhanced Featured Projects section */}
          <section className="section-card unc-shadow-hover">
            <div className="relative flex justify-center items-baseline mb-6">
              <h2 className="section-title text-center text-carolina-blue text-reveal">FEATURED PUBLICATIONS</h2>
              <Link 
                href="/publications" 
                className="absolute right-0 bg-white text-carolina-blue border-2 border-carolina-blue font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2 text-sm hover:bg-unc-navy hover:text-white hover:border-unc-navy"
              >
                View All
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Horizontal scroll container */}
            <div className="relative">
              <div id="projects-scroll" className="flex gap-6 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                
                {/* Publication 1 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer"
                  onClick={() => window.open('https://www.nature.com/articles/s41467-025-58208-4', '_blank')}
                >
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://www.cs.unc.edu/~cpk/data/thumbnails/1cm-metalens.PNG" 
                      alt="Beating bandwidth limits for large aperture broadband nano-optics" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        Beating bandwidth limits for large aperture broadband nano-optics
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Breakthrough in nano-optics, overcoming bandwidth limits for large aperture broadband metalenses with revolutionary optical designs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Publication 2 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer"
                  onClick={() => window.open('https://arxiv.org/abs/2405.17351', '_blank')}
                >
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://www.cs.unc.edu/~cpk/data/thumbnails/dof-gs.PNG" 
                      alt="DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Novel 3D Gaussian Splatting technique for flexible depth-of-field control in computational photography applications.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Publication 3 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer"
                  onClick={() => window.open('https://arxiv.org/abs/2412.06191', '_blank')}
                >
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://www.cs.unc.edu/~cpk/data/thumbnails/eventfield.png" 
                      alt="Event fields: Capturing light fields at high speed, resolution, and dynamic range" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        Event fields: Capturing light fields at high speed, resolution, and dynamic range
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Pioneering event-based light field capture for high-speed, high-resolution, and high-dynamic-range imaging systems.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Publication 4 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer"
                  onClick={() => window.open('#', '_blank')}
                >
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Advanced Machine Learning Research" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        Advanced Machine Learning Research
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Cutting-edge machine learning algorithms for enhanced visual computing and intelligent systems.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Publication 5 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer"
                  onClick={() => window.open('#', '_blank')}
                >
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Optical Computing Systems" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        Optical Computing Systems
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Revolutionary optical computing architectures for next-generation visual processing systems.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Publication 6 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer"
                  onClick={() => window.open('#', '_blank')}
                >
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="AR/VR Innovation" 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/70 via-transparent to-transparent rounded-lg" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-unc-navy transition-colors duration-300">
                        AR/VR Innovation
                      </h3>
                    </div>
                    {/* Hover overlay with description */}
                    <div className="absolute inset-0 bg-unc-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                      <p className="text-white text-center text-sm">
                        Breakthrough augmented and virtual reality technologies for immersive experiences.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Navigation buttons */}
              <button 
                onClick={() => {
                  const container = document.getElementById('projects-scroll');
                  if (container) {
                    container.scrollBy({ left: -400, behavior: 'smooth' });
                  }
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-unc-navy p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 backdrop-blur-sm"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={() => {
                  const container = document.getElementById('projects-scroll');
                  if (container) {
                    container.scrollBy({ left: 400, behavior: 'smooth' });
                  }
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-unc-navy p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 backdrop-blur-sm"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Right fade only */}
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none"></div>
            </div>

          </section>

        </div>
      </div>
    </div>
  );
}