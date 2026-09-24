import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Clock, Star, Sparkles, CheckCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { TRUST_CONFIG, hasVerifiedRating } from '../config/trustConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { SafeImage } from './SafeImage';

export const Hero: React.FC = () => {
  const { openModal } = useQuoteModal();
  const showRating = hasVerifiedRating();

  const verifiedBadges = [
    { label: 'Clear Upfront Prices', icon: Sparkles },
    { label: 'Open 7 Days a Week', icon: Clock },
    { label: 'Fast WhatsApp Estimates', icon: CheckCircle },
  ];

  return (
    <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[calc(100dvh-var(--header-h))] flex items-center justify-center text-center overflow-hidden bg-slate-900">
      {/* Background Image with Ken Burns effect */}
      <SafeImage
        src="/images/hero-interior.webp"
        alt="Cleaning Services in Tirupati"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-center animate-banner-zoom will-change-transform"
        loading="eager"
        fetchPriority="high"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/80 backdrop-blur-[0.5px]" />

      {/* Overflow-clip container around decorative floating badge */}
      <div className="absolute inset-0 overflow-clip pointer-events-none z-[var(--z-content)]">
        <motion.div
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          className="absolute top-4 sm:top-8 left-3 sm:left-12 pointer-events-none"
        >
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#22AC33] text-white flex flex-col items-center justify-center font-black shadow-2xl border-2 border-white/50 pulse-scale">
            <span className="text-[11px] sm:text-xs leading-tight">Garuda</span>
            <span className="text-[7px] sm:text-[9px] uppercase tracking-wider font-extrabold">Tirupati</span>
          </div>
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-[var(--z-content)] max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-5 sm:space-y-6">
        {/* Rating subline or plain badge */}
        {showRating ? (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-lg min-h-[36px]"
          >
            <div className="flex text-[#FFD700]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>{TRUST_CONFIG.googleRating} / 5.0 Rating • {TRUST_CONFIG.projectsCompleted}+ Completed Projects</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-lg min-h-[36px]"
          >
            <Sparkles className="w-4 h-4 text-[#4ADE80]" />
            <span>Deep Cleaning for Homes and Offices in Tirupati</span>
          </motion.div>
        )}

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

        {/* Value Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1"
        >
          {verifiedBadges.map((item, idx) => {
            const Icon = item.icon;
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs font-bold border border-white/10 shadow-xs min-h-[36px]"
              >
                <Icon className="w-3.5 h-3.5 text-[#22AC33]" />
                {item.label}
              </span>
            );
          })}
        </motion.div>

        {/* CTA Buttons with min-h-[48px] */}
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
            className="btn-homecare-green shine-effect text-xs sm:text-sm min-h-[48px] py-3 px-6 sm:px-8 font-bold transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Message on WhatsApp</span>
          </a>

          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            className="btn-homecare-navy shine-effect text-xs sm:text-sm min-h-[48px] py-3 px-5 sm:px-8 font-bold border border-white/20 transform hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4 text-[#FFD700]" />
            <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
          </a>

          <button
            onClick={() => openModal()}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md border border-white/30 transition-all cursor-pointer transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#4ADE80]" />
            <span>Get Instant Price</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
