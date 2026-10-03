import React from 'react';
import { Phone, MessageCircle, ArrowDown, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../../config/businessConfig';
import { trackEvent } from '../../../utils/analytics';

export const CleaningLiquidsHero: React.FC = () => {
  return (
    <header className="bg-gradient-to-b from-[#041B3B] via-[#062654] to-[#041B3B] text-white pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#22AC33]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 relative z-10">
        {/* Verified Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 backdrop-blur-xs shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>CLEANING LIQUIDS • WHOLESALE SUPPLIES • TIRUPATI &amp; RAYACHOTY</span>
        </div>

        {/* Mandatory SEO H1 */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Cleaning Liquids &amp; Wholesale Supplies in Tirupati &amp; Rayachoty
        </h1>

        {/* Supporting Text */}
        <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
          Everyday cleaning liquids for homes, businesses and bulk buyers across Tirupati and Rayachoty — with pack options for regular and wholesale requirements.
        </p>

        {/* Small Visual Line */}
        <div className="text-[11px] sm:text-xs font-medium text-slate-300 flex items-center justify-center gap-2 flex-wrap pt-0.5">
          <span>500 ml</span>
          <span className="text-[#22AC33]">•</span>
          <span>1 L</span>
          <span className="text-[#22AC33]">•</span>
          <span>5 L bulk packs</span>
          <span className="text-[#22AC33]">•</span>
          <span className="text-slate-400">Delivery charged separately</span>
        </div>

        {/* Main CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <a
            href="#catalog"
            className="btn-homecare-green py-2.5 sm:py-3 px-4 sm:px-5 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
          >
            <span>Explore Products</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href={BUSINESS_CONFIG.buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { sourcePage: '/cleaning-liquids-hero' })}
            className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#22AC33]" />
            <span>WhatsApp Wholesale</span>
          </a>

          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            onClick={() => trackEvent('call_click', { sourcePage: '/cleaning-liquids-hero' })}
            className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#22AC33]" />
            <span className="hidden sm:inline">Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </header>
  );
};
