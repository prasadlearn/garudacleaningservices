import React from 'react';
import {
  Building,
  Home,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';
import { WHOLESALE_AUDIENCES } from '../data/audiences';

interface WholesaleAudienceSectionProps {
  className?: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Building,
  Home,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Sparkles
};

export const WholesaleAudienceSection: React.FC<WholesaleAudienceSectionProps> = ({
  className = ''
}) => {
  return (
    <section className={`space-y-6 sm:space-y-8 ${className}`}>
      {/* Header with Mandatory H2 */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#22AC33] border border-emerald-200">
          <Users className="w-3.5 h-3.5" />
          <span>Tailored Commercial Supply</span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#041B3B]">
          Wholesale Supplies for Tirupati Businesses
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
          Dependable cleaning chemicals and bulk liquid supply tailored to the operational needs of Tirupati facilities.
        </p>
      </div>

      {/* Grid of 6 Audience Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {WHOLESALE_AUDIENCES.map((audience) => {
          const IconComponent = ICON_MAP[audience.icon] || Building;

          return (
            <div
              key={audience.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#22AC33]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#22AC33] flex items-center justify-center shadow-2xs">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#041B3B]">
                    {audience.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    {audience.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Popular Products:
                </div>
                <div className="flex flex-wrap gap-1">
                  {audience.popularProducts.map((prod) => (
                    <span
                      key={prod}
                      className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#22AC33]" />
                      <span>{prod}</span>
                    </span>
                  ))}
                </div>
                <div className="pt-0.5 text-[11px] text-emerald-700 font-bold">
                  Recommended: {audience.recommendedPacks}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { WholesaleAudienceSection as WholesaleAudienceGrid };
