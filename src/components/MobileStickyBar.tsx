import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';

export const MobileStickyBar: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center gap-2 shadow-2xl">
      <a
        href={BUSINESS_CONFIG.contact.phoneTel}
        className="flex-1 py-2.5 px-3 rounded-full bg-[#FFD700] text-[#041B3B] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
      >
        <Phone className="w-4 h-4 fill-current" />
        <span>Call Now</span>
      </a>

      <a
        href={BUSINESS_CONFIG.buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2.5 px-3 rounded-full bg-[#22AC33] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>

      <button
        onClick={() => openModal()}
        className="flex-1 py-2.5 px-3 rounded-full bg-[#041B3B] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
      >
        <Calendar className="w-4 h-4 text-[#FFD700]" />
        <span>Book</span>
      </button>
    </div>
  );
};
