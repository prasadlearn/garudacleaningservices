import React from 'react';
import { motion } from 'framer-motion';
import { StatsCounter } from '../components/StatsCounter';
import { BenefitsSection } from '../components/BenefitsSection';
import { WorkProcessSection } from '../components/WorkProcessSection';
import { HappySmilesSection } from '../components/HappySmilesSection';
import { AreasList } from '../components/AreasList';
import { MessageCircle, ShieldCheck, Award, HeartHandshake, Sparkles, Wrench } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { SafeImage } from '../components/SafeImage';
import { EQUIPMENT_ITEMS, TEAM_GALLERY_ITEMS } from '../data/galleryData';

export const AboutPage: React.FC = () => {
  const { openModal } = useQuoteModal();

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Garuda Cleaning Services',
    description: 'Learn about Garuda Cleaning Services, our mechanized cleaning machinery, verified team, and surface-safe methods in Tirupati.',
    url: 'https://garudacleaningservices.in/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'Garuda Cleaning Services',
      telephone: '+917799552084',
      areaServed: [
        {
          '@type': 'City',
          name: 'Tirupati'
        },
        {
          '@type': 'City',
          name: 'Rayachoty'
        }
      ]
    }
  };

  return (
    <div className="bg-white">
      {/* React 19 Head Hoisting */}
      <title>About Garuda Cleaning Services | Tirupati &amp; Rayachoty</title>
      <meta
        name="description"
        content="Learn about Garuda Cleaning Services: our founding mission, mechanized cleaning equipment, and professional doorstep cleaning services across Tirupati and Rayachoty."
      />
      <link rel="canonical" href="https://garudacleaningservices.in/about" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#041B3B] via-[#052550] to-[#041B3B] text-white py-16 sm:py-24 px-4 sm:px-8 border-b border-white/10 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-[var(--z-content)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-bold border border-white/20"
          >
            <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
            Professional Mechanized Cleaning • Tirupati &amp; Rayachoty
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black tracking-tight !text-white"
          >
            About Garuda Cleaning Services
          </motion.h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Providing reliable cleaning for homes, flats, villas, and offices all across Tirupati and Rayachoty using modern cleaning machines and safe cleaning liquids.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openModal()}
              className="btn-homecare-green text-xs sm:text-sm py-3 px-8 font-bold min-h-[48px] cursor-pointer"
            >
              Get Free Estimate
            </button>
            <a
              href={BUSINESS_CONFIG.buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-8 py-3 rounded-full bg-white/10 hover:bg-white hover:text-[#041B3B] text-white border-2 border-white/50 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-[#22AC33]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Counter (Auto-hides if null) */}
      <StatsCounter />

      {/* Story & Mission Detailed Section */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="homecare-pill">Why We Started Garuda</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041B3B] leading-tight">
              Clean, Fresh &amp; Spotless Spaces for Every Home in Tirupati &amp; Rayachoty
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We started <strong>Garuda Cleaning Services</strong> to provide professional, machine-based doorstep cleaning across Tirupati and Rayachoty without using harsh, dangerous acids that damage tiles and leave strong fumes.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Homes and offices across Tirupati and Rayachoty often face tough cleaning challenges: hard borewell water white marks (uppu neellu karalu) on washroom tiles, thick road dust, and sticky oil grease in kitchens. Normal daily broom-and-mop cleaning only moves the dirt around.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our trained team brings modern single-disc floor scrubbers, wet and dry vacuum machines, and gentle surface-safe cleaning liquids to make your floors, washrooms, kitchen, and sofas look clean, spotless, and like new.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#E8F8EC] border border-emerald-200">
                <div className="text-2xl font-black text-[#22AC33]">100% Acid-Free</div>
                <div className="text-xs font-bold text-[#041B3B] mt-1">Safe Cleaning Liquids</div>
                <div className="text-[11px] text-slate-600">Protects tiles, taps &amp; fittings with no bad smell</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black text-[#041B3B]">7 Days a Week</div>
                <div className="text-xs font-bold text-[#041B3B] mt-1">Available in Tirupati &amp; Rayachoty</div>
                <div className="text-[11px] text-slate-600">8:00 AM – 8:00 PM for all service areas</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 aspect-4/3 bg-slate-900 group">
              <SafeImage
                src="/images/equipment/full-kit.webp"
                alt="Garuda Cleaning Services Machinery and Equipment Kit for Tirupati and Rayachoty"
                fallbackLabel="Garuda Cleaning Equipment Kit"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#22AC33] text-white flex items-center justify-center font-black">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-black text-[#041B3B]">Trained Cleaning Specialists</div>
                <div className="text-xs text-slate-500">Uniformed &amp; Equipped In-House</div>
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
              Our simple promises to every homeowner and business client across Tirupati and Rayachoty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Modern Cleaning Machines',
                desc: 'Single-disc floor scrubbers, vacuum cleaners, and high-pressure washers for thorough cleaning that manual mopping cannot do.',
                icon: Sparkles,
              },
              {
                title: 'Safe, Acid-Free Liquids',
                desc: 'We never use harsh harmful acids. Our specialized liquids remove tough hard water salt stains and grease without damaging tiles or taps.',
                icon: ShieldCheck,
              },
              {
                title: 'Trained In-House Staff',
                desc: 'Our staff comes in proper uniform with masks and gloves. They handle your home, wooden work, and glass items with utmost care.',
                icon: Award,
              },
              {
                title: 'Pay After Inspection',
                desc: 'No advance payment needed. Check each room with our team after the work is done, and pay once you are satisfied with the results.',
                icon: HeartHandshake,
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
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

      {/* Equipment & Technology Showcase */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="homecare-pill mb-2">
              <Wrench className="w-3.5 h-3.5 inline mr-1" />
              Our Machines & Tools
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] mt-1">
              Professional Cleaning Equipment
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              We invest in modern machines so your home gets cleaned faster, thoroughly, and completely safe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EQUIPMENT_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-[#041B3B] mb-2 group-hover:text-[#22AC33] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-auto">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On-Site Cleaning Crew Standards */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#F4F8FC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="homecare-pill mb-2">Our Team</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] mt-1">
              Uniformed, Trained & Supervised Cleaning Staff
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Every cleaning job is supervised by an on-site team lead to ensure high quality and care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_GALLERY_ITEMS.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8EC] text-[#22AC33] text-[11px] font-bold uppercase tracking-wider mb-3">
                    {member.role}
                  </div>
                  <h3 className="text-base font-bold text-[#041B3B] mb-2">{member.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

export default AboutPage;
