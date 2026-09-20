import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreasList } from '../components/AreasList';
import { ChooseAndBookSection } from '../components/ChooseAndBookSection';
import { FAQAccordionSection } from '../components/FAQAccordionSection';
import { MapPin, Clock, ShieldCheck, Search, Phone, CheckCircle2, Navigation } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { useQuoteModal } from '../context/QuoteModalContext';

interface AreaHub {
  name: string;
  pincode: string;
  vanStationed: string;
  estArrival: string;
  landmarks: string;
  status: 'Active Daily' | 'Express Slot Available';
}

const HUBS: AreaHub[] = [
  {
    name: 'Balaji Colony',
    pincode: '517501',
    vanStationed: 'Van 1 (Central Hub)',
    estArrival: '15 - 25 mins',
    landmarks: 'Near SV University, Padmavati Mahila Visvavidyalayam',
    status: 'Express Slot Available',
  },
  {
    name: 'MR Palli & NGO Colony',
    pincode: '517502',
    vanStationed: 'Van 2 (South Sector)',
    estArrival: '20 - 30 mins',
    landmarks: 'Near MR Palli Circle & New Balaji Nagar',
    status: 'Active Daily',
  },
  {
    name: 'Alipiri & SVIMS Area',
    pincode: '517507',
    vanStationed: 'Van 3 (Hill Base Sector)',
    estArrival: '20 - 30 mins',
    landmarks: 'Near Alipiri Tollgate, BIRRD Hospital & SVIMS',
    status: 'Express Slot Available',
  },
  {
    name: 'Korlagunta & Bairagipatteda',
    pincode: '517501',
    vanStationed: 'Van 1 (Central Hub)',
    estArrival: '15 - 20 mins',
    landmarks: 'Near Korlagunta Main Road & Bairagipatteda Park',
    status: 'Active Daily',
  },
  {
    name: 'AIR Bypass Road & Postal Colony',
    pincode: '517501',
    vanStationed: 'Van 4 (East Corridor)',
    estArrival: '20 - 25 mins',
    landmarks: 'Near All India Radio Station, D-Mart Junction',
    status: 'Active Daily',
  },
  {
    name: 'Bhavani Nagar & Leela Mahal',
    pincode: '517501',
    vanStationed: 'Van 1 (Central Hub)',
    estArrival: '15 - 20 mins',
    landmarks: 'Near Leela Mahal Circle & Kapilatheertham Road',
    status: 'Active Daily',
  },
  {
    name: 'Tiruchanur & Padmavathi Puram',
    pincode: '517503',
    vanStationed: 'Van 5 (Temple Town Hub)',
    estArrival: '25 - 35 mins',
    landmarks: 'Padmavathi Ammavari Temple area & Bypass Road',
    status: 'Active Daily',
  },
  {
    name: 'Renigunta Road & Karakambadi',
    pincode: '517520',
    vanStationed: 'Van 6 (Industrial Sector)',
    estArrival: '30 - 40 mins',
    landmarks: 'Near Renigunta Railway Junction & Industrial Estate',
    status: 'Active Daily',
  },
  {
    name: 'Chandragiri & Srinivasa Mangapuram',
    pincode: '517101',
    vanStationed: 'Van 7 (West Corridor)',
    estArrival: '35 - 45 mins',
    landmarks: 'Near Chandragiri Fort & Kalyana Venkateswara Temple',
    status: 'Active Daily',
  },
];

export const ServiceAreaPage: React.FC = () => {
  const { openModal } = useQuoteModal();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHubs = HUBS.filter(
    h =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.pincode.includes(searchQuery) ||
      h.landmarks.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20 bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#041B3B] to-[#07254D] text-white py-16 px-4 sm:px-8 border-b border-white/10 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-bold border border-white/20">
            <Navigation className="w-3.5 h-3.5 text-[#22AC33]" />
            100% Doorstep Coverage Across Tirupati & Suburbs
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Service Areas in Tirupati
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Fast, reliable doorstep deep cleaning across Balaji Colony, AIR Bypass Road, MR Palli, Renigunta Road, Alipiri, and all surrounding localities with zero transport fees.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search your area or pincode (e.g., 'MR Palli', '517501')..."
                className="w-full bg-white text-slate-800 text-sm font-semibold pl-12 pr-4 py-3.5 rounded-full border border-white/20 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#22AC33]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Locality Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#041B3B]">
              Active Dispatch Sectors in Tirupati ({filteredHubs.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live deployment times with specialized mobile vans & equipment.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22AC33] animate-pulse" />
            Vans Operational 7 AM - 9 PM
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHubs.map((hub, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center font-bold shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-[#041B3B]">{hub.name}</h3>
                      <div className="text-[11px] text-slate-400 font-bold">PIN: {hub.pincode}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-black text-[#22AC33] bg-[#E8F8EC] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {hub.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 py-3 border-y border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Est. Arrival Time:</span>
                    <span className="font-bold text-[#041B3B] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#22AC33]" />
                      {hub.estArrival}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Stationed Van:</span>
                    <span className="font-bold text-slate-700">{hub.vanStationed}</span>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-1">
                    <span className="font-semibold text-slate-700">Landmarks:</span> {hub.landmarks}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-2">
                <button
                  onClick={() => openModal(`Service in ${hub.name}`)}
                  className="btn-homecare-green flex-1 text-xs py-2.5 justify-center font-bold"
                >
                  Book for {hub.name}
                </button>
                <a
                  href={BUSINESS_CONFIG.buildWhatsAppUrl(`Hi Garuda, I need cleaning in ${hub.name}, Tirupati.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-[#22AC33] hover:text-white text-[#041B3B] transition-colors"
                  title="WhatsApp Inquiry"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Areas Pills Bar */}
      <AreasList />

      {/* Locality Highlights Guarantee Strip */}
      <section className="py-16 px-4 sm:px-8 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041B3B]">
              Why We Can Reach You Faster in Tirupati
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              With dedicated mobile cleaning vans stationed across prime hubs, we reach your doorstep within your requested arrival window.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFC] p-7 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#041B3B]">Guaranteed 2-Hour Arrival Window</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose your exact convenient time slot. Our team arrives promptly with complete machinery, scrubbers, and safe detergents.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-7 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#041B3B] text-[#FFD700] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#041B3B]">Zero Transport Charges</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No surprise travel or petrol surcharges within Tirupati Municipal limits. 100% upfront pricing agreed in advance.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-7 rounded-3xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#22AC33] text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-[#041B3B]">Free On-Site Property Walkthrough</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need a pre-cleaning inspection for large independent duplex villas or commercial buildings? We provide free site assessments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChooseAndBookSection />
      <FAQAccordionSection />
    </div>
  );
};
