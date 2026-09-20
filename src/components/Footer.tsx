import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Sparkles, MessageCircle, Star } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#041B3B] text-slate-300 pt-16 pb-28 sm:pb-16 px-4 sm:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white text-[#041B3B] flex items-center justify-center font-bold shadow-md">
                <Sparkles className="w-5 h-5 text-[#22AC33]" />
              </div>
              <div>
                <span className="font-extrabold text-2xl text-white tracking-tight block leading-none">
                  GARUDA
                </span>
                <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-wider block">
                  Cleaning Services • Tirupati
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Garuda Cleaning Services delivers reliable, high-standard residential and commercial cleaning services across Tirupati. 450+ completed projects, trained professionals, and 100% satisfaction guarantee.
            </p>

            <div className="flex items-center gap-1.5 text-[#FFD700] text-xs font-bold pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-white ml-1">4.8 / 5.0 (Google Reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-[#FFD700] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#FFD700] transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#FFD700] transition-colors">Cleaning Services</Link></li>
              <li><Link to="/gallery" className="hover:text-[#FFD700] transition-colors">Work Gallery</Link></li>
              <li><Link to="/service-areas" className="hover:text-[#FFD700] transition-colors">Service Areas</Link></li>
              <li><Link to="/contact" className="hover:text-[#FFD700] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Packages */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2">
              Cleaning Packages
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/services" className="hover:text-[#FFD700] transition-colors">1 BHK Deep Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-[#FFD700] transition-colors">2 BHK Deep Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-[#FFD700] transition-colors">3 BHK Deep Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-[#FFD700] transition-colors">4 BHK &amp; Villa Deep Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-[#FFD700] transition-colors">Kitchen Degreasing</Link></li>
              <li><Link to="/services" className="hover:text-[#FFD700] transition-colors">Bathroom Descaling</Link></li>
              <li><Link to="/services" className="hover:text-[#FFD700] transition-colors">Sofa Shampooing Spa</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2">
              Tirupati Branch
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFD700] shrink-0" />
                <a href={BUSINESS_CONFIG.contact.phoneTel} className="font-bold text-white hover:text-[#FFD700]">
                  {BUSINESS_CONFIG.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#22AC33] shrink-0" />
                <a href={BUSINESS_CONFIG.buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="font-bold text-[#22AC33] hover:underline">
                  WhatsApp Support
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>{BUSINESS_CONFIG.contact.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Garuda Cleaning Services, Tirupati. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
