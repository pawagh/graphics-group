'use client'
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
        

        setTimeout(() => {
          setIsExpanding(false);
          // Wait for collapse animation to mostly complete, then switch text
          setTimeout(() => {
            setShowFullName(false);
          }, 400); // Switch text near the end of the collapse animation
        }, 5000); // Time until collapse
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
  const pathname = usePathname();

  const navItems = [
    { label: "PEOPLE", href: "/people" },
    { label: "COURSES", href: "/courses" },
    { label: "PUBLICATIONS", href: "/publications" },
    { label: "OPPORTUNITIES", href: "/opportunities" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

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
            <Link href="/" className="flex items-center gap-2 md:gap-4 text-white no-underline hover:text-white transition-all duration-500 group flex-1 min-w-0">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10" />
                <Image
                  src="/logo.png"
                  alt="VCAIL Logo"
                  width={40}
                  height={40}
                  className="md:w-12 md:h-12 object-contain rounded-full bg-white/90 p-1.5 md:p-2 shadow-lg transition-all duration-500 group-hover:scale-110 border-2 border-white/20"
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
                      
                      {/* Enhanced animated underline */}
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-white to-white/80 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-500 ease-out" />
                      
                      {/* Active page indicator - white bar on bottom */}
                      {isActive(item.href) && (
                        <div className="absolute bottom-0 left-[10%] w-4/5 h-0.5 bg-gradient-to-r from-white to-white/80" />
                      )}
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
          <footer className="relative text-white py-12 px-4 mt-8 overflow-hidden">
            {/* Background with UNC colors */}
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src="/old_well.png"
                alt="UNC Old Well"
                fill
                className="object-cover object-bottom scale-[1.2] -translate-y-6"
                style={{ pointerEvents: "none" }}
                priority={false}
              />
            </div>
            {/* Carolina Blue overlay */}
            <div className="absolute inset-0 bg-unc-navy/60 z-0" />
            
            {/* Footer content */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-lg font-bold mb-2">Visual Computing and Augmented Intelligence Lab</h2>
                <p className="mb-1">University of North Carolina at Chapel Hill</p>
                <p className="mb-1">Email: <a href="mailto:cpk@cs.unc.edu" className="underline text-white hover:text-white transition-colors duration-300">cpk@cs.unc.edu</a></p>
                <p className="mb-1">Department of Computer Science</p>
              </div>
              
              {/* Social Media Links */}
              <div className="flex flex-col items-center md:items-end gap-4">
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/company/unc-vcail" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-carolina-blue transition-colors duration-300"
                    aria-label="Follow us on LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/unc_vcail" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-carolina-blue transition-colors duration-300"
                    aria-label="Follow us on Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
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
