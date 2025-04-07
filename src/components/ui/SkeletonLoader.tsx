import React from "react";

interface SkeletonLoaderProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      <div className="h-8 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      <div className="h-48 bg-gray-300 rounded-lg"></div>
    </div>
  );
};

export default SkeletonLoader;
