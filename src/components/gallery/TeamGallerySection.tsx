import React from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';
import { TEAM_GALLERY_ITEMS } from '../../data/galleryData';
import { SafeImage } from '../SafeImage';

export const TeamGallerySection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/60" id="team-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Trained Staff</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
            Our On-Site Cleaning Professionals
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every cleaning crew is directly employed, verified, and equipped with industry-standard safety gear.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_GALLERY_ITEMS.map((member) => (
            <div
              key={member.id}
              className="bg-slate-50 rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-200">
                <SafeImage
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#22AC33] shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <span className="text-[11px] font-bold text-[#22AC33] uppercase tracking-wider mb-1">
                  {member.role}
                </span>
                <h3 className="text-base font-bold text-[#041B3B] mb-2">
                  {member.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-auto">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
