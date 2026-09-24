import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { SERVICES_DATA, formatPrice } from '../data/servicesData';
import { useQuoteModal } from '../context/QuoteModalContext';
import { trackEvent } from '../utils/analytics';

export const ServiceAreaPage: React.FC = () => {
  const { openModal } = useQuoteModal();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // 6 Popular services from catalogue
  const popularServices = SERVICES_DATA.slice(0, 6);

  const faqs = [
    {
      q: "Do you provide cleaning services across all areas in Tirupati?",
      a: "Yes. We serve the entire city of Tirupati, covering residential apartments, independent villas, commercial spaces, and retail establishments. Nearby areas such as Renigunta, Chandragiri, and Tiruchanur are also served upon scheduling request."
    },
    {
      q: "How do I book a cleaning appointment for my locality?",
      a: "You can book instantly online by clicking 'Get Free Quote' or 'Book Now', selecting your service and entering your address. You can also message us directly on WhatsApp or call our team at +91 77995 52084."
    },
    {
      q: "How is the pricing confirmed for my location?",
      a: "Pricing is transparent and based strictly on our standardized rate card according to your property size (BHK or square footage) and the scope of cleaning required. There are no surprise hidden travel or fuel fees within Tirupati city limits."
    },
    {
      q: "What should I do if my specific colony or village is not listed?",
      a: "If your specific street, society, or colony is not listed on our areas chip grid, don't worry! We serve all of Tirupati. Simply send us your location pin on WhatsApp, and our coordinator will confirm your slot immediately."
    },
    {
      q: "What are your operational working hours?",
      a: `Our cleaning teams are available Monday through Sunday, ${BUSINESS_CONFIG.openingHoursLine}. Appointments can be scheduled in advance for your convenient time slot.`
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://garudacleaningservices.in/#organization",
        "name": BUSINESS_CONFIG.brandName,
        "description": "Professional residential and commercial mechanized cleaning services across all localities in Tirupati.",
        "url": "https://garudacleaningservices.in/service-areas",
        "telephone": BUSINESS_CONFIG.contact.phoneDisplay,
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": BUSINESS_CONFIG.contact.address,
          "addressLocality": "Tirupati",
          "addressRegion": "Andhra Pradesh",
          "postalCode": "517501",
          "addressCountry": "IN"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Tirupati"
          },
          ...(BUSINESS_CONFIG.coverage.nearbyOnRequest || []).map((area) => ({
            "@type": "Place",
            "name": `${area} (On Request)`
          }))
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://garudacleaningservices.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Service Areas",
            "item": "https://garudacleaningservices.in/service-areas"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  const handleBookInArea = (areaName: string) => {
    trackEvent('area_chip_click', { area: areaName });
    openModal('BHK Deep Cleaning');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* React 19 Head */}
      <title>Service Areas in Tirupati | Garuda Cleaning Services</title>
      <meta
        name="description"
        content="Garuda Cleaning Services covers all residential and commercial localities across Tirupati including Balaji Colony, Bhavani Nagar, MR Palli, AIR Bypass Road, and Renigunta."
      />
      <link rel="canonical" href="https://garudacleaningservices.in/service-areas" />
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SECTION A: HERO */}
      <section className="relative bg-[#041B3B] text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22AC33_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#22AC33] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#22AC33]" />
            <span>Serving All of Tirupati</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Cleaning Services Across <span className="text-[#22AC33]">Tirupati</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From Balaji Colony and AIR Bypass Road to Alipiri and MR Palli, Garuda Cleaning Services provides professional mechanized deep cleaning for homes, villas, and commercial spaces throughout Tirupati.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                trackEvent('book_click', { sourcePage: '/service-areas' });
                openModal();
              }}
              className="btn-homecare-green min-h-[48px] px-7 text-sm font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>

            <a
              href={BUSINESS_CONFIG.buildWhatsAppUrl("Hello Garuda Cleaning Services, I would like to inquire about cleaning service availability in my area in Tirupati.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { sourcePage: '/service-areas' })}
              className="min-h-[48px] px-6 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              onClick={() => trackEvent('call_click', { sourcePage: '/service-areas' })}
              className="min-h-[48px] px-6 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-[#22AC33]" />
              <span>Call Us</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22AC33]" />
              {BUSINESS_CONFIG.coverage.headline}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22AC33]" />
              {BUSINESS_CONFIG.openingHoursLine}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22AC33]" />
              Zero Hidden Travel Fees
            </span>
          </div>
        </div>
      </section>

      {/* SECTION B: LARGE TIRUPATI MAP */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B] tracking-tight">
            Citywide Service Coverage Map
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Centred on Tirupati, Andhra Pradesh. We bring heavy-duty mechanized cleaning equipment directly to your doorstep.
          </p>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-3xl border border-slate-200 shadow-md">
          <div className="relative w-full rounded-2xl overflow-hidden bg-slate-100 h-[340px] sm:h-[480px] ring-1 ring-slate-200/80">
            {!mapLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-400 space-y-2">
                <MapPin className="w-8 h-8 text-[#22AC33] animate-bounce" />
                <span className="text-xs font-semibold">Loading Tirupati Coverage Map...</span>
              </div>
            )}
            <iframe
              src={BUSINESS_CONFIG.coverage.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Map of Tirupati service coverage"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
              className="w-full h-full rounded-2xl"
            />

            {/* Top-Left Tirupati City Coverage Badge */}
            <div className="absolute top-3.5 left-3.5 z-[var(--z-content)] pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#041B3B]/90 backdrop-blur-md border border-[#22AC33]/50 text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#22AC33] animate-pulse shrink-0" />
              <span className="text-xs font-extrabold tracking-wide">Tirupati City</span>
            </div>

            {/* Stylized coverage area outline */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
              viewBox="0 0 800 500"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 170,110 C 270,75 450,70 580,95 C 690,120 735,215 705,320 C 675,410 530,445 385,435 C 240,425 125,385 105,280 C 90,195 115,130 170,110 Z"
                fill="rgba(34, 172, 51, 0.04)"
                stroke="#22AC33"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Semi-transparent brand-tinted vignette overlay at edges */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-[#041B3B]/20 shadow-[inset_0_0_50px_rgba(4,27,59,0.22)]" />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 font-medium">
              Approximate coverage area — we serve all localities within Tirupati city.
            </span>
            <a
              href={BUSINESS_CONFIG.coverage.mapDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#041B3B] font-bold transition-colors shrink-0"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION C: "AREAS WE SERVE" CHIP GRID */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#22AC33] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Localities in Tirupati</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B] tracking-tight">
              Areas We Serve in Tirupati
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Click any locality to book a mechanized cleaning service with prefilled location details.
            </p>
          </div>

          {/* Locality Chips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUSINESS_CONFIG.serviceAreas.map((area) => (
              <button
                key={area.name}
                type="button"
                onClick={() => handleBookInArea(area.name)}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-[#E8F8EC] border border-slate-200 hover:border-[#22AC33]/40 text-left transition-all duration-200 flex items-center justify-between group cursor-pointer shadow-2xs hover:shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#22AC33] flex items-center justify-center border border-slate-200 group-hover:border-[#22AC33] shrink-0 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-sm text-[#041B3B] group-hover:text-[#22AC33] transition-colors block truncate">
                      {area.name}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Tirupati • Full Coverage
                    </span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#22AC33] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0">
                  Book <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>

          {/* Nearby On Request notice */}
          {BUSINESS_CONFIG.coverage.nearbyOnRequest && BUSINESS_CONFIG.coverage.nearbyOnRequest.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
              <span className="font-bold text-[#041B3B]">Nearby Regions Served on Request: </span>
              {BUSINESS_CONFIG.coverage.nearbyOnRequest.join(', ')} (advance booking recommended).
            </div>
          )}

          {/* Closing Card: Don't see your locality? */}
          <div className="bg-[#041B3B] text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Don't see your locality listed above?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                We still serve your area! Garuda Cleaning Services covers all residential and commercial zones across Tirupati. Message or call us to confirm your location.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={BUSINESS_CONFIG.buildWhatsAppUrl("Hello Garuda Cleaning Services, I would like to check cleaning availability for my location in Tirupati.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { sourcePage: '/service-areas', action: 'unlisted_area' })}
                className="px-5 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
              <a
                href={BUSINESS_CONFIG.contact.phoneTel}
                onClick={() => trackEvent('call_click', { sourcePage: '/service-areas', action: 'unlisted_area' })}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#22AC33]" />
                <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: POPULAR SERVICES IN TIRUPATI */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#22AC33] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Catalogue</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B] tracking-tight">
            Popular Cleaning Services in Tirupati
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Professional mechanized equipment, eco-safe biological agents, and trained staff.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:border-[#22AC33]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#22AC33] bg-[#E8F8EC] px-3 py-1 rounded-full uppercase">
                    {service.category}
                  </span>
                  <span className="text-sm font-black text-[#041B3B]">
                    {formatPrice(service.price)}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-[#041B3B] group-hover:text-[#22AC33] transition-colors line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#041B3B] group-hover:text-[#22AC33]">
                <span>View Service Details & Pricing</span>
                <ArrowRight className="w-4 h-4 text-[#22AC33] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-black text-[#22AC33] hover:underline"
          >
            <span>Explore All 21 Deep Cleaning Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION E: HONEST FAQ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#22AC33] uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Service Area Inquiries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear, transparent answers about our coverage and booking process in Tirupati.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#041B3B] flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#22AC33]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION F: FINAL CTA BAND */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#041B3B] to-[#0A2E5C] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#22AC33] text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Ready to Schedule Your Cleaning in Tirupati?
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto">
            Get an instant free estimate and book your preferred date. Professional mechanized floor scrubbers, vacuum extractors, and surface-safe sanitization.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                trackEvent('book_click', { sourcePage: '/service-areas', action: 'bottom_cta' });
                openModal();
              }}
              className="btn-homecare-green min-h-[48px] px-8 text-sm font-black flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Get Free Quote</span>
            </button>

            <a
              href={BUSINESS_CONFIG.buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { sourcePage: '/service-areas', action: 'bottom_cta' })}
              className="min-h-[48px] px-6 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreaPage;
