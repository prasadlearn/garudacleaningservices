import React from 'react';
import { Clock, ShieldCheck, Sparkles, HeartPulse, Calendar, ThumbsUp } from 'lucide-react';

const BENEFITS = [
  {
    icon: Clock,
    title: 'Saves You Time',
    desc: 'Enjoy your weekend while our trained team takes care of all the deep scrubbing and dusting.'
  },
  {
    icon: ShieldCheck,
    title: 'Deep Floor Scrubbing',
    desc: 'We use rotary floor scrubbers to clean tiles, marble, and grout lines deeper than regular mopping.'
  },
  {
    icon: HeartPulse,
    title: 'Removes Dust and Allergens',
    desc: 'High-suction vacuum machines help extract deep dust, dirt, and allergens from mattresses and sofas.'
  },
  {
    icon: Sparkles,
    title: 'Safe for Surfaces',
    desc: 'We use acid-free cleaning liquids that clean thoroughly without damaging your tiles or metal fittings.'
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    desc: 'Choose a morning or afternoon slot any day of the week, Monday through Sunday.'
  },
  {
    icon: ThumbsUp,
    title: 'Careful Final Check',
    desc: 'We check every room together with you before we leave so you are happy with the work.' // TODO_OWNER: confirm room-by-room check process
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-[#F4F8FC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="homecare-pill mb-2">Why Choose Us</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1">
            Why Choose Our Cleaning Service
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            We make it simple and stress-free to keep your home or workplace clean in Tirupati.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-[#041B3B]">{b.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
