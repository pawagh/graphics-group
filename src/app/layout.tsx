'use client'
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import "./globals.css";
import "./animations.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-poppins",
});

function AnimatedLabTitle() {
  const [showFullName, setShowFullName] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showFullName) {
        // Start expanding
        setIsExpanding(true);
        setShowFullName(true);
        
        // Start collapsing after 3 seconds (increased from 2 seconds)
        setTimeout(() => {
          setIsExpanding(false);
          // Wait for collapse animation to mostly complete, then switch text
          setTimeout(() => {
            setShowFullName(false);
          }, 400); // Switch text near the end of the collapse animation
        }, 3000); // Changed from 2000ms to 3000ms
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [showFullName]);
  
  return (
    <div className="overflow-hidden w-full">
      <span 
        className={`animated-lab-title block transition-all duration-500 ease-in-out whitespace-nowrap ${
          showFullName && isExpanding ? 'max-w-full opacity-100' : 'max-w-[2.5rem] sm:max-w-[3rem] md:max-w-[4rem] opacity-100'
        }`}
      >
        {showFullName ? "VISUAL COMPUTING AND AUGMENTED INTELLIGENCE LAB" : "VCAIL"}
      </span>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "PEOPLE", href: "/people" },
    { label: "COURSES", href: "/teaching" },
    { label: "PUBLICATIONS", href: "/publications" },
    { label: "OPPORTUNITIES", href: "/opportunities" },
  ];

  return (
    <html lang="en">
      <head>
        <title>Visual Computing and Augmented Intelligence Lab | UNC Chapel Hill</title>
        <meta name="description" content="The Visual Computing and Augmented Intelligence Lab at UNC Chapel Hill advances research in computational imaging, computer vision, AR/VR, nano-optics, and AI-driven solutions." />
        <meta name="keywords" content="visual computing, augmented intelligence, UNC, Chapel Hill, computational imaging, computer vision, AR, VR, nano-optics, research, Praneeth Chakravarthula" />
        <meta name="author" content="Praneeth Chakravarthula" />
        <link rel="canonical" href="https://www.cs.unc.edu/~cpk/" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Visual Computing and Augmented Intelligence Lab | UNC Chapel Hill" />
        <meta property="og:description" content="Advancing research in computational imaging, computer vision, AR/VR, nano-optics, and AI-driven solutions at UNC Chapel Hill." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.cs.unc.edu/~cpk/" />
        <meta property="og:image" content="/logo.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Visual Computing and Augmented Intelligence Lab | UNC Chapel Hill" />
        <meta name="twitter:description" content="Advancing research in computational imaging, computer vision, AR/VR, nano-optics, and AI-driven solutions at UNC Chapel Hill." />
        <meta name="twitter:image" content="/logo.png" />
      </head>
      <body className={`${poppins.variable} bg-neutral-50 text-neutral-900 antialiased pt-20 font-sans`}>
        {/* Enhanced Header with sophisticated styling */}
        <header className="fixed top-0 left-0 w-full h-20 bg-carolina-blue shadow-2xl flex items-center justify-between px-4 md:px-6 lg:px-12 backdrop-blur-xl z-50 border-b border-white/10">
          {/* Enhanced Logo and Lab title */}
          <div className="flex items-center gap-2 md:gap-4 lg:gap-6 flex-1 min-w-0">
            <Link href="/" className="flex items-center gap-2 md:gap-4 text-white no-underline hover:text-white transition-all duration-500 group flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10" />
                <Image
                  src="/logo.png"
                  alt="VCAIL Logo"
                  width={40}
                  height={40}
                  className="md:w-12 md:h-12 object-contain rounded-full bg-white/90 p-1.5 md:p-2 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 border-2 border-white/20"
                />
              </div>
              <div className="header-title flex-1 min-w-0">
                <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold overflow-hidden">
                  <AnimatedLabTitle />
                </div>
              </div>
            </Link>
          </div>
          
          {/* Enhanced Navigation */}
          <div className="relative flex-shrink-0">
            {/* Sophisticated mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-white cursor-pointer lg:hidden hover:text-white transition-all duration-300 relative group p-2 ml-2"
            >
              <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              <div className="relative">
                <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <div className={`w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
            
            {/* Enhanced Navigation menu */}
            <nav className={`navbar absolute top-24 right-0 shadow-2xl rounded-2xl z-50 w-64 lg:w-auto flex-col border border-white/20 backdrop-blur-xl ${menuOpen ? "flex bg-gradient-to-br from-carolina-blue via-carolina-blue to-unc-navy" : "hidden"} lg:static lg:flex-row lg:flex lg:bg-transparent lg:shadow-none lg:border-none lg:backdrop-blur-none lg:rounded-none`}>
              <ul className="list-none m-0 p-6 lg:p-0 flex flex-col lg:flex-row gap-2 lg:gap-8">
                {navItems.map((item, index) => (
                  <li key={item.href} className="relative">
                    <Link 
                      href={item.href} 
                      className="nav-link-enhanced group block relative overflow-hidden" 
                      onClick={() => setMenuOpen(false)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="relative z-10 block px-4 py-3 lg:px-3 lg:py-2 text-white font-bold text-lg lg:text-base tracking-wide transition-all duration-300 group-hover:text-white">
                        {item.label}
                      </span>
                      
                      {/* Sophisticated hover background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
                      
                      {/* Enhanced animated underline */}
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-white to-white/80 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-500 ease-out" />
                      
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-sm" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {/* Main content area */}
        <div className="min-h-screen flex flex-col justify-between">
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer with UNC branding */}
          <footer className="relative text-white py-8 px-4 mt-8 overflow-hidden">
            {/* Background with UNC colors */}
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src="/unc_background.jpg"
                alt="UNC Background"
                fill
                className="object-cover"
                style={{ pointerEvents: "none" }}
                priority={false}
              />
            </div>
            {/* Carolina Blue overlay */}
            <div className="absolute inset-0 bg-carolina-blue/60 z-0" />
            
            {/* Footer content */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-lg font-bold mb-2">Visual Computing and Augmented Intelligence Lab</h2>
                <p className="mb-1">University of North Carolina at Chapel Hill</p>
                <p className="mb-1">Email: <a href="mailto:cpk@cs.unc.edu" className="underline text-white hover:text-white transition-colors duration-300">cpk@cs.unc.edu</a></p>
                <p className="mb-1">Department of Computer Science</p>
              </div>
              
              {/* Social links with enhanced interactions */}
              <div className="flex gap-4 items-center">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="icon-hover spring-hover group">
                  <div className="relative">
                    <svg className="w-6 h-6 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/>
                    </svg>
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10" />
                  </div>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-hover spring-hover group">
                  <div className="relative">
                    <svg className="w-6 h-6 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                    </svg>
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10" />
                  </div>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-hover spring-hover group">
                  <div className="relative">
                    <svg className="w-6 h-6 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                    </svg>
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10" />
                  </div>
                </a>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="relative z-10 text-center mt-6 pt-4 border-t border-white/30">
              <p className="text-sm">© 2025 Visual Computing and Augmented Intelligence Lab, UNC Chapel Hill</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
