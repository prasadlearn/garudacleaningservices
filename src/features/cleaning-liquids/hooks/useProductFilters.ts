import { useState, useMemo } from 'react';
import type { Product, ProductCategory } from '../types/product';
import { CLEANING_PRODUCTS } from '../data/products';

export function useProductFilters() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return CLEANING_PRODUCTS.filter((product: Product) => {
      let matchesCategory = true;
      if (selectedCategory === 'All' || selectedCategory === 'All Products') {
        matchesCategory = true;
      } else if (selectedCategory === '5L Bulk Savers') {
        matchesCategory = product.packs.some((p) => p.size === '5 L' || p.size === '10 L');
      } else {
        matchesCategory = product.category === selectedCategory;
      }

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesName = product.name.toLowerCase().includes(query);
      const matchesCategoryName = product.category.toLowerCase().includes(query);
      const matchesDescription = product.shortDescription.toLowerCase().includes(query);
      const matchesUse = product.use ? product.use.toLowerCase().includes(query) : false;
      const matchesSuitable = product.suitableFor
        ? product.suitableFor.some((s) => s.toLowerCase().includes(query))
        : false;

      return (
        matchesCategory &&
        (matchesName || matchesCategoryName || matchesDescription || matchesUse || matchesSuitable)
      );
    });
  }, [selectedCategory, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    totalProductsCount: CLEANING_PRODUCTS.length,
    resetFilters
  };
}
