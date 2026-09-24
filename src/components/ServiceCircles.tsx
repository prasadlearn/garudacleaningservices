import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { getEnabledServices } from '../data/servicesData';
import { SafeImage } from './SafeImage';

export const ServiceCircles: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const enabledServices = getEnabledServices();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Double the list for infinite seamless marquee loop
  const duplicatedCircles = [...enabledServices, ...enabledServices];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white overflow-hidden border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="homecare-pill mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Our Services
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] mt-1 tracking-tight">
            Cleaning Services in Tirupati
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tap any service to view what is included and check prices.
          </p>
        </div>

        {/* Continuous Auto-Moving Infinite Slider with Hover Pause */}
        <div className="relative group/carousel">
          {/* Manual control arrows for user convenience */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-[var(--z-content)] w-10 h-10 rounded-full bg-white/95 text-[#041B3B] shadow-xl border border-slate-200 flex items-center justify-center hover:bg-[#22AC33] hover:text-white transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 -ml-2 sm:-ml-5"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-[var(--z-content)] w-10 h-10 rounded-full bg-white/95 text-[#041B3B] shadow-xl border border-slate-200 flex items-center justify-center hover:bg-[#22AC33] hover:text-white transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 -mr-2 sm:-mr-5"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Infinite Marquee Track that continuously moves */}
          <div
            ref={scrollRef}
            className="overflow-hidden w-full py-4 mask-gradient"
          >
            <div className="flex gap-8 sm:gap-12 animate-circle-marquee hover:[animation-play-state:paused] w-max cursor-grab active:cursor-grabbing">
              {duplicatedCircles.map((service, i) => (
                <Link
                  key={`${service.id}-${i}`}
                  to={`/services/${service.slug}`}
                  className="flex flex-col items-center gap-3 shrink-0 group/circle transition-transform duration-300 hover:scale-105"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-slate-200 group-hover/circle:border-[#22AC33] transition-all duration-300 shadow-md group-hover/circle:shadow-xl relative bg-slate-900">
                    <SafeImage
                      src={service.image}
                      alt={service.title}
                      loading="eager"
                      fallbackLabel={service.title}
                      className="w-full h-full object-cover group-hover/circle:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#041B3B] group-hover/circle:text-[#22AC33] transition-colors text-center max-w-[110px] leading-tight">
                    {service.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
