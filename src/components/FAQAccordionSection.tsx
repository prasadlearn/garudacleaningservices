import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, PhoneCall } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { SafeImage } from './SafeImage';

const FAQS = [
  {
    q: 'Do I need to provide any cleaning tools, machines, or supplies?',
    a: 'No, you don\'t need to provide anything. Our team brings all the equipment needed, including rotary floor scrubbers, vacuum machines, cleaning cloths, and surface-safe cleaning products.'
  },
  {
    q: 'Are your cleaning products safe for floors, children, and pets?',
    a: 'Yes. We use acid-free cleaning solutions and surface-safe liquids. They clean thoroughly without damaging tiles, marble, or fittings, and they do not produce harsh fumes.'
  },
  {
    q: 'How long does a deep cleaning service take?',
    a: 'A 1 or 2 BHK apartment usually takes about 4 to 5 hours. Larger 3 BHK apartments and villas take 6 to 8 hours depending on property size and condition.'
  },
  {
    q: 'How do you clean hard water stains on tiles and taps?',
    a: 'We apply acid-free descaling foam to taps, tiles, and glass surfaces to break down mineral deposits before scrubbing and wiping them clean.'
  },
  {
    q: 'How does payment work? Are there any hidden travel charges?',
    a: 'We have fixed, upfront pricing with zero hidden travel charges anywhere within Tirupati. You pay only after the cleaning is completed and you have checked the work.'
  },
  {
    q: 'How do I book a cleaning appointment?',
    a: 'You can book online by clicking Book Now or Get Free Quote, or message us directly on WhatsApp with your location and property details to confirm a time slot.'
  }
];

export const FAQAccordionSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Cleaner Image on Left with Badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-slate-900 relative group">
            <SafeImage
              src="/images/kitchen-clean.webp"
              alt="Cleaning Services in Tirupati"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041B3B]/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/50 text-[#041B3B]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#22AC33] text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Have a Question?</div>
                  <a href={BUSINESS_CONFIG.contact.phoneTel} className="text-sm font-black text-[#041B3B] hover:text-[#22AC33] transition-colors">
                    Call {BUSINESS_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Accordion on Right with Smooth Framer Motion */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <div>
            <span className="homecare-pill mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              Questions & Answers
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Common questions about our cleaning services and booking process in Tirupati.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((f, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={i}
                  className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                    isOpen
                      ? 'border-[#22AC33] bg-[#E8F8EC]/30 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#041B3B] cursor-pointer"
                  >
                    <span>{f.q}</span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-[#22AC33] text-white rotate-180' : 'bg-slate-100 text-[#22AC33]'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 pt-3">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
