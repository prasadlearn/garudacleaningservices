import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed right-4 sm:right-6 z-[var(--z-back-to-top)] w-11 h-11 rounded-full bg-[#041B3B] hover:bg-[#22AC33] text-white flex items-center justify-center shadow-xl border-2 border-white/40 transition-all cursor-pointer"
      style={{
        bottom: 'calc(var(--bar-h, 60px) + env(safe-area-inset-bottom, 0px) + 12px)'
      }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
