"use client"

import { useState } from 'react';
import Image from 'next/image';

interface OptimizedCardOneImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const OptimizedCardOneImage = ({ src, alt, priority = false }: OptimizedCardOneImageProps) => {
  const [currentBreakpoint] = useState('default'); // Remove if not needed

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
    </div>
  );
};

export default OptimizedCardOneImage; 