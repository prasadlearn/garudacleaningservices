import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  Check
} from 'lucide-react';
import {
  SERVICES_DATA,
  formatPrice,
  formatAmount,
  getServiceBySlug
} from '../data/servicesData';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { SafeImage } from '../components/SafeImage';
import { ServiceIcon } from '../components/ServiceIcon';
import { buildQuickBookingWhatsAppUrl } from '../utils/whatsappFormatter';
import { trackEvent } from '../utils/analytics';
import { AreasList } from '../components/AreasList';
import { ServiceBeforeAfter } from '../components/ServiceBeforeAfter';
import { PROJECT_PROCESS_STEPS } from '../data/galleryData';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openModal } = useQuoteModal();

  const [selectedBhkTier, setSelectedBhkTier] = useState<string>('2 BHK');
  const [unitCount, setUnitCount] = useState<number>(500);

  const service = getServiceBySlug(id || '') || SERVICES_DATA.find((s) => s.slug === id || s.id === id);

  if (!service || !service.enabled) {
    return <Navigate to="/services" replace />;
  }

  const isBhk = service.slug === 'bhk-deep-cleaning';
  const isPerUnit = service.price.kind === 'per-unit';
  const isInspection = service.price.kind === 'inspection';

  const bhkTiers = isBhk && service.price.kind === 'tiers' ? service.price.tiers : [];
  const activeBhkObj = bhkTiers.find((t) => t.label === selectedBhkTier) || bhkTiers[0];

  const formattedPrice = formatPrice(service.price);

  let activePriceText = formattedPrice;
  let activeDetailText: string | undefined = undefined;

  if (isBhk && activeBhkObj) {
    activePriceText = formatAmount(activeBhkObj.amount);
    activeDetailText = selectedBhkTier;
  } else if (isPerUnit && service.price.kind === 'per-unit') {
    if (service.price.max !== undefined && service.price.max !== service.price.min) {
      const minTot = service.price.min * unitCount;
      const maxTot = service.price.max * unitCount;
      activePriceText = `${formatAmount(minTot)} – ${formatAmount(maxTot)}`;
    } else {
      activePriceText = formatAmount(service.price.min * unitCount);
    }
    activeDetailText = `${unitCount} ${service.unitLabel}`;
  }

  const whatsappUrl = buildQuickBookingWhatsAppUrl({
    service: service.title,
    tierOrQuantity: activeDetailText,
    price: activePriceText
  });

  // Schema Offers generator
  const getOffersSchema = () => {
    switch (service.price.kind) {
      case 'fixed':
        return {
          '@type': 'Offer',
          price: service.price.amount,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock'
        };
      case 'from':
        return {
          '@type': 'AggregateOffer',
          lowPrice: service.price.amount,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock'
        };
      case 'per-unit':
        return {
          '@type': 'UnitPriceSpecification',
          price: service.price.min,
          priceCurrency: 'INR',
          unitText: service.price.unit,
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: 1,
            unitText: service.price.unit
          }
        };
      case 'tiers':
        return service.price.tiers.map((t) => ({
          '@type': 'Offer',
          name: t.label,
          price: t.amount,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock'
        }));
      case 'inspection':
        return undefined;
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_CONFIG.brandName,
      telephone: BUSINESS_CONFIG.contact.phoneTel,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tirupati',
        addressRegion: 'Andhra Pradesh'
      }
    },
    url: `https://garudacleaningservices.in/services/${service.slug}`,
    offers: getOffersSchema()
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://garudacleaningservices.in/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://garudacleaningservices.in/services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://garudacleaningservices.in/services/${service.slug}`
      }
    ]
  };

  const pageTitle = `${service.title} in Tirupati | Garuda Cleaning Services`;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* React 19 Head */}
      <title>{pageTitle}</title>
      <meta
        name="description"
        content={`${service.title} in Tirupati with upfront pricing (${formattedPrice}). ${service.shortDescription}`}
      />
      <link rel="canonical" href={`https://garudacleaningservices.in/services/${service.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }} />

      {/* 1. Hero Section */}
      <div className="bg-[#041B3B] text-white py-12 sm:py-16 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-emerald-400 font-bold">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-white/15">
                <ServiceIcon slug={service.slug} name={service.icon} className="w-3.5 h-3.5" />
                {service.category} Cleaning • Tirupati
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                {service.shortDescription}
              </p>

              <div className="pt-2">
                <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider">
                  {isInspection ? 'Pricing Model' : 'Indicative Pricing'}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#22AC33]">
                  {formattedPrice}
                </span>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('book_click', {
                      serviceSlug: service.slug,
                      tier: activeDetailText,
                      sourcePage: `/services/${service.slug}`
                    });
                    openModal({
                      serviceTitle: service.title,
                      tier: activeDetailText,
                      sourcePage: `/services/${service.slug}`
                    });
                  }}
                  className="btn-homecare-green text-xs sm:text-sm py-3 px-6 font-bold cursor-pointer flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isInspection ? 'Request Site Inspection' : 'Book This Service'}</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('whatsapp_click', {
                      serviceSlug: service.slug,
                      tier: activeDetailText,
                      sourcePage: `/services/${service.slug}`
                    })
                  }
                  className="btn-homecare-navy text-xs sm:text-sm py-3 px-6 border border-white/20 font-bold flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#22AC33]" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white/10 aspect-[4/3] bg-slate-900">
                <SafeImage
                  src={service.image || '/images/hero-interior.webp'}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {service.imageSource === 'illustrative' && (
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white/95 text-[11px] font-medium px-2.5 py-1 rounded-md shadow-xs pointer-events-none">
                    Representative image
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-10">

          {/* Section: Service Overview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 text-[#22AC33] text-xs font-black uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Service Overview</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#041B3B]">
              Why You Need Professional {service.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Standard dusting and manual wiping often leave behind stubborn hard-water crusts, oily cooking residues, or deeply embedded dust in carpet and upholstery fibers. Our specialized <strong>{service.title}</strong> in Tirupati utilizes professional equipment and safe descaling solutions to restore surfaces without causing abrasion or chemical damage.
            </p>
          </div>

          {/* Dynamic BHK Selector (if BHK service) */}
          {isBhk && bhkTiers.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-extrabold text-[#041B3B]">
                    Select Your Apartment / Flat Size
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click a tier to view the indicative rate:
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    openModal({
                      serviceTitle: 'Custom Quote for 5+ BHK / Large Home',
                      sourcePage: `/services/${service.slug}`
                    })
                  }
                  className="text-xs text-[#22AC33] font-bold hover:underline cursor-pointer"
                >
                  Larger home? Request a quote →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {bhkTiers.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setSelectedBhkTier(t.label)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedBhkTier === t.label
                        ? 'border-[#22AC33] bg-emerald-50/60 ring-1 ring-[#22AC33]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#041B3B]">{t.label}</div>
                    <div className="text-lg font-black text-[#22AC33] mt-2">
                      {formatAmount(t.amount)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Per-Unit Estimator (if per-unit service) */}
          {isPerUnit && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#041B3B]">
                Price Estimator for {service.title}
              </h2>
              <div className="flex items-center gap-4 flex-wrap">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Enter {service.unitLabel}:
                </label>
                <input
                  type="number"
                  min={1}
                  max={50000}
                  value={unitCount}
                  onChange={(e) => setUnitCount(Math.max(1, Number(e.target.value)))}
                  className="w-28 px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-center focus:border-[#22AC33] outline-none"
                />
                <span className="text-sm font-bold text-slate-600">{service.unitLabel}</span>
              </div>
              <p className="text-xs text-slate-500">
                Estimated price: <span className="font-bold text-[#22AC33] text-sm">{activePriceText}</span> (indicative only; final quote confirmed after inspection).
              </p>
            </div>
          )}

          {/* Section: What's Included */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#041B3B]">
              <CheckCircle2 className="w-5 h-5 text-[#22AC33]" />
              <h2 className="text-xl font-extrabold text-[#041B3B]">What's Included in This Service</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {service.whatsIncluded.map((inc, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-5 h-5 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">{inc}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 italic pt-2">
              Inclusions are verified on-site by our lead supervisor before starting work.
            </p>
          </div>

          {/* Section: Before & After Comparison Slider */}
          <ServiceBeforeAfter serviceSlug={service.slug} serviceTitle={service.title} />

          {/* Section: 5-Step Cleaning Process */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-[#041B3B]">
              <Sparkles className="w-5 h-5 text-[#22AC33]" />
              <h2 className="text-xl font-extrabold text-[#041B3B]">Our 5-Step Cleaning Method</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {PROJECT_PROCESS_STEPS.map((step) => (
                <div key={step.stepNumber} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#041B3B] text-white text-xs font-black flex items-center justify-center">
                    {step.stepNumber}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#041B3B] block leading-tight">{step.title}</span>
                    <span className="text-[10px] text-slate-500 mt-1 block leading-tight">{step.highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Why Choose Garuda */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#041B3B]">
              <Award className="w-5 h-5 text-[#22AC33]" />
              <h2 className="text-xl font-extrabold text-[#041B3B]">Why Choose Garuda Cleaning Services?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <span className="text-xs font-bold text-[#041B3B] block">Surface-Safe Products</span>
                <p className="text-[11px] text-slate-600 mt-1">Non-acidic formulations protecting vitrified tile enamel and chrome.</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <span className="text-xs font-bold text-[#041B3B] block">Mechanized Machinery</span>
                <p className="text-[11px] text-slate-600 mt-1">Single-disc scrubbers and high-suction extraction vacuums.</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <span className="text-xs font-bold text-[#041B3B] block">Joint Walkthrough</span>
                <p className="text-[11px] text-slate-600 mt-1">Room-by-room check with our supervisor before final payment.</p>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <div className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-600 text-center font-medium">
            Prices shown are starting/indicative; final quote is confirmed after inspection.
          </div>
        </div>

        {/* 3. Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Booking & Call Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-[#041B3B]">Direct Coordinator Contact</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Have special requirements or want a quick quote for your Tirupati home? Call or WhatsApp directly:
            </p>

            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              onClick={() =>
                trackEvent('call_click', { serviceSlug: service.slug, sourcePage: `/services/${service.slug}` })
              }
              className="w-full btn-homecare-green py-2.5 text-xs font-bold justify-center flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {BUSINESS_CONFIG.contact.phoneDisplay}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('whatsapp_click', { serviceSlug: service.slug, sourcePage: `/services/${service.slug}` })
              }
              className="w-full btn-homecare-navy py-2.5 text-xs font-bold justify-center flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#22AC33]" />
              <span>WhatsApp Instant Booking</span>
            </a>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#22AC33] shrink-0" />
              <span>Zero hidden transport fees within Tirupati.</span>
            </div>
          </div>

          {/* Other Related Services */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-extrabold text-[#041B3B] mb-2">Related Services in {service.category}</h3>
            <ul className="space-y-1.5 text-xs">
              {SERVICES_DATA.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-slate-700 hover:text-[#22AC33] flex items-center justify-between py-1.5 transition-colors group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{s.title}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#22AC33]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        <AreasList />
      </div>
    </div>
  );
};

export default ServiceDetailPage;

