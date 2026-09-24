import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Maximize2 } from 'lucide-react';
import type { GalleryEntry } from '../data/galleryData';
import { SafeImage } from './SafeImage';

interface ImageCompareSliderProps {
  entry: GalleryEntry;
  className?: string;
  initialPos?: number;
  showHint?: boolean;
  onExpand?: () => void;
  priority?: boolean;
}

export const ImageCompareSlider: React.FC<ImageCompareSliderProps> = ({
  entry,
  className = '',
  initialPos = 50,
  showHint = true,
  onExpand,
  priority = false
}) => {
  const [sliderPos, setSliderPos] = useState<number>(initialPos);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hintVisible, setHintVisible] = useState<boolean>(showHint);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  // Set initial CSS variable
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--clip-pos', `${initialPos}%`);
    }
  }, [initialPos]);

  // Fade out hint after 4 seconds
  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => {
      setHintVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [showHint]);

  // One-time intro sweep animation when scrolled into view
  useEffect(() => {
    if (hasAnimated || !containerRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          // Sweep sequence: 50% -> 35% -> 65% -> 50%
          const startTime = performance.now();
          const duration = 1200; // ms

          const animateSweep = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Sine wave excursion around 50%
            let pos = 50;
            if (progress < 1) {
              pos = 50 + Math.sin(progress * Math.PI * 2) * 15;
            } else {
              pos = 50;
            }

            if (containerRef.current) {
              containerRef.current.style.setProperty('--clip-pos', `${pos}%`);
            }

            if (progress < 1) {
              requestAnimationFrame(animateSweep);
            } else {
              setSliderPos(50);
            }
          };

          requestAnimationFrame(animateSweep);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--clip-pos', `${percentage}%`);
      }
    });

    setSliderPos(percentage);
    setHintVisible(false);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // If clicking maximize button, do not start drag
    if ((e.target as HTMLElement).closest('button')) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let newPos = sliderPos;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newPos = Math.max(0, sliderPos - 5);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      newPos = Math.min(100, sliderPos + 5);
    } else if (e.key === 'Home') {
      e.preventDefault();
      newPos = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newPos = 100;
    } else {
      return;
    }

    setSliderPos(newPos);
    if (containerRef.current) {
      containerRef.current.style.setProperty('--clip-pos', `${newPos}%`);
    }
    setHintVisible(false);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        touchAction: 'pan-y',
        ['--clip-pos' as any]: `${sliderPos}%`
      }}
      className={`relative select-none overflow-hidden rounded-3xl bg-slate-950 aspect-[4/3] sm:aspect-[16/10] cursor-ew-resize group border border-slate-200 shadow-md ${className}`}
    >
      {/* 1. Underlying Base Layer: After Clean Image (revealed on the right side) */}
      <div className="absolute inset-0 w-full h-full">
        <SafeImage
          src={entry.after}
          alt={`${entry.title} - After Cleaning, Tirupati`}
          width={1200}
          height={750}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* 2. Top Layer: Before Dirty Image (clipped from 0 to --clip-pos on the left side) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{
          clipPath: 'inset(0 calc(100% - var(--clip-pos, 50%)) 0 0)'
        }}
      >
        <SafeImage
          src={entry.before}
          alt={`${entry.title} - Before Cleaning, Tirupati`}
          width={1200}
          height={750}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Left / Top Right Badges */}
      <div className="absolute top-4 left-4 z-[var(--z-content)] pointer-events-none flex flex-col gap-1.5">
        <span className="px-3 py-1 bg-red-600 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-md">
          Before
        </span>
      </div>

      <div className="absolute top-4 right-4 z-[var(--z-content)] pointer-events-none flex items-center gap-2">
        <span className="px-3 py-1 bg-[#22AC33] text-white font-black text-xs uppercase tracking-wider rounded-full shadow-md">
          After
        </span>
        {onExpand && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            aria-label="View Fullscreen Lightbox"
            className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-md pointer-events-auto transition-transform hover:scale-110 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Center Top Non-Overlapping Hint (Placed below top chips, fades out after drag / 4s) */}
      <div
        className={`absolute top-14 left-1/2 -translate-x-1/2 z-[var(--z-content)] pointer-events-none transition-opacity duration-500 ${
          hintVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white/95 text-[11px] font-medium rounded-full shadow-sm whitespace-nowrap">
          Drag slider left or right to compare
        </span>
      </div>

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-[var(--z-content)] w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)] pointer-events-none"
        style={{ left: 'var(--clip-pos, 50%)' }}
      >
        {/* Round Draggable Handle */}
        <div
          ref={handleRef}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPos)}
          aria-label="Image comparison slider"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#041B3B] shadow-2xl flex items-center justify-center font-black text-xs border-2 border-[#22AC33] pointer-events-auto focus:outline-none focus:ring-4 focus:ring-[#22AC33]/50 transition-transform group-hover:scale-105 cursor-ew-resize"
        >
          <span className="tracking-tighter text-[11px] font-mono text-[#041B3B]">⟨ ⟩</span>
        </div>
      </div>
    </div>
  );
};

export default ImageCompareSlider;
