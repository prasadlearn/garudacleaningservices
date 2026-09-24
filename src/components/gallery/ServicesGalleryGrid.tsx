import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES_GALLERY_CARDS } from '../../data/galleryData';
import { SafeImage } from '../SafeImage';
import { useQuoteModal } from '../../context/QuoteModalContext';
import { trackEvent } from '../../utils/analytics';

export const ServicesGalleryGrid: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#22AC33] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Service Range</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
            Specialized Service Categories
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From single-room deep cleaning to complete commercial spaces, explore our full spectrum of professional services in Tirupati.
          </p>
        </div>

        {/* 6 Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_GALLERY_CARDS.map((card) => (
            <div
              key={card.slug}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <SafeImage
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/15">
                  {card.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-[#041B3B] mb-2 group-hover:text-[#22AC33] transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed flex-1">
                  {card.description}
                </p>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    to={`/services/${card.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#041B3B] hover:text-[#22AC33] transition-colors"
                  >
                    <span>View Inclusions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => {
                      trackEvent('book_click', { serviceSlug: card.slug, sourcePage: 'gallery_service_card' });
                      openModal();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#22AC33]/10 hover:bg-[#22AC33] text-[#22AC33] hover:text-white font-bold text-xs transition-colors duration-200 cursor-pointer"
                  >
                    Book This
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
