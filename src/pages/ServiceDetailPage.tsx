import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wrench,
  HelpCircle,
  Plus,
  Minus,
  Check,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { AreasList } from '../components/AreasList';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openModal } = useQuoteModal();

  const service = SERVICES_DATA.find((s) => s.slug === id || s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const [selectedPlanIdx, setSelectedPlanIdx] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const currentPrice = service.bhkPricing && service.bhkPricing[selectedPlanIdx]
    ? service.bhkPricing[selectedPlanIdx].price
    : service.priceStarting;

  const currentDuration = service.bhkPricing && service.bhkPricing[selectedPlanIdx]
    ? service.bhkPricing[selectedPlanIdx].time
    : service.duration;

  return (
    <div className="pt-20 bg-[#F8FAFC]">
      {/* Banner */}
      <div className="bg-gradient-to-b from-[#041B3B] via-[#052550] to-[#041B3B] text-white py-14 sm:py-20 px-4 sm:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-5 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#22AC33] font-bold">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="homecare-pill bg-white/15 text-[#22AC33] border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                {service.category} Detailing in Tirupati
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {service.shortDesc}
              </p>

              {/* Quick Specs Strip */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {service.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/15"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22AC33]" />
                    {h}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => openModal(`${service.title} - ${service.bhkPricing ? service.bhkPricing[selectedPlanIdx]?.type : ''}`)}
                  className="btn-homecare-green text-sm py-3 px-8 font-bold shine-effect"
                >
                  Book This Service
                </button>
                <a
                  href={BUSINESS_CONFIG.contact.phoneTel}
                  className="btn-homecare-navy text-sm py-3 px-8 border border-white/20 font-bold"
                >
                  <Phone className="w-4 h-4 text-[#FFD700]" />
                  Call: {BUSINESS_CONFIG.contact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] bg-slate-900 group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* BHK Config / Unit Pricing Matrix */}
          {service.bhkPricing && service.bhkPricing.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#041B3B] flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#22AC33]" />
                    Select Property Type & Transparent Pricing
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Click your room or property size to see transparent starting prices.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {service.bhkPricing.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPlanIdx(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPlanIdx === idx
                        ? 'border-[#22AC33] bg-[#E8F8EC] ring-2 ring-[#22AC33]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-[#041B3B]">{item.type}</div>
                      <div className="text-xs text-slate-500 mt-0.5">⏱ {item.time}</div>
                    </div>
                    <div className="text-xl font-black text-[#22AC33] mt-3">{item.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Overview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#041B3B]">
              About This Service
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Inclusions & Exclusions Side-by-Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Inclusions */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 bg-gradient-to-b from-white to-emerald-50/30 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-[#22AC33]" />
                <h3 className="text-lg font-extrabold text-[#041B3B]">What's Included</h3>
              </div>
              <ul className="space-y-3 pt-1">
                {service.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                    <Check className="w-4 h-4 text-[#22AC33] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-800">
                <XCircle className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-extrabold text-[#041B3B]">What's Not Included</h3>
              </div>
              <ul className="space-y-3 pt-1">
                {service.exclusions && service.exclusions.length > 0 ? (
                  service.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-500 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-1.5" />
                      <span>{exc}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-slate-500">
                    Structural repairs or civil modifications are not part of deep sanitation.
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Execution Process Workflow */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#041B3B]">
              Standard 5-Step Execution Workflow
            </h2>
            <div className="space-y-3">
              {service.process.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/90 hover:border-emerald-200 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-[#041B3B] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed block">
                      {step}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Equipment & Eco-Safe Chemicals */}
          <div className="bg-[#041B3B] text-white p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#FFD700]" />
              <h2 className="text-xl font-black">Certified Machinery & Diversey Formulations</h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm">
              We never use cheap unbranded local acids. Our team deploys hospital-grade equipment and safe materials:
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {service.equipment.map((eq, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/15"
                >
                  ✓ {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Service Specific FAQ */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#041B3B] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#22AC33]" />
              Questions About {service.title}
            </h2>

            <div className="space-y-3 pt-2">
              {service.faqs.map((f, i) => {
                const isOpen = openFaqIdx === i;
                return (
                  <div
                    key={i}
                    className={`border transition-all rounded-2xl overflow-hidden ${
                      isOpen ? 'border-[#22AC33] bg-[#E8F8EC]/30' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : i)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#041B3B] cursor-pointer"
                    >
                      <span>{f.q}</span>
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[#22AC33]">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                            {f.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky Booking Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-5 sticky top-28">
            <div>
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                Current Configuration
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#22AC33] mt-1">
                {currentPrice}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#041B3B]" />
                Estimated Duration: {currentDuration}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => openModal(`${service.title} (${currentPrice})`)}
                className="btn-homecare-green w-full text-xs py-3.5 justify-center font-black shine-effect shadow-md"
              >
                Instant Online Booking
              </button>

              <a
                href={BUSINESS_CONFIG.buildWhatsAppUrl(
                  `Hi Garuda, I want to book ${service.title} (${currentPrice}) in Tirupati.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-homecare-navy w-full text-xs py-3.5 justify-center font-bold"
              >
                <MessageCircle className="w-4 h-4 text-[#22AC33]" />
                WhatsApp Quick Slot
              </a>

              <a
                href={BUSINESS_CONFIG.contact.phoneTel}
                className="w-full py-3 px-4 rounded-full border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#041B3B]" />
                Call: {BUSINESS_CONFIG.contact.phoneDisplay}
              </a>
            </div>

            {/* Assurance Badges */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-[#041B3B]">
                <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
                100% Satisfaction Guarantee
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Pay only after joint supervisor walkthrough. Free immediate re-clean if not 100% satisfied.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AreasList />
    </div>
  );
};
