'use client'
import './animations.css';
import Image from 'next/image';
import Link from 'next/link';
import newsArticlesData from '@/data/news.json';
import type { NewsArticle } from '@/types/data';

const newsArticles = (newsArticlesData as NewsArticle[]).sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
).slice(0, 6);

export default function Home() {


  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Enhanced Hero image carousel with parallax effect */}
      <div className="w-full h-[60vh] relative overflow-hidden bg-gradient-to-br from-unc-navy to-unc-navy">
        {[
          { src: "/lab-photos/group-photo-03.jpg", alt: "Visual Computing Lab Team", isGroup: true },
          { src: "/lab-photos/lab-work-15.jpg", alt: "Research in Progress", isGroup: false },
          { src: "/lab-photos/group-photo-02.jpg", alt: "Lab Collaboration", isGroup: true },
          { src: "/lab-photos/lab-work-20.jpg", alt: "Cutting-Edge Research", isGroup: false },
        ].map((img, index, arr) => {
          const total = arr.length;
          const duration = 20; // Slower, more elegant timing
          const delay = (index * duration) / total;
          return (
            <Image
              key={index}
              src={img.src}
              alt={img.alt}
              fill
              className={`absolute object-cover ${img.isGroup ? 'object-[center_25%]' : 'object-center'} fade-image-enhanced ${index === 0 ? 'first-image-enhanced' : ''}`}
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
                  We&apos;ve been around UNC Computer Science since 1978, with research such as Telepresence, Virtual Reality, Pixel-Planes, Head &amp; Body Trackers, 3D Ultrasound Displays, Office of the Future, Being-There Centre (with ETH Zurich and NTU Singapore) &mdash; see <Link href="/past-research" className="text-carolina-blue underline hover:text-unc-navy transition-colors duration-300">past research</Link>.
                </p>
                <p className="text-lg leading-relaxed text-neutral-600 font-medium max-w-3xl mx-auto mt-4">
                  Currently our team is dedicated to advancing research in computational imaging, visual perception, and AI-driven solutions. 
                  We collaborate across disciplines to create impactful technologies that advance the future of visual computing.
                </p>
              </div>
            </div>
          </section>


          <section className="section-card unc-shadow-hover">
            <div className="relative mb-6">
              <h2 className="section-title text-center text-carolina-blue text-reveal mb-4 sm:mb-0">LATEST NEWS</h2>
              <div className="flex justify-center sm:block"> 
                <Link 
                  href="/news" 
                  className="bg-white text-carolina-blue border-2 border-carolina-blue font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2 text-sm hover:bg-unc-navy hover:text-white hover:border-unc-navy sm:absolute sm:right-0 sm:top-0"
                >
                  View All
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Horizontal scroll container */}
            <div className="relative">
              <div id="highlights-scroll" className="flex gap-6 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {newsArticles.length === 0 ? (
                  <p className="text-neutral-500 py-8">No news items at this time.</p>
                ) : (
                  newsArticles.map((article, index) => (
                    <a
                      key={index}
                      href={article.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 block"
                    >
                      <div className="relative h-72 overflow-hidden rounded-lg bg-gradient-to-br from-carolina-blue/20 to-unc-navy/20">
                        {article.image ? (
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-carolina-blue/30 to-unc-navy/40 rounded-lg" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-unc-navy/90 via-unc-navy/40 to-transparent rounded-lg" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <span className="text-xs opacity-90">{article.date}</span>
                          <h3 className="text-sm font-bold mt-1 line-clamp-2 group-hover:text-carolina-blue transition-colors duration-300">
                            {article.title}
                          </h3>
                          <p className="text-xs opacity-90 mt-2 line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))
                )}
              </div>
              
              {/* Navigation buttons */}
              <button 
                onClick={() => {
                  if (typeof document !== 'undefined') {
                    const container = document.getElementById('highlights-scroll');
                    if (container) {
                      const scrollAmount = 344; // Card width (320px) + gap (24px)
                      const currentScroll = container.scrollLeft;
                      const newScroll = currentScroll - scrollAmount;
                      
                      // If we're at or near the beginning, loop to the end
                      if (newScroll <= 0) {
                        const maxScroll = container.scrollWidth - container.clientWidth;
                        container.scrollTo({ left: maxScroll, behavior: 'smooth' });
                      } else {
                        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                      }
                    }
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
                  if (typeof document !== 'undefined') {
                    const container = document.getElementById('highlights-scroll');
                    if (container) {
                      const scrollAmount = 344; // Card width (320px) + gap (24px)
                      const currentScroll = container.scrollLeft;
                      const maxScroll = container.scrollWidth - container.clientWidth;
                      
                      // If we're already at or very close to the end (within 10px), loop to the beginning
                      if (currentScroll >= maxScroll - 10) {
                        container.scrollTo({ left: 0, behavior: 'smooth' });
                      } else {
                        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                      }
                    }
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
            <div className="relative mb-6">
              <h2 className="section-title text-center text-carolina-blue text-reveal mb-4 sm:mb-0">RECENT PUBLICATIONS</h2>
              <div className="flex justify-center sm:block">
                <Link 
                  href="/publications" 
                  className="bg-white text-carolina-blue border-2 border-carolina-blue font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2 text-sm hover:bg-unc-navy hover:text-white hover:border-unc-navy sm:absolute sm:right-0 sm:top-0"
                >
                  View All
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Horizontal scroll container */}
            <div className="relative">
              <div id="projects-scroll" className="flex gap-6 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                
                                                  {/* Publication 1 */}
                <Link href="/publications/beating-bandwidth-limits-for-large-aperture-broadband-nano-optics" className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer hidden md:block">
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
                </Link>
                
                {/* Mobile version - to project page */}
                <Link href="/publications/beating-bandwidth-limits-for-large-aperture-broadband-nano-optics" className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer md:hidden">
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
                </Link>

                                                  {/* Publication 2 */}
                <Link href="/publications/dof-gs-adjustable-depth-of-field-3d-gaussian-splatting-for-post-capture-refocusing-defocus-rendering-and-blur-removal" className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer hidden md:block">
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
                </Link>
                
                {/* Mobile version - to project page */}
                <Link href="/publications/dof-gs-adjustable-depth-of-field-3d-gaussian-splatting-for-post-capture-refocusing-defocus-rendering-and-blur-removal" className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer md:hidden">
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
                </Link>

                                                  {/* Publication 3 */}
                <Link href="/publications/event-fields-capturing-light-fields-at-high-speed-resolution-and-dynamic-range" className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer hidden md:block">
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
                </Link>
                
                {/* Mobile version - to project page */}
                <Link href="/publications/event-fields-capturing-light-fields-at-high-speed-resolution-and-dynamic-range" className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80 cursor-pointer md:hidden">
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
                </Link>

                {/* Publication 4 */}
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="/lab-photos/lab-work-12.jpg" 
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
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="/lab-photos/lab-work-22.jpg" 
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
                <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden unc-shadow-hover flex-shrink-0 w-80">
                  <div className="relative h-72 overflow-hidden rounded-lg">
                    <Image 
                      src="/lab-photos/lab-work-28.jpg" 
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
                  if (typeof document !== 'undefined') {
                    const container = document.getElementById('projects-scroll');
                    if (container) {
                      const scrollAmount = 344; // Card width (320px) + gap (24px)
                      const currentScroll = container.scrollLeft;
                      const newScroll = currentScroll - scrollAmount;
                      
                      // If we're at or near the beginning, loop to the end
                      if (newScroll <= 0) {
                        const maxScroll = container.scrollWidth - container.clientWidth;
                        container.scrollTo({ left: maxScroll, behavior: 'smooth' });
                      } else {
                        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                      }
                    }
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
                  if (typeof document !== 'undefined') {
                    const container = document.getElementById('projects-scroll');
                    if (container) {
                      const scrollAmount = 344; // Card width (320px) + gap (24px)
                      const currentScroll = container.scrollLeft;
                      const maxScroll = container.scrollWidth - container.clientWidth;
                      
                      // If we're already at or very close to the end (within 10px), loop to the beginning
                      if (currentScroll >= maxScroll - 10) {
                        container.scrollTo({ left: 0, behavior: 'smooth' });
                      } else {
                        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                      }
                    }
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