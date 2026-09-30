import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  CheckCircle, 
  Phone, 
  MapPin, 
  Sparkles, 
  Loader2, 
  Calendar, 
  Clock, 
  Plus, 
  Check, 
  ChevronRight, 
  Search, 
  Home, 
  Layers, 
  Info,
  ShieldCheck,
  User,
  Smartphone,
  Trash2
} from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { buildGarudaServiceRequestWhatsAppUrl } from '../utils/whatsappFormatter';
import { SERVICES_DATA, formatPrice } from '../data/servicesData';
import { trackEvent } from '../utils/analytics';
import { ServiceIcon } from './ServiceIcon';

export const BookingModal: React.FC = () => {
  const { isOpen, initialService, closeModal } = useQuoteModal();
  const [submitted, setSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

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

  // Multi-service selection states (starts empty by default so user chooses freely)
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [homeCleaningBhk, setHomeCleaningBhk] = useState<string>('');
  const [showServicePicker, setShowServicePicker] = useState<boolean>(false);
  const [serviceSearchQuery, setServiceSearchQuery] = useState<string>('');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<'all' | 'residential' | 'specialized' | 'commercial'>('all');
  const [serviceError, setServiceError] = useState<string>('');

  const TIME_SLOTS = [
    'Preferred Time: 08:00 AM - 11:00 AM (Early Morning)',
    'Preferred Time: 10:00 AM - 01:00 PM (Morning Slot)',
    'Preferred Time: 01:00 PM - 04:00 PM (Afternoon Slot)',
    'Preferred Time: 04:00 PM - 07:00 PM (Evening Slot)',
    'Urgent Booking (Today / ASAP)',
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    appointmentDate: getTodayIso(),
    address: '',
    landmark: '',
    gpsLocation: '-',
    totalAmount: 'To be confirmed after inspection',
    subscriptionClient: 'No',
    priorityTime: 'Preferred Time: 10:00 AM - 01:00 PM (Morning Slot)',
    remarks: '',
  });

  // Prevent background scrolling and handle Escape key while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showServicePicker) {
          setShowServicePicker(false);
        } else {
          closeModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, showServicePicker, closeModal]);

  // Sync initial service from context (or start empty if generic booking)
  useEffect(() => {
    if (initialService) {
      const match = initialService.match(/^(.*?)(?:\s*\((.*?)\))?$/);
      const serviceName = match && match[1] ? match[1].trim() : initialService.trim();
      const tierName = match && match[2] ? match[2].trim() : '';

      const matchedService = SERVICES_DATA.find(
        (s) => s.title.toLowerCase() === serviceName.toLowerCase() || s.name.toLowerCase() === serviceName.toLowerCase()
      );

      if (matchedService) {
        setSelectedServices([matchedService.title]);
        setHomeCleaningBhk(matchedService.slug === 'home-cleaning' && tierName ? tierName : '');
      } else if (serviceName) {
        setSelectedServices([serviceName]);
        setHomeCleaningBhk(tierName || '');
      }
    } else {
      setSelectedServices([]);
      setHomeCleaningBhk('');
    }

    if (isOpen) {
      setSubmitted(false);
      setLocating(false);
      setServiceError('');
      setShowServicePicker(false);
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

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

    if (selectedServices.length === 0) {
      setServiceError('Please select at least one service to proceed.');
      setShowServicePicker(true);
      return;
    }

    if (selectedServices.includes('Home Cleaning') && !homeCleaningBhk) {
      setServiceError('Please select your Home Cleaning apartment size (1 BHK, 2 BHK, 3 BHK, or 4+ BHK).');
      return;
    }

    const finalServicesList = selectedServices.map((title) => {
      if (title === 'Home Cleaning') {
        return homeCleaningBhk ? `Home Cleaning (${homeCleaningBhk})` : 'Home Cleaning';
      }
      return title;
    });

    setSubmitted(true);
    trackEvent('book_click', {
      services: finalServicesList,
      serviceCount: finalServicesList.length,
      sourcePage: 'booking_modal'
    });

    const waUrl = buildGarudaServiceRequestWhatsAppUrl({
      appointmentDate: formatDateForWhatsApp(formData.appointmentDate),
      name: formData.name,
      phone: formData.phone,
      address: formData.address || 'Tirupati',
      landmark: formData.landmark,
      gpsLocation: formData.gpsLocation,
      serviceRequired: finalServicesList,
      totalAmount: formData.totalAmount,
      subscriptionClient: formData.subscriptionClient,
      priorityTime: formData.priorityTime,
      remarks: formData.remarks || '-',
    });

    window.open(waUrl, '_blank');
  };

  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchesCategory = serviceCategoryFilter === 'all' || s.category === serviceCategoryFilter;
    const matchesSearch = !serviceSearchQuery.trim() || s.title.toLowerCase().includes(serviceSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Schedule Cleaning Appointment"
      className="fixed inset-0 z-[var(--z-modal)] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xs overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div
        ref={modalContentRef}
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[94vh] sm:h-auto sm:max-h-[90vh] animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200"
      >
        {/* HEADER */}
        <div className="bg-[#041B3B] text-white px-4 py-3 sm:px-6 sm:py-4 relative shrink-0 border-b border-white/10 shadow-sm">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeModal}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#22AC33] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#22AC33]">
              Tirupati & Surroundings
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black tracking-tight !text-white leading-tight">
            Schedule Cleaning Appointment
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
            Multi-service booking • Direct WhatsApp confirmation
          </p>
        </div>

        {/* BODY CONTENT */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-5 relative bg-white">
          {/* SUB-VIEW: FULL-PAGE SERVICE PICKER */}
          {showServicePicker ? (
            <div className="space-y-3 pb-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-[#041B3B]">Select Services</h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {selectedServices.length} {selectedServices.length === 1 ? 'service' : 'services'} selected
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedServices.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllServices}
                      className="text-slate-500 hover:text-red-600 text-xs font-bold px-2 py-1 cursor-pointer"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowServicePicker(false)}
                    className="bg-[#22AC33] hover:bg-[#1A8C28] text-white py-1.5 px-3.5 text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-2xs"
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
                  placeholder="Search services (e.g. Sofa, Kitchen, Tank)..."
                  value={serviceSearchQuery}
                  onChange={(e) => setServiceSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-[#22AC33] outline-none bg-slate-50 text-slate-900 font-medium"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 text-[11px] overflow-x-auto pb-1 scrollbar-none">
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
                    className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-colors cursor-pointer text-xs ${
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
              <div className="space-y-1.5 pt-1">
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
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#22AC33] text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <ServiceIcon slug={srv.slug} name={srv.icon} className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold block truncate text-[#041B3B]">{srv.title}</span>
                          <span className="text-[10px] text-slate-500 block font-semibold">{formatPrice(srv.price)}</span>
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

              <div className="pt-2 sticky bottom-0 bg-white/95 backdrop-blur-xs pb-1">
                <button
                  type="button"
                  onClick={() => setShowServicePicker(false)}
                  className="btn-homecare-green w-full h-11 text-xs sm:text-sm font-bold justify-center flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Selected Services ({selectedServices.length})</span>
                </button>
              </div>
            </div>
          ) : submitted ? (
            /* SUCCESS VIEW */
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-[#22AC33] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-black text-[#041B3B]">
                Request Sent via WhatsApp!
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto">
                Thank you! Our Tirupati coordinator has received your request and will confirm your timing and estimate shortly.
              </p>
              <div className="pt-3 flex justify-center">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-homecare-navy px-8 py-2.5 min-h-[42px] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* MAIN FORM VIEW */
            <form id="booking-form-modal" onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="modal-name" className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="modal-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 pl-8.5 pr-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium text-slate-900 bg-slate-50/60"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Smartphone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="modal-phone"
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-10 pl-8.5 pr-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium text-slate-900 bg-slate-50/60"
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Date & Preferred Time */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <div>
                  <label htmlFor="modal-date" className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1 flex items-center gap-1 truncate">
                    <Calendar className="w-3 h-3 text-[#22AC33] shrink-0" />
                    <span>Date *</span>
                  </label>
                  <input
                    id="modal-date"
                    type="date"
                    required
                    min={getTodayIso()}
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full h-10 px-2 sm:px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="modal-time" className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1 flex items-center gap-1 truncate">
                    <Clock className="w-3 h-3 text-[#22AC33] shrink-0" />
                    <span>Time Slot *</span>
                  </label>
                  <select
                    id="modal-time"
                    value={formData.priorityTime}
                    onChange={(e) => setFormData({ ...formData, priorityTime: e.target.value })}
                    className="w-full h-10 px-2 sm:px-3 rounded-xl border border-slate-200 text-[11px] sm:text-xs focus:border-[#22AC33] outline-none font-semibold text-[#041B3B] bg-white truncate"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* MULTI-SERVICE SELECTION CARD */}
              <div className="p-3 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#22AC33]" />
                    <span className="text-[11px] font-extrabold text-[#041B3B] uppercase tracking-wider">
                      {selectedServices.length > 0
                        ? `Selected Services (${selectedServices.length})`
                        : 'Services Required *'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedServices.length > 0 && (
                      <button
                        type="button"
                        onClick={clearAllServices}
                        className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowServicePicker(true)}
                      className="text-[11px] font-bold text-[#22AC33] hover:text-[#1c8f2b] flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs hover:border-[#22AC33]/40 active:scale-95 transition-all"
                    >
                      <span>{selectedServices.length > 0 ? '+ Add / Change' : 'Select Services'}</span>
                      <ChevronRight className="w-3 h-3" />
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
                    className="w-full py-3 px-3.5 rounded-xl bg-white hover:bg-[#E8F8EC] border-2 border-dashed border-[#22AC33]/50 text-[#041B3B] flex items-center justify-between transition-all cursor-pointer shadow-2xs group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#22AC33] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-black block text-[#041B3B]">Select Services</span>
                        <span className="text-[10px] text-slate-500 font-medium block">Choose 1 or more from 19 services</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#22AC33]">
                      <span>Choose</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ) : (
                  /* Selected Service Chips */
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {selectedServices.map((srvTitle) => (
                      <span
                        key={srvTitle}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-[#E8F8EC] text-[#041B3B] border border-[#22AC33]/40 px-2.5 py-1 rounded-lg shadow-2xs"
                      >
                        <span className="truncate max-w-[170px] sm:max-w-none">{srvTitle}</span>
                        <button
                          type="button"
                          onClick={() => removeService(srvTitle)}
                          className="w-3.5 h-3.5 rounded-full hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-slate-400"
                          title={`Remove ${srvTitle}`}
                          aria-label={`Remove ${srvTitle}`}
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Home Cleaning BHK Size Segment (ONLY IF Home Cleaning is selected) */}
                {selectedServices.includes('Home Cleaning') && (
                  <div className="pt-2.5 border-t border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                        Select Apartment Size: {homeCleaningBhk ? <span className="text-[#22AC33] font-black">({homeCleaningBhk})</span> : <span className="text-amber-600 font-semibold">(Choose your size)</span>}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: '1 BHK', rate: '₹2,399' },
                        { label: '2 BHK', rate: '₹3,299' },
                        { label: '3 BHK', rate: '₹4,999' },
                        { label: '4+ BHK', rate: 'Quote' }
                      ].map((tier) => {
                        const isSelected = homeCleaningBhk === tier.label;
                        return (
                          <button
                            key={tier.label}
                            type="button"
                            onClick={() => {
                              setServiceError('');
                              setHomeCleaningBhk(tier.label);
                            }}
                            className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#22AC33] text-white border-[#22AC33] shadow-xs font-black ring-2 ring-[#22AC33]/30'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-[#22AC33]/50 hover:bg-slate-50 font-semibold'
                            }`}
                          >
                            <div className="text-[11px] font-bold leading-tight truncate">{tier.label}</div>
                            <div className={`text-[10px] leading-tight truncate whitespace-nowrap mt-0.5 ${isSelected ? 'text-white/95' : 'text-slate-500'}`}>
                              {tier.rate}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Address & Landmark */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="modal-address" className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Address / Area in Tirupati *
                  </label>
                  <input
                    id="modal-address"
                    type="text"
                    required
                    autoComplete="street-address"
                    placeholder="e.g. Balaji Colony, AIR Bypass Rd"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium text-slate-900 bg-slate-50/60"
                  />
                </div>

                <div>
                  <label htmlFor="modal-landmark" className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    id="modal-landmark"
                    type="text"
                    placeholder="e.g. Near Ramanuja Circle"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium text-slate-900 bg-slate-50/60"
                  />
                </div>
              </div>

              {/* GPS Location Auto Detect */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="modal-gps" className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#22AC33]" />
                    <span>GPS Location (Optional)</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={locating}
                    className="h-6.5 inline-flex items-center gap-1 text-[10px] font-bold text-[#22AC33] hover:text-[#1c8f2b] cursor-pointer bg-[#E8F8EC] px-2.5 rounded-lg border border-[#22AC33]/25 active:scale-95 transition-all"
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
                  placeholder="Auto-detected or paste Google Maps pin link"
                  value={formData.gpsLocation}
                  onChange={(e) => setFormData({ ...formData, gpsLocation: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#22AC33] outline-none font-mono text-slate-600 bg-slate-50"
                />
              </div>

              {/* Special Notes */}
              <div>
                <label htmlFor="modal-remarks" className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Special Notes / Specific Focus (Optional)
                </label>
                <input
                  id="modal-remarks"
                  type="text"
                  placeholder="e.g. Focus on kitchen grease, bathroom scale..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 text-xs focus:border-[#22AC33] outline-none font-medium text-slate-900 bg-slate-50/60"
                />
              </div>
            </form>
          )}
        </div>

        {/* STICKY BOTTOM ACTION BAR */}
        {!showServicePicker && !submitted && (
          <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200/90 shrink-0 flex flex-col gap-1.5 shadow-md">
            <button
              type="submit"
              form="booking-form-modal"
              className="btn-homecare-green w-full h-11 text-xs sm:text-sm font-bold justify-center flex items-center gap-2 cursor-pointer shadow-md rounded-xl"
            >
              <Send className="w-4 h-4" />
              <span>Send Booking to WhatsApp</span>
            </button>

            <div className="text-center">
              <a
                href={BUSINESS_CONFIG.contact.phoneTel}
                className="text-[11px] font-bold text-slate-600 hover:text-[#22AC33] inline-flex items-center justify-center gap-1 py-0.5"
              >
                <Phone className="w-3 h-3 text-[#22AC33]" />
                <span>Or Call Coordinator: {BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
