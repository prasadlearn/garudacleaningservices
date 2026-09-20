import React from 'react';
import { Star, CheckCircle2, MessageSquare, Quote, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

interface Review {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Suresh Reddy',
    location: 'Balaji Colony, Tirupati',
    service: '3 BHK Villa Deep Cleaning',
    rating: 5,
    date: 'February 2026',
    comment: 'Exceptional deep cleaning service! The team arrived on time with professional rotary scrubbing equipment. They cleared years of hard water scale from our bathroom wall tiles and made the kitchen slabs shine like brand new. Truly the best cleaning team in Tirupati.',
    verified: true
  },
  {
    id: '2',
    name: 'Priyanka Naidu',
    location: 'AIR Bypass Road, Tirupati',
    service: 'Sofa & Carpet Wet Shampooing',
    rating: 5,
    date: 'January 2026',
    comment: 'We have light beige fabric sofas that had severe dust marks and juice stains from kids. Garuda’s hot water extraction machine pulled out deep grime without damaging the delicate upholstery. It was completely dry within 3 hours. Highly recommended!',
    verified: true
  },
  {
    id: '3',
    name: 'K. Venkatesh Babu',
    location: 'MR Palli, Tirupati',
    service: '2 BHK Move-In Deep Scrub',
    rating: 5,
    date: 'March 2026',
    comment: 'Hired them right before moving into our newly painted apartment. They scrubbed cement stains off the vitrified tiles, wiped window channels, and sanitized all cabinets. Pricing was completely transparent with zero hidden charges.',
    verified: true
  },
  {
    id: '4',
    name: 'Dr. Anita Sharma',
    location: 'KT Road, Tirupati',
    service: 'Clinic & Office Sanitization',
    rating: 5,
    date: 'February 2026',
    comment: 'Garuda manages the deep disinfection for our consulting clinic. Their staff wears proper protective uniforms and uses certified non-toxic hospital-grade disinfectants. Very punctual, respectful, and thorough.',
    verified: true
  },
  {
    id: '5',
    name: 'Ramesh Chowdary',
    location: 'Renigunta Road, Tirupati',
    service: 'Underground Sump & Tank Cleaning',
    rating: 5,
    date: 'January 2026',
    comment: 'Outstanding job on our 10,000L sump and roof tanks. They pumped out all bottom sediment sludge, jet-sprayed the walls, and treated the water chamber with UV antibacterial agents. Safe drinking water restored!',
    verified: true
  }
];

export const Testimonials: React.FC = () => {
  const feedbackWaUrl = BUSINESS_CONFIG.buildWhatsAppUrl({
    message: 'Hello Garuda Cleaning Services, I would like to share feedback regarding my cleaning service.',
  });

  return (
    <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header with Google Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              Verified Local Customer Stories
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight">
              Trusted by 450+ Homes in Tirupati
            </h2>
            <p className="text-slate-600 mt-2 text-base sm:text-lg">
              Read how our mechanized cleaning has revitalized living spaces and commercial properties.
            </p>
          </div>

          {/* Google Review Pill */}
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:px-5 sm:py-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-lg text-[#0B192C] shadow-xs">
              G
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-extrabold text-sm text-[#0B192C] ml-1">4.9 / 5.0</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Based on 450+ verified Google ratings</div>
            </div>
          </div>
        </div>

        {/* Featured Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 bg-slate-50 border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
            >
              <Quote className="w-8 h-8 text-slate-200 absolute top-6 right-6" />

              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#0B192C] flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{rev.location}</div>
                  <div className="text-[11px] font-semibold text-[#0E6B7A] mt-0.5">{rev.service}</div>
                </div>

                <div className="text-[11px] text-slate-400 font-medium">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for feedback submission */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0F2137] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#38BDF8] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Have you booked Garuda Cleaning recently?</h3>
              <p className="text-slate-300 text-xs sm:text-sm">We take every single review seriously to maintain 100% service excellence.</p>
            </div>
          </div>

          <a
            href={feedbackWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#0E6B7A] hover:bg-[#005F73] text-white text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            Submit Your Google / WhatsApp Review
          </a>
        </div>
      </div>
    </section>
  );
};
