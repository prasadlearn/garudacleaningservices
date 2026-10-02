import type { Product } from '../types/product';

/**
 * CENTRAL SOURCE OF TRUTH FOR ALL CLEANING LIQUIDS & WHOLESALE SUPPLIES IN TIRUPATI
 * Exact Client Marketing Calculation:
 * - 1L: Regular = 1L Regular Reference Price (e.g. ₹139), Offer = ₹119
 * - 5L: Regular = 1L Regular × 5 (e.g. ₹139 × 5 = ₹695), Offer = ₹579
 * - 10L: Regular = 1L Regular × 10 (e.g. ₹139 × 10 = ₹1,390), Offer = ₹1,159
 */
export const CLEANING_PRODUCTS: Product[] = [
  {
    id: 'floor-cleaner',
    name: 'Floor Cleaner',
    category: 'Floor Care',
    image: '/images/products/floor-cleaner.webp',
    shortDescription: 'For daily floor and balcony cleaning across tiles, marble, and granite.',
    use: 'Daily mopping and dirt removal in homes, offices, shops, and balconies.',
    suitableFor: ['Floors', 'Balconies'],
    packs: [
      {
        size: '1 L',
        offerPrice: 125,
        price: 125,
        referencePrice: 149,
        referenceType: 'promotional-comparison',
        savingsAmount: 24,
        discountLabel: 'Save ₹24'
      },
      {
        size: '5 L',
        offerPrice: 605,
        price: 605,
        referencePrice: 745,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 140,
        discountLabel: 'Save ₹140',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹140 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 1219,
        price: 1219,
        referencePrice: 1490,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 271,
        discountLabel: 'Save ₹271',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹271 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'glass-cleaner',
    name: 'Glass Cleaner',
    category: 'Glass Care',
    image: '/images/products/glass-cleaner.webp',
    shortDescription: 'Fast-drying streak-free cleaner for crystal clear mirrors and glass surfaces.',
    use: 'Cleans dressing mirrors, glass windows, partitions, and glass tabletops.',
    suitableFor: ['Mirrors', 'Glass surfaces'],
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
        referencePrice: 179,
        referenceType: 'promotional-comparison',
        savingsAmount: 30,
        discountLabel: 'Save ₹30'
      },
      {
        size: '5 L',
        offerPrice: 725,
        price: 725,
        referencePrice: 895,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 170,
        discountLabel: 'Save ₹170',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹170 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 1459,
        price: 1459,
        referencePrice: 1790,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 331,
        discountLabel: 'Save ₹331',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹331 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'phenyl',
    name: 'Phenyl',
    category: 'Floor Care',
    image: '/images/products/phenyl.webp',
    shortDescription: 'Fragrant floor and bathroom wash liquid for corridors and living spaces.',
    use: 'Regular washing and mopping of residential corridors, bathrooms, and commercial floors.',
    suitableFor: ['Floors', 'Bathrooms'],
    packs: [
      {
        size: '1 L',
        offerPrice: 49,
        price: 49,
        referencePrice: 69,
        referenceType: 'promotional-comparison',
        savingsAmount: 20,
        discountLabel: 'Save ₹20'
      },
      {
        size: '5 L',
        offerPrice: 249,
        price: 249,
        referencePrice: 345,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 96,
        discountLabel: 'Save ₹96',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹96 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 490,
        price: 490,
        referencePrice: 690,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 200,
        discountLabel: 'Save ₹200',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹200 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'multipurpose-cleaner',
    name: 'Multipurpose Cleaner',
    category: 'General Care',
    image: '/images/products/multipurpose-cleaner.webp',
    shortDescription: 'All-round cleaner for floors, walls, steel taps, and household items.',
    use: 'Surface cleaning across floors, walls, steel taps, counters, and household items.',
    suitableFor: ['Floors & walls', 'Steel taps & steel items'],
    packs: [
      {
        size: '1 L',
        offerPrice: 119,
        price: 119,
        referencePrice: 139,
        referenceType: 'promotional-comparison',
        savingsAmount: 20,
        discountLabel: 'Save ₹20'
      },
      {
        size: '5 L',
        offerPrice: 579,
        price: 579,
        referencePrice: 695,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 116,
        discountLabel: 'Save ₹116',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹116 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 1159,
        price: 1159,
        referencePrice: 1390,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 231,
        discountLabel: 'Save ₹231',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹231 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'dishwash',
    name: 'Dishwash Liquid',
    category: 'Kitchen Care',
    image: '/images/products/dishwash.webp',
    shortDescription: 'Concentrated grease-cutting dishwashing liquid for utensils and kitchen washing.',
    use: 'Washing steel and plastic utensils, cookware, plates, and kitchen items.',
    suitableFor: ['Steel & plastic utensils', 'Kitchen washing'],
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
        referencePrice: 179,
        referenceType: 'promotional-comparison',
        savingsAmount: 30,
        discountLabel: 'Save ₹30'
      },
      {
        size: '5 L',
        offerPrice: 725,
        price: 725,
        referencePrice: 895,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 170,
        discountLabel: 'Save ₹170',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹170 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 1459,
        price: 1459,
        referencePrice: 1790,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 331,
        discountLabel: 'Save ₹331',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹331 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'detergent',
    name: 'Detergent',
    category: 'Laundry Care',
    image: '/images/products/detergent.webp',
    shortDescription: 'High-efficiency detergent for clean clothes, carpets, linens, and laundry.',
    use: 'Machine and bucket washing of daily clothes, fabrics, and carpets.',
    suitableFor: ['Clothes', 'Carpets'],
    packs: [
      {
        size: '1 L',
        offerPrice: 119,
        price: 119,
        referencePrice: 139,
        referenceType: 'promotional-comparison',
        savingsAmount: 20,
        discountLabel: 'Save ₹20'
      },
      {
        size: '5 L',
        offerPrice: 579,
        price: 579,
        referencePrice: 695,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 116,
        discountLabel: 'Save ₹116',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹116 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 1159,
        price: 1159,
        referencePrice: 1390,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 231,
        discountLabel: 'Save ₹231',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹231 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'tile-cleaner',
    name: 'Tile Cleaner',
    category: 'Bathroom Care',
    image: '/images/products/tile-cleaner.webp',
    shortDescription: 'Targeted cleaner for ceramic tiles and bathroom/floor tile surfaces.',
    use: 'Cleaning ceramic tiles and bathroom/floor tile surfaces.',
    suitableFor: ['Ceramic tiles', 'Bathroom & floor tiles'],
    packs: [
      {
        size: '1 L',
        offerPrice: 99,
        price: 99,
        referencePrice: 119,
        referenceType: 'promotional-comparison',
        savingsAmount: 20,
        discountLabel: 'Save ₹20'
      },
      {
        size: '5 L',
        offerPrice: 479,
        price: 479,
        referencePrice: 595,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 116,
        discountLabel: 'Save ₹116',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹116 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 959,
        price: 959,
        referencePrice: 1190,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 231,
        discountLabel: 'Save ₹231',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹231 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'hand-wash',
    name: 'Hand Wash',
    category: 'Bathroom Care',
    image: '/images/products/hand-wash-5l.webp',
    shortDescription: 'Gentle moisturizing liquid hand wash for hands and washroom areas.',
    use: 'Hand hygiene for homes, offices, restaurants, and washroom counters.',
    suitableFor: ['Hands', 'Washroom areas'],
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
        referencePrice: 179,
        referenceType: 'promotional-comparison',
        savingsAmount: 30,
        discountLabel: 'Save ₹30'
      },
      {
        size: '5 L',
        offerPrice: 725,
        price: 725,
        referencePrice: 895,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 170,
        discountLabel: 'Save ₹170',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹170 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 1459,
        price: 1459,
        referencePrice: 1790,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 331,
        discountLabel: 'Save ₹331',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹331 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'soap-oil',
    name: 'Soap Oil',
    category: 'General Care',
    image: '/images/products/soap-oil-5l.webp',
    shortDescription: 'Liquid soap concentrate for washing walls and wiping cupboards.',
    use: 'Cleaning washable walls, cupboards, laminates, and general surfaces.',
    suitableFor: ['Walls', 'Cupboards'],
    packs: [
      {
        size: '1 L',
        offerPrice: 99,
        price: 99,
        referencePrice: 119,
        referenceType: 'promotional-comparison',
        savingsAmount: 20,
        discountLabel: 'Save ₹20'
      },
      {
        size: '5 L',
        offerPrice: 479,
        price: 479,
        referencePrice: 595,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 116,
        discountLabel: 'Save ₹116',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹116 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 959,
        price: 959,
        referencePrice: 1190,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 231,
        discountLabel: 'Save ₹231',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹231 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'room-freshener',
    name: 'Room Freshener',
    category: 'Fresheners',
    image: '/images/products/room-freshener-5l.webp',
    shortDescription: 'Long-lasting ambient fragrance for homes, hospitals, lodges, and hotel rooms.',
    use: 'Deodorizing living spaces in homes, hospitals, and hotel rooms.',
    suitableFor: ['Homes & hospitals', 'Lodges & hotels'],
    packs: [
      {
        size: '1 L',
        offerPrice: 109,
        price: 109,
        referencePrice: 129,
        referenceType: 'promotional-comparison',
        savingsAmount: 20,
        discountLabel: 'Save ₹20'
      },
      {
        size: '5 L',
        offerPrice: 529,
        price: 529,
        referencePrice: 645,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 116,
        discountLabel: 'Save ₹116',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹116 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 1059,
        price: 1059,
        referencePrice: 1290,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 231,
        discountLabel: 'Save ₹231',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹231 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'blue-harpic',
    name: 'Blue Harpic',
    category: 'Bathroom Care',
    image: '/images/products/blue-harpic-5l.webp',
    shortDescription: 'Specialized toilet cleaner for toilet bowls and bathroom sanitation.',
    use: 'Cleaning toilet bowls and regular bathroom sanitation.',
    suitableFor: ['Toilet bowls', 'Bathroom sanitation'],
    packs: [
      {
        size: '500 ml',
        offerPrice: 69,
        price: 69,
        referencePrice: 89,
        referenceType: 'promotional-comparison',
        savingsAmount: 20,
        discountLabel: 'Save ₹20'
      },
      {
        size: '1 L',
        offerPrice: 129,
        price: 129,
        referencePrice: 159,
        referenceType: 'promotional-comparison',
        savingsAmount: 30,
        discountLabel: 'Save ₹30'
      },
      {
        size: '5 L',
        offerPrice: 625,
        price: 625,
        referencePrice: 795,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 170,
        discountLabel: 'Save ₹170',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹170 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 1259,
        price: 1259,
        referencePrice: 1590,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 331,
        discountLabel: 'Save ₹331',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹331 vs regular price'
      }
    ],
    orderEnabled: true
  },
  {
    id: 'colin',
    name: 'Colin',
    category: 'Glass Care',
    image: '/images/products/colin.webp',
    shortDescription: 'Glass and surface cleaner for streak-free mirrors and glass surfaces.',
    use: 'Cleaning dressing mirrors, glass windows, tabletops, and glossy fixtures.',
    suitableFor: ['Mirrors', 'Glass surfaces'],
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
        referencePrice: 179,
        referenceType: 'promotional-comparison',
        savingsAmount: 30,
        discountLabel: 'Save ₹30'
      },
      {
        size: '5 L',
        offerPrice: 725,
        price: 725,
        referencePrice: 895,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 170,
        discountLabel: 'Save ₹170',
        bulkLabel: '5L Bulk Saver',
        isBulkPack: true,
        note: 'Save ₹170 vs regular price'
      },
      {
        size: '10 L',
        offerPrice: 1459,
        price: 1459,
        referencePrice: 1790,
        referenceType: 'regular-pack-comparison',
        savingsAmount: 331,
        discountLabel: 'Save ₹331',
        bulkLabel: '10L Can',
        isBulkPack: true,
        note: 'Save ₹331 vs regular price'
      }
    ],
    orderEnabled: true
  }
];
