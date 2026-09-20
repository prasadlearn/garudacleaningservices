import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuoteModal } from '../context/QuoteModalContext';

const AREAS = [
  "Balaji Colony, Tirupati",
  "AIR Bypass Road, Tirupati",
  "MR Palli, Tirupati",
  "Renigunta Road, Tirupati",
  "Alipiri & Foothills, Tirupati",
  "KT Road, Tirupati",
  "Bhavani Nagar, Tirupati",
  "Korlagunta, Tirupati",
  "Chandragiri, Tirupati",
  "Tiruchanur, Tirupati",
  "Padmavathi Puram, Tirupati",
  "Settipalli, Tirupati",
  "Karakambadi Road, Tirupati",
  "Mangalam, Tirupati",
  "Gandhi Road, Tirupati"
];

export const AreasList: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <section id="service-areas" className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#22AC33] uppercase tracking-wider mb-2 block">
            Areas We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041B3B] tracking-tight">
            Doorstep Cleaning Service Across Tirupati
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Our mobile cleaning units arrive at your location with specialized rotary machines, vacuum extractors, and surface-safe chemicals.
          </p>
        </div>

        {/* Pill list with #041B3B background and #22AC33 hover */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-5xl mx-auto">
          {AREAS.map((area, idx) => (
            <button
              key={idx}
              onClick={() => openModal(`Service in ${area}`)}
              className="area-pill"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>{area}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/service-areas"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#041B3B] hover:text-[#22AC33] transition-colors"
          >
            <span>View detailed coverage information and arrival timings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
