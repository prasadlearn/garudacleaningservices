import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { getEnabledServices, formatPrice, getServiceHighlights, type ServiceItem } from '../data/servicesData';
import { ServiceIcon } from './ServiceIcon';
import { SafeImage } from './SafeImage';

const FEATURED_SLUGS = [
  'home-cleaning',
  'villa-cleaning',
  'move-in-out-cleaning',
  'kitchen-cleaning',
  'washroom-cleaning',
  'sofa-cleaning',
  'water-tank-cleaning',
  'office-cleaning'
];

export const ChooseAndBookSection: React.FC = () => {
  const { openModal } = useQuoteModal();
  const allServices = getEnabledServices();

  const featuredServices = FEATURED_SLUGS.map((slug) =>
    allServices.find((s) => s.slug === slug)
  ).filter(Boolean) as ServiceItem[];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="homecare-pill mb-2">Our Services</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1">
            Featured Cleaning Services in Tirupati
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Choose a service below with clear upfront prices. Available for flats, independent houses, villas, and offices.
          </p>
        </div>

        {/* 2 Rows of 4 Cards (2 cols on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredServices.map((service) => {
            const highlights = getServiceHighlights(service);

            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#22AC33]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex-1 flex flex-col">
                  {/* Clickable Image */}
                  <Link
                    to={`/services/${service.slug}`}
                    className="block relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                    aria-label={`View details for ${service.title}`}
                  >
                    <SafeImage
                      src={service.image || '/images/hero-interior.webp'}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg text-[#22AC33] shadow-xs">
                      <ServiceIcon slug={service.slug} name={service.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    {service.imageSource === 'illustrative' && (
                      <div className="absolute bottom-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white/90 text-[8px] sm:text-[9px] font-medium px-1.5 py-0.5 rounded-md pointer-events-none">
                        Representative image
                      </div>
                    )}
                  </Link>

                  {/* Card Body */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/services/${service.slug}`} className="block group-hover:text-[#22AC33] transition-colors">
                        <h3 className="font-extrabold text-xs sm:text-base text-[#041B3B] group-hover:text-[#22AC33] transition-colors line-clamp-1 leading-snug">
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
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {service.price.kind === 'tiers' || service.price.kind === 'from' || (service.price.kind === 'per-unit' && service.price.unit === 'sq.ft') ? 'Starting' : 'Price'}
                      </span>
                      <span className="text-xs sm:text-base font-black text-[#1A8C28]">{formatPrice(service.price)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Book Now + WhatsApp / Call */}
                <div className="p-2.5 sm:p-4 pt-0 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openModal({ serviceTitle: service.title, sourcePage: '/' })}
                      className="flex-1 min-h-[38px] sm:min-h-[42px] px-2 py-2 bg-[#22AC33] hover:bg-[#1A8C28] text-white text-[11px] sm:text-xs font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-xs transition-colors"
                    >
                      <span>Book Now</span>
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
                    className="w-full py-1 text-[10px] sm:text-[11px] font-bold text-center justify-center text-[#041B3B] hover:text-[#22AC33] hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>View Details & Pricing</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 btn-homecare-navy px-8 py-3.5 text-sm font-bold rounded-full"
          >
            <span>Explore All {allServices.length} Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChooseAndBookSection;
