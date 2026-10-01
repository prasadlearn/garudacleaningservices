import React from 'react';
import type { ProductCategory } from '../types/product.types';
import { PRODUCT_CATEGORIES } from '../data/categories';

interface ProductCategoryTabsProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  className?: string;
}

export const ProductCategoryTabs: React.FC<ProductCategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  className = ''
}) => {
  return (
    <div className={`w-full overflow-x-auto pb-1 scrollbar-none ${className}`}>
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
        {PRODUCT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[#041B3B] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-[#041B3B]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
