import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { trackEvent } from '../utils/analytics';

export const MobileStickyBar: React.FC = () => {
  const { openModal } = useQuoteModal();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Measure bar height and publish to --bar-h
  useEffect(() => {
    const updateBarHeight = () => {
      if (barRef.current) {
        const h = barRef.current.offsetHeight;
        document.documentElement.style.setProperty('--bar-h', `${h}px`);
      }
    };

    updateBarHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && barRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateBarHeight();
      });
      resizeObserver.observe(barRef.current);
    }

    window.addEventListener('resize', updateBarHeight);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateBarHeight);
    };
  }, []);

  // Auto-hide when form inputs/textareas/selects gain focus to prevent floating over keyboard
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        setKeyboardOpen(true);
      }
    };

    const onFocusOut = () => {
      setKeyboardOpen(false);
    };

    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  if (keyboardOpen) return null;

  return (
    <div
      ref={barRef}
      role="region"
      aria-label="Quick contact actions"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-[var(--z-sticky-bar)] bg-white/98 backdrop-blur-md border-t border-slate-200 px-3 pt-2 shadow-2xl flex items-center gap-2"
      style={{
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 0px))',
      }}
    >
      <a
        href={BUSINESS_CONFIG.contact.phoneTel}
        onClick={() => trackEvent('call_click', { sourcePage: 'mobile_sticky_bar' })}
        className="flex-1 min-h-[44px] px-3 rounded-xl bg-[#FFD700] hover:bg-[#ebd000] text-[#041B3B] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
        aria-label="Call Garuda Cleaning"
      >
        <Phone className="w-4 h-4 fill-current" />
        <span>Call</span>
      </a>

      <a
        href={BUSINESS_CONFIG.buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { sourcePage: 'mobile_sticky_bar' })}
        className="flex-1 min-h-[44px] px-3 rounded-xl bg-[#22AC33] hover:bg-[#1A8C28] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        onClick={() => {
          trackEvent('book_click', { sourcePage: 'mobile_sticky_bar' });
          openModal();
        }}
        className="flex-1 min-h-[44px] px-3 rounded-xl bg-[#041B3B] hover:bg-[#07254D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
        aria-label="Open Booking Quote Modal"
      >
        <Calendar className="w-4 h-4 text-[#FFD700]" />
        <span>Book</span>
      </button>
    </div>
  );
};
