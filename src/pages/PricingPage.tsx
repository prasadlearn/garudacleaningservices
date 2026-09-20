import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Calculator, Sparkles, Phone, HelpCircle } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { ComboOffersSection } from '../components/ComboOffersSection';

interface PricingPlan {
  bhk: string;
  sqft: string;
  originalPrice: string;
  discountPrice: string;
  time: string;
  crew: string;
  popular?: boolean;
  features: string[];
}

const PLANS: PricingPlan[] = [
  {
    bhk: '1 BHK Apartment',
    sqft: 'Up to 600 sq.ft',
    originalPrice: '₹3,499',
    discountPrice: '₹2,999',
    time: '3.5 - 4.5 Hours',
    crew: '2-3 Trained Specialists',
    features: [
      'Single-disc rotary floor scrubbing for living & bedroom',
      'Full bathroom descaling (tiles, commode, taps)',
      'Modular kitchen slab degreasing & sink chrome buffing',
      'Window glass wiped & stainless steel grille dusted',
      'Ceiling cobweb removal, fans & switchboards cleaned',
      'Balcony washing & floor drain flushing'
    ]
  },
  {
    bhk: '2 BHK Apartment',
    sqft: '600 - 1,100 sq.ft',
    originalPrice: '₹4,899',
    discountPrice: '₹3,999',
    time: '4.5 - 5.5 Hours',
    crew: '3-4 Trained Specialists',
    popular: true,
    features: [
      'Single-disc rotary floor scrubbing throughout the flat',
      '2 Bathrooms deep acid-free hard water descaling',
      'Full modular kitchen degreasing & chimney exterior',
      'All window tracks vacuumed, glass polished',
      'Balconies & utility wash areas machine scrubbed',
      'Doors, frames & switchboards detailed with Taski R4',
      'Ceiling fans & AC vents wiped'
    ]
  },
  {
    bhk: '3 BHK Apartment',
    sqft: '1,100 - 1,700 sq.ft',
    originalPrice: '₹6,299',
    discountPrice: '₹4,999',
    time: '5.5 - 7 Hours',
    crew: '4-5 Specialists + Supervisor',
    features: [
      'Heavy single-disc machine scrubbing for all rooms',
      '3 Bathrooms hard water mineral removal & mirror buff',
      'Complete kitchen degreasing + baffle filter soak',
      'Window channels, grilles & glass streak-free wiping',
      'Master bedroom, kids room & guest room detailed',
      'Multiple balconies & dry utility pressure washed',
      'Joint supervisor handover inspection'
    ]
  },
  {
    bhk: '4 BHK / Duplex Villa',
    sqft: '1,700 - 2,800 sq.ft',
    originalPrice: '₹8,499',
    discountPrice: '₹6,499',
    time: '7 - 9 Hours',
    crew: '5-6 Specialists + Supervisor',
    features: [
      'Complete multi-level machine floor scrubbing',
      '4+ Bathrooms intensive descaling & sanitization',
      'Kitchen + utility heavy oil degreasing',
      'Staircase railings, banisters & chandelier dusting',
      'High-ceiling cove lighting & fan blade degreasing',
      'Balconies & private terrace water jet wash',
      '100% Anti-bacterial fogging sanitization'
    ]
  }
];

const ADDONS = [
  { id: 'sofa3', name: '3-Seater Fabric Sofa Shampooing', price: 799 },
  { id: 'sofa5', name: '5-Seater Sofa Set Wet Extraction', price: 1199 },
  { id: 'mattress', name: 'King Size Mattress Both Sides Steam Sanitization', price: 999 },
  { id: 'carpet', name: 'Living Room Carpet Shampooing (up to 50 sqft)', price: 899 },
  { id: 'chimney', name: 'Chimney Internal Motor & Duct Deep Degrease', price: 699 },
  { id: 'fridge', name: 'Refrigerator Interior Deep Sanitization', price: 499 },
  { id: 'tank', name: 'Overhead Water Tank 1000L Jet Cleaning', price: 999 },
];

export const PricingPage: React.FC = () => {
  const { openModal } = useQuoteModal();
  const [selectedBHK, setSelectedBHK] = useState<string>('2bhk');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const basePrices: Record<string, number> = {
    '1bhk': 2999,
    '2bhk': 3999,
    '3bhk': 4999,
    '4bhk': 6499,
    'villa': 7999,
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const calculatedTotal =
    basePrices[selectedBHK] +
    selectedAddons.reduce((sum, id) => {
      const item = ADDONS.find(a => a.id === id);
      return sum + (item ? item.price : 0);
    }, 0);

  return (
    <div className="pt-24 pb-20 bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#041B3B] to-[#07254D] text-white py-16 px-4 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-bold border border-white/20">
            <ShieldCheck className="w-4 h-4 text-[#22AC33]" />
            100% Transparent Pricing • Zero Hidden Transport Fees
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Transparent Cleaning Rates in Tirupati
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Clear, all-inclusive pricing for apartments, independent houses, and villas. Pay only after you are completely satisfied with the room-by-room joint inspection.
          </p>
        </div>
      </section>

      {/* BHK Standard Plans Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 relative shadow-sm hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular
                  ? 'border-[#22AC33] ring-2 ring-[#22AC33]/20'
                  : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#22AC33] text-white text-[10px] font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                    Most Popular in Tirupati
                  </span>
                </div>
              )}

              <div>
                <div className="text-center pb-5 border-b border-slate-100">
                  <h3 className="text-lg font-extrabold text-[#041B3B]">{plan.bhk}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{plan.sqft}</div>

                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-black text-[#041B3B]">{plan.discountPrice}</span>
                    <span className="text-sm text-slate-400 line-through">{plan.originalPrice}</span>
                  </div>

                  <div className="mt-2 text-[11px] font-bold text-[#22AC33] bg-[#E8F8EC] py-1 px-3 rounded-full inline-block">
                    ⏱ {plan.time} • {plan.crew}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Included In Deep Clean:
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                        <Check className="w-3.5 h-3.5 text-[#22AC33] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100">
                <button
                  onClick={() => openModal(`${plan.bhk} Deep Cleaning`)}
                  className={`w-full py-3 px-4 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'btn-homecare-green'
                      : 'btn-homecare-navy'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Book {plan.bhk}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Price Estimator Calculator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#041B3B]">
                Interactive Cleaning Cost Estimator
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Select your property size and optional add-ons to calculate your exact customized estimate instantly.
              </p>
            </div>
          </div>

          {/* Step 1: BHK Selector */}
          <div className="space-y-3 mb-8">
            <label className="text-xs font-bold text-[#041B3B] uppercase tracking-wider block">
              1. Select Property Configuration:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { id: '1bhk', label: '1 BHK', price: '₹2,999' },
                { id: '2bhk', label: '2 BHK', price: '₹3,999' },
                { id: '3bhk', label: '3 BHK', price: '₹4,999' },
                { id: '4bhk', label: '4 BHK', price: '₹6,499' },
                { id: 'villa', label: 'Duplex Villa', price: '₹7,999' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedBHK(opt.id)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedBHK === opt.id
                      ? 'border-[#22AC33] bg-[#E8F8EC] text-[#041B3B] ring-2 ring-[#22AC33]/30 font-black'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white font-semibold'
                  }`}
                >
                  <div className="text-sm">{opt.label}</div>
                  <div className="text-xs text-[#22AC33] font-bold mt-0.5">{opt.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Add-on Checkboxes */}
          <div className="space-y-3 mb-8">
            <label className="text-xs font-bold text-[#041B3B] uppercase tracking-wider block">
              2. Add Popular Specialized Treatments (Optional):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADDONS.map(addon => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#22AC33] bg-emerald-50/60 ring-1 ring-[#22AC33]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-[#22AC33] border-[#22AC33] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-bold text-[#041B3B]">{addon.name}</span>
                    </div>
                    <span className="text-xs font-extrabold text-[#22AC33] shrink-0 ml-2">
                      +₹{addon.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculation Summary Bar */}
          <div className="bg-[#041B3B] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-300 font-medium">Estimated Package Total:</div>
              <div className="text-3xl sm:text-4xl font-black text-[#FFD700]">
                ₹{calculatedTotal.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                ✓ Inclusive of all taxes, machines, Taski chemicals & crew transport
              </div>
            </div>

            <button
              onClick={() => openModal(`Calculated Package (${selectedBHK.toUpperCase()} + ${selectedAddons.length} Add-ons: ₹${calculatedTotal})`)}
              className="btn-homecare-green text-sm py-3.5 px-8 font-bold whitespace-nowrap w-full sm:w-auto"
            >
              Book This Configuration
            </button>
          </div>
        </div>
      </section>

      {/* Exact Combo Offers Section from Homecare Solutions */}
      <div className="mt-20">
        <ComboOffersSection />
      </div>

      {/* Transparency Guarantee Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-2">🚫</div>
            <h3 className="font-extrabold text-base text-[#041B3B]">Zero Hidden Fees</h3>
            <p className="text-xs text-slate-600 mt-1">
              No extra fees for fuel, stairs, high ceilings, or machine usage. The quote we agree upon is the final amount.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-extrabold text-base text-[#041B3B]">Free Re-Clean Warranty</h3>
            <p className="text-xs text-slate-600 mt-1">
              If any spot or corner was missed during the service, our crew re-cleans it immediately on the spot for free.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm">
            <div className="text-3xl mb-2">💳</div>
            <h3 className="font-extrabold text-base text-[#041B3B]">Pay After Inspection</h3>
            <p className="text-xs text-slate-600 mt-1">
              Never pay upfront. Complete payment via UPI, Cash, or Card only after the final supervisor walkthrough.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
