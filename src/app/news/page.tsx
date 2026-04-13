import { getNews } from '@/lib/data';

const TYPE_STYLES: Record<string, { label: string; color: string }> = {
  award:  { label: 'Award',  color: 'bg-yellow-500' },
  paper:  { label: 'Paper',  color: 'bg-blue-500' },
  talk:   { label: 'Talk',   color: 'bg-purple-500' },
  media:  { label: 'Media',  color: 'bg-green-500' },
  hiring: { label: 'Hiring', color: 'bg-teal-500' },
  other:  { label: 'News',   color: 'bg-gray-400' },
};

export default function NewsPage() {
  const news = getNews();

  return (
    <div>
      <div className="page-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1>News</h1>
          <p>Latest updates from our group</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6">
          {news.map(item => {
            const style = TYPE_STYLES[item.type] ?? TYPE_STYLES.other;
            return (
              <div key={item.id} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
                    <span className={`inline-block w-3 h-3 rounded-full ${style.color}`} />
                    <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{style.label}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--unc-blue)] transition-colors">
                          {item.title}
                        </a>
                      ) : item.title}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{item.summary}</p>
                    <time className="text-xs mt-2 block" style={{ color: 'var(--text-muted)' }}>
                      {new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
