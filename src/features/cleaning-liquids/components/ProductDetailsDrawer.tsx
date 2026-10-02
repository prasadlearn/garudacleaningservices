import React, { useState } from 'react';
import { X, MessageCircle, Plus, Check, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Product, PackOption, CartItem } from '../types/product';
import { SafeImage } from '../../../components/SafeImage';
import { calculatePackPricing, REFERENCE_PRICE_DISCLAIMER } from '../utils/pricingUtils';
import { sendDirectProductWhatsApp } from '../utils/whatsappUtils';

interface ProductDetailsDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, option: PackOption) => void;
  cartItems?: CartItem[];
}

export const ProductDetailsDrawer: React.FC<ProductDetailsDrawerProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  cartItems = []
}) => {
  const [selectedPackIndex, setSelectedPackIndex] = useState<number>(0);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Reset pack selection when product changes (prefer 1 L default, fallback to 0)
  React.useEffect(() => {
    if (product) {
      const idx1L = product.packs.findIndex((p) => p.size === '1 L');
      setSelectedPackIndex(idx1L >= 0 ? idx1L : 0);
      setJustAdded(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const currentPack: PackOption = product.packs[selectedPackIndex] || product.packs[0];
  const oneLitrePack = product.packs.find((p) => p.size === '1 L');
  const calculation = calculatePackPricing(currentPack, oneLitrePack?.offerPrice ?? oneLitrePack?.price);

  // Check how many of this exact pack are currently in cart
  const cartItemMatch = cartItems.find(
    (item) => item.productId === product.id && item.size === currentPack.size
  );
  const currentQuantityInCart = cartItemMatch ? cartItemMatch.quantity : 0;

  const handleWhatsApp = () => {
    sendDirectProductWhatsApp(
      product.name,
      currentPack.size,
      calculation.formattedOffer
    );
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, currentPack);
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container (bottom sheet on mobile, right drawer on desktop) */}
      <div className="relative w-full max-w-lg bg-white h-full max-h-[92vh] sm:max-h-full rounded-t-3xl sm:rounded-none sm:rounded-l-3xl shadow-2xl overflow-y-auto flex flex-col z-10 self-end sm:self-auto animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#22AC33] block">
              {product.category}
            </span>
            <h3 className="text-lg font-black text-[#041B3B] leading-tight">
              {product.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 flex-1">
          {/* Large Product Image */}
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner">
            <SafeImage
              src={product.image}
              alt={`${product.name} cleaning product`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Instant Add Confirmation Banner */}
          {justAdded && (
            <div className="p-3 rounded-xl bg-emerald-500 text-white flex items-center justify-between gap-2 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Check className="w-4 h-4 text-white stroke-[3]" />
                <span>Added {product.name} ({currentPack.size}) to Wholesale Cart!</span>
              </div>
              <span className="text-[11px] font-black bg-white/20 px-2 py-0.5 rounded">
                Qty: {currentQuantityInCart}
              </span>
            </div>
          )}

          {/* Short Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Product Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {product.shortDescription}
            </p>
            {product.use && (
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed mt-2">
                <strong className="text-[#041B3B] font-bold">Recommended Use: </strong>
                {product.use}
              </p>
            )}
          </div>

          {/* What's Inside / Suitable For Section */}
          {product.suitableFor && product.suitableFor.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#041B3B]">
                What's Inside / Suitable For
              </h4>
              <div className="space-y-1.5 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                {product.suitableFor.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#22AC33] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pack sizes */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Select Pack Size & Rates
            </h4>
            <div className={`grid ${product.packs.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'} gap-2`}>
              {product.packs.map((pack, idx) => {
                const isSelected = selectedPackIndex === idx;
                const packCalc = calculatePackPricing(
                  pack,
                  oneLitrePack?.offerPrice ?? oneLitrePack?.price
                );
                return (
                  <button
                    key={pack.size}
                    type="button"
                    onClick={() => {
                      setSelectedPackIndex(idx);
                      setJustAdded(false);
                    }}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#041B3B] text-white border-[#041B3B] shadow-sm'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-black block">{pack.size}</span>
                    <span
                      className={`text-[11px] font-bold block mt-0.5 ${
                        isSelected ? 'text-[#22AC33]' : 'text-slate-600'
                      }`}
                    >
                      {packCalc.formattedOffer}
                    </span>
                    {packCalc.discountLabel && (
                      <span
                        className={`text-[9px] font-extrabold uppercase block mt-1 ${
                          isSelected ? 'text-amber-300' : 'text-emerald-600'
                        }`}
                      >
                        {packCalc.discountLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price comparison & Offer Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {currentPack.size} Pack Pricing
                </span>
                {calculation.formattedReference && (
                  <span className="text-xs text-slate-400 line-through mr-2 font-bold">
                    Regular: {calculation.formattedReference}
                  </span>
                )}
                <span className="text-xl font-black text-[#041B3B]">
                  {calculation.formattedOffer}
                </span>
              </div>
              {calculation.discountLabel && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-[#22AC33] text-white uppercase shadow-xs">
                    {calculation.discountLabel}
                  </span>
                  {currentPack.size === '5 L' && (
                    <span className="px-2 py-1 rounded-lg text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                      +₹20 Bulk Off
                    </span>
                  )}
                  {currentPack.size === '10 L' && (
                    <span className="px-2 py-1 rounded-lg text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                      +₹31 Bulk Off
                    </span>
                  )}
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500 font-medium">
              {calculation.referenceNote}
            </p>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium pt-1">
            <div className="flex items-center gap-1.5 p-2 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <ShieldCheck className="w-4 h-4 text-[#22AC33] shrink-0" />
              <span>Tested formulation</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 bg-blue-50/60 rounded-xl border border-blue-100">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Direct wholesale supply</span>
            </div>
          </div>
        </div>

        {/* Sticky Actions Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 space-y-2 shadow-lg z-10">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="btn-homecare-green py-3 px-3 rounded-xl text-xs font-bold justify-center flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp Rate</span>
            </button>

            {onAddToCart && (
              <button
                type="button"
                onClick={handleAdd}
                className={`py-3 px-3 rounded-xl text-xs font-bold justify-center flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  justAdded
                    ? 'bg-[#22AC33] text-white scale-102 ring-2 ring-[#22AC33]/40'
                    : currentQuantityInCart > 0
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
                    : 'bg-[#041B3B] hover:bg-[#062654] text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white stroke-[3] animate-bounce" />
                    <span>✓ Added ({currentQuantityInCart})</span>
                  </>
                ) : currentQuantityInCart > 0 ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>In Cart ({currentQuantityInCart}) • + Add</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-[#22AC33] shrink-0" />
                    <span>+ Add to Cart</span>
                  </>
                )}
              </button>
            )}
          </div>
          <p className="text-[10px] text-center text-slate-400">
            Delivery charges confirmed based on order size and location in Tirupati.
          </p>
        </div>
      </div>
    </div>
  );
};
