import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, MessageCircle, ShieldCheck, CheckCircle2, ShoppingBag, PackageCheck, Zap } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { trackEvent } from '../utils/analytics';

const FEATURED_HOME_LIQUIDS = [
  {
    id: 'phenyl',
    name: 'Phenyl',
    category: 'Floor Care',
    image: '/images/products/phenyl.webp',
    oneLitre: '₹49',
    fiveLitre: '₹249',
    tenLitre: '₹490',
    fiveLitreSave: 'Wholesale Direct Rate',
    suitableFor: ['Corridors', 'Bathrooms'],
    tag: 'Daily Essential'
  },
  {
    id: 'detergent',
    name: 'Detergent',
    category: 'Laundry Care',
    image: '/images/products/detergent.webp',
    oneLitre: '₹119',
    oneLitreReg: '₹139',
    fiveLitre: '₹579',
    fiveLitreReg: '₹695',
    tenLitre: '₹1,159',
    fiveLitreSave: 'Save ₹116 on 5L • Extra ₹31 on 10L',
    suitableFor: ['Clothes', 'Carpets'],
    tag: '5L & 10L Bulk'
  },
  {
    id: 'floor-cleaner',
    name: 'Floor Cleaner',
    category: 'Floor Care',
    image: '/images/products/floor-cleaner.webp',
    oneLitre: '₹125',
    oneLitreReg: '₹149',
    fiveLitre: '₹605',
    fiveLitreReg: '₹745',
    tenLitre: '₹1,219',
    fiveLitreSave: 'Save ₹140 on 5L • Extra ₹31 on 10L',
    suitableFor: ['Tiles', 'Marble'],
    tag: 'High Shine'
  },
  {
    id: 'dishwash',
    name: 'Dishwash Liquid',
    category: 'Kitchen Care',
    image: '/images/products/dishwash.webp',
    oneLitre: '₹149',
    oneLitreReg: '₹179',
    fiveLitre: '₹725',
    fiveLitreReg: '₹895',
    tenLitre: '₹1,459',
    fiveLitreSave: 'Save ₹170 on 5L • Extra ₹31 on 10L',
    suitableFor: ['Utensils', 'Cookware'],
    tag: 'Grease Cutting'
  }
];

export const HomeLiquidsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="homecare-pill mb-1 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#22AC33]" />
              Wholesale Cleaning Liquids & 5L Supplies
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight leading-tight">
              Direct Cleaning Liquids & Bulk 5L Cans
            </h2>
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
              High-power cleaning liquids for homes, apartments, hostels, hotels, and offices in Tirupati. Save more with commercial 5L & 10L cans.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/cleaning-liquids"
              onClick={() => trackEvent('product_click', { source: 'home_liquids_explore' })}
              className="btn-homecare-green py-2.5 sm:py-3 px-5 sm:px-7 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <span>Explore All Liquids (10+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Clean, Attractive Product Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {FEATURED_HOME_LIQUIDS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#22AC33]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Image Area */}
              <div className="relative aspect-4/3 bg-slate-50 overflow-hidden flex items-center justify-center p-2 border-b border-slate-100">
                <SafeImage
                  src={item.image}
                  alt={`${item.name} cleaning liquid`}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 rounded-lg"
                  loading="eager"
                  decoding="auto"
                />
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-black text-white border border-white/20 shadow-2xs">
                  {item.category}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 space-y-2 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-[#041B3B] group-hover:text-[#22AC33] transition-colors leading-tight line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Clean checkmark tags */}
                  <div className="mt-1 flex flex-wrap gap-1">
                    {item.suitableFor.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded"
                      >
                        <span className="text-[#22AC33] font-black">✓</span>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing Box with 1L, 5L & 10L */}
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs">
                    <span className="text-slate-500 font-bold text-[10px] uppercase">1L:</span>
                    <div className="flex items-baseline gap-1">
                      {item.oneLitreReg && (
                        <span className="text-[10px] text-slate-400 line-through font-semibold">
                          {item.oneLitreReg}
                        </span>
                      )}
                      <span className="font-black text-[#041B3B]">
                        {item.oneLitre}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] sm:text-xs bg-emerald-50/80 px-1.5 py-1 rounded-lg border border-emerald-200/80">
                    <span className="text-emerald-900 font-black text-[9.5px] uppercase">5L Can:</span>
                    <div className="flex items-baseline gap-1">
                      {item.fiveLitreReg && (
                        <span className="text-[9.5px] text-slate-400 line-through font-semibold">
                          {item.fiveLitreReg}
                        </span>
                      )}
                      <span className="font-black text-[#22AC33]">
                        {item.fiveLitre}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-700">
                    <span className="text-slate-500 font-bold text-[9.5px] uppercase">10L Can:</span>
                    <span className="font-black text-[#041B3B]">
                      {item.tenLitre}
                    </span>
                  </div>

                  <span className="text-[8.5px] sm:text-[9px] font-extrabold text-emerald-700 block text-right pt-0.5">
                    {item.fiveLitreSave}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-2.5 sm:p-3 bg-slate-50/70 border-t border-slate-100">
                <Link
                  to="/cleaning-liquids"
                  className="w-full py-2 rounded-xl bg-[#041B3B] hover:bg-[#22AC33] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs group-hover:bg-[#22AC33]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>View Pack Options</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights Strip */}
        <div className="bg-gradient-to-r from-[#041B3B] via-[#062654] to-[#041B3B] text-white rounded-2xl p-5 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#4ADE80] shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">5L & 10L Bulk Savings</h4>
              <p className="text-xs text-slate-300 mt-0.5">Direct manufacturer wholesale pricing in Tirupati.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#4ADE80] shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">For Homes & Businesses</h4>
              <p className="text-xs text-slate-300 mt-0.5">Apartments, hostels, hotels, shops & daily cleaning.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-3">
            <a
              href={BUSINESS_CONFIG.buildWhatsAppUrl('Hello Garuda Cleaning, I want to enquire about Wholesale Cleaning Liquids & 5L Bulk Cans in Tirupati.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-[#22AC33] hover:bg-[#1b8c29] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all transform hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Wholesale Enquiry</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
