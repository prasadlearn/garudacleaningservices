import React from 'react';
import { Package, Sparkles, TrendingDown, Truck } from 'lucide-react';
import { TRUST_STRIP_ITEMS } from '../data/pricing';

export const HeroOfferStrip: React.FC = () => {
  const icons = [
    <Package key="500" className="w-4 h-4 text-sky-500" />,
    <Sparkles key="1L" className="w-4 h-4 text-blue-500" />,
    <TrendingDown key="5L" className="w-4 h-4 text-[#22AC33]" />,
    <Truck key="del" className="w-4 h-4 text-amber-500" />
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST_STRIP_ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className="p-1.5 rounded-lg bg-white shadow-xs">
                {icons[idx]}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-black text-[#041B3B] block leading-tight truncate">
                  {item.title}
                </span>
                <span className="text-[11px] font-medium text-slate-500 block leading-tight truncate">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
