import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Phone, MessageCircle, MapPin, Sparkles, Loader2, Calendar, Clock } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { buildGarudaServiceRequestWhatsAppUrl } from '../utils/whatsappFormatter';

export const BookingModal: React.FC = () => {
  const { isOpen, initialService, closeModal } = useQuoteModal();
  const [submitted, setSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);

  // Default appointment date: DD/MM/YYYY
  const getTodayFormatted = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const [formData, setFormData] = useState({
    name: 'Dhana',
    phone: '7799552084',
    appointmentDate: getTodayFormatted(),
    address: 'Tata nagar',
    landmark: 'Tata nagar',
    gpsLocation: '-',
    serviceRequired: 'House Deep Cleaning (2BHK) (₹2999)',
    totalAmount: 'To be confirmed',
    subscriptionClient: 'No',
    priorityTime: '10 am',
    remarks: '-',
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

  // Auto-detect GPS pin into the GPS Location field
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

    const waUrl = buildGarudaServiceRequestWhatsAppUrl({
      appointmentDate: formData.appointmentDate,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      landmark: formData.landmark,
      gpsLocation: formData.gpsLocation,
      serviceRequired: formData.serviceRequired,
      totalAmount: formData.totalAmount,
      subscriptionClient: formData.subscriptionClient,
      priorityTime: formData.priorityTime,
      remarks: formData.remarks,
    });

    window.open(waUrl, '_blank');
  };

  const whatsappInquiryUrl = buildGarudaServiceRequestWhatsAppUrl({
    appointmentDate: formData.appointmentDate,
    name: formData.name,
    phone: formData.phone,
    address: formData.address,
    landmark: formData.landmark,
    gpsLocation: formData.gpsLocation,
    serviceRequired: formData.serviceRequired,
    totalAmount: formData.totalAmount,
    subscriptionClient: formData.subscriptionClient,
    priorityTime: formData.priorityTime,
    remarks: formData.remarks,
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs"
      onClick={closeModal}
    >
      <div
        className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl border-2 border-[#041B3B] max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header: ALWAYS visible, close button pinned at top-right */}
        <div className="sticky top-0 bg-white z-30 px-6 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#E8F8EC] text-[#22AC33] uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Garuda Cleaning Services • Tirupati
            </span>
            <h3 className="text-lg sm:text-xl font-black text-[#041B3B] mt-1 leading-tight">
              New Service Request
            </h3>
          </div>

          <button
            onClick={closeModal}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shrink-0 border border-slate-200 shadow-xs"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#22AC33] flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#041B3B]">
                Service Request Formatted!
              </h3>
              <p className="text-slate-600 text-sm">
                Thank you <strong>{formData.name}</strong>. If WhatsApp did not open automatically, tap below to send your service request to our team:
              </p>

              <div className="pt-3 flex flex-col gap-2.5">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-homecare-green w-full text-xs py-3.5 justify-center font-extrabold shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send Request on WhatsApp
                </a>
                <button
                  onClick={closeModal}
                  className="py-2.5 px-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhana"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 7799552084"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none font-medium"
                  />
                </div>
              </div>

              {/* Appointment Date & Priority Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#22AC33]" />
                    Appointment Date *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/YYYY e.g. 06/09/2026"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#22AC33]" />
                    Priority Time *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 am"
                    value={formData.priorityTime}
                    onChange={(e) => setFormData({ ...formData, priorityTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none font-medium"
                  />
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Service Required *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House Deep Cleaning (2BHK) (₹2999)"
                  value={formData.serviceRequired}
                  onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none font-semibold text-[#041B3B]"
                />
              </div>

              {/* Address & Landmark */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata nagar"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata nagar"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm focus:border-[#22AC33] outline-none font-medium"
                  />
                </div>
              </div>

              {/* GPS Location (Input Field + Auto Detect Button) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#22AC33]" />
                    GPS Location
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={locating}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#22AC33] hover:text-[#1c8f2b] cursor-pointer bg-[#E8F8EC] px-2.5 py-1 rounded-lg border border-[#22AC33]/20 shadow-2xs"
                  >
                    {locating ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Detecting GPS...</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3 h-3 text-[#22AC33]" />
                        <span>Auto-Detect Live GPS</span>
                      </>
                    )}
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="e.g. - or Google Maps URL"
                  value={formData.gpsLocation}
                  onChange={(e) => setFormData({ ...formData, gpsLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium text-slate-700"
                />
              </div>

              {/* Total Amount & Subscription Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    value={formData.totalAmount}
                    onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Subscription Client
                  </label>
                  <select
                    value={formData.subscriptionClient}
                    onChange={(e) => setFormData({ ...formData, subscriptionClient: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium bg-slate-50"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Remarks
                </label>
                <input
                  type="text"
                  placeholder="e.g. -"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="btn-homecare-green w-full text-xs py-3.5 justify-center cursor-pointer shadow-lg font-black"
              >
                <Send className="w-4 h-4 text-[#FFD700]" />
                Submit & Open WhatsApp
              </button>

              <div className="pt-1 text-center">
                <a
                  href={BUSINESS_CONFIG.contact.phoneTel}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#041B3B] hover:text-[#22AC33]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#22AC33]" />
                  Prefer calling directly? +91 77995 52084
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
