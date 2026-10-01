export type PricingStatus = 'confirmed' | 'suggested' | 'enquiry';

export type ReferenceType = 'promotional-comparison' | 'regular-pack-comparison' | 'none';

export interface PriceCalculationResult {
  offerPrice: number | null;
  referencePrice: number | null;
  savingsAmount: number;
  discountLabel: string | null;
  referenceType: ReferenceType;
  referenceNote: string;
  isExactDiscount: boolean;
  formattedOffer: string;
  formattedReference: string | null;
}
