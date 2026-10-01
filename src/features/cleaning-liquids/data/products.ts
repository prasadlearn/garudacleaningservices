import type { Product } from '../types/product';

/**
 * CENTRAL SOURCE OF TRUTH FOR ALL CLEANING LIQUIDS & WHOLESALE SUPPLIES IN TIRUPATI
 *
 * Current Live Offer Prices:
 * - Floor Cleaner: 500ml ₹70, 1L ₹125, 5L ₹575
 * - Bathroom Cleaner: 500ml ₹60, 1L ₹100, 5L ₹460
 * - Glass Cleaner: 500ml ₹80, 1L ₹150, 5L ₹690
 * - Phenyl: 1L ₹50, 5L ₹230
 * - Multipurpose Cleaner: 1L ₹110, 5L ₹510
 * - Dishwash: 500ml ₹79, 1L ₹149, 5L ₹685
 * - Laundry Liquid: 1L ₹119, 5L ₹549
 * - Unpriced enquiry products: Tile Cleaner, Laundry Powder, Stain Remover, Hand Wash
 */

export const CLEANING_PRODUCTS: Product[] = [
  {
    id: 'floor-cleaner',
    name: 'Floor Cleaner',
    category: 'Floor Care',
    image: '/images/products/floor-cleaner.webp',
    shortDescription: 'For daily floor and hard-surface cleaning across tiles, marble, and granite.',
    use: 'Daily mopping and dirt removal in homes, offices, and shops.',
    suitableFor: ['Vitrified Tiles', 'Marble & Granite', 'Daily Mopping'],
    packs: [
      {
        size: '500 ml',
        offerPrice: 70,
        price: 70,
        referencePrice: 88,
        referenceType: 'promotional-comparison',
        savingsAmount: 18,
        discountLabel: 'Save ₹18'
      },
      {
        size: '1 L',
        offerPrice: 125,
        price: 125,
        referencePrice: 156,
        referenceType: 'promotional-comparison',
        savingsAmount: 31,
        discountLabel: 'Save ₹31'
      },
      {
        size: '5 L',
        offerPrice: 575,
        price: 575,
        referencePrice: 625,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 50,
        discountLabel: 'Save ₹50',
        bulkLabel: '5L Bulk Pack',
        isBulkPack: true,
        note: 'Save ₹50 vs 5 × 1L pack'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'bathroom-cleaner',
    name: 'Bathroom Cleaner',
    category: 'Washroom Care',
    image: '/images/products/bathroom-cleaner.webp',
    shortDescription: 'Removes soap scum, water scale, and grime from bathroom tiles and fixtures.',
    use: 'Descales bathroom wall tiles, floor tiles, washbasins, and taps.',
    suitableFor: ['Wall & Floor Tiles', 'Wash Basins', 'Taps & Fixtures'],
    packs: [
      {
        size: '500 ml',
        offerPrice: 60,
        price: 60,
        referencePrice: 75,
        referenceType: 'promotional-comparison',
        savingsAmount: 15,
        discountLabel: '20% OFF'
      },
      {
        size: '1 L',
        offerPrice: 100,
        price: 100,
        referencePrice: 125,
        referenceType: 'promotional-comparison',
        savingsAmount: 25,
        discountLabel: '20% OFF'
      },
      {
        size: '5 L',
        offerPrice: 460,
        price: 460,
        referencePrice: 500,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 40,
        discountLabel: 'Save ₹40',
        bulkLabel: '5L Bulk Pack',
        isBulkPack: true,
        note: 'Save ₹40 vs 5 × 1L pack'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'glass-cleaner',
    name: 'Glass Cleaner',
    category: 'Glass Care',
    image: '/images/products/glass-cleaner.webp',
    shortDescription: 'Fast-drying, streak-free spray and wipe cleaner for windows and mirrors.',
    use: 'Cleans windows, glass doors, mirrors, showcases, and tabletops.',
    suitableFor: ['Window Glass', 'Glass Partitions', 'Dressing Mirrors'],
    packs: [
      {
        size: '500 ml',
        offerPrice: 80,
        price: 80,
        referencePrice: 100,
        referenceType: 'promotional-comparison',
        savingsAmount: 20,
        discountLabel: '20% OFF'
      },
      {
        size: '1 L',
        offerPrice: 150,
        price: 150,
        referencePrice: 188,
        referenceType: 'promotional-comparison',
        savingsAmount: 38,
        discountLabel: 'Save ₹38'
      },
      {
        size: '5 L',
        offerPrice: 690,
        price: 690,
        referencePrice: 750,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 60,
        discountLabel: 'Save ₹60',
        bulkLabel: '5L Bulk Pack',
        isBulkPack: true,
        note: 'Save ₹60 vs 5 × 1L pack'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'phenyl',
    name: 'Phenyl',
    category: 'Disinfectants',
    image: '/images/products/phenyl.webp',
    shortDescription: 'Fragrant floor wash liquid for corridors, lobbies, and commercial spaces.',
    use: 'Regular washing of residential corridors, building lobbies, and commercial walkways.',
    suitableFor: ['Corridors & Verandas', 'Staircases', 'Apartment Common Areas'],
    packs: [
      {
        size: '1 L',
        offerPrice: 50,
        price: 50,
        referencePrice: 63,
        referenceType: 'promotional-comparison',
        savingsAmount: 13,
        discountLabel: 'Save ₹13'
      },
      {
        size: '5 L',
        offerPrice: 230,
        price: 230,
        referencePrice: 250,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 20,
        discountLabel: 'Save ₹20',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹20 vs 5 × 1L pack'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'multipurpose-cleaner',
    name: 'Multipurpose Cleaner',
    category: 'Multipurpose',
    image: '/images/products/multipurpose-cleaner.webp',
    shortDescription: 'All-round cleaner for desks, counters, plastic fixtures, and washable surfaces.',
    use: 'Surface cleaning across tables, desks, counters, plastic fixtures, and doors.',
    suitableFor: ['Office Desks & Counters', 'Dining Tables', 'Cabinet Laminates'],
    packs: [
      {
        size: '1 L',
        offerPrice: 110,
        price: 110,
        referencePrice: 138,
        referenceType: 'promotional-comparison',
        savingsAmount: 28,
        discountLabel: 'Save ₹28'
      },
      {
        size: '5 L',
        offerPrice: 510,
        price: 510,
        referencePrice: 550,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 40,
        discountLabel: 'Save ₹40',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹40 vs 5 × 1L pack'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'dishwash',
    name: 'Dishwash Liquid',
    category: 'Kitchen Care',
    image: '/images/products/dishwash.webp',
    shortDescription: 'Concentrated grease-cutting dishwashing liquid for spotless kitchen utensils.',
    use: 'Degreasing utensils, cookware, plates, and glassware.',
    suitableFor: ['Stainless Steel', 'Ceramic & Melamine', 'Glassware'],
    packs: [
      {
        size: '500 ml',
        offerPrice: 79,
        price: 79,
        referencePrice: 99,
        referenceType: 'promotional-comparison',
        savingsAmount: 20,
        discountLabel: 'Save ₹20'
      },
      {
        size: '1 L',
        offerPrice: 149,
        price: 149,
        referencePrice: 186,
        referenceType: 'promotional-comparison',
        savingsAmount: 37,
        discountLabel: 'Save ₹37'
      },
      {
        size: '5 L',
        offerPrice: 685,
        price: 685,
        referencePrice: 745,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 60,
        discountLabel: 'Save ₹60',
        bulkLabel: '5L Bulk Pack',
        isBulkPack: true,
        note: 'Save ₹60 vs 5 × 1L pack'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'laundry-liquid',
    name: 'Laundry Liquid',
    category: 'Fabric Care',
    image: '/images/products/laundry-liquid.webp',
    shortDescription: 'Liquid detergent for regular machine and bucket washing of fabrics and linens.',
    use: 'Washing clothes, bedsheets, towels, and curtains in machine or bucket.',
    suitableFor: ['Cotton & Synthetic', 'Washing Machines', 'Daily Laundry'],
    packs: [
      {
        size: '1 L',
        offerPrice: 119,
        price: 119,
        referencePrice: 149,
        referenceType: 'promotional-comparison',
        savingsAmount: 30,
        discountLabel: 'Save ₹30'
      },
      {
        size: '5 L',
        offerPrice: 549,
        price: 549,
        referencePrice: 595,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 46,
        discountLabel: 'Save ₹46',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹46 vs 5 × 1L pack'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'tile-cleaner',
    name: 'Tile Cleaner',
    category: 'Floor Care',
    image: '/images/products/tile-cleaner.webp',
    shortDescription: 'Heavy-duty cleaner for hard water stains and grout lines on tiles.',
    use: 'Heavy-duty cleaning of hard water stains and grout dirt on ceramic and vitrified tiles.',
    suitableFor: ['Acid-Resistant Ceramic Tiles', 'Grout Lines', 'Balconies'],
    packs: [
      {
        size: '1 L',
        offerPrice: null,
        price: null,
        referencePrice: null,
        referenceType: 'none',
        note: 'Price on Enquiry'
      },
      {
        size: '5 L',
        offerPrice: null,
        price: null,
        referencePrice: null,
        referenceType: 'none',
        note: 'Price on Enquiry'
      }
    ],
    orderEnabled: false
  },
  {
    id: 'laundry-powder',
    name: 'Laundry Powder',
    category: 'Fabric Care',
    image: '/images/products/laundry-powder.webp',
    shortDescription: 'Active detergent powder for bulk washing of linens and uniforms.',
    use: 'Regular detergent powder for bulk washing of linens, uniforms, and towels.',
    suitableFor: ['Bucket & Machine Wash', 'Commercial Linens', 'Institutional Laundry'],
    packs: [
      {
        size: '1 kg',
        offerPrice: null,
        price: null,
        referencePrice: null,
        referenceType: 'none',
        note: 'Price on Enquiry'
      },
      {
        size: '5 kg',
        offerPrice: null,
        price: null,
        referencePrice: null,
        referenceType: 'none',
        note: 'Price on Enquiry'
      }
    ],
    orderEnabled: false
  },
  {
    id: 'stain-remover',
    name: 'Stain Remover',
    category: 'Fabric Care',
    image: '/images/products/stain-remover.webp',
    shortDescription: 'Targeted spot cleaner for tough stains on fabric, upholstery, and carpets.',
    use: 'Spot stain treatment on fabrics, carpets, upholstery, and hard stains.',
    suitableFor: ['Upholstery & Carpets', 'Curtains', 'Spot Cleaning'],
    packs: [
      {
        size: '500 ml',
        offerPrice: null,
        price: null,
        referencePrice: null,
        referenceType: 'none',
        note: 'Price on Enquiry'
      },
      {
        size: '1 L',
        offerPrice: null,
        price: null,
        referencePrice: null,
        referenceType: 'none',
        note: 'Price on Enquiry'
      }
    ],
    orderEnabled: false
  },
  {
    id: 'hand-wash',
    name: 'Hand Wash',
    category: 'Washroom Care',
    image: '/images/products/hand-wash.webp',
    shortDescription: 'Gentle moisturizing liquid hand wash for homes, offices, and restrooms.',
    use: 'Gentle liquid hand soap for washrooms, kitchens, and commercial basins.',
    suitableFor: ['Home Restrooms', 'Office Washbasins', 'Restaurant Counters'],
    packs: [
      {
        size: '500 ml',
        offerPrice: null,
        price: null,
        referencePrice: null,
        referenceType: 'none',
        note: 'Price on Enquiry'
      },
      {
        size: '5 L',
        offerPrice: null,
        price: null,
        referencePrice: null,
        referenceType: 'none',
        note: 'Price on Enquiry'
      }
    ],
    orderEnabled: false
  }
];
