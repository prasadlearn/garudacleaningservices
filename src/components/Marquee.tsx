import React from 'react';

const ITEMS = [
  "House Deep Cleaning",
  "Office Cleaning",
  "Kitchen Cleaning",
  "Bathroom Cleaning",
  "Villa Cleaning",
  "Carpet Cleaning",
  "Sofa Shampooing",
  "Floor Rotary Scrubbing",
  "Water Tank Cleaning"
];

export const Marquee: React.FC = () => {
  return (
    <div className="bg-[#041B3B] text-white py-3.5 overflow-hidden border-y border-white/10 select-none shadow-inner">
      <div className="marquee-container space-x-8 items-center text-xs sm:text-sm font-bold tracking-wider uppercase">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 whitespace-nowrap text-slate-100">
            <span>{item}</span>
            <span className="text-[#FFD700]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
