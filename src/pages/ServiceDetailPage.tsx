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
  getServiceBySlug,
  getServiceInclusionCards,
  SLUG_REDIRECT_MAP
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
import { NotFoundPage } from './NotFoundPage';
import { BusinessContactNumbers } from '../components/BusinessContactNumbers';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openModal } = useQuoteModal();

  const [selectedBhkTier, setSelectedBhkTier] = useState<string>('2 BHK');
  const [unitCount, setUnitCount] = useState<number | ''>(500);

  // Check if this is an old URL that needs a canonical 301/SPA redirect
  if (id && SLUG_REDIRECT_MAP[id]) {
    return <Navigate to={`/services/${SLUG_REDIRECT_MAP[id]}`} replace />;
  }

  const service = getServiceBySlug(id || '');

  if (!service || !service.enabled) {
    return <NotFoundPage />;
  }

  const isHomeCleaning = service.slug === 'home-cleaning';
  const hasTiers = service.price.kind === 'tiers';
  const isPerUnit = service.price.kind === 'per-unit';
  const isQuoteOrInspection = service.price.kind === 'inspection' || service.price.kind === 'quote';

  const bhkTiers = service.price.kind === 'tiers' ? service.price.tiers : [];
  const activeBhkObj = bhkTiers.find((t) => t.label === selectedBhkTier) || bhkTiers[0];

  const formattedPrice = formatPrice(service.price);

  let activePriceText = formattedPrice;
  let activeDetailText: string | undefined = undefined;

  const effectiveUnits = typeof unitCount === 'number' && unitCount > 0 ? unitCount : 1;

  if (hasTiers && activeBhkObj) {
    activePriceText = formatAmount(activeBhkObj.amount);
    activeDetailText = selectedBhkTier;
  } else if (isPerUnit && service.price.kind === 'per-unit') {
    if (service.price.max !== undefined && service.price.max !== service.price.min) {
      const minTot = service.price.min * effectiveUnits;
      const maxTot = service.price.max * effectiveUnits;
      activePriceText = `${formatAmount(minTot)} – ${formatAmount(maxTot)}`;
    } else {
      activePriceText = formatAmount(service.price.min * effectiveUnits);
    }
    activeDetailText = `${effectiveUnits} ${service.unitLabel}`;
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
        return service.price.tiers
          .filter(t => t.amount !== null && t.amount !== undefined)
          .map((t) => ({
            '@type': 'Offer',
            name: t.label,
            price: t.amount ?? undefined,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock'
          }));
      case 'inspection':
      case 'quote':
        return undefined;
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: BUSINESS_CONFIG.brandName,
      telephone: BUSINESS_CONFIG.contact.phoneTel,
      areaServed: [
        {
          '@type': 'City',
          name: 'Tirupati'
        },
        {
          '@type': 'City',
          name: 'Rayachoty'
        }
      ]
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

  const getCustomPageTitle = (slug: string, title: string): string => {
    switch (slug) {
      case 'home-cleaning':
        return 'Home Cleaning in Tirupati | 1, 2 & 3 BHK';
      case 'villa-cleaning':
        return 'Villa Cleaning in Tirupati | Get a Quote';
      case 'kitchen-cleaning':
        return 'Kitchen Cleaning in Tirupati | ₹999';
      case 'washroom-cleaning':
        return 'Washroom Cleaning in Tirupati | ₹449';
      case 'mattress-cleaning':
        return 'Mattress Cleaning in Tirupati | ₹349';
      case 'sofa-cleaning':
        return 'Sofa Cleaning in Tirupati | ₹249/Seat';
      case 'carpet-cleaning':
        return 'Carpet Cleaning in Tirupati | ₹499';
      case 'move-in-out-cleaning':
        return 'Move-In & Move-Out Cleaning in Tirupati';
      case 'fridge-cleaning':
        return 'Fridge Cleaning in Tirupati | ₹299';
      case 'pest-control':
        return 'Pest Control in Tirupati | BHK & Villa Services';
      case 'water-tank-cleaning':
        return 'Water Tank & Sump Cleaning in Tirupati';
      case 'window-cleaning':
        return 'Window Cleaning in Tirupati | ₹199';
      case 'glass-cleaning':
        return 'Glass Cleaning in Tirupati | ₹149';
      case 'fan-cleaning':
        return 'Fan Cleaning in Tirupati | ₹99';
      case 'post-construction-cleaning':
        return 'Post-Construction Cleaning in Tirupati | From ₹5/sq.ft';
      case 'office-cleaning':
        return 'Office Cleaning in Tirupati | From ₹5/sq.ft';
      case 'shop-cleaning':
        return 'Shop Cleaning in Tirupati';
      case 'hotel-guest-house-cleaning':
        return 'Hotel & Guest House Cleaning in Tirupati';
      case 'school-classroom-cleaning':
        return 'School & Classroom Cleaning in Tirupati';
      default:
        return `${title} in Tirupati | Garuda Cleaning Services`;
    }
  };

  const getCustomMetaDescription = (slug: string): string => {
    switch (slug) {
      case 'home-cleaning':
        return 'Complete home cleaning services in Tirupati for 1 BHK (₹2,399), 2 BHK (₹3,299), and 3 BHK (₹4,999). Book online or get a quote on WhatsApp.';
      case 'villa-cleaning':
        return 'Comprehensive villa and duplex house cleaning services in Tirupati across all floors, washrooms, balconies, and living areas. Get a customized quote.';
      case 'kitchen-cleaning':
        return 'Thorough kitchen cleaning in Tirupati for ₹999. Degreasing of countertops, wall tiles, sinks, and exhaust areas with food-safe solutions.';
      case 'washroom-cleaning':
        return 'Effective washroom and bathroom descaling in Tirupati for ₹449. Removes hard water white scale from tiles, commodes, basins, and taps.';
      case 'mattress-cleaning':
        return 'Hygienic mattress vacuuming and dust mite extraction in Tirupati for ₹349. Keeps sleeping areas fresh and allergen-free.';
      case 'sofa-cleaning':
        return 'Fabric sofa seat foam shampooing and vacuum extraction in Tirupati at ₹249 per seat. Lifts stains, grime, and food spots.';
      case 'carpet-cleaning':
        return 'Professional carpet shampooing and water extraction in Tirupati for ₹499. Restores clean textures and lifts ground-in dirt.';
      case 'move-in-out-cleaning':
        return 'Vacant apartment and house move-in & move-out cleaning in Tirupati for ₹1,499. Cleans cupboards, washrooms, kitchens, and floors.';
      case 'fridge-cleaning':
        return 'Refrigerator interior shelf washing, food-safe sanitization, and odor removal in Tirupati starting from ₹299. Book online or WhatsApp.';
      case 'pest-control':
        return 'Targeted pest control treatment for cockroaches and household pests in Tirupati. 1 BHK ₹1,000, 2 BHK ₹1,200, 3 BHK ₹1,400, Villa ₹3,000.';
      case 'water-tank-cleaning':
        return 'High-pressure water jet and sump cleaning in Tirupati. Up to 800L (₹699), 1000L (₹1,199), and >1000L (₹1,799).';
      case 'window-cleaning':
        return 'Streak-free window glass and sliding channel track vacuuming in Tirupati at ₹199 per window.';
      case 'glass-cleaning':
        return 'Crystal clear partition, window, and door glass cleaning in Tirupati at ₹149 with rubber squeegee finish. Book online.';
      case 'fan-cleaning':
        return 'Ceiling fan degreasing and blade dust removal in Tirupati at ₹99 per fan.';
      case 'post-construction-cleaning':
        return 'Post-renovation and post-construction paint scraping, cement dust extraction, and floor cleaning in Tirupati from ₹5/sq.ft.';
      case 'office-cleaning':
        return 'Professional office and commercial workspace cleaning in Tirupati starting from ₹5/sq.ft. Desks, floors, glass, and washrooms.';
      case 'shop-cleaning':
        return 'Retail showroom and supermarket floor and glass cleaning in Tirupati. Contact us for commercial pricing and scheduling.';
      case 'hotel-guest-house-cleaning':
        return 'Dedicated guest room, washroom, and lodge cleaning in Tirupati for hospitality businesses and pilgrim stay facilities.';
      case 'school-classroom-cleaning':
        return 'Sanitizing school classrooms, student benches, hallways, and washrooms across Tirupati institutions. Request a customized quote.';
      default:
        return `${service.title} in Tirupati with upfront pricing (${formattedPrice}). ${service.shortDescription}`;
    }
  };

  const getCategoryBadgeLabel = (serviceSlug: string, category: string): string => {
    if (serviceSlug === 'hotel-guest-house-cleaning') {
      return 'HOTEL & GUEST HOUSE CLEANING • TIRUPATI';
    }
    if (serviceSlug === 'school-classroom-cleaning') {
      return 'INSTITUTIONAL CLEANING • TIRUPATI';
    }
    return `${category.toUpperCase()} CLEANING • TIRUPATI`;
  };

  const pageTitle = getCustomPageTitle(service.slug, service.title);
  const metaDescription = getCustomMetaDescription(service.slug);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* React 19 Head */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
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
                {getCategoryBadgeLabel(service.slug, service.category)}
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                {service.shortDescription}
              </p>

              <div className="pt-2">
                <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider">
                  {isQuoteOrInspection ? 'Assessment' : 'Starting From'}
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
                  <span>{isQuoteOrInspection ? 'Request a Quote' : 'Book This Service'}</span>
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
              Daily sweeping and normal cloth wiping cannot remove hard water white salt marks, sticky oil grease, or settled dirt inside floor tiles and fixtures. Our team brings powerful floor scrubbing equipment, high-suction vacuums, and safe cleaning solutions to make your property spotlessly clean and fresh without damaging your tiles or fittings.
            </p>
          </div>

          {/* Dynamic Tier / Apartment Size Selector */}
          {hasTiers && bhkTiers.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-extrabold text-[#041B3B]">
                    Select Your Property Size / Tier
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click a tier to view the rate:
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    openModal({
                      serviceTitle: `Custom Quote for ${service.title}`,
                      sourcePage: `/services/${service.slug}`
                    })
                  }
                  className="text-xs text-[#22AC33] font-bold hover:underline cursor-pointer"
                >
                  Custom or large requirement? Request a quote →
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-3">
                {bhkTiers.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setSelectedBhkTier(t.label)}
                    className={`p-2 sm:p-4 rounded-xl sm:rounded-2xl border text-center sm:text-left transition-all cursor-pointer min-w-0 ${
                      selectedBhkTier === t.label
                        ? 'border-[#22AC33] bg-emerald-50/70 ring-1.5 ring-[#22AC33]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[10px] sm:text-xs font-bold text-[#041B3B] uppercase tracking-wider truncate">{t.label}</div>
                    <div className="text-xs sm:text-base md:text-lg font-black text-[#22AC33] mt-0.5 sm:mt-2 whitespace-nowrap">
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
                  onChange={(e) => setUnitCount(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                  onBlur={() => {
                    if (unitCount === '' || unitCount < 1) {
                      setUnitCount(1);
                    }
                  }}
                  className="w-28 px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-center focus:border-[#22AC33] outline-none"
                />
                <span className="text-sm font-bold text-slate-600">{service.unitLabel}</span>
              </div>
              <p className="text-xs text-slate-500">
                Estimated price: <span className="font-bold text-[#22AC33] text-sm">{activePriceText}</span> (indicative only; final quote confirmed after inspection).
              </p>
            </div>
          )}

          {/* Section: What's Included with Visual Area Breakdown */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-[#041B3B]">
                <CheckCircle2 className="w-5 h-5 text-[#22AC33]" />
                <h2 className="text-xl font-extrabold text-[#041B3B]">What's Included in This Service</h2>
              </div>
              <span className="text-xs font-bold text-[#22AC33] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Surface-Safe Standards
              </span>
            </div>

            {/* Visual Area Breakdown Cards (Max 2 service-specific focus cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getServiceInclusionCards(service.slug).map((card, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="h-44 overflow-hidden relative bg-slate-900">
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {card.tag}
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="text-sm font-black text-[#041B3B]">{card.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-1">
                    <div className="text-[11px] text-[#22AC33] font-bold flex items-center gap-1.5 border-t border-slate-200/60 pt-2">
                      <Check className="w-3.5 h-3.5" /> {card.benefit}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checklist items */}
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
            <p className="text-[11px] text-slate-500 italic pt-1">
              Inclusions are confirmed on-site before starting work.
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
                <span className="text-xs font-bold text-[#041B3B] block">Mechanized Equipment</span>
                <p className="text-[11px] text-slate-600 mt-1">Industrial vacuum extractors and surface-safe scrubbers.</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <span className="text-xs font-bold text-[#041B3B] block">Joint Walkthrough</span>
                <p className="text-[11px] text-slate-600 mt-1">Room-by-room check with our team before final payment.</p>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <div className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-600 text-center font-medium">
            Prices shown are upfront indicative rates; final quote is confirmed after on-site walkthrough.
          </div>
        </div>

        {/* 3. Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Booking & Call Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-[#041B3B]">Direct Coordinator Contact</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Professional {service.title.toLowerCase()} available across Tirupati and Rayachoty. Contact our coordinator:
            </p>

            <BusinessContactNumbers variant="compact" sourcePage={`/services/${service.slug}`} />

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_click', { serviceSlug: service.slug, sourcePage: `/services/${service.slug}` })
                }
                className="w-full btn-homecare-green py-2.5 text-xs font-bold justify-center flex items-center gap-2 shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Booking &amp; Photos</span>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#22AC33] shrink-0" />
              <span>Doorstep mechanized cleaning across Tirupati &amp; Rayachoty.</span>
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
