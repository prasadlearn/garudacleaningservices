export type ServiceCategory = 'residential' | 'specialized' | 'commercial';

export type PriceModel =
  | { kind: 'fixed'; amount: number }
  | { kind: 'per-unit'; min: number; max?: number; unit: 'sq.ft' | 'window' | 'fan' | 'seat' | 'panel' }
  | { kind: 'tiers'; tiers: { label: string; amount: number | null }[] }
  | { kind: 'inspection' }
  | { kind: 'quote'; customLabel?: string };

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
    case 'per-unit':
      if (model.unit === 'sq.ft') {
        return `${formatAmount(model.min)}/sq.ft`;
      }
      return `${formatAmount(model.min)} / ${model.unit}`;
    case 'tiers': {
      const validTiers = model.tiers.filter(t => t.amount !== null && t.amount !== undefined && t.amount > 0);
      if (validTiers.length > 0) {
        return `${formatAmount(validTiers[0].amount)}`;
      }
      return 'Get a Quote';
    }
    case 'inspection':
      return 'Get a Quote';
    case 'quote':
      return model.customLabel || 'Get a Quote';
  }
};

export const getServiceHighlights = (service: ServiceItem): string[] => {
  switch (service.slug) {
    case 'home-cleaning':
    case 'bhk-deep-cleaning':
      return ['Hard-Surface Cleaning', 'Kitchen & Washrooms', 'Fans & Windows'];
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
      return ['Desk Wipe-Down', 'Surface Mopping', 'Glass Partitions'];
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

export interface InclusionFocusCard {
  tag: string;
  image: string;
  alt: string;
  title: string;
  description: string;
  benefit: string;
}

export const getServiceInclusionCards = (slug: string): InclusionFocusCard[] => {
  switch (slug) {
    case 'home-cleaning':
    case 'bhk-deep-cleaning':
    case 'full-home-deep-cleaning-package':
      return [
        {
          tag: 'Living & Bedrooms',
          image: '/images/equipment/hard-surface-clean.webp',
          alt: 'Indian apartment living room and bedroom floor cleaning',
          title: 'Living Room & Bedroom Mopping',
          description: 'Sweeping and mopping all rooms to remove dust and make floors clean and shiny.',
          benefit: 'Clean Floors & Rooms'
        },
        {
          tag: 'Kitchen & Bathroom',
          image: '/images/services/details/kitchen-stove.jpg',
          alt: 'Kitchen countertop and gas stove cleaning',
          title: 'Kitchen & Bathroom Cleaning',
          description: 'Scrubbing kitchen counters, washing sinks, and cleaning bathroom tiles and taps.',
          benefit: 'Counter & Bathroom Wash'
        }
      ];
    case 'villa-cleaning':
    case 'villa-deep-cleaning':
      return [
        {
          tag: 'All Floors & Rooms',
          image: '/images/equipment/hard-surface-clean.webp',
          alt: 'Indian villa duplex floor and staircase cleaning',
          title: 'All Floors, Stairs & Corridors',
          description: 'Complete floor washing across ground floor, upper floors, stairs, and balconies.',
          benefit: 'Full Villa Floor Cleaning'
        },
        {
          tag: 'Bathrooms & Windows',
          image: '/images/services/washroom-cleaning.webp',
          alt: 'Villa washroom tile and window cleaning',
          title: 'Attached Bathrooms & Windows',
          description: 'Scrubbing all attached bathrooms and wiping window glass and balcony doors.',
          benefit: 'Clean Bathrooms & Glass'
        }
      ];
    case 'kitchen-cleaning':
    case 'kitchen-deep-cleaning':
      return [
        {
          tag: 'Gas Stove & Platform',
          image: '/images/services/details/kitchen-stove.jpg',
          alt: 'Indian kitchen granite platform and gas stove degreasing',
          title: 'Stove & Countertop Cleaning',
          description: 'Removing sticky cooking oil from the granite platform, gas stove, and chimney surface.',
          benefit: 'Oil & Grease Removal'
        },
        {
          tag: 'Wall Tiles & Sink',
          image: '/images/services/kitchen-cleaning.webp',
          alt: 'Kitchen backsplash tile scrub and stainless steel sink cleaning',
          title: 'Wall Tiles & Stainless Sink Wash',
          description: 'Washing wall tiles behind the stove to clear oil marks and polishing the steel sink.',
          benefit: 'Clean Tiles & Steel Sink'
        }
      ];
    case 'washroom-cleaning':
    case 'bathroom-deep-cleaning':
      return [
        {
          tag: 'Commode & Floor Tiles',
          image: '/images/services/washroom-cleaning.webp',
          alt: 'Indian residential washroom commode and tile cleaning',
          title: 'Toilet Bowl & Floor Descaling',
          description: 'Removing hard water white salt marks and stains from the commode and floor tiles.',
          benefit: 'Hard Water Stain Removal'
        },
        {
          tag: 'Washbasin & Taps',
          image: '/images/services/details/washroom-basin.jpg',
          alt: 'Washbasin and chrome water tap shine in washroom',
          title: 'Washbasin & Chrome Tap Polish',
          description: 'Cleaning white scale from water taps, washbasin, and shower fittings to restore shine.',
          benefit: 'Shiny Taps & Washbasin'
        }
      ];
    case 'mattress-cleaning':
    case 'bed-cleaning':
      return [
        {
          tag: 'Dust Vacuuming',
          image: '/images/services/mattress-cleaning.webp',
          alt: 'Mattress dust and fine particle vacuum extraction',
          title: 'Deep Dust & Dirt Vacuuming',
          description: 'Vacuuming both sides of the mattress to remove trapped dust, dry dirt, and particles.',
          benefit: 'Deep Dust Removal'
        },
        {
          tag: 'Surface Refresh',
          image: '/images/services/details/mattress-surface.jpg',
          alt: 'Mattress surface spot treatment and fabric refresh in Indian bedroom',
          title: 'Spot Cleaning & Fabric Refresh',
          description: 'Gently cleaning surface sweat marks and freshening the mattress fabric for healthy sleep.',
          benefit: 'Fresh & Clean Mattress'
        }
      ];
    case 'sofa-cleaning':
      return [
        {
          tag: 'Fabric Shampoo',
          image: '/images/services/sofa-cleaning.webp',
          alt: 'Fabric sofa foam shampooing in Indian living room',
          title: 'Gentle Sofa Shampoo Cleaning',
          description: 'Applying fabric-safe foam shampoo to lift dirt, food spills, and sweat marks.',
          benefit: 'Fabric-Safe Shampoo'
        },
        {
          tag: 'Cushion Vacuuming',
          image: '/images/services/details/sofa-cushion.jpg',
          alt: 'Sofa upholstery cushion moisture and dirt extraction',
          title: 'Cushion Dirt & Water Suction',
          description: 'Vacuuming out dirty water and foam so sofa cushions dry quickly and stay clean.',
          benefit: 'Quick Drying & Clean Cushions'
        }
      ];
    case 'carpet-cleaning':
      return [
        {
          tag: 'Deep Dust Removal',
          image: '/images/services/details/carpet-texture.jpg',
          alt: 'Carpet fiber deep dust extraction in Indian home',
          title: 'Deep Dust & Sand Vacuuming',
          description: 'High-suction vacuum lifts trapped dirt, sand, and dust from inside the carpet fibers.',
          benefit: 'Deep Dust Removal'
        },
        {
          tag: 'Shampoo Wash',
          image: '/images/services/details/carpet-shampoo.jpg',
          alt: 'Clean living room area rug carpet on tiled floor in Indian home',
          title: 'Carpet Foam Shampoo & Stain Care',
          description: 'Washing out tea, coffee, and food spots with fabric-safe shampoo to make the rug soft and clean.',
          benefit: 'Soft & Clean Carpet'
        }
      ];
    case 'move-in-out-cleaning':
    case 'move-in-cleaning':
    case 'move-out-cleaning':
      return [
        {
          tag: 'Wardrobes & Shelves',
          image: '/images/services/details/move-in-wardrobes.jpg',
          alt: 'Empty Indian flat bedroom with open clean wooden wardrobe shelves',
          title: 'Bedroom Wardrobes & Cupboards Inside-Out',
          description: 'Wiping all empty shelves, bedroom wardrobes, and cabinets so they are ready for your clothes.',
          benefit: 'Clean Cupboards & Shelves'
        },
        {
          tag: 'Kitchen & Floors',
          image: '/images/services/details/move-in-kitchen.jpg',
          alt: 'Empty clean Indian kitchen with granite countertop and tiled floor',
          title: 'Empty Kitchen & Complete Floor Wash',
          description: 'Washing the kitchen counters, sink, and scrubbing all floors so your new home is ready to move in.',
          benefit: 'Move-In Ready Home'
        }
      ];
    case 'fridge-cleaning':
      return [
        {
          tag: 'Shelves & Trays',
          image: '/images/services/details/fridge-shelves.jpg',
          alt: 'Refrigerator interior clean glass shelves and vegetable drawers',
          title: 'Washing Glass Shelves & Trays',
          description: 'Taking out glass shelves and vegetable boxes, washing them with food-safe soap, and drying them.',
          benefit: 'Clean Food Storage'
        },
        {
          tag: 'Door Seals & Interior',
          image: '/images/services/fridge-cleaning.webp',
          alt: 'Refrigerator door rubber gasket and interior wall cleaning',
          title: 'Door Rubber Seals & Odor Cleaning',
          description: 'Wiping rubber door seals to remove food crumbs, mold, and trapped bad smells.',
          benefit: 'Fresh & Odor-Free'
        }
      ];
    case 'pest-control':
      return [
        {
          tag: 'Kitchen Gel Application',
          image: '/images/services/details/pest-corner.jpg',
          alt: 'Clean kitchen cabinet corner and floor skirting for pest gel placement',
          title: 'Cockroach Gel in Kitchen Cabinets',
          description: 'Placing odorless gel dots in cabinet hinges, corners, and under sinks where cockroaches hide.',
          benefit: 'Odorless & Safe for Family'
        },
        {
          tag: 'Wall & Drain Spray',
          image: '/images/services/pest-control.webp',
          alt: 'Room skirting baseboard and washroom drain pest barrier spray',
          title: 'Room Corners & Drain Spray',
          description: 'Spraying along room baseboards and bathroom drains to stop pests from entering your home.',
          benefit: 'Long-Lasting Protection'
        }
      ];
    case 'water-tank-cleaning':
      return [
        {
          tag: 'Overhead Water Tank',
          image: '/images/services/details/tank-sump.jpg',
          alt: 'Domestic rooftop plastic water storage tank on Indian terrace',
          title: 'Overhead Tank Mud & Dirty Water Removal',
          description: 'Draining dirty water and vacuuming out settled red mud, silt, and sand from rooftop plastic or concrete tanks.',
          benefit: 'Overhead Tank Cleaning'
        },
        {
          tag: 'Underground Sump',
          image: '/images/services/details/underground-sump.jpg',
          alt: 'Clean domestic underground water storage sump with clear water and open hatch in Indian house',
          title: 'Underground Sump Pressure Jet Wash',
          description: 'High-pressure water washing of underground concrete sump walls to remove green algae, white salt scaling, and silt.',
          benefit: 'Underground Sump Jet Wash'
        }
      ];
    case 'window-cleaning':
      return [
        {
          tag: 'Sliding Track',
          image: '/images/services/details/window-track.jpg',
          alt: 'Clean sliding window aluminum track and glass panel in Indian flat',
          title: 'Window Track & Grill Dusting',
          description: 'Vacuuming fine sand and dust from sliding window channels and wiping window safety grills.',
          benefit: 'Clean Window Channels'
        },
        {
          tag: 'Streak-Free Glass',
          image: '/images/services/window-cleaning.webp',
          alt: 'Window glass squeegee wipe with crystal clear clarity',
          title: 'Window Glass Cleaning',
          description: 'Wiping window glass panes with rubber squeegees for clear, streak-free glass.',
          benefit: 'Clear & Spotless Glass'
        }
      ];
    case 'glass-cleaning':
      return [
        {
          tag: 'Glass Doors & Partitions',
          image: '/images/services/details/glass-partition.jpg',
          alt: 'Clean sliding glass door and room partition in Indian apartment',
          title: 'Sliding Glass Doors & Partitions',
          description: 'Cleaning fingerprint smudges, dust, and water spots from glass doors and room partitions.',
          benefit: 'Crystal Clear Glass'
        },
        {
          tag: 'Railings & Frames',
          image: '/images/services/glass-cleaning.webp',
          alt: 'Balcony glass railing and frame cleaning',
          title: 'Balcony Glass Railing & Frame Wiping',
          description: 'Wiping balcony glass railings and metal frames with soft microfiber cloths for a clean finish.',
          benefit: 'Clean Glass & Frames'
        }
      ];
    case 'fan-cleaning':
      return [
        {
          tag: 'Blade Cleaning',
          image: '/images/services/details/fan-contrast.jpg',
          alt: 'Dark brown ceiling fan installed on ceiling in Indian bedroom',
          title: 'Fan Blade Degreasing & Dusting',
          description: 'Wiping thick, oily dust from both the top and bottom of all ceiling fan blades.',
          benefit: 'Dust-Free Fan Blades'
        },
        {
          tag: 'Motor & Rod',
          image: '/images/services/fan-cleaning.webp',
          alt: 'Ceiling fan motor housing and downrod wipe down',
          title: 'Motor Body & Hanging Rod Dusting',
          description: 'Dusting the fan motor body and rod carefully without touching electrical wires.',
          benefit: 'Clean Motor Body'
        }
      ];
    case 'post-construction-cleaning':
      return [
        {
          tag: 'Paint & Cement Spots',
          image: '/images/services/post-construction-cleaning.webp',
          alt: 'Post renovation paint drops and cement splatter scraping on tiles',
          title: 'Scraping Paint & Cement Drops',
          description: 'Carefully removing paint drops, plaster marks, and tile adhesive without scratching the floor.',
          benefit: 'Paint & Cement Removal'
        },
        {
          tag: 'Floor Dust Vacuuming',
          image: '/images/equipment/hard-surface-clean.webp',
          alt: 'Post construction fine cement dust vacuum extraction',
          title: 'Deep Dust Vacuuming & Floor Scrub',
          description: 'Vacuuming fine white construction dust from floor corners and washing tiles clean.',
          benefit: 'Ready to Move In'
        }
      ];
    case 'office-cleaning':
    case 'office-deep-cleaning':
      return [
        {
          tag: 'Desks & Workstations',
          image: '/images/services/details/office-desk.jpg',
          alt: 'Indian office workstation desk with computer monitor and chair',
          title: 'Office Desks & Workstations',
          description: 'Wiping computer tables, keyboards, chairs, and executive cabins clean of dust.',
          benefit: 'Clean Desks & Cabins'
        },
        {
          tag: 'Floors & Glass Doors',
          image: '/images/services/office-cleaning.webp',
          alt: 'Office corridor floor mopping and glass door cleaning',
          title: 'Corridor Floors & Glass Doors',
          description: 'Mopping office floors, cleaning meeting room tables, and wiping entrance glass doors.',
          benefit: 'Neat Office Space'
        }
      ];
    case 'shop-cleaning':
      return [
        {
          tag: 'Aisles & Floors',
          image: '/images/services/details/shop-aisle.jpg',
          alt: 'Indian supermarket grocery aisle with clean tiled floor',
          title: 'Supermarket Aisles & Floor Cleaning',
          description: 'Sweeping and washing grocery aisles and customer walkways to keep floors clean and neat.',
          benefit: 'Clean Store Aisles'
        },
        {
          tag: 'Glass Showcase & Counter',
          image: '/images/services/details/shop-counter.jpg',
          alt: 'Indian supermarket billing counter with glass display showcase and groceries on shelves',
          title: 'Billing Counter & Glass Showcase',
          description: 'Dusting display counters, glass showcases, and wiping cash billing desks streak-free.',
          benefit: 'Neat Display Counters'
        }
      ];
    case 'hotel-guest-house-cleaning':
      return [
        {
          tag: 'Guest Rooms',
          image: '/images/services/hotel-guest-house-cleaning.webp',
          alt: 'Mid-range Indian hotel guest bedroom cleaning',
          title: 'Guest Room & Furniture Cleaning',
          description: 'Quick cleaning of guest rooms, making beds neat, mopping floors, and dusting tables.',
          benefit: 'Clean Guest Rooms'
        },
        {
          tag: 'Attached Bathrooms',
          image: '/images/services/washroom-cleaning.webp',
          alt: 'Hotel attached washroom tile cleaning and commode sanitization',
          title: 'Attached Bathroom Sanitization',
          description: 'Scrubbing bathroom wall tiles, cleaning the commode, and polishing taps for new guests.',
          benefit: 'Shiny & Sanitized Bathrooms'
        }
      ];
    case 'school-classroom-cleaning':
      return [
        {
          tag: 'Benches & Desks',
          image: '/images/services/school-classroom-cleaning.webp',
          alt: 'Indian school student wooden desks and benches in classroom',
          title: 'Student Desks & Benches',
          description: 'Wiping wooden benches, student desks, and teacher tables clean of dust and marks.',
          benefit: 'Clean Student Benches'
        },
        {
          tag: 'Corridors & Classrooms',
          image: '/images/services/details/school-corridor.jpg',
          alt: 'Clean Indian school corridor hallway with open classroom doors',
          title: 'Corridor Floors & Classroom Entry',
          description: 'Sweeping and washing open school veranda corridors, classroom floors, and entrance doorways.',
          benefit: 'Clean School Corridors'
        }
      ];
    default:
      return [
        {
          tag: 'Surface Care',
          image: '/images/equipment/hard-surface-clean.webp',
          alt: 'Surface cleaning and detailing',
          title: 'Surface Cleaning & Detailing',
          description: 'Thorough cleaning with safe cleaning solutions suited for the task.',
          benefit: 'Surface-Safe Care'
        }
      ];
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
      'Thorough hard-surface floor cleaning and mopping across living room, bedrooms, and dining area',
      'Kitchen platform degreasing, steel sink wash, and outer cabinet wipe-down',
      'Washroom wall and floor tile descaling, commode sanitization, and tap shine',
      'Window glass cleaning, sliding track vacuuming, and safety grille wiping',
      'Ceiling fan wiping, switchboard cleaning, and door frame dusting'
    ],
    inclusions: [
      'Thorough hard-surface floor cleaning and mopping across living room, bedrooms, and dining area',
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
    id: 'sofa-cleaning',
    slug: 'sofa-cleaning',
    title: 'Sofa Cleaning',
    name: 'Sofa Cleaning',
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
    price: { kind: 'per-unit', min: 249, unit: 'seat' },
    unitLabel: 'seat',
    image: '/images/services/sofa-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'villa-cleaning',
    slug: 'villa-cleaning',
    title: 'Villa Cleaning',
    name: 'Villa Cleaning',
    category: 'residential',
    icon: 'Building2',
    shortDescription: 'Complete cleaning for independent houses, duplexes, and multi-floor villas in Tirupati.',
    shortDesc: 'Complete cleaning for independent houses, duplexes, and multi-floor villas in Tirupati.',
    whatsIncluded: [
      'Thorough hard-surface floor cleaning and mopping for all room floors, halls, and corridors',
      'All washrooms cleaned, tiles descaled, and hard water marks removed',
      'Kitchen platform washing, counter degreasing, and stove grease removal',
      'Staircase railings, balconies, sit-outs, and open terrace washing',
      'Windows, sliding tracks, grilles, ceiling fans, and doors cleaned'
    ],
    inclusions: [
      'Thorough hard-surface floor cleaning and mopping for all room floors, halls, and corridors',
      'All washrooms cleaned, tiles descaled, and hard water marks removed',
      'Kitchen platform washing, counter degreasing, and stove grease removal',
      'Staircase railings, balconies, sit-outs, and open terrace washing',
      'Windows, sliding tracks, grilles, ceiling fans, and doors cleaned'
    ],
    enabled: true,
    price: { kind: 'quote', customLabel: 'Get a Quote' },
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
      'Hard-surface floor cleaning and fine dust extraction across all rooms',
      'Window channels vacuumed, glass wiped streak-free, and main door cleaned'
    ],
    inclusions: [
      'Cupboards, wardrobes, and kitchen shelves cleaned inside and outside',
      'Complete washroom sanitization, tile scrubbing, and commode descaling',
      'Kitchen counter, sink, and storage areas washed and degreased',
      'Hard-surface floor cleaning and fine dust extraction across all rooms',
      'Window channels vacuumed, glass wiped streak-free, and main door cleaned'
    ],
    enabled: true,
    price: { kind: 'fixed', amount: 1499 },
    image: '/images/services/move-in-out-cleaning.webp',
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
      'Kitchen floor washed and degreased to remove sticky oil stains'
    ],
    inclusions: [
      'Kitchen granite platform and wall tiles cleaned with oil degreaser',
      'Exhaust fan blades and chimney mesh exterior wiped clean',
      'Stainless steel sink washed and water marks removed from taps',
      'Outer surfaces of kitchen cabinets and drawers wiped clean',
      'Kitchen floor washed and degreased to remove sticky oil stains'
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
    shortDescription: 'Drains dirty water, removes bottom mud, scrubs wall algae, and sanitizes overhead water tanks and underground sumps in Tirupati.',
    shortDesc: 'Drains dirty water, removes bottom mud, scrubs wall algae, and sanitizes overhead water tanks and underground sumps in Tirupati.',
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
    price: { kind: 'fixed', amount: 199 },
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
    price: { kind: 'fixed', amount: 149 },
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
    price: { kind: 'fixed', amount: 99 },
    unitLabel: 'fan',
    image: '/images/services/fan-cleaning.webp',
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
      'Final hard-surface floor scrub and dry mop polish'
    ],
    inclusions: [
      'Careful scraping of paint drops and cement stains from floor tiles',
      'Fine white plaster and cement dust vacuuming from all corners and ledges',
      'Window glass, aluminum sliding tracks, and frame tape removal',
      'Switchboards, door frames, and electrical fittings wiped clean',
      'Final hard-surface floor scrub and dry mop polish'
    ],
    enabled: true,
    price: { kind: 'per-unit', min: 5, unit: 'sq.ft' },
    unitLabel: 'sq.ft',
    image: '/images/services/post-construction-cleaning.webp',
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
      'Hard-surface floor cleaning and mopping across hallways and cabins',
      'Conference room table and reception area detailing',
      'Office washroom and pantry cleaning',
      'Glass partition wiping and main door glass shine'
    ],
    inclusions: [
      'Workstation desks and office chairs wiped and dusted',
      'Hard-surface floor cleaning and mopping across hallways and cabins',
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
    shortDescription: 'Floor cleaning, glass front washing, and shelf dusting for retail shops and showrooms.',
    shortDesc: 'Floor cleaning, glass front washing, and shelf dusting for retail shops and showrooms.',
    whatsIncluded: [
      'Retail showroom floor cleaning and mopping',
      'Front glass entrance and display window cleaning',
      'Billing counter and display shelf dusting',
      'Stock room and trial room floor wash',
      'Signboard border and shutter area dusting'
    ],
    inclusions: [
      'Retail showroom floor cleaning and mopping',
      'Front glass entrance and display window cleaning',
      'Billing counter and display shelf dusting',
      'Stock room and trial room floor wash',
      'Signboard border and shutter area dusting'
    ],
    enabled: true,
    price: { kind: 'quote', customLabel: 'Get a Quote' },
    image: '/images/services/shop-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'hotel-guest-house-cleaning',
    slug: 'hotel-guest-house-cleaning',
    title: 'Hotel & Guest House Cleaning',
    name: 'Hotel & Guest House Cleaning',
    category: 'commercial',
    icon: 'Hotel',
    shortDescription: 'Complete cleaning for hotel rooms, guest lodges, and pilgrim stay rooms in Tirupati.',
    shortDesc: 'Complete cleaning for hotel rooms, guest lodges, and pilgrim stay rooms in Tirupati.',
    whatsIncluded: [
      'Guest room floor cleaning and bed area dusting',
      'Attached washroom tile descaling and commode sanitization',
      'Mattress vacuuming and headboard wiping',
      'Lobby, staircase, and hallway washing',
      'Window glass and door frame cleaning'
    ],
    inclusions: [
      'Guest room floor cleaning and bed area dusting',
      'Attached washroom tile descaling and commode sanitization',
      'Mattress vacuuming and headboard wiping',
      'Lobby, staircase, and hallway washing',
      'Window glass and door frame cleaning'
    ],
    enabled: true,
    price: { kind: 'quote', customLabel: 'Get a Quote' },
    image: '/images/services/hotel-guest-house-cleaning.webp',
    imageSource: 'illustrative'
  },
  {
    id: 'school-classroom-cleaning',
    slug: 'school-classroom-cleaning',
    title: 'School & Classroom Cleaning',
    name: 'School & Classroom Cleaning',
    category: 'commercial',
    icon: 'GraduationCap',
    shortDescription: 'Sanitizing school classrooms, student benches, desks, corridors, and restrooms.',
    shortDesc: 'Sanitizing school classrooms, student benches, desks, corridors, and restrooms.',
    whatsIncluded: [
      'Classroom floor cleaning and hallway washing',
      'Student bench and desk wipe-down',
      'Blackboard and whiteboard border dusting',
      'Student washroom sanitization and washing',
      'Window sills and classroom doors wiped'
    ],
    inclusions: [
      'Classroom floor cleaning and hallway washing',
      'Student bench and desk wipe-down',
      'Blackboard and whiteboard border dusting',
      'Student washroom sanitization and washing',
      'Window sills and classroom doors wiped'
    ],
    enabled: true,
    price: { kind: 'quote', customLabel: 'Get a Quote' },
    image: '/images/services/school-classroom-cleaning.webp',
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
