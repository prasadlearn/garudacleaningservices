import React from 'react';
import { CalendarCheck, Search, Sparkles, ShieldCheck, CheckSquare } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: CalendarCheck,
    title: 'Easy Slot Booking',
    desc: 'Select your preferred date and time slot via our quick quote modal or instant WhatsApp hotline.',
  },
  {
    step: '02',
    icon: Search,
    title: 'Pre-Work Walkthrough',
    desc: 'Our supervisor reviews heavy soil spots, tiles condition, and your priority areas with you.',
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Mechanized Scrubbing',
    desc: 'Execution with single-disc floor machines, high-suction extractors, and surface-safe biological agents.',
  },
  {
    step: '04',
    icon: ShieldCheck,
    title: 'Deep Sanitization',
    desc: 'High-touch areas, sanitary fixtures, and kitchen slabs receive antibacterial fogging and mirror buffing.',
  },
  {
    step: '05',
    icon: CheckSquare,
    title: 'Joint Handover Audit',
    desc: 'A complete room-by-room check with you to confirm 100% satisfaction before payment is collected.',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0369A1] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Simple & Transparent
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight">
            Our 5-Step Cleaning Process
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            A standardized, disciplined cleaning workflow designed to deliver consistent, flawless outcomes every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0E6B7A] flex items-center justify-center shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-[#0B192C] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
