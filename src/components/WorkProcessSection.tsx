import React from 'react';
import { Calendar, PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { num: '1', icon: Calendar, title: 'Book Your Slot', desc: 'Choose your preferred service and date online or message us on WhatsApp.' },
  { num: '2', icon: PhoneCall, title: 'Confirm Details', desc: 'We confirm your appointment time and exact upfront price.' },
  { num: '3', icon: Sparkles, title: 'We Clean Your Space', desc: 'Our team arrives with rotary floor scrubbers, vacuum extractors, and surface-safe cleaning products.' },
  { num: '4', icon: CheckCircle2, title: 'Check and Finish', desc: 'We check every room together with you before we finish.' }, // TODO_OWNER: confirm room-by-room check process
];

export const WorkProcessSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="homecare-pill mb-2">How It Works</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1">
            How Our Service Works
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Simple 4-step process to keep your home or office clean.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-3 relative">
                <div className="w-16 h-16 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center font-bold text-xl shadow-xs border-2 border-emerald-100">
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-xs font-black text-[#22AC33] uppercase">Step 0{s.num}</span>
                <h3 className="font-extrabold text-lg text-[#041B3B]">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[240px]">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
