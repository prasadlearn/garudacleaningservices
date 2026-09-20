import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

const STATS_DATA: StatItem[] = [
  { target: 450, suffix: '+', label: 'Projects Completed' },
  { target: 30, suffix: '+', label: 'Trained Specialists' },
  { target: 3000, suffix: '+', label: 'Happy Client Ratings' },
  { target: 5, suffix: '+ Years', label: 'Tirupati Local Experience' },
];

const AnimatedNumber: React.FC<{ target: number; suffix: string; isInView: boolean }> = ({
  target,
  suffix,
  isInView,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span>
      {target >= 1000 ? (count >= 1000 ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}K` : count) : count}
      {suffix}
    </span>
  );
};

export const StatsCounter: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="bg-[#E8F8EC] py-12 px-4 sm:px-8 border-y border-emerald-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center relative z-10">
        {STATS_DATA.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="space-y-1 p-4 rounded-xl hover:bg-white/60 transition-all duration-300"
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#22AC33] tracking-tight">
              <AnimatedNumber target={s.target} suffix={s.suffix} isInView={isInView} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#041B3B] uppercase tracking-wide">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
