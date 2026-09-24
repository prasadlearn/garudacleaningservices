import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, MessageCircle, ChevronDown, ChevronUp, Search, Phone } from 'lucide-react';
import {
  getServicesByCategory,
  formatPrice,
  formatAmount,
} from '../data/servicesData';
import type { ServiceCategory } from '../data/servicesData';
import { useQuoteModal } from '../context/QuoteModalContext';
import { trackEvent } from '../utils/analytics';
import { buildQuickBookingWhatsAppUrl } from '../utils/whatsappFormatter';
import { ServiceIcon } from '../components/ServiceIcon';
import { TRUST_CONFIG } from '../config/trustConfig';
import { ComboOffersSection } from '../components/ComboOffersSection';

export const PricingPage: React.FC = () => {
  const { openModal } = useQuoteModal();
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');
  const [filterText, setFilterText] = useState('');
  const [bhkExpanded, setBhkExpanded] = useState(true);

  const confirmedCommitments = TRUST_CONFIG.commitments.filter((c) => c.ownerConfirmed);
  const categories: ServiceCategory[] = ['residential', 'specialized', 'commercial'];

  const pricingSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Garuda Cleaning Services Rate Card - Tirupati',
    description: 'Upfront transparent pricing for flats, villas, water tanks, deep floor scrubbing, and commercial spaces in Tirupati.',
    url: 'https://garudacleaningservices.in/pricing'
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* React 19 Head */}
      <title>Cleaning Service Prices in Tirupati | Garuda Cleaning Services</title>
      <meta
        name="description"
        content="Clear, transparent pricing for all 21 cleaning services in Tirupati. Upfront rates for flats, villas, water tanks, deep floor scrubbing, and commercial spaces."
      />
      <link rel="canonical" href="https://garudacleaningservices.in/pricing" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />

      {/* Hero Header */}
      <div className="bg-[#041B3B] text-white py-14 sm:py-20 px-4 sm:px-8 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          {confirmedCommitments.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-400 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22AC33]" />
              {confirmedCommitments.map((c) => c.title).join(' • ')}
            </span>
          )}
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight !text-white">
            Cleaning Service Rates & Pricing in Tirupati
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Transparent price catalogue for apartments, houses, and commercial facilities across Tirupati. Zero hidden surprises with clear upfront estimates.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Filter Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {(['all', 'residential', 'specialized', 'commercial'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                  activeCategory === cat
                    ? 'bg-[#041B3B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all'
                  ? 'All Services (21)'
                  : cat === 'residential'
                  ? 'Residential (10)'
                  : cat === 'specialized'
                  ? 'Specialized (6)'
                  : 'Commercial (5)'}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Filter services by name or keyword"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter by name or keyword..."
              className="w-full min-h-[48px] pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:outline-none focus:border-[#22AC33]"
            />
          </div>
        </div>

        {/* Grouped Category Sections */}
        {categories.map((cat) => {
          if (activeCategory !== 'all' && activeCategory !== cat) return null;

          const services = getServicesByCategory(cat).filter((s) => {
            if (!filterText.trim()) return true;
            const q = filterText.toLowerCase();
            return (
              s.title.toLowerCase().includes(q) ||
              s.shortDescription.toLowerCase().includes(q) ||
              s.slug.toLowerCase().includes(q)
            );
          });

          if (services.length === 0) return null;

          const categoryTitle =
            cat === 'residential'
              ? 'Residential Services'
              : cat === 'specialized'
              ? 'Specialized Services'
              : 'Commercial Services';

          return (
            <div key={cat} className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Category Header */}
              <div className="bg-[#041B3B] text-white px-6 py-4 flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black tracking-tight !text-white">{categoryTitle}</h2>
                <span className="text-xs text-emerald-400 font-bold bg-white/10 px-3 py-1 rounded-md min-h-[32px] flex items-center">
                  {services.length} Services
                </span>
              </div>

              {/* 1. MOBILE PRESENTATION (< 640px): Touch-Friendly Pricing Cards */}
              <div className="sm:hidden p-4 space-y-4 divide-y divide-slate-100">
                {services.map((srv) => {
                  const isBhk = srv.slug === 'bhk-deep-cleaning';
                  const formatted = formatPrice(srv.price);
                  const isInspection = srv.price.kind === 'inspection';

                  const basisLabel =
                    srv.price.kind === 'fixed'
                      ? 'Fixed rate'
                      : srv.price.kind === 'from'
                      ? 'Starting rate'
                      : srv.price.kind === 'per-unit'
                      ? `Per ${srv.price.unit}`
                      : srv.price.kind === 'tiers'
                      ? 'BHK tiered'
                      : 'On-site inspection';

                  const waUrl = buildQuickBookingWhatsAppUrl({
                    service: srv.title,
                    price: formatted
                  });

                  return (
                    <div key={srv.slug} className="pt-4 first:pt-0 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#22AC33] flex items-center justify-center shrink-0">
                            <ServiceIcon slug={srv.slug} name={srv.icon} className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#041B3B] text-sm leading-snug">{srv.title}</h3>
                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{basisLabel}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-base font-black text-[#1A8C28] block">{formatted}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {srv.shortDescription}
                      </p>

                      {/* BHK Tiers on Mobile */}
                      {isBhk && srv.price.kind === 'tiers' && (
                        <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                          <span className="text-[11px] font-black uppercase text-[#041B3B] block">Apartment Rates:</span>
                          <div className="grid grid-cols-2 gap-2">
                            {srv.price.tiers.map((t) => (
                              <div key={t.label} className="bg-white p-2.5 rounded-xl border border-emerald-200 text-center shadow-2xs">
                                <span className="text-[11px] font-bold text-[#041B3B] block">{t.label}</span>
                                <span className="text-xs font-black text-[#1A8C28] block mt-0.5">{formatAmount(t.amount)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Mobile Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            trackEvent('book_click', {
                              serviceSlug: srv.slug,
                              price: formatted,
                              sourcePage: '/pricing'
                            });
                            openModal({ serviceTitle: srv.title, sourcePage: '/pricing' });
                          }}
                          className="btn-homecare-navy min-h-[44px] py-2.5 px-3 text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{isInspection ? 'Book Inspection' : 'Book Service'}</span>
                        </button>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackEvent('whatsapp_click', {
                              serviceSlug: srv.slug,
                              price: formatted,
                              sourcePage: '/pricing'
                            })
                          }
                          className="btn-homecare-green min-h-[44px] py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 2. DESKTOP & TABLET PRESENTATION (>= 640px): Structured Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3 px-4 sm:px-6 sticky left-0 bg-slate-50 z-[var(--z-content)]">Service Name</th>
                      <th className="py-3 px-4 sm:px-6">Pricing / Rate</th>
                      <th className="py-3 px-4 sm:px-6">Basis</th>
                      <th className="py-3 px-4 sm:px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {services.map((srv) => {
                      const isBhk = srv.slug === 'bhk-deep-cleaning';
                      const formatted = formatPrice(srv.price);
                      const isInspection = srv.price.kind === 'inspection';

                      const basisLabel =
                        srv.price.kind === 'fixed'
                          ? 'Fixed rate'
                          : srv.price.kind === 'from'
                          ? 'Starting rate'
                          : srv.price.kind === 'per-unit'
                          ? `Per ${srv.price.unit}`
                          : srv.price.kind === 'tiers'
                          ? 'BHK tiered'
                          : 'On-site inspection';

                      const waUrl = buildQuickBookingWhatsAppUrl({
                        service: srv.title,
                        price: formatted
                      });

                      return (
                        <React.Fragment key={srv.slug}>
                          <tr className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-4 px-4 sm:px-6 font-bold text-[#041B3B] sticky left-0 bg-white z-[var(--z-content)] shadow-xs">
                              <div className="flex items-center gap-2.5">
                                <ServiceIcon slug={srv.slug} name={srv.icon} className="w-4 h-4 text-[#22AC33] shrink-0" />
                                <span>{srv.title}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-normal mt-0.5 max-w-md hidden sm:block">
                                {srv.shortDescription}
                              </p>
                            </td>

                            <td className="py-4 px-4 sm:px-6 font-black text-[#1A8C28] text-sm whitespace-nowrap">
                              {formatted}
                            </td>

                            <td className="py-4 px-4 sm:px-6 text-slate-600 font-medium whitespace-nowrap">
                              {basisLabel}
                            </td>

                            <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-2">
                                {isBhk ? (
                                  <button
                                    type="button"
                                    onClick={() => setBhkExpanded((prev) => !prev)}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-[#041B3B] hover:text-[#1A8C28] bg-slate-100 hover:bg-slate-200 px-3 py-2 min-h-[44px] rounded-lg transition-colors cursor-pointer"
                                  >
                                    <span>Tiers ({srv.price.kind === 'tiers' ? srv.price.tiers.length : 0})</span>
                                    {bhkExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        trackEvent('book_click', {
                                          serviceSlug: srv.slug,
                                          price: formatted,
                                          sourcePage: '/pricing'
                                        });
                                        openModal({ serviceTitle: srv.title, sourcePage: '/pricing' });
                                      }}
                                      className="btn-homecare-navy min-h-[44px] px-3.5 py-2 text-xs font-bold cursor-pointer inline-flex items-center justify-center"
                                    >
                                      {isInspection ? 'Book Inspection' : 'Book'}
                                    </button>
                                    <a
                                      href={waUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() =>
                                        trackEvent('whatsapp_click', {
                                          serviceSlug: srv.slug,
                                          price: formatted,
                                          sourcePage: '/pricing'
                                        })
                                      }
                                      className="btn-homecare-green min-h-[44px] min-w-[44px] px-3 py-2 text-xs font-bold inline-flex items-center justify-center"
                                      title={`Book ${srv.title} on WhatsApp`}
                                      aria-label={`Book ${srv.title} on WhatsApp`}
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>

                          {/* BHK Expanded Tiers Row */}
                          {isBhk && bhkExpanded && srv.price.kind === 'tiers' && (
                            <tr className="bg-emerald-50/50">
                              <td colSpan={4} className="p-4 sm:px-8 border-y border-emerald-100">
                                <div className="space-y-3">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <span className="text-xs font-black uppercase tracking-wider text-[#041B3B]">
                                      BHK Deep Cleaning – Tiered Pricing Table
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openModal({
                                          serviceTitle: 'Custom Quote for 5+ BHK / Large Home',
                                          sourcePage: '/pricing'
                                        })
                                      }
                                      className="min-h-[44px] text-xs text-[#1A8C28] font-extrabold hover:underline text-left sm:text-right inline-flex items-center"
                                    >
                                      Larger home? Request a quote →
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {srv.price.tiers.map((tier) => (
                                      <div
                                        key={tier.label}
                                        className="p-3.5 bg-white rounded-2xl border border-emerald-200 shadow-2xs flex flex-col justify-between"
                                      >
                                        <div>
                                          <span className="font-bold text-xs text-[#041B3B] block">
                                            {tier.label}
                                          </span>
                                          <span className="text-base font-black text-[#1A8C28] block mt-0.5">
                                            {formatAmount(tier.amount)}
                                          </span>
                                        </div>
                                        <div className="mt-3 flex gap-1.5">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              trackEvent('book_click', {
                                                serviceSlug: srv.slug,
                                                tier: tier.label,
                                                sourcePage: '/pricing'
                                              });
                                              openModal({
                                                serviceTitle: `BHK Deep Cleaning – ${tier.label}`,
                                                tier: tier.label,
                                                sourcePage: '/pricing'
                                              });
                                            }}
                                            className="flex-1 min-h-[44px] py-2 px-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer flex items-center justify-center"
                                          >
                                            Book
                                          </button>
                                          <a
                                            href={buildQuickBookingWhatsAppUrl({
                                              service: srv.title,
                                              tierOrQuantity: tier.label,
                                              price: formatAmount(tier.amount)
                                            })}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="min-h-[44px] min-w-[44px] p-2 bg-[#1A8C28] text-white rounded-lg hover:bg-[#156E20] flex items-center justify-center shrink-0"
                                            title="WhatsApp"
                                            aria-label={`Book ${tier.label} via WhatsApp`}
                                          >
                                            <MessageCircle className="w-4 h-4" />
                                          </a>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Combo Offers Section */}
        <ComboOffersSection />

        {/* Footnote */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 text-center max-w-3xl mx-auto shadow-xs space-y-2">
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Prices shown are starting/indicative; final quote is confirmed after inspection.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => openModal({ serviceTitle: 'General Cleaning Quote', sourcePage: '/pricing' })}
              className="btn-homecare-green min-h-[48px] text-xs py-3 px-6 font-bold inline-flex items-center gap-1.5"
            >
              <span>Request Custom Site Inspection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

