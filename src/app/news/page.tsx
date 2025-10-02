'use client'
import '../animations.css';
import Image from 'next/image';
import Link from 'next/link';

export default function News() {
  const articles = [
    {
      title: 'Lab achieves milestone in computational imaging',
      date: 'Sep 15, 2025',
      excerpt:
        'Our team announces a significant breakthrough in computational imaging, paving the way for higher fidelity and efficiency in real-world systems.',
      image:
        'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=2069&auto=format&fit=crop',
      href: '#',
    },
    {
      title: 'VCAIL welcomes new PhD students',
      date: 'Aug 28, 2025',
      excerpt:
        'We are excited to welcome a new cohort of PhD students joining projects across AR/VR, vision, and nano-optics.',
      image:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2032&auto=format&fit=crop',
      href: '#',
    },
    {
      title: 'Faculty recognized with best paper award',
      date: 'Jul 10, 2025',
      excerpt:
        'VCAIL researchers received a best paper recognition at a premier venue for their work on multimodal perception.',
      image:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2069&auto=format&fit=crop',
      href: '#',
    },
  ];

  return (
    <div className="fade-in font-sans bg-neutral-50 text-neutral-900">
      {/* Hero banner section */}
      <div className="w-full h-64 md:h-80 relative mb-8">
        <Image 
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
          alt="Latest research news and updates" 
          fill
          className="object-cover object-center rounded-b-lg shadow-md" 
        />
      </div>

      {/* News Philosophy - Dome Copper translucent banner */}
      <div className="w-full bg-campus-sandstone backdrop-blur-sm py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold text-dome-copper text-center mb-3">LATEST NEWS</h2>
          <p className="text-md text-neutral-700 max-w-4xl mx-auto leading-relaxed">
            Stay up to date with our latest research breakthroughs, publications, awards, and lab updates. 
            Discover the cutting-edge work happening at VCAIL.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="space-y-10">
          
          {/* News Section */}
          <section className="section-card">
            <div className="mb-8">
              <h2 className="section-title">RECENT UPDATES</h2>
            </div>

            {/* One-column News List */}
            <div className="grid grid-cols-1 gap-6">
              {articles.map((article, index) => (
                <article
                  key={index}
                  className="group transition-all duration-300 stagger-item bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-2xl transform hover:-translate-y-2 unc-shadow-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {article.image && (
                    <div className="w-full h-56 relative mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="text-sm text-neutral-500 mb-2">{article.date}</div>
                  <h3 className="text-xl font-semibold text-carolina-blue mb-2 group-hover:text-unc-navy transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-neutral-700 mb-4">{article.excerpt}</p>
                  <div>
                    <Link
                      href={article.href}
                      className="inline-flex items-center gap-2 bg-carolina-blue text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-unc-navy"
                    >
                      Read more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
