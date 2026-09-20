import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const FooterSection: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
  };

  return (
    <footer className="bg-white text-slate-700 pt-16 pb-28 sm:pb-16 px-4 sm:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
          {/* Logo & Intro */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#22AC33] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Home className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-[#041B3B] tracking-tight block leading-tight">
                  Garuda <span className="text-[#22AC33]">Cleaning Services</span>
                </span>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Tirupati • Deep Cleaning Solutions
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Tirupati’s highest-rated mechanized cleaning company. Providing room-by-room deep machine scrub, sofa hot shampooing, acid-free bathroom descaling, modular kitchen degreasing, and villa detailing.
            </p>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#22AC33] shrink-0" />
                <a href={BUSINESS_CONFIG.contact.phoneTel} className="font-bold text-[#041B3B] hover:text-[#22AC33] transition-colors">
                  {BUSINESS_CONFIG.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#22AC33] shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Clock className="w-4 h-4 text-[#22AC33] shrink-0" />
                <span>Operating Hours: 7:00 AM - 9:00 PM (All 7 Days)</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[#041B3B] font-extrabold text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link to="/" className="hover:text-[#22AC33] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#22AC33] transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#22AC33] transition-colors">All Services</Link></li>
              <li><Link to="/pricing" className="hover:text-[#22AC33] transition-colors">Rate Card & Pricing</Link></li>
              <li><Link to="/reviews" className="hover:text-[#22AC33] transition-colors">Customer Reviews (4.8★)</Link></li>
              <li><Link to="/gallery" className="hover:text-[#22AC33] transition-colors">Before & After Gallery</Link></li>
              <li><Link to="/service-areas" className="hover:text-[#22AC33] transition-colors">Tirupati Locations</Link></li>
              <li><Link to="/faq" className="hover:text-[#22AC33] transition-colors">FAQ & Guide</Link></li>
              <li><Link to="/contact" className="hover:text-[#22AC33] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Specialized Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[#041B3B] font-extrabold text-sm uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link to="/services/home-deep-cleaning" className="hover:text-[#22AC33] transition-colors">Full Home Deep Cleaning</Link></li>
              <li><Link to="/services/bathroom-cleaning" className="hover:text-[#22AC33] transition-colors">Acid-Free Bathroom Descaling</Link></li>
              <li><Link to="/services/kitchen-cleaning" className="hover:text-[#22AC33] transition-colors">Modular Kitchen Degreasing</Link></li>
              <li><Link to="/services/sofa-cleaning" className="hover:text-[#22AC33] transition-colors">Sofa & Upholstery Spa</Link></li>
              <li><Link to="/services/carpet-cleaning" className="hover:text-[#22AC33] transition-colors">Carpet Steam Cleaning</Link></li>
              <li><Link to="/services/villa-cleaning" className="hover:text-[#22AC33] transition-colors">Luxury Villa & Duplex Scrub</Link></li>
              <li><Link to="/services/floor-scrubbing-polishing" className="hover:text-[#22AC33] transition-colors">Mechanized Floor Buffing</Link></li>
              <li><Link to="/services/office-commercial-cleaning" className="hover:text-[#22AC33] transition-colors">Office & Commercial Sanitization</Link></li>
            </ul>
          </div>

          {/* Right Form: Quick Callback Box */}
          <div className="lg:col-span-3 bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-[#041B3B] mb-1">Request Instant Callback</h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Enter your details to receive an exact price quote for your Tirupati address.
              </p>

              {formSent ? (
                <div className="text-center py-6 space-y-2 bg-white rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-[#22AC33] mx-auto" />
                  <p className="text-xs font-bold text-[#041B3B]">Request Submitted!</p>
                  <p className="text-[11px] text-slate-500">Our Tirupati dispatch supervisor will call you within 10 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:border-[#22AC33] outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:border-[#22AC33] outline-none"
                  />
                  <button
                    type="submit"
                    className="btn-homecare-green w-full text-xs py-2.5 justify-center font-bold cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Request Fast Callback
                  </button>
                </form>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22AC33] shrink-0" />
              <span>Zero Spam. No advance payment.</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Garuda Cleaning Services, Tirupati. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/service-areas" className="hover:text-slate-600 transition-colors">Locality Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
