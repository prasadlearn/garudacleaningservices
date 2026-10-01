import React from 'react';
import type { PackOption } from '../types/product.types';

interface ProductPackSelectorProps {
  packOptions: PackOption[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  className?: string;
}

export const ProductPackSelector: React.FC<ProductPackSelectorProps> = ({
  packOptions,
  selectedSize,
  onSelectSize,
  className = ''
}) => {
  if (!packOptions || packOptions.length === 0) return null;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Available Packs:
        </span>
        <span className="text-[10px] text-slate-400 font-medium">Select size</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {packOptions.map((opt) => {
          const isSelected = selectedSize === opt.size;
          return (
            <button
              key={opt.size}
              type="button"
              onClick={() => onSelectSize(opt.size)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#041B3B] text-white border-[#041B3B] shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {opt.size}
            </button>
          );
        })}
      </div>
    </div>
  );
};
