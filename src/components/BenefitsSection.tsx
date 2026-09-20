import React from 'react';
import { Clock, ShieldCheck, Sparkles, HeartPulse, Calendar, ThumbsUp } from 'lucide-react';

const BENEFITS = [
  { icon: Clock, title: 'Saves Time & Effort', desc: 'Free up your weekends while our trained specialists handle all laborious deep scrubbing.' },
  { icon: ShieldCheck, title: 'Advanced Rotary Scrubbers', desc: 'Single-disc floor scrubbers and extraction vacuums achieve results household mops cannot.' },
  { icon: HeartPulse, title: 'Eliminates Bacteria & Mites', desc: 'Hospital-grade sanitization that targets hidden mold, germs, and dust mite colonies.' },
  { icon: Sparkles, title: 'Extends Furniture Lifespan', desc: 'Proper surface-safe descalers and pH-neutral solutions preserve your expensive tiles and fabrics.' },
  { icon: Calendar, title: 'Customizable Scheduling', desc: 'Same-day, weekend, and evening cleaning slots available across Tirupati without extra surcharges.' },
  { icon: ThumbsUp, title: '100% Satisfaction Guarantee', desc: 'We conduct a room-by-room joint inspection with you before departing.' },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-[#F4F8FC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="homecare-pill mb-2">Key Advantages</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1">
            Benefits of Professional Cleaning Services in Tirupati
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Why hundreds of Tirupati homes and businesses trust our mechanized cleaning service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-[#041B3B]">{b.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
