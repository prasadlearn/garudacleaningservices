import React from 'react';
import { Wrench } from 'lucide-react';
import { EQUIPMENT_ITEMS } from '../../data/galleryData';
import { SafeImage } from '../SafeImage';

export const EquipmentSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/60" id="equipment-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#22AC33] text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Tools & Methods</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
            Equipment & Safe Solutions We Use
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We use rotary floor scrubbers, high-pressure wet extractors, and surface-safe cleaning agents.
          </p>
        </div>

        {/* Equipment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EQUIPMENT_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <SafeImage
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                  {item.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-[#041B3B] mb-2 group-hover:text-[#22AC33] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-auto">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
