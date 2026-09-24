import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, ArrowRight } from 'lucide-react';
import { getActiveGalleryEntries } from '../data/galleryData';
import { SafeImage } from './SafeImage';
import { GalleryModal } from './GalleryModal';
import { useQuoteModal } from '../context/QuoteModalContext';
import { trackEvent } from '../utils/analytics';

export const BeforeAfterStrip: React.FC = () => {
  const entries = getActiveGalleryEntries();
  const { openModal } = useQuoteModal();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Requirement: hide completely while fewer than 3 real entries exist site-wide
  if (entries.length < 3) {
    return null;
  }

  const displayEntries = entries.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="homecare-pill mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Transformations
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1">
            Real Before & After Cleaning Results
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Authentic transformations from residential and commercial sites across Tirupati.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayEntries.map((entry, idx) => (
            <div
              key={entry.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Side-by-side Before/After clickable image pair */}
                <div
                  onClick={() => setSelectedIdx(idx)}
                  className="grid grid-cols-2 gap-1 p-2 bg-slate-100 cursor-pointer relative group"
                  title="Click to open interactive comparison slider"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
                    <SafeImage
                      src={entry.before}
                      alt={`${entry.title} Before`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-600/90 text-white font-black text-[10px] uppercase rounded-full">
                      Before
                    </span>
                  </div>

                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
                    <SafeImage
                      src={entry.after}
                      alt={`${entry.title} After`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#22AC33]/90 text-white font-black text-[10px] uppercase rounded-full">
                      After
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1 bg-white/90 text-[#041B3B] rounded-full text-xs font-bold shadow-md">
                      Slide to Compare ⟨ ⟩
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase text-[#22AC33] bg-emerald-50 px-2 py-0.5 rounded-md">
                      {entry.tag || 'Transformation'}
                    </span>
                    {entry.locality && (
                      <span className="text-[11px] text-slate-400">{entry.locality}</span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-[#041B3B] leading-snug">
                    {entry.title}
                  </h3>

                  <div className="space-y-1.5 text-xs">
                    <p className="text-slate-600 line-clamp-2">
                      <strong className="text-red-700 font-bold">Problem: </strong>
                      {entry.problem}
                    </p>
                    <p className="text-slate-600 line-clamp-2">
                      <strong className="text-emerald-700 font-bold">What we did: </strong>
                      {entry.work}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">Tirupati Project</span>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('book_click', { serviceSlug: entry.serviceSlug, sourcePage: 'before_after_strip' });
                    openModal({ serviceTitle: entry.title, sourcePage: '/gallery' });
                  }}
                  className="px-3 py-1.5 bg-[#FFD700] hover:bg-[#e6c200] text-[#041B3B] font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <Phone className="w-3 h-3" />
                  <span>Get Free Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#041B3B] hover:text-[#22AC33] transition-colors"
          >
            <span>Explore All Before & After Comparisons</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox compare modal */}
      {selectedIdx !== null && (
        <GalleryModal
          entries={displayEntries}
          currentIndex={selectedIdx}
          isOpen={true}
          onClose={() => setSelectedIdx(null)}
          onNavigate={(newIdx) => setSelectedIdx(newIdx)}
        />
      )}
    </section>
  );
};
