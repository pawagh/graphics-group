'use client'
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import "./globals.css";
import "./animations.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "PEOPLE", href: "./people" },
    { label: "PROJECTS", href: "./projects" },
    { label: "PUBLICATIONS", href: "./publications" },
  ];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 text-black antialiased pt-16 font-sans`}>
        <header className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-gray-200 to-white shadow-md flex items-center justify-between px-4 backdrop-blur-md z-50 font-mono font-bold">
          <h1 className="text-lg">
            <Link href="/" legacyBehavior>
              <a className="text-inherit no-underline">VC & AI Lab</a>
            </Link>
          </h1>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-button text-2xl cursor-pointer md:hidden"
            >
              ☰
            </button>

            <nav className={`navbar absolute top-16 right-0 bg-white shadow-md rounded-md z-50 w-40 flex-col ${menuOpen ? "flex" : "hidden"} md:static md:flex-row md:flex md:bg-transparent md:shadow-none md:w-auto`}>
              <ul className="list-none m-0 p-0 flex flex-col md:flex-row gap-5">
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
