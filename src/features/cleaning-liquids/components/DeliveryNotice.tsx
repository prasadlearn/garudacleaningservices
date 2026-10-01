import React from 'react';
import { Truck } from 'lucide-react';

interface DeliveryNoticeProps {
  className?: string;
  variant?: 'inline' | 'compact' | 'card';
}

export const DeliveryNotice: React.FC<DeliveryNoticeProps> = ({
  className = '',
  variant = 'compact'
}) => {
  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-1.5 text-xs text-slate-600 font-medium ${className}`}>
        <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>Delivery charges are not included in displayed product prices.</span>
      </div>
    );
  }

  return (
    <div
      className={`p-3 sm:p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-[#041B3B] flex items-center gap-3 shadow-2xs ${className}`}
    >
      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
        <Truck className="w-4 h-4" />
      </div>
      <div className="text-xs space-y-0.5 min-w-0 flex-1">
        <p className="font-extrabold text-[#041B3B] text-xs">
          Delivery charges are not included in displayed product prices.
        </p>
        <p className="text-[11px] text-slate-600 font-medium leading-tight">
          Delivery charges will be confirmed based on order size and delivery location.
        </p>
      </div>
    </div>
  );
};

export { DeliveryNotice as DeliveryNote };
