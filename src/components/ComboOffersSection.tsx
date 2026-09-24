import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Phone, Check } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { OFFERS_CONFIG } from '../config/offersConfig';

export const ComboOffersSection: React.FC = () => {
  const { openModal } = useQuoteModal();

  // Hide section until owner enables and configures real verified offers
  if (!OFFERS_CONFIG.enabled || OFFERS_CONFIG.offers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#D4F4DD] border-b border-emerald-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#22AC33] text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#22AC33]" />
            Special Package Offers
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B]">
            Cleaning Combo Offers
          </h2>
          <p className="text-slate-700 mt-2 text-sm sm:text-base font-medium">
            Verified package deals for residential and commercial spaces across Tirupati.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OFFERS_CONFIG.offers.map((offer, idx) => (
            <motion.div
              key={offer.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="bg-[#041B3B] text-white text-[11px] font-extrabold tracking-wider uppercase py-1 px-4 rounded-full inline-block mb-3">
                  {offer.badge}
                </span>
                <h3 className="text-lg font-bold text-[#041B3B]">{offer.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{offer.description}</p>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#22AC33]">{offer.priceText}</span>
                  {offer.originalPriceText && (
                    <span className="text-xs text-slate-400 line-through">{offer.originalPriceText}</span>
                  )}
                </div>

                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  {offer.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#22AC33] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => openModal({ serviceTitle: offer.title, sourcePage: '/pricing' })}
                  className="w-full btn-homecare-green text-xs py-2.5 font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Book Offer: {BUSINESS_CONFIG.contact.phoneDisplay}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
