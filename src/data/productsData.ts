// Centralized data catalog for Garuda Liquids Wholesale
// Official products and wholesale supplies in Tirupati

export interface ProductItem {
  id: string;
  name: string;
  category: 'Surface Care' | 'Washroom Care' | 'Kitchen Care' | 'Disinfectants' | 'Fabric Care' | 'Air Care';
  categoryLabel: string;
  tagline: string;
  description: string;
  suitableFor: string[];
  packagingNote: string;
  image: string;
  color: {
    badgeBg: string;
    badgeText: string;
    accent: string;
    border: string;
  };
}

export interface SupplyTarget {
  id: string;
  title: string;
  description: string;
  examples: string;
}

export interface ProductBenefit {
  id: string;
  title: string;
  description: string;
  highlight: string;
}

export const PRODUCT_CATEGORIES = [
  'All Products',
  'Surface Care',
  'Washroom Care',
  'Kitchen Care',
  'Disinfectants',
  'Fabric Care',
  'Air Care',
] as const;

export type ProductCategoryFilter = (typeof PRODUCT_CATEGORIES)[number];

export const GARUDA_PRODUCTS: ProductItem[] = [
  {
    id: 'floor-cleaner',
    name: 'Floor Cleaner',
    category: 'Surface Care',
    categoryLabel: 'Surface Care',
    tagline: 'Daily floor cleaning with fresh fragrance',
    description: 'Cleans dirt, stains, and footprints from tiles, marble, and granite floors. Good for regular mopping in homes and offices.',
    suitableFor: ['Tiles & Marble', 'Granite Floors', 'Daily Mopping', 'Living & Office Areas'],
    packagingNote: 'Available in 5L Cans & Standard Bottles',
    image: '/images/products/floor-cleaner.webp',
    color: {
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-700',
      accent: '#2563eb',
      border: 'border-blue-200',
    },
  },
  {
    id: 'toilet-cleaner',
    name: 'Toilet Cleaner',
    category: 'Washroom Care',
    categoryLabel: 'Washroom Care',
    tagline: 'Removes yellow stains and hard water scale',
    description: 'Thick liquid cleaner that clings to toilet bowls and urinals to clean yellow water marks, rust stains, and dirt.',
    suitableFor: ['Western & Indian Commodes', 'Urinals', 'Hard Water Marks', 'Restroom Hygiene'],
    packagingNote: 'Available in 5L Wholesale Cans & Angled Bottles',
    image: '/images/products/toilet-cleaner.webp',
    color: {
      badgeBg: 'bg-indigo-50',
      badgeText: 'text-indigo-700',
      accent: '#4f46e5',
      border: 'border-indigo-200',
    },
  },
  {
    id: 'bathroom-cleaner',
    name: 'Bathroom Cleaner',
    category: 'Washroom Care',
    categoryLabel: 'Washroom Care',
    tagline: 'Cleans soap marks and bathroom tiles',
    description: 'Removes white soap marks, water spots, and slippery dirt from bathroom walls, floors, and wash basins.',
    suitableFor: ['Bathroom Wall & Floor Tiles', 'Wash Basins', 'Taps & Fixtures', 'Shower Areas'],
    packagingNote: 'Available in 5L Wholesale Cans & 1L Bottles',
    image: '/images/products/bathroom-cleaner.webp',
    color: {
      badgeBg: 'bg-pink-50',
      badgeText: 'text-pink-700',
      accent: '#db2777',
      border: 'border-pink-200',
    },
  },
  {
    id: 'glass-cleaner',
    name: 'Glass Cleaner',
    category: 'Surface Care',
    categoryLabel: 'Surface Care',
    tagline: 'Clean shine without marks or streaks',
    description: 'Spray and wipe liquid for clear glass, mirrors, window panels, dressing tables, and display counters.',
    suitableFor: ['Windows & Glass Doors', 'Dressing Mirrors', 'Showroom Glass', 'Car Windshields'],
    packagingNote: 'Available in 5L Refill Cans & Spray Bottles',
    image: '/images/products/glass-cleaner.webp',
    color: {
      badgeBg: 'bg-sky-50',
      badgeText: 'text-sky-700',
      accent: '#0284c7',
      border: 'border-sky-200',
    },
  },
  {
    id: 'phenyl',
    name: 'Phenyl (Floor Wash Liquid)',
    category: 'Surface Care',
    categoryLabel: 'Floor Care',
    tagline: 'Fragrant floor wash liquid for daily mopping',
    description: 'Floor wash liquid for regular mopping and washing of floors in homes, offices, shops, and commercial buildings.',
    suitableFor: ['Floor Mopping', 'Corridors & Verandas', 'Commercial Floors', 'Daily Maintenance'],
    packagingNote: 'Available in 5L Bulk Cans & Standard Packs',
    image: '/images/products/phenyl.webp',
    color: {
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-800',
      accent: '#d97706',
      border: 'border-amber-200',
    },
  },
  {
    id: 'multipurpose-cleaner',
    name: 'Multipurpose Cleaner',
    category: 'Surface Care',
    categoryLabel: 'Surface Care',
    tagline: 'All-in-one cleaner for daily surfaces',
    description: 'General cleaning liquid for office tables, laminate counters, doors, plastic chairs, and washable surfaces.',
    suitableFor: ['Office Desks & Tables', 'Kitchen Counters', 'Plastic & Wood Laminates', 'General Housekeeping'],
    packagingNote: 'Available in 5L Cans & Spray Bottles',
    image: '/images/products/multipurpose-cleaner.webp',
    color: {
      badgeBg: 'bg-purple-50',
      badgeText: 'text-purple-700',
      accent: '#7e22ce',
      border: 'border-purple-200',
    },
  },
  {
    id: 'dishwash-liquid',
    name: 'Dishwash Liquid',
    category: 'Kitchen Care',
    categoryLabel: 'Kitchen Care',
    tagline: 'Cuts through tough oil and cooking grease',
    description: 'Foaming dishwash liquid that easily removes grease, oil, and food stains from utensils, plates, and cookware.',
    suitableFor: ['Steel & Aluminium Utensils', 'Plates & Glassware', 'Restaurant Kitchens', 'Daily Home Dishes'],
    packagingNote: 'Available in 5L Wholesale Cans & Dispenser Bottles',
    image: '/images/products/dishwash-liquid.webp',
    color: {
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-700',
      accent: '#059669',
      border: 'border-emerald-200',
    },
  },
  {
    id: 'room-freshener',
    name: 'Room Freshener',
    category: 'Air Care',
    categoryLabel: 'Air Care',
    tagline: 'Long-lasting pleasant fragrance',
    description: 'Spray liquid that keeps rooms, office cabins, hotel rooms, and reception areas smelling fresh and pleasant.',
    suitableFor: ['Living Rooms & Bedrooms', 'Hotel Rooms & Lodges', 'Office Cabins', 'Reception Areas'],
    packagingNote: 'Available in 5L Refill Cans & Room Spray Packs',
    image: '/images/products/room-freshener.webp',
    color: {
      badgeBg: 'bg-rose-50',
      badgeText: 'text-rose-700',
      accent: '#e11d48',
      border: 'border-rose-200',
    },
  },
  {
    id: 'tile-cleaner',
    name: 'Tile Cleaner',
    category: 'Surface Care',
    categoryLabel: 'Surface Care',
    tagline: 'Removes dirt and dark stains from tiles',
    description: 'Cleans dirty tile lines, bathroom floor grime, and tough stains on ceramic and vitrified floor tiles.',
    suitableFor: ['Floor & Wall Tiles', 'Tile Joints & Grout', 'Balconies & Corridors', 'Stained Floor Areas'],
    packagingNote: 'Available in 5L Bulk Cans & 1L Bottles',
    image: '/images/products/tile-cleaner.webp',
    color: {
      badgeBg: 'bg-cyan-50',
      badgeText: 'text-cyan-700',
      accent: '#0891b2',
      border: 'border-cyan-200',
    },
  },
  {
    id: 'laundry-liquid',
    name: 'Laundry Liquid',
    category: 'Fabric Care',
    categoryLabel: 'Fabric Care',
    tagline: 'Gentle liquid detergent for clothes and linen',
    description: 'Liquid detergent that dissolves quickly in water to wash clothes, bedsheets, uniforms, and towels without white powder marks.',
    suitableFor: ['Washing Machines (Top & Front Load)', 'Bucket Wash', 'Bedsheets & Linens', 'Daily Clothes & Uniforms'],
    packagingNote: 'Available in 5L Wholesale Cans & Pouches',
    image: '/images/products/laundry-liquid.webp',
    color: {
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-800',
      accent: '#1d4ed8',
      border: 'border-blue-200',
    },
  },
  {
    id: 'laundry-powder',
    name: 'Laundry Powder',
    category: 'Fabric Care',
    categoryLabel: 'Fabric Care',
    tagline: 'Detergent powder for bulk laundry and daily wash',
    description: 'Washing powder for cleaning clothes, hotel linen, and bulk laundry. Removes daily dirt and keeps clothes fresh.',
    suitableFor: ['Bulk Hotel Laundry', 'Daily Household Clothes', 'Commercial Washing', 'Heavy Fabric Wash'],
    packagingNote: 'Available in Wholesale Sacks & Standard Bags',
    image: '/images/products/laundry-powder.webp',
    color: {
      badgeBg: 'bg-teal-50',
      badgeText: 'text-teal-700',
      accent: '#0f766e',
      border: 'border-teal-200',
    },
  },
  {
    id: 'stain-remover',
    name: 'Stain Remover',
    category: 'Fabric Care',
    categoryLabel: 'Fabric & Surface Care',
    tagline: 'Spot treatment for tough oil and food marks',
    description: 'Direct spray solution to remove stubborn collar dirt, food spills, grease, and spots on fabrics and surfaces before regular washing.',
    suitableFor: ['Shirt Collars & Cuffs', 'Food & Tea Stains', 'Oil & Grease Marks', 'Fabric Spot Cleaning'],
    packagingNote: 'Available in Spray Bottles & Refill Packs',
    image: '/images/products/stain-remover.webp',
    color: {
      badgeBg: 'bg-red-50',
      badgeText: 'text-red-700',
      accent: '#b91c1c',
      border: 'border-red-200',
    },
  },
];

export const WHO_WE_SUPPLY_DATA: SupplyTarget[] = [
  {
    id: 'homes',
    title: 'Homes & Apartments',
    description: 'Monthly and regular cleaning liquids for houses, flats, and residential societies in Tirupati.',
    examples: 'Apartments, Individual Houses, Gated Communities',
  },
  {
    id: 'hospitality',
    title: 'Hotels, Lodges & Restaurants',
    description: 'Bulk supply of dishwash, floor cleaners, room fresheners, and laundry products for daily guest rooms and kitchens.',
    examples: 'Hotels, Pilgrimage Lodges, Restaurants, Resorts',
  },
  {
    id: 'offices',
    title: 'Offices & Commercial Spaces',
    description: 'Regular stock of glass cleaners, surface sprays, and washroom cleaners for daily office upkeep.',
    examples: 'Corporate Offices, Bank Branches, Workspaces',
  },
  {
    id: 'commercial',
    title: 'Shops & Showrooms',
    description: 'Quality glass and floor cleaners to keep customer areas, counters, and showroom floors clean.',
    examples: 'Retail Shops, Supermarkets, Commercial Showrooms',
  },
  {
    id: 'cleaning-services',
    title: 'Cleaning Contractors & Housekeeping Teams',
    description: 'Direct wholesale rates on 5L bulk cans for cleaning contractors and housekeeping staff.',
    examples: 'Janitorial Staff, Maintenance Teams, Cleaning Vendors',
  },
  {
    id: 'institutions',
    title: 'Institutions & Commercial Facilities',
    description: 'Reliable bulk supplies of floor cleaners, tile cleaners, and washroom essentials for daily facility care.',
    examples: 'Coaching Centers, Schools, Workspaces, Function Halls',
  },
];

export const PRODUCT_BENEFITS: ProductBenefit[] = [
  {
    id: 'quality',
    title: 'Quality Products',
    description: 'Reliable cleaning liquids that clean effectively without damaging surfaces.',
    highlight: 'Reliable Quality',
  },
  {
    id: 'safe',
    title: 'Safe & Effective',
    description: 'Practical formulas designed for daily home and business use.',
    highlight: 'Safe to Use',
  },
  {
    id: 'delivery',
    title: 'On-Time Local Delivery',
    description: 'Prompt delivery and pickup support across Tirupati with quick WhatsApp response.',
    highlight: 'Tirupati Delivery',
  },
  {
    id: 'wholesale',
    title: 'Wholesale Pricing',
    description: 'Direct bulk pricing for hotels, offices, shops, and regular home buyers.',
    highlight: 'Wholesale Rates',
  },
];

/**
 * Builds dynamic WhatsApp enquiry URL with product-specific context
 */
export function buildProductWhatsAppUrl(productName?: string): string {
  const phone = '917799552084';
  const text = productName
    ? `Hello Garuda Liquids Wholesale, I would like to enquire about ${productName}. Please share availability, can sizes (like 5L), and wholesale prices in Tirupati.`
    : `Hello Garuda Liquids Wholesale, I am looking for wholesale cleaning products in Tirupati. Please share your catalog and bulk price list.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
