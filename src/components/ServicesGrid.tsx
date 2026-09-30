import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getEnabledServices, formatPrice, getServiceHighlights, type ServiceCategory } from '../data/servicesData';
import { Phone, Sparkles, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { SafeImage } from './SafeImage';
import { useQuoteModal } from '../context/QuoteModalContext';

export const ServicesGrid: React.FC = () => {
  const { openModal } = useQuoteModal();
  const [activeCategory, setActiveCategory] = useState<'All' | ServiceCategory>('All');

  const enabledServices = getEnabledServices();
  const categories: ('All' | ServiceCategory)[] = ['All', 'residential', 'specialized', 'commercial'];

  const filtered =
    activeCategory === 'All'
      ? enabledServices
      : enabledServices.filter((s) => s.category === activeCategory);

  return (
    <section id="services-list" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F4F8FC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="homecare-pill mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Full Service Catalogue
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041B3B] tracking-tight mt-1">
            Complete Cleaning Solutions in Tirupati
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Transparent rate card for flats, villas, and commercial spaces across Tirupati.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#041B3B] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat === 'All' ? `All Services (${enabledServices.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          <AnimatePresence>
            {filtered.map((service) => {
              const highlights = getServiceHighlights(service);

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#22AC33]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="flex-1 flex flex-col">
                    {/* Clickable Image & Category */}
                    <Link
                      to={`/services/${service.slug}`}
                      className="block relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                      aria-label={`View details for ${service.title}`}
                    >
                      <SafeImage
                        src={service.image}
                        alt={service.title}
                        fallbackLabel={service.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {service.category}
                      </div>
                      {service.imageSource === 'illustrative' && (
                        <div className="absolute bottom-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white/90 text-[8px] sm:text-[9px] font-medium px-1.5 py-0.5 rounded-md pointer-events-none">
                          Representative image
                        </div>
                      )}
                    </Link>

                    {/* Card Body - Title & Details */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/services/${service.slug}`} className="block group-hover:text-[#22AC33] transition-colors">
                          <h3 className="text-xs sm:text-base font-black text-[#041B3B] group-hover:text-[#22AC33] transition-colors line-clamp-1 leading-snug">
                            {service.title}
                          </h3>
                        </Link>

                        {/* What's Included Quick Tags */}
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {highlights.slice(0, 2).map((item, i) => (
                            <span key={i} className="inline-flex items-center gap-1 text-[8.5px] sm:text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md font-semibold truncate max-w-full">
                              <span className="text-[#22AC33] font-black">✓</span> {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-baseline justify-between">
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400">Price</span>
                        <span className="text-xs sm:text-base font-black text-[#1A8C28] whitespace-nowrap">{formatPrice(service.price)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-4 pt-0 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openModal({ serviceTitle: service.title, sourcePage: '/services' })}
                        className="flex-1 min-h-[38px] sm:min-h-[42px] px-2 py-2 bg-[#22AC33] hover:bg-[#1A8C28] text-white text-[11px] sm:text-xs font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-xs transition-colors"
                      >
                        <span>Book Slot</span>
                      </button>
                      <a
                        href={BUSINESS_CONFIG.buildWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp about ${service.title}`}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 hover:bg-[#22AC33] hover:text-white text-[#041B3B] flex items-center justify-center shrink-0 border border-slate-200 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <Link
                      to={`/services/${service.slug}`}
                      className="w-full py-1 text-[10px] sm:text-[11px] font-bold text-center justify-center text-[#041B3B] hover:text-[#22AC33] hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>View Details & Pricing</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
