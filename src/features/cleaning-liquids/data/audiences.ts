import type { WholesaleAudience } from '../types/product.types';

export const WHOLESALE_AUDIENCES: WholesaleAudience[] = [
  {
    id: 'apartments',
    title: 'Apartments & Residential Societies',
    icon: 'Building',
    description: 'Bulk cans for clubhouse maintenance, corridor mopping, lobby sanitization, and common area upkeep.',
    recommendedPacks: '5L Bulk Cans (Monthly Schedule)',
    popularProducts: ['Phenyl (Floor Wash)', 'Floor Cleaner', 'Blue Harpic']
  },
  {
    id: 'hotels',
    title: 'Hotels & Guest Houses',
    icon: 'Home',
    description: 'Reliable bulk supply for daily guest room housekeeping, bathroom sanitation, mirror polishing, and linen care.',
    recommendedPacks: '5L Bulk Cans & Case Quantities',
    popularProducts: ['Glass Cleaner', 'Blue Harpic', 'Detergent']
  },
  {
    id: 'offices',
    title: 'Offices & Corporate Spaces',
    icon: 'Briefcase',
    description: 'Surface-safe cleaning solutions for workstations, glass cabins, visitor lounges, pantry sinks, and washrooms.',
    recommendedPacks: '1L & 5L Dispenser Refills',
    popularProducts: ['Multipurpose Cleaner', 'Glass Cleaner', 'Dishwash Liquid']
  },
  {
    id: 'shops',
    title: 'Shops & Supermarkets',
    icon: 'ShoppingBag',
    description: 'High-traffic retail floor care, billing counter wiping, display showcases, and customer restroom hygiene.',
    recommendedPacks: '5L Bulk Cans',
    popularProducts: ['Floor Cleaner', 'Glass Cleaner', 'Phenyl']
  },
  {
    id: 'schools',
    title: 'Schools & Institutions',
    icon: 'GraduationCap',
    description: 'Safe, pleasant floor washing liquids, classroom desk cleaners, and high-capacity restroom descalers.',
    recommendedPacks: '5L Institutional Packaging',
    popularProducts: ['Phenyl', 'Floor Cleaner', 'Toilet Cleaner']
  },
  {
    id: 'contractors',
    title: 'Cleaning Contractors / Housekeeping Teams',
    icon: 'Sparkles',
    description: 'Direct-from-supplier bulk supply for professional deep cleaning, post-construction cleanup, and facility management.',
    recommendedPacks: 'Custom Bulk Order Slabs',
    popularProducts: ['Heavy-Duty Tile Cleaner', 'Floor Cleaner', 'Multipurpose Cleaner']
  }
];
