import React from 'react';
import { Package, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../../config/businessConfig';
import { trackEvent } from '../../../utils/analytics';

interface WholesaleBannerProps {
  onOpenEnquiryModal?: () => void;
  className?: string;
}

export const WholesaleBanner: React.FC<WholesaleBannerProps> = ({
  className = ''
}) => {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br from-[#041B3B] via-[#082855] to-[#041B3B] text-white p-6 sm:p-10 border border-white/10 shadow-lg relative overflow-hidden ${className}`}
    >
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#22AC33]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <div className="lg:col-span-8 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#22AC33] border border-white/10">
            <Package className="w-3.5 h-3.5" />
            <span>Commercial & Bulk Orders</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug">
            Need Wholesale Supplies for Your Facility or Business?
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            We provide recurring monthly supply schedules and custom slab discounts for apartment associations, hotels, corporate offices, institutions, and facility managers across Tirupati and Rayachoty.
          </p>

          <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
              <span>Direct Wholesale Rates</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
              <span>5L Cans &amp; Case Lots</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
              <span>Tirupati &amp; Rayachoty Delivery</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
          <a
            href={BUSINESS_CONFIG.buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { sourcePage: '/wholesale-banner' })}
            className="btn-homecare-green py-3 px-5 text-xs sm:text-sm font-bold justify-center flex items-center gap-2 text-center shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Get Wholesale Price List</span>
          </a>

          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            onClick={() => trackEvent('call_click', { sourcePage: '/wholesale-banner' })}
            className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm justify-center flex items-center gap-2 transition-all text-center"
          >
            <Phone className="w-4 h-4 text-[#22AC33]" />
            <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
