import React from 'react';

const TAGS = [
  "House_Deep_Cleaning",
  "Office_Cleaning",
  "Kitchen_Cleaning",
  "Bathroom_Cleaning",
  "Villa_Cleaning",
  "Carpet_Cleaning",
  "Sofa_Shampooing",
  "Tank_Cleaning"
];

export const MarqueeText: React.FC = () => {
  return (
    <div className="py-4 bg-slate-100 overflow-hidden select-none border-y border-slate-200">
      <div className="animate-marquee-homecare flex items-center space-x-8 text-xl sm:text-2xl font-black text-slate-400 uppercase tracking-wider">
        {[...TAGS, ...TAGS, ...TAGS].map((tag, idx) => (
          <div key={idx} className="flex items-center gap-6 whitespace-nowrap">
            <span>{tag}</span>
            <span className="text-[#22AC33]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
