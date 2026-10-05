import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { trackEvent } from '../utils/analytics';

interface BusinessContactNumbersProps {
  sourcePage?: string;
  variant?: 'stacked' | 'cards' | 'footer' | 'compact' | 'cta';
  className?: string;
}

export const BusinessContactNumbers: React.FC<BusinessContactNumbersProps> = ({
  sourcePage = 'global',
  variant = 'stacked',
  className = ''
}) => {
  const primaryDisplay = BUSINESS_CONFIG.contact.phoneDisplay; // +91 77995 52084
  const primaryTel = BUSINESS_CONFIG.contact.phoneTel; // tel:+917799552084
  const altDisplay = BUSINESS_CONFIG.contact.phoneAltDisplay; // +91 93916 13240
  const altTel = BUSINESS_CONFIG.contact.phoneAltTel; // tel:+919391613240
  const waUrl = BUSINESS_CONFIG.buildWhatsAppUrl();

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 w-full max-w-3xl lg:max-w-4xl mx-auto ${className}`}>
        {/* Primary Card: Call / WhatsApp */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-[#22AC33]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-2.5 py-0.5 rounded-md shrink-0">
              Call / WhatsApp • Primary
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-semibold truncate text-right">Main Business Line</span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="min-w-0">
              <a
                href={primaryTel}
                onClick={() => trackEvent('call_click', { sourcePage, target: 'primary_number' })}
                className="text-base sm:text-lg lg:text-xl font-black text-[#041B3B] hover:text-[#22AC33] transition-colors block tracking-tight whitespace-nowrap"
              >
                {primaryDisplay}
              </a>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium block truncate">Direct call &amp; instant estimates</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href={primaryTel}
                onClick={() => trackEvent('call_click', { sourcePage, target: 'primary_call_btn' })}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E8F8EC] text-[#22AC33] hover:bg-[#d5f3dc] flex items-center justify-center transition-colors"
                title={`Call ${primaryDisplay}`}
                aria-label={`Call ${primaryDisplay}`}
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { sourcePage, target: 'primary_wa_btn' })}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] flex items-center justify-center transition-colors shadow-2xs"
                title={`WhatsApp ${primaryDisplay}`}
                aria-label={`WhatsApp ${primaryDisplay}`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Alternative Card: Call Only */}
        <div className="p-4 sm:p-5 bg-slate-50/90 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
              Alternative Call
            </span>
            <span className="text-[11px] text-slate-400 font-medium truncate text-right">Secondary Line</span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="min-w-0">
              <a
                href={altTel}
                onClick={() => trackEvent('call_click', { sourcePage, target: 'alt_number' })}
                className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-700 hover:text-[#041B3B] transition-colors block whitespace-nowrap"
              >
                {altDisplay}
              </a>
              <span className="text-[11px] text-slate-500 font-medium block truncate">Alternative phone for calls</span>
            </div>

            <a
              href={altTel}
              onClick={() => trackEvent('call_click', { sourcePage, target: 'alt_call_btn' })}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-[#22AC33] hover:text-[#22AC33] flex items-center justify-center transition-colors shrink-0 shadow-2xs"
              title={`Call ${altDisplay}`}
              aria-label={`Call ${altDisplay}`}
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`space-y-3 ${className}`}>
        {/* Row 1: Primary Call / WhatsApp */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#1A8C28] block">
            Call / WhatsApp
          </span>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#1A8C28] shrink-0" />
            <a
              href={primaryTel}
              onClick={() => trackEvent('call_click', { sourcePage: 'footer', target: 'primary' })}
              className="text-base font-black text-[#041B3B] hover:text-[#1A8C28] transition-colors whitespace-nowrap"
            >
              {primaryDisplay}
            </a>
          </div>
        </div>

        {/* Row 2: Alternative Call */}
        <div className="space-y-0.5 pt-1 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Alternative Call
          </span>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <a
              href={altTel}
              onClick={() => trackEvent('call_click', { sourcePage: 'footer', target: 'alt' })}
              className="text-sm font-bold text-slate-700 hover:text-[#041B3B] transition-colors whitespace-nowrap"
            >
              {altDisplay}
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'cta') {
    return (
      <div className={`space-y-3 text-left w-full max-w-md mx-auto ${className}`}>
        {/* Primary Block */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#22AC33] block">
            Call / WhatsApp
          </span>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
            <span className="text-base sm:text-lg font-black text-white whitespace-nowrap">{primaryDisplay}</span>
            <div className="flex items-center gap-2">
              <a
                href={primaryTel}
                onClick={() => trackEvent('call_click', { sourcePage, target: 'cta_primary_call' })}
                className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3 h-3 text-[#22AC33]" />
                <span>Call</span>
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { sourcePage, target: 'cta_primary_wa' })}
                className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Alternative Block */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">
            Alternative Call
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm sm:text-base font-bold text-slate-200 whitespace-nowrap">{altDisplay}</span>
            <a
              href={altTel}
              onClick={() => trackEvent('call_click', { sourcePage, target: 'cta_alt_call' })}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3 h-3 text-slate-300" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Default: vertical stacked list
  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Row 1: Call / WhatsApp */}
      <div className="space-y-0.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#22AC33] block">
          Call / WhatsApp
        </span>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#22AC33] shrink-0" />
          <a
            href={primaryTel}
            onClick={() => trackEvent('call_click', { sourcePage, target: 'primary' })}
            className="text-base font-black text-[#041B3B] hover:text-[#22AC33] transition-colors whitespace-nowrap"
          >
            {primaryDisplay}
          </a>
        </div>
      </div>

      {/* Row 2: Alternative Call */}
      <div className="space-y-0.5 pt-1 border-t border-slate-100">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
          Alternative Call
        </span>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <a
            href={altTel}
            onClick={() => trackEvent('call_click', { sourcePage, target: 'alt' })}
            className="text-sm font-bold text-slate-700 hover:text-[#041B3B] transition-colors whitespace-nowrap"
          >
            {altDisplay}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BusinessContactNumbers;
