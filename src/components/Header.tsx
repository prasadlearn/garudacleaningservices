import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, Home, ChevronDown, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { getServicesByCategory } from '../data/servicesData';
import { trackEvent } from '../utils/analytics';
import { MobileDrawer } from './MobileDrawer';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const { openModal } = useQuoteModal();
  const location = useLocation();

  const residentialServices = getServicesByCategory('residential');
  const specializedServices = getServicesByCategory('specialized');
  const commercialServices = getServicesByCategory('commercial');

  const isExactActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Publish real header height via ResizeObserver to --header-h
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-h', `${height}px`);
      }
    };

    updateHeaderHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateHeaderHeight();
      });
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Dropdown outside click & Escape key listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  const localityNames = BUSINESS_CONFIG.serviceAreas.slice(0, 5).map((a) => a.name.split('&')[0].trim()).join(', ');

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[var(--z-header)] bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-2xs transition-all"
        style={{
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        }}
      >
        <div className="max-w-7xl mx-auto h-16 sm:h-18 flex items-center justify-between gap-2 min-w-0">
          {/* Brand Logo Lockup (flex-1 min-w-0) */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 group"
            aria-label="Garuda Cleaning Services Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#22AC33] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <span
                className="font-black text-[#041B3B] tracking-tight truncate block"
                style={{ fontSize: 'clamp(14px, 3.8vw, 19px)' }}
              >
                Garuda <span className="text-[#22AC33] font-bold">Cleaning Services</span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-normal hidden sm:block truncate">
                Professional Mechanized Cleaning • Tirupati
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (>= 1024px) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-bold text-slate-700 shrink-0">
            <Link
              to="/"
              className={`py-2 transition-colors relative ${
                isExactActive('/') && !servicesDropdownOpen ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
              }`}
            >
              Home
              {isExactActive('/') && !servicesDropdownOpen && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
                />
              )}
            </Link>

            <Link
              to="/about"
              className={`py-2 transition-colors relative ${
                isExactActive('/about') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
              }`}
            >
              About
              {isExactActive('/about') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
                />
              )}
            </Link>

            {/* Services Dropdown with Bridge Area & Intent Delay */}
            <div
              ref={dropdownRef}
              className="relative py-2"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <div className="flex items-center gap-1">
                <Link
                  to="/services"
                  onFocus={handleDropdownEnter}
                  className={`transition-colors py-1 ${
                    isExactActive('/services') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
                  }`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Toggle services menu"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  onFocus={handleDropdownEnter}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-[#22AC33] hover:bg-slate-100 cursor-pointer"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-[#22AC33]' : ''
                    }`}
                  />
                </button>
              </div>

              {isExactActive('/services') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
                />
              )}

              {/* Desktop Mega-Menu Container */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                    className="fixed top-16 sm:top-18 left-1/2 -translate-x-1/2 pt-2 z-[var(--z-drawer)] w-[820px] max-w-[calc(100%-2rem)]"
                  >
                    {/* Invisible hover bridge */}
                    <div className="absolute -top-3 left-0 right-0 h-3" />

                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xl">
                      <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#041B3B]">
                          <MapPin className="w-3.5 h-3.5 text-[#22AC33]" />
                          Mechanized Deep Cleaning Services Across Tirupati
                        </span>
                        <span className="text-[11px] font-bold text-[#22AC33] bg-[#E8F8EC] px-2.5 py-0.5 rounded-full">
                          All 21 Services
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        {/* Residential */}
                        <div className="space-y-2">
                          <div className="border-b-2 border-[#041B3B] pb-1 mb-2">
                            <h4 className="text-[#22AC33] font-bold text-sm tracking-tight">
                              Residential ({residentialServices.length})
                            </h4>
                          </div>
                          <ul className="space-y-1 text-xs">
                            {residentialServices.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  to={`/services/${s.slug}`}
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className="text-slate-800 hover:text-[#22AC33] transition-colors py-1 block font-medium"
                                >
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Specialized */}
                        <div className="space-y-2">
                          <div className="border-b-2 border-[#041B3B] pb-1 mb-2">
                            <h4 className="text-[#22AC33] font-bold text-sm tracking-tight">
                              Specialized ({specializedServices.length})
                            </h4>
                          </div>
                          <ul className="space-y-1 text-xs">
                            {specializedServices.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  to={`/services/${s.slug}`}
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className="text-slate-800 hover:text-[#22AC33] transition-colors py-1 block font-medium"
                                >
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Commercial */}
                        <div className="space-y-2">
                          <div className="border-b-2 border-[#041B3B] pb-1 mb-2">
                            <h4 className="text-[#22AC33] font-bold text-sm tracking-tight">
                              Commercial ({commercialServices.length})
                            </h4>
                          </div>
                          <ul className="space-y-1 text-xs">
                            {commercialServices.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  to={`/services/${s.slug}`}
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className="text-slate-800 hover:text-[#22AC33] transition-colors py-1 block font-medium"
                                >
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 font-semibold text-[#041B3B]">
                          <span className="w-2 h-2 rounded-full bg-[#22AC33] animate-pulse" />
                          Serving {localityNames} & all surrounding areas
                        </span>
                        <Link
                          to="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="text-[#22AC33] font-extrabold hover:underline inline-flex items-center gap-1 min-h-[44px]"
                        >
                          <span>View All Services</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/gallery"
              className={`py-2 transition-colors relative ${
                isExactActive('/gallery') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
              }`}
            >
              Gallery
              {isExactActive('/gallery') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
                />
              )}
            </Link>

            <Link
              to="/pricing"
              className={`py-2 transition-colors relative ${
                isExactActive('/pricing') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
              }`}
            >
              Pricing
              {isExactActive('/pricing') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
                />
              )}
            </Link>

            <Link
              to="/products"
              className={`py-2 transition-colors relative ${
                isExactActive('/products') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
              }`}
            >
              Products
              {isExactActive('/products') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
                />
              )}
            </Link>

            <Link
              to="/contact"
              className={`py-2 transition-colors relative ${
                isExactActive('/contact') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
              }`}
            >
              Contact Us
              {isExactActive('/contact') && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
                />
              )}
            </Link>
          </nav>

          {/* Desktop Right CTA Area: Phone + Quote Button */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              onClick={() => trackEvent('call_click', { sourcePage: location.pathname })}
              className="min-h-[44px] flex items-center gap-2 bg-[#E8F8EC] text-[#041B3B] hover:bg-[#d6f2dc] px-4 py-2.5 rounded-full font-bold text-xs transition-colors border border-[#22AC33]/20"
            >
              <Phone className="w-3.5 h-3.5 text-[#22AC33]" />
              <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                trackEvent('book_click', { sourcePage: location.pathname });
                openModal();
              }}
              className="btn-homecare-green text-xs min-h-[44px] py-2.5 px-5 font-bold cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Right Controls: Call button (hidden < 360px) + Hamburger (always visible 44x44) */}
          <div className="flex lg:hidden items-center gap-1.5 shrink-0">
            {/* Call icon button: 44x44 touch target, hidden only below 360px */}
            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              onClick={() => trackEvent('call_click', { sourcePage: location.pathname })}
              className="hidden min-[360px]:flex w-11 h-11 rounded-xl bg-[#E8F8EC] text-[#22AC33] items-center justify-center border border-[#22AC33]/20 transition-colors shrink-0"
              aria-label="Call Garuda Cleaning Services"
            >
              <Phone className="w-5 h-5" />
            </a>

            {/* Hamburger button: always visible, never wraps, 44x44 */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              aria-label="Toggle Navigation Menu"
              className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer transition-colors shrink-0"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Standalone Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        triggerRef={hamburgerRef}
      />
    </>
  );
};
