import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Star, CheckCircle, ShieldCheck, Clock } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';

export const Hero: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <section className="relative pt-20 sm:pt-24 min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Photography with Cleaner & Continuous Subtle Zoom */}
      <img
        src="/images/sofa-clean.jpg"
        alt="Professional Cleaning Services in Tirupati"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-center animate-banner-zoom will-change-transform"
        loading="eager"
      />
      {/* Dark overlay matching the reference screenshot */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/80 backdrop-blur-[0.5px]" />

      {/* Floating Splat Badge on Top Left with animated float & pulse */}
      <motion.div
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: -12 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        className="absolute top-22 sm:top-28 left-2.5 sm:left-12 z-10 pointer-events-none"
      >
        <div className="w-13 h-13 sm:w-20 sm:h-20 rounded-full bg-[#22AC33] text-white flex flex-col items-center justify-center font-black shadow-2xl border-2 border-white/50 pulse-scale">
          <span className="text-[10px] sm:text-sm leading-tight">No. 1</span>
          <span className="text-[7px] sm:text-[9px] uppercase tracking-wider font-extrabold">In Tirupati</span>
        </div>
      </motion.div>

      {/* Hero Content with Framer Motion Stagger */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-5 sm:space-y-6">
        {/* Rating subline */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold border border-white/20 shadow-lg"
        >
          <div className="flex text-[#FFD700]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />
            ))}
          </div>
          <span>4.8 / 5.0 Rating • 450+ Completed Projects</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md"
        >
          Professional Cleaning <br />
          <span className="text-[#22AC33]">Services in Tirupati</span>
        </motion.h1>

        {/* 3 Value Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1"
        >
          {[
            { label: 'Vetted Specialists', icon: ShieldCheck },
            { label: 'Eco-Safe Formulations', icon: CheckCircle },
            { label: 'Same-Day Slot in Tirupati', icon: Clock }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold border border-white/25 hover:bg-white/25 transition-colors"
              >
                <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#22AC33]" />
                {item.label}
              </span>
            );
          })}
        </motion.div>

        {/* CTA Buttons with shine and interactive hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4"
        >
          <a
            href={BUSINESS_CONFIG.buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-homecare-green shine-effect text-xs sm:text-sm py-2.5 sm:py-3 px-6 sm:px-8 font-bold transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Now
          </a>

          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            className="btn-homecare-navy shine-effect text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-8 font-bold border border-white/20 transform hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4 text-[#FFD700]" />
            Call: {BUSINESS_CONFIG.contact.phoneDisplay}
          </a>

          <button
            onClick={() => openModal()}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md border border-white/30 transition-all cursor-pointer transform hover:scale-105"
          >
            ⚡ Instant Price Estimate
          </button>
        </motion.div>
      </div>
    </section>
  );
};
