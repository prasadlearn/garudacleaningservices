import React from 'react';
import { Sparkles, Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';
import { useQuoteModal } from '../../context/QuoteModalContext';
import { trackEvent } from '../../utils/analytics';

export const GalleryHero: React.FC = () => {
  const { openModal } = useQuoteModal();

  const whatsappUrl = BUSINESS_CONFIG.buildWhatsAppUrl(
    'Hi Garuda Cleaning, I am viewing your Work Gallery and would like to ask about a cleaning service in Tirupati.'
  );

  return (
    <div className="relative bg-[#041B3B] text-white pt-12 pb-14 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#22AC33]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs sm:text-sm font-semibold border border-white/15">
          <Sparkles className="w-4 h-4 text-[#22AC33]" />
          <span>Real Project Gallery • Tirupati & Surrounding Areas</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          See the Difference <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22AC33] to-emerald-300">We Make</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Real results from flats, individual houses, and commercial spaces across Tirupati.
          Compare before and after photos, inspect our equipment, and see our trained cleaning teams at work.
        </p>

        {/* Quick CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <button
            onClick={() => {
              trackEvent('book_click', { sourcePage: 'gallery_hero' });
              openModal();
            }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#22AC33] hover:bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 cursor-pointer"
          >
            Get Free Quote
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { sourcePage: 'gallery_hero' })}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            onClick={() => trackEvent('call_click', { sourcePage: 'gallery_hero' })}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-sm transition-all duration-200 border border-white/10"
          >
            <Phone className="w-4 h-4 text-slate-400" />
            <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
