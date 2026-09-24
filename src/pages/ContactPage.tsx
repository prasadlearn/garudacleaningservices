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
  Navigation
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { TRUST_CONFIG } from '../config/trustConfig';
import { SERVICES_DATA, getServiceBySlug, formatPrice } from '../data/servicesData';
import { buildGarudaServiceRequestWhatsAppUrl } from '../utils/whatsappFormatter';
import { trackEvent } from '../utils/analytics';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedSlug = searchParams.get('service') || '';

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState('bhk-deep-cleaning');
  const [bhkTier, setBhkTier] = useState('2 BHK');
  const [unitQuantity, setUnitQuantity] = useState<number>(500);
  const [locality, setLocality] = useState('');
  const [gpsLocation, setGpsLocation] = useState('');
  const [locating, setLocating] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (8 AM - 12 PM)');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  // Sync service preselection from URL if valid
  useEffect(() => {
    if (preselectedSlug) {
      const found = getServiceBySlug(preselectedSlug);
      if (found) {
        setSelectedServiceSlug(found.slug);
      }
    }
  }, [preselectedSlug]);

  const currentService = getServiceBySlug(selectedServiceSlug) || SERVICES_DATA[0];
  const isBhkService = currentService.slug === 'bhk-deep-cleaning';
  const isPerUnit = currentService.price.kind === 'per-unit';

  const validateIndianPhone = (val: string) => {
    // Strips spaces, dashes, +91, 0 prefix
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

    const { valid, cleaned } = validateIndianPhone(phone);
    if (!valid) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setSubmitted(true);
    trackEvent('book_click', {
      serviceSlug: selectedServiceSlug,
      sourcePage: '/contact',
      tier: isBhkService ? bhkTier : undefined,
      quantity: isPerUnit ? `${unitQuantity} ${currentService.unitLabel}` : undefined
    });

    // Format service description line
    let serviceLabel = currentService.title;
    if (isBhkService) {
      serviceLabel += ` (${bhkTier})`;
    } else if (isPerUnit) {
      serviceLabel += ` (${unitQuantity} ${currentService.unitLabel})`;
    }

    // Build prefilled WhatsApp message
    const waUrl = buildGarudaServiceRequestWhatsAppUrl({
      appointmentDate: preferredDate,
      name: name.trim(),
      phone: cleaned,
      address: locality.trim() || 'Tirupati',
      gpsLocation: gpsLocation && gpsLocation !== '-' ? gpsLocation : undefined,
      serviceRequired: serviceLabel,
      priorityTime: preferredTime,
      remarks: notes.trim() || '-'
    });

    // Open WhatsApp confirmation in new tab
    window.open(waUrl, '_blank');
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Garuda Cleaning Services Tirupati',
    description: 'Contact Garuda Cleaning Services in Tirupati for professional cleaning bookings, quotes, and inspections.',
    url: 'https://garudacleaningservices.in/contact',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Garuda Cleaning Services',
      telephone: '+917799552084',
      email: 'contact@garudacleaningservices.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bhavani Nagar, AIR Bypass Road',
        addressLocality: 'Tirupati',
        addressRegion: 'Andhra Pradesh',
        postalCode: '517501',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 13.6288,
        longitude: 79.4192
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* React 19 Head */}
      <title>Contact Garuda Cleaning Services | Tirupati</title>
      <meta
        name="description"
        content="Contact Garuda Cleaning Services in Tirupati. Call +91 77995 52084 or message on WhatsApp for instant price estimates, home inspections, and bookings."
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
            Tirupati Support & Bookings
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact Garuda Cleaning Services – Tirupati
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Reach out directly for upfront quotes, schedule a cleaning crew, or arrange a site inspection across Tirupati.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Top Big Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            onClick={() => trackEvent('call_click', { sourcePage: '/contact' })}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#22AC33] hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#22AC33] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Direct Telephone
              </span>
              <span className="text-base sm:text-lg font-black text-[#041B3B] block">
                {BUSINESS_CONFIG.contact.phoneDisplay}
              </span>
              <span className="text-xs text-[#22AC33] font-semibold">Tap to call our customer support team</span>
            </div>
          </a>

          <a
            href={BUSINESS_CONFIG.buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { sourcePage: '/contact' })}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#22AC33] hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#22AC33] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Instant WhatsApp Quote
              </span>
              <span className="text-base sm:text-lg font-black text-[#041B3B] block">
                {BUSINESS_CONFIG.contact.whatsappDisplay}
              </span>
              <span className="text-xs text-[#22AC33] font-semibold">Chat with photos & get quotes</span>
            </div>
          </a>
        </div>

        {/* 2-Column Grid: Contact Info & Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-xl font-black text-[#041B3B]">Office & Operating Hours</h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#22AC33] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#041B3B] block">Service Hub Address</span>
                    <span>{BUSINESS_CONFIG.contact.address}</span>
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
                      className="text-[#22AC33] hover:underline"
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
              <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-xs space-y-3">
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
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
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
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-[#041B3B]">
                  Book a Cleaning or Request a Free Estimate
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your details below. We verify every request and confirm timing before service.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
                  <div className="w-14 h-14 bg-[#22AC33] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#041B3B]">
                    Booking Request Sent!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, {name}! Your request for <strong>{currentService.title}</strong> has been created. A WhatsApp chat was opened with your booking details. Our Tirupati coordinator will confirm your slot shortly.
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
              ) : (
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        10-Digit Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="e.g. 9876543210"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none bg-slate-50/50 ${
                          phoneError ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-[#22AC33]'
                        }`}
                      />
                      {phoneError && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{phoneError}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Service Required *
                    </label>
                    <select
                      value={selectedServiceSlug}
                      onChange={(e) => setSelectedServiceSlug(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-white font-medium text-slate-800"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.slug} value={srv.slug}>
                          {srv.title} ({srv.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Conditional: BHK Tier (when BHK Deep Cleaning is chosen) */}
                  {isBhkService && (
                    <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200">
                      <label className="block text-xs font-bold text-[#041B3B] uppercase tracking-wider mb-1.5">
                        Select Apartment Size:
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {['1 BHK', '2 BHK', '3 BHK', '4 BHK'].map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setBhkTier(tier)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              bhkTier === tier
                                ? 'bg-[#22AC33] text-white shadow-2xs'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5">
                        For larger duplexes or villas, please mention in notes below.
                      </p>
                    </div>
                  )}

                  {/* Conditional: Quantity / Area field (for per-unit services) */}
                  {isPerUnit && (
                    <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center justify-between gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#041B3B] uppercase tracking-wider">
                          Approximate {currentService.unitLabel}:
                        </label>
                        <span className="text-[11px] text-slate-500">
                          Rate: {formatPrice(currentService.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min={1}
                          max={50000}
                          value={unitQuantity}
                          onChange={(e) => setUnitQuantity(Math.max(1, Number(e.target.value)))}
                          className="w-24 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-bold text-center focus:border-[#22AC33] outline-none"
                        />
                        <span className="text-xs font-bold text-slate-600">{currentService.unitLabel}</span>
                      </div>
                    </div>
                  )}

                  {/* Locality and Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Locality / Area in Tirupati *
                      </label>
                      <input
                        type="text"
                        required
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. MR Palli, AIR Bypass, Balaji Colony"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-slate-50/50 text-slate-700"
                      />
                    </div>
                  </div>

                  {/* GPS Location Auto-Pin Field */}
                  <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#22AC33]" />
                        <span>GPS Location</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleDetectLocation}
                        disabled={locating}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22AC33] hover:text-[#1c8f2b] cursor-pointer bg-[#E8F8EC] px-3.5 py-1.5 rounded-xl border border-[#22AC33]/25 shadow-2xs transition-all hover:bg-[#d5f3dc]"
                      >
                        {locating ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Detecting GPS...</span>
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
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-white font-mono text-slate-700"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#22AC33] focus:outline-none bg-white text-slate-800"
                    >
                      <option value="Morning (8 AM - 12 PM)">Morning (8:00 AM – 12:00 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12:00 PM – 4:00 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4:00 PM – 8:00 PM)</option>
                      <option value="Flexible / Any Time">Flexible / Any Time</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
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
                      className="w-full btn-homecare-green py-3.5 px-6 font-bold text-sm justify-center flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Booking Request via WhatsApp</span>
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Zero advance payment required. Free re-inspection upon completion.
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
