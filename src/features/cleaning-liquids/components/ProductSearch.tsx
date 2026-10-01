import React from 'react';
import { Search, X } from 'lucide-react';

interface ProductSearchProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  placeholder?: string;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Search cleaning liquids (e.g. Floor, Glass, Phenyl, Dishwash)...'
}) => {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor="product-search-input" className="sr-only">
        Search cleaning liquids and wholesale supplies
      </label>
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        id="product-search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-10 pr-9 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-white text-[#041B3B] font-medium shadow-2xs placeholder:text-slate-400"
      />
      {value.trim() && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
