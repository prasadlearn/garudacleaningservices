import React from 'react';
import { Tag, Sparkles, MessageCircle, Plus } from 'lucide-react';
import type { Product, PackOption } from '../types/product';
import { CLEANING_PRODUCTS } from '../data/products';
import { calculatePackPricing } from '../utils/pricingUtils';
import { sendDirectProductWhatsApp } from '../utils/whatsappUtils';

interface BulkOffersProps {
  onAddToCart?: (product: Product, option: PackOption) => void;
  className?: string;
}

export const BulkOffers: React.FC<BulkOffersProps> = ({
  onAddToCart,
  className = ''
}) => {
  // Focus exclusively on confirmed priced 5L products
  const targetIds = [
    'phenyl',
    'multipurpose-cleaner',
    'detergent',
    'dishwash',
    'glass-cleaner',
    'blue-harpic',
    'floor-cleaner'
  ];
  const bulkProducts = CLEANING_PRODUCTS.filter((p) => targetIds.includes(p.id));

  return (
    <section id="bulk-offers" className={`space-y-4 sm:space-y-6 scroll-mt-20 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#22AC33] mb-0.5">
            <Tag className="w-3.5 h-3.5" />
            <span>Commercial 5-Litre Wholesale</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#041B3B]">
            🔥 Bulk Offers for Businesses
          </h2>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          5L cans with regular-pack savings for apartments, hotels, and businesses in Tirupati &amp; Rayachoty.
        </p>
      </div>

      {/* Grid of Bulk Offer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {bulkProducts.map((product) => {
          const fiveLitreOption = product.packs.find((opt) => opt.size === '5 L');
          if (!fiveLitreOption) return null;

          const oneLitreOption = product.packs.find((opt) => opt.size === '1 L');
          const calculation = calculatePackPricing(
            fiveLitreOption,
            oneLitreOption?.offerPrice ?? oneLitreOption?.price
          );

          const handleWhatsApp = () => {
            sendDirectProductWhatsApp(
              product.name,
              '5 L',
              calculation.formattedOffer
            );
          };

          return (
            <div
              key={product.id}
              className="p-3.5 sm:p-4 rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      5-Litre Can
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-[#041B3B] leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#22AC33] text-white shadow-2xs">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>5L Saver</span>
                  </span>
                </div>

                {/* Price Display */}
                <div className="space-y-1 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                  {calculation.formattedReference && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <span>5 × 1L reference:</span>
                      <span className="line-through font-bold text-slate-400">
                        {calculation.formattedReference}
                      </span>
                    </div>
                  )}

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-[#041B3B]">
                      {calculation.formattedOffer}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/ 5L</span>
                  </div>

                  {calculation.discountLabel && (
                    <div className="text-[11px] font-bold text-[#22AC33] flex items-center gap-1">
                      <span>{calculation.discountLabel} vs 5 × 1L</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 btn-homecare-green py-2 px-2 text-xs font-bold justify-center flex items-center gap-1 shadow-2xs truncate"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </button>

                {onAddToCart && (
                  <button
                    type="button"
                    onClick={() => onAddToCart(product, fiveLitreOption)}
                    className="py-2 px-3 rounded-xl bg-[#041B3B] hover:bg-[#062654] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
                    title="Add 5L can to enquiry"
                  >
                    <Plus className="w-3 h-3 text-[#22AC33]" />
                    <span>+ Add</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
