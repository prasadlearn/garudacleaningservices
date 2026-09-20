import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Quote, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const REVIEWS = [
  {
    name: 'Dr. Anita Sharma',
    role: 'Dental Clinic Director',
    place: 'KT Road, Tirupati',
    service: 'Clinic & Restroom Sanitization',
    rating: 5,
    text: 'Garuda manages deep sanitization for our consulting clinic. Their team uses certified non-toxic hospital grade solutions without harsh smell. Punctual, respectful, and thorough. Recommended to all healthcare professionals in Tirupati.',
    date: '3 days ago'
  },
  {
    name: 'K. Venkatesh',
    role: 'Apartment Owner',
    place: 'MR Palli, Tirupati',
    service: '3 BHK Move-in Deep Scrub',
    rating: 5,
    text: 'Hired them for 3 BHK move-in deep scrub. They cleared cement stains from the tiles, detailed window tracks, and removed borewell scale from all 3 bathrooms completely. Upfront transparent rates without asking extra for transport.',
    date: '1 week ago'
  },
  {
    name: 'Priyanka Naidu',
    role: 'Resident',
    place: 'AIR Bypass Road, Tirupati',
    service: 'Sofa Shampoo & Sanitization',
    rating: 5,
    text: 'Our 7-seater beige fabric sofa had tough juice stains from children playing. Their German hot extraction machine pulled out deep blackish grime completely. Dried in 3 hours. Best sofa cleaning service in Tirupati!',
    date: '2 weeks ago'
  },
];

export const ReviewsSection: React.FC = () => {
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
            Verified Customer Feedback
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1 tracking-tight"
          >
            Customer Reviews & Experiences
          </motion.h2>

          {/* Google 4.8 Rating Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mt-4 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-[#041B3B]"
          >
            <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs">
              G
            </div>
            <span className="text-xl font-black text-[#22AC33]">4.8★</span>
            <div className="flex text-[#FFD700]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-slate-500 font-semibold">• 450+ Google Verified Ratings</span>
          </motion.div>
        </div>

        {/* Reviews Grid with motion cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#FFD700]">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#22AC33] bg-[#E8F8EC] px-2.5 py-0.5 rounded-full">
                    {r.service}
                  </span>
                </div>

                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-slate-100 absolute -top-3 -left-2 -z-10" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    "{r.text}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#041B3B] flex items-center gap-1.5">
                    {r.name}
                    <CheckCircle className="w-3.5 h-3.5 text-[#22AC33]" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">{r.place}</div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{r.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#041B3B] hover:text-[#22AC33] transition-colors group"
          >
            <span>Read all 450+ verified customer reviews & testimonials</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
