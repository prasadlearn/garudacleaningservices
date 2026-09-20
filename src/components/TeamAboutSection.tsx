import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const TeamAboutSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm bg-[#FAFAFA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Team with Machines + 4.8★ Box */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-xl border-4 border-white">
                <img
                  src="/images/office-clean.jpg"
                  alt="Garuda Cleaning Services Uniformed Team"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 4.8★ Yellow Box Badge */}
              <div className="absolute -bottom-4 -left-2 sm:-left-3 bg-[#FFD700] text-[#041B3B] p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-2 border-2 border-white">
                <span className="text-2xl sm:text-3xl font-black">4.8★</span>
                <div className="text-[10px] sm:text-xs font-black leading-tight uppercase">
                  Google<br />Verified
                </div>
              </div>
            </div>

            {/* Right Column: About Us */}
            <div className="lg:col-span-6 space-y-5">
              <span className="homecare-pill">About Us</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B]">
                About Garuda Cleaning Services
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                With over a decade of experience, Garuda Cleaning Services delivers reliable cleaning services in Tirupati focused on quality and customer satisfaction. Our trained professionals handle residential and commercial cleaning across areas like Balaji Colony, AIR Bypass Road, MR Palli, and Renigunta Road, ensuring consistent results, attention to detail, and a hassle-free service experience every time.
              </p>

              {/* 4 Checklist Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Trusted & Vetted Cleaners',
                  'Customizable Cleaning Plans',
                  'Home & Office Cleaning',
                  'Assured Quality Service',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#041B3B]">
                    <CheckCircle2 className="w-4 h-4 text-[#22AC33] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Buttons: Know More + WhatsApp Now */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <Link to="/about" className="btn-homecare-navy text-xs py-3 px-6 text-center justify-center font-bold">
                  Know more
                </Link>

                <a
                  href={BUSINESS_CONFIG.buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-homecare-green text-xs py-3 px-6 text-center justify-center font-bold shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: +91 77995 52084
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
