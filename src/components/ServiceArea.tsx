import React from 'react';
import { MapPin, CheckCircle2, Clock } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { AquaButton } from './AquaButton';

export const ServiceArea: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <section id="service-areas" className="py-20 sm:py-28 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0E6B7A] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              Coverage Across Tirupati
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight leading-tight">
              Doorstep Service Across All Major Neighborhoods
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We operate dedicated mobile service vans equipped with power washers, floor scrubbers, and cleaning personnel stationed right here in Tirupati.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0E6B7A]">
                <Clock className="w-4 h-4" />
                <span>Rapid Response Time</span>
              </div>
              <p className="text-xs text-slate-600">
                Guaranteed arrival within chosen 2-hour slot across Tirupati city and suburban zones. Zero extra transport charges.
              </p>
            </div>

            <AquaButton onClick={() => openModal()} color="#0E6B7A">
              Check Service Availability in My Area
            </AquaButton>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {BUSINESS_CONFIG.serviceAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-xs transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-sm text-[#0B192C] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0E6B7A] shrink-0" />
                    <span>{area.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 pl-5">
                    PIN: {area.pincode}
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 uppercase">
                  {area.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
