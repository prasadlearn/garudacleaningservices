import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { getEnabledServices, formatPrice, type ServiceItem } from '../data/servicesData';
import { ServiceIcon } from './ServiceIcon';
import { SafeImage } from './SafeImage';

const FEATURED_SLUGS = [
  'bhk-deep-cleaning',
  'villa-deep-cleaning',
  'full-home-deep-cleaning-package',
  'kitchen-deep-cleaning',
  'bathroom-deep-cleaning',
  'sofa-cleaning',
  'floor-deep-cleaning',
  'office-deep-cleaning'
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
            Choose a service below with clear upfront prices. Available for flats, independent houses, and offices.
          </p>
        </div>

        {/* 2 Rows of 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                  <SafeImage
                    src={service.image || '/images/hero-interior.webp'}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2 rounded-xl text-[#22AC33] shadow-xs">
                    <ServiceIcon slug={service.slug} name={service.icon} className="w-4 h-4" />
                  </div>
                  {service.imageSource === 'illustrative' && (
                    <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white/90 text-[10px] font-medium px-2 py-0.5 rounded-md pointer-events-none">
                      Representative image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-lg text-[#041B3B]">{service.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{service.shortDescription}</p>
                  <div className="mt-4 font-extrabold text-sm text-[#041B3B]">
                    Starting <span className="text-[#22AC33]">{formatPrice(service.price)}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <div className="flex gap-2">
                  <a
                    href={BUSINESS_CONFIG.contact.phoneTel}
                    className="btn-homecare-green flex-1 text-center justify-center text-xs py-2 px-2"
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </a>
                  <button
                    type="button"
                    onClick={() => openModal({ serviceTitle: service.title, sourcePage: '/' })}
                    className="btn-homecare-navy flex-1 text-center justify-center text-xs py-2 px-2 cursor-pointer"
                  >
                    Book
                  </button>
                </div>
                <Link
                  to={`/services/${service.slug}`}
                  className="w-full text-center text-xs font-bold text-slate-600 hover:text-[#22AC33] py-1 flex items-center justify-center gap-1 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 btn-homecare-navy px-8 py-3.5 text-sm font-bold rounded-full"
          >
            <span>Explore All 21 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
