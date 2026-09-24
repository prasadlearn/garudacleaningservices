import React from 'react';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BeforeAfterItem } from '../../data/galleryData';
import { ImageCompareSlider } from '../ImageCompareSlider';

interface BeforeAfterSectionProps {
  items: BeforeAfterItem[];
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/60" id="before-after-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#22AC33] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Transformations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
              Before & After Comparison
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              Drag the interactive slider left and right to inspect the cleaning results on tile floors, kitchens, bathrooms, and sofas.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
            <span>← Drag slider horizontally →</span>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Card Header Info */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#041B3B]">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      {item.category}
                    </span>
                    {item.locality && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {item.locality}
                      </span>
                    )}
                  </div>
                </div>

                {item.serviceSlug && (
                  <Link
                    to={`/services/${item.serviceSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#22AC33] hover:text-emerald-700 transition-colors"
                  >
                    <span>Service Info</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {/* Slider Area */}
              <div className="p-3 sm:p-4 bg-slate-900/5">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 shadow-inner">
                  <ImageCompareSlider entry={item} initialPos={50} />
                </div>
              </div>

              {/* Problem & Solution Breakdown */}
              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto bg-white border-t border-slate-100">
                <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100/80 text-xs">
                  <span className="font-bold text-rose-700 uppercase tracking-wide block mb-1">
                    Initial State
                  </span>
                  <p className="text-slate-700 leading-relaxed">{item.problem}</p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100/80 text-xs">
                  <span className="font-bold text-emerald-800 uppercase tracking-wide block mb-1">
                    Work Completed
                  </span>
                  <p className="text-slate-700 leading-relaxed">{item.work}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
