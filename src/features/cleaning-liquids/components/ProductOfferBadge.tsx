import React from 'react';
import type { PackOption } from '../types/product.types';
import { getPricingLabel } from '../utils/pricing';

interface ProductOfferBadgeProps {
  option: PackOption;
  className?: string;
}

export const ProductOfferBadge: React.FC<ProductOfferBadgeProps> = ({ option, className = '' }) => {
  const { badgeText, badgeType } = getPricingLabel(option);

  if (!badgeText) return null;

  if (badgeType === 'saver') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-extrabold bg-[#E8F8EC] text-[#22AC33] border border-[#22AC33]/30 uppercase tracking-wide ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#22AC33] animate-pulse" />
        <span>{badgeText}</span>
      </span>
    );
  }

  if (badgeType === 'suggested') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 tracking-tight ${className}`}
      >
        <span>{badgeText}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 ${className}`}
    >
      {badgeText}
    </span>
  );
};
