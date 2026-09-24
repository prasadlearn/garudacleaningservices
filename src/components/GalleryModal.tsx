import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import type { GalleryEntry } from '../data/galleryData';
import { ImageCompareSlider } from './ImageCompareSlider';
import { useQuoteModal } from '../context/QuoteModalContext';
import { trackEvent } from '../utils/analytics';

interface GalleryModalProps {
  entries: GalleryEntry[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  entries,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const { openModal } = useQuoteModal();
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const entry = entries[currentIndex];

  // Save trigger element and lock body scroll
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Focus modal container
      modalContainerRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      triggerElementRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation: Escape closes, Left/Right navigates between entries
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is focusing inside slider, slider handles its own arrow keys
      if (document.activeElement?.getAttribute('role') === 'slider') {
        return;
      }
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && entries.length > 1) {
        onNavigate((currentIndex - 1 + entries.length) % entries.length);
      } else if (e.key === 'ArrowRight' && entries.length > 1) {
        onNavigate((currentIndex + 1) % entries.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, entries.length, currentIndex, onClose, onNavigate]);

  if (!isOpen || !entry) return null;

  const hasPrev = entries.length > 1;
  const hasNext = entries.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + entries.length) % entries.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % entries.length);
  };

  return (
    <div
      ref={modalContainerRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.title} - Before and After Slider`}
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto focus:outline-none"
    >
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-[var(--z-content)] my-auto border border-slate-200 flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#041B3B] text-white px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-emerald-400 text-xs font-bold uppercase tracking-wider shrink-0">
              {entry.tag || 'Project'}
            </span>
            <h3 className="font-extrabold text-sm sm:text-base text-white truncate">
              {entry.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasPrev && (
              <button
                type="button"
                onClick={handlePrev}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Previous job"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            <span className="text-xs font-mono text-slate-300">
              {currentIndex + 1} / {entries.length}
            </span>
            {hasNext && (
              <button
                type="button"
                onClick={handleNext}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Next job"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-2 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Compare Slider */}
        <div className="p-4 sm:p-6 bg-slate-900">
          <ImageCompareSlider entry={entry} initialPos={50} />
        </div>

        {/* Problem and Result Tinted Boxes */}
        <div className="p-4 sm:p-6 space-y-4 bg-slate-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Problem Box */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-red-700 block">
                Problem
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {entry.problem}
              </p>
            </div>

            {/* Result Box */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 block">
                Result & Work Done
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {entry.work}
              </p>
            </div>
          </div>

          {/* Modal Footer with Locality & Get Free Quote */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-500 font-medium">
              {entry.locality ? `Job Location: ${entry.locality}` : 'Completed in Tirupati'}
            </span>

            <button
              type="button"
              onClick={() => {
                onClose();
                trackEvent('book_click', {
                  serviceSlug: entry.serviceSlug,
                  sourcePage: '/gallery_modal'
                });
                openModal({ serviceTitle: entry.title, sourcePage: '/gallery' });
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#FFD700] hover:bg-[#e6c200] text-[#041B3B] font-black text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Get Free Quote for This Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
