import React, { useState, useEffect, useCallback } from 'react';
import { ZoomIn, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AquaButton } from './AquaButton';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Modular Kitchen Deep Degreasing',
    category: 'Kitchen',
    image: '/images/kitchen-clean.jpg',
    description: 'Grease and oil film cleaned from backsplash tiles, countertops, and cabinet surfaces.',
    location: 'Balaji Colony, Tirupati',
  },
  {
    id: '2',
    title: 'Bathroom Tile & Fixture Descaling',
    category: 'Bathroom',
    image: '/images/bathroom-clean.jpg',
    description: 'Hard-water marks, limescale, and mineral deposits descaled from tiles and chrome fittings.',
    location: 'AIR Bypass Road, Tirupati',
  },
  {
    id: '3',
    title: 'Fabric Sofa Deep Extraction',
    category: 'Upholstery',
    image: '/images/sofa-clean.jpg',
    description: 'Injection-extraction cleaning lifting embedded dust and stains from living room cushions.',
    location: 'RC Road, Tirupati',
  },
  {
    id: '4',
    title: 'Rotary Machine Floor Scrubbing',
    category: 'Flooring',
    image: '/images/floor-clean.jpg',
    description: 'Single-disc rotary scrubbing extracting ingrained dirt from floor tile grout lines.',
    location: 'Renigunta Road, Tirupati',
  },
  {
    id: '5',
    title: 'Corporate Office Sanitization',
    category: 'Commercial',
    image: '/images/office-clean.jpg',
    description: 'Sanitization of conference rooms, workstations, glass partitions, and common areas.',
    location: 'Tiruchanur Road, Tirupati',
  },
  {
    id: '6',
    title: 'Residential Villa Deep Clean',
    category: 'Residential',
    image: '/images/hero-interior.jpg',
    description: 'Complete room-by-room deep clean for residential living spaces, windows, and floors.',
    location: 'Alipiri Area, Tirupati',
  },
];

export const Gallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const categories = ['All', 'Kitchen', 'Bathroom', 'Upholstery', 'Flooring', 'Commercial', 'Residential'];

  const filteredItems = selectedFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') {
        setActiveIdx(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      }
    },
    [activeIdx, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-[#0E6B7A] text-xs font-bold uppercase tracking-wider mb-3">
              Real Project Transformations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight">
              Before &amp; After Visual Gallery
            </h2>
            <p className="text-slate-600 mt-2 text-base sm:text-lg max-w-xl">
              Authentic visual results from our recent residential and commercial deep cleaning projects in Tirupati.
            </p>
          </div>

          <div className="inline-flex p-1 bg-white rounded-full border border-slate-200 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === cat
                    ? 'bg-[#0E6B7A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0B192C]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/90 text-[#0B192C] flex items-center justify-center shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/95 text-[#0B192C] shadow-xs uppercase">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#0B192C] group-hover:text-[#0E6B7A] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-3 mt-3 border-t border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-[#0E6B7A] shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <AquaButton to="/gallery" variant="secondary">
            View Complete Gallery & Case Studies
          </AquaButton>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActiveIdx(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveIdx((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveIdx((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] sm:aspect-[16/9] bg-black">
              <img
                src={filteredItems[activeIdx].image}
                alt={filteredItems[activeIdx].title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#38BDF8] font-bold">
                    {filteredItems[activeIdx].category}
                  </span>
                  <h3 className="text-xl font-bold mt-0.5">
                    {filteredItems[activeIdx].title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{filteredItems[activeIdx].location}</span>
                </div>
              </div>
              <p className="text-sm text-slate-300 mt-2">
                {filteredItems[activeIdx].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
