import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Phone, MapPin, Sparkles, Loader2, Calendar, Clock } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { buildGarudaServiceRequestWhatsAppUrl } from '../utils/whatsappFormatter';
import { SERVICES_DATA } from '../data/servicesData';
import { trackEvent } from '../utils/analytics';

export const BookingModal: React.FC = () => {
  const { isOpen, initialService, closeModal } = useQuoteModal();
  const [submitted, setSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);

  const getTodayFormatted = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    appointmentDate: getTodayFormatted(),
    address: '',
    landmark: '',
    gpsLocation: '-',
    serviceRequired: 'BHK Deep Cleaning',
    totalAmount: 'To be confirmed after inspection',
    subscriptionClient: 'No',
    priorityTime: '10:00 AM',
    remarks: '',
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceRequired: initialService }));
    }
    if (isOpen) {
      setSubmitted(false);
      setLocating(false);
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

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
        setFormData((prev) => ({ ...prev, gpsLocation: pinUrl }));
        setLocating(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setLocating(false);
        setFormData((prev) => ({ ...prev, gpsLocation: '-' }));
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    trackEvent('book_click', {
      serviceSlug: formData.serviceRequired,
      sourcePage: 'booking_modal'
    });

    const waUrl = buildGarudaServiceRequestWhatsAppUrl({
      appointmentDate: formData.appointmentDate,
      name: formData.name,
      phone: formData.phone,
      address: formData.address || 'Tirupati',
      landmark: formData.landmark,
      gpsLocation: formData.gpsLocation,
      serviceRequired: formData.serviceRequired,
      totalAmount: formData.totalAmount,
      subscriptionClient: formData.subscriptionClient,
      priorityTime: formData.priorityTime,
      remarks: formData.remarks || '-',
    });

    window.open(waUrl, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Schedule Cleaning Appointment"
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#041B3B] text-white p-6 relative">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#22AC33]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#22AC33]">
              Instant Service Booking
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight !text-white">
            Schedule Cleaning Appointment
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
            Dispatching specialized cleaning crews across all Tirupati localities.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#22AC33] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#041B3B]">
                Request Sent via WhatsApp!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you! Our WhatsApp coordinator has received your details. We will confirm your timing and price quote shortly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-homecare-navy w-full sm:w-auto px-6 py-3 min-h-[48px] text-xs font-bold cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Customer Name *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl border border-slate-200 text-base focus:border-[#22AC33] focus:ring-2 focus:ring-[#22AC33]/20 outline-none font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl border border-slate-200 text-base focus:border-[#22AC33] focus:ring-2 focus:ring-[#22AC33]/20 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Appointment Date & Priority Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-date" className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#22AC33]" />
                    Appointment Date *
                  </label>
                  <input
                    id="modal-date"
                    type="text"
                    required
                    placeholder="DD/MM/YYYY"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl border border-slate-200 text-base focus:border-[#22AC33] focus:ring-2 focus:ring-[#22AC33]/20 outline-none font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="modal-time" className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#22AC33]" />
                    Priority Time *
                  </label>
                  <input
                    id="modal-time"
                    type="text"
                    required
                    placeholder="e.g. 10:00 AM"
                    value={formData.priorityTime}
                    onChange={(e) => setFormData({ ...formData, priorityTime: e.target.value })}
                    className="w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl border border-slate-200 text-base focus:border-[#22AC33] focus:ring-2 focus:ring-[#22AC33]/20 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label htmlFor="modal-service" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Service Required *
                </label>
                <select
                  id="modal-service"
                  value={formData.serviceRequired}
                  onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                  className="w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl border border-slate-200 text-base focus:border-[#22AC33] focus:ring-2 focus:ring-[#22AC33]/20 outline-none font-semibold text-[#041B3B] bg-white"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title} ({s.category})
                    </option>
                  ))}
                  <option value="Custom / Multiple Services">Custom / Multiple Services</option>
                </select>
              </div>

              {/* Address & Landmark */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-address" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Address / Colony *
                  </label>
                  <input
                    id="modal-address"
                    type="text"
                    required
                    autoComplete="street-address"
                    placeholder="e.g. AIR Bypass Road"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl border border-slate-200 text-base focus:border-[#22AC33] focus:ring-2 focus:ring-[#22AC33]/20 outline-none font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="modal-landmark" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Landmark
                  </label>
                  <input
                    id="modal-landmark"
                    type="text"
                    placeholder="e.g. Near Bus Stand"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl border border-slate-200 text-base focus:border-[#22AC33] focus:ring-2 focus:ring-[#22AC33]/20 outline-none font-medium"
                  />
                </div>
              </div>

              {/* GPS Location Auto Detect */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="modal-gps" className="block text-xs font-bold text-slate-700 uppercase flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#22AC33]" />
                    GPS Location
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={locating}
                    className="min-h-[36px] inline-flex items-center gap-1 text-xs font-bold text-[#22AC33] hover:text-[#1c8f2b] cursor-pointer bg-[#E8F8EC] px-3 py-1.5 rounded-xl border border-[#22AC33]/20 shadow-2xs"
                  >
                    {locating ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Detecting GPS...</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3 h-3" />
                        <span>Auto-Pin My Location</span>
                      </>
                    )}
                  </button>
                </div>
                <input
                  id="modal-gps"
                  type="text"
                  placeholder="Auto-detected or paste Google Maps link"
                  value={formData.gpsLocation}
                  onChange={(e) => setFormData({ ...formData, gpsLocation: e.target.value })}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] focus:ring-2 focus:ring-[#22AC33]/20 outline-none font-mono text-slate-600 bg-slate-50"
                />
              </div>

              {/* Remarks */}
              <div>
                <label htmlFor="modal-remarks" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Special Remarks / Requests (Optional)
                </label>
                <input
                  id="modal-remarks"
                  type="text"
                  placeholder="Any specific stains, priority areas..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl border border-slate-200 text-base focus:border-[#22AC33] focus:ring-2 focus:ring-[#22AC33]/20 outline-none font-medium"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="btn-homecare-green flex-1 min-h-[48px] py-3.5 text-sm font-bold justify-center flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Booking to WhatsApp</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <a
                  href={BUSINESS_CONFIG.contact.phoneTel}
                  className="min-h-[44px] text-xs font-bold text-slate-600 hover:text-[#22AC33] inline-flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Or call directly: {BUSINESS_CONFIG.contact.phoneDisplay}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
