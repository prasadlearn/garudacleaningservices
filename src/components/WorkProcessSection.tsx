import React from 'react';
import { Calendar, PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { num: '1', icon: Calendar, title: 'Book Online', desc: 'Select your preferred service and date slot via our instant form or WhatsApp.' },
  { num: '2', icon: PhoneCall, title: 'Get Confirmation', desc: 'Our coordinator confirms your timing and provides upfront transparent pricing.' },
  { num: '3', icon: Sparkles, title: 'Professional Cleaning', desc: 'Our crew arrives with rotary scrubbers, extractors, and surface-safe chemicals.' },
  { num: '4', icon: CheckCircle2, title: 'Final Handover', desc: 'Joint room-by-room check with you before departing. 100% satisfaction guaranteed.' },
];

export const WorkProcessSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="homecare-pill mb-2">Work Process</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#041B3B] mt-1">
            How Our Cleaning Services Works
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Simple 4-step workflow designed to deliver spotless, stress-free cleaning.
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
