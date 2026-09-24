import React from 'react';
import { Sparkles, Clock, MessageCircle, CheckCircle2 } from 'lucide-react';
import { getConfirmedCommitments } from '../config/trustConfig';

export const TrustedExpertsCards: React.FC = () => {
  const confirmed = getConfirmedCommitments();

  if (confirmed.length === 0) {
    return null;
  }

  const icons = [Sparkles, Clock, MessageCircle];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="homecare-pill mb-2">Our Promise</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1 tracking-tight">
            Our Commitments to You
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
            Clear prices, reliable timing, and quick answers on WhatsApp for every customer in Tirupati.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {confirmed.slice(0, 3).map((card, i) => {
            const IconComponent = icons[i % icons.length];
            return (
              <div
                key={card.id}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#22AC33]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center group-hover:bg-[#22AC33] group-hover:text-white transition-colors shadow-xs">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#041B3B] group-hover:text-[#22AC33] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#22AC33]">
                  <CheckCircle2 className="w-4 h-4 text-[#22AC33]" />
                  <span>Garuda Service Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
