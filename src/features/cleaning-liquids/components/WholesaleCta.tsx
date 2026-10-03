import React from 'react';
import { Sparkles } from 'lucide-react';
import { BusinessContactNumbers } from '../../../components/BusinessContactNumbers';

interface WholesaleCtaProps {
  className?: string;
}

export const WholesaleCta: React.FC<WholesaleCtaProps> = ({ className = '' }) => {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br from-[#041B3B] via-[#0b2b57] to-[#041B3B] text-white p-6 sm:p-10 text-center space-y-5 border border-white/10 shadow-xl relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#22AC33]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-4 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#22AC33] border border-white/15">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Support</span>
        </div>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
          Need cleaning liquids in Tirupati or Rayachoty?
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
          Contact our team for immediate wholesale price lists, product recommendations, and custom bulk dispatch terms.
        </p>

        <div className="max-w-md mx-auto pt-2">
          <BusinessContactNumbers variant="cta" sourcePage="/cleaning-liquids" />
        </div>
      </div>
    </div>
  );
};
