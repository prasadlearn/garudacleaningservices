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
  ArrowRight,
  ShieldCheck,
  Home,
  Check,
  Clock
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { SERVICES_DATA, formatPrice } from '../data/servicesData';
import { useQuoteModal } from '../context/QuoteModalContext';
import { trackEvent } from '../utils/analytics';
import { ServiceIcon } from '../components/ServiceIcon';
import { BusinessContactNumbers } from '../components/BusinessContactNumbers';

export const RayachotyServiceAreaPage: React.FC = () => {
  const { openModal } = useQuoteModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Selected core services to highlight for Rayachoty
  const featuredServices = [
    SERVICES_DATA.find((s) => s.slug === 'home-cleaning'),
    SERVICES_DATA.find((s) => s.slug === 'sofa-cleaning'),
    SERVICES_DATA.find((s) => s.slug === 'washroom-cleaning'),
    SERVICES_DATA.find((s) => s.slug === 'kitchen-cleaning'),
    SERVICES_DATA.find((s) => s.slug === 'mattress-cleaning'),
    SERVICES_DATA.find((s) => s.slug === 'move-in-out-cleaning'),
    SERVICES_DATA.find((s) => s.slug === 'water-tank-cleaning'),
    SERVICES_DATA.find((s) => s.slug === 'office-cleaning'),
    SERVICES_DATA.find((s) => s.slug === 'post-construction-cleaning'),
  ].filter(Boolean) as typeof SERVICES_DATA;

  const faqs = [
    {
      q: "How does doorstep cleaning service work in Rayachoty?",
      a: "Garuda Cleaning Services is a service-area cleaning business. When you schedule an appointment, our trained cleaning crew travels directly to your home, apartment, or commercial property in Rayachoty equipped with heavy-duty rotary floor scrubbers, vacuum extractors, and surface-safe biological cleaning solutions."
    },
    {
      q: "Is there a walk-in office or storefront in Rayachoty?",
      a: "No. Garuda Cleaning Services is a pure service-area business. We do not operate a walk-in storefront or public shop in Rayachoty. All cleaning services, equipment handling, and assessments are performed directly at your home or property."
    },
    {
      q: "How do I book a cleaning appointment in Rayachoty?",
      a: "You can book directly by clicking 'Book a Cleaning Service', calling our primary line (+91 77995 52084) or alternative call line (+91 93916 13240), or sending us a message on WhatsApp. Simply share your service requirements and preferred time slot."
    },
    {
      q: "Are the prices for cleaning in Rayachoty standardized?",
      a: "Yes. All service pricing follows our transparent, standardized rate card based on property size (BHK or square footage) and the scope of work selected, ensuring transparent upfront estimates with zero surprise fees."
    },
    {
      q: "What are your operational working hours for Rayachoty bookings?",
      a: `Our cleaning teams are available Monday through Sunday from 8:00 AM to 8:00 PM. We recommend scheduling appointments in advance to secure your preferred date and time slot.`
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://garudacleaningservices.in/#organization",
        "name": BUSINESS_CONFIG.brandName,
        "description": "Professional residential, mechanized deep cleaning and commercial sanitization services across Rayachoty and Tirupati.",
        "url": "https://garudacleaningservices.in/service-areas/rayachoty",
        "telephone": "+917799552084",
        "priceRange": "₹₹",
        "areaServed": [
          {
            "@type": "City",
            "name": "Rayachoty"
          },
          {
            "@type": "City",
            "name": "Tirupati"
          }
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Rayachoty",
            "item": "https://garudacleaningservices.in/service-areas/rayachoty"
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* React 19 Head Hoisting */}
      <title>Cleaning Services in Rayachoty | Garuda Cleaning Services</title>
      <meta
        name="description"
        content="Professional cleaning services for homes and offices in Rayachoty by Garuda Cleaning Services. Doorstep mechanized cleaning for homes, villas, washrooms, kitchens, sofas, and offices."
      />
      <link rel="canonical" href="https://garudacleaningservices.in/service-areas/rayachoty" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SECTION 1: HERO */}
      <section className="relative bg-[#041B3B] text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22AC33_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
            <span>/</span>
            <span className="text-[#22AC33]">Rayachoty</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#22AC33] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#22AC33]" />
            <span>Rayachoty Service Area</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Cleaning Services in <span className="text-[#22AC33]">Rayachoty</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Professional cleaning services for homes, businesses, and properties in Rayachoty. Garuda Cleaning Services brings trained specialists, mechanized equipment, and surface-safe solutions straight to your doorstep.
          </p>

          {/* Dual Phone & Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                trackEvent('book_click', { sourcePage: '/service-areas/rayachoty' });
                openModal();
              }}
              className="btn-homecare-green min-h-[48px] px-7 text-sm font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Cleaning Service</span>
            </button>

            <a
              href={BUSINESS_CONFIG.buildWhatsAppUrl("Hello Garuda Cleaning Services, I would like to inquire about cleaning services in Rayachoty.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { sourcePage: '/service-areas/rayachoty' })}
              className="min-h-[48px] px-6 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp +91 77995 52084</span>
            </a>

            <a
              href="tel:+919391613240"
              onClick={() => trackEvent('call_click', { sourcePage: '/service-areas/rayachoty', target: 'alt_phone' })}
              className="min-h-[48px] px-6 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-[#22AC33]" />
              <span>Call +91 93916 13240</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22AC33]" />
              Doorstep Service at Your Location
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22AC33]" />
              Monday – Sunday (8:00 AM – 8:00 PM)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22AC33]" />
              Standardized Rate Card
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICE-AREA BUSINESS INFORMATION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#22AC33] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Doorstep Service Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B] tracking-tight">
              How Garuda Serves the Rayachoty Area
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Garuda Cleaning Services operates as a dedicated service-area business. Rather than requiring customers to visit an office, our mobile teams bring professional industrial vacuum extractors, high-speed single-disc floor scrubbers, and safe chemical formulations directly to your residence, business, or construction site in Rayachoty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-extrabold text-base text-[#041B3B]">Easy Booking & Consultation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect via WhatsApp or phone. Share your property type, required services, and preferred schedule for an upfront rate confirmation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-extrabold text-base text-[#041B3B]">On-Site Mechanized Cleaning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our trained technicians arrive at your location in Rayachoty with all necessary equipment, machinery, and eco-safe supplies.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-extrabold text-base text-[#041B3B]">Quality Inspection & Handover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We perform a thorough walkthrough and inspection with you upon completion to ensure complete satisfaction before sign-off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES AVAILABLE IN RAYACHOTY */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#22AC33] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B] tracking-tight">
              Cleaning Services Available in Rayachoty
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Complete residential, mechanized deep cleaning and commercial sanitization solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.slug}
                className="bg-slate-50 rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-md hover:border-[#22AC33]/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#22AC33] border border-slate-200 flex items-center justify-center">
                      <ServiceIcon slug={service.slug} name={service.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-black text-[#041B3B]">
                      {formatPrice(service.price)}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-[#041B3B]">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {service.inclusions && service.inclusions.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 space-y-1">
                      {service.inclusions.slice(0, 3).map((inc, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#22AC33] shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/60 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-bold text-[#041B3B] hover:text-[#22AC33] transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Inclusions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('book_click', { service: service.title, sourcePage: '/service-areas/rayachoty' });
                      openModal(service.title);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#22AC33] hover:bg-[#1A8C28] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-black text-[#22AC33] hover:underline"
            >
              <span>Explore All {SERVICES_DATA.length} Cleaning Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#22AC33] uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Rayachoty Service FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Clear information regarding our cleaning services in the Rayachoty service area.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white transition-all shadow-2xs"
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
      </section>

      {/* SECTION 5: FINAL CTA BAND */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#041B3B] to-[#0A2E5C] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#22AC33] text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Ready to Schedule Cleaning in Rayachoty?
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto">
            Get an instant estimate and book your preferred date. We bring rotary scrubbers, vacuum extractors, and surface-safe cleaners directly to your address.
          </p>

          <div className="pt-2 flex flex-col items-center justify-center gap-4 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => {
                trackEvent('book_click', { sourcePage: '/service-areas/rayachoty', action: 'bottom_cta' });
                openModal();
              }}
              className="btn-homecare-green w-full min-h-[48px] px-8 text-sm font-black flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Cleaning Service</span>
            </button>

            <div className="w-full">
              <BusinessContactNumbers variant="cta" sourcePage="/service-areas/rayachoty" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RayachotyServiceAreaPage;
