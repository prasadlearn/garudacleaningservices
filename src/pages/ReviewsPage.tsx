import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Quote, ThumbsUp, Filter, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';

interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  service: string;
  category: 'home' | 'sofa' | 'bathroom' | 'kitchen' | 'commercial';
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

const ALL_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Dr. Anita Sharma',
    role: 'Dental Clinic Director',
    location: 'KT Road, Tirupati',
    service: 'Clinic Restrooms & Deep Sanitization',
    category: 'commercial',
    rating: 5,
    date: 'September 14, 2026',
    comment: 'Garuda manages deep sanitization for our consulting clinic and sterilization areas. Their team uses certified non-toxic hospital grade solutions without harsh smell. Punctual, respectful, and thorough. Recommended to all healthcare professionals in Tirupati.',
    verified: true,
    helpfulCount: 24,
  },
  {
    id: '2',
    name: 'K. Venkatesh',
    role: 'Apartment Owner',
    location: 'MR Palli, Tirupati',
    service: '3 BHK Move-in Deep Scrub',
    category: 'home',
    rating: 5,
    date: 'September 11, 2026',
    comment: 'Hired them for 3 BHK move-in deep scrub. They cleared cement stains from the vitrified tiles, detailed window tracks, and removed borewell scale from all 3 bathrooms completely. Upfront transparent rates without asking extra for transport.',
    verified: true,
    helpfulCount: 19,
  },
  {
    id: '3',
    name: 'Priyanka Naidu',
    role: 'Home Maker',
    location: 'AIR Bypass Road, Tirupati',
    service: '7-Seater Fabric Sofa Shampooing',
    category: 'sofa',
    rating: 5,
    date: 'September 8, 2026',
    comment: 'Our beige fabric sofa had tough juice stains from children playing. Their German hot extraction machine pulled out deep blackish grime completely. Dried in 3 hours under ceiling fan. Best sofa cleaning service in Tirupati!',
    verified: true,
    helpfulCount: 31,
  },
  {
    id: '4',
    name: 'M. Sudhakar Reddy',
    role: 'Villa Resident',
    location: 'Alipiri Road, Tirupati',
    service: 'Luxury Villa Exterior & Interior Scrub',
    category: 'home',
    rating: 5,
    date: 'September 3, 2026',
    comment: 'Booked Garuda for our duplex villa before Ugadi celebrations. 5 technicians with single-disc floor scrubbers and pressure washers worked for 7 hours. The terrace, portico, glass balconies and 4 bathrooms look brand new. Truly professional!',
    verified: true,
    helpfulCount: 42,
  },
  {
    id: '5',
    name: 'Lavanya S.',
    role: 'Software Engineer (WFH)',
    location: 'Korlagunta, Tirupati',
    service: 'Modular Kitchen Degreasing & Chimney Clean',
    category: 'kitchen',
    rating: 5,
    date: 'August 28, 2026',
    comment: 'Our chimney baffle filters were completely clogged with sticky cooking oils. The Garuda team soaked the filters in food-safe degreaser and steam-cleaned the backsplash tiles. Zero oil residue left. Outstanding work.',
    verified: true,
    helpfulCount: 15,
  },
  {
    id: '6',
    name: 'R. Balakrishna',
    role: 'Business Owner',
    location: 'Bhavani Nagar, Tirupati',
    service: '2 Bathrooms Acid-Free Hard Water Descaling',
    category: 'bathroom',
    rating: 5,
    date: 'August 22, 2026',
    comment: 'Our borewell water left thick whitish crust on glass cubicles and Jaguar taps. Garuda used organic descaling foam and buffed everything to mirror shine. No acid burns, no bad smell. Absolutely worth every rupee.',
    verified: true,
    helpfulCount: 27,
  },
  {
    id: '7',
    name: 'Suresh Babu',
    role: 'Showroom Manager',
    location: 'Renigunta Road, Tirupati',
    service: 'Retail Showroom Floor Scrubbing',
    category: 'commercial',
    rating: 5,
    date: 'August 18, 2026',
    comment: 'We needed overnight rotary machine scrubbing for our 2,500 sq.ft showroom floor. The team arrived on time at 8:30 PM and finished by 1 AM with complete wet vacuum suction. Spotless mirror shine for our customer launch next morning.',
    verified: true,
    helpfulCount: 18,
  },
  {
    id: '8',
    name: 'Deepika Rao',
    role: 'Professor',
    location: 'Balaji Colony, Tirupati',
    service: 'Full Home Deep Clean + Carpet Shampoo',
    category: 'home',
    rating: 5,
    date: 'August 12, 2026',
    comment: 'Very polite team and courteous supervisor. They took off their shoes where appropriate, used clean microfiber clothes for switches and glass, and handled delicate items carefully. Will hire them regularly every 6 months.',
    verified: true,
    helpfulCount: 22,
  },
];

export const ReviewsPage: React.FC = () => {
  const { openModal } = useQuoteModal();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, number>>({});

  const filteredReviews = selectedCategory === 'all'
    ? ALL_REVIEWS
    : ALL_REVIEWS.filter(r => r.category === selectedCategory);

  const handleHelpful = (id: string, current: number) => {
    setHelpfulLikes(prev => ({
      ...prev,
      [id]: (prev[id] ?? current) + 1,
    }));
  };

  return (
    <div className="pt-24 pb-20 bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#041B3B] to-[#07254D] text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-bold border border-white/20"
          >
            <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
            100% Verified Tirupati Resident Testimonials
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black tracking-tight"
          >
            Customer Reviews & Ratings
          </motion.h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Discover why hundreds of families, doctors, and business owners in Tirupati trust Garuda Cleaning Services for spotlessly hygienic homes and workspaces.
          </p>

          {/* Rating Summary Card */}
          <div className="pt-6">
            <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-12 bg-white/10 backdrop-blur-md px-8 py-5 rounded-3xl border border-white/15 shadow-xl">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-[#22AC33]">4.8</div>
                <div className="flex text-[#FFD700] justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-[11px] text-slate-300 font-semibold mt-1">Google Verified Score</div>
              </div>

              <div className="h-12 w-px bg-white/20 hidden sm:block" />

              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white">450+</div>
                <div className="text-xs text-slate-300 font-bold mt-1">Cleaning Projects</div>
                <div className="text-[10px] text-emerald-400 font-semibold">Across Tirupati & Suburbs</div>
              </div>

              <div className="h-12 w-px bg-white/20 hidden sm:block" />

              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white">99.4%</div>
                <div className="text-xs text-slate-300 font-bold mt-1">Satisfaction Rate</div>
                <div className="text-[10px] text-emerald-400 font-semibold">Free Re-Clean Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            {[
              { id: 'all', label: 'All Reviews (450+)' },
              { id: 'home', label: 'Full Home Deep Clean' },
              { id: 'sofa', label: 'Sofa & Upholstery' },
              { id: 'bathroom', label: 'Bathroom Descaling' },
              { id: 'kitchen', label: 'Kitchen Degreasing' },
              { id: 'commercial', label: 'Clinics & Offices' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-[#041B3B] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => openModal()}
            className="btn-homecare-green text-xs py-2.5 px-6 font-bold"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Book & Share Your Experience
          </button>
        </div>

        {/* Reviews Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <AnimatePresence>
            {filteredReviews.map(r => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-[#FFD700]">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[#22AC33] bg-[#E8F8EC] px-3 py-0.5 rounded-full">
                      {r.service}
                    </span>
                  </div>

                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-slate-100 absolute -top-3 -left-2 -z-10" />
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      "{r.comment}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-[#041B3B] flex items-center gap-1.5">
                      {r.name}
                      {r.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#22AC33] bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500">{r.role} • {r.location}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{r.date}</div>
                  </div>

                  <button
                    onClick={() => handleHelpful(r.id, r.helpfulCount)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-[#22AC33] transition-colors p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{helpfulLikes[r.id] ?? r.helpfulCount}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Strip */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B]">
            Experience Tirupati's Highest-Rated Deep Cleaning Service
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Join 450+ satisfied home and business owners. Book your personalized slot today with zero advance payment and full inspection signoff guarantee.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openModal()}
              className="btn-homecare-green text-sm py-3 px-8 font-bold"
            >
              Book Service Now
            </button>
            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              className="btn-homecare-navy text-sm py-3 px-8 font-bold"
            >
              Call: {BUSINESS_CONFIG.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
