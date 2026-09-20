import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CheckCircle2, Award, Star, Leaf, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F4F8FC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Part: Story & 4 Box Bullet points */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-[#22AC33] uppercase tracking-wider block">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041B3B] tracking-tight">
              Tirupati’s Trusted Cleaning Agency
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              With dedicated local experience, Garuda Cleaning Services delivers reliable cleaning services in Tirupati focused on quality and customer satisfaction. Our trained professionals handle residential and commercial cleaning across areas like Balaji Colony, AIR Bypass Road, MR Palli, and Renigunta Road, ensuring consistent results, attention to detail, and a hassle-free service experience every time.
            </p>

            {/* 4 Feature Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                'Trusted & Vetted Cleaners',
                'Customizable Cleaning Plans',
                'Home & Office Cleaning',
                'Assured Quality Service',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-[#22AC33] shrink-0" />
                  <span className="font-bold text-sm text-[#041B3B]">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/about" className="btn-navy text-xs py-3 px-6">
                Know More About Us
              </Link>
              <a
                href={BUSINESS_CONFIG.buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green text-xs py-3 px-6"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Now
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
              <img
                src="/images/bathroom-clean.jpg"
                alt="Bathroom and tile cleaning in Tirupati"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Part: Experts 4 Stats Boxes */}
        <div className="pt-10 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#22AC33] uppercase tracking-wider block">
              Garuda Experts
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#041B3B] mt-1">
              Committed to Flawless Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#041B3B] text-[#FFD700] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-extrabold text-[#041B3B] mb-1">450+ Projects</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Completed with proven systems and processes that guarantee thorough cleaning of all sizes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#041B3B] text-[#FFD700] flex items-center justify-center mb-4">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <h4 className="text-xl font-extrabold text-[#041B3B] mb-1">4.8-Star Rating</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strong customer feedback on Google showcasing consistent service excellence and trust.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#22AC33] text-white flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-extrabold text-[#041B3B] mb-1">Eco-Friendly</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Safe, certified non-corrosive products paired with mechanized single-disc scrubbing machines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#041B3B] text-[#22AC33] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-extrabold text-[#041B3B] mb-1">100% Satisfaction</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Room-by-room joint inspection with supervisor handover before payment is accepted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
