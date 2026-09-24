import React from 'react';
import { Phone, MessageCircle, CalendarCheck, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';
import { useQuoteModal } from '../../context/QuoteModalContext';
import { trackEvent } from '../../utils/analytics';

export const GalleryCTASection: React.FC = () => {
  const { openModal } = useQuoteModal();

  const whatsappUrl = BUSINESS_CONFIG.buildWhatsAppUrl(
    'Hi Garuda Cleaning, I would like to book a cleaning slot for my property in Tirupati.'
  );

  return (
    <section className="py-14 sm:py-20 bg-[#041B3B] text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#22AC33]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs sm:text-sm font-semibold border border-white/15">
          <CalendarCheck className="w-4 h-4 text-[#22AC33]" />
          <span>Easy Booking • Tirupati & Surrounding Areas</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Ready for a Spotless Space?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Book your cleaning slot today. We bring our own rotary machines, vacuum extractors, and surface-safe solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
          <button
            onClick={() => {
              trackEvent('book_click', { sourcePage: 'gallery_bottom' });
              openModal();
            }}
            className="px-8 py-3.5 rounded-full bg-[#22AC33] hover:bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-emerald-500/30 transition-all duration-200 cursor-pointer"
          >
            Get Free Instant Quote
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { sourcePage: 'gallery_bottom' })}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            onClick={() => trackEvent('call_click', { sourcePage: 'gallery_bottom' })}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-sm sm:text-base border border-white/10 transition-all duration-200"
          >
            <Phone className="w-4 h-4 text-slate-300" />
            <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
            <span>Verified Staff Only</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
            <span>No Subcontracting</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
            <span>Pay After Inspection</span>
          </div>
        </div>
      </div>
    </section>
  );
};
