export type ServiceCategory = 'residential' | 'specialized' | 'commercial';

export type PriceModel =
  | { kind: 'fixed'; amount: number }
  | { kind: 'from'; amount: number }
  | { kind: 'per-unit'; min: number; max?: number; unit: 'sq.ft' | 'window' | 'fan' }
  | { kind: 'tiers'; tiers: { label: string; amount: number }[] }
  | { kind: 'inspection' };

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  name: string; // Alias for title
  category: ServiceCategory;
  icon: string; // Lucide icon key
  shortDescription: string;
  shortDesc: string; // Compatibility alias
  whatsIncluded: string[];
  inclusions: string[]; // Compatibility alias
  enabled: boolean;
  price: PriceModel;
  unitLabel?: string;
  image?: string;
  imageSource?: 'illustrative' | 'real';
  faqs?: { q: string; a: string }[];
}

export const formatAmount = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatPrice = (model: PriceModel): string => {
  switch (model.kind) {
    case 'fixed':
      return formatAmount(model.amount);
    case 'from':
      return `from ${formatAmount(model.amount)}`;
    case 'per-unit':
      if (model.max !== undefined && model.max !== model.min) {
        return `${formatAmount(model.min)}–${formatAmount(model.max)} / ${model.unit}`;
      }
      return `${formatAmount(model.min)} / ${model.unit}`;
    case 'tiers':
      return `from ${formatAmount(model.tiers[0]?.amount || 0)}`;
    case 'inspection':
      return 'Site inspection';
  }
};

export const SERVICES_DATA: ServiceItem[] = [
  // ==========================================
  // Category: Residential (10 services)
  // ==========================================
  {
    id: 'bhk-deep-cleaning',
    slug: 'bhk-deep-cleaning',
    title: 'BHK Deep Cleaning',
    name: 'BHK Deep Cleaning',
    category: 'residential',
    icon: 'Home',
    shortDescription: 'Comprehensive interior deep cleaning tailored by apartment size for homes in Tirupati.',
    shortDesc: 'Comprehensive interior deep cleaning tailored by apartment size for homes in Tirupati.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Living room, bedroom, and dining area floor scrubbing and dust removal',
      'Kitchen countertop degreasing, sink wash, and exterior cabinet wipe-down',
      'Bathroom tile scrubbing, commode cleaning, and chrome fitting wash',
      'Window glass cleaning, track dusting, and grille wiping',
      'Ceiling fan wiping, switchboard cleaning, and doorway dust removal'
    ],
    inclusions: [
      'Living room, bedroom, and dining area floor scrubbing and dust removal',
      'Kitchen countertop degreasing, sink wash, and exterior cabinet wipe-down',
      'Bathroom tile scrubbing, commode cleaning, and chrome fitting wash',
      'Window glass cleaning, track dusting, and grille wiping',
      'Ceiling fan wiping, switchboard cleaning, and doorway dust removal'
    ],
    enabled: true,
    price: {
      kind: 'tiers',
      tiers: [
        { label: '1 BHK', amount: 5000 },
        { label: '2 BHK', amount: 7000 },
        { label: '3 BHK', amount: 9000 },
        { label: '4 BHK', amount: 12000 }
      ]
    },
    image: '/images/services/bhk-deep-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'villa-deep-cleaning',
    slug: 'villa-deep-cleaning',
    title: 'Villa Deep Cleaning',
    name: 'Villa Deep Cleaning',
    category: 'residential',
    icon: 'Building2',
    shortDescription: 'Full-property deep cleaning for independent houses, duplexes, and multi-storey villas.',
    shortDesc: 'Full-property deep cleaning for independent houses, duplexes, and multi-storey villas.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Complete multi-level floor scrubbing and edge cleaning',
      'All bathrooms, master suites, and guest rooms detailed',
      'Kitchen and utility area deep washing and surface degreasing',
      'Staircase railings, balconies, and terrace floor cleaning',
      'Windows, grilles, and exterior access doors washed'
    ],
    inclusions: [
      'Complete multi-level floor scrubbing and edge cleaning',
      'All bathrooms, master suites, and guest rooms detailed',
      'Kitchen and utility area deep washing and surface degreasing',
      'Staircase railings, balconies, and terrace floor cleaning',
      'Windows, grilles, and exterior access doors washed'
    ],
    enabled: true,
    price: { kind: 'from', amount: 10000 },
    image: '/images/services/villa-deep-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'full-home-deep-cleaning-package',
    slug: 'full-home-deep-cleaning-package',
    title: 'Full Home Deep Cleaning Package',
    name: 'Full Home Deep Cleaning Package',
    category: 'residential',
    icon: 'Sparkles',
    shortDescription: 'All-inclusive deep cleaning covering floors, kitchen, bathrooms, fixtures, and balconies.',
    shortDesc: 'All-inclusive deep cleaning covering floors, kitchen, bathrooms, fixtures, and balconies.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Thorough floor washing across all bedrooms and living spaces',
      'Complete kitchen deep clean including slabs, sink, and tiles',
      'Intensive bathroom descaling and sanitaryware cleaning',
      'Balcony floor washing and drain clearance',
      'Light fixtures, ceiling fans, and switchboards dry dusted'
    ],
    inclusions: [
      'Thorough floor washing across all bedrooms and living spaces',
      'Complete kitchen deep clean including slabs, sink, and tiles',
      'Intensive bathroom descaling and sanitaryware cleaning',
      'Balcony floor washing and drain clearance',
      'Light fixtures, ceiling fans, and switchboards dry dusted'
    ],
    enabled: true,
    price: { kind: 'from', amount: 7000 },
    image: '/images/services/full-home-deep-cleaning-package.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'move-in-cleaning',
    slug: 'move-in-cleaning',
    title: 'Move-In Cleaning',
    name: 'Move-In Cleaning',
    category: 'residential',
    icon: 'DoorOpen',
    shortDescription: 'Sanitizing and preparing vacant houses or flats before moving your family in.',
    shortDesc: 'Sanitizing and preparing vacant houses or flats before moving your family in.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Interior cabinet, wardrobe, and shelf vacuuming and wiping',
      'Complete bathroom disinfection and descaling',
      'Kitchen storage area wipe-down and degreasing',
      'Floor wash and dust extraction across all rooms',
      'Window channel vacuuming and surface wipe-down'
    ],
    inclusions: [
      'Interior cabinet, wardrobe, and shelf vacuuming and wiping',
      'Complete bathroom disinfection and descaling',
      'Kitchen storage area wipe-down and degreasing',
      'Floor wash and dust extraction across all rooms',
      'Window channel vacuuming and surface wipe-down'
    ],
    enabled: true,
    price: { kind: 'from', amount: 8000 },
    image: '/images/services/move-in-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'move-out-cleaning',
    slug: 'move-out-cleaning',
    title: 'Move-Out Cleaning',
    name: 'Move-Out Cleaning',
    category: 'residential',
    icon: 'LogOut',
    shortDescription: 'Thorough cleaning of vacated properties for tenancy handover and deposit clearance.',
    shortDesc: 'Thorough cleaning of vacated properties for tenancy handover and deposit clearance.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Complete property dust removal and sweeping',
      'Kitchen grease and oil stain cleaning',
      'Bathroom scale clearing and tile scrubbing',
      'Floor wash across living, dining, and bedrooms',
      'Balcony and utility area wash'
    ],
    inclusions: [
      'Complete property dust removal and sweeping',
      'Kitchen grease and oil stain cleaning',
      'Bathroom scale clearing and tile scrubbing',
      'Floor wash across living, dining, and bedrooms',
      'Balcony and utility area wash'
    ],
    enabled: true,
    price: { kind: 'from', amount: 8000 },
    image: '/images/services/move-out-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'kitchen-deep-cleaning',
    slug: 'kitchen-deep-cleaning',
    title: 'Kitchen Deep Cleaning',
    name: 'Kitchen Deep Cleaning',
    category: 'residential',
    icon: 'UtensilsCrossed',
    shortDescription: 'Targeted degreasing for kitchen slabs, tiles, sink, chimney exterior, and exhaust areas.',
    shortDesc: 'Targeted degreasing for kitchen slabs, tiles, sink, chimney exterior, and exhaust areas.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Kitchen platform, granite counter, and tile backsplash degreasing',
      'Exhaust fan and chimney exterior surface wipe-down',
      'Stainless steel sink wash and tap descaling',
      'External cabinet and drawer facade wiping',
      'Kitchen floor scrubbing and grease removal'
    ],
    inclusions: [
      'Kitchen platform, granite counter, and tile backsplash degreasing',
      'Exhaust fan and chimney exterior surface wipe-down',
      'Stainless steel sink wash and tap descaling',
      'External cabinet and drawer facade wiping',
      'Kitchen floor scrubbing and grease removal'
    ],
    enabled: true,
    price: { kind: 'fixed', amount: 1500 },
    image: '/images/services/kitchen-deep-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'bathroom-deep-cleaning',
    slug: 'bathroom-deep-cleaning',
    title: 'Bathroom Deep Cleaning',
    name: 'Bathroom Deep Cleaning',
    category: 'residential',
    icon: 'Bath',
    shortDescription: 'Hard water scale clearing, tile scrubbing, and fixture cleaning for bathrooms.',
    shortDesc: 'Hard water scale clearing, tile scrubbing, and fixture cleaning for bathrooms.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Wall tile scrubbing and floor tile scale clearing',
      'Toilet bowl, commode exterior, and seat sanitization',
      'Washbasin, mirror, and tap mineral deposit wiping',
      'Shower area and glass partition wiping',
      'Drain clearing and exhaust vent dusting'
    ],
    inclusions: [
      'Wall tile scrubbing and floor tile scale clearing',
      'Toilet bowl, commode exterior, and seat sanitization',
      'Washbasin, mirror, and tap mineral deposit wiping',
      'Shower area and glass partition wiping',
      'Drain clearing and exhaust vent dusting'
    ],
    enabled: true,
    price: { kind: 'fixed', amount: 600 },
    image: '/images/services/bathroom-deep-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'sofa-cleaning',
    slug: 'sofa-cleaning',
    title: 'Sofa Cleaning',
    name: 'Sofa Cleaning',
    category: 'residential',
    icon: 'Sofa',
    shortDescription: 'Fabric and leatherette sofa shampooing, dry vacuuming, and stain spot treatment.',
    shortDesc: 'Fabric and leatherette sofa shampooing, dry vacuuming, and stain spot treatment.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Dry vacuuming of fabric seams, cushions, and crevices',
      'Foam shampoo application for surface dirt loosening',
      'Extraction of dissolved grime and moisture',
      'Armrest and backrest spot cleaning',
      'Leatherette or wooden frame surface wiping'
    ],
    inclusions: [
      'Dry vacuuming of fabric seams, cushions, and crevices',
      'Foam shampoo application for surface dirt loosening',
      'Extraction of dissolved grime and moisture',
      'Armrest and backrest spot cleaning',
      'Leatherette or wooden frame surface wiping'
    ],
    enabled: true,
    price: { kind: 'from', amount: 600 },
    image: '/images/services/sofa-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'mattress-cleaning',
    slug: 'mattress-cleaning',
    title: 'Mattress Cleaning',
    name: 'Mattress Cleaning',
    category: 'residential',
    icon: 'BedDouble',
    shortDescription: 'Deep dry vacuuming, dust mite removal, and surface shampooing for sleeping mattresses.',
    shortDesc: 'Deep dry vacuuming, dust mite removal, and surface shampooing for sleeping mattresses.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Two-sided high-suction dry vacuuming',
      'Dust mite extraction and surface allergen removal',
      'Targeted fabric shampooing for light stains',
      'Edge piping and quilting seam dusting'
    ],
    inclusions: [
      'Two-sided high-suction dry vacuuming',
      'Dust mite extraction and surface allergen removal',
      'Targeted fabric shampooing for light stains',
      'Edge piping and quilting seam dusting'
    ],
    enabled: true,
    price: { kind: 'from', amount: 700 },
    image: '/images/services/mattress-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'carpet-cleaning',
    slug: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    name: 'Carpet Cleaning',
    category: 'residential',
    icon: 'Layers',
    shortDescription: 'Deep shampooing, pile vacuuming, and dirt extraction for living room carpets and rugs.',
    shortDesc: 'Deep shampooing, pile vacuuming, and dirt extraction for living room carpets and rugs.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'High-filtration dry vacuuming of carpet fibers',
      'Fabric shampoo application and gentle scrubbing',
      'Moisture and dirt extraction',
      'Edge fringe dusting and odor freshening'
    ],
    inclusions: [
      'High-filtration dry vacuuming of carpet fibers',
      'Fabric shampoo application and gentle scrubbing',
      'Moisture and dirt extraction',
      'Edge fringe dusting and odor freshening'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 8, unit: 'sq.ft' },
    unitLabel: 'sq.ft',
    image: '/images/services/carpet-cleaning.webp',
    imageSource: 'illustrative'
  },

  // ==========================================
  // Category: Specialized (6 services)
  // ==========================================
  {
    id: 'floor-deep-cleaning',
    slug: 'floor-deep-cleaning',
    title: 'Floor Deep Cleaning',
    name: 'Floor Deep Cleaning',
    category: 'specialized',
    icon: 'Grid3X3',
    shortDescription: 'Rotary scrubbing for vitrified, ceramic, marble, granite, and tile flooring.',
    shortDesc: 'Rotary scrubbing for vitrified, ceramic, marble, granite, and tile flooring.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Mechanical single-disc scrubbing across open floor areas',
      'Tile joint and grout line agitation',
      'Slurry suction and moisture extraction',
      'Skirting board wiping and corner detailing'
    ],
    inclusions: [
      'Mechanical single-disc scrubbing across open floor areas',
      'Tile joint and grout line agitation',
      'Slurry suction and moisture extraction',
      'Skirting board wiping and corner detailing'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 6, unit: 'sq.ft' },
    unitLabel: 'sq.ft',
    image: '/images/services/floor-deep-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'water-tank-cleaning',
    slug: 'water-tank-cleaning',
    title: 'Water Tank Cleaning',
    name: 'Water Tank Cleaning',
    category: 'specialized',
    icon: 'Droplets',
    shortDescription: 'De-sludging, high-pressure washing, and wall scrubbing for overhead and underground tanks.',
    shortDesc: 'De-sludging, high-pressure washing, and wall scrubbing for overhead and underground tanks.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Draining remaining water and manual de-sludging',
      'High-pressure water washing of tank walls and floor',
      'Manual scrubbing of algae and sediment layers',
      'Slurry vacuuming and final rinse'
    ],
    inclusions: [
      'Draining remaining water and manual de-sludging',
      'High-pressure water washing of tank walls and floor',
      'Manual scrubbing of algae and sediment layers',
      'Slurry vacuuming and final rinse'
    ],
    enabled: true,
    price: { kind: 'from', amount: 1000 },
    image: '/images/services/water-tank-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'post-construction-cleaning',
    slug: 'post-construction-cleaning',
    title: 'Post-Construction Cleaning',
    name: 'Post-Construction Cleaning',
    category: 'specialized',
    icon: 'HardHat',
    shortDescription: 'Removal of paint splatter, fine cement dust, adhesive residues, and debris after renovation.',
    shortDesc: 'Removal of paint splatter, fine cement dust, adhesive residues, and debris after renovation.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Floor paint and plaster residue careful scraping',
      'Fine drywall and cement dust extraction from floors and ledges',
      'Window frame, glass, and sliding track detailing',
      'Switchboards, fixtures, and hardware wiping',
      'Final mechanical floor wash'
    ],
    inclusions: [
      'Floor paint and plaster residue careful scraping',
      'Fine drywall and cement dust extraction from floors and ledges',
      'Window frame, glass, and sliding track detailing',
      'Switchboards, fixtures, and hardware wiping',
      'Final mechanical floor wash'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 10, unit: 'sq.ft' },
    unitLabel: 'sq.ft',
    image: '/images/services/post-construction-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'window-cleaning',
    slug: 'window-cleaning',
    title: 'Window Cleaning',
    name: 'Window Cleaning',
    category: 'specialized',
    icon: 'AppWindow',
    shortDescription: 'Wiping of glass panes, sliding track vacuuming, and iron grille dusting.',
    shortDesc: 'Wiping of glass panes, sliding track vacuuming, and iron grille dusting.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Sliding track vacuuming and dirt removal',
      'Interior and reachable exterior glass panel wiping',
      'Window sill, frame, and mosquito mesh dusting',
      'Safety grille wipe-down'
    ],
    inclusions: [
      'Sliding track vacuuming and dirt removal',
      'Interior and reachable exterior glass panel wiping',
      'Window sill, frame, and mosquito mesh dusting',
      'Safety grille wipe-down'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 150, unit: 'window' },
    unitLabel: 'window',
    image: '/images/services/window-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'glass-cleaning',
    slug: 'glass-cleaning',
    title: 'Glass Cleaning',
    name: 'Glass Cleaning',
    category: 'specialized',
    icon: 'Scan',
    shortDescription: 'Streak-free cleaning for partition glass, mirrors, showcase panels, and glass doors.',
    shortDesc: 'Streak-free cleaning for partition glass, mirrors, showcase panels, and glass doors.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Glass surface dusting and spot wiping',
      'Squeegee cleaning for streak-free finish',
      'Frame edge and handle cleaning'
    ],
    inclusions: [
      'Glass surface dusting and spot wiping',
      'Squeegee cleaning for streak-free finish',
      'Frame edge and handle cleaning'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 100, unit: 'window' },
    unitLabel: 'window',
    image: '/images/services/glass-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'fan-cleaning',
    slug: 'fan-cleaning',
    title: 'Fan Cleaning',
    name: 'Fan Cleaning',
    category: 'specialized',
    icon: 'Fan',
    shortDescription: 'Blade degreasing, motor canopy dusting, and wipe-down for ceiling and exhaust fans.',
    shortDesc: 'Blade degreasing, motor canopy dusting, and wipe-down for ceiling and exhaust fans.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Dry dusting of fan blades and motor housing',
      'Wet wipe degreasing for sticky dust buildup',
      'Rod and canopy cleaning',
      'Drop cloth protection for furniture underneath'
    ],
    inclusions: [
      'Dry dusting of fan blades and motor housing',
      'Wet wipe degreasing for sticky dust buildup',
      'Rod and canopy cleaning',
      'Drop cloth protection for furniture underneath'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 125, unit: 'fan' },
    unitLabel: 'fan',
    image: '/images/services/fan-cleaning.webp',
    imageSource: 'illustrative'
  },

  // ==========================================
  // Category: Commercial (5 services)
  // ==========================================
  {
    id: 'office-deep-cleaning',
    slug: 'office-deep-cleaning',
    title: 'Office Deep Cleaning',
    name: 'Office Deep Cleaning',
    category: 'commercial',
    icon: 'Briefcase',
    shortDescription: 'Deep cleaning for corporate workspaces, cabins, meeting rooms, and office floors.',
    shortDesc: 'Deep cleaning for corporate workspaces, cabins, meeting rooms, and office floors.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Workstation desk wiping and seat surface dust removal',
      'Rotary machine floor scrubbing across circulation areas',
      'Conference room and reception area detailing',
      'Office washroom and pantry area deep wash',
      'Glass partition wiping and entryway cleaning'
    ],
    inclusions: [
      'Workstation desk wiping and seat surface dust removal',
      'Rotary machine floor scrubbing across circulation areas',
      'Conference room and reception area detailing',
      'Office washroom and pantry area deep wash',
      'Glass partition wiping and entryway cleaning'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 6, unit: 'sq.ft' },
    unitLabel: 'sq.ft',
    image: '/images/services/office-deep-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'shop-cleaning',
    slug: 'shop-cleaning',
    title: 'Shop Cleaning',
    name: 'Shop Cleaning',
    category: 'commercial',
    icon: 'Store',
    shortDescription: 'Floor scrubbing, glass facade cleaning, and shelf dusting for retail shops and showrooms.',
    shortDesc: 'Floor scrubbing, glass facade cleaning, and shelf dusting for retail shops and showrooms.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Retail floor mechanical scrubbing',
      'Frontage display glass and entrance wiping',
      'Countertop and accessible display ledge dusting',
      'Storage or trial room floor wash',
      'Signboard and shutter perimeter dusting'
    ],
    inclusions: [
      'Retail floor mechanical scrubbing',
      'Frontage display glass and entrance wiping',
      'Countertop and accessible display ledge dusting',
      'Storage or trial room floor wash',
      'Signboard and shutter perimeter dusting'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 5, unit: 'sq.ft' },
    unitLabel: 'sq.ft',
    image: '/images/services/shop-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'school-classroom-cleaning',
    slug: 'school-classroom-cleaning',
    title: 'School / Classroom Cleaning',
    name: 'School / Classroom Cleaning',
    category: 'commercial',
    icon: 'GraduationCap',
    shortDescription: 'Sanitizing classrooms, desks, benches, corridors, and school restrooms.',
    shortDesc: 'Sanitizing classrooms, desks, benches, corridors, and school restrooms.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Classroom floor scrubbing and hallway washing',
      'Student bench and desk wipe-down',
      'Blackboard / whiteboard perimeter and ledge dusting',
      'Student washroom intensive sanitization',
      'Window sill and doorway wiping'
    ],
    inclusions: [
      'Classroom floor scrubbing and hallway washing',
      'Student bench and desk wipe-down',
      'Blackboard / whiteboard perimeter and ledge dusting',
      'Student washroom intensive sanitization',
      'Window sill and doorway wiping'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 5, max: 7, unit: 'sq.ft' },
    unitLabel: 'sq.ft',
    image: '/images/services/school-classroom-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'hotel-guest-house-cleaning',
    slug: 'hotel-guest-house-cleaning',
    title: 'Hotel / Guest House Cleaning',
    name: 'Hotel / Guest House Cleaning',
    category: 'commercial',
    icon: 'Hotel',
    shortDescription: 'Turnover and periodic deep cleaning for guest rooms, pilgrim lodges, and dormitories in Tirupati.',
    shortDesc: 'Turnover and periodic deep cleaning for guest rooms, pilgrim lodges, and dormitories in Tirupati.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Guest room floor scrubbing and dusting',
      'Attached bathroom descaling and commode disinfection',
      'Mattress vacuuming and headboard wiping',
      'Lobby, staircase, and corridor washing',
      'Window and door frame cleaning'
    ],
    inclusions: [
      'Guest room floor scrubbing and dusting',
      'Attached bathroom descaling and commode disinfection',
      'Mattress vacuuming and headboard wiping',
      'Lobby, staircase, and corridor washing',
      'Window and door frame cleaning'
    ],
    enabled: true,
    price: { kind: 'inspection' },
    image: '/images/services/hotel-guest-house-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'commercial-cleaning',
    slug: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    name: 'Commercial Cleaning',
    category: 'commercial',
    icon: 'Building',
    shortDescription: 'Tailored contract and one-time deep cleaning for clinics, banks, function halls, and institutions.',
    shortDesc: 'Tailored contract and one-time deep cleaning for clinics, banks, function halls, and institutions.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Custom site assessment and mechanized floor cleaning',
      'Public area and waiting lounge sanitization',
      'Restroom block deep scrubbing and sanitizing',
      'Glass entrance and reception detailing',
      'Waste clearance and perimeter wash'
    ],
    inclusions: [
      'Custom site assessment and mechanized floor cleaning',
      'Public area and waiting lounge sanitization',
      'Restroom block deep scrubbing and sanitizing',
      'Glass entrance and reception detailing',
      'Waste clearance and perimeter wash'
    ],
    enabled: true,
    price: { kind: 'inspection' },
    image: '/images/services/commercial-cleaning.webp',
    imageSource: 'illustrative'
  }
];

export const getEnabledServices = (): ServiceItem[] => {
  return SERVICES_DATA.filter((service) => service.enabled);
};

export const getServicesByCategory = (category: ServiceCategory): ServiceItem[] => {
  return SERVICES_DATA.filter((service) => service.enabled && service.category === category);
};

export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  return SERVICES_DATA.find((service) => service.slug === slug);
};
