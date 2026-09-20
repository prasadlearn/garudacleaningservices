import React, { useRef } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const PHOTOS = [
  { image: '/images/floor-clean.jpg', label: 'Single-Disc Rotary Floor Scrubbing', tag: 'Tile & Marble' },
  { image: '/images/kitchen-clean.jpg', label: 'Modular Kitchen Degreasing & Wipe', tag: 'Oil & Chimney' },
  { image: '/images/bathroom-clean.jpg', label: 'Acid-Free Bathroom Tile Descaling', tag: 'Hard Water' },
  { image: '/images/sofa-clean.jpg', label: 'Upholstery Wet-Extraction Wash', tag: 'Sofa & Fabric' },
  { image: '/images/hero-interior.jpg', label: 'Post-Clean Living Room Inspection', tag: 'Final Handover' },
];

export const TeamInActionSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 bg-[#FAF5E9] border-b border-amber-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Compact Header and Story */}
          <div className="lg:col-span-4 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider">
              On-Site Work • Tirupati
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041B3B] leading-snug">
              See Our Cleaning Teams in Action
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Watch how our mechanized equipment extracts stubborn dirt, hard water mineral scale, and grease film across Tirupati homes.
            </p>

            {/* Scroll Navigation Controls */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-white border border-amber-200 text-[#041B3B] flex items-center justify-center shadow-xs hover:bg-[#22AC33] hover:text-white transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-white border border-amber-200 text-[#041B3B] flex items-center justify-center shadow-xs hover:bg-[#22AC33] hover:text-white transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-xs text-slate-500 font-semibold pl-2">
                Swipe or click to view
              </span>
            </div>
          </div>

          {/* Right Column: Controlled, Compact Horizontal Cards with Fixed Image Height */}
          <div className="lg:col-span-8 overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
            >
              {PHOTOS.map((p, i) => (
                <div
                  key={i}
                  className="w-60 sm:w-68 rounded-2xl overflow-hidden shadow-sm bg-white border border-amber-200/80 flex flex-col shrink-0 group hover:shadow-md transition-shadow"
                >
                  {/* Fixed 180px/200px image height so it never blows up */}
                  <div className="h-44 sm:h-48 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={p.image}
                      alt={p.label}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#041B3B]/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {p.tag}
                    </div>
                    <div className="absolute inset-0 bg-black/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-[#22AC33] text-white flex items-center justify-center shadow-md">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#041B3B] line-clamp-1 leading-tight">
                      {p.label}
                    </span>
                    <span className="text-[10px] font-extrabold text-[#22AC33] shrink-0">
                      Tirupati
                    </span>
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
