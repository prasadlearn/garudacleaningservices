import React from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const REVIEWS = [
  {
    name: 'Suresh Reddy',
    location: 'Balaji Colony, Tirupati',
    service: '3 BHK Full Home Deep Cleaning',
    date: 'March 2026',
    comment: 'Booked 3 BHK deep cleaning. The team came on time with industrial scrubbing machines and safe chemicals. Bathroom hard-water scale was completely cleared and kitchen tiles look brand new. Very reasonable pricing without any hidden charges.',
  },
  {
    name: 'Dr. Radhika Rao',
    location: 'AIR Bypass Road, Tirupati',
    service: 'Sofa & Carpet Wet Shampooing',
    date: 'February 2026',
    comment: 'Exceptional extraction cleaning on our 6-seater beige fabric sofa. Coffee stains and deep dust were extracted cleanly. It was dry within 3 hours. Garuda is definitely the top cleaning service in Tirupati!',
  },
  {
    name: 'Venkatesh Naidu',
    location: 'MR Palli, Tirupati',
    service: '2 BHK Move-In Cleaning',
    date: 'February 2026',
    comment: 'Hired them right before moving into our newly painted apartment. They scrubbed cement stains off the tiles, wiped window channels, and sanitized all cabinets. 100% satisfied with the supervisor handover.',
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F4F8FC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-[#22AC33] uppercase tracking-wider mb-2 block">
              Customer Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#041B3B] tracking-tight">
              What Our Clients in Tirupati Say
            </h2>
            <p className="text-slate-600 mt-2 text-base sm:text-lg">
              Over 450+ satisfied households and commercial spaces across Tirupati trust Garuda.
            </p>
          </div>

          {/* Google Review Badge */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#041B3B] text-[#FFD700] font-black text-xl flex items-center justify-center">
              G
            </div>
            <div>
              <div className="flex text-[#FFD700]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs font-bold text-[#041B3B] mt-0.5">4.8 / 5.0 on Google Reviews</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex text-[#FFD700] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#041B3B] flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle className="w-3.5 h-3.5 text-[#22AC33]" />
                  </div>
                  <div className="text-xs text-slate-500">{rev.location}</div>
                  <div className="text-[11px] font-bold text-[#22AC33] mt-0.5">{rev.service}</div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
