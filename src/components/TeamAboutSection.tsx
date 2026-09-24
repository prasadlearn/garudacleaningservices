import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { TRUST_CONFIG, hasVerifiedRating } from '../config/trustConfig';
import { SafeImage } from './SafeImage';

export const TeamAboutSection: React.FC = () => {
  const showRating = hasVerifiedRating();

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs bg-[#FAFAFA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Team with Machines */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 shadow-xl border-4 border-white">
                <SafeImage
                  src="/images/office-clean.webp"
                  alt="Garuda Cleaning Services Team"
                  fallbackLabel="Garuda Cleaning Services Team"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Verified Badge or Local Badge */}
              {showRating ? (
                <div className="absolute -bottom-4 -left-2 sm:-left-3 bg-[#FFD700] text-[#041B3B] p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-2 border-2 border-white">
                  <span className="text-2xl sm:text-3xl font-black">{TRUST_CONFIG.googleRating}★</span>
                  <div className="text-[10px] sm:text-xs font-black leading-tight uppercase">
                    Google<br />Verified
                  </div>
                </div>
              ) : (
                <div className="absolute -bottom-4 -left-2 sm:-left-3 bg-[#041B3B] text-white p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-2 border-2 border-white">
                  <MapPin className="w-5 h-5 text-[#22AC33]" />
                  <div className="text-[11px] sm:text-xs font-black leading-tight">
                    Tirupati<br /><span className="text-[#4ADE80]">Local Service</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: About Us */}
            <div className="lg:col-span-6 space-y-5">
              <span className="homecare-pill">About Us</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B]">
                About Garuda Cleaning Services
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We provide thorough cleaning for homes, apartments, villas, and commercial spaces across Tirupati. Our focus is on clear upfront pricing, reliable scheduling, and careful cleaning using modern equipment and surface-safe products.
              </p>

              <div>
                <Link
                  to="/service-areas"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#22AC33] hover:underline"
                >
                  <span>See all areas we cover across Tirupati</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 4 Checklist Items backed by business reality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  'Service at your doorstep',
                  'Clear upfront prices',
                  'Homes, villas, and offices',
                  'We check the work together with you' // TODO_OWNER: confirm room-by-room check process
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#041B3B]">
                    <CheckCircle2 className="w-4 h-4 text-[#22AC33] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Buttons: Learn More + WhatsApp Now */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <Link to="/about" className="btn-homecare-navy text-xs py-3 px-6 text-center justify-center font-bold">
                  Learn More
                </Link>

                <a
                  href={BUSINESS_CONFIG.buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-homecare-green text-xs py-3 px-6 text-center justify-center font-bold flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
