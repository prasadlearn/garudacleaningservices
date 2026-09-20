import React from 'react';
import { ServiceCircles } from '../components/ServiceCircles';
import { ChooseAndBookSection } from '../components/ChooseAndBookSection';
import { ComboOffersSection } from '../components/ComboOffersSection';
import { ServicesGrid } from '../components/ServicesGrid';
import { WorkProcessSection } from '../components/WorkProcessSection';
import { AreasList } from '../components/AreasList';
import { FAQAccordionSection } from '../components/FAQAccordionSection';

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-[#041B3B] text-white py-14 sm:py-20 px-4 sm:px-8 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="homecare-pill bg-white/15 text-[#22AC33]">Comprehensive Packages</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Cleaning Services in Tirupati
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From single-disc rotary tile scrubbing to upholstery injection extraction and complete move-in deep cleaning.
          </p>
        </div>
      </div>

      <ServiceCircles />
      <ChooseAndBookSection />
      <ComboOffersSection />
      <ServicesGrid />
      <WorkProcessSection />
      <AreasList />
      <FAQAccordionSection />
    </div>
  );
};
