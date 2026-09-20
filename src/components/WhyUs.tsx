import React from 'react';
import { ShieldCheck, Sparkles, Wrench, CheckCircle2, UserCheck, Clock, Award } from 'lucide-react';
import { AquaButton } from './AquaButton';
import { useQuoteModal } from '../context/QuoteModalContext';

const PILLARS = [
  {
    icon: UserCheck,
    title: 'Trusted & Vetted Cleaners',
    desc: 'Every team member undergoes thorough ID verification, background checks, and rigorous surface-care training.',
  },
  {
    icon: Sparkles,
    title: 'Customizable Cleaning Plans',
    desc: 'From quick single-room descaling to complete multi-floor villa turnarounds, we adapt exactly to your property needs.',
  },
  {
    icon: Wrench,
    title: 'Industrial Rotary Equipment',
    desc: 'We bring single-disc scrubbers, high-pressure washers, and wet injection extractors—not ordinary domestic mops.',
  },
  {
    icon: Award,
    title: 'Assured Quality Service',
    desc: 'We conduct a room-by-room joint inspection with you before departing to ensure zero missed spots or residue.',
  },
];

export const WhyUs: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0E6B7A] text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              About Garuda Cleaning Services
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight leading-tight">
              Tirupati’s Dedicated Deep Cleaning Specialists
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Founded with the single mission of providing transparent, mechanized, and surface-safe deep cleaning across Tirupati. We do not use corrosive hydrochloric acids that strip tile grout or release toxic fumes into your home.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Whether you are moving into a newly painted flat in Balaji Colony, refreshing a villa along AIR Bypass Road, or sanitizing a commercial workspace, our uniformed team arrives on time with complete machinery and consumables.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Zero hidden transport surcharges',
                'Certified non-acidic descalers',
                'Supervised on-site technicians',
                'Complete room-by-room handover',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#0E6B7A] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <AquaButton onClick={() => openModal()} color="#0E6B7A">
                Schedule Site Inspection
              </AquaButton>

              <AquaButton to="/about" variant="secondary">
                Learn More About Our Team
              </AquaButton>
            </div>
          </div>

          {/* Right Column: 4-Pillar Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0E6B7A] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[#0B192C] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
