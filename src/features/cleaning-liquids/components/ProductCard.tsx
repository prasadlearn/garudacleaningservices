import React, { useState } from 'react';
import { Plus, Check, MessageCircle, Info } from 'lucide-react';
import type { Product, PackOption, CartItem } from '../types/product';
import { SafeImage } from '../../../components/SafeImage';
import { ProductPriceBlock } from './ProductPriceBlock';
import { sendDirectProductWhatsApp } from '../utils/whatsappUtils';
import { calculatePackPricing } from '../utils/pricingUtils';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, option: PackOption) => void;
  onUpdateQuantity?: (productId: string, size: string, quantity: number) => void;
  onOpenDetails?: (product: Product) => void;
  cartItems?: CartItem[];
  isItemInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onUpdateQuantity,
  onOpenDetails,
  cartItems = []
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

  // Exact pack-specific quantity lookup in wholesale cart
  const matchingCartItem = cartItems.find(
    (item) => item.productId === product.id && item.size === currentOption.size
  );
  const currentPackQty = matchingCartItem ? matchingCartItem.quantity : 0;

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
      }, 1500);
    }
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(product)}
      className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs hover:border-[#22AC33]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      {/* 1. Media Area */}
      <div>
        <div className="relative aspect-4/3 sm:aspect-16/10 bg-slate-50 overflow-hidden flex items-center justify-center p-1.5">
          <SafeImage
            src={product.image}
            alt={`${product.name} cleaning liquid Tirupati`}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="eager"
            decoding="auto"
          />

          {/* Clean Category Badge at Bottom-Left */}
          <div className="absolute bottom-1.5 left-1.5 pointer-events-none z-10">
            <span className="px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-black text-white border border-white/20 shadow-2xs block">
              {product.category}
            </span>
          </div>

          {/* Discreet Info Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails && onOpenDetails(product);
            }}
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 rounded-full bg-white/90 text-slate-500 hover:text-[#041B3B] hover:bg-white shadow-xs transition-all cursor-pointer opacity-85 group-hover:opacity-100 z-10"
            title="View product details"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2. Text Content */}
        <div className="p-2.5 sm:p-3.5 space-y-1.5 sm:space-y-2">
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#041B3B] group-hover:text-[#22AC33] transition-colors leading-tight line-clamp-1">
              {product.name}
            </h3>

            {/* What's Inside / Suitable For Quick Tags (Matching Services Cards) */}
            {product.suitableFor && product.suitableFor.length > 0 && (
              <div className="mt-1 flex flex-col gap-0.5">
                {product.suitableFor.slice(0, 2).map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[8px] sm:text-[9.5px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-semibold truncate max-w-full"
                  >
                    <span className="text-[#22AC33] font-black">✓</span>
                    <span className="truncate">{item}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Pack Selector Pills */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Pack:</span>
              <span className="text-[#22AC33] font-black">{currentOption.size}</span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1 w-full min-h-[24px]">
              {product.packs.map((opt) => {
                const isSelected = selectedSize === opt.size;
                const displayLabel = opt.size.replace(/\s+/g, '');
                const is500ml = displayLabel.toLowerCase().includes('500');
                return (
                  <button
                    key={opt.size}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(opt.size);
                    }}
                    className={`py-1 rounded-md text-[8px] xs:text-[9px] sm:text-[10.5px] font-black transition-all cursor-pointer border text-center leading-none flex items-center justify-center ${
                      is500ml ? 'flex-[1.3] px-0.5 tracking-tighter' : 'flex-1 px-0.5 tracking-tight'
                    } ${
                      isSelected
                        ? 'bg-[#041B3B] text-white border-[#041B3B] shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                    title={opt.size}
                  >
                    {displayLabel}
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
            currentPackQty > 0 ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-lg p-0.5 text-[10px] sm:text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onUpdateQuantity) {
                      onUpdateQuantity(product.id, currentOption.size, currentPackQty - 1);
                    }
                  }}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-white text-emerald-800 font-black flex items-center justify-center hover:bg-emerald-100 cursor-pointer shadow-2xs"
                  title="Decrease quantity"
                >
                  −
                </button>
                <span className="font-extrabold text-emerald-900 px-1 text-[10px] sm:text-xs">
                  {currentPackQty}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onUpdateQuantity) {
                      onUpdateQuantity(product.id, currentOption.size, currentPackQty + 1);
                    } else if (onAddToCart) {
                      onAddToCart(product, currentOption);
                    }
                  }}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#22AC33] text-white font-black flex items-center justify-center hover:bg-[#1b8c29] cursor-pointer shadow-2xs"
                  title="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAdd}
                className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg text-[10px] sm:text-xs font-bold justify-center flex items-center gap-1 transition-all cursor-pointer border truncate ${
                  justAdded
                    ? 'bg-[#22AC33] text-white border-[#22AC33] scale-102 shadow-xs'
                    : 'bg-white text-[#041B3B] border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
                title="Add to wholesale enquiry cart"
              >
                {justAdded ? (
                  <>
                    <Check className="w-3 h-3 text-white stroke-[3] animate-bounce" />
                    <span className="truncate">✓ Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">Add</span>
                  </>
                )}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
