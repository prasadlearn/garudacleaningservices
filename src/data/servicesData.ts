export type ServiceCategory = 'residential' | 'specialized' | 'commercial';

export type PriceModel =
  | { kind: 'fixed'; amount: number }
  | { kind: 'from'; amount: number }
  | { kind: 'per-unit'; min: number; max?: number; unit: 'sq.ft' | 'window' | 'fan' | 'seat' | 'panel' }
  | { kind: 'tiers'; tiers: { label: string; amount: number | null }[] }
  | { kind: 'inspection' }
  | { kind: 'quote' };

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

export const formatAmount = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) {
    return 'Contact for Price';
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatPrice = (model: PriceModel): string => {
  switch (model.kind) {
    case 'fixed':
      return formatAmount(model.amount);
    case 'from':
      return `From ${formatAmount(model.amount)}`;
    case 'per-unit':
      if (model.unit === 'sq.ft') {
        if (model.max !== undefined && model.max !== model.min) {
          return `${formatAmount(model.min)}–${formatAmount(model.max)}/sq.ft`;
        }
        return `${formatAmount(model.min)}/sq.ft`;
      }
      if (model.max !== undefined && model.max !== model.min) {
        return `${formatAmount(model.min)}–${formatAmount(model.max)} / ${model.unit}`;
      }
      return `${formatAmount(model.min)} / ${model.unit}`;
    case 'tiers': {
      const validTier = model.tiers.find(t => t.amount !== null && t.amount !== undefined && t.amount > 0);
      if (validTier && validTier.amount) {
        return `From ${formatAmount(validTier.amount)}`;
      }
      return 'Get a Quote';
    }
    case 'inspection':
      return 'On-Site Inspection';
    case 'quote':
      return 'Contact for Price';
  }
};

export const getServiceHighlights = (service: ServiceItem): string[] => {
  switch (service.slug) {
    case 'home-cleaning':
    case 'bhk-deep-cleaning':
      return ['Floor Machine Scrubbing', 'Kitchen & Washrooms', 'Fans & Windows'];
    case 'villa-cleaning':
    case 'villa-deep-cleaning':
      return ['All Floors & Rooms', 'Washrooms & Balconies', 'Fans & Windows'];
    case 'move-in-out-cleaning':
    case 'move-in-cleaning':
    case 'move-out-cleaning':
      return ['Cupboards & Shelves', 'Washrooms Sanitized', 'Move-In Ready'];
    case 'kitchen-cleaning':
    case 'kitchen-deep-cleaning':
      return ['Platform & Tiles', 'Chimney & Exhaust', 'Oil Stain Removal'];
    case 'washroom-cleaning':
    case 'bathroom-deep-cleaning':
      return ['Hard Water Scale', 'Taps & Commode', 'Tile Descaling'];
    case 'sofa-cleaning':
      return ['Foam Shampooing', 'Dust Extraction', 'Stain Removal'];
    case 'mattress-cleaning':
      return ['Dust Mite Extraction', 'Stain Removal', 'Allergen Refresh'];
    case 'carpet-cleaning':
      return ['Foam Wash', 'Dirt Extraction', 'Fabric Care'];
    case 'fridge-cleaning':
      return ['Tray Sanitization', 'Odor Removal', 'Gasket Cleaning'];
    case 'pest-control':
      return ['Odorless Gel & Spray', 'Cockroach & Ant Control', 'Child & Pet Safe'];
    case 'water-tank-cleaning':
      return ['Overhead & Sump', 'Pressure Jet Wash', 'Antibacterial Rinse'];
    case 'post-construction-cleaning':
      return ['Paint & Cement Scraping', 'Dust Extraction', 'Floor Buffing'];
    case 'window-cleaning':
      return ['Streak-Free Glass', 'Track Vacuuming', 'Grille Wiping'];
    case 'glass-cleaning':
      return ['Streak-Free Shine', 'Frame Detailing', 'Spotless Glass'];
    case 'fan-cleaning':
      return ['Blade Degreasing', 'Motor Dusting', 'Sparkling Clean'];
    case 'office-cleaning':
    case 'office-deep-cleaning':
      return ['Desk Wipe-Down', 'Floor Scrubbing', 'Glass Partitions'];
    case 'shop-cleaning':
      return ['Showroom Floors', 'Glass Facade', 'Display Dusting'];
    case 'school-classroom-cleaning':
      return ['Desk & Bench Wash', 'Classroom Floors', 'Sanitized Space'];
    case 'hotel-guest-house-cleaning':
      return ['Room Cleaning', 'Linens & Floors', 'Washroom Shine'];
    default:
      return service.whatsIncluded.slice(0, 3).map((item) => item.split(',')[0]);
  }
};

export const SLUG_REDIRECT_MAP: Record<string, string> = {
  'bhk-deep-cleaning': 'home-cleaning',
  'villa-deep-cleaning': 'villa-cleaning',
  'full-home-deep-cleaning-package': 'home-cleaning',
  'kitchen-deep-cleaning': 'kitchen-cleaning',
  'bathroom-deep-cleaning': 'washroom-cleaning',
  'move-in-cleaning': 'move-in-out-cleaning',
  'move-out-cleaning': 'move-in-out-cleaning',
  'office-deep-cleaning': 'office-cleaning',
  'bed-cleaning': 'mattress-cleaning',
};

export const SERVICES_DATA: ServiceItem[] = [
  // ==========================================
  // Category: Residential (10 services)
  // ==========================================
  {
    id: 'home-cleaning',
    slug: 'home-cleaning',
    title: 'Home Cleaning',
    name: 'Home Cleaning',
    category: 'residential',
    icon: 'Home',
    shortDescription: 'Complete cleaning for all rooms, hall, kitchen, and washrooms in your flat or house.',
    shortDesc: 'Complete cleaning for all rooms, hall, kitchen, and washrooms in your flat or house.',
    whatsIncluded: [
      'Single-disc floor machine scrubbing across living room, bedrooms, and dining area',
      'Kitchen platform degreasing, steel sink wash, and outer cabinet wipe-down',
      'Washroom wall and floor tile descaling, commode sanitization, and tap shine',
      'Window glass cleaning, sliding track vacuuming, and safety grille wiping',
      'Ceiling fan wiping, switchboard cleaning, and door frame dusting'
    ],
    inclusions: [
      'Single-disc floor machine scrubbing across living room, bedrooms, and dining area',
      'Kitchen platform degreasing, steel sink wash, and outer cabinet wipe-down',
      'Washroom wall and floor tile descaling, commode sanitization, and tap shine',
      'Window glass cleaning, sliding track vacuuming, and safety grille wiping',
      'Ceiling fan wiping, switchboard cleaning, and door frame dusting'
    ],
    enabled: true,
    price: {
      kind: 'tiers',
      tiers: [
        { label: '1 BHK', amount: 2399 },
        { label: '2 BHK', amount: 3299 },
        { label: '3 BHK', amount: 4999 }
      ]
    },
    image: '/images/services/home-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'villa-cleaning',
    slug: 'villa-cleaning',
    title: 'Villa Cleaning',
    name: 'Villa Cleaning',
    category: 'residential',
    icon: 'Building2',
    shortDescription: 'Complete cleaning for independent houses, duplexes, and multi-floor villas.',
    shortDesc: 'Complete cleaning for independent houses, duplexes, and multi-floor villas.',
    whatsIncluded: [
      'Machine scrubbing for all room floors, halls, and corridors',
      'All washrooms cleaned, tiles washed, and hard water marks removed',
      'Kitchen platform washing, counter degreasing, and stove grease removal',
      'Staircase railings, balconies, sit-outs, and open terrace washing',
      'Windows, sliding tracks, grilles, ceiling fans, and doors cleaned'
    ],
    inclusions: [
      'Machine scrubbing for all room floors, halls, and corridors',
      'All washrooms cleaned, tiles washed, and hard water marks removed',
      'Kitchen platform washing, counter degreasing, and stove grease removal',
      'Staircase railings, balconies, sit-outs, and open terrace washing',
      'Windows, sliding tracks, grilles, ceiling fans, and doors cleaned'
    ],
    enabled: true,
    price: { kind: 'from', amount: 3000 },
    image: '/images/services/villa-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'move-in-out-cleaning',
    slug: 'move-in-out-cleaning',
    title: 'Move-In / Move-Out Cleaning',
    name: 'Move-In / Move-Out Cleaning',
    category: 'residential',
    icon: 'DoorOpen',
    shortDescription: 'Complete cleaning and sanitizing of vacant flats or houses before moving in or after vacating.',
    shortDesc: 'Complete cleaning and sanitizing of vacant flats or houses before moving in or after vacating.',
    whatsIncluded: [
      'Cupboards, wardrobes, and kitchen shelves cleaned inside and outside',
      'Complete washroom sanitization, tile scrubbing, and commode descaling',
      'Kitchen counter, sink, and storage areas washed and degreased',
      'Floor machine scrubbing and fine dust extraction across all rooms',
      'Window channels vacuumed, glass wiped streak-free, and main door cleaned'
    ],
    inclusions: [
      'Cupboards, wardrobes, and kitchen shelves cleaned inside and outside',
      'Complete washroom sanitization, tile scrubbing, and commode descaling',
      'Kitchen counter, sink, and storage areas washed and degreased',
      'Floor machine scrubbing and fine dust extraction across all rooms',
      'Window channels vacuumed, glass wiped streak-free, and main door cleaned'
    ],
    enabled: true,
    price: { kind: 'fixed', amount: 1499 },
    image: '/images/services/move-in-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'kitchen-cleaning',
    slug: 'kitchen-cleaning',
    title: 'Kitchen Cleaning',
    name: 'Kitchen Cleaning',
    category: 'residential',
    icon: 'UtensilsCrossed',
    shortDescription: 'Removes sticky cooking oil and grease from kitchen slabs, tiles, sink, stove, and chimney.',
    shortDesc: 'Removes sticky cooking oil and grease from kitchen slabs, tiles, sink, stove, and chimney.',
    whatsIncluded: [
      'Kitchen granite platform and wall tiles cleaned with oil degreaser',
      'Exhaust fan blades and chimney mesh exterior wiped clean',
      'Stainless steel sink washed and water marks removed from taps',
      'Outer surfaces of kitchen cabinets and drawers wiped clean',
      'Kitchen floor machine scrubbed to remove sticky oil stains'
    ],
    inclusions: [
      'Kitchen granite platform and wall tiles cleaned with oil degreaser',
      'Exhaust fan blades and chimney mesh exterior wiped clean',
      'Stainless steel sink washed and water marks removed from taps',
      'Outer surfaces of kitchen cabinets and drawers wiped clean',
      'Kitchen floor machine scrubbed to remove sticky oil stains'
    ],
    enabled: true,
    price: { kind: 'fixed', amount: 999 },
    image: '/images/services/kitchen-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'washroom-cleaning',
    slug: 'washroom-cleaning',
    title: 'Washroom Cleaning',
    name: 'Washroom Cleaning',
    category: 'residential',
    icon: 'Bath',
    shortDescription: 'Removes hard water stains (white salt marks), cleans wall tiles, taps, and commode.',
    shortDesc: 'Removes hard water stains (white salt marks), cleans wall tiles, taps, and commode.',
    whatsIncluded: [
      'Wall and floor tiles washed to remove white hard water stains and soap scum',
      'Toilet bowl, commode exterior, and seat sanitized and descaled',
      'Washbasin, mirror, and steel taps polished and descaled',
      'Shower area and glass partition cleaned streak-free',
      'Floor drain cleared and exhaust vent dusted'
    ],
    inclusions: [
      'Wall and floor tiles washed to remove white hard water stains and soap scum',
      'Toilet bowl, commode exterior, and seat sanitized and descaled',
      'Washbasin, mirror, and steel taps polished and descaled',
      'Shower area and glass partition cleaned streak-free',
      'Floor drain cleared and exhaust vent dusted'
    ],
    enabled: true,
    price: { kind: 'fixed', amount: 449 },
    image: '/images/services/washroom-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'sofa-cleaning',
    slug: 'sofa-cleaning',
    title: 'Sofa Seat Cleaning',
    name: 'Sofa Seat Cleaning',
    category: 'residential',
    icon: 'Sofa',
    shortDescription: 'Machine foam washing and vacuum extraction to remove stains, dust, and odors from sofas.',
    shortDesc: 'Machine foam washing and vacuum extraction to remove stains, dust, and odors from sofas.',
    whatsIncluded: [
      'Dry vacuuming of sofa seats, cushions, and corners',
      'Safe foam shampoo applied to break down dirt and food stains',
      'High-power vacuum extraction of dirty foam and moisture',
      'Armrest, backrest, and headrest spot cleaning',
      'Wooden and leatherette borders wiped clean'
    ],
    inclusions: [
      'Dry vacuuming of sofa seats, cushions, and corners',
      'Safe foam shampoo applied to break down dirt and food stains',
      'High-power vacuum extraction of dirty foam and moisture',
      'Armrest, backrest, and headrest spot cleaning',
      'Wooden and leatherette borders wiped clean'
    ],
    enabled: true,
    price: { kind: 'fixed', amount: 249 },
    unitLabel: 'seat',
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
    shortDescription: 'High-suction vacuuming and dust mite extraction for clean, fresh, hygienic sleeping mattresses.',
    shortDesc: 'High-suction vacuuming and dust mite extraction for clean, fresh, hygienic sleeping mattresses.',
    whatsIncluded: [
      'Both sides vacuumed with high-suction machine',
      'Extracts hidden dust mites, dead skin, and fine dust',
      'Spot shampoo treatment for light stains and spots',
      'Mattress border and seam dusting'
    ],
    inclusions: [
      'Both sides vacuumed with high-suction machine',
      'Extracts hidden dust mites, dead skin, and fine dust',
      'Spot shampoo treatment for light stains and spots',
      'Mattress border and seam dusting'
    ],
    enabled: true,
    price: { kind: 'fixed', amount: 349 },
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
    shortDescription: 'Carpet washing and vacuum extraction to remove ground-in dirt, dust, and food spots.',
    shortDesc: 'Carpet washing and vacuum extraction to remove ground-in dirt, dust, and food spots.',
    whatsIncluded: [
      'High-power dry vacuuming across all carpet fibers',
      'Fabric-safe shampoo application and gentle scrubbing',
      'Dirty foam and moisture extracted with wet vacuum',
      'Carpet border cleaning and freshening'
    ],
    inclusions: [
      'High-power dry vacuuming across all carpet fibers',
      'Fabric-safe shampoo application and gentle scrubbing',
      'Dirty foam and moisture extracted with wet vacuum',
      'Carpet border cleaning and freshening'
    ],
    enabled: true,
    price: { kind: 'fixed', amount: 499 },
    image: '/images/services/carpet-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'fridge-cleaning',
    slug: 'fridge-cleaning',
    title: 'Fridge Cleaning',
    name: 'Fridge Cleaning',
    category: 'residential',
    icon: 'Sparkles',
    shortDescription: 'Hygienic interior shelf sanitization, stain removal, and odor elimination for refrigerators.',
    shortDesc: 'Hygienic interior shelf sanitization, stain removal, and odor elimination for refrigerators.',
    whatsIncluded: [
      'Removal, washing, and sanitizing of all removable glass shelves, trays, and vegetable bins',
      'Interior walls, door seals (gaskets), and pockets wiped with food-safe sanitizing solution',
      'Odor neutralizing treatment to remove foul food smells and bacteria',
      'Exterior stainless steel body wipe, condenser vent dusting, and handle sanitization'
    ],
    inclusions: [
      'Removal, washing, and sanitizing of all removable glass shelves, trays, and vegetable bins',
      'Interior walls, door seals (gaskets), and pockets wiped with food-safe sanitizing solution',
      'Odor neutralizing treatment to remove foul food smells and bacteria',
      'Exterior stainless steel body wipe, condenser vent dusting, and handle sanitization'
    ],
    enabled: true,
    price: { kind: 'fixed', amount: 299 },
    image: '/images/services/fridge-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'pest-control',
    slug: 'pest-control',
    title: 'Pest Control',
    name: 'Pest Control',
    category: 'residential',
    icon: 'ShieldCheck',
    shortDescription: 'Pest management treatment for cockroaches, ants, and common household pests across apartments and villas.',
    shortDesc: 'Pest management treatment for cockroaches, ants, and common household pests across apartments and villas.',
    whatsIncluded: [
      'Targeted gel baiting application in kitchen cabinets, drawers, and appliance corners',
      'Spray application along skirting boards, wall edges, and accessible crevices',
      'Washroom drain and sink perimeter anti-pest barrier application',
      'Treatment scope tailored to apartment size or villa layout'
    ],
    inclusions: [
      'Targeted gel baiting application in kitchen cabinets, drawers, and appliance corners',
      'Spray application along skirting boards, wall edges, and accessible crevices',
      'Washroom drain and sink perimeter anti-pest barrier application',
      'Treatment scope tailored to apartment size or villa layout'
    ],
    enabled: true,
    price: {
      kind: 'tiers',
      tiers: [
        { label: '1 BHK', amount: 1000 },
        { label: '2 BHK', amount: 1200 },
        { label: '3 BHK', amount: 1400 },
        { label: 'Villa', amount: 3000 }
      ]
    },
    image: '/images/services/pest-control.webp',
    imageSource: 'illustrative'
  },

  // ==========================================
  // Category: Specialized (5 services)
  // ==========================================
  {
    id: 'water-tank-cleaning',
    slug: 'water-tank-cleaning',
    title: 'Water Tank & Sump Cleaning',
    name: 'Water Tank & Sump Cleaning',
    category: 'specialized',
    icon: 'Droplets',
    shortDescription: 'Drains dirty water, removes bottom mud, scrubs wall algae, and sanitizes overhead water tanks and underground sumps.',
    shortDesc: 'Drains dirty water, removes bottom mud, scrubs wall algae, and sanitizes overhead water tanks and underground sumps.',
    whatsIncluded: [
      'Draining stagnant dirty water and pumping out bottom mud from overhead tank and underground sump',
      'High-pressure water jet washing of tank and sump inner walls and floor',
      'Manual scrubbing of green algae, mud stains, and white salt scaling',
      'Vacuum suction of dirty water and final antibacterial clean water wash'
    ],
    inclusions: [
      'Draining stagnant dirty water and pumping out bottom mud from overhead tank and underground sump',
      'High-pressure water jet washing of tank and sump inner walls and floor',
      'Manual scrubbing of green algae, mud stains, and white salt scaling',
      'Vacuum suction of dirty water and final antibacterial clean water wash'
    ],
    enabled: true,
    price: {
      kind: 'tiers',
      tiers: [
        { label: 'Up to 800 L', amount: 699 },
        { label: '1000 L', amount: 1199 },
        { label: 'More than 1000 L', amount: 1799 }
      ]
    },
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
    shortDescription: 'Cleans paint drops, cement marks, and white dust after painting or renovation work.',
    shortDesc: 'Cleans paint drops, cement marks, and white dust after painting or renovation work.',
    whatsIncluded: [
      'Careful scraping of paint drops and cement stains from floor tiles',
      'Fine white plaster and cement dust vacuuming from all corners and ledges',
      'Window glass, aluminum sliding tracks, and frame tape removal',
      'Switchboards, door frames, and electrical fittings wiped clean',
      'Final floor machine scrubbing and dry mop polish'
    ],
    inclusions: [
      'Careful scraping of paint drops and cement stains from floor tiles',
      'Fine white plaster and cement dust vacuuming from all corners and ledges',
      'Window glass, aluminum sliding tracks, and frame tape removal',
      'Switchboards, door frames, and electrical fittings wiped clean',
      'Final floor machine scrubbing and dry mop polish'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 5, unit: 'sq.ft' },
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
    shortDescription: 'Cleans window glass, sliding channel dust, mosquito mesh, and safety iron grilles.',
    shortDesc: 'Cleans window glass, sliding channel dust, mosquito mesh, and safety iron grilles.',
    whatsIncluded: [
      'Sliding track vacuuming to remove accumulated dust and insects',
      'Glass panels washed and wiped streak-free with rubber squeegee',
      'Window sill, frame, and mosquito mesh dusting',
      'Iron safety grille wipe-down'
    ],
    inclusions: [
      'Sliding track vacuuming to remove accumulated dust and insects',
      'Glass panels washed and wiped streak-free with rubber squeegee',
      'Window sill, frame, and mosquito mesh dusting',
      'Iron safety grille wipe-down'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 199, unit: 'window' },
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
    shortDescription: 'Streak-free cleaning for glass doors, partition glass, mirrors, and glass showcases.',
    shortDesc: 'Streak-free cleaning for glass doors, partition glass, mirrors, and glass showcases.',
    whatsIncluded: [
      'Dusting and spot cleaning of glass panels',
      'Rubber squeegee wipe for clear, crystal finish with no water marks',
      'Glass frame and handle cleaning'
    ],
    inclusions: [
      'Dusting and spot cleaning of glass panels',
      'Rubber squeegee wipe for clear, crystal finish with no water marks',
      'Glass frame and handle cleaning'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 149, unit: 'panel' },
    unitLabel: 'panel',
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
    shortDescription: 'Cleans oily dust and sticky grease from ceiling fan blades, rods, and motors.',
    shortDesc: 'Cleans oily dust and sticky grease from ceiling fan blades, rods, and motors.',
    whatsIncluded: [
      'Dry dusting of fan blades and motor housing',
      'Wet cloth degreasing to remove sticky kitchen and bedroom dust',
      'Fan rod and motor top canopy cleaning',
      'Protective floor cloth placed underneath to keep furniture safe'
    ],
    inclusions: [
      'Dry dusting of fan blades and motor housing',
      'Wet cloth degreasing to remove sticky kitchen and bedroom dust',
      'Fan rod and motor top canopy cleaning',
      'Protective floor cloth placed underneath to keep furniture safe'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 99, unit: 'fan' },
    unitLabel: 'fan',
    image: '/images/services/fan-cleaning.webp',
    imageSource: 'illustrative'
  },

  // ==========================================
  // Category: Commercial (4 services)
  // ==========================================
  {
    id: 'office-cleaning',
    slug: 'office-cleaning',
    title: 'Office Cleaning',
    name: 'Office Cleaning',
    category: 'commercial',
    icon: 'Briefcase',
    shortDescription: 'Complete office cleaning for workstations, chairs, meeting rooms, glass, and floors.',
    shortDesc: 'Complete office cleaning for workstations, chairs, meeting rooms, glass, and floors.',
    whatsIncluded: [
      'Workstation desks and office chairs wiped and dusted',
      'Machine floor scrubbing across hallways and cabins',
      'Conference room table and reception area detailing',
      'Office washroom and pantry cleaning',
      'Glass partition wiping and main door glass shine'
    ],
    inclusions: [
      'Workstation desks and office chairs wiped and dusted',
      'Machine floor scrubbing across hallways and cabins',
      'Conference room table and reception area detailing',
      'Office washroom and pantry cleaning',
      'Glass partition wiping and main door glass shine'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 5, unit: 'sq.ft' },
    unitLabel: 'sq.ft',
    image: '/images/services/office-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'shop-cleaning',
    slug: 'shop-cleaning',
    title: 'Shop Cleaning',
    name: 'Shop Cleaning',
    category: 'commercial',
    icon: 'Store',
    shortDescription: 'Floor machine wash, glass front cleaning, and shelf dusting for retail shops and showrooms.',
    shortDesc: 'Floor machine wash, glass front cleaning, and shelf dusting for retail shops and showrooms.',
    whatsIncluded: [
      'Retail showroom floor machine scrubbing',
      'Front glass entrance and display window cleaning',
      'Billing counter and display shelf dusting',
      'Stock room and trial room floor wash',
      'Signboard border and shutter area dusting'
    ],
    inclusions: [
      'Retail showroom floor machine scrubbing',
      'Front glass entrance and display window cleaning',
      'Billing counter and display shelf dusting',
      'Stock room and trial room floor wash',
      'Signboard border and shutter area dusting'
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
    shortDescription: 'Sanitizing school classrooms, student benches, desks, corridors, and restrooms.',
    shortDesc: 'Sanitizing school classrooms, student benches, desks, corridors, and restrooms.',
    whatsIncluded: [
      'Classroom floor machine wash and hallway cleaning',
      'Student bench and desk wipe-down',
      'Blackboard and whiteboard border dusting',
      'Student washroom sanitization and washing',
      'Window sills and classroom doors wiped'
    ],
    inclusions: [
      'Classroom floor machine wash and hallway cleaning',
      'Student bench and desk wipe-down',
      'Blackboard and whiteboard border dusting',
      'Student washroom sanitization and washing',
      'Window sills and classroom doors wiped'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 5, unit: 'sq.ft' },
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
    shortDescription: 'Complete cleaning for hotel rooms, guest lodges, and pilgrim stay rooms in Tirupati.',
    shortDesc: 'Complete cleaning for hotel rooms, guest lodges, and pilgrim stay rooms in Tirupati.',
    whatsIncluded: [
      'Guest room floor scrubbing and bed area dusting',
      'Attached washroom tile descaling and commode sanitization',
      'Mattress vacuuming and headboard wiping',
      'Lobby, staircase, and hallway washing',
      'Window glass and door frame cleaning'
    ],
    inclusions: [
      'Guest room floor scrubbing and bed area dusting',
      'Attached washroom tile descaling and commode sanitization',
      'Mattress vacuuming and headboard wiping',
      'Lobby, staircase, and hallway washing',
      'Window glass and door frame cleaning'
    ],
    enabled: true,
    price: { kind: 'inspection' },
    image: '/images/services/hotel-guest-house-cleaning.webp',
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
  const direct = SERVICES_DATA.find((service) => service.slug === slug || service.id === slug);
  if (direct) return direct;
  const redirectedSlug = SLUG_REDIRECT_MAP[slug];
  if (redirectedSlug) {
    return SERVICES_DATA.find((service) => service.slug === redirectedSlug || service.id === redirectedSlug);
  }
  return undefined;
};
