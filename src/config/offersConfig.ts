export interface SpecialOfferItem {
  id: string;
  title: string;
  badge: string;
  priceText: string;
  originalPriceText?: string;
  description: string;
  includes: string[];
}

export interface OffersConfig {
  enabled: boolean;
  offers: SpecialOfferItem[];
}

// TODO_OWNER: Set enabled to true and define verified bundle deals when ready.
export const OFFERS_CONFIG: OffersConfig = {
  enabled: false,
  offers: []
};
