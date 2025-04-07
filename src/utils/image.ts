interface ImageAsset {
  asset: {
    url: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export function generateImageUrl(image: ImageAsset): string {
  if (!image?.asset?.url) return '';
  
  const baseUrl = image.asset.url;
  
  // If there's no crop or hotspot, return the base URL
  if (!image.crop && !image.hotspot) return baseUrl;
  
  // Calculate the crop parameters
  if (image.crop) {
    const { top, bottom, left, right } = image.crop;
    const originalHeight = 1280; // From the image URL we can see this
    const originalWidth = 853;  // From the image URL we can see this
    
    const cropTop = Math.round(top * originalHeight);
    const cropBottom = Math.round((1 - bottom) * originalHeight);
    const cropLeft = Math.round(left * originalWidth);
    const cropRight = Math.round((1 - right) * originalWidth);
    
    const width = originalWidth - cropLeft - cropRight;
    const height = originalHeight - cropTop - cropBottom;
    
    return `${baseUrl}?rect=${cropLeft},${cropTop},${width},${height}`;
  }
  
  return baseUrl;
} 