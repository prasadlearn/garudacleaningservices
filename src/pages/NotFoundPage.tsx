import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, MessageCircle, Phone, Search } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      {/* React 19 Native Head Hoisting for noindex & title */}
      <title>404 - Page Not Found | Garuda Cleaning Services Tirupati</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="description" content="The page you are looking for does not exist on Garuda Cleaning Services." />

      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-8 py-20 bg-gradient-to-b from-white to-[#F4F8FC]">
        <div className="max-w-xl w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#E8F8EC] text-[#22AC33] mb-6 shadow-sm border border-[#22AC33]/20">
            <Search className="w-10 h-10" />
          </div>

          <span className="homecare-pill mb-3">404 Error</span>

          <h1 className="text-4xl sm:text-5xl font-black text-[#041B3B] tracking-tight mb-4">
            Page Not Found
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us help you find what you need.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link to="/" className="btn-homecare-green w-full sm:w-auto">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link to="/services" className="btn-homecare-navy w-full sm:w-auto">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-4">
              Need immediate assistance or want to book a service in Tirupati?
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-bold">
              <a
                href={BUSINESS_CONFIG.contact.phoneTel}
                className="inline-flex items-center gap-1.5 text-[#041B3B] hover:text-[#22AC33] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#22AC33]" />
                Call {BUSINESS_CONFIG.contact.phoneDisplay}
              </a>
              <span className="text-slate-300">•</span>
              <a
                href={BUSINESS_CONFIG.buildWhatsAppUrl('Hello Garuda Cleaning Services, I reached an invalid link and need assistance.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#22AC33] hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
