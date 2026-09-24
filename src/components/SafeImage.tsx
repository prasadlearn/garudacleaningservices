import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export interface SafeImageProps {
  src?: string | null;
  alt: string; // Required by spec
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  fallbackIcon?: React.ComponentType<{ className?: string }>;
  fallbackLabel?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  className = '',
  fallbackIcon: FallbackIcon = Sparkles,
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  // If no source provided or failed loading, render branded fallback
  if (!src || hasError) {
    return (
      <div
        className={`bg-gradient-to-br from-[#041B3B] via-[#07254D] to-[#1A8C28]/60 flex flex-col items-center justify-center p-3 text-center select-none overflow-hidden relative ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,172,51,0.2)_0%,transparent_70%)] pointer-events-none" />
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center text-[#4ADE80] mb-1.5 shadow-xs border border-white/15">
          <FallbackIcon className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-bold text-white/90 tracking-wide uppercase leading-tight line-clamp-1">
          {fallbackLabel || alt}
        </span>
        <span className="text-[9px] text-white/60 mt-0.5 font-medium">
          Garuda Cleaning
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default SafeImage;
