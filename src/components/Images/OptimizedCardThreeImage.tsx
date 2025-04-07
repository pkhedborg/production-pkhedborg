 "use client"

import { useState, useEffect } from 'react';

interface ImageSources {
  mobile: string[];
  tablet: string[];
  desktop: string[];
  largeScreen: string[];
}

const CardThreeImage = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('mobile');

  const imageSources: ImageSources = {
    mobile: [
      '/images/mobile/card-three [Mobile]/card-three [Mobile]_0.5x.webp',
      '/images/mobile/card-three [Mobile]/card-three [Mobile]_1x.webp',
      '/images/mobile/card-three [Mobile]/card-three [Mobile]_2x.webp',
      '/images/mobile/card-three [Mobile]/card-three [Mobile]_3x.webp',
      '/images/mobile/card-three [Mobile]/card-three [Mobile]_4x.webp',
    ],
    tablet: [
      '/images/tablet/card-three [Tablet]/card-three [Tablet]_0.5x.webp',
      '/images/tablet/card-three [Tablet]/card-three [Tablet]_1x.webp',
      '/images/tablet/card-three [Tablet]/card-three [Tablet]_2x.webp',
      '/images/tablet/card-three [Tablet]/card-three [Tablet]_3x.webp',
      '/images/tablet/card-three [Tablet]/card-three [Tablet]_4x.webp',
    ],
    desktop: [
      '/images/desktop/card-three [Desktop]/card-three [Desktop]_0.5x.webp',
      '/images/desktop/card-three [Desktop]/card-three [Desktop]_1x.webp',
      '/images/desktop/card-three [Desktop]/card-three [Desktop]_2x.webp',
      '/images/desktop/card-three [Desktop]/card-three [Desktop]_3x.webp',
      '/images/desktop/card-three [Desktop]/card-three [Desktop]_4x.webp',
    ],
    largeScreen: [
      '/images/large-screens/card-three [Large Screens]/card-three [Large Screens]_0.5x.webp',
      '/images/large-screens/card-three [Large Screens]/card-three [Large Screens]_1x.webp',
      '/images/large-screens/card-three [Large Screens]/card-three [Large Screens]_2x.webp',
      '/images/large-screens/card-three [Large Screens]/card-three [Large Screens]_3x.webp',
      '/images/large-screens/card-three [Large Screens]/card-three [Large Screens]_4x.webp',
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

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return (
    <picture>
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
      
      <img
        src={imageSources[currentBreakpoint as keyof ImageSources][1]}
        alt="Card Three"
        className="w-full h-[200px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    </picture>
  );
};

export default CardThreeImage;