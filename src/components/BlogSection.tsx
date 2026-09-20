import React, { useState } from 'react';
import { BookOpen, ArrowRight, X, Clock, Calendar, CheckCircle2 } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

const GUIDES: Guide[] = [
  {
    id: '1',
    title: 'Managing Hard-Water Stains on Bathroom Tiles in Tirupati',
    category: 'Tile & Hard Water Care',
    readTime: '4 min read',
    date: 'March 10, 2026',
    image: '/images/bathroom-clean.jpg',
    excerpt: 'Practical maintenance routines to minimize mineral scale and water stains on glass shower partitions and ceramic tiles common in Tirupati groundwater.',
    content: [
      'Tirupati groundwater possesses elevated Total Dissolved Solids (TDS) and mineral content, which evaporates to leave stubborn white calcification on bathroom fixtures, mirrors, and wall tiles.',
      'Avoid raw hydrochloric acid: While acid appears to instantly dissolve deposits, it permanently etches the glaze of vitrified tiles and dissolves cement grout, resulting in future water seepage.',
      'Use citric or sulfamic acid formulations: Mild organic descaling agents safely break down calcium bonds without corroding chrome mixers or shower glass.',
      'Squeegee after showers: Spending 30 seconds wiping glass shower partitions drastically reduces the build-up rate of limescale between professional cleaning visits.'
    ]
  },
  {
    id: '2',
    title: 'Kitchen Degreasing: Keeping Cabinets and Chimneys Residue-Free',
    category: 'Modular Kitchen Care',
    readTime: '3 min read',
    date: 'February 24, 2026',
    image: '/images/kitchen-clean.jpg',
    excerpt: 'Step-by-step approaches for managing everyday cooking oil vapors and heavy grease accumulation across kitchen backsplash tiles and cooktops.',
    content: [
      'South Indian cooking styles rich in mustard, curry leaf splatters, and ghee create airborne lipid particles that deposit on upper cabinet surfaces and chimney mesh filters.',
      'Clean baffle filters fortnightly in boiling water with washing soda or caustic crystals to preserve your chimney motor suction capacity.',
      'Wipe down tile backsplashes while warm: Degreasers work 3x faster when applied to tiles immediately after high-heat cooking rather than allowing oil to polymerize into varnish.',
      'Professional rotary steam degreasing twice a year restores laminate shine without bubbling wood substrates.'
    ]
  },
  {
    id: '3',
    title: 'Why Regular Vacuum Extraction Extends Sofa Fabric Life',
    category: 'Upholstery Care',
    readTime: '3 min read',
    date: 'February 12, 2026',
    image: '/images/sofa-clean.jpg',
    excerpt: 'Understanding how periodic deep extraction cleans trapped dust mites and preserves upholstery fabric texture without damaging cushioning fibers.',
    content: [
      'Dust particles in living rooms act like microscopic sandpapers against sofa fabric threads every time someone sits down.',
      'Dry surface dusting only pushes microscopic allergens deeper into the polyurethane foam cushions.',
      'Injection-extraction technology injects a mild enzymatic surfactant and immediately vacuums it out under 20 kPa suction, removing dead skin cells and preventing foul odors.',
      'Schedule deep extraction every 6 months to double the lifespan of fabric and suede furniture.'
    ]
  }
];

export const BlogSection: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  return (
    <section id="blog" className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-[#0E6B7A] text-xs font-bold uppercase tracking-wider mb-3">
            Cleaning Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight">
            Maintenance Tips &amp; Care Advice
          </h2>
          <p className="text-slate-600 mt-3.5 text-base sm:text-lg leading-relaxed">
            Practical care recommendations from our cleaning technicians to keep your home fresh and spotless between professional visits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {GUIDES.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setActiveGuide(guide)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/95 text-[#0B192C] shadow-xs uppercase tracking-wider">
                    {guide.category}
                  </span>
                  <span className="absolute bottom-3 right-3 text-xs px-2.5 py-1 rounded-md bg-[#0B192C]/85 text-white font-medium flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#38BDF8]" />
                    <span>{guide.readTime}</span>
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-[#0B192C] mb-2 leading-snug group-hover:text-[#0E6B7A] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {guide.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E6B7A] group-hover:text-[#0B192C]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Reading Modal */}
      {activeGuide && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveGuide(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveGuide(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
              <span className="font-bold text-[#0E6B7A] uppercase">{activeGuide.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activeGuide.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activeGuide.date}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] leading-tight mb-4">
              {activeGuide.title}
            </h2>

            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6">
              <img src={activeGuide.image} alt={activeGuide.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {activeGuide.content.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0E6B7A] shrink-0 mt-0.5" />
                  <p>{p}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveGuide(null)}
                className="px-6 py-2.5 rounded-full bg-[#0E6B7A] hover:bg-[#0B192C] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
