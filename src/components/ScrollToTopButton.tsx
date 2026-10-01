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
      className="fixed right-4 sm:right-6 bottom-36 sm:bottom-24 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800/80 hover:bg-[#041B3B] text-white flex items-center justify-center shadow-md border border-white/20 transition-all cursor-pointer backdrop-blur-xs hover:scale-105"
      title="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};
