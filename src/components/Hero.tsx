import React from 'react';
import { Link } from 'react-router-dom';
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
    { label: 'Monday to Sunday (8 AM - 8 PM)', icon: Clock },
    { label: 'Fast WhatsApp Estimates', icon: CheckCircle },
  ];

  return (
    <section className="relative min-h-[460px] sm:min-h-[580px] lg:min-h-[calc(100dvh-var(--header-h))] flex items-center justify-center text-center overflow-hidden bg-slate-900">
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

      {/* Overflow-clip container around decorative floating badge - visible on sm+ screens */}
      <div className="absolute inset-0 overflow-clip pointer-events-none z-[var(--z-content)] hidden sm:block">
        <motion.div
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          className="absolute top-6 left-6 lg:left-12 pointer-events-none"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#22AC33] text-white flex flex-col items-center justify-center font-black shadow-2xl border-2 border-white/50 pulse-scale">
            <span className="text-[11px] sm:text-xs leading-tight font-black">Garuda</span>
            <span className="text-[7px] sm:text-[9px] uppercase tracking-wider font-extrabold">Tirupati</span>
          </div>
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-[var(--z-content)] max-w-4xl mx-auto px-3.5 sm:px-8 py-6 sm:py-16 space-y-3 sm:space-y-5">
        {/* Rating subline or plain badge */}
        {showRating ? (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold border border-white/20 shadow-lg"
          >
            <div className="flex text-[#FFD700]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" />
              ))}
            </div>
            <span>{TRUST_CONFIG.googleRating} / 5.0 Rating • {TRUST_CONFIG.projectsCompleted}+ Projects</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold border border-white/20 shadow-lg"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4ADE80]" />
            <span>Tirupati &amp; Rayachoty Service Areas</span>
          </motion.div>
        )}

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl min-[360px]:text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug drop-shadow-md max-w-3xl mx-auto"
        >
          Professional Cleaning Services <br className="hidden sm:inline" />
          <span className="text-[#22AC33]">in Tirupati &amp; Rayachoty</span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[11px] min-[360px]:text-xs sm:text-base text-slate-200 max-w-xl mx-auto font-normal leading-relaxed drop-shadow-xs"
        >
          Doorstep cleaning services for homes, apartments, villas, and offices across Tirupati and Rayachoty.
        </motion.p>

        {/* Value Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 pt-0.5"
        >
          {verifiedBadges.map((item, idx) => {
            const Icon = item.icon;
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[10px] sm:text-xs font-semibold border border-white/10 shadow-2xs"
              >
                <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#22AC33]" />
                {item.label}
              </span>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 pt-1"
        >
          <a
            href={BUSINESS_CONFIG.buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-homecare-green shine-effect text-xs sm:text-sm py-2 sm:py-2.5 px-4 sm:px-7 font-bold transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Message on WhatsApp</span>
          </a>

          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            className="btn-homecare-navy shine-effect text-xs sm:text-sm py-2 sm:py-2.5 px-4 sm:px-7 font-bold border border-white/20 transform hover:scale-105 active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD700]" />
            <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
          </a>

          <button
            onClick={() => openModal()}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md border border-white/30 transition-all cursor-pointer transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#4ADE80]" />
            <span>Get Instant Price</span>
          </button>
        </motion.div>

        {/* Wholesale Liquids Intimation Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-0.5"
        >
          <Link
            to="/cleaning-liquids"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-white text-[10px] sm:text-xs font-bold border border-emerald-400/40 shadow-sm transition-all hover:scale-105 group cursor-pointer"
          >
            <span className="text-emerald-300 font-black">🧴 Wholesale Liquids:</span>
            <span className="text-slate-200">1L &amp; 5L Cans</span>
            <span className="text-white underline font-black ml-0.5 group-hover:translate-x-0.5 transition-transform">
              Buy Direct →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
