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
    { label: "RESEARCH", href: "./opportunities" },
    { label: "CONTACT", href: "./contact-us" },
  ];

  return (
    <html lang="en">
      <body className={`${inter.variable} bg-gray-100 text-black antialiased pt-16 font-sans`}>
        <header className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-gray-200 to-white shadow-lg flex items-center justify-between px-4 backdrop-blur-lg z-50 font-bold">
        <h1 className="text-lg">
          <Link href="/" legacyBehavior>
            <a className="text-inherit no-underline">
              <span className="block lg:hidden">Visual Computing & AI Lab</span>
              <span className="hidden lg:block">Visual Computing and Augmented Intelligence Lab</span>
            </a>
          </Link>
        </h1>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-button text-2xl cursor-pointer lg:hidden"
            >
              ☰
            </button>

            <nav className={`navbar absolute top-16 right-0 bg-white shadow-lg rounded-lg z-50 w-40 flex-col ${menuOpen ? "flex" : "hidden"} lg:static lg:flex-row lg:flex lg:bg-transparent lg:shadow-none lg:w-auto`}>
              <ul className="list-none m-0 p-0 flex flex-col lg:flex-row gap-5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} legacyBehavior>
                      <a className="text-gray-700 font-bold p-2 rounded hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
