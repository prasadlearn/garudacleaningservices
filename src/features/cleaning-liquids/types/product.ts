import type { ReferenceType } from './pricing';

export type PricingStatus = 'confirmed' | 'suggested' | 'enquiry';

export type PackSize = '500 ml' | '1 L' | '5 L' | '1 kg' | '5 kg' | string;

export interface PackOption {
  size: PackSize;
  offerPrice: number | null; // e.g. 70, 125, 575 (null if enquiry only)
  price?: number | null; // backward compatibility alias for offerPrice
  pricingStatus?: PricingStatus;
  referencePrice?: number | null; // calculated promotional comparison or 5x 1L reference
  referenceType?: ReferenceType;
  savingsAmount?: number;
  discountLabel?: string;
  bulkLabel?: string;
  isBulkPack?: boolean;
  note?: string;
  savings?: number;
}

export type ProductCategory =
  | 'All Products'
  | '5L Bulk Savers'
  | 'Floor Care'
  | 'Washroom Care'
  | 'Kitchen Care'
  | 'Glass Care'
  | 'Multipurpose'
  | 'Fabric Care'
  | 'Disinfectants';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  image: string;
  shortDescription: string;
  use?: string;
  suitableFor?: string[];
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
