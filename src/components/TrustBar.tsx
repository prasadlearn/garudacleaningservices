import React from 'react';
import { Award, ShieldCheck, Leaf, ThumbsUp } from 'lucide-react';

const METRICS = [
  {
    icon: Award,
    title: '450+ Projects Completed',
    subtitle: 'Successfully detailed across Tirupati',
  },
  {
    icon: ThumbsUp,
    title: '4.9 Star Google Rating',
    subtitle: 'Genuine verified customer reviews',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Formulations',
    subtitle: 'Surface-safe, non-hazardous & bio-safe',
  },
  {
    icon: ShieldCheck,
    title: '100% Quality Guarantee',
    subtitle: 'Room-by-room joint handover inspection',
  },
];

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0E6B7A] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base text-[#0B192C]">
                    {metric.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {metric.subtitle}
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
