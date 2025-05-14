'use client'
import Link from "next/link";
import { Inter } from "next/font/google";
import { useState } from "react";
import "./globals.css";
import "./animations.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "PEOPLE", href: "./people" },
    { label: "TEACHING", href: "./teaching" },
    { label: "PUBLICATIONS", href: "./publications" },
    { label: "OPPORTUNITIES", href: "./opportunities" },
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
      <body className={`${inter.variable} bg-gray-100 text-black antialiased pt-16 font-sans`}>
        <header className="fixed top-0 left-0 w-full h-16 bg-carolina shadow-lg flex items-center justify-between px-8 md:px-12 backdrop-blur-lg z-50 font-bold">
          <h1 className="text-lg">
            <Link href="/" legacyBehavior>
              <a className="text-white no-underline">
                <span className="block lg:hidden">Visual Computing & AI Lab</span>
                <span className="hidden lg:block">Visual Computing and Augmented Intelligence Lab</span>
              </a>
            </Link>
          </h1>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-button text-2xl text-white cursor-pointer lg:hidden"
            >
              ☰
            </button>
            <nav className={`navbar absolute top-16 right-0 bg-carolina shadow-lg rounded-lg z-50 w-40 flex-col ${menuOpen ? "flex" : "hidden"} lg:static lg:flex-row lg:flex lg:bg-transparent lg:shadow-none lg:w-auto`}>
              <ul className="list-none m-0 p-0 flex flex-col lg:flex-row gap-5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} legacyBehavior>
                      <a className="text-white font-bold px-2 py-2 rounded hover:bg-carolina/80 transition" onClick={() => setMenuOpen(false)}>
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <div className="min-h-screen flex flex-col justify-between">
          <main className="flex-1">
            {children}
          </main>
          <footer className="relative text-white py-8 px-4 mt-8 overflow-hidden">
            {/* Background image layer */}
            <div
              className="absolute inset-0 w-full h-full z-0"
              style={{
                backgroundImage: "url('/unc_background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                pointerEvents: "none"
              }}
              aria-hidden="true"
            />
            {/* Overlay for extra contrast if needed */}
            <div className="absolute inset-0 bg-carolina/80 z-0" />
            {/* Footer content */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-lg font-bold mb-2">Visual Computing and Augmented Intelligence Lab</h2>
                <p className="mb-1">123 Innovation Drive, Chapel Hill, NC 27514</p>
                <p className="mb-1">Email: <a href="mailto:info@yourlab.com" className="underline text-white decoration-carolina">info@yourlab.com</a></p>
                <p className="mb-1">Phone: (123) 456-7890</p>
              </div>
              <div className="flex gap-4 items-center">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
