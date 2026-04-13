import type { Metadata } from 'next';
import { config } from '@/lib/config';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: `${config.lab.name} | ${config.lab.university}`,
  description: config.lab.description,
  keywords: 'graphics, virtual reality, telepresence, UNC, Chapel Hill, Henry Fuchs, 3D displays, AR, VR',
  openGraph: {
    title: `${config.lab.name} | ${config.lab.university}`,
    description: config.lab.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
