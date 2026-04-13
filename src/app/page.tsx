import Link from 'next/link';
import Image from 'next/image';
import { config } from '@/lib/config';
import { getNews, getPublications, getPeople } from '@/lib/data';

export default function HomePage() {
  const news = getNews().slice(0, 3);
  const featured = getPublications().filter(p => p.featured).slice(0, 3);
  const recentPubs = featured.length > 0 ? featured : getPublications().slice(0, 3);
  const people = getPeople();
  const faculty = people.filter(p => p.role === 'faculty');

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--unc-blue)] text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {config.lab.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mb-4">
            {config.lab.department} &middot; {config.lab.university}
          </p>
          <p className="text-base sm:text-lg text-white/70 max-w-4xl leading-relaxed">
            {config.lab.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/research" className="inline-block bg-[var(--unc-navy)] hover:bg-[#1a3a5c] text-white font-medium px-6 py-3 rounded-lg transition-colors">
              Our Research
            </Link>
            <Link href="/publications" className="inline-block border border-white/30 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition-colors">
              Publications
            </Link>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Faculty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map(person => (
              <div key={person.id} className="card p-6 flex flex-col items-center text-center">
                {person.photoPath ? (
                  <Image src={person.photoPath} alt={person.name} width={96} height={96} className="w-24 h-24 rounded-full object-cover mb-4" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[var(--unc-blue)] flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{person.name}</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{person.title}</p>
                {person.website && (
                  <a href={person.website} target="_blank" rel="noopener noreferrer" className="text-[var(--unc-blue)] text-sm mt-2 hover:underline">
                    Homepage
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Recent Publications</h2>
            <Link href="/publications" className="text-[var(--unc-blue)] hover:underline font-medium">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPubs.map(pub => (
              <Link key={pub.id} href={`/publications/${pub.id}`} className="card p-6 hover:border-[var(--unc-blue)] transition-colors block">
                <span className="badge">{pub.venue}</span>
                <h3 className="font-semibold mt-3 mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>{pub.title}</h3>
                <p className="text-sm line-clamp-1" style={{ color: 'var(--text-muted)' }}>
                  {pub.authors.slice(0, 3).join(', ')}{pub.authors.length > 3 ? ' et al.' : ''}
                </p>
                <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{pub.year}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News */}
      {news.length > 0 && (
        <section className="py-16" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Recent News</h2>
              <Link href="/news" className="text-[var(--unc-blue)] hover:underline font-medium">
                View all &rarr;
              </Link>
            </div>
            <div className="space-y-4">
              {news.map(item => (
                <div key={item.id} className="card p-6">
                  <div className="flex items-start gap-4">
                    <span className={`inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      item.type === 'award' ? 'bg-yellow-500' :
                      item.type === 'paper' ? 'bg-[var(--unc-blue)]' :
                      item.type === 'talk' ? 'bg-purple-500' :
                      item.type === 'media' ? 'bg-green-500' :
                      item.type === 'hiring' ? 'bg-teal-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{item.summary}</p>
                      <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
