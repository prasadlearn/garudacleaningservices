import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import {
  GALLERY_FILTER_CATEGORIES,
  type GalleryFilterCategory
} from '../../data/galleryData';
import { trackEvent } from '../../utils/analytics';

interface GalleryFiltersProps {
  activeCategory: GalleryFilterCategory;
  onSelectCategory: (category: GalleryFilterCategory) => void;
  countsByCategory: Record<GalleryFilterCategory, number>;
}

export const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  activeCategory,
  onSelectCategory,
  countsByCategory
}) => {
  const handleCategoryChange = (category: GalleryFilterCategory) => {
    onSelectCategory(category);
    trackEvent('gallery_category_filter', { category });
  };

  return (
    <div className="sticky top-[var(--header-h,72px)] z-[var(--z-subnav)] bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-2.5 sm:py-3.5 px-4 sm:px-6 transition-all">
      <div className="max-w-6xl mx-auto">
        {/* MOBILE VIEW (< 768px): Sleek, ultra-compact single-row filter selector */}
        <div className="flex md:hidden items-center justify-between gap-3 bg-slate-100/90 p-2 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-2 pl-2 min-w-0">
            <Filter className="w-4 h-4 text-[#22AC33] shrink-0" />
            <span className="text-xs font-bold text-[#041B3B] truncate">
              {activeCategory}
            </span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full font-bold bg-[#22AC33] text-white shrink-0">
              {countsByCategory[activeCategory] || 0}
            </span>
          </div>

          <div className="relative shrink-0">
            <select
              value={activeCategory}
              onChange={(e) => handleCategoryChange(e.target.value as GalleryFilterCategory)}
              className="appearance-none bg-white text-[#041B3B] text-xs font-bold pl-3 pr-8 py-1.5 rounded-xl border border-slate-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#22AC33]/40 cursor-pointer"
              aria-label="Filter gallery by category"
            >
              {GALLERY_FILTER_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({countsByCategory[cat] || 0})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* DESKTOP VIEW (>= 768px): Elegant centered pill navigation */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-2">
          {GALLERY_FILTER_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count = countsByCategory[category] || 0;

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#041B3B] text-white shadow-md ring-2 ring-[#22AC33]/40'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <span>{category}</span>
                {count > 0 && (
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                      isActive
                        ? 'bg-[#22AC33] text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
