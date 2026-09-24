import React from 'react';
import { Sparkles, Calendar, MessageCircle } from 'lucide-react';
import { getGalleryEntriesForService } from '../data/galleryData';
import { ImageCompareSlider } from './ImageCompareSlider';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { trackEvent } from '../utils/analytics';

interface ServiceBeforeAfterProps {
  serviceSlug: string;
  serviceTitle: string;
}

export const ServiceBeforeAfter: React.FC<ServiceBeforeAfterProps> = ({
  serviceSlug,
  serviceTitle
}) => {
  const { openModal } = useQuoteModal();
  const entries = getGalleryEntriesForService(serviceSlug);

  // If no eligible entries exist for this service, render nothing
  if (entries.length === 0) {
    return null;
  }

  const primaryEntry = entries[0];

  return (
    <section className="py-12 sm:py-16 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#22AC33] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Results</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#041B3B] tracking-tight">
            Before & After Comparison: {serviceTitle}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span>Interactive Slider</span>
          <span>•</span>
          <span>Drag Left/Right</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <ImageCompareSlider entry={primaryEntry} showHint={true} />

        {/* Problem & What We Did */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-100 text-xs sm:text-sm text-rose-950">
            <span className="font-extrabold text-rose-800 uppercase text-[11px] block mb-1">
              Initial Condition
            </span>
            <p>{primaryEntry.problem}</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-xs sm:text-sm text-emerald-950">
            <span className="font-extrabold text-emerald-800 uppercase text-[11px] block mb-1">
              What We Did
            </span>
            <p>{primaryEntry.work}</p>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500">
            {primaryEntry.locality && <span>📍 Completed in {primaryEntry.locality}</span>}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                trackEvent('book_click', { sourcePage: `/services/${serviceSlug}`, action: 'before_after_cta' });
                openModal(serviceTitle);
              }}
              className="btn-homecare-green text-xs font-bold py-2.5 px-5 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book This Service</span>
            </button>
            <a
              href={BUSINESS_CONFIG.buildWhatsAppUrl(`Hello Garuda Cleaning Services, I saw your before/after results for ${serviceTitle} and want a free quote.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { sourcePage: `/services/${serviceSlug}`, action: 'before_after_cta' })}
              className="px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20bd5a] flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBeforeAfter;
