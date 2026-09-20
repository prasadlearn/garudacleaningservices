import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Sparkles, Navigation, Loader2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { AreasList } from '../components/AreasList';
import { FAQAccordionSection } from '../components/FAQAccordionSection';
import { buildGarudaInquiryWhatsAppUrl } from '../utils/whatsappFormatter';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);
  const [mapsPin, setMapsPin] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Complete Home Deep Cleaning',
    locality: 'Balaji Colony',
    message: 'Please contact me for free inspection',
  });

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser. Please type your locality.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const pinUrl = `https://maps.google.com/?q=${lat},${lng}`;
        setMapsPin(pinUrl);
        setLocating(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setLocating(false);
        setMapsPin(`https://maps.google.com/?q=${encodeURIComponent(formData.locality + ', Tirupati')}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const waUrl = buildGarudaInquiryWhatsAppUrl({
      name: formData.name,
      phone: formData.phone,
      service: formData.service || 'Complete Home Deep Cleaning',
      locality: formData.locality,
      mapsPin: mapsPin || `https://maps.google.com/?q=${encodeURIComponent(formData.locality + ', Tirupati')}`,
      message: formData.message || 'Please contact me for free inspection'
    });

    window.open(waUrl, '_blank');
  };

  const whatsappInquiryUrl = buildGarudaInquiryWhatsAppUrl({
    name: formData.name || 'Prasad',
    phone: formData.phone || '7799552084',
    service: formData.service || 'Complete Home Deep Cleaning',
    locality: formData.locality,
    mapsPin: mapsPin,
    message: formData.message
  });

  return (
    <div className="pt-20 bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#041B3B] to-[#07254D] text-white py-16 sm:py-20 px-4 sm:px-8 border-b border-white/10 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#22AC33]" />
            Fast WhatsApp Coordination • Tirupati
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact Garuda Cleaning Services
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Reach out to our Tirupati cleaning coordinators for immediate quotations, custom commercial site assessments, and same-day slots.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B]">
              Tirupati Operations Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Direct telephone, WhatsApp, and dispatch hub serving all Tirupati localities.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0 shadow-xs">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Direct Hotline</div>
                <a
                  href={BUSINESS_CONFIG.contact.phoneTel}
                  className="font-black text-lg text-[#041B3B] hover:text-[#22AC33] transition-colors"
                >
                  {BUSINESS_CONFIG.contact.phoneDisplay}
                </a>
                <div className="text-xs text-slate-500 mt-0.5">Instant booking &amp; emergency inquiries</div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#22AC33] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">WhatsApp Quick Booking</div>
                <a
                  href={BUSINESS_CONFIG.buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-lg text-[#22AC33] hover:underline"
                >
                  Chat with Team on WhatsApp
                </a>
                <div className="text-xs text-slate-500 mt-0.5">Average reply time: under 5 minutes</div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#041B3B] text-[#FFD700] flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Base Address</div>
                <div className="font-bold text-sm text-[#041B3B]">
                  {BUSINESS_CONFIG.contact.address}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#041B3B] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Working Hours</div>
                <div className="font-bold text-sm text-[#041B3B]">
                  {BUSINESS_CONFIG.contact.operatingHours}
                </div>
                <div className="text-xs text-emerald-600 font-semibold mt-0.5">All 7 days open</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form with Rapido Style Pin */}
        <div className="lg:col-span-7">
          <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#22AC33] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#041B3B]">
                  WhatsApp Inquiry Prepared!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you <strong>{formData.name}</strong>. If WhatsApp did not launch automatically, tap below to send your request with your exact Google Maps pin:
                </p>

                <div className="pt-3 max-w-sm mx-auto flex flex-col gap-2.5">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-homecare-green w-full text-xs py-3.5 justify-center font-black shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open WhatsApp Chat Now
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#041B3B]">
                    Send Direct WhatsApp Booking Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Our team receives your inquiry with your exact Google Maps pin for rapid vehicle navigation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prasad"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 6302175923"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none font-medium"
                    >
                      <option value="Complete Home Deep Cleaning">Complete Home Deep Cleaning</option>
                      <option value="Modular Kitchen Degreasing">Modular Kitchen Degreasing</option>
                      <option value="Bathroom Acid-Free Descaling">Bathroom Acid-Free Descaling</option>
                      <option value="Sofa & Carpet Shampooing">Sofa &amp; Carpet Shampooing</option>
                      <option value="Mechanized Floor Scrubbing">Mechanized Floor Scrubbing</option>
                      <option value="Luxury Villa Deep Cleaning">Luxury Villa Deep Cleaning</option>
                      <option value="Office & Clinic Commercial Detailing">Office &amp; Clinic Detailing</option>
                      <option value="Pest Control & Termite Solutions">Pest Control &amp; Termite Solutions</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase">
                        Locality / Street Address / Google Maps Link *
                      </label>
                      <button
                        type="button"
                        onClick={handleDetectLocation}
                        disabled={locating}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#22AC33] hover:underline cursor-pointer bg-[#E8F8EC] px-2.5 py-1 rounded-lg border border-[#22AC33]/20 shadow-2xs"
                      >
                        {locating ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Detecting...</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3 h-3 text-[#22AC33]" />
                            <span>Auto-Detect Live GPS</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Doctor M H Marigowda Road / Balaji Colony"
                        value={formData.locality}
                        onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                        className="w-full pl-9 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Type your address manually, or tap "Auto-Detect Live GPS" to automatically fill your coordinates.
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Special Message / Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Please contact me for free inspection"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-homecare-green w-full text-sm py-4 justify-center font-black cursor-pointer shadow-xl shine-effect"
                >
                  <Send className="w-4 h-4 text-[#FFD700]" />
                  Submit Inquiry on WhatsApp
                </button>

                <div className="text-center pt-2">
                  <a
                    href={BUSINESS_CONFIG.contact.phoneTel}
                    className="text-xs font-bold text-slate-600 hover:text-[#22AC33] transition-colors"
                  >
                    Need immediate assistance? Call <strong>+91 77995 52084</strong>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <AreasList />
      <FAQAccordionSection />
    </div>
  );
};
