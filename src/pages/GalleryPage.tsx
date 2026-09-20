import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, Phone, Sparkles, X, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  image: string;
  location: string;
  description: string;
  beforeAfter?: {
    beforeText: string;
    afterText: string;
  };
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: '1',
    category: 'Home Deep Cleaning',
    title: 'Living Room Vitrified Tile Deep Scrubbing',
    image: '/images/hero-interior.jpg',
    location: 'Balaji Colony, Tirupati',
    description: 'Rotary single-disc mechanical scrubbing stripping off 3 years of dirt accumulation from grout lines and high-traffic areas.',
    beforeAfter: {
      beforeText: 'Dull yellowed tile grout & sticky residues',
      afterText: 'Polished mirror-shine finish with Taski neutral gloss buff'
    }
  },
  {
    id: '2',
    category: 'Kitchen Degreasing',
    title: 'Modular Kitchen Chimney & Grease Descaling',
    image: '/images/kitchen-clean.jpg',
    location: 'AIR Bypass Road, Tirupati',
    description: 'Full baffle filter removal and food-grade alkaline degreasing bath dissolving baked-on cooking lipids without scratching steel.',
    beforeAfter: {
      beforeText: 'Heavy oil film & clogged exhaust mesh',
      afterText: '100% free-flowing chrome shine & zero sticky oil'
    }
  },
  {
    id: '3',
    category: 'Bathroom Descaling',
    title: 'Hard-Water Mineral Limescale Removal',
    image: '/images/bathroom-clean.jpg',
    location: 'MR Palli, Tirupati',
    description: 'Acid-free organic salt reaction breaking calcium silicate crust from shower cubicle glass and ceramic sanitaryware.',
    beforeAfter: {
      beforeText: 'Cloudy white mineral film on shower glass & taps',
      afterText: 'Crystal-clear transparent glass & chrome buffed fixtures'
    }
  },
  {
    id: '4',
    category: 'Sofa Shampooing',
    title: 'Fabric Sofa Foam Injection Shampooing',
    image: '/images/sofa-clean.jpg',
    location: 'Renigunta Road, Tirupati',
    description: 'German injection-extraction machine shooting enzymatic shampoo deep into cushions and vacuuming out dark mud and pet allergens.',
    beforeAfter: {
      beforeText: 'Juice spills, dust mites & dull fabric hue',
      afterText: 'Fresh revitalized fabric, dried in 3 hours'
    }
  },
  {
    id: '5',
    category: 'Office & Commercial',
    title: 'Commercial Clinic & Showroom Sanitization',
    image: '/images/office-clean.jpg',
    location: 'KT Road, Tirupati',
    description: 'Hospital-grade sanitization of workstations, waiting halls, anti-static IT server rooms, and client restrooms.',
    beforeAfter: {
      beforeText: 'Dusty carpets & soiled high-traffic flooring',
      afterText: 'Sterilized medical-standard sanitized surfaces'
    }
  },
  {
    id: '6',
    category: 'Floor Polishing',
    title: 'Granite & Mosaic Rotary Buffing Detailing',
    image: '/images/floor-clean.jpg',
    location: 'Alipiri Road, Tirupati',
    description: 'Heavy 17-inch single disc rotary machine with 3M buffing pad removing micro-scratches and restoring natural gloss.',
    beforeAfter: {
      beforeText: 'Scratched mosaic & grimy tile joint lines',
      afterText: 'Gleaming reflection and anti-slip finish'
    }
  },
  {
    id: '7',
    category: 'Home Deep Cleaning',
    title: 'Duplex Villa Complete Handover Polish',
    image: '/images/hero-interior.jpg',
    location: 'Chandragiri, Tirupati',
    description: 'Full day 6-technician team detailing 4 bedrooms, double-height staircases, private balconies, and terrace pressure washing.',
    beforeAfter: {
      beforeText: 'Post-renovation cement plaster & dust everywhere',
      afterText: 'Move-in ready gleaming home for housewarming puja'
    }
  },
  {
    id: '8',
    category: 'Kitchen Degreasing',
    title: 'Cabinet Exterior & Countertop Degreasing',
    image: '/images/kitchen-clean.jpg',
    location: 'Tiruchanur, Tirupati',
    description: 'Delicate laminate cabinet polish, granite countertop stain clearing, and under-sink drain sanitization.',
    beforeAfter: {
      beforeText: 'Greasy fingerprints & dull quartz countertop',
      afterText: 'Conditioned wood laminate & sanitized stone'
    }
  }
];

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { openModal } = useQuoteModal();

  const filters = ['All', 'Home Deep Cleaning', 'Kitchen Degreasing', 'Bathroom Descaling', 'Sofa Shampooing', 'Floor Polishing', 'Office & Commercial'];

  const filtered = activeFilter === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === activeFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowRight') setActiveIdx(prev => (prev! < filtered.length - 1 ? prev! + 1 : 0));
      if (e.key === 'ArrowLeft') setActiveIdx(prev => (prev! > 0 ? prev! - 1 : filtered.length - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, filtered.length]);

  return (
    <div className="pt-20 bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#041B3B] to-[#07254D] text-white py-16 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#22AC33]" />
            Real Transformation Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Our Work Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Witness the real before-and-after transformations delivered by Garuda Cleaning Services across apartments, duplexes, and commercial spaces in Tirupati.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-10 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#041B3B] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveIdx(idx)}
                className="price-card bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden relative bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[1px]">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 bg-[#041B3B]/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-[#041B3B] group-hover:text-[#22AC33] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">📍 {item.location}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {item.beforeAfter && (
                      <div className="pt-3 mt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                        <div className="text-slate-400">
                          <span className="font-bold text-red-500">Before:</span> {item.beforeAfter.beforeText}
                        </div>
                        <div className="text-slate-700 font-semibold">
                          <span className="font-bold text-[#22AC33]">After:</span> {item.beforeAfter.afterText}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <span className="text-[11px] font-bold text-[#22AC33] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Full Image & Specs <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Booking Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#E8F8EC] border border-emerald-200 text-center max-w-4xl mx-auto space-y-4 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#22AC33] text-xs font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Book Professional Cleaning in Tirupati
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041B3B]">
            Want Similar Sparkling Results for Your Property?
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Book online or call us directly. Our certified crew arrives promptly with heavy machines and eco-safe formulations.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3.5">
            <button
              onClick={() => openModal()}
              className="btn-homecare-green text-xs py-3.5 px-8 font-bold shine-effect"
            >
              Get Free Assessment
            </button>
            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              className="btn-homecare-navy text-xs py-3.5 px-8 font-bold border border-white/20"
            >
              <Phone className="w-4 h-4 text-[#FFD700]" />
              Call: {BUSINESS_CONFIG.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal with Keyboard Navigation & Details */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveIdx(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveIdx((prev) => (prev! > 0 ? prev! - 1 : filtered.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setActiveIdx((prev) => (prev! < filtered.length - 1 ? prev! + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="aspect-[16/10] bg-black max-h-[60vh] flex items-center justify-center">
              <img
                src={filtered[activeIdx].image}
                alt={filtered[activeIdx].title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white space-y-2 border-t border-white/10">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-[#22AC33] uppercase tracking-wider">
                  {filtered[activeIdx].category}
                </span>
                <span className="text-xs text-slate-400">📍 {filtered[activeIdx].location}</span>
              </div>
              <h3 className="font-extrabold text-lg sm:text-xl text-white">
                {filtered[activeIdx].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {filtered[activeIdx].description}
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const title = filtered[activeIdx].title;
                    setActiveIdx(null);
                    openModal(title);
                  }}
                  className="btn-homecare-green text-xs py-2.5 px-6 font-bold"
                >
                  Book Service Like This
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
