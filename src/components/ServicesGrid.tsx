import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA } from '../data/servicesData';
import { useQuoteModal } from '../context/QuoteModalContext';
import { Phone, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const ServicesGrid: React.FC = () => {
  const { openModal } = useQuoteModal();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Residential', 'Specialized', 'Commercial'];

  const filtered = activeCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F4F8FC] border-b border-slate-200">
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
            From single-disc rotary floor scrubbing to hot chemical upholstery extraction and villa deep care, we deploy certified industrial equipment for every requirement.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#041B3B] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat === 'All' ? `All Services (${SERVICES_DATA.length})` : cat}
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
                className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#041B3B]/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      {service.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#041B3B] text-[11px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#22AC33]" />
                      {service.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-[#041B3B] group-hover:text-[#22AC33] transition-colors mb-2 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                      {service.shortDesc}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="space-y-1.5 mb-4">
                      {service.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22AC33] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-sm font-bold text-slate-500 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span>Starting Price:</span>
                      <span className="text-xl font-black text-[#22AC33]">{service.priceStarting}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-2.5">
                  <button
                    onClick={() => openModal(service.title)}
                    className="btn-homecare-green flex-1 text-xs py-2.5 justify-center cursor-pointer font-bold"
                  >
                    Book Now
                  </button>
                  <Link
                    to={`/services/${service.slug}`}
                    className="btn-homecare-outline flex-1 text-xs py-2.5 justify-center font-bold"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
