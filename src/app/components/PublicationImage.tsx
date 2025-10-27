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
  const fallbackImage = "/lab-photos/lab-work-09.jpg";

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