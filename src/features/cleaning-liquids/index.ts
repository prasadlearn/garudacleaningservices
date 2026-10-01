// Components
export { CleaningLiquidsHero } from './components/CleaningLiquidsHero';
export { HeroOfferStrip, HeroOfferStrip as OfferStrip } from './components/HeroOfferStrip';
export { ProductFilters } from './components/ProductFilters';
export { ProductCategoryTabs } from './components/ProductCategoryTabs';
export { ProductSearch } from './components/ProductSearch';
export { DeliveryNotice, DeliveryNotice as DeliveryNote } from './components/DeliveryNotice';
export { ProductGrid } from './components/ProductGrid';
export { ProductCard } from './components/ProductCard';
export { ProductDetailsDrawer } from './components/ProductDetailsDrawer';
export { ProductPackSelector } from './components/ProductPackSelector';
export { ProductPriceBlock } from './components/ProductPriceBlock';
export { ProductOfferBadge } from './components/ProductOfferBadge';
export { ProductEnquiryButton } from './components/ProductEnquiryButton';
export { BulkOffers, BulkOffers as BulkOfferSection, BulkOffers as BulkSavingsSection } from './components/BulkOffers';
export { WholesaleBanner } from './components/WholesaleBanner';
export { WholesaleAudienceSection, WholesaleAudienceSection as WholesaleAudienceGrid } from './components/WholesaleAudienceSection';
export { BulkOrderSteps } from './components/BulkOrderSteps';
export { CleaningLiquidsFaq, CleaningLiquidsFaq as ProductFaq } from './components/CleaningLiquidsFaq';
export { WholesaleCta, WholesaleCta as CleaningLiquidsCta } from './components/WholesaleCta';
export { WholesaleCart, WholesaleCart as EnquiryCartDrawer } from './components/WholesaleCart';

// Hooks
export { useProductFilters } from './hooks/useProductFilters';
export { useWholesaleCart, useWholesaleCart as useEnquiryCart } from './hooks/useWholesaleCart';
export { useLocation } from './hooks/useLocation';

// Data
export { CLEANING_PRODUCTS } from './data/products';
export { BULK_OFFER_HIGHLIGHTS, TRUST_STRIP_ITEMS } from './data/pricing';
export { PRODUCT_CATEGORIES } from './data/categories';
export { WHOLESALE_AUDIENCES } from './data/audiences';
export { CLEANING_LIQUIDS_FAQS } from './data/faqs';

// Utils
export {
  calculatePackPricing,
  calculateBulkSavings,
  formatCurrency,
  getPricingLabel,
  REFERENCE_PRICE_DISCLAIMER,
  BULK_DISCOUNT_RATE
} from './utils/pricingUtils';
export {
  buildWholesaleWhatsAppMessage,
  buildMultiItemWholesaleWhatsAppUrl,
  buildProductWhatsAppUrl,
  sendWholesaleWhatsApp,
  sendDirectProductWhatsApp,
  WHATSAPP_PHONE_NUMBER
} from './utils/whatsappUtils';

// Types
export type {
  Product,
  PackOption,
  PricingStatus,
  ProductCategory,
  CartItem,
  WholesaleAudience,
  WholesaleEnquiryPayload
} from './types/product';
export type { PriceCalculationResult, ReferenceType } from './types/pricing';
