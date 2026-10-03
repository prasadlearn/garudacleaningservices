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
    category: 'Booking & Timing',
    items: [
      {
        q: 'How early should I book my cleaning service?',
        a: 'We recommend booking 1 to 2 days before to get your preferred morning or afternoon time slot. For urgent needs, we also take same-day bookings in Tirupati.'
      },
      {
        q: 'Can I change my booking date or time?',
        a: 'Yes, you can change your booking date or time for free. Just call us or send a message on WhatsApp.'
      },
      {
        q: 'Do you work on Sundays and holidays?',
        a: 'Yes! We work all 7 days a week from 8:00 AM to 8:00 PM, including Sundays and festival holidays.'
      }
    ]
  },
  {
    category: 'Machines & Cleaning Liquids',
    items: [
      {
        q: 'What machines does your cleaning team bring?',
        a: 'Our team brings single-disc floor scrubbing machines, wet and dry vacuum cleaners, high-pressure water washers, and sofa extraction vacuum machines.'
      },
      {
        q: 'Do you use harsh acid in bathrooms or tiles?',
        a: 'NO, NEVER. We never use harsh acids that burn skin, create bad chemical fumes, or damage tile color. We only use safe, specialized cleaning liquids that remove hard water white salt marks and cooking grease safely.'
      },
      {
        q: 'Are your cleaning liquids safe for children, elders, and pets?',
        a: 'Yes! All our cleaning liquids are non-toxic, eco-friendly, and completely safe for babies, pregnant women, elders, and pets with no bad chemical smell.'
      }
    ]
  },
  {
    category: 'Service & What to Expect',
    items: [
      {
        q: 'Do I need to empty all kitchen shelves and cupboards?',
        a: 'For regular kitchen cleaning, we clean all outside surfaces, countertop slabs, tiles, stove, and outer chimney. If you want cupboards cleaned inside as well (like for Move-In / Move-Out cleaning), our crew will gladly help.'
      },
      {
        q: 'Do I need to stay home during the entire cleaning?',
        a: 'You only need to be present at the start to show the team your focus areas, and at the end to inspect the rooms before making payment.'
      },
      {
        q: 'What should I provide to the cleaning team?',
        a: 'Just water from the tap and an electrical plug point for our machines. We bring all machines, ladders, wipers, and cleaning liquids.'
      }
    ]
  },
  {
    category: 'Pricing & Payment',
    items: [
      {
        q: 'Are there any hidden charges?',
        a: 'No hidden charges. All service prices are quoted upfront before our team begins work.'
      },
      {
        q: 'Can I check the cleaning quality before paying?',
        a: 'Yes, absolutely! Our supervisor walks through each room with you after work is done. You pay only when you are 100% happy with the cleaning.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'You can pay using PhonePe, Google Pay, Paytm, UPI, Bank Transfer, or Cash after the cleaning is completed.'
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
      <meta name="description" content="Answers to common questions about mechanized cleaning workflows, chemical safety, equipment, and transparent pricing in Tirupati." />
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
