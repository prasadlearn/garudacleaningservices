import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TwoCityCoverageSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-8 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#22AC33] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Service Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
            Our Two Service Areas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Garuda Cleaning Services is a service-area cleaning business. We bring mechanized cleaning equipment directly to your premises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Tirupati Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-[#22AC33]/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-3 py-1 rounded-full">
                  Primary Service Area
                </span>
                <span className="text-xs font-bold text-slate-400">Full Coverage</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#041B3B] group-hover:text-[#22AC33] transition-colors">
                  Tirupati
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Full doorstep cleaning coverage across all residential societies, independent villas, commercial complexes, and surrounding areas.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22AC33] shrink-0" />
                  <span>Balaji Colony, MR Palli, AIR Bypass Road &amp; Alipiri</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22AC33] shrink-0" />
                  <span>Renigunta, Chandragiri &amp; Tiruchanur on request</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/service-areas"
                className="text-xs sm:text-sm font-bold text-[#041B3B] group-hover:text-[#22AC33] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View Tirupati Localities</span>
                <ArrowRight className="w-4 h-4 text-[#22AC33] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Rayachoty Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-[#22AC33]/40 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#041B3B] bg-slate-100 px-3 py-1 rounded-full">
                  Additional Service Area
                </span>
                <span className="text-xs font-bold text-slate-400">Doorstep Booking</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#041B3B] group-hover:text-[#22AC33] transition-colors">
                  Rayachoty
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Dedicated service coverage for apartments, homes, offices, and commercial properties throughout Rayachoty.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22AC33] shrink-0" />
                  <span>Home, BHK, Sofa, Kitchen &amp; Washroom Cleaning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22AC33] shrink-0" />
                  <span>Heavy-duty mechanized machines brought to your address</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/service-areas/rayachoty"
                className="text-xs sm:text-sm font-bold text-[#041B3B] group-hover:text-[#22AC33] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Explore Rayachoty Service Area</span>
                <ArrowRight className="w-4 h-4 text-[#22AC33] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoCityCoverageSection;
