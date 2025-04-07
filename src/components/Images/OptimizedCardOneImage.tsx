"use client"

import { useState, useEffect } from 'react';

interface ImageSources {
  mobile: string[];
  tablet: string[];
  desktop: string[];
  largeScreen: string[];
}

const CardOneImage = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('mobile');

  const imageSources: ImageSources = {
    mobile: [
      '/images/mobile/card-one [Mobile]/card-one [Mobile]_0.5x.webp',
      '/images/mobile/card-one [Mobile]/card-one [Mobile]_1x.webp',
      '/images/mobile/card-one [Mobile]/card-one [Mobile]_2x.webp',
      '/images/mobile/card-one [Mobile]/card-one [Mobile]_3x.webp',
      '/images/mobile/card-one [Mobile]/card-one [Mobile]_4x.webp',
    ],
    tablet: [
      '/images/tablet/card-one [Tablet]/card-one [Tablet]_0.5x.webp',
      '/images/tablet/card-one [Tablet]/card-one [Tablet]_1x.webp',
      '/images/tablet/card-one [Tablet]/card-one [Tablet]_2x.webp',
      '/images/tablet/card-one [Tablet]/card-one [Tablet]_3x.webp',
      '/images/tablet/card-one [Tablet]/card-one [Tablet]_4x.webp',
    ],
    desktop: [
      '/images/desktop/card-one [Desktop]/card-one [Desktop]_0.5x.webp',
      '/images/desktop/card-one [Desktop]/card-one [Desktop]_1x.webp',
      '/images/desktop/card-one [Desktop]/card-one [Desktop]_2x.webp',
      '/images/desktop/card-one [Desktop]/card-one [Desktop]_3x.webp',
      '/images/desktop/card-one [Desktop]/card-one [Desktop]_4x.webp',
    ],
    largeScreen: [
      '/images/large-screens/card-one [Large Screens]/card-one [Large Screens]_0.5x.webp',
      '/images/large-screens/card-one [Large Screens]/card-one [Large Screens]_1x.webp',
      '/images/large-screens/card-one [Large Screens]/card-one [Large Screens]_2x.webp',
      '/images/large-screens/card-one [Large Screens]/card-one [Large Screens]_3x.webp',
      '/images/large-screens/card-one [Large Screens]/card-one [Large Screens]_4x.webp',
    ],
  };

  // ... same useEffect as FoundationImage ...

  return (
    <picture>
      {/* Mobile sources */}
      <source
        media="(max-width: 767px)"
        srcSet={`
          ${imageSources.mobile[0]} 0.5x,
          ${imageSources.mobile[1]} 1x,
          ${imageSources.mobile[2]} 2x,
          ${imageSources.mobile[3]} 3x,
          ${imageSources.mobile[4]} 4x
        `}
        type="image/webp"
      />
      
      {/* ... other sources same as FoundationImage ... */}
      
      {/* Fallback image */}
      <img
        src={imageSources[currentBreakpoint as keyof ImageSources][1]}
        alt="Card One"
        className="w-full h-[200px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    </picture>
  );
};

export default CardOneImage; 