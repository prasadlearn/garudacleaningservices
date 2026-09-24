import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getEnabledServices, formatPrice, type ServiceCategory } from '../data/servicesData';
import { useQuoteModal } from '../context/QuoteModalContext';
import { Phone, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { SafeImage } from './SafeImage';

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

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                    <SafeImage
                      src={service.image}
                      alt={service.title}
                      fallbackLabel={service.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      {service.category}
                    </div>
                    {service.imageSource === 'illustrative' && (
                      <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white/90 text-[10px] font-medium px-2 py-0.5 rounded-md pointer-events-none">
                        Representative image
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-[#041B3B] group-hover:text-[#22AC33] transition-colors mb-2 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                      {service.shortDescription}
                    </p>

                    <div className="space-y-1.5 mb-6">
                      {service.whatsIncluded.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22AC33] shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                  <div className="flex items-center justify-between pt-4 mb-4">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Pricing</div>
                      <div className="text-xl font-black text-[#22AC33]">{formatPrice(service.price)}</div>
                    </div>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#041B3B] hover:text-[#22AC33] transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => openModal({ serviceTitle: service.title, sourcePage: '/services' })}
                      className="btn-homecare-green py-2.5 px-3 text-xs w-full text-center"
                    >
                      Book Slot
                    </button>
                    <a
                      href={BUSINESS_CONFIG.contact.phoneTel}
                      className="btn-homecare-outline py-2.5 px-3 text-xs w-full justify-center flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call Us
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
