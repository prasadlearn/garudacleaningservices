import type { PackOption } from '../types/product';
import type { PriceCalculationResult } from '../types/pricing';

export const REFERENCE_PRICE_DISCLAIMER =
  '*Reference price used for promotional comparison. Actual packaged-product MRP, where applicable, follows the product label.';

export const BULK_DISCOUNT_RATE = 0.08;

/**
 * Formats a numeric price into standard Indian Rupee format (e.g. ₹125 or ₹1,250).
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'Price on Enquiry';
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Calculates reference price and accurate savings for any pack option.
 */
export function calculatePackPricing(
  pack: PackOption,
  oneLitrePrice?: number | null
): PriceCalculationResult {
  const offerPrice = pack.offerPrice ?? pack.price ?? null;

  if (offerPrice === null) {
    return {
      offerPrice: null,
      referencePrice: null,
      savingsAmount: 0,
      discountLabel: null,
      referenceType: 'none',
      referenceNote: 'Price confirmed upon enquiry.',
      isExactDiscount: false,
      formattedOffer: 'Price on Enquiry',
      formattedReference: null
    };
  }

  // 1. Check if 5L pack with 1L reference comparison
  if (pack.size === '5 L' && oneLitrePrice && oneLitrePrice > 0) {
    const regularPackCost = 5 * oneLitrePrice;
    const savings = Math.max(0, regularPackCost - offerPrice);
    return {
      offerPrice,
      referencePrice: regularPackCost,
      savingsAmount: savings,
      discountLabel: savings > 0 ? `Save ₹${savings}` : null,
      referenceType: 'regular-pack-comparison',
      referenceNote: 'Regular-pack comparison (5 × 1L regular price)',
      isExactDiscount: false,
      formattedOffer: formatCurrency(offerPrice),
      formattedReference: formatCurrency(regularPackCost)
    };
  }

  // 2. If pack has explicit referencePrice already configured
  if (pack.referencePrice && pack.referencePrice > offerPrice) {
    const savings = pack.referencePrice - offerPrice;
    const isExact = savings / pack.referencePrice === 0.2;
    return {
      offerPrice,
      referencePrice: pack.referencePrice,
      savingsAmount: savings,
      discountLabel: isExact ? '20% OFF' : `Save ₹${savings}`,
      referenceType: pack.referenceType || 'promotional-comparison',
      referenceNote: REFERENCE_PRICE_DISCLAIMER,
      isExactDiscount: isExact,
      formattedOffer: formatCurrency(offerPrice),
      formattedReference: formatCurrency(pack.referencePrice)
    };
  }

  // 3. Central promotional calculation: offerPrice / 0.80
  const calculatedRef = Math.round(offerPrice / 0.8);
  const savings = Math.max(0, calculatedRef - offerPrice);
  const isExact20 = savings > 0 && savings / calculatedRef === 0.2;

  return {
    offerPrice,
    referencePrice: calculatedRef,
    savingsAmount: savings,
    discountLabel: isExact20 ? '20% OFF' : savings > 0 ? `Save ₹${savings}` : null,
    referenceType: 'promotional-comparison',
    referenceNote: REFERENCE_PRICE_DISCLAIMER,
    isExactDiscount: isExact20,
    formattedOffer: formatCurrency(offerPrice),
    formattedReference: formatCurrency(calculatedRef)
  };
}

/**
 * Calculates factual bulk savings for 5L products vs 5 x 1L bottles
 */
export function calculateBulkSavings(oneLitrePrice: number, fiveLitrePrice: number): {
  fiveLitrePrice: number;
  fiveIndividualCost: number;
  savings: number;
  label: string;
} {
  const fiveIndividualCost = 5 * oneLitrePrice;
  const savings = Math.max(0, fiveIndividualCost - fiveLitrePrice);
  return {
    fiveLitrePrice,
    fiveIndividualCost,
    savings,
    label: `Save ₹${savings}`
  };
}

export function getPricingLabel(option: PackOption): {
  badgeText: string | null;
  badgeType: 'saver' | 'suggested' | 'enquiry' | 'special' | null;
  subtext: string | null;
} {
  const offerPrice = option.offerPrice ?? option.price ?? null;
  if (offerPrice === null) {
    return {
      badgeText: 'Price on Enquiry',
      badgeType: 'enquiry',
      subtext: 'Contact for wholesale rates'
    };
  }

  if (option.discountLabel) {
    return {
      badgeText: option.discountLabel,
      badgeType: 'saver',
      subtext: option.note || null
    };
  }

  return {
    badgeText: null,
    badgeType: null,
    subtext: null
  };
}
