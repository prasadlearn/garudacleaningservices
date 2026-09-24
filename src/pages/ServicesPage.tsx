import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, Phone, ArrowRight, ShieldCheck, ArrowUpRight } from 'lucide-react';
import {
  SERVICES_DATA,
  type ServiceCategory,
  formatPrice,
  formatAmount,
  type PriceModel
} from '../data/servicesData';
import { ServiceIcon } from '../components/ServiceIcon';
import { SafeImage } from '../components/SafeImage';
import { useQuoteModal } from '../context/QuoteModalContext';
import { getConfirmedCommitments } from '../config/trustConfig';
import { buildQuickBookingWhatsAppUrl } from '../utils/whatsappFormatter';
import { trackEvent } from '../utils/analytics';

export const ServicesPage: React.FC = () => {
  const { openModal } = useQuoteModal();

  const [activeTab, setActiveTab] = useState<'all' | ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Per-unit custom estimator states keyed by service slug
  const [unitValues, setUnitValues] = useState<Record<string, number>>({
    'carpet-cleaning': 100,
    'floor-deep-cleaning': 800,
    'post-construction-cleaning': 1000,
    'window-cleaning': 6,
    'glass-cleaning': 4,
    'fan-cleaning': 5,
    'office-deep-cleaning': 1200,
    'shop-cleaning': 500,
    'school-classroom-cleaning': 1500
  });

  // BHK tier state for bhk-deep-cleaning
  const [selectedBhkTier, setSelectedBhkTier] = useState<string>('2 BHK');

  // Trust commitments strictly confirmed by owner
  const confirmedCommitments = getConfirmedCommitments();

  // BHK price helper
  const bhkService = SERVICES_DATA.find((s) => s.slug === 'bhk-deep-cleaning');
  const bhkTiers = bhkService?.price.kind === 'tiers' ? bhkService.price.tiers : [];
  const activeBhkObj = bhkTiers.find((t) => t.label === selectedBhkTier) || bhkTiers[0];

  const handleUnitChange = (slug: string, val: number) => {
    setUnitValues((prev) => ({
      ...prev,
      [slug]: Math.max(1, Math.min(50000, val || 1))
    }));
  };

  const calculateEstimate = (price: PriceModel, qty: number) => {
    if (price.kind === 'per-unit') {
      if (price.max !== undefined && price.max !== price.min) {
        const minTot = price.min * qty;
        const maxTot = price.max * qty;
        return {
          formattedText: `${formatAmount(minTot)} – ${formatAmount(maxTot)}`,
          rawDisplay: `Estimated ${formatAmount(minTot)} – ${formatAmount(maxTot)}`
        };
      }
      const total = price.min * qty;
      return {
        formattedText: formatAmount(total),
        rawDisplay: `Estimated ${formatAmount(total)}`
      };
    }
    return { formattedText: formatPrice(price), rawDisplay: formatPrice(price) };
  };

  // Structured Data (ItemList schema for 21 services)
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Garuda Cleaning Services Catalogue - Tirupati',
    itemListElement: SERVICES_DATA.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.shortDescription,
        url: `https://garudacleaningservices.in/services/${service.slug}`
      }
    }))
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* React 19 Head Elements */}
      <title>Cleaning Services in Tirupati | Garuda Cleaning Services</title>
      <meta
        name="description"
        content="Explore all 21 verified cleaning services in Tirupati with upfront pricing. Residential, specialized, and commercial deep cleaning solutions."
      />
      <link rel="canonical" href="https://garudacleaningservices.in/services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Header */}
      <div className="bg-[#041B3B] text-white py-14 sm:py-20 px-4 sm:px-8 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          {confirmedCommitments.length > 0 && (
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-bold border border-white/15">
              <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
              <span>{confirmedCommitments.map((c) => c.title).join(' • ')}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Cleaning Services in Tirupati – Prices & Booking
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Transparent rate card for flats, villas, and commercial spaces across Tirupati. Inspect inclusions, calculate indicative estimates, and book with zero hidden surprises.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls: Search & Category Tabs */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {(['all', 'residential', 'specialized', 'commercial'] as const).map((cat) => {
              const label =
                cat === 'all'
                  ? 'All (21)'
                  : cat === 'residential'
                  ? 'Residential (10)'
                  : cat === 'specialized'
                  ? 'Specialized (6)'
                  : 'Commercial (5)';
              const isActive = activeTab === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#041B3B] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. sofa, tank, floor)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#22AC33] text-slate-900"
            />
          </div>
        </div>

        {/* 21 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => {
            const matchesCategory = activeTab === 'all' || service.category === activeTab;
            const matchesQuery =
              !searchQuery.trim() ||
              service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
            const isVisible = matchesCategory && matchesQuery;

            const isBhkService = service.slug === 'bhk-deep-cleaning';
            const isPerUnit = service.price.kind === 'per-unit';
            const isInspection = service.price.kind === 'inspection';

            // Active calculation values for per-unit
            const currentUnitQty = unitValues[service.slug] || 100;
            const perUnitEstimate = isPerUnit ? calculateEstimate(service.price, currentUnitQty) : null;

            // Computed price label
            let activePriceLabel = formatPrice(service.price);
            let activeWhatsAppPrice = formatPrice(service.price);
            let activeWhatsAppDetail: string | undefined = undefined;

            if (isBhkService && activeBhkObj) {
              activePriceLabel = formatAmount(activeBhkObj.amount);
              activeWhatsAppPrice = activePriceLabel;
              activeWhatsAppDetail = selectedBhkTier;
            } else if (isPerUnit && perUnitEstimate) {
              activePriceLabel = perUnitEstimate.formattedText;
              activeWhatsAppPrice = perUnitEstimate.formattedText;
              activeWhatsAppDetail = `${currentUnitQty} ${service.unitLabel}`;
            }

            const whatsappUrl = buildQuickBookingWhatsAppUrl({
              service: service.title,
              tierOrQuantity: activeWhatsAppDetail,
              price: activeWhatsAppPrice
            });

            return (
              <div
                key={service.slug}
                style={{ display: isVisible ? 'flex' : 'none' }}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex-col justify-between"
              >
                <div>
                  {/* Top Image + Category Pill */}
                  <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                    <SafeImage
                      src={service.image || '/images/hero-interior.webp'}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-extrabold text-[#041B3B] shadow-xs uppercase tracking-wider">
                      {service.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs p-2 rounded-xl text-[#22AC33] shadow-xs">
                      <ServiceIcon slug={service.slug} name={service.icon} className="w-4 h-4" />
                    </div>
                    {service.imageSource === 'illustrative' && (
                      <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white/90 text-[10px] font-medium px-2 py-0.5 rounded-md pointer-events-none">
                        Representative image
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-black text-[#041B3B]">{service.title}</h2>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed min-h-[36px]">
                      {service.shortDescription}
                    </p>

                    {/* DYNAMIC CARD COMPONENT: BHK SEGMENTED SELECTOR */}
                    {isBhkService && bhkTiers.length > 0 && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
                          Select Apartment Size:
                        </span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {bhkTiers.map((t) => (
                            <button
                              key={t.label}
                              type="button"
                              onClick={() => setSelectedBhkTier(t.label)}
                              className={`py-1.5 text-xs font-black rounded-lg transition-colors cursor-pointer ${
                                selectedBhkTier === t.label
                                  ? 'bg-[#22AC33] text-white shadow-2xs'
                                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                        <div className="mt-2 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              openModal({
                                serviceTitle: 'Custom Large Home Cleaning',
                                sourcePage: '/services'
                              })
                            }
                            className="text-[11px] font-bold text-[#041B3B] hover:text-[#22AC33] inline-flex items-center gap-0.5"
                          >
                            <span>Larger home? Request a quote</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* DYNAMIC CARD COMPONENT: PER-UNIT ESTIMATOR */}
                    {isPerUnit && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="flex items-center justify-between gap-2">
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                            Enter {service.unitLabel}:
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min={1}
                              max={50000}
                              value={currentUnitQty}
                              onChange={(e) => handleUnitChange(service.slug, Number(e.target.value))}
                              className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 text-center focus:outline-none focus:border-[#22AC33]"
                            />
                            <span className="text-[11px] font-bold text-slate-500">{service.unitLabel}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1.5 italic">
                          {perUnitEstimate?.rawDisplay}, indicative; final quote after inspection.
                        </p>
                      </div>
                    )}

                    {/* Price Indicator */}
                    <div className="mt-5 flex items-baseline justify-between border-t border-slate-100 pt-3">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {isInspection ? 'Assessment' : 'Indicative Rate'}
                      </span>
                      <span className="text-xl font-black text-[#22AC33]">{activePriceLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Primary Button: Book Now / Request Site Inspection */}
                    {isInspection ? (
                      <button
                        type="button"
                        onClick={() => {
                          trackEvent('book_click', { serviceSlug: service.slug, sourcePage: '/services' });
                          openModal({ serviceTitle: service.title, sourcePage: '/services' });
                        }}
                        className="col-span-2 btn-homecare-navy text-xs py-2.5 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Request Site Inspection</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            trackEvent('book_click', {
                              serviceSlug: service.slug,
                              tier: activeWhatsAppDetail,
                              sourcePage: '/services'
                            });
                            openModal({
                              serviceTitle: service.title,
                              tier: activeWhatsAppDetail,
                              sourcePage: '/services'
                            });
                          }}
                          className="btn-homecare-navy text-xs py-2.5 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Book Now</span>
                        </button>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackEvent('whatsapp_click', {
                              serviceSlug: service.slug,
                              tier: activeWhatsAppDetail,
                              sourcePage: '/services'
                            })
                          }
                          className="btn-homecare-green text-xs py-2.5 font-bold flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </>
                    )}
                  </div>

                  {/* Details Link */}
                  <Link
                    to={`/services/${service.slug}`}
                    className="w-full text-center text-xs font-bold text-slate-600 hover:text-[#22AC33] py-1.5 flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>View Inclusions & Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Step Standard Cleaning Process */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="homecare-pill mb-2">Standardized Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B] mt-1">
              How Garuda Executes Cleaning in Tirupati
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              From site arrival to joint room-by-room signoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Inspection & Setup', desc: 'Our team assesses floor stains, water scale, and covers sensitive electrical switches.' },
              { step: '02', title: 'Machine Scrubbing', desc: 'Single-disc rotary scrubbers and wet extractors lift deeply embedded dirt from tile and fabric pores.' },
              { step: '03', title: 'Detailing & Extraction', desc: 'Windows channels, kitchen platform degreasing, bathroom descaling, and moisture suction.' },
              { step: '04', title: 'Joint Customer Walkthrough', desc: 'You inspect every room with our supervisor before making final payment.' }
            ].map((p) => (
              <div key={p.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div className="text-2xl font-black text-[#22AC33] mb-2">{p.step}</div>
                <h3 className="text-sm font-black text-[#041B3B] mb-1">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Cross-Promotion: Garuda Liquids Wholesale */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-3xl border border-blue-200/70 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-2.5 py-0.5 rounded-full inline-block">
              Garuda Liquids Wholesale
            </span>
            <h3 className="text-base sm:text-lg font-black text-[#041B3B]">
              Need Bulk Cleaning Liquids & Wholesale Supplies in Tirupati?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              We also supply concentrated floor cleaners, toilet cleansers, phenyl, dishwash, room fresheners, and laundry detergents for businesses and homes.
            </p>
          </div>
          <Link
            to="/products"
            className="btn-homecare-green text-xs sm:text-sm font-bold min-h-[44px] px-5 py-2.5 rounded-xl inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>Explore Wholesale Liquids</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footnote */}
        <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-200 text-center max-w-3xl mx-auto shadow-xs">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Prices shown are starting/indicative; final quote is confirmed after inspection.
          </p>
        </div>
      </div>
    </div>
  );
};
