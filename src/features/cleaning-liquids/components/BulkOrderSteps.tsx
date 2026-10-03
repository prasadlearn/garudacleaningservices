import React from 'react';
import { ShoppingBag, MessageSquare, Truck, CheckCircle2 } from 'lucide-react';

interface BulkOrderStepsProps {
  className?: string;
}

export const BulkOrderSteps: React.FC<BulkOrderStepsProps> = ({ className = '' }) => {
  const steps = [
    {
      num: '01',
      icon: ShoppingBag,
      title: 'Select Products & Sizes',
      description: 'Choose your required items in 500ml, 1L, or commercial 5L bulk cans.'
    },
    {
      num: '02',
      icon: MessageSquare,
      title: 'Share Quantity & Location',
      description: 'Send your requirements via WhatsApp enquiry along with your locality in Tirupati or Rayachoty.'
    },
    {
      num: '03',
      icon: CheckCircle2,
      title: 'Confirm Bulk Rates & Delivery',
      description: 'We share final tier rates, stock availability, and calculated delivery terms.'
    },
    {
      num: '04',
      icon: Truck,
      title: 'Prompt Regional Dispatch',
      description: 'Your cleaning liquids order is dispatched promptly to your facility or doorstep location.'
    }
  ];

  return (
    <section className={`space-y-6 sm:space-y-8 ${className}`}>
      {/* Header with Mandatory H2 */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#22AC33]">
          Simple Procurement Flow
        </span>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#041B3B]">
          How to Order in Bulk
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Straightforward procurement for residential and commercial buyers across Tirupati &amp; Rayachoty.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {steps.map((step) => {
          const IconComp = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#22AC33] flex items-center justify-center font-black text-sm shadow-2xs">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-200">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#041B3B]">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
