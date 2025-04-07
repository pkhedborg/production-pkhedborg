import { useState, useEffect } from 'react';

interface BoardImageProps {
  member: string;
  alt: string;
  className?: string;
}

const BoardImage = ({ member, alt, className = "" }: BoardImageProps) => {
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);

  useEffect(() => {
    setDevicePixelRatio(window.devicePixelRatio || 1);
  }, []);

  const getImageSources = (memberName: string) => [
    `/icons/foundation/${memberName}/${memberName}_0.5x.webp`,
    `/icons/foundation/${memberName}/${memberName}_1x.webp`,
    `/icons/foundation/${memberName}/${memberName}_2x.webp`,
    `/icons/foundation/${memberName}/${memberName}_3x.webp`,
    `/icons/foundation/${memberName}/${memberName}_4x.webp`,
  ];

  const sources = getImageSources(member);

  return (
    <picture>
      <source
        srcSet={`
          ${sources[0]} 0.5x,
          ${sources[1]} 1x,
          ${sources[2]} 2x,
          ${sources[3]} 3x,
          ${sources[4]} 4x
        `}
        type="image/webp"
      />
      
      {/* Fallback image */}
      <img
        src={sources[Math.min(Math.floor(devicePixelRatio), 4)]}
        alt={alt}
        className={`w-full h-full object-contain ${className}`}
        loading="lazy"
      />
    </picture>
  );
};

export default BoardImage;