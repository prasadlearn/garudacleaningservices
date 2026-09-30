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
  const isInspection = service.price.kind === 'inspection' || service.price.kind === 'quote';

  const bhkTiers = service.price.kind === 'tiers' ? service.price.tiers : [];
  const activeBhkObj = bhkTiers.find((t) => t.label === selectedBhkTier) || bhkTiers[0];

  const formattedPrice = formatPrice(service.price);

  let activePriceText = formattedPrice;
  let activeDetailText: string | undefined = undefined;

  const effectiveUnits = typeof unitCount === 'number' && unitCount > 0 ? unitCount : 1;

  if (isHomeCleaning && activeBhkObj) {
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

  const getCustomPageTitle = (slug: string, title: string): string => {
    switch (slug) {
      case 'home-cleaning':
        return 'Home Cleaning in Tirupati | 1, 2 & 3 BHK | Garuda Cleaning Services';
      case 'villa-cleaning':
        return 'Villa Cleaning in Tirupati | Garuda Cleaning Services';
      case 'kitchen-cleaning':
        return 'Kitchen Cleaning in Tirupati | ₹999 | Garuda Cleaning Services';
      case 'washroom-cleaning':
        return 'Washroom Cleaning in Tirupati | ₹449 | Garuda Cleaning Services';
      case 'mattress-cleaning':
        return 'Mattress Cleaning in Tirupati | ₹349 | Garuda Cleaning Services';
      case 'sofa-cleaning':
        return 'Sofa Cleaning in Tirupati | From ₹249/Seat | Garuda Cleaning Services';
      case 'carpet-cleaning':
        return 'Carpet Cleaning in Tirupati | ₹499 | Garuda Cleaning Services';
      case 'move-in-out-cleaning':
        return 'Move-In & Move-Out Cleaning in Tirupati | Garuda Cleaning Services';
      case 'fridge-cleaning':
        return 'Fridge Cleaning in Tirupati | Get a Quote | Garuda Cleaning Services';
      case 'pest-control':
        return 'Pest Control in Tirupati | BHK & Villa Services | Garuda Cleaning Services';
      case 'water-tank-cleaning':
        return 'Water Tank & Sump Cleaning in Tirupati | Garuda Cleaning Services';
      case 'window-cleaning':
        return 'Window Cleaning in Tirupati | Garuda Cleaning Services';
      case 'glass-cleaning':
        return 'Glass Cleaning in Tirupati | Garuda Cleaning Services';
      case 'fan-cleaning':
        return 'Fan Cleaning in Tirupati | Garuda Cleaning Services';
      case 'post-construction-cleaning':
        return 'Post-Construction Cleaning in Tirupati | From ₹5/sq.ft';
      case 'office-cleaning':
        return 'Office Cleaning in Tirupati | From ₹5/sq.ft';
      case 'shop-cleaning':
        return 'Shop Cleaning in Tirupati | Garuda Cleaning Services';
      case 'hotel-guest-house-cleaning':
        return 'Hotel & Guest House Cleaning in Tirupati | Garuda Cleaning Services';
      case 'school-classroom-cleaning':
        return 'School & Classroom Cleaning in Tirupati | Garuda Cleaning Services';
      default:
        return `${title} in Tirupati | Garuda Cleaning Services`;
    }
  };

  const pageTitle = getCustomPageTitle(service.slug, service.title);

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
              Daily sweeping and normal cloth wiping cannot remove hard water white salt marks, sticky oil grease, or settled dirt inside floor tiles and fixtures. Our team brings powerful single-disc floor scrubbers, high-suction vacuums, and safe cleaning solutions to make your property spotlessly clean and fresh without damaging your tiles or fittings.
            </p>
          </div>

          {/* Dynamic BHK Selector (if Home Cleaning) */}
          {isHomeCleaning && bhkTiers.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-extrabold text-[#041B3B]">
                    Select Your Apartment / Flat Size
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click a tier to view the rate:
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    openModal({
                      serviceTitle: 'Custom Quote for 4+ BHK / Villa',
                      sourcePage: `/services/${service.slug}`
                    })
                  }
                  className="text-xs text-[#22AC33] font-bold hover:underline cursor-pointer"
                >
                  Larger home or villa? Request a quote →
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
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

          {/* Section: What's Included with Visual Equipment & Areas Breakdown */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-[#041B3B]">
                <CheckCircle2 className="w-5 h-5 text-[#22AC33]" />
                <h2 className="text-xl font-extrabold text-[#041B3B]">What's Included in This Service</h2>
              </div>
              <span className="text-xs font-bold text-[#22AC33] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Supervisor Verified
              </span>
            </div>

            {/* Visual Equipment & Area Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(isHomeCleaning || service.slug === 'villa-cleaning' || service.slug === 'move-in-out-cleaning' || service.slug === 'post-construction-cleaning') ? (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/floor-machine.webp"
                        alt="Single-disc floor scrubbing machine"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Floor Machine Scrubbing
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Floor Scrubbing Machine</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Rotary machine scrubs vitrified, marble, and tile floors to remove black grout dirt and bring back shine.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Single-Disc Machine + Wet Mop
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/bathroom-tools.webp"
                        alt="Washroom tile cleaning tools"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Washroom Tile Cleaning
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Hard Water Stain Removal</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Safe acid-free cleaner removes white salt marks from wall tiles, commode, washbasins, and steel taps without damaging tile color.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Safe Scale Cleaner
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/kitchen-tools.webp"
                        alt="Kitchen degreasing kit"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Kitchen Oil Removal
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Cooking Oil & Grease Cleaning</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Countertop slabs, wall tiles, steel sink, and outer chimney hood cleaned with safe oil-removing spray.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Food-Safe Degreaser
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/window-tools.webp"
                        alt="Window wiper and channel brush"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Windows & Fans
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Sliding Tracks & Ceiling Fans</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Vacuuming dust from sliding window channels, streak-free rubber wiper for glass, ceiling fan blades dusted, and switchboards wiped.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Rubber Wiper + Channel Brush
                      </div>
                    </div>
                  </div>
                </>
              ) : service.slug === 'washroom-cleaning' ? (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/bathroom-tools.webp"
                        alt="Washroom descaling equipment"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Hard Water Solution
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="text-sm font-black text-[#041B3B]">Wall Tiles & Grout Cleaning</h3>
                      <p className="text-xs text-slate-600">Removes borewell hard water deposits (uppu karalu) and soap scum without harming tile glaze.</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/bathroom-tools.webp"
                        alt="Sanitaryware and chrome tap care"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Chrome & Glass
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="text-sm font-black text-[#041B3B]">Taps, Commode & Mirrors</h3>
                      <p className="text-xs text-slate-600">Acid-free chrome polishing, toilet rim sanitization, and streak-free partition glass wipe.</p>
                    </div>
                  </div>
                </>
              ) : service.slug === 'sofa-cleaning' || service.slug === 'carpet-cleaning' || service.slug === 'mattress-cleaning' ? (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/sofa-vacuum.webp"
                        alt="Fabric injection extraction wand"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Extraction Tool
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="text-sm font-black text-[#041B3B]">Injection-Extraction Vacuum</h3>
                      <p className="text-xs text-slate-600">High-suction extraction wand injects foam and suctions out trapped dirt and allergens.</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/full-kit.webp"
                        alt="Commercial vacuum kit"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Fabric Shampoo
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="text-sm font-black text-[#041B3B]">Stain Spot Treatment</h3>
                      <p className="text-xs text-slate-600">Fabric-friendly shampoo loosens beverage spills, food spots, and armrest grease safely.</p>
                    </div>
                  </div>
                </>
              ) : service.slug === 'kitchen-cleaning' ? (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/kitchen-tools.webp"
                        alt="Kitchen degreasing tools"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Oil Degreasing
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="text-sm font-black text-[#041B3B]">Platform & Backsplash Tiles</h3>
                      <p className="text-xs text-slate-600">Heavy cooking oil grease, masala stains, and grime lifted with professional food-safe degreaser.</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/kitchen-tools.webp"
                        alt="Sink and chimney exterior clean"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Exhaust & Sink
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="text-sm font-black text-[#041B3B]">Exhaust, Chimney & Steel Sink</h3>
                      <p className="text-xs text-slate-600">Detailed wipe-down of chimney mesh exterior, exhaust fan blades, and stainless steel sink polishing.</p>
                    </div>
                  </div>
                </>
              ) : service.slug === 'fridge-cleaning' ? (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/services/fridge-cleaning.webp"
                        alt="Refrigerator interior sanitization"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Hygienic Washing
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Shelf & Tray Washing</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          All removable shelves and bins washed with food-safe anti-bacterial liquid to remove dried spills and stains.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Food-Safe Sanitizer
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/kitchen-tools.webp"
                        alt="Gasket seal and odor neutralizing"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Odor & Gaskets
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Door Gasket & Deodorizing</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Mold and grime cleared from rubber door gaskets and interior air vents deodorized for fresh smelling food storage.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Gasket Mold Remover
                      </div>
                    </div>
                  </div>
                </>
              ) : service.slug === 'pest-control' ? (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/services/pest-control.webp"
                        alt="Herbal gel baiting and odorless pest control"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Herbal Gel Baiting
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Cockroach & Ant Gel Treatment</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Odorless herbal dots placed strategically in cabinet hinges, drawers, and under appliances to eradicate nests.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Targeted Gel Baiting
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/full-kit.webp"
                        alt="Barrier spray and drain protection"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Crevice & Drain Barrier
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Skirting & Pipe Protection</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Precision barrier spraying along skirting walls and bathroom drainage pipes to protect key entry points.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Perimeter Barrier Spray
                      </div>
                    </div>
                  </div>
                </>
              ) : service.slug === 'water-tank-cleaning' ? (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/full-kit.webp"
                        alt="Submersible pump and dirty water extraction kit"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Bottom Mud & Water Draining
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Mud & Silt Water Extraction</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Submersible water pump completely drains dirty water and removes thick mud and silt settled at the bottom of both underground sumps and overhead tanks.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Submersible Drainage Pump + Hose
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/services/water-tank-cleaning.webp"
                        alt="High-pressure jet wash and tank wall descaling"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        High-Pressure Washing
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">High-Pressure Jet & Sanitization</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          High-pressure jet wash cleans green algae, slime, and dirt from tank and sump walls, finished with an antibacterial clean water wash.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Pressure Jet + Antibacterial Rinse
                      </div>
                    </div>
                  </div>
                </>
              ) : (service.slug === 'window-cleaning' || service.slug === 'glass-cleaning') ? (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/window-tools.webp"
                        alt="Sliding track crevice vacuum and brush"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Track Detailing
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Sliding Track & Channel Vacuum</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Precision vacuum nozzles and track brushes remove years of compacted dust, dead insects, and grit from sliding window channels.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Crevice Nozzle + Track Brush
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/services/glass-cleaning.webp"
                        alt="Streak-free squeegee glass cleaning"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Streak-Free Glass
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Streak-Free Squeegee Shine</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          High-grade rubber squeegee wipes away water spots, mineral scale, and fingerprint smudges leaving crystal-clear glass panels.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Pro Rubber Squeegee + Microfiber
                      </div>
                    </div>
                  </div>
                </>
              ) : service.slug === 'fan-cleaning' ? (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/services/fan-cleaning.webp"
                        alt="Fan blade degreasing"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Blade Degreasing
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Sticky Oil & Dust Removal</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Specialized cleaning wraps break down sticky kitchen and bedroom grease film on both sides of fan blades without bending them.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Degreaser + Microfiber Wrap
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/full-kit.webp"
                        alt="Ceiling fan motor and canopy dusting"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Motor Detailing
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Motor Housing & Downrod Clean</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Dust extraction from motor vents, canopy covers, and downrods with protective floor sheeting to keep furniture spotless.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Drop Sheet + Motor Brush
                      </div>
                    </div>
                  </div>
                </>
              ) : (service.slug === 'office-cleaning' || service.slug === 'shop-cleaning' || service.slug === 'school-classroom-cleaning' || service.slug === 'hotel-guest-house-cleaning') ? (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/floor-machine.webp"
                        alt="Commercial single disc floor scrubbing"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        High-Torque Scrubbing
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Commercial Floor Scrubbing & Wash</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Single-disc scrubbing machine restores high-traffic corridors, retail showroom floors, office halls & dining spaces to a mirror shine.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Single-Disc Machine + Wet Extractor
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/full-kit.webp"
                        alt="Workstation and washroom sanitization kit"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Workspace & Washrooms
                      </span>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#041B3B]">Desks, Partitions & Washrooms</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Vacuuming of desks, sanitization of shared washrooms, streak-free glass partition wipe-down & pantry cleaning.
                        </p>
                      </div>
                      <div className="text-[11px] text-[#22AC33] font-bold pt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Vacuum + Surface Sanitizer
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/full-kit.webp"
                        alt="Commercial cleaning equipment"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Mechanized Tools
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="text-sm font-black text-[#041B3B]">Professional Cleaning Tools</h3>
                      <p className="text-xs text-slate-600">Industrial floor scrubbers, wet/dry vacuums, and surface-safe solutions suited for the task.</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col">
                    <div className="h-40 overflow-hidden relative bg-slate-900">
                      <img
                        src="/images/equipment/window-tools.webp"
                        alt="Detailing and wiping tools"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#041B3B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        Surface Detailing
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="text-sm font-black text-[#041B3B]">Edge & Glass Detailing</h3>
                      <p className="text-xs text-slate-600">Color-coded microfiber towels, squeegees, and precision corner brushes for spotless finish.</p>
                    </div>
                  </div>
                </>
              )}
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
            <p className="text-[11px] text-slate-400 italic pt-1">
              Inclusions are verified on-site by our lead supervisor before starting work.
            </p>
          </div>

          {/* Section: Professional Equipment Kit Banner */}
          <div className="bg-[#041B3B] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xs space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
                  <Zap className="w-4 h-4" />
                  <span>On-Site Machinery & Gear</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Professional Equipment We Bring To Your Home
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  We do not rely on standard domestic brooms. Garuda teams arrive equipped with single-disc floor buffers, industrial wet/dry vacuum extractors, non-scratch microfiber tools, and specialized non-acidic descaling liquids.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Single-Disc Rotary Scrubber</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Commercial Wet-Dry Vacuum</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acid-Free Descalers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Rubber Window Squeegees</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg aspect-[4/3] bg-slate-900">
                  <img
                    src="/images/equipment/full-kit.webp"
                    alt="Garuda Professional Cleaning Equipment Kit"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
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
