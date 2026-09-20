import React from 'react';
import { motion } from 'framer-motion';
import { TeamAboutSection } from '../components/TeamAboutSection';
import { StatsCounter } from '../components/StatsCounter';
import { BenefitsSection } from '../components/BenefitsSection';
import { WorkProcessSection } from '../components/WorkProcessSection';
import { HappySmilesSection } from '../components/HappySmilesSection';
import { AreasList } from '../components/AreasList';
import { Phone, MessageCircle, ShieldCheck, Award, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';

export const AboutPage: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <div className="pt-20 bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#041B3B] via-[#052550] to-[#041B3B] text-white py-16 sm:py-24 px-4 sm:px-8 border-b border-white/10 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-bold border border-white/20"
          >
            <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
            Tirupati's Trusted Mechanized Cleaning Partner
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight"
          >
            About Garuda Cleaning Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Dedicated to bringing hospital-grade cleanliness, modern European machinery, and safe biological formulations to residences, temples, clinics, and businesses across Tirupati.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-3.5 pt-4">
            <button
              onClick={() => openModal()}
              className="btn-homecare-green text-xs py-3 px-8 font-bold shine-effect"
            >
              Get Free Estimate
            </button>
            <a
              href={BUSINESS_CONFIG.buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-homecare-navy text-xs py-3 px-8 border border-white/20 font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Stats Counter with animated count-up */}
      <StatsCounter />

      {/* Story & Mission Detailed Section */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="homecare-pill">Our Founding Story</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041B3B] leading-tight">
              Raising Cleaning Standards in the Holy City of Tirupati
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded with a clear mission, <strong>Garuda Cleaning Services</strong> was established to replace unorganized maid labor and hazardous corrosive acids with certified mechanized cleaning solutions.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tirupati homes face specific local challenges: high calcium borewell water that scales bathroom tiles within weeks, heavy temple visitor dust, and greasy spice cooking in modular kitchens. Standard manual mopping simply spreads the dirt around.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We invested in <strong>German single-disc rotary scrubbers</strong>, <strong>high-temp steam cleaners</strong>, and genuine <strong>Diversey / Taski professional chemicals</strong> to deliver noticeable results that keep Tirupati homes hygienic, odor-free, and gleaming.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#E8F8EC] border border-emerald-200">
                <div className="text-2xl font-black text-[#22AC33]">100%</div>
                <div className="text-xs font-bold text-[#041B3B] mt-1">Acid-Free Descaling</div>
                <div className="text-[11px] text-slate-600">Zero enamel erosion or fumes</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black text-[#041B3B]">2 Hours</div>
                <div className="text-xs font-bold text-[#041B3B] mt-1">Response Window</div>
                <div className="text-[11px] text-slate-600">Prompt arrival across Tirupati</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 aspect-[4/3] bg-slate-900 group">
              <img
                src="/images/cleaning-team.jpg"
                alt="Garuda Cleaning Services Uniformed Team in Tirupati"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#22AC33] text-white flex items-center justify-center font-black">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-[#041B3B]">Police-Verified Staff</div>
                <div className="text-xs text-slate-500">Uniformed & Trained In-House</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#F4F8FC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="homecare-pill mb-2">Our Core Standards</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] mt-1">
              The 4 Pillars of Garuda Excellence
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Why homeowners and enterprise clients in Tirupati repeatedly choose us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Heavy Industrial Equipment',
                desc: 'Single-disc rotary scrubbers, 140-bar pressure washers, and HEPA injection-extraction machines that outmatch manual cleaning by 10x.',
                icon: Sparkles,
              },
              {
                title: 'Diversey / Taski Formulations',
                desc: 'Zero dangerous raw muriatic acids. We strictly use pH-neutral, baby-safe, pet-friendly biological descalers and sanitizers.',
                icon: ShieldCheck,
              },
              {
                title: 'In-House Trained Specialists',
                desc: 'Every cleaner is directly employed, police-verified, uniformed, and coached on delicate granite, marble, and modular finishes.',
                icon: Award,
              },
              {
                title: 'Joint Inspection Signoff',
                desc: 'Zero upfront payment required. You inspect each room with our supervisor before making payment. Free immediate spot correction.',
                icon: HeartHandshake,
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-[#041B3B] mb-2">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team & Operations Component */}
      <TeamAboutSection />

      {/* Benefits Component */}
      <BenefitsSection />

      {/* Work Process Component */}
      <WorkProcessSection />

      {/* Happy Smiles Component */}
      <HappySmilesSection />

      {/* Localities Component */}
      <AreasList />
    </div>
  );
};
