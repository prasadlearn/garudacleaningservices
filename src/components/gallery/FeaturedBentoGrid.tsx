import React from 'react';
import { ZoomIn, MapPin, Sparkles } from 'lucide-react';
import type { GalleryItem } from '../../data/galleryData';
import { SafeImage } from '../SafeImage';

interface FeaturedBentoGridProps {
  items: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

export const FeaturedBentoGrid: React.FC<FeaturedBentoGridProps> = ({
  items,
  onOpenLightbox
}) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Project Highlights</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
            Featured Cleaning Projects
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Click any photo to view full-resolution details, room specifications, and localized work notes.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] sm:auto-rows-[320px]">
          {items.map((item, index) => {
            const spanClass = item.bentoSpan || 'col-span-1';

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(index)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/80 bg-slate-900 ${spanClass}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041B3B]/95 via-[#041B3B]/40 to-transparent transition-opacity duration-300" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#041B3B] text-xs font-bold shadow-xs">
                    {item.category}
                  </span>
                  {item.locality && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
                      <MapPin className="w-3 h-3 text-[#22AC33]" />
                      {item.locality}
                    </span>
                  )}
                </div>

                {/* Hover Zoom Icon Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white transform transition-transform duration-300">
                  <h3 className="text-base sm:text-xl font-bold leading-snug text-white mb-1 drop-shadow-xs">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
