import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, Phone, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { getServicesByCategory } from '../data/servicesData';
import { useQuoteModal } from '../context/QuoteModalContext';
import { trackEvent } from '../utils/analytics';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, triggerRef }) => {
  const location = useLocation();
  const { openModal } = useQuoteModal();
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const residentialServices = getServicesByCategory('residential');
  const specializedServices = getServicesByCategory('specialized');
  const commercialServices = getServicesByCategory('commercial');

  // Close only on actual route change (not on drawer open)
  const prevPathRef = useRef(location.pathname);
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [location.pathname, isOpen, onClose]);

  // Close when resized past desktop breakpoint (1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  // Body scroll lock & inert attribute on main content
  useEffect(() => {
    if (!isOpen) return;

    const currentTrigger = triggerRef.current;
    const scrollY = window.scrollY;
    const body = document.body;
    const originalOverflow = body.style.overflow;
    const originalPosition = body.style.position;
    const originalTop = body.style.top;
    const originalWidth = body.style.width;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    // Set inert on root siblings
    const rootEl = document.getElementById('root');
    const mainContent = rootEl?.querySelector('main');
    const footerContent = rootEl?.querySelector('footer');

    if (mainContent) mainContent.setAttribute('inert', '');
    if (footerContent) footerContent.setAttribute('inert', '');

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Escape listener & Focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      body.style.overflow = originalOverflow;
      body.style.position = originalPosition;
      body.style.top = originalTop;
      body.style.width = originalWidth;
      window.scrollTo(0, scrollY);

      if (mainContent) mainContent.removeAttribute('inert');
      if (footerContent) footerContent.removeAttribute('inert');
      document.removeEventListener('keydown', handleKeyDown);

      // Return focus to hamburger trigger
      currentTrigger?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  const isExactActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    // Services handled with accordion
    { label: 'Gallery', path: '/gallery' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Cleaning Liquids', path: '/cleaning-liquids' },
    { label: 'Service Areas', path: '/service-areas' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-drawer-backdrop)] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <motion.div
            ref={drawerRef}
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-[300px] sm:w-[360px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col z-[var(--z-drawer)] border-l border-slate-100"
          >
            {/* Header Lockup */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#041B3B] text-white">
              <div className="flex flex-col leading-tight">
                <span className="font-black text-sm tracking-tight">Garuda Cleaning Services</span>
                <span className="text-[10px] text-[#22AC33] font-bold">Tirupati & Surroundings</span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Nav Area */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-1">
              {/* Home */}
              <Link
                to="/"
                onClick={onClose}
                className={`min-h-[44px] flex items-center px-4 rounded-xl font-bold text-sm transition-colors ${
                  isExactActive('/')
                    ? 'bg-[#E8F8EC] text-[#22AC33]'
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                Home
              </Link>

              {/* About */}
              <Link
                to="/about"
                onClick={onClose}
                className={`min-h-[44px] flex items-center px-4 rounded-xl font-bold text-sm transition-colors ${
                  isExactActive('/about')
                    ? 'bg-[#E8F8EC] text-[#22AC33]'
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                About
              </Link>

              {/* Services Accordion */}
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <div className="flex items-center justify-between min-h-[44px] bg-slate-50 px-4">
                  <Link
                    to="/services"
                    onClick={onClose}
                    className={`font-bold text-sm flex-1 py-2.5 transition-colors ${
                      isExactActive('/services')
                        ? 'text-[#22AC33]'
                        : 'text-slate-800 hover:text-[#22AC33]'
                    }`}
                  >
                    Services ({residentialServices.length + specializedServices.length + commercialServices.length})
                  </Link>
                  <button
                    type="button"
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                    aria-expanded={servicesExpanded}
                    aria-label="Toggle all services list"
                    className="w-11 h-11 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        servicesExpanded ? 'rotate-180 text-[#22AC33]' : ''
                      }`}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {servicesExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-white px-3 py-2 space-y-3 divide-y divide-slate-100 text-xs"
                    >
                      {/* Residential Group */}
                      <div className="space-y-1 pt-1 first:pt-0">
                        <span className="text-[10px] font-black uppercase text-[#22AC33] tracking-wider px-2 block">
                          Residential ({residentialServices.length})
                        </span>
                        {residentialServices.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            onClick={onClose}
                            className="min-h-[40px] flex items-center px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-[#22AC33] font-medium"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>

                      {/* Specialized Group */}
                      <div className="space-y-1 pt-2">
                        <span className="text-[10px] font-black uppercase text-[#22AC33] tracking-wider px-2 block">
                          Specialized ({specializedServices.length})
                        </span>
                        {specializedServices.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            onClick={onClose}
                            className="min-h-[40px] flex items-center px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-[#22AC33] font-medium"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>

                      {/* Commercial Group */}
                      <div className="space-y-1 pt-2">
                        <span className="text-[10px] font-black uppercase text-[#22AC33] tracking-wider px-2 block">
                          Commercial ({commercialServices.length})
                        </span>
                        {commercialServices.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            onClick={onClose}
                            className="min-h-[40px] flex items-center px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-[#22AC33] font-medium"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Links */}
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`min-h-[44px] flex items-center px-4 rounded-xl font-bold text-sm transition-colors ${
                    isExactActive(link.path)
                      ? 'bg-[#E8F8EC] text-[#22AC33]'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Drawer Bottom CTAs */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openModal();
                }}
                className="btn-homecare-green w-full min-h-[44px] text-xs font-bold justify-center flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Free Price Quote</span>
              </button>

              <a
                href={BUSINESS_CONFIG.contact.phoneTel}
                onClick={() => trackEvent('call_click', { sourcePage: 'mobile_drawer' })}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#041B3B] border border-slate-200 rounded-xl text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#22AC33]" />
                <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
