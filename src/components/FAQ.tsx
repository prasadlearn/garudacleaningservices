import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Do I need to supply cleaning tools, vacuum machines, or chemicals?',
    a: 'No, our team arrives fully equipped with professional single-disc rotary scrubbers, high-pressure washers, commercial wet/dry vacuum extractors, microfiber cloths, ladders, and surface-safe specialized detergents.',
  },
  {
    q: 'Are your cleaning products safe for marble floors and children/pets?',
    a: 'Absolutely. We strictly enforce a policy against raw hydrochloric acid. We deploy pH-neutral floor sanitizers and certified organic descaling formulas that preserve tile shine without leaving toxic vapors.',
  },
  {
    q: 'How long does a standard 2 BHK or 3 BHK deep cleaning session take?',
    a: 'A 2 BHK deep clean generally takes between 4 to 5 hours with a team of 3 technicians. A 3 BHK or independent villa takes 5 to 7 hours with 4 specialists.',
  },
  {
    q: 'How do you handle hard water scale common in Tirupati borewell water?',
    a: 'We use industrial sulfamic and biological descalers that chemically loosen crystalline calcium and magnesium deposits on bathroom tiles and taps, scrubbing them off without scratching porcelain or eroding cement grout.',
  },
  {
    q: 'What is your payment procedure? Are there hidden transport costs?',
    a: 'We offer 100% upfront transparent quotations. No transport fees are charged anywhere within Tirupati city limits. Payment is collected only after our supervisor completes the room-by-room inspection with you.',
  },
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0E6B7A] text-xs font-bold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight">
            Common Inquiries &amp; Answers
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Everything you need to know about our scheduling, equipment, and cleaning standards.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-[#0B192C]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-teal-50 text-[#0E6B7A]' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 mt-2">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
