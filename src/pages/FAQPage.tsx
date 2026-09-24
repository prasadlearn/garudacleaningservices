import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle, PhoneCall, Sparkles, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';

interface FAQCategory {
  category: string;
  items: { q: string; a: string }[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    category: 'Booking & Scheduling',
    items: [
      {
        q: 'How far in advance should I book my deep cleaning session?',
        a: 'We recommend booking 24 to 48 hours in advance to secure your preferred morning or afternoon time slot. However, for urgent requirements, we also offer express same-day emergency slots within 2 hours in Tirupati.'
      },
      {
        q: 'Can I reschedule or cancel my booking?',
        a: 'Yes, rescheduling is free of charge up to 4 hours before the scheduled crew arrival time. Just call us or message our WhatsApp helpline.'
      },
      {
        q: 'Do you work on Sundays and public holidays?',
        a: 'Yes! Garuda Cleaning Services operates 7 days a week, from 7:00 AM to 9:00 PM, including all Sundays and festival holidays to fit your busy schedule.'
      }
    ]
  },
  {
    category: 'Equipment & Safe Chemicals',
    items: [
      {
        q: 'What machines does your team bring?',
        a: 'Our crew arrives with heavy-duty industrial equipment: German single-disc mechanical floor scrubbers (Taski Ergodisc), commercial wet and dry slurry vacuum extractors, high-pressure washers (140 Bar), and upholstery injection-extraction machines.'
      },
      {
        q: 'Do you use hazardous muriatic acid on tiles or bathrooms?',
        a: 'NEVER. Raw hydrochloric/muriatic acid burns skin, emits toxic fumes that damage lungs, and permanently erodes ceramic tile enamel and cement grout. We exclusively deploy Diversey / Taski biodegradable neutral sanitizers and organic salt descalers.'
      },
      {
        q: 'Are your solutions safe for infants, pregnant women, and pets?',
        a: 'Yes! All formulations used by Garuda are hospital-grade, non-carcinogenic, and certified safe. There are zero pungent acid fumes or lingering chemical toxins.'
      }
    ]
  },
  {
    category: 'Preparation & What to Expect',
    items: [
      {
        q: 'Do I need to empty all kitchen cabinets and wardrobes?',
        a: 'For standard deep cleaning, external surfaces, chimney exterior, backsplash tiles, and appliances are cleaned without opening locked personal wardrobes. If you book full internal modular cabinet detailing, emptying loose utensils is helpful, or our crew can assist.'
      },
      {
        q: 'Do I need to be present throughout the entire service?',
        a: 'You only need to be present at the start to guide our team supervisor regarding special priorities, and at the end for the final inspection handover and payment.'
      },
      {
        q: 'What do I need to provide for the cleaning crew?',
        a: 'Just access to running tap water and a working electrical outlet for our machines. We bring all ladders, detergents, scrubbers, vacuum machines, and microfiber wipers.'
      }
    ]
  },
  {
    category: 'Pricing & Guarantees',
    items: [
      {
        q: 'Are there any hidden costs or transport charges in Tirupati?',
        a: 'No hidden costs whatsoever. All quotes include labor, equipment, detergents, and transport throughout Tirupati city and neighboring mandals.'
      },
      {
        q: 'What if I want to check a specific area after cleaning?',
        a: 'Before making payment, you and our supervisor walk through every room together so you can verify the cleaning quality and point out any specific focus areas.'
      },
      {
        q: 'What payment options do you accept?',
        a: 'We accept Google Pay, PhonePe, Paytm, BHIM UPI, Net Banking, and Cash upon successful completion of your service.'
      }
    ]
  }
];

export const FAQPage: React.FC = () => {
  const { openModal } = useQuoteModal();
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '1-0': true,
  });

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = FAQ_DATA.map(cat => ({
    ...cat,
    items: cat.items.filter(
      item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    )
  };

  return (
    <div className="pb-20 bg-[#F8FAFC]">
      {/* React 19 Head Hoisting */}
      <title>FAQ | Garuda Cleaning Services Tirupati</title>
      <meta name="description" content="Answers to common questions about deep cleaning workflows, chemical safety, equipment, and transparent pricing in Tirupati." />
      <link rel="canonical" href="https://garudacleaningservices.in/faq" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#041B3B] to-[#07254D] text-white py-16 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-[var(--z-content)]">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-bold border border-white/20">
            <HelpCircle className="w-4 h-4 text-[#22AC33]" />
            Garuda Knowledge Base & FAQs
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Everything you need to know about our professional cleaning workflows, chemical safety, equipment, and pricing in Tirupati.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., 'acid', 'sofa dry time', 'water tank', 'price')..."
                className="w-full bg-white text-slate-800 text-sm font-semibold pl-12 pr-4 py-4 rounded-full border border-white/20 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#22AC33]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories & Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-12 space-y-12">
        {filteredCategories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-[#041B3B] flex items-center gap-2 border-b border-slate-200 pb-2">
              <Sparkles className="w-4 h-4 text-[#22AC33]" />
              {cat.category}
            </h2>

            <div className="space-y-3">
              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = !!openItems[key];

                return (
                  <div
                    key={itemIdx}
                    className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                      isOpen
                        ? 'border-[#22AC33] bg-[#E8F8EC]/30 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#041B3B] cursor-pointer"
                    >
                      <span>{item.q}</span>
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
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-slate-500 text-sm">
              No matching answers found for "{searchQuery}".
            </p>
            <p className="text-xs text-slate-400">
              Have a custom inquiry? Talk directly to our operations team!
            </p>
            <a
              href={BUSINESS_CONFIG.buildWhatsAppUrl(`Hi Garuda Team, I have a question about: ${searchQuery}`)}
              className="btn-homecare-green text-xs py-2.5 px-6 font-bold inline-flex"
            >
              <MessageCircle className="w-4 h-4" />
              Ask via WhatsApp
            </a>
          </div>
        )}

        {/* Quick Help Strip */}
        <div className="mt-16 bg-[#041B3B] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-black">Still have a question?</h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Call our Tirupati operations desk directly for instant assistance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              className="btn-homecare-green text-xs py-3 px-6 font-bold w-full sm:w-auto text-center"
            >
              <PhoneCall className="w-4 h-4" />
              Call {BUSINESS_CONFIG.contact.phoneDisplay}
            </a>
            <button
              onClick={() => openModal()}
              className="btn-homecare-navy border border-white/20 text-xs py-3 px-6 font-bold w-full sm:w-auto text-center"
            >
              Book Service
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
