import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Full Home Deep Cleaning',
    area: 'Balaji Colony',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappInquiryUrl = BUSINESS_CONFIG.buildWhatsAppUrl({
    message: `Hello Garuda Cleaning, my name is ${formData.name || 'Customer'}. I am interested in ${formData.service} at ${formData.area}, Tirupati.`,
  });

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-[#0E6B7A] text-xs font-bold uppercase tracking-wider mb-3">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight">
                Request a Free On-Site Quote
              </h2>
              <p className="text-slate-600 mt-3 text-base sm:text-lg leading-relaxed">
                Connect directly with our Tirupati team for transparent pricing and slot scheduling.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0E6B7A] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Phone / Hotline</div>
                  <a href={BUSINESS_CONFIG.contact.phoneTel} className="font-bold text-base text-[#0B192C] hover:text-[#0E6B7A]">
                    {BUSINESS_CONFIG.contact.phoneDisplay}
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">Quick booking &amp; direct inquiries</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">WhatsApp Chat</div>
                  <a
                    href={BUSINESS_CONFIG.buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-base text-[#0B192C] hover:text-emerald-600"
                  >
                    Chat Directly on WhatsApp
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">Fastest response time under 10 minutes</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#0EA5E9] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Operations Base</div>
                  <div className="font-bold text-sm text-[#0B192C]">
                    {BUSINESS_CONFIG.contact.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Service Hours</div>
                  <div className="font-bold text-sm text-[#0B192C]">
                    {BUSINESS_CONFIG.contact.operatingHours}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B192C]">Inquiry Received!</h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base">
                    Thank you {formData.name}. Our cleaning coordinator in Tirupati will contact you shortly via phone or WhatsApp.
                  </p>
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs mt-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Speed up via WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-[#0B192C] mb-4">
                    Send Instant Booking Inquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Reddy"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#0E6B7A] focus:ring-1 focus:ring-[#0E6B7A] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#0E6B7A] focus:ring-1 focus:ring-[#0E6B7A] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Required Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#0E6B7A] outline-none"
                      >
                        <option value="1 BHK Deep Cleaning">1 BHK Deep Cleaning</option>
                        <option value="2 BHK Deep Cleaning">2 BHK Deep Cleaning</option>
                        <option value="3 BHK Deep Cleaning">3 BHK Deep Cleaning</option>
                        <option value="4 BHK / Villa Deep Cleaning">4 BHK / Villa Deep Cleaning</option>
                        <option value="Kitchen Deep Cleaning">Kitchen Deep Cleaning</option>
                        <option value="Bathroom Descaling">Bathroom Descaling</option>
                        <option value="Sofa & Carpet Shampooing">Sofa & Carpet Shampooing</option>
                        <option value="Commercial Office Cleaning">Commercial Office Cleaning</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Locality in Tirupati
                      </label>
                      <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#0E6B7A] outline-none"
                      >
                        <option value="Balaji Colony">Balaji Colony</option>
                        <option value="AIR Bypass Road">AIR Bypass Road</option>
                        <option value="MR Palli">MR Palli</option>
                        <option value="Renigunta Road">Renigunta Road</option>
                        <option value="Alipiri & Foothills">Alipiri & Foothills</option>
                        <option value="KT Road">KT Road</option>
                        <option value="Chandragiri">Chandragiri</option>
                        <option value="Tiruchanur">Tiruchanur</option>
                        <option value="Other Area">Other Area in Tirupati</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Notes or Special Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Move-in cleaning, severe hard water marks on tiles..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#0E6B7A] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#0E6B7A] hover:bg-[#0B192C] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    Submit Quotation Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
