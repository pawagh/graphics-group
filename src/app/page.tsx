'use client'
import './animations.css';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero image carousel matching template */}
      <div className="w-full h-[60vh] relative overflow-hidden">
        {["/2.png", "/3.png", "/4.png"].map((src, index, arr) => {
          const total = arr.length;
          const duration = 18; // Total duration for one full cycle in seconds
          const delay = (index * duration) / total; // Stagger the animation for each image
          return (
            <Image
              key={index}
              src={src}
              alt={`Visual Computing Research ${index + 1}`}
              fill
              className="absolute object-cover fade-image"
              style={{ animationDelay: `${delay}s` }}
              priority={index === 0}
            />
          );
        })}
      </div>
      
      {/* Custom fade animation */}
      <style jsx>{`
        @keyframes fadeAnimation {
          0% { opacity: 0; }
          10% { opacity: 1; }
          30% { opacity: 1; }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }
        .fade-image {
          opacity: 0;
          animation: fadeAnimation 18s infinite;
        }
      `}</style>

      {/* Main content container */}
      <div className="content-container">
        <div className="flex-2 space-y-10">

          {/* About Us section matching template */}
          <section className="section-card">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-shrink-0 flex justify-center items-center w-full md:w-auto">
                <Image
                  src="/logo.png"
                  alt="Visual Computing and Augmented Intelligence Lab"
                  width={160}
                  height={160}
                  className="object-contain rounded-full border-4 border-carolina-blue shadow-lg bg-white"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <h2 className="section-title">ABOUT US</h2>
                <p className="text-lg leading-relaxed text-neutral-700 font-medium">
                  Welcome to the <span className="font-bold text-carolina-blue">Visual Computing and Augmented Intelligence Lab</span> at UNC Chapel Hill. 
                  Our team is dedicated to advancing research in computational imaging, visual perception, and AI-driven solutions. 
                  We collaborate across disciplines to create transformative technologies that redefine the future of visual computing.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Projects section matching template */}
          <section className="section-card">
            <h2 className="section-title text-center">PROJECTS</h2>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 justify-center items-center">
              
              {/* Project 1 */}
              <div className="project-card group">
                <Image 
                  src="https://www.cs.unc.edu/~cpk/data/thumbnails/1cm-metalens.PNG" 
                  alt="Beating bandwidth limits for large aperture broadband nano-optics" 
                  width={128}
                  height={128}
                  className="object-cover rounded mb-4 transition-transform duration-300 group-hover:scale-110" 
                />
                <h3 className="text-xl font-bold mb-2 text-carolina-blue text-center project-title transition-colors duration-300">
                  Beating bandwidth limits for large aperture broadband nano-optics
                </h3>
                <p className="text-neutral-700 text-center mb-2 flex-1">
                  Breakthrough in nano-optics, overcoming bandwidth limits for large aperture broadband metalenses with revolutionary optical designs.
                </p>
                <a href="https://www.nature.com/articles/s41467-025-58208-4" target="_blank" className="link-hover font-semibold">
                  Read more →
                </a>
              </div>

              {/* Project 2 */}
              <div className="project-card group">
                <Image 
                  src="https://www.cs.unc.edu/~cpk/data/thumbnails/dof-gs.PNG" 
                  alt="DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting" 
                  width={128}
                  height={128}
                  className="object-cover rounded mb-4 transition-transform duration-300 group-hover:scale-110" 
                />
                <h3 className="text-xl font-bold mb-2 text-carolina-blue text-center project-title transition-colors duration-300">
                  DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting
                </h3>
                <p className="text-neutral-700 text-center mb-2 flex-1">
                  Novel 3D Gaussian Splatting technique for flexible depth-of-field control in computational photography applications.
                </p>
                <a href="https://arxiv.org/abs/2405.17351" target="_blank" className="link-hover font-semibold">
                  Read more →
                </a>
              </div>

              {/* Project 3 */}
              <div className="project-card group">
                <Image 
                  src="https://www.cs.unc.edu/~cpk/data/thumbnails/eventfield.png" 
                  alt="Event fields: Capturing light fields at high speed, resolution, and dynamic range" 
                  width={128}
                  height={128}
                  className="object-cover rounded mb-4 transition-transform duration-300 group-hover:scale-110" 
                />
                <h3 className="text-xl font-bold mb-2 text-carolina-blue text-center project-title transition-colors duration-300">
                  Event fields: Capturing light fields at high speed, resolution, and dynamic range
                </h3>
                <p className="text-neutral-700 text-center mb-2 flex-1">
                  Pioneering event-based light field capture for high-speed, high-resolution, and high-dynamic-range imaging systems.
                </p>
                <a href="https://arxiv.org/abs/2412.06191" target="_blank" className="link-hover font-semibold">
                  Read more →
                </a>
              </div>
            </div>
          </section>

          {/* Highlights section matching template */}
          <section className="section-card">
            <h2 className="section-title">HIGHLIGHTS</h2>
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Recent News */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-unc-navy mb-4">Recent News</h3>
                <ul className="list-disc ml-6 text-neutral-700 space-y-2">
                  <li className="hover:text-orange transition-colors duration-300">
                    <strong>April 2025:</strong> Event Fields selected as a CVPR Highlight paper for groundbreaking light field research.
                  </li>
                  <li className="hover:text-orange transition-colors duration-300">
                    <strong>March 2025:</strong> Metalens imaging breakthrough published in Nature Communications.
                  </li>
                  <li className="hover:text-orange transition-colors duration-300">
                    <strong>February 2025:</strong> Best Paper Honorable Mention at IEEE VR for innovative AR/VR research.
                  </li>
                  <li className="hover:text-orange transition-colors duration-300">
                    <strong>May 2024:</strong> Best Paper Award at OmniCV, CVPR 2024 for cross-domain depth estimation.
                  </li>
                </ul>
              </div>
              
              {/* Major Awards */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-unc-navy mb-4">Major Awards</h3>
                <ul className="list-disc ml-6 text-neutral-700 space-y-2">
                  <li className="hover:text-orange transition-colors duration-300">
                    Highlight Paper, <strong>Event fields</strong>, CVPR 2025
                  </li>
                  <li className="hover:text-orange transition-colors duration-300">
                    Best Paper Award, <strong>FlatTrack: Eye-tracking with ultra-thin lensless cameras</strong>, GMCV, WACV 2025
                  </li>
                  <li className="hover:text-orange transition-colors duration-300">
                    Best Paper Award, <strong>Cross-Domain Synthetic-to-Real Depth and Normal Estimation</strong>, OmniCV, CVPR 2024
                  </li>
                  <li className="hover:text-orange transition-colors duration-300">
                    Best Dissertation Award, <strong>Towards Everyday-use Augmented Reality Eyeglasses</strong>, IEEE VGTC 2023
                  </li>
                  <li className="hover:text-orange transition-colors duration-300">
                    Best Paper Award, <strong>Image Features Influence Reaction Time</strong>, ACM SIGGRAPH 2022
                  </li>
                  <li className="hover:text-orange transition-colors duration-300">
                    Best Paper Award, <strong>DeepCGH: 3D Computer-Generated Holography Using Deep Learning</strong>, OSA Biophotonics Congress 2020
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to action section */}
          <section className="text-center py-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-unc-navy mb-6">Join Our Research</h2>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Interested in pushing the boundaries of visual computing and augmented intelligence? 
                We're always looking for passionate students and researchers to join our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/people" className="btn-primary inline-flex items-center justify-center">
                  Meet Our Team
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="/opportunities" className="btn-secondary inline-flex items-center justify-center">
                  View Opportunities
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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