import { useState, useEffect } from 'react';

interface ImageSources {
  mobile: string[];
  tablet: string[];
  desktop: string[];
  largeScreen: string[];
}

const ApplyImage = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('mobile');

  const imageSources: ImageSources = {
    mobile: [
      '/images/mobile/Apply [Mobile]/Apply [Mobile]_0.5x.webp',
      '/images/mobile/Apply [Mobile]/Apply [Mobile]_1x.webp',
      '/images/mobile/Apply [Mobile]/Apply [Mobile]_2x.webp',
      '/images/mobile/Apply [Mobile]/Apply [Mobile]_3x.webp',
      '/images/mobile/Apply [Mobile]/Apply [Mobile]_4x.webp',
    ],
    tablet: [
      '/images/tablet/Apply [Tablet]/Apply [Tablet]_0.5x.webp',
      '/images/tablet/Apply [Tablet]/Apply [Tablet]_1x.webp',
      '/images/tablet/Apply [Tablet]/Apply [Tablet]_2x.webp',
      '/images/tablet/Apply [Tablet]/Apply [Tablet]_3x.webp',
      '/images/tablet/Apply [Tablet]/Apply [Tablet]_4x.webp',
    ],
    desktop: [
      '/images/desktop/Apply [Desktop]/Apply [Desktop]_0.5x.webp',
      '/images/desktop/Apply [Desktop]/Apply [Desktop]_1x.webp',
      '/images/desktop/Apply [Desktop]/Apply [Desktop]_2x.webp',
      '/images/desktop/Apply [Desktop]/Apply [Desktop]_3x.webp',
      '/images/desktop/Apply [Desktop]/Apply [Desktop]_4x.webp',
    ],
    largeScreen: [
      '/images/large-screens/Apply [Large Screens]/Apply [Large Screens]_0.5x.webp',
      '/images/large-screens/Apply [Large Screens]/Apply [Large Screens]_1x.webp',
      '/images/large-screens/Apply [Large Screens]/Apply [Large Screens]_2x.webp',
      '/images/large-screens/Apply [Large Screens]/Apply [Large Screens]_3x.webp',
      '/images/large-screens/Apply [Large Screens]/Apply [Large Screens]_4x.webp',
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
    <picture className="w-full h-full">
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
        alt="Apply hero background"
        className="w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
    </picture>
  );
};

export default ApplyImage;