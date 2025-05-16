import { publications, Publication } from '../data';

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function PublicationDetail({ params }: PageProps) {
  const publication = publications.find((pub: Publication) => pub.slug === params.slug);

  if (!publication) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-carolina">Publication Not Found</h1>
          <p className="text-gray-600">Sorry, we couldn&#39;t find the publication you were looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full flex flex-col items-center">
        <img src={publication.image} alt={publication.title} className="w-64 h-64 object-cover rounded mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-carolina text-center">{publication.title}</h1>
        <p className="text-gray-700 mb-2 text-center">{publication.authors}</p>
        <p className="text-gray-500 mb-4 text-center">{publication.meta}</p>
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {publication.tags.map((tag: string) => (
            <span key={tag} className="bg-carolina text-white px-2 py-1 rounded text-xs">{tag}</span>
          ))}
        </div>
        {publication.link && (
          <a href={publication.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-carolina text-white px-6 py-2 rounded font-semibold shadow hover:bg-carolina/90 transition">
            View Full Publication
          </a>
        )}
      </div>
    </div>
  );
} 