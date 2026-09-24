import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Clean Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs max-w-sm w-full text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="font-extrabold text-xl text-[#041B3B]">Our Team Comes to Your Home</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We bring rotary floor scrubbers, vacuum machines, and surface-safe cleaning liquids directly to your location.
            </p>
            <div className="pt-2 flex justify-center gap-2 text-xs font-bold text-[#22AC33]">
              <span>✓ Trained Team</span>
              <span>•</span>
              <span>✓ On Time</span>
              <span>•</span>
              <span>✓ Careful Work</span>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#22AC33] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#22AC33]" />
            Garuda Cleaning Services
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] tracking-tight leading-tight">
            Garuda Cleaning Services — Professional Cleaning in Tirupati
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Garuda Cleaning Services provides professional deep cleaning for apartments, independent houses, villas, and commercial spaces across Tirupati. Whether you need full house deep cleaning, kitchen and bathroom scrubbing, or sofa care, our team helps keep your property spotless and fresh. We serve homes and offices across Tirupati, including Balaji Colony, MR Palli, and nearby areas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Professional rotary floor scrubbers for deep cleaning',
              'Surface-safe, acid-free descaling solutions',
              'Trained and experienced cleaning team',
              'Final quality check with you before we finish'
            ].map((pt, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#22AC33] shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
