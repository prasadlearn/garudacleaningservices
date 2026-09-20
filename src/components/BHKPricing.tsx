import React from 'react';
import { Phone, Check, Sparkles, Star } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';

interface BHKItem {
  id: string;
  name: string;
  tagline: string;
  price: string;
  popular?: boolean;
  image: string;
  features: string[];
}

const PACKAGES: BHKItem[] = [
  {
    id: '1bhk',
    name: '1 BHK',
    tagline: 'Book complete home cleaning',
    price: '₹2,999',
    image: '/images/hero-interior.jpg',
    features: [
      '1 Bedroom + Hall + Kitchen + 1 Bath',
      'Rotary machine floor scrubbing',
      'Kitchen tiles degreasing & countertop scrub',
      'Bathroom descaling & acid-free cleaning',
      'Fan & window channels dry wiping'
    ]
  },
  {
    id: '2bhk',
    name: '2 BHK',
    tagline: 'Professional 2 BHK cleaning',
    price: '₹4,499',
    popular: true,
    image: '/images/floor-clean.jpg',
    features: [
      '2 Bedrooms + Hall + Kitchen + 2 Baths',
      'Complete floor single-disc machine scrub',
      'Kitchen chimney exterior & oil breakdown',
      'Hard-water mineral scale removal from fixtures',
      'Balcony washing & ceiling cobweb removal',
      'Mirror buffing & eco-friendly freshener'
    ]
  },
  {
    id: '3bhk',
    name: '3 BHK',
    tagline: 'Expert 3 BHK deep cleaning',
    price: '₹5,999',
    image: '/images/kitchen-clean.jpg',
    features: [
      '3 Bedrooms + Hall + Dining + Kitchen + 3 Baths',
      'Deep mechanized scrubbing across all rooms',
      'Heavy-duty kitchen cabinet exterior polish',
      'Multi-bathroom high pressure descaling',
      'Balconies, utility & window glass detailing',
      '1 Sofa set dry extraction included'
    ]
  },
  {
    id: '4bhk',
    name: '4 BHK',
    tagline: 'Detailed cleaning for large homes',
    price: '₹7,499',
    image: '/images/hero-interior.jpg',
    features: [
      '4 Bedrooms + Large Living Spaces + Terraces',
      'Multi-level machine floor washing & buffing',
      'Gourmet kitchen & utility area degreasing',
      'All attached bathrooms deep chemical sanitization',
      'Staircases, railings, and ceiling fan detailing',
      'Supervisor final audit and handover'
    ]
  },
  {
    id: 'villa',
    name: 'Villa Cleaning',
    tagline: 'Premium cleaning for luxury villas with expert care',
    price: '₹8,999',
    image: '/images/office-clean.jpg',
    features: [
      'Independent villas, duplexes & bungalows',
      'Heavy rotary scrubbing for all floor levels',
      'Complete terrace, portico & exterior wash',
      'Glass facades & window channels detailed',
      'Underground sump / overhead tank check',
      'Dedicated multi-member team with supervisor'
    ]
  },
  {
    id: 'bath-kitchen',
    name: 'Kitchen & Bath',
    tagline: 'Targeted hygiene & scale restoration',
    price: '₹2,499',
    image: '/images/bathroom-clean.jpg',
    features: [
      'Modular kitchen & up to 2 bathrooms',
      'Chimney & stove high-temperature degreasing',
      'Hard water lime scale removal from tiles',
      'Taps, showers & chrome polish buffing',
      'Silicone seal anti-fungal treatment'
    ]
  }
];

export const BHKPricing: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#22AC33] uppercase tracking-wider mb-2 block">
            Cleaning Packages
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041B3B] tracking-tight">
            Book Your Cleaning Service Today
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Enjoy exclusive limited-time upfront rates for homes and villas in Tirupati. Quick scheduling and flexible booking slots available.
          </p>
        </div>

        {/* 6 BHK Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl overflow-hidden bg-white border transition-all duration-300 flex flex-col justify-between ${
                pkg.popular
                  ? 'border-2 border-[#041B3B] shadow-xl -translate-y-1.5'
                  : 'border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-3 right-3 z-10 bg-[#FFD700] text-[#041B3B] font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                  ★ Most Popular
                </div>
              )}

              <div>
                {/* Image Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041B3B]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <h3 className="text-2xl font-extrabold">{pkg.name}</h3>
                    <p className="text-xs text-slate-200">{pkg.tagline}</p>
                  </div>
                </div>

                {/* Price & Features */}
                <div className="p-6">
                  <div className="flex items-baseline gap-2 pb-4 border-b border-slate-100">
                    <span className="text-xs text-slate-500 font-semibold uppercase">Starting</span>
                    <span className="text-3xl font-extrabold text-[#041B3B]">{pkg.price}</span>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-[#22AC33] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: Call Now & Book Now */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <a
                  href={BUSINESS_CONFIG.contact.phoneTel}
                  className="btn-yellow flex-1 text-xs py-3 justify-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </a>

                <button
                  onClick={() => openModal(pkg.name)}
                  className="btn-navy flex-1 text-xs py-3 justify-center cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
