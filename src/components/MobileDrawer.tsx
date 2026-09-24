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
    { label: 'Products', path: '/products' },
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
            aria-label="Main menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-[var(--z-drawer)] w-full max-w-[420px] bg-white text-slate-900 shadow-2xl flex flex-col justify-between overflow-hidden"
            style={{
              height: '100dvh',
              maxHeight: '100dvh',
              overscrollBehavior: 'contain'
            }}
          >
            {/* Drawer Header */}
            <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/80">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-black text-base text-[#041B3B] truncate">
                  Garuda <span className="text-[#22AC33]">Cleaning Services</span>
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-slate-100 overscroll-contain">
              {/* Home */}
              <Link
                to="/"
                onClick={onClose}
                aria-current={isExactActive('/') ? 'page' : undefined}
                className={`min-h-[52px] flex items-center justify-between px-3 rounded-xl text-base font-bold transition-colors ${
                  isExactActive('/') ? 'bg-[#E8F8EC] text-[#22AC33]' : 'text-[#041B3B] hover:bg-slate-50'
                }`}
              >
                <span>Home</span>
              </Link>

              {/* About */}
              <Link
                to="/about"
                onClick={onClose}
                aria-current={isExactActive('/about') ? 'page' : undefined}
                className={`min-h-[52px] flex items-center justify-between px-3 rounded-xl text-base font-bold transition-colors ${
                  isExactActive('/about') ? 'bg-[#E8F8EC] text-[#22AC33]' : 'text-[#041B3B] hover:bg-slate-50'
                }`}
              >
                <span>About</span>
              </Link>

              {/* Services Accordion / Direct Link */}
              <div className="py-1">
                <div className={`min-h-[52px] flex items-center justify-between px-3 rounded-xl transition-colors ${
                  isExactActive('/services') ? 'bg-[#E8F8EC] text-[#22AC33]' : 'hover:bg-slate-50 text-[#041B3B]'
                }`}>
                  <Link
                    to="/services"
                    onClick={onClose}
                    className="flex-1 flex items-center py-3 text-base font-bold select-none cursor-pointer"
                  >
                    <span>Services (21)</span>
                  </Link>
                  <button
                    type="button"
                    data-drawer-accordion="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      setServicesExpanded(!servicesExpanded);
                    }}
                    aria-expanded={servicesExpanded}
                    aria-label="Toggle services list"
                    className="p-2 -mr-1 text-slate-500 hover:text-[#22AC33] rounded-lg transition-colors cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        servicesExpanded ? 'rotate-180 text-[#22AC33]' : ''
                      }`}
                    />
                  </button>
                </div>

                {servicesExpanded && (
                  <div className="pl-3 pr-1 pb-3 space-y-4 pt-1">
                    {/* View All Services Link */}
                    <Link
                      to="/services"
                      onClick={onClose}
                      className="min-h-[44px] flex items-center gap-2 text-sm font-black text-[#22AC33] bg-[#E8F8EC] px-3.5 rounded-xl hover:bg-[#d6f2dc] transition-colors"
                    >
                      <span>View all 21 services</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Residential */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 px-3 pb-1 border-b border-slate-100">
                        Residential ({residentialServices.length})
                      </h4>
                      <ul className="mt-1 space-y-1">
                        {residentialServices.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              onClick={onClose}
                              className="min-h-[44px] flex items-center px-3 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#22AC33] hover:bg-slate-50"
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specialized */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 px-3 pb-1 border-b border-slate-100">
                        Specialized ({specializedServices.length})
                      </h4>
                      <ul className="mt-1 space-y-1">
                        {specializedServices.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              onClick={onClose}
                              className="min-h-[44px] flex items-center px-3 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#22AC33] hover:bg-slate-50"
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Commercial */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 px-3 pb-1 border-b border-slate-100">
                        Commercial ({commercialServices.length})
                      </h4>
                      <ul className="mt-1 space-y-1">
                        {commercialServices.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              onClick={onClose}
                              className="min-h-[44px] flex items-center px-3 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#22AC33] hover:bg-slate-50"
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Remaining Nav Links */}
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  aria-current={isExactActive(link.path) ? 'page' : undefined}
                  className={`min-h-[52px] flex items-center justify-between px-3 rounded-xl text-base font-bold transition-colors ${
                    isExactActive(link.path) ? 'bg-[#E8F8EC] text-[#22AC33]' : 'text-[#041B3B] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Bottom Action Area with safe-area padding */}
            <div
              className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2 shrink-0"
              style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={BUSINESS_CONFIG.contact.phoneTel}
                  onClick={() => trackEvent('call_click', { sourcePage: 'mobile_drawer' })}
                  className="min-h-[48px] px-3 py-2.5 rounded-xl bg-[#041B3B] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#22AC33]" />
                  <span>Call Us</span>
                </a>
                <a
                  href={BUSINESS_CONFIG.buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { sourcePage: 'mobile_drawer' })}
                  className="min-h-[48px] px-3 py-2.5 rounded-xl bg-[#22AC33] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openModal();
                }}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#22AC33] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer hover:bg-[#1A8C28] transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Free Quote</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
