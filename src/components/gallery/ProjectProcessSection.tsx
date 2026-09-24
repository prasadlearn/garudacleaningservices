import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { PROJECT_PROCESS_STEPS } from '../../data/galleryData';
import { SafeImage } from '../SafeImage';

export const ProjectProcessSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/60" id="process-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Standard Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
            How Every Cleaning Job Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From initial inspection to supervisor sign-off, here is our 5-step process on every site.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PROJECT_PROCESS_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-slate-50 rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <SafeImage
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#041B3B] text-white text-xs font-black flex items-center justify-center shadow-md">
                  {step.stepNumber}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                <h3 className="text-sm sm:text-base font-bold text-[#041B3B] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {step.description}
                </p>
                <div className="mt-auto pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#22AC33]">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
