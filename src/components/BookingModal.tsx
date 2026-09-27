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

  const getTodayIso = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const formatDateForWhatsApp = (isoOrTextDate: string) => {
    if (!isoOrTextDate) return '';
    if (isoOrTextDate.includes('-')) {
      const parts = isoOrTextDate.split('-');
      if (parts.length === 3) {
        const [yyyy, mm, dd] = parts;
        return `${dd}/${mm}/${yyyy}`;
      }
    }
    return isoOrTextDate;
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    appointmentDate: getTodayIso(),
    address: '',
    landmark: '',
    gpsLocation: '-',
    serviceRequired: 'BHK Deep Cleaning',
    totalAmount: 'To be confirmed after inspection',
    subscriptionClient: 'No',
    priorityTime: '10:00 AM (Morning Slot)',
    remarks: '',
  });

  const TIME_SLOTS = [
    '08:00 AM - 11:00 AM (Early Morning)',
    '10:00 AM - 01:00 PM (Morning Slot)',
    '01:00 PM - 04:00 PM (Afternoon Slot)',
    '04:00 PM - 07:00 PM (Evening Slot)',
  ];

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
      appointmentDate: formatDateForWhatsApp(formData.appointmentDate),
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
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#041B3B] text-white px-4 py-3 sm:px-6 sm:py-4 relative shrink-0">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-[#22AC33]" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#22AC33]">
              Instant Service Booking
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-black tracking-tight !text-white leading-tight">
            Schedule Cleaning Appointment
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 font-medium">
            Fast dispatch across all Tirupati localities • Quick WhatsApp confirmation
          </p>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-5 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-[#22AC33] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#041B3B]">
                Request Sent via WhatsApp!
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
                Thank you! Our WhatsApp coordinator has received your details. We will confirm your timing and price quote shortly.
              </p>
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-homecare-navy px-6 py-2.5 min-h-[40px] text-xs font-bold cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <div>
                  <label htmlFor="modal-name" className="block text-[11px] font-bold text-slate-700 uppercase mb-0.5">
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
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:border-[#22AC33] focus:ring-1 focus:ring-[#22AC33]/20 outline-none font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-[11px] font-bold text-slate-700 uppercase mb-0.5">
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
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:border-[#22AC33] focus:ring-1 focus:ring-[#22AC33]/20 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Appointment Date & Priority Time (2-col on all screens) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div>
                  <label htmlFor="modal-date" className="block text-[11px] font-bold text-slate-700 uppercase mb-0.5 flex items-center gap-1 truncate">
                    <Calendar className="w-3 h-3 text-[#22AC33] shrink-0" />
                    Date *
                  </label>
                  <input
                    id="modal-date"
                    type="date"
                    required
                    min={getTodayIso()}
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full h-10 px-2.5 sm:px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] focus:ring-1 focus:ring-[#22AC33]/20 outline-none font-medium bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="modal-time" className="block text-[11px] font-bold text-slate-700 uppercase mb-0.5 flex items-center gap-1 truncate">
                    <Clock className="w-3 h-3 text-[#22AC33] shrink-0" />
                    Time Slot *
                  </label>
                  <select
                    id="modal-time"
                    value={formData.priorityTime}
                    onChange={(e) => setFormData({ ...formData, priorityTime: e.target.value })}
                    className="w-full h-10 px-2 sm:px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] focus:ring-1 focus:ring-[#22AC33]/20 outline-none font-medium text-[#041B3B] bg-white"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot.split('(')[0].trim()}
                      </option>
                    ))}
                    <option value="Anytime / Urgent Today">Anytime / Urgent</option>
                  </select>
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label htmlFor="modal-service" className="block text-[11px] font-bold text-slate-700 uppercase mb-0.5">
                  Service Required *
                </label>
                <select
                  id="modal-service"
                  value={formData.serviceRequired}
                  onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] focus:ring-1 focus:ring-[#22AC33]/20 outline-none font-semibold text-[#041B3B] bg-white"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <div>
                  <label htmlFor="modal-address" className="block text-[11px] font-bold text-slate-700 uppercase mb-0.5">
                    Address / Area in Tirupati *
                  </label>
                  <input
                    id="modal-address"
                    type="text"
                    required
                    autoComplete="street-address"
                    placeholder="e.g. AIR Bypass Road, MR Palli"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:border-[#22AC33] focus:ring-1 focus:ring-[#22AC33]/20 outline-none font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="modal-landmark" className="block text-[11px] font-bold text-slate-700 uppercase mb-0.5">
                    Landmark (Optional)
                  </label>
                  <input
                    id="modal-landmark"
                    type="text"
                    placeholder="e.g. Near Temple / Apartment Name"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:border-[#22AC33] focus:ring-1 focus:ring-[#22AC33]/20 outline-none font-medium"
                  />
                </div>
              </div>

              {/* GPS Location Auto Detect */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <label htmlFor="modal-gps" className="block text-[11px] font-bold text-slate-700 uppercase flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#22AC33]" />
                    GPS Location (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={locating}
                    className="h-6 inline-flex items-center gap-1 text-[10px] font-bold text-[#22AC33] hover:text-[#1c8f2b] cursor-pointer bg-[#E8F8EC] px-2 rounded-lg border border-[#22AC33]/20"
                  >
                    {locating ? (
                      <>
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        <span>Detecting...</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-2.5 h-2.5" />
                        <span>Auto-Pin GPS</span>
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
                  className="w-full h-8 px-2.5 rounded-lg border border-slate-200 text-xs focus:border-[#22AC33] outline-none font-mono text-slate-600 bg-slate-50"
                />
              </div>

              {/* Remarks */}
              <div>
                <label htmlFor="modal-remarks" className="block text-[11px] font-bold text-slate-700 uppercase mb-0.5">
                  Special Notes (Optional)
                </label>
                <input
                  id="modal-remarks"
                  type="text"
                  placeholder="e.g. Stains on hall tiles, balcony cleaning..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#22AC33] outline-none font-medium"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-col gap-1.5">
                <button
                  type="submit"
                  className="btn-homecare-green w-full h-11 text-xs sm:text-sm font-bold justify-center flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Booking to WhatsApp</span>
                </button>

                <div className="text-center">
                  <a
                    href={BUSINESS_CONFIG.contact.phoneTel}
                    className="text-[11px] font-bold text-slate-600 hover:text-[#22AC33] inline-flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Or Call Coordinator: {BUSINESS_CONFIG.contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
