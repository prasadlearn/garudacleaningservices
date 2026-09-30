// Centralized data catalog for Garuda Cleaning Liquids & Wholesale Supplies
// Official cleaning products and wholesale supplies in Tirupati

export type ProductCategory = 'Surface Care' | 'Washroom Care' | 'Kitchen Care' | 'Disinfectants' | 'Fabric Care';

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  use: string;
  suitableFor: string[];
  image: string;
  packSizes: string[];
  litreOptions: string[];
  retailPrice: string | null;
  wholesalePrice: string | null;
  offer: { label: string; description: string } | null;
  availability: 'In Stock' | 'Available for Bulk Orders';
  orderNote: string;
  sortOrder: number;
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
] as const;

export type ProductCategoryFilter = (typeof PRODUCT_CATEGORIES)[number];

export const GARUDA_PRODUCTS: ProductItem[] = [
  {
    id: 'floor-cleaner',
    name: 'Floor Cleaner',
    category: 'Surface Care',
    categoryLabel: 'Surface Care',
    shortDescription: 'Daily floor cleaning liquid with pleasant fragrance for tiles, marble, and granite.',
    use: 'Daily mopping and floor dirt removal in homes, offices, and shops.',
    suitableFor: ['Vitrified Tiles', 'Marble & Granite', 'Daily Mopping', 'Living & Commercial Floors'],
    image: '/images/products/floor-cleaner.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Bulk wholesale supply available across Tirupati.',
    sortOrder: 1,
  },
  {
    id: 'toilet-cleaner',
    name: 'Toilet Cleaner',
    category: 'Washroom Care',
    categoryLabel: 'Washroom Care',
    shortDescription: 'Thick descaling liquid that clings to ceramic commodes and urinals to remove stains.',
    use: 'Cleans yellow water marks, hard water scaling, and restroom grime.',
    suitableFor: ['Western & Indian Commodes', 'Urinals', 'Ceramic Bowls', 'Restroom Hygiene'],
    image: '/images/products/toilet-cleaner.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Wholesale supply available for hotels, lodges, and commercial restrooms.',
    sortOrder: 2,
  },
  {
    id: 'bathroom-cleaner',
    name: 'Bathroom & Tile Cleaner',
    category: 'Washroom Care',
    categoryLabel: 'Washroom Care',
    shortDescription: 'Removes white soap scum, water scale, and slippery dirt from bathroom surfaces.',
    use: 'Descales bathroom wall tiles, floor tiles, washbasins, and taps.',
    suitableFor: ['Bathroom Wall & Floor Tiles', 'Wash Basins', 'Taps & Fixtures', 'Shower Enclosures'],
    image: '/images/products/bathroom-cleaner.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Surface-safe formulation, ideal for regular upkeep.',
    sortOrder: 3,
  },
  {
    id: 'glass-cleaner',
    name: 'Glass Cleaner',
    category: 'Surface Care',
    categoryLabel: 'Surface Care',
    shortDescription: 'Fast-drying, streak-free spray and wipe cleaner for glass and mirrors.',
    use: 'Cleans windows, glass doors, mirrors, showcases, and tabletops.',
    suitableFor: ['Window Glass', 'Glass Partitions', 'Dressing Mirrors', 'Showroom Displays'],
    image: '/images/products/glass-cleaner.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Leaves zero streaks and crystal clarity.',
    sortOrder: 4,
  },
  {
    id: 'phenyl',
    name: 'Phenyl (Floor Wash Liquid)',
    category: 'Disinfectants',
    categoryLabel: 'Disinfectants',
    shortDescription: 'Fragrant floor wash liquid for daily mopping and freshening of large floor areas.',
    use: 'Regular washing of residential corridors, building lobbies, and commercial walkways.',
    suitableFor: ['Corridors & Verandas', 'Staircases', 'Apartment Common Areas', 'Daily Floor Wash'],
    image: '/images/products/phenyl.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'High coverage formula for large facility floor areas.',
    sortOrder: 5,
  },
  {
    id: 'multipurpose-cleaner',
    name: 'Multipurpose Cleaner',
    category: 'Surface Care',
    categoryLabel: 'Surface Care',
    shortDescription: 'All-surface cleaning liquid for office tables, laminate desks, and washable fixtures.',
    use: 'Wipes dust, hand marks, and light grease from workstations and furniture.',
    suitableFor: ['Office Workstations', 'Laminate Counters', 'Plastic Furniture', 'Dining Tables'],
    image: '/images/products/multipurpose-cleaner.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Safe on laminates, wood veneers, and painted metal.',
    sortOrder: 6,
  },
  {
    id: 'dishwash-liquid',
    name: 'Dishwash Liquid',
    category: 'Kitchen Care',
    categoryLabel: 'Kitchen Care',
    shortDescription: 'High-foaming degreasing liquid that quickly dissolves oil and food stains on utensils.',
    use: 'Washes stainless steel, aluminum, ceramic plates, and kitchen cookware.',
    suitableFor: ['Steel Utensils', 'Plates & Glassware', 'Restaurant Kitchens', 'Daily Home Dishes'],
    image: '/images/products/dishwash-liquid.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Tough on grease while gentle on hands.',
    sortOrder: 7,
  },
  {
    id: 'tile-cleaner',
    name: 'Tile & Grout Cleaner',
    category: 'Surface Care',
    categoryLabel: 'Surface Care',
    shortDescription: 'Concentrated cleaner for deep cleaning stained floor tile joints and porous grout.',
    use: 'Restores discolored tile lines, balcony floors, and tough floor stains.',
    suitableFor: ['Tile Joints & Grout', 'Balcony Floors', 'Stained Vitrified Tiles', 'Deep Scrubbing'],
    image: '/images/products/tile-cleaner.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Acid-safe formula that will not corrode tile enamel.',
    sortOrder: 8,
  },
  {
    id: 'laundry-liquid',
    name: 'Laundry Liquid Detergent',
    category: 'Fabric Care',
    categoryLabel: 'Fabric Care',
    shortDescription: 'Liquid detergent that dissolves completely in water without leaving powdery residue.',
    use: 'Washing bedsheets, towels, uniforms, and daily clothing in machines or bucket wash.',
    suitableFor: ['Top & Front Load Machines', 'Hotel Linens & Towels', 'Daily Clothes', 'Uniforms'],
    image: '/images/products/laundry-liquid.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Ideal for hotels, lodges, and home machine wash.',
    sortOrder: 9,
  },
  {
    id: 'laundry-powder',
    name: 'Laundry Detergent Powder',
    category: 'Fabric Care',
    categoryLabel: 'Fabric Care',
    shortDescription: 'Bulk laundry powder formulated for heavy fabric wash and institutional linen care.',
    use: 'High-efficiency washing for large volume hotel linens, drapes, and staff workwear.',
    suitableFor: ['Bulk Commercial Laundry', 'Hotel Bed Linens', 'Heavy Fabrics', 'Bucket Wash'],
    image: '/images/products/laundry-powder.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Wholesale quantities supplied directly to hotels and institutions.',
    sortOrder: 10,
  },
  {
    id: 'stain-remover',
    name: 'Fabric & Surface Stain Remover',
    category: 'Fabric Care',
    categoryLabel: 'Fabric Care',
    shortDescription: 'Spot treatment spray that lifts grease, tea, coffee, and collar dirt prior to washing.',
    use: 'Targeted spot cleaning for stubborn stains on shirts, uniforms, and upholstery.',
    suitableFor: ['Collar & Cuff Grime', 'Oil & Food Spills', 'Tea & Coffee Marks', 'Spot Detailing'],
    image: '/images/products/stain-remover.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Spot treatment formula for fabrics.',
    sortOrder: 11,
  },
  {
    id: 'hand-wash',
    name: 'Liquid Hand Wash',
    category: 'Washroom Care',
    categoryLabel: 'Washroom Care',
    shortDescription: 'Gentle foaming antibacterial hand wash for homes, restaurants, offices, and guest restrooms.',
    use: 'Daily hand hygiene in commercial restrooms, office washrooms, and households.',
    suitableFor: ['Office Washrooms', 'Restaurant Restrooms', 'Guest House Sinks', 'Household Use'],
    image: '/images/products/bathroom-cleaner.webp',
    packSizes: ['Pack sizes available on request'],
    litreOptions: [],
    retailPrice: null,
    wholesalePrice: null,
    offer: null,
    availability: 'Available for Bulk Orders',
    orderNote: 'Available in bulk quantities for institutional dispensers.',
    sortOrder: 12,
  },
];

export const WHO_WE_SUPPLY_DATA: SupplyTarget[] = [
  {
    id: 'apartments',
    title: 'Apartments & Residential Societies',
    description: 'Regular and monthly supply of floor cleaners, phenyl, and washroom essentials for gated communities and flats in Tirupati.',
    examples: 'Apartment Associations, Gated Communities, Residential Flats',
  },
  {
    id: 'hospitality',
    title: 'Hotels, Lodges & Guest Houses',
    description: 'Bulk supplies of dishwash, linen detergents, and bathroom descalers for daily guest turnaround in Tirupati.',
    examples: 'Hotels near Temple, Pilgrim Lodges, Guest Houses, Restaurants',
  },
  {
    id: 'offices',
    title: 'Offices & Corporate Spaces',
    description: 'Dependable supply of glass cleaners, surface sprays, and floor cleaners for tidy corporate and commercial workplaces.',
    examples: 'IT Offices, Bank Branches, Corporate Facilities, Clinics',
  },
  {
    id: 'shops',
    title: 'Shops & Supermarkets',
    description: 'Commercial glass and floor cleaners to maintain spotless glass displays, counters, and customer walking aisles.',
    examples: 'Retail Shops, Supermarkets, Commercial Showrooms',
  },
  {
    id: 'contractors',
    title: 'Cleaning Contractors & Housekeeping Teams',
    description: 'Direct wholesale rates on bulk cans and professional cleaning solutions for local housekeeping teams and janitorial vendors.',
    examples: 'Facility Teams, Cleaning Contractors, Maintenance Staff',
  },
  {
    id: 'schools',
    title: 'Schools & Educational Institutions',
    description: 'Safe sanitization and floor cleaning products for classrooms, desks, restrooms, and dining areas.',
    examples: 'Schools, Colleges, Tuition Centers, Day Care Centers',
  },
];

export const PRODUCT_BENEFITS: ProductBenefit[] = [
  {
    id: 'wholesale-rates',
    title: 'Direct Wholesale Rates',
    description: 'Competitive bulk rates for commercial facilities, societies, and bulk buyers in Tirupati.',
    highlight: 'Cost Savings',
  },
  {
    id: 'quality-formulas',
    title: 'Surface-Safe Formulations',
    description: 'Practical formulations designed for regular maintenance without degrading surfaces or fittings.',
    highlight: 'Surface-Safe',
  },
  {
    id: 'local-tirupati',
    title: 'Local Tirupati Delivery & Pickup',
    description: 'Fast local dispatch across all areas of Tirupati and surrounding neighborhoods.',
    highlight: 'Local Tirupati',
  },
  {
    id: 'expert-advice',
    title: 'Cleaning Service Expertise',
    description: 'Backed by our hands-on experience in residential and commercial cleaning across Tirupati.',
    highlight: 'Expert Support',
  },
];

export const PRODUCT_FAQS = [
  {
    q: 'What types of cleaning liquids and supplies do you provide in Tirupati?',
    a: 'We supply floor cleaners, toilet cleaners, bathroom descalers, streak-free glass cleaners, concentrated phenyl, multipurpose surface cleaners, dishwash liquids, tile cleaners, laundry detergents, and stain removers.',
  },
  {
    q: 'Can I purchase products in wholesale / bulk quantities?',
    a: 'Yes, wholesale quantities and bulk supplies are available for apartments, hotels, guest lodges, corporate offices, retail stores, educational institutions, and housekeeping contractors across Tirupati.',
  },
  {
    q: 'How do I get the latest wholesale price list or place an order?',
    a: 'You can tap "Get Wholesale Price List" or click "WhatsApp to Order" to send us your list of required items and quantities. Our coordinator will provide the latest price list and assist with order fulfillment.',
  },
  {
    q: 'Do you deliver bulk orders across Tirupati?',
    a: 'Yes, we coordinate delivery and pickup across Tirupati city, including Balaji Colony, MR Palli, AIR Bypass Road, Renigunta, Tiruchanur, and surrounding areas.',
  },
  {
    q: 'Are your cleaning liquids suitable for commercial dispensers?',
    a: 'Yes, our wholesale cans and liquid formulations are suitable for commercial wall dispensers, restroom soap holders, and dilution systems.',
  },
];

export interface WholesaleEnquiryPayload {
  name?: string;
  businessType?: string;
  products?: string[];
  packSize?: string;
  quantity?: string;
  location?: string;
  message?: string;
}

export const buildWholesaleWhatsAppUrl = (payload?: WholesaleEnquiryPayload): string => {
  const phone = '917799552084';
  const name = payload?.name || 'Customer';
  const business = payload?.businessType || 'General Enquiry';
  const products = payload?.products && payload.products.length > 0 ? payload.products.join(', ') : 'Wholesale Price List';
  const packSize = payload?.packSize || 'Wholesale Quantity';
  const qty = payload?.quantity || 'As needed';
  const location = payload?.location || 'Tirupati';
  const notes = payload?.message ? `\nNotes: ${payload.message}` : '';

  const text = `*Garuda Wholesale Cleaning Liquids Enquiry*
Name: ${name}
Business Type: ${business}
Products: ${products}
Pack Size: ${packSize}
Quantity: ${qty}
Location: ${location}${notes}

Please send the latest wholesale price list and availability.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
