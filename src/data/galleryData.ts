export type GalleryFilterCategory =
  | 'All'
  | 'Residential'
  | 'Commercial'
  | 'Specialized Cleaning'
  | 'Office Cleaning'
  | 'Floor & Carpet'
  | 'Glass Cleaning'
  | 'Before & After'
  | 'Our Team'
  | 'Equipment';

export const GALLERY_FILTER_CATEGORIES: GalleryFilterCategory[] = [
  'All',
  'Residential',
  'Commercial',
  'Specialized Cleaning',
  'Office Cleaning',
  'Floor & Carpet',
  'Glass Cleaning',
  'Before & After',
  'Our Team',
  'Equipment'
];

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryFilterCategory;
  image: string;
  description: string;
  featured?: boolean;
  bentoSpan?: 'col-span-1' | 'col-span-2' | 'col-span-1 md:col-span-2' | 'col-span-1 md:row-span-2';
  alt: string;
  locality?: string;
  serviceSlug?: string;
}

export interface BeforeAfterItem {
  id: string;
  serviceSlug: string;
  title: string;
  tag?: string;
  category: GalleryFilterCategory;
  problem: string;
  work: string;
  before: string;
  after: string;
  altBefore: string;
  altAfter: string;
  locality?: string;
  source: 'illustrative' | 'real';
}

// Backward compatibility alias for ImageCompareSlider & GalleryModal
export type GalleryEntry = BeforeAfterItem;

export interface TeamGalleryItem {
  id: string;
  title: string;
  role: string;
  image: string;
  description: string;
  alt: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  alt: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  image: string;
  highlight: string;
}

/* ==========================================
 * 1. BENTO GALLERY ITEMS (Illustrative Examples)
 * ========================================== */
export const BENTO_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'bento-1',
    title: 'Apartment Living Room Cleaning',
    category: 'Residential',
    image: '/images/services/home-cleaning.webp',
    description: 'Vitrified tile cleaning, corner dusting, and furniture care for a multi-room apartment.',
    featured: true,
    bentoSpan: 'col-span-1 md:col-span-2',
    alt: 'Clean living room with polished vitrified floor tiles',
    serviceSlug: 'home-cleaning'
  },
  {
    id: 'bento-2',
    title: 'Corporate Office Workstations',
    category: 'Office Cleaning',
    image: '/images/services/office-cleaning.webp',
    description: 'Desk wipe-downs, sanitization, and circulation floor mopping.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Modern corporate office workstation desks and walkways',
    serviceSlug: 'office-cleaning'
  },
  {
    id: 'bento-3',
    title: 'Modern Kitchen Backsplash & Platform',
    category: 'Specialized Cleaning',
    image: '/images/services/kitchen-cleaning.webp',
    description: 'Degreased granite slabs, stainless steel sink wash, and tile clearing.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Spotless clean kitchen countertop and sink',
    serviceSlug: 'kitchen-cleaning'
  },
  {
    id: 'bento-4',
    title: 'Duplex Villa Living & Dining Hall',
    category: 'Residential',
    image: '/images/services/villa-cleaning.webp',
    description: 'Full duplex floor cleaning, wooden handrail dusting, and large window wiping.',
    featured: true,
    bentoSpan: 'col-span-1 md:col-span-2',
    alt: 'Spacious duplex villa living area with staircase and clean floors',
    serviceSlug: 'villa-cleaning'
  },
  {
    id: 'bento-5',
    title: 'Washroom Descaling & Chrome Detailing',
    category: 'Specialized Cleaning',
    image: '/images/services/washroom-cleaning.webp',
    description: 'Wall tile hard-water scale removal, chrome tap polishing, and sanitaryware disinfection.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Clean washroom with descaled ceramic tiles and mirror',
    serviceSlug: 'washroom-cleaning'
  },
  {
    id: 'bento-6',
    title: 'Post-Construction Hard-Surface Cleaning',
    category: 'Floor & Carpet',
    image: '/images/services/post-construction-cleaning.webp',
    description: 'Paint scraping, fine cement dust extraction, and floor tile wash.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Gleaming polished floor tiles after thorough cleaning',
    serviceSlug: 'post-construction-cleaning'
  },
  {
    id: 'bento-7',
    title: 'Sliding Glass Window & Track Detailing',
    category: 'Glass Cleaning',
    image: '/images/services/window-cleaning.webp',
    description: 'Streak-free window glass wiping, channel vacuuming, and frame detailing.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Clear sliding glass window with aluminum frame',
    serviceSlug: 'window-cleaning'
  },
  {
    id: 'bento-8',
    title: 'Retail Shop & Showroom Floor Detailing',
    category: 'Commercial',
    image: '/images/services/shop-cleaning.webp',
    description: 'Complete showroom aisle cleaning, glass facade wash, and display shelf dusting.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Clean retail supermarket shop interior and shelving',
    serviceSlug: 'shop-cleaning'
  },
  {
    id: 'bento-9',
    title: 'Living Room Fabric Sofa Cleaning',
    category: 'Floor & Carpet',
    image: '/images/services/sofa-cleaning.webp',
    description: 'Dry vacuuming, foam shampoo application, and dirt extraction on living room sofa.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Clean fabric upholstered sofa in residential living room',
    serviceSlug: 'sofa-cleaning'
  },
  {
    id: 'bento-10',
    title: 'Move-In / Move-Out Flat Handover Cleaning',
    category: 'Residential',
    image: '/images/services/move-in-out-cleaning.webp',
    description: 'Comprehensive vacant flat wash, washroom cleaning, and kitchen detailing ready for handover.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Freshly cleaned unfurnished apartment room',
    serviceSlug: 'move-in-out-cleaning'
  },
  {
    id: 'bento-11',
    title: 'Hotel & Guest House Room Cleaning',
    category: 'Commercial',
    image: '/images/services/hotel-guest-house-cleaning.webp',
    description: 'Spotless hospitality cleaning, sanitized linens, gleaming floors, and washroom detailing.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Clean hotel guest room with neatly prepared bed and polished floors',
    serviceSlug: 'hotel-guest-house-cleaning'
  },
  {
    id: 'bento-12',
    title: 'Rooftop Water Tank & Sump Jet Wash',
    category: 'Equipment',
    image: '/images/services/water-tank-cleaning.webp',
    description: 'High-pressure jet wash, bottom mud extraction, and algae scrubbing for overhead tanks and sumps.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Rooftop domestic water tank on residential terrace',
    serviceSlug: 'water-tank-cleaning'
  }
];

/* ==========================================
 * 2. BEFORE & AFTER DATA (Sample Before & After)
 * ========================================== */
export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    serviceSlug: 'home-cleaning',
    title: 'Hard-Surface Floor & Home Cleaning',
    tag: 'Sample Before & After',
    category: 'Before & After',
    problem: 'Dark dirt in tile lines and dull muddy stains from daily foot traffic.',
    work: 'Thorough floor cleaning, tile scrubbing, and dirt extraction.',
    before: '/images/gallery/floor-before.webp',
    after: '/images/gallery/floor-after.webp',
    altBefore: 'Dull tiled floor with muddy dirt marks before cleaning',
    altAfter: 'Gleaming polished floor after thorough cleaning',
    source: 'illustrative'
  },
  {
    id: 'ba-2',
    serviceSlug: 'kitchen-cleaning',
    title: 'Kitchen Platform & Wall Degreasing',
    tag: 'Sample Before & After',
    category: 'Before & After',
    problem: 'Sticky cooking oil grease and turmeric stains on kitchen tiles & slab.',
    work: 'Safe degreasing solution and scrub wash for a spotless finish.',
    before: '/images/gallery/kitchen-before.webp',
    after: '/images/gallery/kitchen-after.webp',
    altBefore: 'Greasy kitchen countertop with oil smudges before cleaning',
    altAfter: 'Spotless degreased kitchen countertop after cleaning',
    source: 'illustrative'
  },
  {
    id: 'ba-3',
    serviceSlug: 'washroom-cleaning',
    title: 'Washroom Wall Tiles & Tap Cleaning',
    tag: 'Sample Before & After',
    category: 'Before & After',
    problem: 'Hard borewell water white salt stains (uppu karalu) on taps and tiles.',
    work: 'Acid-free safe descaling liquid restoring original shine without damage.',
    before: '/images/gallery/bathroom-before.webp',
    after: '/images/gallery/bathroom-after.webp',
    altBefore: 'Cloudy washroom tiles with hard water stains and scale',
    altAfter: 'Restored washroom wall tiles and sparkling chrome fixtures',
    source: 'illustrative'
  },
  {
    id: 'ba-4',
    serviceSlug: 'sofa-cleaning',
    title: 'Fabric Sofa Shampooing & Stain Removal',
    tag: 'Sample Before & After',
    category: 'Before & After',
    problem: 'Dust, food marks, and sweat stains on sofa fabric.',
    work: 'Foam shampooing and high-power vacuum water extraction.',
    before: '/images/gallery/sofa-before.webp',
    after: '/images/gallery/sofa-after.webp',
    altBefore: 'Fabric sofa with visible dirt and beverage stains before cleaning',
    altAfter: 'Freshly shampooed clean fabric sofa',
    source: 'illustrative'
  }
];

// Compatibility exports
export const RAW_GALLERY_ENTRIES = BEFORE_AFTER_ITEMS;
export function getActiveGalleryEntries(): BeforeAfterItem[] {
  return BEFORE_AFTER_ITEMS;
}
export function getGalleryEntriesForService(serviceSlug: string): BeforeAfterItem[] {
  return BEFORE_AFTER_ITEMS.filter((e) => e.serviceSlug === serviceSlug);
}

/* ==========================================
 * 3. SERVICES GALLERY CARDS
 * ========================================== */
export interface ServiceGalleryCard {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export const SERVICES_GALLERY_CARDS: ServiceGalleryCard[] = [
  {
    slug: 'home-cleaning',
    title: 'Home Cleaning',
    category: 'Apartments & Houses',
    image: '/images/services/home-cleaning.webp',
    description: 'Complete multi-room cleaning covering floors, washrooms, kitchen, fans, switchboards, and balconies.'
  },
  {
    slug: 'villa-cleaning',
    title: 'Villa Cleaning',
    category: 'Duplex & Independent Houses',
    image: '/images/services/villa-cleaning.webp',
    description: 'Comprehensive cleaning for multi-floor villas, balconies, staircases, and open terrace areas.'
  },
  {
    slug: 'office-cleaning',
    title: 'Office Cleaning',
    category: 'Corporate Workspaces',
    image: '/images/services/office-cleaning.webp',
    description: 'Desk wipe-downs, conference room sanitization, and workstation floor cleaning.'
  },
  {
    slug: 'move-in-out-cleaning',
    title: 'Move-In / Move-Out Cleaning',
    category: 'Vacant Property Handover',
    image: '/images/services/move-in-out-cleaning.webp',
    description: 'Complete cupboard, wardrobe, washroom, and floor cleaning for new tenants or handover.'
  },
  {
    slug: 'kitchen-cleaning',
    title: 'Kitchen Cleaning',
    category: 'Degreasing & Tile Descaling',
    image: '/images/services/kitchen-cleaning.webp',
    description: 'Granite counter degreasing, chimney exterior wiping, tile scrub, and stainless steel sink polish.'
  },
  {
    slug: 'window-cleaning',
    title: 'Glass & Window Cleaning',
    category: 'Streak-Free Detailing',
    image: '/images/services/window-cleaning.webp',
    description: 'Squeegee cleaning for sliding windows, partition glass, mirrors, and glass facades.'
  }
];

/* ==========================================
 * 4. TEAM GALLERY ITEMS
 * ========================================== */
export const TEAM_GALLERY_ITEMS: TeamGalleryItem[] = [
  {
    id: 'team-1',
    title: 'Trained & Equipped Cleaners',
    role: 'On-Site Team',
    image: '/images/team/team-equipment-kit.webp',
    description: 'Our cleaners arrive equipped with surface-safe cleaners, microfiber cloths, and vacuum kits.',
    alt: 'Cleaning uniforms, vacuums, and equipment kit'
  },
  {
    id: 'team-2',
    title: 'Structured Checklist Execution',
    role: 'Quality Lead',
    image: '/images/team/supervisor-checklist-audit.webp',
    description: 'Every project follows a room-by-room cleaning checklist to ensure complete coverage.',
    alt: 'Quality inspection audit checklist and measurement tool'
  },
  {
    id: 'team-3',
    title: 'Safety & Surface Care Standards',
    role: 'Operational Safety',
    image: '/images/team/surface-safety-chemicals.webp',
    description: 'We use non-acidic descalers and safe techniques to protect your delicate floors and fittings.',
    alt: 'Surface-safe acid-free descalers, neutral cleaners, and safety gloves'
  },
  {
    id: 'team-4',
    title: 'Final Walkthrough With Customer',
    role: 'Customer Inspection',
    image: '/images/team/final-handover-audit.webp',
    description: 'We walk through each room together with you before packing up to confirm your satisfaction.',
    alt: 'Final walkthrough sign-off sheet and keys ready in gleaming spotless living room'
  }
];

/* ==========================================
 * 5. EQUIPMENT ITEMS
 * ========================================== */
export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: 'eq-1',
    name: 'Hard-Surface Floor Scrubbing Gear',
    category: 'Floor Care',
    image: '/images/equipment/hard-surface-clean.webp',
    description: 'Specialized floor scrubbing tools and pads that lift embedded dirt from tile, marble, and granite pores.',
    alt: 'Clean vitrified tile floor after hard-surface scrubbing'
  },
  {
    id: 'eq-2',
    name: 'High-Suction Wet & Dry Vacuum',
    category: 'Slurry & Dust Extraction',
    image: '/images/equipment/sofa-vacuum.webp',
    description: 'Commercial vacuum extractor for sofa fabric cleaning, window tracks, and slurry suction.',
    alt: 'High-suction vacuum extractor'
  },
  {
    id: 'eq-3',
    name: 'Surface-Safe Descaling Solutions',
    category: 'Chemical Safety',
    image: '/images/equipment/bathroom-tools.webp',
    description: 'Non-corrosive, acid-free descaling formulas that remove mineral deposits without damaging chrome or grout.',
    alt: 'Surface-safe cleaning solutions'
  },
  {
    id: 'eq-4',
    name: 'Professional Glass Squeegees & Scrapers',
    category: 'Glass Detailing',
    image: '/images/equipment/window-tools.webp',
    description: 'Rubber squeegee blades and safety scrapers for streak-free windows and partition glass.',
    alt: 'Professional glass cleaning squeegee'
  }
];

/* ==========================================
 * 6. PROJECT PROCESS STEPS (Story Flow)
 * ========================================== */
export const PROJECT_PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Site Inspection & Setup',
    description: 'Our team inspects each room, checks tile stains and washroom scale, and selects the right tools and cleaning liquids.',
    image: '/images/process/step-1-inspection.webp',
    highlight: 'Initial Inspection'
  },
  {
    stepNumber: 2,
    title: 'Dusting & Surface Prep',
    description: 'We remove cobwebs, dry-vacuum loose debris, cover switchboards, and pretreat stubborn oil grease or grout stains.',
    image: '/images/process/step-2-dusting.webp',
    highlight: 'Dry Dusting & Prep'
  },
  {
    stepNumber: 3,
    title: 'Thorough Cleaning & Descaling',
    description: 'We wash room floors, spray foam shampoo on upholstery, and apply surface-safe descaling liquid to bathroom scale.',
    image: '/images/process/step-3-machine-scrub.webp',
    highlight: 'Deep Cleaning'
  },
  {
    stepNumber: 4,
    title: 'Fine Detailing & Wiping Dry',
    description: 'Window sliding tracks, fan blades, switch plates, and tile edges are detailed by hand and wiped completely dry.',
    image: '/images/process/step-4-fine-detailing.webp',
    highlight: 'Edge & Window Detailing'
  },
  {
    stepNumber: 5,
    title: 'Quality Check & Handover',
    description: 'We conduct a room-by-room walkthrough together with you to verify every corner is clean before handover.',
    image: '/images/process/step-5-handover.webp',
    highlight: 'Joint Walkthrough'
  }
];
