import React from 'react';
import { Truck, Info } from 'lucide-react';

interface DeliveryNoteProps {
  className?: string;
  variant?: 'inline' | 'card';
}

export const DeliveryNote: React.FC<DeliveryNoteProps> = ({
  className = '',
  variant = 'card'
}) => {
  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-1.5 text-[11px] text-slate-500 ${className}`}>
        <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Delivery charges are not included in product prices.</span>
      </div>
    );
  }

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/80 border border-amber-200/80 text-[#041B3B] flex items-start gap-3 shadow-2xs ${className}`}
    >
      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
        <Truck className="w-4 h-4" />
      </div>
      <div className="text-xs sm:text-sm space-y-0.5">
        <p className="font-extrabold text-[#041B3B]">
          Delivery charges are not included in the displayed product prices.
        </p>
        <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
          Delivery charges will be confirmed based on order size and delivery location across Tirupati and surrounding areas.
        </p>
      </div>
    </div>
  );
};
