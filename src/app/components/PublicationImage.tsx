'use client';

import Image from 'next/image';

interface PublicationImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function PublicationImage({ src, alt, width, height, className }: PublicationImageProps) {
  const fallbackImage = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80";

  return (
    <Image 
      src={src && src.trim() !== "" ? src : fallbackImage} 
      alt={alt} 
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        console.log(`Failed to load image for ${alt}:`, src);
        e.currentTarget.src = fallbackImage;
      }}
    />
  );
} 