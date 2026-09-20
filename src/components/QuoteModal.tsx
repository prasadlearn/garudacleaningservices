import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const QuoteModal: React.FC = () => {
  const { isOpen, initialService, closeModal } = useQuoteModal();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    area: 'Balaji Colony',
    date: '',
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
    if (isOpen) {
      setSubmitted(false);
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappDirectUrl = BUSINESS_CONFIG.buildWhatsAppUrl({
    message: `Hi Garuda Cleaning, I want to book ${formData.service || 'Deep Cleaning'} in ${formData.area}, Tirupati. Name: ${formData.name || 'Customer'}.`,
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs"
      onClick={closeModal}
    >
      <div
        className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B192C]">Booking Requested!</h3>
            <p className="text-slate-600 text-sm">
              We have received your details. Our supervisor will contact you to finalize the appointment time.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Confirm Instantly on WhatsApp
              </a>
              <button
                onClick={closeModal}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-[#0E6B7A] uppercase tracking-wider">
                Garuda Cleaning Services • Tirupati
              </span>
              <h3 className="text-2xl font-extrabold text-[#0B192C] mt-0.5">
                Book a Fast Quote
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Zero hidden fees. Upfront quotation &amp; flexible appointment slots.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Anand"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E6B7A] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 94943 28945"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E6B7A] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Service
                </label>
                <input
                  type="text"
                  value={formData.service || 'Full Home Cleaning'}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E6B7A] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Locality
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#0E6B7A] outline-none"
                >
                  <option value="Balaji Colony">Balaji Colony</option>
                  <option value="AIR Bypass Road">AIR Bypass Road</option>
                  <option value="MR Palli">MR Palli</option>
                  <option value="Renigunta Road">Renigunta Road</option>
                  <option value="Alipiri Area">Alipiri Area</option>
                  <option value="KT Road">KT Road</option>
                  <option value="Chandragiri">Chandragiri</option>
                  <option value="Other">Other Tirupati Location</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0E6B7A] hover:bg-[#0B192C] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
            >
              <Send className="w-4 h-4" />
              Request Quotation Now
            </button>

            <div className="pt-2 border-t border-slate-100 text-center">
              <a
                href={BUSINESS_CONFIG.buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Or Chat with our Tirupati Manager on WhatsApp
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
