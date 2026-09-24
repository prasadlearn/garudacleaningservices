import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { TRUST_CONFIG, hasVerifiedRating } from '../config/trustConfig';

export const CustomerFeedbackSection: React.FC = () => {
  const testimonials = TRUST_CONFIG.testimonials;

  // Requirement: hide the Reviews section completely until trustConfig has at least 3 real reviews
  if (testimonials.length < 3) {
    return null;
  }

  const showRating = hasVerifiedRating();

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#F4F8FC] border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="homecare-pill mb-2"
          >
            Customer Experiences
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1 tracking-tight"
          >
            Verified Client Reviews
          </motion.h2>

          {showRating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 mt-4 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-xs text-sm font-bold text-[#041B3B]"
            >
              <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs">
                G
              </div>
              <span className="text-xl font-black text-[#22AC33]">{TRUST_CONFIG.googleRating}★</span>
              <div className="flex text-[#FFD700]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-semibold">• {TRUST_CONFIG.reviewCount}+ Google Reviews</span>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#FFD700]">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#22AC33] bg-[#E8F8EC] px-2.5 py-0.5 rounded-full">
                    {r.serviceName}
                  </span>
                </div>

                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-slate-100 absolute -top-3 -left-2 z-[var(--z-behind)]" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    "{r.reviewText}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#041B3B] flex items-center gap-1.5">
                    {r.author}
                    <CheckCircle className="w-3.5 h-3.5 text-[#22AC33]" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">{r.locality}</div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{r.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
