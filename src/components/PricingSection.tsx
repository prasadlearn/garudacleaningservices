import React, { useState } from 'react';
import { Check, Sparkles, MessageCircle, Home, Layers } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { AquaButton } from './AquaButton';
import { BUSINESS_CONFIG } from '../config/businessConfig';

interface PackageItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  popular?: boolean;
  timeEstimate: string;
  features: string[];
}

const BHK_PACKAGES: PackageItem[] = [
  {
    id: '1bhk',
    name: '1 BHK Deep Cleaning',
    subtitle: 'For studio & 1-bedroom apartments',
    price: '₹2,999',
    timeEstimate: '3 - 4 Hours • 2 Specialists',
    features: [
      '1 Bedroom + 1 Hall + 1 Kitchen + 1 Bath',
      'Mechanized single-disc floor scrubbing',
      'Kitchen oil/grease degreasing & tiles descaling',
      'Complete bathroom sanitization & acid-free cleaning',
      'Fans, switchboards, window frames & glass wiping',
      'Cobweb removal & dry vacuuming of upholstery'
    ]
  },
  {
    id: '2bhk',
    name: '2 BHK Deep Cleaning',
    subtitle: 'Our most requested home package',
    price: '₹4,499',
    popular: true,
    timeEstimate: '4 - 6 Hours • 3 Specialists',
    features: [
      '2 Bedrooms + Hall + Kitchen + Up to 2 Baths',
      'Heavy-duty floor scrubbing & grout cleaning',
      'Full kitchen deep scrub (cabinets exterior & slab)',
      'High-pressure bathroom descaling & disinfection',
      'Balcony washing & drain clearing',
      'Doors, windows, grilles & ceiling fan detailing',
      'Eco-friendly odor neutralizing spray'
    ]
  },
  {
    id: '3bhk',
    name: '3 BHK Deep Cleaning',
    subtitle: 'Comprehensive large family flat detailing',
    price: '₹5,999',
    timeEstimate: '5 - 7 Hours • 4 Specialists',
    features: [
      '3 Bedrooms + Hall + Dining + Kitchen + 3 Baths',
      'Dual mechanized scrubbing (living & bedrooms)',
      'Full kitchen chimney exterior & tile degreasing',
      'Complete multi-bathroom descaling & lime removal',
      'Balconies, utility areas & window tracks cleaned',
      'Light fixtures, AC filters & switchboard wiping',
      'Complimentary vacuuming of 1 sofa set'
    ]
  },
  {
    id: '4bhk',
    name: '4 BHK / Villa Cleaning',
    subtitle: 'Duplexes, independent houses & estates',
    price: '₹7,999',
    timeEstimate: '6 - 8 Hours • 4-5 Specialists',
    features: [
      '4+ Bedrooms + Multiple Living Areas + Terraces',
      'Complete multi-level floor scrubbing & polish wash',
      'Gourmet kitchen & utility area deep degreasing',
      'All attached bathrooms deep chemical sanitization',
      'Staircases, railings, balconies & porch cleaning',
      'Cobweb removal from high ceilings & fixtures',
      'Priority team supervisor inspection'
    ]
  }
];

const COMBO_PACKAGES = [
  {
    id: 'combo-sofa',
    name: 'Full Home + Sofa Spa Combo',
    price: 'Save 15%',
    badge: 'Popular Combo',
    description: 'Any apartment deep cleaning bundled with complete wet shampooing & extraction for your 5-seater sofa set.',
    highlights: ['Deep house cleaning', 'Fabric sofa shampooing', 'Stubborn stain extraction']
  },
  {
    id: 'combo-tank',
    name: 'Home + Water Tank Sanitization',
    price: 'Save 20%',
    badge: 'Hygiene Booster',
    description: 'Protect your family with full home cleaning plus mechanical underground sump / overhead Sintex water tank cleaning.',
    highlights: ['Sludge suction & de-watering', 'High-pressure jet wash', 'UV / Anti-bacterial sanitization']
  },
  {
    id: 'combo-kitchen-bath',
    name: 'Kitchen & Bathroom Express Combo',
    price: 'From ₹2,499',
    badge: 'Quick Refresh',
    description: 'Intense focus on high-traffic hygiene zones. Complete tile descaling, grease elimination, and fixture polishing.',
    highlights: ['Chimney & stove degreasing', 'Tile grout descaling', 'Tap & shower chrome shine']
  }
];

export const PricingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bhk' | 'combos'>('bhk');
  const { openModal } = useQuoteModal();

  return (
    <section id="pricing" className="py-20 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0E6B7A] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent & Honest Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            Popular Cleaning Packages in Tirupati
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Clear, upfront rates tailored to your home layout. No hidden transport surcharges across Tirupati city limits.
          </p>

          {/* Toggle Tabs */}
          <div className="inline-flex p-1.5 bg-white border border-slate-200 rounded-full mt-8 shadow-xs">
            <button
              onClick={() => setActiveTab('bhk')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'bhk'
                  ? 'bg-[#0E6B7A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              Standard BHK Packages
            </button>
            <button
              onClick={() => setActiveTab('combos')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'combos'
                  ? 'bg-[#0E6B7A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              Combo Value Packages
            </button>
          </div>
        </div>

        {/* Tab 1: BHK Packages */}
        {activeTab === 'bhk' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BHK_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 bg-white transition-all duration-300 ${
                  pkg.popular
                    ? 'border-2 border-[#0E6B7A] shadow-lg -translate-y-1'
                    : 'border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-[#0B192C] text-[11px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-xs tracking-wider">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="text-xl font-bold text-[#0B192C]">{pkg.name}</div>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{pkg.subtitle}</p>

                  <div className="mt-4 pb-4 border-b border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">Starting from</span>
                    <div className="text-3xl font-extrabold text-[#0E6B7A]">{pkg.price}</div>
                    <div className="text-xs text-slate-600 font-medium mt-1">{pkg.timeEstimate}</div>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 leading-snug">
                        <span className="p-0.5 rounded-full bg-teal-50 text-[#0E6B7A] shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                  <button
                    onClick={() => openModal(pkg.name)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#0E6B7A] hover:bg-[#0B192C] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    Book This Package
                  </button>

                  <a
                    href={BUSINESS_CONFIG.buildWhatsAppUrl({
                      message: `Hi, I am interested in the ${pkg.name} (${pkg.price}) in Tirupati.`
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:emerald-100 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Quick WhatsApp Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Combo Packages */}
        {activeTab === 'combos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMBO_PACKAGES.map((combo) => (
              <div
                key={combo.id}
                className="flex flex-col justify-between bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold mb-3">
                    {combo.badge}
                  </div>
                  <h3 className="text-lg font-bold text-[#0B192C]">{combo.name}</h3>
                  <div className="text-2xl font-extrabold text-[#0E6B7A] mt-2">{combo.price}</div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{combo.description}</p>

                  <div className="mt-5 space-y-2">
                    {combo.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#0E6B7A]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => openModal(combo.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0B192C] hover:bg-[#0E6B7A] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Inquire Combo Special
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner Note */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-sky-50 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-bold text-sm text-[#0B192C]">Need a custom quote for commercial office or villa?</span>
            <p className="text-xs text-slate-600 mt-0.5">We provide free on-site property inspection anywhere in Tirupati within 2 hours.</p>
          </div>
          <AquaButton
            onClick={() => openModal()}
            color="#0E6B7A"
            className="text-xs py-2 px-5 shrink-0"
          >
            Request Site Inspection
          </AquaButton>
        </div>
      </div>
    </section>
  );
};
