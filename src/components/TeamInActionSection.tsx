import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WorkPhoto {
  image: string;
  title: string;
  description: string;
  tag: string;
}

const WORK_PHOTOS: WorkPhoto[] = [
  {
    image: '/images/floor-clean.webp',
    title: 'Floor Cleaning',
    description: 'We use rotary floor scrubbers for deep tile and marble cleaning.',
    tag: 'Floors'
  },
  {
    image: '/images/kitchen-clean.webp',
    title: 'Kitchen Cleaning',
    description: 'Degreasing platforms, sinks, and tile backsplashes.',
    tag: 'Kitchen'
  },
  {
    image: '/images/bathroom-clean.webp',
    title: 'Bathroom Cleaning',
    description: 'Acid-free descaling of hard water stains on tiles and taps.',
    tag: 'Bathroom'
  },
  {
    image: '/images/sofa-clean.webp',
    title: 'Sofa Cleaning',
    description: 'Deep fabric vacuuming and gentle foam shampooing.',
    tag: 'Upholstery'
  },
  {
    image: '/images/hero-interior.webp',
    title: 'Living Room Cleaning',
    description: 'Floor wash, window wiping, and dusting throughout.',
    tag: 'Living Space'
  }
];

export const TeamInActionSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const updateActiveIndex = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 280; // approximate card step width
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), WORK_PHOTOS.length - 1));
    }
  }, []);

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 280;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const nextIndex = direction === 'left'
      ? Math.max(0, activeIndex - 1)
      : Math.min(WORK_PHOTOS.length - 1, activeIndex + 1);
    scrollToCard(nextIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handleScroll('left');
    } else if (e.key === 'ArrowRight') {
      handleScroll('right');
    }
  };

  // Gentle autoplay respecting prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % WORK_PHOTOS.length;
        scrollToCard(next);
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="py-14 sm:py-20 px-4 sm:px-8 bg-[#FAF5E9] border-b border-amber-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Our Work Areas Carousel"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Header & Description */}
          <div className="lg:col-span-4 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Our Work Areas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041B3B] leading-snug">
              Cleaning in Different Spaces
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We clean different parts of your home and workplace with specialized tools and surface-safe products.
            </p>

            {/* Navigation Buttons & Count */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-full bg-white border border-amber-200 text-[#041B3B] flex items-center justify-center shadow-xs hover:bg-[#22AC33] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#041B3B] transition-colors cursor-pointer"
                aria-label="Previous work photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={activeIndex === WORK_PHOTOS.length - 1}
                className="w-10 h-10 rounded-full bg-white border border-amber-200 text-[#041B3B] flex items-center justify-center shadow-xs hover:bg-[#22AC33] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#041B3B] transition-colors cursor-pointer"
                aria-label="Next work photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots indicator */}
              <div className="flex items-center gap-1.5 pl-2">
                {WORK_PHOTOS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => scrollToCard(dotIdx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeIndex === dotIdx ? 'w-6 bg-[#22AC33]' : 'w-2 bg-amber-300'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Swipeable Carousel with Peeking Cards */}
          <div className="lg:col-span-8 overflow-hidden">
            <div
              ref={scrollRef}
              onScroll={updateActiveIndex}
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
            >
              {WORK_PHOTOS.map((p, i) => (
                <div
                  key={i}
                  className="w-64 sm:w-72 rounded-2xl overflow-hidden shadow-xs bg-white border border-amber-200/80 flex flex-col shrink-0 snap-start group hover:shadow-md transition-shadow"
                >
                  <div className="h-44 sm:h-48 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#041B3B]/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {p.tag}
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <h3 className="text-sm font-extrabold text-[#041B3B]">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
