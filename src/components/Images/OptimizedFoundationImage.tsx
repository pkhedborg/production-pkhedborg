"use client"

import { useState, useEffect } from 'react';

interface ImageSources {
  mobile: string[];
  tablet: string[];
  desktop: string[];
  largeScreen: string[];
}

const FoundationImage = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('mobile');

  // Define image sources for each breakpoint and resolution
  const imageSources: ImageSources = {
    mobile: [
      '/images/mobile/Foundation [Mobile]/Foundation [Mobile]_0.5x.webp',
      '/images/mobile/Foundation [Mobile]/Foundation [Mobile]_1x.webp',
      '/images/mobile/Foundation [Mobile]/Foundation [Mobile]_2x.webp',
      '/images/mobile/Foundation [Mobile]/Foundation [Mobile]_3x.webp',
      '/images/mobile/Foundation [Mobile]/Foundation [Mobile]_4x.webp',
    ],
    tablet: [
      '/images/tablet/Foundation [Tablet]/Foundation [Tablet]_0.5x.webp',
      '/images/tablet/Foundation [Tablet]/Foundation [Tablet]_1x.webp',
      '/images/tablet/Foundation [Tablet]/Foundation [Tablet]_2x.webp',
      '/images/tablet/Foundation [Tablet]/Foundation [Tablet]_3x.webp',
      '/images/tablet/Foundation [Tablet]/Foundation [Tablet]_4x.webp',
    ],
    desktop: [
      '/images/desktop/Foundation [Desktop]/Foundation [Desktop]_0.5x.webp',
      '/images/desktop/Foundation [Desktop]/Foundation [Desktop]_1x.webp',
      '/images/desktop/Foundation [Desktop]/Foundation [Desktop]_2x.webp',
      '/images/desktop/Foundation [Desktop]/Foundation [Desktop]_3x.webp',
      '/images/desktop/Foundation [Desktop]/Foundation [Desktop]_4x.webp',
    ],
    largeScreen: [
      '/images/large-screens/Foundation [Large Screens]/Foundation [Large Screens]_0.5x.webp',
      '/images/large-screens/Foundation [Large Screens]/Foundation [Large Screens]_1x.webp',
      '/images/large-screens/Foundation [Large Screens]/Foundation [Large Screens]_2x.webp',
      '/images/large-screens/Foundation [Large Screens]/Foundation [Large Screens]_3x.webp',
      '/images/large-screens/Foundation [Large Screens]/Foundation [Large Screens]_4x.webp',
    ],
  };

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCurrentBreakpoint('mobile');
      } else if (width < 1024) {
        setCurrentBreakpoint('tablet');
      } else if (width < 1440) {
        setCurrentBreakpoint('desktop');
      } else {
        setCurrentBreakpoint('largeScreen');
      }
    };

    // Initial check
    updateBreakpoint();

    // Add event listener for window resize
    window.addEventListener('resize', updateBreakpoint);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return (
    <picture className="block w-full">
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
      
      {/* Tablet sources */}
      <source
        media="(min-width: 768px) and (max-width: 1023px)"
        srcSet={`
          ${imageSources.tablet[0]} 0.5x,
          ${imageSources.tablet[1]} 1x,
          ${imageSources.tablet[2]} 2x,
          ${imageSources.tablet[3]} 3x,
          ${imageSources.tablet[4]} 4x
        `}
        type="image/webp"
      />
      
      {/* Desktop sources */}
      <source
        media="(min-width: 1024px) and (max-width: 1439px)"
        srcSet={`
          ${imageSources.desktop[0]} 0.5x,
          ${imageSources.desktop[1]} 1x,
          ${imageSources.desktop[2]} 2x,
          ${imageSources.desktop[3]} 3x,
          ${imageSources.desktop[4]} 4x
        `}
        type="image/webp"
      />
      
      {/* Large screen sources */}
      <source
        media="(min-width: 1440px)"
        srcSet={`
          ${imageSources.largeScreen[0]} 0.5x,
          ${imageSources.largeScreen[1]} 1x,
          ${imageSources.largeScreen[2]} 2x,
          ${imageSources.largeScreen[3]} 3x,
          ${imageSources.largeScreen[4]} 4x
        `}
        type="image/webp"
      />
      
      {/* Fallback image */}
      <img
        src={imageSources[currentBreakpoint as keyof ImageSources][1]}
        alt="Foundation"
        className="w-full aspect-[4/3] object-cover"
        loading="lazy"
      />
    </picture>
  );
};

export default FoundationImage;