import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { getEnabledServices } from '../data/servicesData';
import { TRUST_CONFIG } from '../config/trustConfig';

export const FooterSection: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const enabledServices = getEnabledServices();

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
    const msg = `Hello Garuda Cleaning Services, my name is ${name} (${phone}). I would like to request an instant callback for cleaning in Tirupati.`;
    window.open(BUSINESS_CONFIG.buildWhatsAppUrl(msg), '_blank');
  };

  return (
    <footer className="bg-white text-slate-700 pt-16 pb-28 sm:pb-16 px-4 sm:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          {/* Logo & Intro */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="Garuda Cleaning Services Home">
              <div className="w-11 h-11 rounded-2xl bg-[#1A8C28] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Home className="w-6 h-6 fill-current" />
              </div>
              <div className="flex flex-col min-w-0 leading-tight">
                <span className="font-black text-xl text-[#041B3B] tracking-tight block">
                  Garuda <span className="text-[#1A8C28]">Cleaning Services</span>
                </span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Tirupati • Deep Cleaning Solutions
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed">
              Professional cleaning solutions in Tirupati. Providing apartment deep cleaning, villa detailing, bathroom scale clearing, kitchen degreasing, and commercial sanitization.
            </p>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-2.5 min-h-[44px]">
                <Phone className="w-4 h-4 text-[#1A8C28] shrink-0" />
                <a
                  href={BUSINESS_CONFIG.contact.phoneTel}
                  className="font-bold text-[#041B3B] hover:text-[#1A8C28] transition-colors py-2"
                >
                  {BUSINESS_CONFIG.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1A8C28] shrink-0 mt-0.5" />
                <div>
                  <span>{BUSINESS_CONFIG.contact.address}</span>
                  <a
                    href={
                      BUSINESS_CONFIG.contact.mapsPlaceUrl ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_CONFIG.contact.city + ', ' + BUSINESS_CONFIG.contact.state)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#1A8C28] hover:underline flex items-center gap-1 mt-1"
                  >
                    <span>Find us on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 font-semibold">
                <Clock className="w-4 h-4 text-[#1A8C28] shrink-0" />
                <span>Operating Hours: {BUSINESS_CONFIG.contact.operatingHours}</span>
              </div>

              {TRUST_CONFIG.googleReviewUrl && (
                <div className="pt-2">
                  <a
                    href={TRUST_CONFIG.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A8C28] hover:underline min-h-[44px]"
                  >
                    <span>Leave a Google Review</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[#041B3B] font-extrabold text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1 text-sm font-semibold">
              <li><Link to="/" className="hover:text-[#1A8C28] text-slate-700 transition-colors min-h-[44px] flex items-center">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#1A8C28] text-slate-700 transition-colors min-h-[44px] flex items-center">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#1A8C28] text-slate-700 transition-colors min-h-[44px] flex items-center">All Services</Link></li>
              <li><Link to="/pricing" className="hover:text-[#1A8C28] text-slate-700 transition-colors min-h-[44px] flex items-center">Rate Card & Pricing</Link></li>
              <li><Link to="/products" className="hover:text-[#1A8C28] text-slate-700 transition-colors min-h-[44px] flex items-center">Garuda Liquids (Wholesale)</Link></li>
              <li><Link to="/gallery" className="hover:text-[#1A8C28] text-slate-700 transition-colors min-h-[44px] flex items-center">Before & After Gallery</Link></li>
              <li><Link to="/service-areas" className="hover:text-[#1A8C28] text-slate-700 transition-colors min-h-[44px] flex items-center">Tirupati Locations</Link></li>
              <li><Link to="/faq" className="hover:text-[#1A8C28] text-slate-700 transition-colors min-h-[44px] flex items-center">FAQ & Guide</Link></li>
              <li><Link to="/contact" className="hover:text-[#1A8C28] text-slate-700 transition-colors min-h-[44px] flex items-center">Contact Us</Link></li>
            </ul>
          </div>

          {/* Specialized Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[#041B3B] font-extrabold text-sm uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-1 text-sm font-semibold">
              {enabledServices.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.slug}`} className="hover:text-[#1A8C28] text-slate-700 transition-colors min-h-[44px] flex items-center">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-[#1A8C28] font-bold hover:underline min-h-[44px] flex items-center">
                  View All {enabledServices.length} Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Form: Quick Callback Box */}
          <div className="lg:col-span-3 bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-[#041B3B] mb-1">Request Instant Callback</h4>
              <p className="text-xs text-slate-600 mb-3">
                Enter your details to receive an exact price quote for your Tirupati address.
              </p>

              {formSent ? (
                <div className="text-center py-6 space-y-2 bg-white rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-[#1A8C28] mx-auto" />
                  <p className="text-sm font-bold text-[#041B3B]">Request Submitted!</p>
                  <p className="text-xs text-slate-600">Our Tirupati team will call you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="footer-name" className="sr-only">Your Name</label>
                    <input
                      id="footer-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-base focus:border-[#1A8C28] focus:ring-2 focus:ring-[#1A8C28]/20 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="footer-phone" className="sr-only">Mobile Number</label>
                    <input
                      id="footer-phone"
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Mobile Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-base focus:border-[#1A8C28] focus:ring-2 focus:ring-[#1A8C28]/20 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-homecare-green w-full min-h-[48px] text-xs py-3 justify-center font-bold cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Fast Callback</span>
                  </button>
                </form>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#1A8C28] shrink-0" />
              <span>Zero spam. Direct local support.</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>© {new Date().getFullYear()} Garuda Cleaning Services, Tirupati. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-900 transition-colors py-2">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-900 transition-colors py-2">Terms of Service</Link>
            <span>•</span>
            <Link to="/service-areas" className="hover:text-slate-900 transition-colors py-2">Locality Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
