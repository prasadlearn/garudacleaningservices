import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Home, ChevronDown, Check, Sparkles, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openModal } = useQuoteModal();
  const location = useLocation();

  // 3 Tirupati Service Category Columns (Strictly Tirupati Only)
  const serviceCategories = [
    {
      title: 'Residential Cleaning',
      id: 'residential',
      services: [
        'Home Deep Cleaning',
        'Villa & Duplex Cleaning',
        'Kitchen Deep Cleaning',
        'Bathroom & Tile Scrubbing',
        'Sofa & Cushion Shampooing',
        'Carpet & Mattress Cleaning',
        'Balcony & Window Wash',
        'Move-in / Vacant House Clean',
      ],
    },
    {
      title: 'Specialized Cleaning',
      id: 'specialized',
      services: [
        'Floor Rotary Scrubbing & Buffing',
        'Hard-Water Scale Descaling',
        'Overhead Water Tank Wash',
        'Post-Construction Cleanup',
        'Wall Stain & Cobweb Detailing',
        'Kitchen Chimney & Degreasing',
        'Anti-Bacterial Disinfection',
        'Express Same-Day Cleaning',
      ],
    },
    {
      title: 'Commercial Cleaning',
      id: 'commercial',
      services: [
        'Corporate Office Cleaning',
        'Retail & Showroom Cleaning',
        'Clinic & Healthcare Detailing',
        'Bank & Financial Spaces',
        'Restaurant Kitchen Detailing',
        'School & Coaching Center Clean',
        'Commercial Facility Cleaning',
        'Periodic Maintenance AMC',
      ],
    },
  ];

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/faq', label: 'FAQ' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3">
        {/* Left: Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#22AC33] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
            <Home className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base sm:text-lg lg:text-xl text-[#041B3B] tracking-tight leading-tight block">
              Garuda <span className="text-[#22AC33]">Cleaning Services</span>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-normal block">
              Best Services for better Life • Tirupati
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-bold text-slate-700">
          <Link
            to="/"
            className={`transition-colors py-1 relative ${
              isActive('/') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
            }`}
          >
            Home
            {isActive('/') && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
              />
            )}
          </Link>

          <Link
            to="/about"
            className={`transition-colors py-1 relative ${
              isActive('/about') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
            }`}
          >
            About
            {isActive('/about') && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
              />
            )}
          </Link>

          {/* Services Mega-Dropdown: Green Border & 3 Tirupati Category Columns */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className={`flex items-center gap-1 py-1 cursor-pointer transition-colors ${
                location.pathname.startsWith('/services') || servicesDropdownOpen
                  ? 'text-[#22AC33] font-black'
                  : 'hover:text-[#22AC33] text-slate-700'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-[#22AC33]' : 'text-slate-500'
                }`}
              />
            </button>

            {/* Exact Mega Dropdown Card with Green Outline */}
            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[820px] xl:w-[860px] z-50"
                >
                  <div className="bg-white rounded-[28px] border-2 border-[#22AC33] p-7 xl:p-8 shadow-2xl">
                    {/* Top Tagline for Tirupati Location */}
                    <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#041B3B]">
                        <MapPin className="w-3.5 h-3.5 text-[#22AC33]" />
                        Professional Mechanized Cleaning Services Across Tirupati
                      </span>
                      <span className="text-[11px] font-bold text-[#22AC33] bg-[#E8F8EC] px-2.5 py-0.5 rounded-full">
                        Tirupati Headquarters
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                      {serviceCategories.map((col) => (
                        <div key={col.id} className="space-y-3">
                          {/* Column Title with Dark Underline */}
                          <div className="border-b-2 border-[#041B3B] pb-1.5 mb-3 inline-block">
                            <h4 className="text-[#22AC33] font-bold text-lg tracking-tight">
                              {col.title}
                            </h4>
                          </div>

                          {/* 8 Clean Service Items */}
                          <ul className="space-y-2">
                            {col.services.map((service, sIdx) => (
                              <li key={sIdx}>
                                <Link
                                  to={`/services#${service.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className="text-slate-800 hover:text-[#22AC33] transition-colors text-sm font-medium py-0.5 block"
                                >
                                  {service}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Bottom strip highlighting Tirupati areas */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 font-semibold text-[#041B3B]">
                        <span className="w-2 h-2 rounded-full bg-[#22AC33] animate-ping" />
                        Serving Balaji Colony, AIR Bypass, MR Palli, Renigunta & Chandragiri
                      </span>
                      <button
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          openModal();
                        }}
                        className="text-[#22AC33] font-extrabold hover:underline"
                      >
                        Request Custom Service Quote →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/gallery"
            className={`transition-colors py-1 relative ${
              isActive('/gallery') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
            }`}
          >
            Gallery
            {isActive('/gallery') && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
              />
            )}
          </Link>

          <Link
            to="/pricing"
            className={`transition-colors py-1 relative ${
              isActive('/pricing') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
            }`}
          >
            Pricing
            {isActive('/pricing') && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
              />
            )}
          </Link>

          <Link
            to="/reviews"
            className={`transition-colors py-1 relative ${
              isActive('/reviews') ? 'text-[#22AC33] font-black' : 'hover:text-[#22AC33] text-slate-700'
            }`}
          >
            Reviews
            {isActive('/reviews') && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#22AC33] rounded-full"
              />
            )}
          </Link>
        </nav>

        {/* Right: Circular Phone Icon + "Call to Anytime" + Navy "Contact us" Button */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              className="w-10 h-10 rounded-full bg-[#041B3B] text-white flex items-center justify-center shadow-sm hover:bg-[#22AC33] transition-colors shrink-0"
              aria-label="Call Anytime"
            >
              <Phone className="w-4 h-4 fill-current" />
            </a>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-medium text-slate-500 leading-none">
                Call to Anytime
              </span>
              <a
                href={BUSINESS_CONFIG.contact.phoneTel}
                className="text-sm font-black text-[#041B3B] hover:text-[#22AC33] transition-colors leading-tight mt-0.5 tracking-tight"
              >
                +91 77995 52084
              </a>
            </div>
          </div>

          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-full bg-[#041B3B] text-white text-xs font-extrabold hover:bg-[#22AC33] transition-colors shadow-sm"
          >
            Contact us
          </Link>
        </div>

        {/* Mobile Hamburger & Call Buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            className="w-9 h-9 rounded-full bg-[#041B3B] text-white flex items-center justify-center shadow-xs sm:hidden"
            aria-label="Call Now"
          >
            <Phone className="w-4 h-4 fill-current" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-slate-100 text-[#041B3B] hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Floating Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-18 sm:top-20 bg-black/60 backdrop-blur-xs z-40"
            />

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-18 sm:top-20 left-0 right-0 bg-white border-b border-slate-200 p-5 shadow-2xl z-50 rounded-b-3xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-1.5 mb-4">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={`p-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                    isActive('/') ? 'bg-[#E8F8EC] text-[#22AC33]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Home</span>
                  {isActive('/') && <span className="w-2 h-2 rounded-full bg-[#22AC33]" />}
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className={`p-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                    isActive('/about') ? 'bg-[#E8F8EC] text-[#22AC33]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>About</span>
                  {isActive('/about') && <span className="w-2 h-2 rounded-full bg-[#22AC33]" />}
                </Link>

                {/* Collapsible Mobile Services with 3 Tirupati Categories */}
                <div className="rounded-xl border border-[#22AC33]/40 overflow-hidden bg-slate-50/50">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full p-3 text-sm font-bold flex items-center justify-between text-[#041B3B] bg-white cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#22AC33]" />
                      Services in Tirupati
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#22AC33] transition-transform ${
                        mobileServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileServicesOpen && (
                    <div className="p-3 bg-white border-t border-slate-100 space-y-4 text-xs">
                      {serviceCategories.map((col) => (
                        <div key={col.id} className="space-y-1.5">
                          <div className="font-bold text-[#22AC33] border-b border-[#041B3B] pb-0.5 inline-block text-xs uppercase tracking-wider">
                            {col.title}
                          </div>
                          <div className="grid grid-cols-1 gap-1 pl-1">
                            {col.services.map((service, idx) => (
                              <Link
                                key={idx}
                                to={`/services#${service.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                onClick={() => setMobileOpen(false)}
                                className="py-1 text-slate-700 hover:text-[#22AC33] font-medium"
                              >
                                • {service}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/gallery"
                  onClick={() => setMobileOpen(false)}
                  className={`p-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                    isActive('/gallery') ? 'bg-[#E8F8EC] text-[#22AC33]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Gallery</span>
                  {isActive('/gallery') && <span className="w-2 h-2 rounded-full bg-[#22AC33]" />}
                </Link>

                <Link
                  to="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className={`p-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                    isActive('/pricing') ? 'bg-[#E8F8EC] text-[#22AC33]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Pricing</span>
                  {isActive('/pricing') && <span className="w-2 h-2 rounded-full bg-[#22AC33]" />}
                </Link>

                <Link
                  to="/reviews"
                  onClick={() => setMobileOpen(false)}
                  className={`p-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                    isActive('/reviews') ? 'bg-[#E8F8EC] text-[#22AC33]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Reviews</span>
                  {isActive('/reviews') && <span className="w-2 h-2 rounded-full bg-[#22AC33]" />}
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={`p-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                    isActive('/contact') ? 'bg-[#E8F8EC] text-[#22AC33]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Contact us</span>
                  {isActive('/contact') && <span className="w-2 h-2 rounded-full bg-[#22AC33]" />}
                </Link>
              </div>

              {/* Mobile Phone Banner */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={BUSINESS_CONFIG.contact.phoneTel}
                  className="w-full py-3 px-4 rounded-xl bg-[#041B3B] text-white flex items-center justify-center gap-2 font-bold text-sm shadow-md"
                >
                  <Phone className="w-4 h-4 fill-current text-[#FFD700]" />
                  <span>Call to Anytime: +91 77995 52084</span>
                </a>

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openModal();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#22AC33] text-white font-bold text-sm shadow-md"
                >
                  Book Service Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
