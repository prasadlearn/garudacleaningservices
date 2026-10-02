import type { ReferenceType } from './pricing';

export type PricingStatus = 'confirmed' | 'suggested' | 'enquiry';

export type PackSize = '500 ml' | '1 L' | '5 L' | '10 L' | string;

export interface PackOption {
  size: PackSize;
  offerPrice: number | null; // null if enquiry only
  price?: number | null; // backward compatibility alias for offerPrice
  pricingStatus?: PricingStatus;
  referencePrice?: number | null; // calculated promotional comparison or pack comparison
  referenceType?: ReferenceType;
  savingsAmount?: number;
  discountLabel?: string;
  bulkLabel?: string;
  isBulkPack?: boolean;
  note?: string;
  savings?: number;
}

export type ProductCategory =
  | 'All'
  | 'All Products'
  | 'Floor Care'
  | 'Bathroom Care'
  | 'Kitchen Care'
  | 'Glass Care'
  | 'Laundry Care'
  | 'Fresheners'
  | 'General Care'
  | '5L Bulk Savers';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  image: string;
  shortDescription: string;
  use?: string;
  suitableFor: string[];
  packs: PackOption[];
  orderEnabled?: boolean;
}

export interface CartItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number | null;
  pricingStatus?: PricingStatus;
}

export interface WholesaleAudience {
  id: string;
  title: string;
  icon: string;
  description: string;
  recommendedPacks: string;
  popularProducts: string[];
}

export interface WholesaleEnquiryPayload {
  name: string;
  businessType: string;
  deliveryLocation: string;
  gpsLocation?: string;
  items: CartItem[];
  notes?: string;
}
