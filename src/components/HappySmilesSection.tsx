import React from 'react';

const SMILES = [
  { image: '/images/hero-interior.jpg', name: 'Ramesh & Family', locality: 'Balaji Colony' },
  { image: '/images/sofa-clean.jpg', name: 'Srinivasulu Garu', locality: 'AIR Bypass Road' },
  { image: '/images/kitchen-clean.jpg', name: 'Sunitha Reddy', locality: 'MR Palli' },
  { image: '/images/floor-clean.jpg', name: 'Venkat Rao', locality: 'Renigunta Road' },
];

export const HappySmilesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="homecare-pill mb-2">Happy Customers</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1">
            A Precious Smile to see After the Cleaned
          </h2>
          <p className="text-slate-600 mt-2 text-xs sm:text-base">
            Nothing gives us more pride than seeing our Tirupati clients smile at their sparkling, fresh homes.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {SMILES.map((s, i) => (
            <div key={i} className="rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group relative aspect-[3/4]">
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-4 text-white">
                <div className="font-extrabold text-xs sm:text-base leading-tight">{s.name}</div>
                <div className="text-[10px] sm:text-xs text-slate-300 mt-0.5">{s.locality}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
