import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Sparkles,
  Package,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Building,
  Home,
  Briefcase,
  ShoppingBag,
  ArrowRight,
  Check
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import {
  GARUDA_PRODUCTS,
  PRODUCT_CATEGORIES,
  WHO_WE_SUPPLY_DATA,
  PRODUCT_BENEFITS,
  buildProductWhatsAppUrl,
  type ProductCategoryFilter,
  type ProductItem
} from '../data/productsData';
import { trackEvent } from '../utils/analytics';
import { SafeImage } from '../components/SafeImage';

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryFilter>('All Products');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All Products') return GARUDA_PRODUCTS;
    return GARUDA_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const productsSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Garuda Liquids Wholesale',
    description: 'Wholesale supplier of cleaning liquids, surface cleaners, toilet cleaners, phenyl, dishwash, and laundry products in Tirupati.',
    url: 'https://garudacleaningservices.in/products',
    telephone: '+917799552084',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Garuda Cleaning Services',
      url: 'https://garudacleaningservices.in',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tirupati',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
    areaServed: 'Tirupati and surrounding areas',
    priceRange: '₹₹',
  };

  return (
    <div className="w-full bg-slate-50">
      {/* SEO Meta */}
      <title>Cleaning Products & Wholesale Supplies in Tirupati | Garuda Liquids</title>
      <meta
        name="description"
        content="Garuda Liquids Wholesale in Tirupati supplies quality cleaning liquids, floor cleaners, toilet cleaners, phenyl, dishwash, room fresheners, and laundry detergents for homes and businesses. Enquire for bulk wholesale supply."
      />
      <link rel="canonical" href="https://garudacleaningservices.in/products" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />

      {/* Hero Header */}
      <section className="bg-[#041B3B] text-white pt-12 pb-16 sm:py-20 px-4 sm:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#22AC33] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Garuda Liquids Wholesale • Tirupati</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Garuda Liquids <span className="text-[#22AC33]">Wholesale</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Direct wholesale supplier of quality floor cleaners, toilet cleaners, phenyl, dishwash liquids, and laundry detergents in Tirupati.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={buildProductWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { sourcePage: '/products', context: 'hero' })}
              className="bg-[#22AC33] hover:bg-[#1A8C28] text-white min-h-[48px] px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order on WhatsApp</span>
            </a>

            <a
              href={BUSINESS_CONFIG.contact.phoneTel}
              onClick={() => trackEvent('call_click', { sourcePage: '/products', context: 'hero' })}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 min-h-[48px] px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#22AC33]" />
              <span>Call +91 77995 52084</span>
            </a>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#22AC33]/20 flex items-center justify-center shrink-0 text-[#22AC33]">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-white">Quality Liquids</p>
                <p className="text-[11px] text-slate-300">Clean & effective</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-white">Wholesale Rates</p>
                <p className="text-[11px] text-slate-300">Direct bulk pricing</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-400/20 flex items-center justify-center shrink-0 text-sky-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-white">Local Delivery</p>
                <p className="text-[11px] text-slate-300">Tirupati dispatch</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-400/20 flex items-center justify-center shrink-0 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-white">Continuous Stock</p>
                <p className="text-[11px] text-slate-300">Ready availability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Simple Ordering Workflow */}
      <section className="bg-white py-8 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#041B3B] text-white font-black text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#041B3B]">Pick Your Cleaning Liquids</h4>
                <p className="text-[11px] text-slate-500">Choose from 12 products in standard bottles or 5L cans</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl bg-emerald-50/70 border border-[#22AC33]/30">
              <div className="w-10 h-10 rounded-xl bg-[#22AC33] text-white font-black text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#041B3B]">Tap WhatsApp to Order</h4>
                <p className="text-[11px] text-slate-600">Share your product list, can quantity & Tirupati location</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#041B3B] text-white font-black text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#041B3B]">Prompt Local Delivery</h4>
                <p className="text-[11px] text-slate-500">Fast doorstep delivery or store pickup in Tirupati</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Catalog Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="space-y-3 text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-3 py-1 rounded-full inline-block">
            Product Catalog (12 Liquids & Cleaners)
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
            Our Cleaning Liquids & Wholesale Products
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select a category to filter. Tap any product button to enquire or place an order directly on WhatsApp.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#041B3B] text-white border-[#041B3B] shadow-md'
                    : 'bg-white text-slate-700 hover:text-[#041B3B] hover:bg-slate-100 border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bulk Packaging Box */}
        <div className="mt-12 bg-blue-50/90 border border-blue-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-base sm:text-lg font-black text-[#041B3B] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#2563eb]" />
              <span>Need 5L Cans or Bulk Orders for Business?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We supply floor cleaners, phenyl, toilet cleaners, and dishwash liquids in 5L cans and bulk batches for hotels, offices, hostels, and cleaning contractors.
            </p>
          </div>
          <a
            href={buildProductWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { sourcePage: '/products', context: 'bulk_note' })}
            className="bg-[#22AC33] hover:bg-[#1A8C28] text-white text-xs sm:text-sm font-bold min-h-[44px] px-6 py-2.5 rounded-xl inline-flex items-center gap-2 whitespace-nowrap shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Enquire Bulk Orders</span>
          </a>
        </div>
      </section>

      {/* Who We Supply Section */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-3 py-1 rounded-full inline-block">
              Business & Domestic Supply
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
              Who We Supply in Tirupati
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Reliable cleaning products suited for homes, offices, hotels, and commercial establishments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHO_WE_SUPPLY_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3 hover:border-[#22AC33]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#22AC33] flex items-center justify-center shadow-xs">
                  {item.id === 'homes' && <Home className="w-6 h-6" />}
                  {item.id === 'hospitality' && <Building className="w-6 h-6" />}
                  {item.id === 'offices' && <Briefcase className="w-6 h-6" />}
                  {item.id === 'commercial' && <ShoppingBag className="w-6 h-6" />}
                  {item.id === 'cleaning-services' && <Sparkles className="w-6 h-6" />}
                  {item.id === 'institutions' && <ShieldCheck className="w-6 h-6" />}
                </div>

                <h3 className="text-base font-extrabold text-[#041B3B]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Common Uses
                  </span>
                  <span className="text-xs font-semibold text-slate-700">{item.examples}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Garuda Liquids */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-3 py-1 rounded-full inline-block">
              Why Garuda Liquids Wholesale
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight leading-tight">
              Good Quality, On-Time Supply & Wholesale Rates
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Garuda Liquids Wholesale provides practical and effective cleaning supplies directly to homes and commercial buyers across Tirupati.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#041B3B]">Quick Price Details on WhatsApp</h4>
                  <p className="text-xs text-slate-600">Get product availability, can sizes, and bulk prices quickly on WhatsApp.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#041B3B]">Continuous Stock Availability</h4>
                  <p className="text-xs text-slate-600">Reliable restocking for hotels, hostels, and regular office needs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#041B3B]">Local Tirupati Service</h4>
                  <p className="text-xs text-slate-600">Direct phone and WhatsApp support from local staff in Tirupati.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={buildProductWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { sourcePage: '/products', context: 'why_section' })}
                className="btn-homecare-green text-xs sm:text-sm font-bold min-h-[44px] px-6 py-3 rounded-xl inline-flex items-center gap-2"
              >
                <span>Request Wholesale Price List</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRODUCT_BENEFITS.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2.5 shadow-xs"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-2.5 py-0.5 rounded-full inline-block">
                  {b.highlight}
                </span>
                <h3 className="text-base font-extrabold text-[#041B3B]">{b.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Link: Need Professional Cleaning Services? */}
      <section className="bg-gradient-to-br from-[#041B3B] to-[#0A2E5C] text-white py-14 sm:py-16 px-4 sm:px-8 border-y border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#22AC33] border border-white/10">
              Garuda Cleaning Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Need Professional Cleaning Services Instead?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Looking for a mechanized cleaning crew to deep clean your house, flat, office, water tank, kitchen, or bathroom in Tirupati?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/services"
              className="btn-homecare-green text-xs sm:text-sm min-h-[48px] px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 shadow-lg"
            >
              <span>Explore All 21 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm min-h-[48px] px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 transition-colors"
            >
              <span>View Service Rate Card</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final Wholesale Enquiry Section */}
      <section className="py-14 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto text-center space-y-6">
        <span className="text-xs font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-3.5 py-1 rounded-full inline-block">
          Direct Wholesale Support
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
          Ready to Order Cleaning Liquids in Tirupati?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Message us on WhatsApp or call our team to confirm stock availability, can quantities, and local delivery in Tirupati.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={buildProductWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { sourcePage: '/products', context: 'final_cta' })}
            className="bg-[#22AC33] hover:bg-[#1A8C28] text-white min-h-[48px] px-7 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            onClick={() => trackEvent('call_click', { sourcePage: '/products', context: 'final_cta' })}
            className="bg-white hover:bg-slate-50 text-[#041B3B] border border-slate-300 min-h-[48px] px-7 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4 text-[#22AC33]" />
            <span>Call +91 77995 52084</span>
          </a>
        </div>
      </section>
    </div>
  );
};

// Subcomponent: Individual Product Card
const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  const whatsappUrl = buildProductWhatsAppUrl(product.name);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-200">
      <div className="space-y-4">
        {/* Category Pill & Wholesale Badge */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${product.color.badgeBg} ${product.color.badgeText}`}
          >
            {product.categoryLabel}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            Wholesale
          </span>
        </div>

        {/* Clean Studio Product Image Container */}
        <div className="w-full aspect-square max-h-56 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-3 relative overflow-hidden group shadow-xs">
          <SafeImage
            src={product.image}
            alt={`Garuda ${product.name} Wholesale Tirupati`}
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Title & Tagline */}
        <div className="space-y-0.5">
          <h3 className="text-lg font-black text-[#041B3B] tracking-tight">{product.name}</h3>
          <p className="text-xs font-bold text-[#22AC33]">{product.tagline}</p>
        </div>

        {/* Plain Normal English Description */}
        <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>

        {/* Common Uses Tags */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
            Common Uses:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {product.suitableFor.map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Packaging & Action */}
      <div className="pt-5 mt-5 border-t border-slate-100 space-y-3">
        <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{product.packagingNote}</span>
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { sourcePage: '/products', context: `product_${product.id}` })}
          className="bg-[#22AC33] hover:bg-[#1A8C28] text-white w-full min-h-[44px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Order {product.name} on WhatsApp →</span>
        </a>
      </div>
    </div>
  );
};

export default ProductsPage;
