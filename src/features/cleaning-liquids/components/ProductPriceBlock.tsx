import React from 'react';
import type { PackOption } from '../types/product';
import { calculatePackPricing } from '../utils/pricingUtils';

interface ProductPriceBlockProps {
  selectedOption: PackOption;
  oneLitrePrice?: number | null;
  className?: string;
  isCompact?: boolean;
}

export const ProductPriceBlock: React.FC<ProductPriceBlockProps> = ({
  selectedOption,
  oneLitrePrice,
  className = '',
  isCompact = false
}) => {
  const calculation = calculatePackPricing(selectedOption, oneLitrePrice);

  if (calculation.offerPrice === null) {
    return (
      <div className={`space-y-0.5 ${className}`}>
        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
          Wholesale Rate
        </span>
        <span className="text-xs sm:text-sm font-black text-slate-700 block">
          Price on Enquiry
        </span>
      </div>
    );
  }

  return (
    <div className={`space-y-0.5 ${className}`}>
      {/* Regular Price (strikethrough) */}
      <div className="min-h-[14px] flex items-center">
        {calculation.formattedReference ? (
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 leading-none">
            <span className="font-semibold text-slate-400">Regular:</span>
            <span className="line-through font-bold text-slate-400">
              {calculation.formattedReference}
            </span>
          </div>
        ) : (
          <span className="text-[10px] text-transparent select-none leading-none block">.</span>
        )}
      </div>

      {/* Offer Price & Save Tag */}
      <div className="flex items-baseline flex-wrap gap-1 sm:gap-1.5">
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-tight mr-0.5">
          Our Price:
        </span>
        <span className="text-sm sm:text-base md:text-lg font-black text-[#041B3B] leading-none">
          {calculation.formattedOffer}
        </span>

        {calculation.discountLabel && (
          <div className="flex items-center flex-wrap gap-1">
            <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase text-[#22AC33] bg-[#22AC33]/10 border border-[#22AC33]/25 px-1.5 py-0.5 rounded leading-none">
              {calculation.discountLabel}
            </span>
            {selectedOption.size === '5 L' && (
              <span className="inline-block text-[8px] sm:text-[9px] font-black uppercase text-amber-700 bg-amber-50 border border-amber-300 px-1 py-0.5 rounded leading-none">
                +₹20 Off
              </span>
            )}
            {selectedOption.size === '10 L' && (
              <span className="inline-block text-[8px] sm:text-[9px] font-black uppercase text-amber-700 bg-amber-50 border border-amber-300 px-1 py-0.5 rounded leading-none">
                +₹31 Off
              </span>
            )}
          </div>
        )}
      </div>

      {!isCompact && calculation.referenceType === 'regular-pack-comparison' && (
        <span className="text-[10px] text-slate-500 block leading-tight font-medium">
          {selectedOption.size === '10 L' ? '10 × 1L regular-pack comparison' : '5 × 1L regular-pack comparison'}
        </span>
      )}
    </div>
  );
};
