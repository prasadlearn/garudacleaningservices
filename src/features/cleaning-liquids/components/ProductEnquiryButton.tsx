import React from 'react';
import { MessageCircle, Plus, Check } from 'lucide-react';
import type { Product, PackOption } from '../types/product.types';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';
import { formatCurrency } from '../utils/pricing';
import { trackEvent } from '../../../utils/analytics';

interface ProductEnquiryButtonProps {
  product: Product;
  selectedOption: PackOption;
  onAddToCart?: (product: Product, option: PackOption) => void;
  isAdded?: boolean;
  className?: string;
}

export const ProductEnquiryButton: React.FC<ProductEnquiryButtonProps> = ({
  product,
  selectedOption,
  onAddToCart,
  isAdded = false,
  className = ''
}) => {
  const priceStr = formatCurrency(selectedOption.price);
  const waUrl = buildProductWhatsAppUrl(product.name, selectedOption.size, priceStr);

  const handleWhatsAppClick = () => {
    trackEvent('product_click', {
      product: product.name,
      size: selectedOption.size,
      price: selectedOption.price
    });
  };

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {/* Primary WhatsApp Action */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="btn-homecare-green py-2.5 px-3 rounded-xl text-xs font-bold justify-center flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all text-center truncate"
        title={`Enquire about ${product.name} (${selectedOption.size}) on WhatsApp`}
      >
        <MessageCircle className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">WhatsApp</span>
      </a>

      {/* Secondary Add to Cart for Bulk Orders */}
      {onAddToCart && (
        <button
          type="button"
          onClick={() => onAddToCart(product, selectedOption)}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold justify-center flex items-center gap-1.5 transition-all cursor-pointer border truncate ${
            isAdded
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-slate-50 text-[#041B3B] border-slate-200 hover:bg-slate-100 hover:border-slate-300'
          }`}
          title={`Add ${product.name} (${selectedOption.size}) to wholesale enquiry`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
              <span className="truncate">Added (+1)</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">+ Wholesale</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
