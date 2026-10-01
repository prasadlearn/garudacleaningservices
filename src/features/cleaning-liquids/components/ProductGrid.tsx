import React, { useState } from 'react';
import type { Product, PackOption, CartItem } from '../types/product';
import { ProductCard } from './ProductCard';
import { ProductDetailsDrawer } from './ProductDetailsDrawer';
import { PackageOpen, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  cartItems?: CartItem[];
  onAddToCart?: (product: Product, option: PackOption) => void;
  onResetFilters?: () => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  cartItems = [],
  onAddToCart,
  onResetFilters,
  className = ''
}) => {
  const [activeDrawerProduct, setActiveDrawerProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 max-w-md mx-auto shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <PackageOpen className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-black text-[#041B3B]">
            No cleaning liquids found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            We couldn't find any products matching your current search or category filter.
          </p>
        </div>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 btn-homecare-navy text-xs py-2 px-4 rounded-xl font-bold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 ${className}`}
      >
        {products.map((product) => {
          const isItemInCart = cartItems.some((item) => item.productId === product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenDetails={(p) => setActiveDrawerProduct(p)}
              isItemInCart={isItemInCart}
            />
          );
        })}
      </div>

      {/* Product Details Drawer / Bottom Sheet */}
      <ProductDetailsDrawer
        product={activeDrawerProduct}
        isOpen={!!activeDrawerProduct}
        onClose={() => setActiveDrawerProduct(null)}
        onAddToCart={onAddToCart}
        cartItems={cartItems}
      />
    </>
  );
};
