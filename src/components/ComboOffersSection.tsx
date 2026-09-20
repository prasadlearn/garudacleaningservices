import React from 'react';
import { motion } from 'framer-motion';
import { Gift, MapPin, Phone, Sparkles, Home, Building2, CheckCircle2 } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';

interface ComboItem {
  badge: string;
  type: 'occupied' | 'vacant' | 'bathroom';
  kicker: string;
  headline: string;
  worthPill: string;
  rows: {
    room: string;
    original: string;
    offer: string;
    savings: string;
  }[];
  bonusGift: string;
}

const COMBOS: ComboItem[] = [
  {
    badge: 'Occupied Home Combo',
    type: 'occupied',
    kicker: 'Lived-In Apartments & Houses',
    headline: 'Deep Cleaning + Sofa & Kitchen Degreasing',
    worthPill: 'Save Up to ₹1,800',
    rows: [
      { room: '1 BHK + Sofa Clean', original: '₹4,499', offer: '₹3,499', savings: '₹1,000 Off' },
      { room: '2 BHK + Sofa Clean', original: '₹5,999', offer: '₹4,699', savings: '₹1,300 Off' },
      { room: '3 BHK + Sofa Clean', original: '₹7,499', offer: '₹5,899', savings: '₹1,600 Off' },
      { room: '4 BHK / Duplex Combo', original: '₹9,499', offer: '₹7,699', savings: '₹1,800 Off' },
    ],
    bonusGift: 'FREE 100% Anti-Bacterial Room Fogging Sanitization',
  },
  {
    badge: 'Vacant Move-In / Move-Out',
    type: 'vacant',
    kicker: 'Empty Houses & New Tenancies',
    headline: 'Full Floor Machine Buff + Window & Bath Detailing',
    worthPill: 'Most Popular in Tirupati',
    rows: [
      { room: '1 BHK Empty Deep Clean', original: '₹3,499', offer: '₹2,699', savings: '₹800 Off' },
      { room: '2 BHK Empty Deep Clean', original: '₹4,899', offer: '₹3,799', savings: '₹1,100 Off' },
      { room: '3 BHK Empty Deep Clean', original: '₹6,499', offer: '₹4,999', savings: '₹1,500 Off' },
      { room: 'Villa / Duplex Empty', original: '₹9,999', offer: '₹7,999', savings: '₹2,000 Off' },
    ],
    bonusGift: 'FREE Acid-Free Bathroom Tiles Hard-Water Descale',
  },
  {
    badge: 'Sanitization & Shine Package',
    type: 'bathroom',
    kicker: 'Bathroom & Kitchen Refresh',
    headline: 'Acid-Free Descaling + Chimney Degreasing',
    worthPill: 'Instant Same-Day Slot',
    rows: [
      { room: '1 Bath + 1 Kitchen', original: '₹2,899', offer: '₹2,199', savings: '₹700 Off' },
      { room: '2 Baths + 1 Kitchen', original: '₹3,699', offer: '₹2,899', savings: '₹800 Off' },
      { room: '3 Baths + 1 Kitchen', original: '₹4,499', offer: '₹3,499', savings: '₹1,000 Off' },
      { room: 'Full House Grout Buffing', original: '₹3,999', offer: '₹2,999', savings: '₹1,000 Off' },
    ],
    bonusGift: 'FREE Chrome Tap Buffing & Fragrance Mist',
  },
];

export const ComboOffersSection: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#D4F4DD] border-b border-emerald-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#22AC33] text-xs font-black uppercase tracking-wider mb-3 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#22AC33]" />
            Best Value Combo Deals
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-[#041B3B]"
          >
            Cleaning Combo Offers That Assist You More
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-700 mt-2 text-sm sm:text-base font-medium"
          >
            Book verified packages designed to give your Tirupati residence maximum cleaning coverage at discounted bundled rates.
          </motion.p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {COMBOS.map((combo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative bg-white border border-[#041B3B]/10 rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col gap-5 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-[#22AC33]/40"
            >
              {/* Badge */}
              <div className="self-center">
                <span className="bg-[#041B3B] text-white text-[11px] font-extrabold tracking-wider uppercase py-1.5 px-5 rounded-full shadow-xs">
                  {combo.badge}
                </span>
              </div>

              {/* Head info */}
              <div className="flex items-start gap-3.5 pt-1">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0 shadow-xs">
                  {combo.type === 'occupied' ? (
                    <Home className="w-6 h-6" />
                  ) : combo.type === 'vacant' ? (
                    <Building2 className="w-6 h-6" />
                  ) : (
                    <Sparkles className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    {combo.kicker}
                  </span>
                  <h3 className="text-base font-extrabold text-[#041B3B] leading-snug mt-0.5">
                    {combo.headline}
                  </h3>
                </div>
              </div>

              {/* Serving locations box */}
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                <MapPin className="w-4 h-4 text-[#041B3B] shrink-0" />
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#041B3B] block">
                    Serving Across Tirupati
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    MR Palli, Alipiri, Korlagunta, Renigunta & All Sectors
                  </span>
                </div>
              </div>

              {/* Pulsing Worth Pill */}
              <div className="self-center">
                <div className="worth-pill-pulse bg-[#22AC33] text-white text-xs font-black py-1.5 px-5 rounded-full shadow-md">
                  {combo.worthPill}
                </div>
              </div>

              {/* Rate Card Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[10.5px] font-extrabold uppercase text-slate-600 border-b border-slate-200">
                      <th className="py-2.5 px-3">Room Type</th>
                      <th className="py-2.5 px-2">Regular</th>
                      <th className="py-2.5 px-2">Combo Offer</th>
                      <th className="py-2.5 px-2 text-right">Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {combo.rows.map((r, rIdx) => (
                      <tr key={rIdx} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-[#041B3B]">{r.room}</td>
                        <td className="py-2.5 px-2 text-slate-400 line-through decoration-red-400">{r.original}</td>
                        <td className="py-2.5 px-2 font-black text-[#22AC33]">{r.offer}</td>
                        <td className="py-2.5 px-2 font-bold text-[#041B3B] text-right">{r.savings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bonus Gift with animated shake */}
              <div className="flex items-center gap-2.5 bg-[#E8F8EC] rounded-xl p-3 text-xs font-bold text-[#041B3B]">
                <Gift className="w-4 h-4 text-[#22AC33] shrink-0 gift-shake" />
                <span>{combo.bonusGift}</span>
              </div>

              {/* Call / Book Button */}
              <div className="mt-auto pt-2">
                <button
                  onClick={() => openModal(combo.badge)}
                  className="w-full shine-effect bg-gradient-to-r from-[#041B3B] to-[#22AC33] hover:from-[#03152E] hover:to-[#1A8C28] text-white font-extrabold text-sm py-3.5 px-6 rounded-full shadow-lg flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#FFD700]" />
                  Book Offer Now: {BUSINESS_CONFIG.contact.phoneDisplay}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
