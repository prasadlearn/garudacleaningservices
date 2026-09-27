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
      return formatAmount(model.amount);
    case 'per-unit':
      if (model.max !== undefined && model.max !== model.min) {
        return `${formatAmount(model.min)}–${formatAmount(model.max)} / ${model.unit}`;
      }
      return `${formatAmount(model.min)} / ${model.unit}`;
    case 'tiers':
      return formatAmount(model.tiers[0]?.amount || 0);
    case 'inspection':
      return 'Inspection';
  }
};

export const getServiceHighlights = (service: ServiceItem): string[] => {
  switch (service.slug) {
    case 'bhk-deep-cleaning':
      return ['Floor Scrubbing', 'Kitchen & Bathrooms', 'Fans & Windows'];
    case 'villa-deep-cleaning':
      return ['All Floors & Rooms', 'Bathrooms & Balconies', 'Fans & Windows'];
    case 'full-home-deep-cleaning-package':
      return ['Floor Scrubbing', 'Kitchen Degrease', 'Bath Descaling'];
    case 'kitchen-deep-cleaning':
      return ['Platform & Tiles', 'Chimney & Exhaust', 'Oil Stain Removal'];
    case 'bathroom-deep-cleaning':
      return ['Hard Water Scale', 'Taps & Commode', 'Tile Descaling'];
    case 'sofa-cleaning':
      return ['Foam Shampooing', 'Dust Extraction', 'Stain Removal'];
    case 'floor-deep-cleaning':
      return ['Single-Disc Machine', 'Tile & Grout Scrub', 'Slurry Extraction'];
    case 'office-deep-cleaning':
      return ['Desk Wipe-Down', 'Floor Scrubbing', 'Glass Partitions'];
    case 'water-tank-cleaning':
      return ['Overhead & Sump', 'Pressure Jet Wash', 'Antibacterial Rinse'];
    case 'window-cleaning':
      return ['Glass Streak-Free', 'Track Vacuuming', 'Grille Wiping'];
    case 'carpet-cleaning':
      return ['Foam Wash', 'Dirt Extraction', 'Fabric Care'];
    case 'fan-cleaning':
      return ['Blade Degreasing', 'Motor Dusting', 'Sparkling Clean'];
    case 'glass-cleaning':
      return ['Streak-Free Shine', 'Frame Detailing', 'Spotless Glass'];
    case 'move-in-cleaning':
      return ['Full Sanitization', 'Cupboard Cleaning', 'Move-In Ready'];
    case 'move-out-cleaning':
      return ['Deposit Handover', 'Floor Scrubbing', 'Full Deep Clean'];
    case 'post-construction-cleaning':
      return ['Paint & Cement Scrub', 'Dust Extraction', 'Floor Buffing'];
    case 'commercial-cleaning':
      return ['Workspaces & Floors', 'Restrooms & Lobby', 'Deep Machine Wash'];
    case 'shop-cleaning':
      return ['Showroom Floors', 'Glass Facade', 'Display Dusting'];
    case 'school-classroom-cleaning':
      return ['Desk & Bench Wash', 'Classroom Floors', 'Sanitized Space'];
    case 'hotel-guest-house-cleaning':
      return ['Room Deep Clean', 'Linens & Floors', 'Restroom Shine'];
    case 'mattress-cleaning':
      return ['Deep Dust Suction', 'Stain Removal', 'Allergen Refresh'];
    default:
      return service.whatsIncluded.slice(0, 3).map((item) => item.split(',')[0]);
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
    shortDescription: 'Complete deep cleaning for all rooms, hall, kitchen, and bathrooms in your flat.',
    shortDesc: 'Complete deep cleaning for all rooms, hall, kitchen, and bathrooms in your flat.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Floor machine scrubbing across living room, bedrooms, and dining area',
      'Kitchen platform degreasing, sink wash, and outer cabinet wipe-down',
      'Bathroom wall and floor tile washing, commode cleaning, and tap shine',
      'Window glass cleaning, sliding track vacuuming, and safety grille wiping',
      'Ceiling fan wiping, switchboard cleaning, and door frame dusting'
    ],
    inclusions: [
      'Floor machine scrubbing across living room, bedrooms, and dining area',
      'Kitchen platform degreasing, sink wash, and outer cabinet wipe-down',
      'Bathroom wall and floor tile washing, commode cleaning, and tap shine',
      'Window glass cleaning, sliding track vacuuming, and safety grille wiping',
      'Ceiling fan wiping, switchboard cleaning, and door frame dusting'
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
    shortDescription: 'Complete deep cleaning for independent houses, duplexes, and multi-floor villas.',
    shortDesc: 'Complete deep cleaning for independent houses, duplexes, and multi-floor villas.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Machine scrubbing for all room floors, halls, and corridors',
      'All bathrooms cleaned, tiles washed, and hard water marks removed',
      'Kitchen deep cleaning, platform washing, and stove grease removal',
      'Staircase railings, balconies, sit-outs, and open terrace washing',
      'Windows, sliding tracks, grilles, ceiling fans, and doors cleaned'
    ],
    inclusions: [
      'Machine scrubbing for all room floors, halls, and corridors',
      'All bathrooms cleaned, tiles washed, and hard water marks removed',
      'Kitchen deep cleaning, platform washing, and stove grease removal',
      'Staircase railings, balconies, sit-outs, and open terrace washing',
      'Windows, sliding tracks, grilles, ceiling fans, and doors cleaned'
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
    shortDescription: 'All-in-one home cleaning covering floors, kitchen, bathrooms, windows, and balconies.',
    shortDesc: 'All-in-one home cleaning covering floors, kitchen, bathrooms, windows, and balconies.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Floor machine wash across all bedrooms, living hall, and dining areas',
      'Kitchen platform, wall tiles, steel sink, and chimney exterior cleaned',
      'Bathroom tile washing, commode sanitization, and tap descaling',
      'Balcony floor washing and drain cleaning',
      'Ceiling fan blades, light fixtures, switchboards, and doors dusted'
    ],
    inclusions: [
      'Floor machine wash across all bedrooms, living hall, and dining areas',
      'Kitchen platform, wall tiles, steel sink, and chimney exterior cleaned',
      'Bathroom tile washing, commode sanitization, and tap descaling',
      'Balcony floor washing and drain cleaning',
      'Ceiling fan blades, light fixtures, switchboards, and doors dusted'
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
    shortDescription: 'Deep cleaning and sanitizing empty flats or houses before your family moves in.',
    shortDesc: 'Deep cleaning and sanitizing empty flats or houses before your family moves in.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Cupboards, wardrobes, and kitchen shelves cleaned inside and outside',
      'Complete bathroom sanitization, tile scrubbing, and commode cleaning',
      'Kitchen counter, sink, and storage areas washed and degreased',
      'Floor machine scrubbing and dust removal across all rooms',
      'Window channels vacuuming, glass wiping, and main door cleaning'
    ],
    inclusions: [
      'Cupboards, wardrobes, and kitchen shelves cleaned inside and outside',
      'Complete bathroom sanitization, tile scrubbing, and commode cleaning',
      'Kitchen counter, sink, and storage areas washed and degreased',
      'Floor machine scrubbing and dust removal across all rooms',
      'Window channels vacuuming, glass wiping, and main door cleaning'
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
    shortDescription: 'Complete cleaning of vacated flats to get your full security deposit back from the owner.',
    shortDesc: 'Complete cleaning of vacated flats to get your full security deposit back from the owner.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Complete dust removal and floor machine wash in all rooms',
      'Kitchen tough grease, oil stains, and cooking marks removed',
      'Bathroom white scale marks cleared, commode, and tiles scrubbed',
      'Balcony, wash area, and corner cobwebs cleaned',
      'Window glass, switchboards, and door handles wiped clean'
    ],
    inclusions: [
      'Complete dust removal and floor machine wash in all rooms',
      'Kitchen tough grease, oil stains, and cooking marks removed',
      'Bathroom white scale marks cleared, commode, and tiles scrubbed',
      'Balcony, wash area, and corner cobwebs cleaned',
      'Window glass, switchboards, and door handles wiped clean'
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
    shortDescription: 'Removes sticky cooking oil and grease from kitchen slabs, tiles, sink, stove, and chimney.',
    shortDesc: 'Removes sticky cooking oil and grease from kitchen slabs, tiles, sink, stove, and chimney.',
    // TODO_OWNER: confirm inclusions
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
    shortDescription: 'Removes hard water stains (white salt marks), cleans wall tiles, taps, and commode.',
    shortDesc: 'Removes hard water stains (white salt marks), cleans wall tiles, taps, and commode.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Wall and floor tiles washed to remove white hard water stains and soap scum',
      'Toilet bowl, commode exterior, and seat sanitized and cleaned',
      'Washbasin, mirror, and steel taps polished and descaled',
      'Shower area and glass partition cleaned streak-free',
      'Drain floor cleared and exhaust vent dusted'
    ],
    inclusions: [
      'Wall and floor tiles washed to remove white hard water stains and soap scum',
      'Toilet bowl, commode exterior, and seat sanitized and cleaned',
      'Washbasin, mirror, and steel taps polished and descaled',
      'Shower area and glass partition cleaned streak-free',
      'Drain floor cleared and exhaust vent dusted'
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
    shortDescription: 'Machine foam washing and vacuuming to remove stains, dust, and bad smells from sofas.',
    shortDesc: 'Machine foam washing and vacuuming to remove stains, dust, and bad smells from sofas.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Deep dry vacuuming of sofa seats, cushions, and corners',
      'Safe foam shampoo applied to break down dirt and food stains',
      'High-power vacuum extraction of dirty foam and moisture',
      'Armrest, backrest, and headrest spot cleaning',
      'Wooden and leatherette borders wiped clean'
    ],
    inclusions: [
      'Deep dry vacuuming of sofa seats, cushions, and corners',
      'Safe foam shampoo applied to break down dirt and food stains',
      'High-power vacuum extraction of dirty foam and moisture',
      'Armrest, backrest, and headrest spot cleaning',
      'Wooden and leatherette borders wiped clean'
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
    shortDescription: 'Deep vacuuming and dust mite removal for clean, fresh, hygienic sleeping mattresses.',
    shortDesc: 'Deep vacuuming and dust mite removal for clean, fresh, hygienic sleeping mattresses.',
    // TODO_OWNER: confirm inclusions
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
    shortDescription: 'Deep carpet washing and vacuuming to remove ground-in dirt, dust, and food spots.',
    shortDesc: 'Deep carpet washing and vacuuming to remove ground-in dirt, dust, and food spots.',
    // TODO_OWNER: confirm inclusions
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
    shortDescription: 'Machine floor scrubbing to remove tough dirt, black tile lines, and bring back shine.',
    shortDesc: 'Machine floor scrubbing to remove tough dirt, black tile lines, and bring back tile shine.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Single-disc rotary machine scrubbing across open floors',
      'Deep cleaning of tile joints and black grout lines',
      'Dirty water suction with wet commercial vacuum',
      'Skirting tiles and floor corner cleaning'
    ],
    inclusions: [
      'Single-disc rotary machine scrubbing across open floors',
      'Deep cleaning of tile joints and black grout lines',
      'Dirty water suction with wet commercial vacuum',
      'Skirting tiles and floor corner cleaning'
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
    title: 'Water Tank & Sump Cleaning',
    name: 'Water Tank & Sump Cleaning',
    category: 'specialized',
    icon: 'Droplets',
    shortDescription: 'Drains dirty water, removes bottom mud, scrubs wall algae, and sanitizes overhead water tanks and underground sumps.',
    shortDesc: 'Drains dirty water, removes bottom mud, scrubs wall algae, and sanitizes overhead water tanks and underground sumps.',
    // TODO_OWNER: confirm inclusions
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
    shortDescription: 'Cleans paint drops, cement marks, and white dust after painting or renovation work.',
    shortDesc: 'Cleans paint drops, cement marks, and white dust after painting or renovation work.',
    // TODO_OWNER: confirm inclusions
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
    shortDescription: 'Cleans window glass, sliding channel dust, mosquito mesh, and safety iron grilles.',
    shortDesc: 'Cleans window glass, sliding channel dust, mosquito mesh, and safety iron grilles.',
    // TODO_OWNER: confirm inclusions
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
    shortDescription: 'Streak-free cleaning for glass doors, partition glass, mirrors, and glass showcases.',
    shortDesc: 'Streak-free cleaning for glass doors, partition glass, mirrors, and glass showcases.',
    // TODO_OWNER: confirm inclusions
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
    shortDescription: 'Cleans oily dust and sticky grease from ceiling fan blades, rods, and motors.',
    shortDesc: 'Cleans oily dust and sticky grease from ceiling fan blades, rods, and motors.',
    // TODO_OWNER: confirm inclusions
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
    shortDescription: 'Complete office cleaning for workstations, chairs, meeting rooms, glass, and floors.',
    shortDesc: 'Complete office cleaning for workstations, chairs, meeting rooms, glass, and floors.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Workstation desks and office chairs wiped and dusted',
      'Machine floor scrubbing across hallways and cabins',
      'Conference room table and reception area detailing',
      'Office washroom and pantry deep cleaning',
      'Glass partition wiping and main door glass shine'
    ],
    inclusions: [
      'Workstation desks and office chairs wiped and dusted',
      'Machine floor scrubbing across hallways and cabins',
      'Conference room table and reception area detailing',
      'Office washroom and pantry deep cleaning',
      'Glass partition wiping and main door glass shine'
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
    shortDescription: 'Floor machine wash, glass front cleaning, and shelf dusting for retail shops and showrooms.',
    shortDesc: 'Floor machine wash, glass front cleaning, and shelf dusting for retail shops and showrooms.',
    // TODO_OWNER: confirm inclusions
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
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Classroom floor machine wash and hallway cleaning',
      'Student bench and desk wipe-down',
      'Blackboard and whiteboard border dusting',
      'Student washroom deep sanitization and washing',
      'Window sills and classroom doors wiped'
    ],
    inclusions: [
      'Classroom floor machine wash and hallway cleaning',
      'Student bench and desk wipe-down',
      'Blackboard and whiteboard border dusting',
      'Student washroom deep sanitization and washing',
      'Window sills and classroom doors wiped'
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
    shortDescription: 'Deep cleaning for hotel rooms, guest lodges, and pilgrim stay rooms in Tirupati.',
    shortDesc: 'Deep cleaning for hotel rooms, guest lodges, and pilgrim stay rooms in Tirupati.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Guest room floor scrubbing and bed area dusting',
      'Attached bathroom tile descaling and commode sanitization',
      'Mattress vacuuming and headboard wiping',
      'Lobby, staircase, and hallway washing',
      'Window glass and door frame cleaning'
    ],
    inclusions: [
      'Guest room floor scrubbing and bed area dusting',
      'Attached bathroom tile descaling and commode sanitization',
      'Mattress vacuuming and headboard wiping',
      'Lobby, staircase, and hallway washing',
      'Window glass and door frame cleaning'
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
    shortDescription: 'Tailored deep cleaning for commercial offices, banks, clinics, function halls, and buildings.',
    shortDesc: 'Tailored deep cleaning for commercial offices, banks, clinics, function halls, and buildings.',
    // TODO_OWNER: confirm inclusions
    whatsIncluded: [
      'Site visit assessment and mechanized floor machine scrubbing',
      'Public lobby and waiting area sanitization',
      'Restroom block deep washing and sanitization',
      'Main glass entrance and reception area cleaning',
      'Waste clearance and outer boundary cleaning'
    ],
    inclusions: [
      'Site visit assessment and mechanized floor machine scrubbing',
      'Public lobby and waiting area sanitization',
      'Restroom block deep washing and sanitization',
      'Main glass entrance and reception area cleaning',
      'Waste clearance and outer boundary cleaning'
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
