import { publications, Publication } from '../data';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function PublicationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const publication = publications.find((pub: Publication) => pub.slug === slug);

  if (!publication) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{publication.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{publication.authors}</p>
          <p className="text-md text-gray-500 mb-6">{publication.meta}</p>
          
          <Image 
            src={publication.image} 
            alt={publication.title} 
            width={256}
            height={256}
            className="object-cover rounded mb-6" 
          />
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
    </div>
  );
} 