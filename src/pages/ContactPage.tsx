import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  Loader2,
  Navigation,
  Calendar,
  Layers,
  Plus,
  X,
  ChevronRight,
  Search,
  Check,
  User,
  Smartphone
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { TRUST_CONFIG } from '../config/trustConfig';
import { SERVICES_DATA, getServiceBySlug, formatPrice, type ServiceCategory } from '../data/servicesData';
import { ServiceIcon } from '../components/ServiceIcon';
import { buildGarudaServiceRequestWhatsAppUrl } from '../utils/whatsappFormatter';
import { trackEvent } from '../utils/analytics';
import { BusinessContactNumbers } from '../components/BusinessContactNumbers';

const TIME_SLOTS = [
  'Morning (8:00 AM – 12:00 PM)',
  'Afternoon (12:00 PM – 4:00 PM)',
  'Evening (4:00 PM – 8:00 PM)',
  'Flexible / Any time today'
];

const getTodayIso = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedSlug = searchParams.get('service') || '';

  // Form states - empty by default (no preselected service or BHK)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [homeCleaningBhk, setHomeCleaningBhk] = useState('');
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<'all' | ServiceCategory>('all');
  const [serviceError, setServiceError] = useState('');

  const [locality, setLocality] = useState('');
  const [gpsLocation, setGpsLocation] = useState('');
  const [locating, setLocating] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [preferredDate, setPreferredDate] = useState(getTodayIso());
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync service preselection from URL ONLY if valid query parameter is provided
  useEffect(() => {
    if (preselectedSlug) {
      const found = getServiceBySlug(preselectedSlug);
      if (found) {
        setSelectedServices([found.title]);
        // Do not force any BHK tier by default
        setHomeCleaningBhk('');
      }
    } else {
      setSelectedServices([]);
      setHomeCleaningBhk('');
    }
  }, [preselectedSlug]);

  const toggleService = (serviceTitle: string) => {
    setServiceError('');
    if (selectedServices.includes(serviceTitle)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceTitle));
    } else {
      setSelectedServices([...selectedServices, serviceTitle]);
    }
  };

  const removeService = (serviceTitle: string) => {
    setServiceError('');
    setSelectedServices(selectedServices.filter((s) => s !== serviceTitle));
  };

  const clearAllServices = () => {
    setServiceError('');
    setSelectedServices([]);
    setHomeCleaningBhk('');
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const pinUrl = `https://maps.google.com/?q=${lat},${lng}`;
        setGpsLocation(pinUrl);
        setLocating(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setLocating(false);
        setGpsLocation('-');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const validateIndianPhone = (val: string) => {
    const cleaned = val.replace(/[\s\-+]/g, '').replace(/^91/, '').replace(/^0/, '');
    const valid = /^[6-9]\d{9}$/.test(cleaned);
    return { valid, cleaned };
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (val.trim()) {
      const { valid } = validateIndianPhone(val);
      if (!valid) {
        setPhoneError('Please enter a valid 10-digit Indian mobile number.');
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check for bots
    if (honeypot.trim() !== '') {
      return;
    }

    if (selectedServices.length === 0) {
      setServiceError('Please select at least one service to proceed.');
      setShowServicePicker(true);
      return;
    }

    const { valid, cleaned } = validateIndianPhone(phone);
    if (!valid) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const finalServicesList = selectedServices.map((title) => {
      if (title === 'Home Cleaning' && homeCleaningBhk) {
        return `Home Cleaning (${homeCleaningBhk})`;
      }
      return title;
    });

    setSubmitted(true);
    trackEvent('book_click', {
      services: finalServicesList,
      serviceCount: finalServicesList.length,
      sourcePage: '/contact'
    });

    // Build prefilled WhatsApp message
    const waUrl = buildGarudaServiceRequestWhatsAppUrl({
      appointmentDate: preferredDate,
      name: name.trim(),
      phone: cleaned,
      address: locality.trim() || 'Tirupati',
      gpsLocation: gpsLocation && gpsLocation !== '-' ? gpsLocation : undefined,
      serviceRequired: finalServicesList,
      priorityTime: preferredTime,
      remarks: notes.trim() || '-'
    });

    // Open WhatsApp confirmation in new tab
    window.open(waUrl, '_blank');
  };

  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchesCategory = serviceCategoryFilter === 'all' || s.category === serviceCategoryFilter;
    const matchesSearch = !serviceSearchQuery.trim() || s.title.toLowerCase().includes(serviceSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Garuda Cleaning Services',
    description: 'Contact Garuda Cleaning Services in Tirupati and Rayachoty for professional cleaning bookings, quotes, and inspections.',
    url: 'https://garudacleaningservices.in/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Garuda Cleaning Services',
      telephone: '+917799552084',
      email: 'garudacleaningservices1@gmail.com',
      areaServed: [
        {
          '@type': 'City',
          name: 'Tirupati'
        },
        {
          '@type': 'City',
          name: 'Rayachoty'
        }
      ]
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* React 19 Head */}
      <title>Contact Garuda Cleaning Services | Tirupati &amp; Rayachoty</title>
      <meta
        name="description"
        content="Contact Garuda Cleaning Services in Tirupati and Rayachoty. Call +91 77995 52084 or +91 93916 13240, or message on WhatsApp for instant price estimates and bookings."
      />
      <link rel="canonical" href="https://garudacleaningservices.in/contact" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* Hero Header */}
      <div className="bg-[#041B3B] text-white py-14 sm:py-20 px-4 sm:px-8 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#22AC33] border border-white/10">
            Tirupati &amp; Rayachoty Support &amp; Bookings
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact Garuda Cleaning Services
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Reach out directly for upfront quotes, schedule a cleaning crew, or arrange a site inspection across Tirupati, Rayachoty, and surrounding service areas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
        {/* Top Direct Contact Action Cards: Side by side on big screens, stacked on mobile */}
        <div className="flex justify-center w-full">
          <BusinessContactNumbers variant="cards" sourcePage="/contact" />
        </div>

        {/* 2-Column Grid: Contact Info & Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-5 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-black text-[#041B3B]">Service Information</h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#22AC33] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#041B3B] block">Service Area</span>
                    <span>{BUSINESS_CONFIG.contact.serviceArea}</span>
                    <span className="text-xs text-slate-500 block mt-0.5">{BUSINESS_CONFIG.contact.serviceAreaNote}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#22AC33] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#041B3B] block">Operating Hours</span>
                    <span>{BUSINESS_CONFIG.contact.operatingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#22AC33] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#041B3B] block">Email Inquiries</span>
                    <a
                      href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                      className="text-[#22AC33] hover:underline break-all"
                    >
                      {BUSINESS_CONFIG.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Areas List */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-[#041B3B] uppercase tracking-wider block mb-2">
                  Key Service Localities in Tirupati:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {BUSINESS_CONFIG.serviceAreas.map((area) => (
                    <span
                      key={area.name}
                      className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                    >
                      {area.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Review Box (rendered ONLY when googleReviewUrl exists) */}
            {TRUST_CONFIG.googleReviewUrl && (
              <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-emerald-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <h3 className="font-bold text-sm text-[#041B3B]">Customer Feedback</h3>
                </div>
                <p className="text-xs text-slate-600">
                  Had a cleaning service with us? Leave your authentic review on our Google Business Profile.
                </p>
                <a
                  href={TRUST_CONFIG.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22AC33] hover:underline"
                >
                  <span>Open Google Review Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Tirupati City Coverage Map */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-[#041B3B]">Tirupati City Service Coverage</h3>
                  <p className="text-[11px] text-slate-500">We cover all residential & commercial areas across Tirupati</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F8EC] text-[#22AC33] text-[11px] font-bold border border-[#22AC33]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22AC33] animate-pulse" />
                  <span>Citywide</span>
                </div>
              </div>

              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 ring-1 ring-slate-200/80">
                {!mapLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-400 space-y-2">
                    <MapPin className="w-8 h-8 text-[#22AC33] animate-bounce" />
                    <span className="text-xs font-semibold">Loading Tirupati Map...</span>
                  </div>
                )}
                <iframe
                  title="Garuda Cleaning Services Tirupati Service Area Map"
                  src={BUSINESS_CONFIG.coverage.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen={false}
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  className="w-full h-full rounded-2xl"
                />

                {/* Top-Left Tirupati City Coverage Badge */}
                <div className="absolute top-3 left-3 z-[var(--z-content)] pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041B3B]/90 backdrop-blur-md border border-[#22AC33]/50 text-white shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#22AC33] animate-pulse shrink-0" />
                  <span className="text-xs font-extrabold tracking-wide">Tirupati City</span>
                </div>

                {/* Stylized coverage area outline */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 170,110 C 270,75 450,70 580,95 C 690,120 735,215 705,320 C 675,410 530,445 385,435 C 240,425 125,385 105,280 C 90,195 115,130 170,110 Z"
                    fill="rgba(34, 172, 51, 0.04)"
                    stroke="#22AC33"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                </svg>

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-[#041B3B]/20 shadow-[inset_0_0_40px_rgba(4,27,59,0.22)]" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <span className="text-slate-500 font-medium">
                  We bring equipment directly to your location.
                </span>
                <a
                  href={BUSINESS_CONFIG.coverage.mapDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#22AC33] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs">
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#22AC33] animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#22AC33]">
                    Instant Online Booking
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-[#041B3B]">
                  Book a Cleaning or Request a Free Estimate
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Select one or multiple services. We confirm your appointment and slot directly via WhatsApp.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 sm:p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#22AC33] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#041B3B]">
                    Booking Request Sent!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, {name}! Your request for <strong>{selectedServices.join(', ')}</strong> has been received. A WhatsApp chat was opened with your booking details. Our Tirupati coordinator will confirm your slot shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn-homecare-navy text-xs py-2 px-4 rounded-xl font-bold cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : showServicePicker ? (
                /* INLINE SERVICE PICKER VIEW */
                <div className="space-y-3 sm:space-y-4 pb-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-[#041B3B]">Select Services</h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                        {selectedServices.length} {selectedServices.length === 1 ? 'service' : 'services'} selected
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {selectedServices.length > 0 && (
                        <button
                          type="button"
                          onClick={clearAllServices}
                          className="text-slate-500 hover:text-red-600 text-[11px] sm:text-xs font-bold px-1.5 py-1 cursor-pointer"
                        >
                          Clear all
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowServicePicker(false)}
                        className="bg-[#22AC33] hover:bg-[#1A8C28] text-white py-1.5 px-3.5 sm:py-2 sm:px-4 text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-2xs"
                      >
                        Done
                      </button>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search services (e.g. Sofa, Tank, Bathroom)..."
                      value={serviceSearchQuery}
                      onChange={(e) => setServiceSearchQuery(e.target.value)}
                      className="w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none bg-slate-50 text-slate-900 font-medium"
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {[
                      { id: 'all', label: 'All (19)' },
                      { id: 'residential', label: 'Residential (10)' },
                      { id: 'specialized', label: 'Specialized (5)' },
                      { id: 'commercial', label: 'Commercial (4)' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setServiceCategoryFilter(cat.id as any)}
                        className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg font-bold shrink-0 transition-colors cursor-pointer text-xs ${
                          serviceCategoryFilter === cat.id
                            ? 'bg-[#041B3B] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Service Selection Cards */}
                  <div className="space-y-1.5 max-h-[320px] sm:max-h-[380px] overflow-y-auto pr-1">
                    {filteredServices.map((srv) => {
                      const isSelected = selectedServices.includes(srv.title);
                      return (
                        <button
                          key={srv.slug}
                          type="button"
                          onClick={() => toggleService(srv.title)}
                          className={`w-full p-2.5 sm:p-3 rounded-xl text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer border ${
                            isSelected
                              ? 'bg-[#E8F8EC] border-[#22AC33] text-[#041B3B] shadow-2xs ring-1 ring-[#22AC33]/30'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#22AC33] text-white' : 'bg-slate-100 text-slate-600'}`}>
                              <ServiceIcon slug={srv.slug} name={srv.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-xs sm:text-sm font-bold block truncate text-[#041B3B]">{srv.title}</span>
                              <span className="text-[10px] sm:text-[11px] text-slate-500 block font-semibold">{formatPrice(srv.price)}</span>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'bg-[#22AC33] border-[#22AC33] text-white' : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowServicePicker(false)}
                      className="btn-homecare-green w-full h-10 sm:h-11 text-xs sm:text-sm font-bold justify-center flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Check className="w-4 h-4" />
                      <span>Confirm Selected Services ({selectedServices.length})</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* MAIN FORM VIEW */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from humans) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website-field">Leave blank</label>
                    <input
                      id="website-field"
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full h-10 sm:h-11 pl-10 pr-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        10-Digit Mobile Number *
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="e.g. 9876543210"
                          className={`w-full h-10 sm:h-11 pl-10 pr-3.5 rounded-xl border text-xs sm:text-sm focus:outline-none bg-slate-50/50 ${
                            phoneError ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-[#22AC33]'
                          }`}
                        />
                      </div>
                      {phoneError && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{phoneError}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* MULTI-SERVICE SELECTION CARD */}
                  <div className="p-3.5 sm:p-4 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Layers className="w-4 h-4 text-[#22AC33] shrink-0" />
                        <span className="text-[11px] sm:text-xs font-black text-[#041B3B] uppercase tracking-wider truncate">
                          {selectedServices.length > 0
                            ? `Selected Services (${selectedServices.length})`
                            : 'Services Required *'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {selectedServices.length > 0 && (
                          <button
                            type="button"
                            onClick={clearAllServices}
                            className="text-[11px] sm:text-xs font-bold text-slate-400 hover:text-red-500 transition-colors cursor-pointer px-1.5 py-1"
                          >
                            Clear
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowServicePicker(true)}
                          className="text-[11px] sm:text-xs font-bold text-[#22AC33] hover:text-[#1c8f2b] flex items-center gap-0.5 cursor-pointer bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:border-[#22AC33]/40 active:scale-95 transition-all shrink-0"
                        >
                          <span>{selectedServices.length > 0 ? '+ Add / Change' : 'Select Services'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {serviceError && (
                      <p className="text-[11px] text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">
                        {serviceError}
                      </p>
                    )}

                    {/* Empty State */}
                    {selectedServices.length === 0 ? (
                      <button
                        type="button"
                        onClick={() => setShowServicePicker(true)}
                        className="w-full p-3.5 sm:p-4 rounded-xl bg-white hover:bg-[#E8F8EC] border-2 border-dashed border-[#22AC33]/50 text-[#041B3B] flex items-center justify-between gap-3 transition-all cursor-pointer shadow-2xs group text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-[#22AC33] text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Plus className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs sm:text-sm font-black block text-[#041B3B]">Select Services</span>
                            <span className="text-[11px] text-slate-500 font-medium block truncate">Tap to choose 1 or more services from 19 options</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-xs font-bold text-[#22AC33] shrink-0">
                          <span>Browse</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </button>
                    ) : (
                      /* Selected Service Chips */
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {selectedServices.map((srvTitle) => (
                          <span
                            key={srvTitle}
                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#E8F8EC] text-[#041B3B] border border-[#22AC33]/40 px-2.5 py-1.5 rounded-lg shadow-2xs"
                          >
                            <span className="truncate max-w-[170px] sm:max-w-none">{srvTitle}</span>
                            <button
                              type="button"
                              onClick={() => removeService(srvTitle)}
                              className="w-4 h-4 rounded-full hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-slate-400"
                              title={`Remove ${srvTitle}`}
                              aria-label={`Remove ${srvTitle}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Contextual Options: If Home Cleaning is selected */}
                  {selectedServices.includes('Home Cleaning') && (
                    <div className="p-3 sm:p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <label className="block text-[11px] sm:text-xs font-bold text-[#041B3B] uppercase tracking-wider">
                          Apartment Size (Optional):
                        </label>
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#22AC33] bg-white px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                          {homeCleaningBhk === '1 BHK' && '₹2,399'}
                          {homeCleaningBhk === '2 BHK' && '₹3,299'}
                          {homeCleaningBhk === '3 BHK' && '₹4,999'}
                          {homeCleaningBhk === '4 BHK' && 'Starting ₹6,499'}
                          {!homeCleaningBhk && 'Starting ₹2,399'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                        {[
                          { label: '1 BHK', price: '₹2,399' },
                          { label: '2 BHK', price: '₹3,299' },
                          { label: '3 BHK', price: '₹4,999' },
                          { label: '4 BHK', price: '₹6,499+' }
                        ].map((tier) => (
                          <button
                            key={tier.label}
                            type="button"
                            onClick={() => setHomeCleaningBhk(homeCleaningBhk === tier.label ? '' : tier.label)}
                            className={`py-1.5 sm:py-2 px-1 text-center rounded-lg transition-all cursor-pointer border ${
                              homeCleaningBhk === tier.label
                                ? 'bg-[#22AC33] text-white border-[#22AC33] shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                          >
                            <div className="text-[11px] sm:text-xs font-bold leading-tight truncate">{tier.label}</div>
                            <div className={`text-[9px] sm:text-[10px] leading-tight truncate mt-0.5 ${homeCleaningBhk === tier.label ? 'text-white/95 font-bold' : 'text-slate-500 font-medium'}`}>
                              {tier.price}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Locality and Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Locality / Service Area *
                      </label>
                      <input
                        type="text"
                        required
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Balaji Colony, MR Palli, Rayachoty"
                        className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#22AC33]" />
                        <span>Preferred Date</span>
                      </label>
                      <input
                        type="date"
                        min={getTodayIso()}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-slate-50/50 text-slate-700"
                      />
                    </div>
                  </div>

                  {/* GPS Location Auto-Pin Field */}
                  <div className="space-y-1.5 p-3 sm:p-3.5 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#22AC33]" />
                        <span>GPS Location (Optional)</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleDetectLocation}
                        disabled={locating}
                        className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#22AC33] hover:text-[#1c8f2b] cursor-pointer bg-[#E8F8EC] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-[#22AC33]/25 shadow-2xs transition-all hover:bg-[#d5f3dc]"
                      >
                        {locating ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Detecting...</span>
                          </>
                        ) : (
                          <>
                            <Navigation className="w-3.5 h-3.5" />
                            <span>Auto-Pin My Location</span>
                          </>
                        )}
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Auto-detected or paste Google Maps link"
                      value={gpsLocation}
                      onChange={(e) => setGpsLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-white font-mono text-slate-700"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#22AC33]" />
                      <span>Preferred Time Slot</span>
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full h-10 sm:h-11 px-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-white text-slate-800 font-semibold"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Special Requirements / Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific stains, floor type, or access requirements..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-slate-50/50 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full btn-homecare-green py-3 sm:py-3.5 px-6 font-bold text-xs sm:text-sm justify-center flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {selectedServices.length > 1
                          ? `Book ${selectedServices.length} Services via WhatsApp`
                          : 'Send Booking Request via WhatsApp'}
                      </span>
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Zero advance payment required. Instant confirmation on WhatsApp.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

