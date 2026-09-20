export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Specialized';
  shortDesc: string;
  fullDesc: string;
  priceStarting: string;
  duration: string;
  image: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  process: string[];
  equipment: string[];
  bhkPricing?: { type: string; price: string; time: string }[];
  faqs: { q: string; a: string }[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'home-deep-cleaning',
    slug: 'home-deep-cleaning',
    title: 'Full Home Deep Cleaning',
    category: 'Residential',
    shortDesc: 'Room-by-room intensive machine scrubbing, sanitization, and high-dust extraction for apartments, duplexes & villas in Tirupati.',
    fullDesc: 'Our flagship residential deep cleaning service combines heavy-duty single-disc mechanical scrubbers, HEPA dry/wet vacuum extractors, and surface-safe biological sanitizers to revitalize every corner of your home. Perfect for festival prep, pre-housewarming, post-tenancy, or annual deep sanitation.',
    priceStarting: '₹2,999',
    duration: '4 - 7 Hours',
    image: '/images/hero-interior.jpg',
    highlights: ['Single-disc rotary floor scrubbing', 'All rooms, kitchen & bathrooms covered', 'Fans, glass, switchboards detailed', 'Diversey / Taski eco-safe chemicals'],
    inclusions: [
      'Vitrified, marble & granite floor mechanical single-disc scrubbing',
      'High-ceiling cobweb extraction and fan blade degreasing',
      'Window channels, glass wiping & stainless steel grille cleaning',
      'All door surfaces, handles, and wooden frames wiped and polished',
      'Balconies, utility wash areas, and floor drains pressure-scrubbed',
      'Switchboards, AC exterior panels, and light fittings detailed',
      'Complete wall spot wipe-down and dust elimination'
    ],
    exclusions: [
      'Inside locked cupboards or personal wardrobes (unless explicitly requested empty)',
      'Exterior facade rope-access high-rise window cleaning',
      'Removal of heavy civil debris or cement splatter from fresh masonry'
    ],
    process: [
      'Site inspection & identification of stubborn grease / hard water stains',
      'High-level vacuuming: fans, false ceiling coves, and window channels',
      'Chemical application: Taski neutral floor cleaners & specialized degreasers',
      'Mechanical rotary scrubbing and wet industrial vacuum suction',
      'Final sanitizing wipe-down and joint customer inspection handover'
    ],
    equipment: ['Heavy-Duty Single Disc Machine', 'Taski R2 & R4 Neutral Cleaners', 'Industrial Wet & Dry Vacuum', 'Color-coded Microfiber Wipes', 'Telescopic Dusting Rods'],
    bhkPricing: [
      { type: '1 BHK Apartment', price: '₹2,999', time: '3.5 - 4.5 hrs' },
      { type: '2 BHK Apartment', price: '₹3,999', time: '4.5 - 5.5 hrs' },
      { type: '3 BHK Apartment', price: '₹4,999', time: '5.5 - 7.0 hrs' },
      { type: '4 BHK / Duplex', price: '₹6,499', time: '7.0 - 9.0 hrs' },
      { type: 'Independent Villa', price: '₹7,999+', time: 'Full Day Team' }
    ],
    faqs: [
      { q: 'How many professionals will come for my home deep cleaning?', a: 'Depending on your house size (1 BHK vs 3 BHK vs Villa), a certified team of 3 to 6 uniformed specialists equipped with machines will be deployed under a senior supervisor.' },
      { q: 'Do I need to supply water and electricity?', a: 'Yes, our industrial vacuum and rotary floor scrubbers require standard electrical outlets and running tap water.' },
      { q: 'Are the cleaning chemicals safe for kids and elderly parents?', a: 'Absolutely. We strictly use pH-neutral, non-hazardous Taski / Diversey formulations that emit zero corrosive acid fumes.' }
    ]
  },
  {
    id: 'bathroom-cleaning',
    slug: 'bathroom-cleaning',
    title: 'Bathroom Acid-Free Descaling & Disinfection',
    category: 'Residential',
    shortDesc: 'Complete hard-water mineral stain elimination from glass partitions, ceramic tiles, and sanitaryware.',
    fullDesc: 'Tirupati groundwater typically contains high calcium and TDS levels, causing stubborn whitish scale on tiles and cloudy shower glass. We use industrial acid-free descalers that restore chrome and glass without eroding tile grout or damaging fittings.',
    priceStarting: '₹899',
    duration: '1.5 - 2.5 Hours',
    image: '/images/bathroom-clean.jpg',
    highlights: ['Hard water scale removal without acids', 'Shower glass limescale restoration', 'Mirror & tap chrome mirror-buffing', 'Commode internal & external disinfection'],
    inclusions: [
      'Full wall tile machine scrubbing & limescale removal',
      'Toilet commode internal siphon descaling & rim sanitation',
      'Shower glass partition & enclosure water-spot clearing',
      'Taps, showerheads & mixers buffed to mirror finish with Taski R9',
      'Floor tile grout restoration & anti-bacterial steam fogging',
      'Exhaust fan, geyser exterior & mirror wipe-down'
    ],
    exclusions: ['Broken tile replacement or silicone re-caulking', 'Severe aged acid-burn damage caused by previous harsh muriatic acid use'],
    process: [
      'Application of organic descaling foam to dissolve calcium crust',
      'Agitation using non-scratch scrubbing pads & rotary grout brushes',
      'Glass polish treatment with specialized mineral dissolver',
      'High-pressure rinse and wet vacuum moisture extraction',
      'Sanitizing buff and pleasant anti-bacterial fragrance mist'
    ],
    equipment: ['Rotary Tile Scrubber', 'Taski R1 Bathroom Sanitizer', 'Taski R9 Descaler', 'Glass Squeegee & Scrapers', 'Microfiber Buffing Towels'],
    bhkPricing: [
      { type: '1 Bathroom Express Descale', price: '₹899', time: '1.5 hrs' },
      { type: '2 Bathrooms Combo', price: '₹1,599', time: '2.5 hrs' },
      { type: '3 Bathrooms Complete', price: '₹2,199', time: '3.5 hrs' },
      { type: '4+ Bathrooms / Villa Package', price: '₹2,699', time: '4.5 hrs' }
    ],
    faqs: [
      { q: 'Will the cleaning remove yellow hard-water stains on bathroom tiles?', a: 'Yes! Our organic descaling formula safely melts away calcium and magnesium salt deposits without eroding your tile enamel.' },
      { q: 'Does it smell like harsh acid?', a: 'No. We strictly prohibit hazardous muriatic acid. Our products leave a subtle, fresh, hospital-clean scent.' }
    ]
  },
  {
    id: 'kitchen-cleaning',
    slug: 'kitchen-cleaning',
    title: 'Modular Kitchen Deep Degreasing',
    category: 'Residential',
    shortDesc: 'Intense steam and chemical degreasing for chimneys, backsplash tiles, stovetops, and exterior cabinetry.',
    fullDesc: 'Tirupati cooking involves high-heat oils and aromatic spices that leave stubborn greasy films on tiles and cabinets. Our specialized food-safe degreasers dissolve baked-on oils without dulling laminate finishes or damaging expensive quartz surfaces.',
    priceStarting: '₹1,499',
    duration: '2 - 3 Hours',
    image: '/images/kitchen-clean.jpg',
    highlights: ['Chimney exterior & baffle filters degreased', 'Tile backsplash oil film extraction', 'Modular cabinet exterior polish', 'Stainless steel sink chrome shine'],
    inclusions: [
      'Exhaust fan & chimney baffle filter degreasing bath',
      'Backsplash ceramic tile oil film dissolution & grout scrub',
      'Modular cabinet shutter exteriors wiped & conditioned',
      'Granite / quartz countertop stain polishing',
      'Gas stovetop, burner rims & knob detailing',
      'Under-sink area sanitization & drain line de-greasing'
    ],
    exclusions: ['Dismantling internal motor of electrical chimneys', 'Internal cleaning of cabinets filled with utensils (available as add-on)'],
    process: [
      'Food-safe degreaser spray on baffle filters and tile backsplash',
      'Dwell time breakdown of hardened oils and grease deposits',
      'Rotary brush detailing around stove knobs, grooves & edges',
      'High-temp steam wipe-down of grease splatter',
      'Stainless steel chrome buffing and anti-pest cabinet wipe'
    ],
    equipment: ['Heavy Degreaser Formulation', 'Steam Detailing Machine', 'Baffle Filter Soaking Tray', 'Non-Abrasive Scouring Pads'],
    bhkPricing: [
      { type: 'Standard Modular Kitchen', price: '₹1,499', time: '2.0 hrs' },
      { type: 'Large Kitchen + Chimney Deep Clean', price: '₹1,999', time: '3.0 hrs' },
      { type: 'Kitchen + Cabinets Inside & Outside', price: '₹2,499', time: '4.0 hrs' }
    ],
    faqs: [
      { q: 'Do I need to empty all kitchen cabinets?', a: 'For standard exterior degreasing, cabinets can remain closed. If you choose the full internal detailing add-on, you may empty utensils or our team can assist.' }
    ]
  },
  {
    id: 'sofa-cleaning',
    slug: 'sofa-cleaning',
    title: 'Sofa & Upholstery Deep Extraction Spa',
    category: 'Specialized',
    shortDesc: 'German injection-extraction shampooing that extracts dust mites, juice spills, and sweat odors from fabric sofas.',
    fullDesc: 'Everyday usage leaves dust mites, sweat, and stains deep inside foam cushions. Our German injection-extraction machines shoot enzymatic shampoo into the fabric and instantly vacuum out the muddy residue, leaving couches hygienic and fresh.',
    priceStarting: '₹799',
    duration: '1 - 2 Hours',
    image: '/images/sofa-clean.jpg',
    highlights: ['Deep injection shampooing', 'Stubborn stain pre-spotting', 'Rapid 3-4 hour dry time', 'Fabric fiber rejuvenation'],
    inclusions: [
      'High-suction dry vacuuming for surface dust & pet hair',
      'Spot stain treatment for food, ink, tea and beverage stains',
      'Enzymatic foam shampoo injection into cushion layers',
      'High-vacuum extraction removing dirty moisture & allergens',
      'Deodorizing fabric perfume application'
    ],
    exclusions: ['Re-dyeing sun-bleached fabric', 'Repairing torn stitching or cracked leatherette'],
    process: [
      'Fabric colorfastness test on hidden edge',
      'Powerful dry vacuuming to remove loose debris',
      'Injection of mild foaming cleaning agent',
      'Agitation with soft upholstery horsehair brush',
      'High-suction twin-motor moisture extraction'
    ],
    equipment: ['German Injection-Extraction Machine', 'Enzymatic Fabric Shampoo', 'Upholstery Hand Tool', 'Fabric Stain Spotters'],
    bhkPricing: [
      { type: '3-Seater Fabric Sofa', price: '₹799', time: '1.0 hr' },
      { type: '5-Seater (3+1+1 or 3+2)', price: '₹1,199', time: '1.5 hrs' },
      { type: '7-Seater L-Shape Sectional', price: '₹1,599', time: '2.0 hrs' },
      { type: 'Recliner Chair', price: '₹499 / seat', time: '30 mins' },
      { type: 'Dining Chairs Set of 6', price: '₹799', time: '1.0 hr' }
    ],
    faqs: [
      { q: 'How long does it take for the sofa to dry completely?', a: 'Our high-power vacuum extracts 90% of moisture during the process. Under ceiling fan airflow, the sofa dries fully within 3 to 4 hours.' }
    ]
  },
  {
    id: 'carpet-cleaning',
    slug: 'carpet-cleaning',
    title: 'Carpet Deep Shampooing & Sanitization',
    category: 'Specialized',
    shortDesc: 'Deep dust beating, stain removal, and steam extraction for living room rugs and wall-to-wall office carpets.',
    fullDesc: 'Carpets trap kilograms of fine Tirupati road dust and allergens over time. Our mechanized cylindrical counter-rotating brush shampooers agitate deep pile fibers, dislodging packed dirt before industrial suction extracts the trapped mud.',
    priceStarting: '₹699',
    duration: '1 - 2 Hours',
    image: '/images/cleaning-team.jpg',
    highlights: ['Pile lifting & anti-flattening', 'High-temp steam sanitization', 'Zero chemical odor', 'Allergen & mite elimination'],
    inclusions: [
      'Heavy dual-motor dry vacuuming',
      'Pre-spray enzyme stain treatment',
      'Rotary counter-brush shampoo agitation',
      'Warm water extraction & rinse pass',
      'Fast-dry dehumidifying airflow sweep'
    ],
    exclusions: ['Antique silk oriental rugs requiring chemical dry cleaning only'],
    process: [
      'Fiber inspection & color test',
      'Deep mechanical dry vacuuming',
      'Even spray of foam shampoo',
      'Twin-brush pile agitation',
      'High-vacuum extraction'
    ],
    equipment: ['Carpet Extractor 1200W', 'CRB Counter Rotating Brush', 'Spotting Agents'],
    bhkPricing: [
      { type: 'Small Bedside Rug (up to 25 sqft)', price: '₹699', time: '45 mins' },
      { type: 'Medium Living Room Carpet (up to 50 sqft)', price: '₹999', time: '1 hr' },
      { type: 'Large Persian / Luxury Carpet (up to 100 sqft)', price: '₹1,499', time: '1.5 hrs' },
      { type: 'Commercial Wall-to-Wall Office Carpet', price: '₹5 / sq.ft', time: 'Scheduled' }
    ],
    faqs: [
      { q: 'Will the carpet colors bleed?', a: 'No, we conduct a color-fastness test on a corner before starting shampooing.' }
    ]
  },
  {
    id: 'villa-cleaning',
    slug: 'villa-cleaning',
    title: 'Luxury Villa & Duplex Deep Detailing',
    category: 'Residential',
    shortDesc: 'Dedicated multi-crew specialized deep cleaning for large villas, gated communities, and bungalows in Tirupati.',
    fullDesc: 'Independent houses and villas require comprehensive exterior and interior care. From terrace water-jet washing and compound floor scrubbing to double-height staircases, chandelier dusting, and multiple bathrooms, we assign a dedicated supervisor and full crew.',
    priceStarting: '₹7,999',
    duration: '6 - 10 Hours',
    image: '/images/hero-cleaner.png',
    highlights: ['Multi-specialist crew with supervisor', 'Terrace & portico pressure washing', 'Double-height glass & chandeliers', 'All bedrooms, bathrooms & kitchens'],
    inclusions: [
      'Complete interior room-by-room deep machine scrub',
      'Balconies, sit-outs & porch high-pressure washing',
      'Terrace surface sweep & algae wash',
      'Window panes, glass railings & staircase banisters',
      'Compound paving & garage oil stain scrub'
    ],
    exclusions: ['Exterior garden landscaping or tree trimming'],
    process: [
      'Comprehensive pre-service site walkthrough',
      'Simultaneous multi-zone cleaning team deployment',
      'Machine rotary scrubbing of all floors',
      'All bathrooms and modular kitchens detailed concurrently',
      'Joint checklist signoff with villa owner'
    ],
    equipment: ['High Pressure Jet Washer (140 Bar)', 'Multiple Single Disc Scrubbers', 'Heavy Duty Wet Extractors', 'Aluminium Extension Ladders'],
    bhkPricing: [
      { type: '3 BHK Duplex Villa (up to 2500 sqft)', price: '₹7,999', time: '6-8 hrs' },
      { type: '4 BHK Luxury Villa (up to 3500 sqft)', price: '₹9,999', time: '8 hrs' },
      { type: '5+ BHK Grand Villa / Estate', price: '₹12,999+', time: 'Full Day' }
    ],
    faqs: [
      { q: 'Do you clean the terrace and car parking?', a: 'Yes! Terrace wash, portico scrubbing, and car parking pressure wash are all included in our villa packages.' }
    ]
  },
  {
    id: 'floor-scrubbing-polishing',
    slug: 'floor-scrubbing-polishing',
    title: 'Mechanized Floor Scrubbing & Buffing',
    category: 'Specialized',
    shortDesc: 'Single-disc heavy rotary scrubbers restoring dull vitrified, marble, and mosaic flooring.',
    fullDesc: 'Regular mopping spreads dirty water into microscopic tile pores and grout lines over months. Our industrial single-disc floor scrubbers strip away micro-abrasions, grime, and grease to restore the original gloss of your flooring.',
    priceStarting: '₹1,999',
    duration: '2 - 4 Hours',
    image: '/images/floor-clean.jpg',
    highlights: ['Heavy single-disc machine scrubbing', 'Grout line grime extraction', 'Vitrified & granite compatible', 'Anti-slip buffing finish'],
    inclusions: [
      'Machine rotary pad scrub with neutral emulsifiers',
      'Deep grout line brushing & stain removal',
      'Wet industrial vacuum slurry suction',
      'Clean water neutralization pass',
      'Microfiber high-speed buffing for gloss enhancement'
    ],
    exclusions: ['Diamond crystallization polishing (available upon special request)'],
    process: [
      'Dry sweep & area perimeter boundary masking',
      'Uniform chemical slurry dispensing',
      'Rotary mechanical scrubbing across cross-grid patterns',
      'Instant wet vacuuming preventing soil redeposition',
      'High-speed dry buffer polish'
    ],
    equipment: ['Single-Disc Machine 17-Inch', 'Red & White Buffing Pads', 'Taski Spiral Degreaser'],
    bhkPricing: [
      { type: 'Up to 600 sq.ft', price: '₹1,999', time: '2 hrs' },
      { type: '600 - 1200 sq.ft', price: '₹2,999', time: '3 hrs' },
      { type: '1200 - 2000 sq.ft', price: '₹3,999', time: '4 hrs' },
      { type: 'Above 2000 sq.ft', price: '₹1.8 / sq.ft', time: 'Custom' }
    ],
    faqs: [
      { q: 'Will machine scrubbing damage my tile glaze?', a: 'Not at all. We use specialized soft non-abrasive 3M buffing pads designed specifically for high-gloss vitrified tiles.' }
    ]
  },
  {
    id: 'office-commercial-cleaning',
    slug: 'office-commercial-cleaning',
    title: 'Office & Commercial Property Detailing',
    category: 'Commercial',
    shortDesc: 'Tailored deep cleaning for IT offices, clinics, retail showrooms, banks, and schools in Tirupati.',
    fullDesc: 'We understand business continuity. We offer scheduled night and weekend cleaning contracts for commercial premises in Tirupati, keeping your workstations, conference rooms, and washrooms spotlessly sanitized for clients and staff.',
    priceStarting: 'Custom Quote',
    duration: 'Flexible / Scheduled',
    image: '/images/office-clean.jpg',
    highlights: ['After-hours & weekend slots', 'Hospital-grade sanitization', 'Workstation & glass cleaning', 'GST billing & SLA contracts'],
    inclusions: [
      'Workstation desks, chairs & keyboard sanitization',
      'Server room anti-static dry cleaning',
      'Glass facades & partition streak-free wiping',
      'Commercial restroom disinfection & fragrance dispensers',
      'Common area tile scrubbing & carpet shampooing'
    ],
    exclusions: ['Handling active server cables or disassembling proprietary hardware'],
    process: [
      'Site audit and customized SLA schedule setup',
      'Designated supervisor and badged cleaning team',
      'Sequential zone execution without interrupting business',
      'Supervisor checklist audit and signoff'
    ],
    equipment: ['HEPA Dry Vacuums', 'Commercial Restroom Steamers', 'Anti-Static Cloths'],
    bhkPricing: [
      { type: 'Small Clinic / Office (< 800 sqft)', price: '₹2,999', time: '3 hrs' },
      { type: 'Medium Office (800 - 2000 sqft)', price: '₹4,999', time: '5 hrs' },
      { type: 'Corporate Facility (> 2000 sqft)', price: 'Custom Quote', time: 'Scheduled' }
    ],
    faqs: [
      { q: 'Can you work on Sundays or at night?', a: 'Yes, our commercial crews are available 24/7 for scheduled shifts to ensure zero disruption to your daily operations.' }
    ]
  },
  {
    id: 'pest-control',
    slug: 'pest-control',
    title: 'Pest Control & Anti-Termite Solutions',
    category: 'Specialized',
    shortDesc: 'Odorless herbal gel pest control for cockroaches, bed bugs, ants, termites, and mosquitoes in Tirupati.',
    fullDesc: 'Pests carry bacteria and ruin woodwork. We deploy government-certified, odorless gel formulations and targeted spray treatments that eradicate cockroaches and pests without requiring you to vacate your kitchen or bedrooms.',
    priceStarting: '₹799',
    duration: '1 - 2 Hours',
    image: '/images/cleaning-crew.png',
    highlights: ['100% odorless herbal gel', 'No need to empty kitchen cabinets', '6-month re-service warranty', 'Approved by Central Insecticide Board'],
    inclusions: [
      'Kitchen cabinet cockroach gel dotting',
      'Drain and sink crevice spray treatment',
      'Door frame and baseboard perimeter spray',
      'Bed bug crack & mattress seam steaming',
      'Bathroom and utility drain insect block'
    ],
    exclusions: ['Fumigation requiring 24-hour evacuation (available on industrial request)'],
    process: [
      'Pest harborage site inspection',
      'Gel bait application in electrical appliances & hinges',
      'Low-toxicity residual perimeter spray',
      'Preventative drain seal and post-care guidance'
    ],
    equipment: ['Micro-Dose Gel Guns', 'Compressed Pressure Sprayers', 'Odorless Formulations'],
    bhkPricing: [
      { type: '1 BHK Cockroach & Ant Control', price: '₹799', time: '45 mins' },
      { type: '2 BHK Complete Home', price: '₹999', time: '1 hr' },
      { type: '3 BHK Complete Home', price: '₹1,299', time: '1.5 hrs' },
      { type: 'Bed Bug Eradication (2 Visits)', price: '₹1,999', time: '2 Visits' }
    ],
    faqs: [
      { q: 'Do we have to leave the house after pest control?', a: 'No! Our odorless Bayer gel technology is completely safe and requires no evacuation or emptying of kitchen shelves.' }
    ]
  },
  {
    id: 'painting',
    slug: 'painting',
    title: 'Home Painting & Waterproofing Services',
    category: 'Specialized',
    shortDesc: 'Dust-free mechanized wall sanding, Asian Paints interior/exterior painting & dampness waterproofing.',
    fullDesc: 'Revamp your home with dust-free mechanized wall sanding and premium finishes from Asian Paints and Berger. Our trained painters provide laser measurements, floor masking protection, and clean handovers.',
    priceStarting: '₹10 / sq.ft',
    duration: '2 - 5 Days',
    image: '/images/hero-interior.jpg',
    highlights: ['Mechanized dust-free sanding', 'Laser site measurement', 'Complete furniture masking', 'Asian Paints / Berger certified'],
    inclusions: [
      'Flooring, furniture & switchboard protective plastic masking',
      'Wall putty leveling and crack filling',
      'Vacuum-assisted mechanized sanding (90% less dust)',
      '2 coats of primer & 2 coats of premium emulsion',
      'Post-painting cleanup and shine'
    ],
    exclusions: ['Structural civil wall rebuilding'],
    process: [
      'Moisture meter wall inspection & shade selection',
      'Protective masking of all floors & fixtures',
      'Mechanized sanding and primer application',
      'Dual roller coat application',
      'Unmasking and complete deep cleaning cleanup'
    ],
    equipment: ['Mechanized Sanding Machines with Vacuum', 'Laser Distance Measurer', 'Airless Paint Sprayers'],
    bhkPricing: [
      { type: '1 BHK Rental Refresh (Tractor Emulsion)', price: '₹6,999+', time: '2 Days' },
      { type: '2 BHK Premium Paint (Royale / Apcolite)', price: '₹11,999+', time: '3 Days' },
      { type: '3 BHK Full Interior + Ceiling', price: '₹16,999+', time: '4 Days' },
      { type: 'Waterproofing per sq.ft', price: '₹35 / sq.ft', time: 'Custom' }
    ],
    faqs: [
      { q: 'Is furniture covered before painting?', a: 'Yes! We bring heavy plastic drop sheets and masking tape to protect all furniture, electronics, and floor tiles.' }
    ]
  }
];
