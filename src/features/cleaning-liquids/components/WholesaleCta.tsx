import React from 'react';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../../config/businessConfig';
import { trackEvent } from '../../../utils/analytics';

interface WholesaleCtaProps {
  className?: string;
}

export const WholesaleCta: React.FC<WholesaleCtaProps> = ({ className = '' }) => {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br from-[#041B3B] via-[#0b2b57] to-[#041B3B] text-white p-6 sm:p-10 text-center space-y-5 border border-white/10 shadow-xl relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#22AC33]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-3 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#22AC33] border border-white/15">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Local Support</span>
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
          Ready to Order Cleaning Supplies in Tirupati?
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
          Contact our local team for immediate price lists, product recommendations, and custom bulk dispatch terms.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={BUSINESS_CONFIG.buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { sourcePage: '/liquids-cta' })}
            className="btn-homecare-green py-3 px-6 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp ({BUSINESS_CONFIG.contact.whatsappDisplay})</span>
          </a>

          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            onClick={() => trackEvent('call_click', { sourcePage: '/liquids-cta' })}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
          >
            <Phone className="w-4 h-4 text-[#22AC33]" />
            <span>Call Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};
