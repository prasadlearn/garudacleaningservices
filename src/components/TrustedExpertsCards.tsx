import React from 'react';
import { Award, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

const EXPERTS_DATA = [
  {
    image: '/images/hero-interior.jpg',
    badge: '450+ Completed',
    icon: Award,
    title: '450+ Projects Successfully Completed',
    desc: 'Having completed more than 450+ cleaning projects across Tirupati, we bring proven systems and mechanized processes that guarantee spotless results.',
  },
  {
    image: '/images/floor-clean.jpg',
    badge: '4.8★ Google Rating',
    icon: Star,
    title: '4.8-Star Rating on Google Reviews',
    desc: 'Our strong customer feedback and verified ratings showcase consistent service excellence, courteous staff, and dependable punctuality.',
  },
  {
    image: '/images/kitchen-clean.jpg',
    badge: 'Eco-Safe Chemistry',
    icon: ShieldCheck,
    title: 'Eco-Friendly Products & Modern Equipment',
    desc: 'We use non-corrosive, child & pet-safe formulations paired with single-disc rotary scrubbers to deliver deep sanitization without surface damage.',
  },
];

export const TrustedExpertsCards: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="homecare-pill mb-2">Garuda Experts</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1 tracking-tight">
            Why we're the Most Trusted Homecare Experts in Tirupati
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
            Combining mechanized technology, trained in-house staff, and transparent pricing for every home and business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {EXPERTS_DATA.map((card, i) => {
            const IconComponent = card.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with guaranteed 16:10 aspect ratio so it never stretches on mobile */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-[#041B3B]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/10">
                    <IconComponent className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>{card.badge}</span>
                  </div>
                </div>

                {/* Card Content: Always clearly readable below the image */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#041B3B] group-hover:text-[#22AC33] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#22AC33]">
                    <CheckCircle2 className="w-4 h-4 text-[#22AC33]" />
                    <span>100% Verified Quality Guarantee</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
