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
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="hidden sm:flex fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#0E6B7A] hover:bg-[#0B192C] text-white items-center justify-center shadow-lg transition-all cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
