import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CLEANING_LIQUIDS_FAQS } from '../data/faqs';

interface CleaningLiquidsFaqProps {
  className?: string;
}

export const CleaningLiquidsFaq: React.FC<CleaningLiquidsFaqProps> = ({ className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className={`space-y-6 sm:space-y-8 max-w-3xl mx-auto ${className}`}>
      {/* Header with Mandatory H2 */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#22AC33] border border-emerald-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#041B3B]">
          Cleaning Liquids FAQ
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Common questions regarding pack sizes, wholesale rates, and delivery across Tirupati.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-2.5">
        {CLEANING_LIQUIDS_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={faq.question}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-xs sm:text-sm font-extrabold text-[#041B3B] pr-2 leading-snug">
                  {faq.question}
                </span>
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#22AC33]" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { CleaningLiquidsFaq as ProductFaq };
