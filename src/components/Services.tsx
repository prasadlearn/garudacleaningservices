import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { useQuoteModal } from '../context/QuoteModalContext';
import { ServiceIcon } from './ServiceIcon';
import { AquaButton } from './AquaButton';

export const Services: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Residential' | 'Specialized' | 'Commercial'>('All');
  const { openModal } = useQuoteModal();

  const filteredServices = filter === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === filter);

  return (
    <section id="services" className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0369A1] text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Specialized Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight">
              Our Professional Services
            </h2>
            <p className="text-slate-600 mt-2 text-base sm:text-lg max-w-xl">
              Equipped with industrial rotary scrubbers, injection-extraction extractors, and surface-safe biological cleaning solutions.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-full border border-slate-200 self-start md:self-auto overflow-x-auto max-w-full">
            {(['All', 'Residential', 'Specialized', 'Commercial'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#0E6B7A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full bg-white/95 text-[#0B192C] backdrop-blur-xs shadow-xs uppercase tracking-wider">
                    {service.category}
                  </span>

                  {/* Duration pill */}
                  <span className="absolute bottom-3 right-3 text-xs px-2.5 py-1 rounded-md bg-[#0B192C]/85 text-white backdrop-blur-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#38BDF8]" />
                    <span>{service.duration}</span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0E6B7A] flex items-center justify-center shrink-0">
                      <ServiceIcon slug={service.slug} className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-xl text-[#0B192C] leading-snug group-hover:text-[#0E6B7A] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#0E6B7A] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium">Starting from</span>
                  <div className="text-lg font-extrabold text-[#0E6B7A]">{service.priceStarting}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-bold text-slate-600 hover:text-[#0E6B7A] px-2.5 py-2 transition-colors"
                  >
                    Details
                  </Link>

                  <button
                    onClick={() => openModal(service.title)}
                    className="text-xs font-bold px-4 py-2 rounded-xl bg-[#0E6B7A] hover:bg-[#0B192C] text-white transition-all shadow-xs cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Footer */}
        <div className="mt-12 text-center">
          <AquaButton to="/services" variant="secondary">
            View Complete Service Catalog & Pricing
          </AquaButton>
        </div>
      </div>
    </section>
  );
};
