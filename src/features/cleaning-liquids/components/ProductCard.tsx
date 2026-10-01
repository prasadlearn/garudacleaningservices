import React, { useState } from 'react';
import { Plus, Check, MessageCircle, Info } from 'lucide-react';
import type { Product, PackOption } from '../types/product';
import { SafeImage } from '../../../components/SafeImage';
import { ProductPriceBlock } from './ProductPriceBlock';
import { sendDirectProductWhatsApp } from '../utils/whatsappUtils';
import { calculatePackPricing } from '../utils/pricingUtils';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, option: PackOption) => void;
  onOpenDetails?: (product: Product) => void;
  isItemInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenDetails,
  isItemInCart = false
}) => {
  // Default to 1L pack option if available, otherwise first option
  const defaultOption =
    product.packs.find((p) => p.size === '1 L') || product.packs[0];

  const [selectedSize, setSelectedSize] = useState<string>(
    defaultOption ? defaultOption.size : ''
  );

  const currentOption: PackOption =
    product.packs.find((p) => p.size === selectedSize) ||
    product.packs[0] || {
      size: '1 L',
      offerPrice: null,
      price: null,
      pricingStatus: 'enquiry'
    };

  const oneLitrePack = product.packs.find((p) => p.size === '1 L');
  const calculation = calculatePackPricing(
    currentOption,
    oneLitrePack?.offerPrice ?? oneLitrePack?.price
  );

  const [justAdded, setJustAdded] = useState<boolean>(false);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    sendDirectProductWhatsApp(
      product.name,
      currentOption.size,
      calculation.formattedOffer
    );
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, currentOption);
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    }
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(product)}
      className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs hover:border-[#22AC33]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      {/* 1. Media Area */}
      <div>
        <div className="relative aspect-4/3 sm:aspect-16/10 bg-slate-100 overflow-hidden">
          <SafeImage
            src={product.image}
            alt={`${product.name} cleaning liquid Tirupati`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />

          {/* Category Badge */}
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2">
            <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-[#041B3B]/90 text-white backdrop-blur-xs">
              {product.category}
            </span>
          </div>

          {/* Info Details Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails && onOpenDetails(product);
            }}
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 rounded-full bg-white/90 text-slate-600 hover:text-[#041B3B] hover:bg-white shadow-xs transition-all"
            title="View product details"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2. Text Content */}
        <div className="p-2 sm:p-3.5 space-y-1.5 sm:space-y-2">
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#041B3B] group-hover:text-[#22AC33] transition-colors leading-tight line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium line-clamp-1 mt-0.5 leading-tight hidden xs:block">
              {product.shortDescription}
            </p>
          </div>

          {/* Pack Selector Pills */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Pack:</span>
              <span className="text-[#22AC33] font-black">{currentOption.size}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.packs.map((opt) => {
                const isSelected = selectedSize === opt.size;
                return (
                  <button
                    key={opt.size}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(opt.size);
                    }}
                    className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#041B3B] text-white border-[#041B3B]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {opt.size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Card Footer: Price & Compact Actions */}
      <div className="p-2 sm:p-3.5 pt-1 sm:pt-2 border-t border-slate-100 space-y-2 bg-slate-50/50">
        <ProductPriceBlock
          selectedOption={currentOption}
          oneLitrePrice={oneLitrePack?.offerPrice ?? oneLitrePack?.price}
          isCompact
        />

        {/* Action Button: Dual on desktop, compact on mobile */}
        <div className="grid grid-cols-2 gap-1 sm:gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="btn-homecare-green py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg text-[10px] sm:text-xs font-bold justify-center flex items-center gap-1 shadow-2xs truncate"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate hidden sm:inline">WhatsApp</span>
            <span className="truncate sm:hidden">Chat</span>
          </button>

          {onAddToCart && (
            <button
              type="button"
              onClick={handleAdd}
              className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg text-[10px] sm:text-xs font-bold justify-center flex items-center gap-1 transition-all cursor-pointer border truncate ${
                justAdded
                  ? 'bg-[#22AC33] text-white border-[#22AC33] scale-102 shadow-xs'
                  : isItemInCart
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-white text-[#041B3B] border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
              title="Add to wholesale enquiry cart"
            >
              {justAdded ? (
                <>
                  <Check className="w-3 h-3 text-white stroke-[3] animate-bounce" />
                  <span className="truncate">✓ Added</span>
                </>
              ) : isItemInCart ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">In Cart</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">+ Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
