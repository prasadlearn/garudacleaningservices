import React from 'react';
import { Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';

const CARDS = [
  { name: '1 BHK', subtitle: 'Book complete home cleaning', price: '₹2,999', image: '/images/hero-interior.jpg' },
  { name: '2 BHK', subtitle: 'Professional 2 BHK cleaning', price: '₹4,499', image: '/images/floor-clean.jpg' },
  { name: '3 BHK', subtitle: 'Expert 3 BHK deep cleaning', price: '₹5,999', image: '/images/kitchen-clean.jpg' },
  { name: '4 BHK', subtitle: 'Detailed cleaning for large homes', price: '₹7,499', image: '/images/hero-interior.jpg' },
  { name: 'Villa cleaning', subtitle: 'Premium cleaning for luxury villas', price: '₹8,999', image: '/images/office-clean.jpg' },
  { name: 'Office cleaning', subtitle: 'Commercial office sanitization', price: '₹3,499', image: '/images/office-clean.jpg' },
  { name: 'Kitchen cleaning', subtitle: 'Degreasing cabinets & chimneys', price: '₹1,499', image: '/images/kitchen-clean.jpg' },
  { name: 'Bathroom cleaning', subtitle: 'Hard water tile descaling', price: '₹899', image: '/images/bathroom-clean.jpg' },
];

export const ChooseAndBookSection: React.FC = () => {
  const { openModal } = useQuoteModal();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="homecare-pill mb-2">Cleaning Services</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1">
            Choose and Book Your Cleaning Services
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Book your cleaning service today and enjoy exclusive limited-time discounts on premium packages. Quick scheduling available.
          </p>
        </div>

        {/* 2 Rows of 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img src={card.image} alt={card.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-lg text-[#041B3B]">{card.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{card.subtitle}</p>
                  <div className="mt-3 font-extrabold text-sm text-[#041B3B]">
                    Starting <span className="text-[#22AC33]">{card.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex gap-2">
                <a
                  href={BUSINESS_CONFIG.contact.phoneTel}
                  className="btn-homecare-green flex-1 text-center justify-center text-xs py-2 px-2"
                >
                  <Phone className="w-3 h-3" />
                  Call Now
                </a>
                <button
                  onClick={() => openModal(card.name)}
                  className="btn-homecare-navy flex-1 text-center justify-center text-xs py-2 px-2 cursor-pointer"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
