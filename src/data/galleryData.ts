export type GalleryFilterCategory =
  | 'All'
  | 'Residential'
  | 'Commercial'
  | 'Deep Cleaning'
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
  'Deep Cleaning',
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
  source: 'real';
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
 * 1. BENTO GALLERY ITEMS (Static Data)
 * ========================================== */
export const BENTO_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'bento-1',
    title: 'Apartment Living Room Deep Clean',
    category: 'Residential',
    image: '/images/services/bhk-deep-cleaning.webp',
    description: 'Vitrified tile scrubbing, corner dusting, and furniture care for a multi-room apartment.',
    featured: true,
    bentoSpan: 'col-span-1 md:col-span-2',
    alt: 'Clean living room with polished vitrified floor tiles',
    locality: 'Balaji Colony',
    serviceSlug: 'bhk-deep-cleaning'
  },
  {
    id: 'bento-2',
    title: 'Corporate Office Workstations',
    category: 'Office Cleaning',
    image: '/images/services/office-deep-cleaning.webp',
    description: 'Desk wipe-downs, sanitization, and circulation floor machine scrubbing.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Modern corporate office workstation desks and walkways',
    locality: 'AIR Bypass Road',
    serviceSlug: 'office-deep-cleaning'
  },
  {
    id: 'bento-3',
    title: 'Modern Kitchen Backsplash & Platform',
    category: 'Deep Cleaning',
    image: '/images/services/kitchen-deep-cleaning.webp',
    description: 'Degreased granite slabs, stainless steel sink wash, and tile clearing.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Spotless clean kitchen countertop and sink',
    locality: 'MR Palli',
    serviceSlug: 'kitchen-deep-cleaning'
  },
  {
    id: 'bento-4',
    title: 'Luxury Villa Living & Dining Hall',
    category: 'Residential',
    image: '/images/services/villa-deep-cleaning.webp',
    description: 'Full duplex floor scrubbing, wooden handrail dusting, and large window wiping.',
    featured: true,
    bentoSpan: 'col-span-1 md:col-span-2',
    alt: 'Spacious duplex villa living area with staircase and clean floors',
    locality: 'Renigunta Road',
    serviceSlug: 'villa-deep-cleaning'
  },
  {
    id: 'bento-5',
    title: 'Bathroom Descaling & Chrome Restoration',
    category: 'Deep Cleaning',
    image: '/images/services/bathroom-deep-cleaning.webp',
    description: 'Wall tile hard-water scale removal, chrome tap polishing, and sanitaryware disinfection.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Clean bathroom with descaled ceramic tiles and mirror',
    locality: 'Bhavani Nagar',
    serviceSlug: 'bathroom-deep-cleaning'
  },
  {
    id: 'bento-6',
    title: 'Polished Vitrified Floor Machine Scrubbing',
    category: 'Floor & Carpet',
    image: '/images/services/floor-deep-cleaning.webp',
    description: 'Single-disc rotary scrubbing removing ground-in dirt and restoring floor shine.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Gleaming vitrified floor tiles with reflection',
    locality: 'Chandragiri Road',
    serviceSlug: 'floor-deep-cleaning'
  },
  {
    id: 'bento-7',
    title: 'Sliding Glass Window & Track Detailing',
    category: 'Glass Cleaning',
    image: '/images/services/window-cleaning.webp',
    description: 'Streak-free window glass wiping, channel vacuuming, and aluminum frame detailing.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Clear sliding glass window with aluminum frame',
    locality: 'Korlagunta',
    serviceSlug: 'window-cleaning'
  },
  {
    id: 'bento-8',
    title: 'Retail Shop & Showroom Floor Detailing',
    category: 'Commercial',
    image: '/images/services/shop-cleaning.webp',
    description: 'Complete showroom aisle scrubbing, glass facade wash, and display ledge dusting.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Clean retail shop interior and shelving',
    locality: 'Gandhi Road',
    serviceSlug: 'shop-cleaning'
  },
  {
    id: 'bento-9',
    title: 'Sectional Fabric Sofa Foam Shampooing',
    category: 'Floor & Carpet',
    image: '/images/services/sofa-cleaning.webp',
    description: 'Dry vacuuming, foam shampoo application, and dirt extraction on living room sofa.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Clean grey fabric sectional sofa',
    locality: 'Leela Mahal Area',
    serviceSlug: 'sofa-cleaning'
  },
  {
    id: 'bento-10',
    title: 'Vacated Flat Handover Deep Cleaning',
    category: 'Residential',
    image: '/images/services/move-in-cleaning.webp',
    description: 'Comprehensive vacant flat wash, bathroom scrubbing, and kitchen detailing ready for move-in.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Freshly cleaned unfurnished apartment room',
    locality: 'Tiruchanur Road',
    serviceSlug: 'move-in-cleaning'
  },
  {
    id: 'bento-11',
    title: 'Commercial Building Entrance & Lobby',
    category: 'Commercial',
    image: '/images/services/commercial-cleaning.webp',
    description: 'Institutional entrance cleaning, marble floor buffering, and glass partition wiping.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Commercial building entrance lobby with clean floor',
    locality: 'Settipalli',
    serviceSlug: 'commercial-cleaning'
  },
  {
    id: 'bento-12',
    title: 'Rooftop Domestic Water Tank High-Pressure Wash',
    category: 'Equipment',
    image: '/images/services/water-tank-cleaning.webp',
    description: 'High-pressure jet wash, bottom mud extraction, and algae scrubbing for overhead tanks and sumps.',
    featured: false,
    bentoSpan: 'col-span-1',
    alt: 'Rooftop domestic water tank on residential terrace',
    locality: 'Daminedu',
    serviceSlug: 'water-tank-cleaning'
  }
];

/* ==========================================
 * 2. BEFORE & AFTER DATA (Static Comparisons)
 * ========================================== */
export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    serviceSlug: 'floor-deep-cleaning',
    title: 'Floor Scrubbing & Deep Cleaning',
    category: 'Before & After',
    problem: 'Dark dirt in tile lines and dull muddy stains from daily foot traffic.',
    work: 'Single-disc machine scrubbing and deep dirt extraction.',
    before: '/images/gallery/floor-before.webp',
    after: '/images/gallery/floor-after.webp',
    altBefore: 'Dull tiled floor with muddy dirt marks before cleaning',
    altAfter: 'Gleaming polished floor after rotary scrubbing',
    locality: 'Balaji Colony',
    source: 'real'
  },
  {
    id: 'ba-2',
    serviceSlug: 'kitchen-deep-cleaning',
    title: 'Kitchen Platform & Wall Degreasing',
    category: 'Before & After',
    problem: 'Sticky cooking oil grease and turmeric stains on kitchen tiles & slab.',
    work: 'Safe degreasing solution and deep scrub wash for a spotless finish.',
    before: '/images/gallery/kitchen-before.webp',
    after: '/images/gallery/kitchen-after.webp',
    altBefore: 'Greasy kitchen countertop with oil smudges before cleaning',
    altAfter: 'Spotless degreased kitchen countertop after deep clean',
    locality: 'MR Palli',
    source: 'real'
  },
  {
    id: 'ba-3',
    serviceSlug: 'bathroom-deep-cleaning',
    title: 'Bathroom Wall Tiles & Tap Cleaning',
    category: 'Before & After',
    problem: 'Hard borewell water white salt stains (uppu karalu) on taps and tiles.',
    work: 'Acid-free safe descaling liquid restoring original shine without damage.',
    before: '/images/gallery/bathroom-before.webp',
    after: '/images/gallery/bathroom-after.webp',
    altBefore: 'Cloudy bathroom tiles with hard water stains and scale',
    altAfter: 'Restored bathroom wall tiles and sparkling chrome fixtures',
    locality: 'AIR Bypass Road',
    source: 'real'
  },
  {
    id: 'ba-4',
    serviceSlug: 'sofa-cleaning',
    title: 'Fabric Sofa Shampooing & Stain Removal',
    category: 'Before & After',
    problem: 'Deep dust, food marks, and sweat stains on sofa fabric.',
    work: 'Foam shampooing and high-power vacuum water extraction.',
    before: '/images/gallery/sofa-before.webp',
    after: '/images/gallery/sofa-after.webp',
    altBefore: 'Fabric sofa with visible dirt and beverage stains before cleaning',
    altAfter: 'Freshly shampooed clean fabric sofa',
    locality: 'Bhavani Nagar',
    source: 'real'
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
    slug: 'bhk-deep-cleaning',
    title: 'Residential Cleaning',
    category: 'Apartments & Houses',
    image: '/images/services/bhk-deep-cleaning.webp',
    description: 'Complete multi-room cleaning covering floors, ceilings, fans, switchboards, and balconies.'
  },
  {
    slug: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    category: 'Offices & Facilities',
    image: '/images/services/commercial-cleaning.webp',
    description: 'Contract and one-time deep cleaning for clinics, retail outlets, banks, and institutions.'
  },
  {
    slug: 'office-deep-cleaning',
    title: 'Office Cleaning',
    category: 'Corporate Workspaces',
    image: '/images/services/office-deep-cleaning.webp',
    description: 'Desk wipe-downs, conference room sanitization, and workstation floor scrubbing.'
  },
  {
    slug: 'full-home-deep-cleaning-package',
    title: 'Deep Cleaning Packages',
    category: 'Full Property Turnover',
    image: '/images/services/full-home-deep-cleaning-package.webp',
    description: 'All-inclusive intensive cleaning covering every corner from kitchen degreasing to bathroom descaling.'
  },
  {
    slug: 'floor-deep-cleaning',
    title: 'Floor & Carpet Cleaning',
    category: 'Single-Disc Scrubbing',
    image: '/images/services/floor-deep-cleaning.webp',
    description: 'Rotary machine floor scrubbing and high-filtration carpet shampooing for stubborn stains.'
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
    title: 'Uniformed & Trained Cleaners',
    role: 'On-Site Team',
    image: '/images/team/team-equipment-kit.webp',
    description: 'Our cleaners arrive in neat uniforms with professional floor scrubbers and vacuum kits.',
    alt: 'Professional cleaning uniforms, single-disc scrubber, vacuum, and safety kit'
  },
  {
    id: 'team-2',
    title: 'Supervised Project Execution',
    role: 'Quality Lead',
    image: '/images/team/supervisor-checklist-audit.webp',
    description: 'Every job is coordinated by an experienced lead who oversees checklist completion.',
    alt: 'Supervisor quality inspection audit checklist and measurement tool'
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
    description: 'We walk through each room together with you before packing up to ensure 100% satisfaction.',
    alt: 'Final walkthrough sign-off sheet and keys ready in gleaming spotless living room'
  }
];

/* ==========================================
 * 5. EQUIPMENT ITEMS
 * ========================================== */
export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: 'eq-1',
    name: 'Rotary Single-Disc Floor Scrubber',
    category: 'Floor Restoration',
    image: '/images/equipment/floor-machine.webp',
    description: 'Heavy-duty rotating brushes that lift embedded dirt from tile, marble, and granite pores.',
    alt: 'Rotary floor scrubber machine'
  },
  {
    id: 'eq-2',
    name: 'High-Suction Wet & Dry Vacuum',
    category: 'Slurry & Dust Extraction',
    image: '/images/equipment/sofa-vacuum.webp',
    description: 'Commercial vacuum extractor for deep sofa fabric cleaning, window tracks, and slurry suction.',
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
    description: 'Our team inspects each room, checks tile stains and bathroom scale, and selects the right tools and cleaning liquids.',
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
    title: 'Machine Scrub & Deep Clean',
    description: 'We run heavy-duty rotary floor scrubbers, spray foam shampoo on upholstery, and apply surface-safe descaling liquid.',
    image: '/images/process/step-3-machine-scrub.webp',
    highlight: 'Rotary Scrubbing'
  },
  {
    stepNumber: 4,
    title: 'Fine Detailing & Wiping Dry',
    description: 'Window sliding tracks, fan blades, switch plates, and tile edges are detailed by hand and vacuumed completely dry.',
    image: '/images/process/step-4-fine-detailing.webp',
    highlight: 'Edge & Window Detailing'
  },
  {
    stepNumber: 5,
    title: 'Quality Audit & Handover',
    description: 'We conduct a room-by-room walkthrough together with you to verify every corner is clean before supervisor sign-off.',
    image: '/images/process/step-5-handover.webp',
    highlight: 'Joint Walkthrough'
  }
];
