'use client'
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "#f7f7f7",
          color: "black",
          margin: 0,
          paddingTop: "60px", // give room for fixed header
          fontFamily: "sans-serif",
        }}
      >
        <header
          style={{
            width: "100%",
            height: "60px",
            background: "linear-gradient(135deg, #ece9e6, #ffffff)",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "fixed",
            top: 0,
            left: 0,
            padding: "0 30px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            fontFamily: "'Courier New', Courier, monospace",
            fontWeight: "bold",
            zIndex: 1000,
          }}
        >
          <h1 style={{ fontSize: "1.2rem", margin: 0 }}>
            <Link href="/" legacyBehavior>
              <a style={{ color: "inherit", textDecoration: "none" }}>
                Visual Computing & Augmented Intelligence Lab
              </a>
            </Link>
          </h1>
          <nav>
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                gap: "20px",
                margin: 0,
                padding: 0,
              }}
            >
              {[
                { label: "HOME", href: "/" },
                { label: "PEOPLE", href: "./people" },
                { label: "PROJECTS", href: "./projects" },
                { label: "PUBLICATIONS", href: "./publications" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} legacyBehavior>
                    <a
                      style={{
                        color: "#333",
                        textDecoration: "none",
                        fontWeight: "bold",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "#ddd";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "transparent";
                      }}
                    >
                      {item.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
