import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Line Illustration */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm max-w-sm w-full text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="font-extrabold text-xl text-[#041B3B]">Doorstep Cleaning Crew</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Equipped with single-disc rotary floor scrubbers, vacuum extractors, and surface-safe biological agents stationed in Tirupati.
            </p>
            <div className="pt-2 flex justify-center gap-2 text-xs font-bold text-[#22AC33]">
              <span>✓ Certified</span>
              <span>•</span>
              <span>✓ Punctual</span>
              <span>•</span>
              <span>✓ Inspected</span>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#D97706] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            Trusted Cleaning Service
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] tracking-tight leading-tight">
            Garuda Cleaning Services – Trusted Cleaning in Tirupati
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Garuda Cleaning Services offers trusted cleaning services in Tirupati for homes, apartments, villas, and offices. From deep cleaning, kitchen and bathroom cleaning to sofa and carpet care, services are designed for busy families, working professionals, and businesses. Serving key areas like Balaji Colony, AIR Bypass Road, MR Palli, and Renigunta Road, the team ensures hygienic, spotless spaces with professional care and modern equipment.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Mechanized Rotary Floor Scrubbing',
              'Non-Corrosive Acid-Free Descalers',
              'Trained Uniformed Local Crew',
              '100% Satisfaction Handover Audit'
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
