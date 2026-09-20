import React from 'react';
import { Sparkles, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';

export const ComboSection: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#041B3B] text-white">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#052550] via-[#041B3B] to-[#021227] p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD700] text-[#041B3B] text-xs font-black uppercase tracking-wider pulse-scale">
              <Sparkles className="w-3.5 h-3.5" />
              Special Combo Value Offer
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Full Home Deep Clean + Sofa Shampooing Spa
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Book any BHK deep cleaning package this month and get 20% off complete wet injection-extraction shampooing for your 5-seater sofa set.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm text-slate-200">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#22AC33]" /> High-pressure hot water extraction</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#22AC33]" /> Removes dust mites & stains</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#22AC33]" /> Fast 3-hour drying time</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch">
            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              className="btn-yellow text-sm py-3.5 text-center justify-center font-bold"
            >
              <Phone className="w-4 h-4" />
              Call For Combo Offer
            </a>

            <a
              href={BUSINESS_CONFIG.buildWhatsAppUrl({
                message: "Hi Garuda Cleaning, I am interested in the Home + Sofa Shampooing Combo offer in Tirupati."
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green text-sm py-3.5 text-center justify-center font-bold"
            >
              <MessageCircle className="w-4 h-4" />
              Claim on WhatsApp
            </a>

            <button
              onClick={() => openModal("Home + Sofa Combo")}
              className="py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Request Custom Combo Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
