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
  Check,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  HelpCircle,
  Tag
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import {
  GARUDA_PRODUCTS,
  PRODUCT_CATEGORIES,
  WHO_WE_SUPPLY_DATA,
  PRODUCT_BENEFITS,
  buildWholesaleWhatsAppUrl,
  type ProductCategoryFilter,
  type ProductItem
} from '../data/productsData';
import { trackEvent } from '../utils/analytics';
import { SafeImage } from '../components/SafeImage';

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryFilter>('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<ProductItem | null>(null);
  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Wholesale enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    businessType: 'Apartment / Society',
    selectedProducts: [] as string[],
    packSize: '5L Bulk Cans',
    quantity: '5 to 10 Cans',
    location: '',
    message: ''
  });

  const filteredProducts = useMemo(() => {
    return GARUDA_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.use.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.suitableFor.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenWholesaleEnquiry = (product?: ProductItem) => {
    if (product) {
      setEnquiryForm((prev) => ({
        ...prev,
        selectedProducts: [product.name]
      }));
    }
    setWholesaleModalOpen(true);
  };

  const handleSendWholesaleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('wholesale_enquiry_submit', {
      products: enquiryForm.selectedProducts,
      businessType: enquiryForm.businessType
    });
    const url = buildWholesaleWhatsAppUrl({
      name: enquiryForm.name,
      businessType: enquiryForm.businessType,
      products: enquiryForm.selectedProducts,
      packSize: enquiryForm.packSize,
      quantity: enquiryForm.quantity,
      location: enquiryForm.location,
      message: enquiryForm.message
    });
    window.open(url, '_blank');
    setWholesaleModalOpen(false);
  };

  const faqs = [
    {
      q: 'Do you provide 5-Litre cans for commercial and wholesale buyers?',
      a: 'Yes, our primary wholesale formats include 5L bulk cans for floor cleaners, toilet cleaners, bathroom descalers, phenyl, and dishwash liquids, designed for apartments, hotels, offices, and housekeeping teams in Tirupati.'
    },
    {
      q: 'How can I get the complete wholesale price list in Tirupati?',
      a: 'You can tap "Get Wholesale Price List" or message us directly on WhatsApp (+91 77995 52084). Our team shares current bulk slab rates, packaging sizes, and stock availability instantly.'
    },
    {
      q: 'Is local delivery available across Tirupati for bulk orders?',
      a: 'Yes, we arrange prompt local delivery or pickup points across Tirupati, Renigunta Road, AIR Bypass Road, MR Palli, and surrounding areas.'
    },
    {
      q: 'Can individual households buy cleaning liquids in standard sizes?',
      a: 'Yes, standard 1L and 500ml bottles are available for regular home buyers alongside wholesale 5L cans.'
    }
  ];

  const productsSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Garuda Cleaning Liquids & Wholesale Supplies',
    description:
      'Cleaning liquids and wholesale cleaning supplies for homes, shops, offices, hotels and institutions in Tirupati and surrounding areas. Enquire for prices, pack sizes and bulk orders.',
    url: 'https://garudacleaningservices.in/cleaning-liquids',
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
      <title>Cleaning Liquids & Wholesale Supplies in Tirupati | Garuda</title>
      <meta
        name="description"
        content="Cleaning liquids and wholesale cleaning supplies for homes, shops, offices, hotels and institutions in Tirupati and surrounding areas. Enquire for prices, pack sizes and bulk orders."
      />
      <link rel="canonical" href="https://garudacleaningservices.in/cleaning-liquids" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-[#041B3B] text-white pt-12 pb-16 sm:py-20 px-4 sm:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#22AC33] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Garuda Liquids • Wholesale & Retail Supplies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Cleaning Liquids & <span className="text-[#22AC33]">Wholesale Supplies</span> in Tirupati
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            Cleaning liquids and maintenance products for homes, shops, offices, institutions and bulk buyers in Tirupati and surrounding areas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleOpenWholesaleEnquiry()}
              className="bg-[#22AC33] hover:bg-[#1A8C28] text-white min-h-[48px] px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Tag className="w-4 h-4" />
              <span>Get Wholesale Price List</span>
            </button>

            <a
              href={buildWholesaleWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { sourcePage: '/cleaning-liquids', context: 'hero_whatsapp' })}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 min-h-[48px] px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#22AC33] fill-current" />
              <span>WhatsApp to Order</span>
            </a>
          </div>

          {/* Value Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#22AC33]/20 flex items-center justify-center shrink-0 text-[#22AC33]">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-white">Wholesale Supplies</p>
                <p className="text-[11px] text-slate-300">Commercial & bulk orders</p>
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
                <p className="text-xs font-black text-white">Tirupati Supply</p>
                <p className="text-[11px] text-slate-300">Local delivery / pickup</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-400/20 flex items-center justify-center shrink-0 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-white">Surface-Safe</p>
                <p className="text-[11px] text-slate-300">Proven formulations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Simple Ordering Workflow */}
      <section className="bg-white py-8 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#041B3B] text-white font-black text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#041B3B]">Select Products & Pack Sizes</h4>
                <p className="text-[11px] text-slate-600">Choose from 12 cleaning liquids in 500ml, 1L, or 5L bulk cans.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#E8F8EC] border border-[#22AC33]/30">
              <div className="w-10 h-10 rounded-xl bg-[#22AC33] text-white font-black text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#041B3B]">WhatsApp Your Requirement</h4>
                <p className="text-[11px] text-slate-700">Share your product list, required quantities & Tirupati address.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-[#041B3B] text-white font-black text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#041B3B]">Prompt Local Dispatch</h4>
                <p className="text-[11px] text-slate-600">Fast doorstep delivery or local pickup across Tirupati.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Catalog Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="space-y-3 text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-3 py-1 rounded-full inline-block">
            Catalog ({GARUDA_PRODUCTS.length} Cleaning Liquids)
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
            Explore Cleaning Liquids & Maintenance Supplies
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Search or filter by category. Tap any product to enquire wholesale prices or order directly on WhatsApp.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto space-y-4 mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by liquid name (e.g. Floor Cleaner, Dishwash, Tile)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none bg-white shadow-2xs text-slate-900"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[40px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
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
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-[#041B3B]">No products found matching "{searchQuery}"</h3>
            <p className="text-xs text-slate-500">Try searching for Floor Cleaner, Toilet Cleaner, Phenyl or Dishwash.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Products');
              }}
              className="btn-homecare-green text-xs px-4 py-2 mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEnquire={() => handleOpenWholesaleEnquiry(product)}
                onViewDetails={() => setSelectedProductForModal(product)}
              />
            ))}
          </div>
        )}

        {/* Wholesale Rates Banner */}
        <div className="mt-12 bg-[#E8F8EC] border border-[#22AC33]/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-[#22AC33]">
              <Package className="w-5 h-5 text-[#22AC33]" />
              <span className="text-xs font-black uppercase tracking-wider">Wholesale Supply System</span>
            </div>
            <h3 className="text-lg font-black text-[#041B3B]">
              Need 5L Bulk Cans or Regular Commercial Supplies?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We supply floor cleaners, phenyl, toilet descalers, and dishwash liquids in 5L cans and bulk cartons for hotels, offices, societies, and cleaning contractors in Tirupati.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleOpenWholesaleEnquiry()}
            className="btn-homecare-green text-xs sm:text-sm font-bold min-h-[44px] px-6 py-2.5 rounded-xl inline-flex items-center gap-2 whitespace-nowrap shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Enquire Wholesale Rates</span>
          </button>
        </div>
      </section>

      {/* Wholesale Cleaning Liquids Section */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-3 py-1 rounded-full inline-block">
              Wholesale Cleaning Liquids
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
              Bulk & Wholesale Supplies for Tirupati Businesses
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Bulk and wholesale orders are available for businesses and institutions across Tirupati and surrounding areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHO_WE_SUPPLY_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3 hover:border-[#22AC33]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#22AC33] flex items-center justify-center shadow-xs">
                  {item.id === 'apartments' && <Home className="w-6 h-6" />}
                  {item.id === 'hospitality' && <Building className="w-6 h-6" />}
                  {item.id === 'offices' && <Briefcase className="w-6 h-6" />}
                  {item.id === 'shops' && <ShoppingBag className="w-6 h-6" />}
                  {item.id === 'contractors' && <Sparkles className="w-6 h-6" />}
                  {item.id === 'schools' && <ShieldCheck className="w-6 h-6" />}
                </div>

                <h3 className="text-base font-extrabold text-[#041B3B]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Ideal For
                  </span>
                  <span className="text-xs font-semibold text-slate-700">{item.examples}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Businesses Order Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-3 py-1 rounded-full inline-block">
              Why Businesses Order Cleaning Liquids
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight leading-tight">
              Quality Formulations & Direct Local Supply
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We provide practical, effective cleaning products directly to businesses, institutions, and bulk buyers in Tirupati.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#041B3B]">Wholesale Pricing Available on Request</h4>
                  <p className="text-xs text-slate-600">Request current wholesale price list and bulk rates directly on WhatsApp.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#041B3B]">Ready 5L Bulk Packaging</h4>
                  <p className="text-xs text-slate-600">Heavy-duty cans suited for daily commercial mopping and housekeeping teams.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8F8EC] text-[#22AC33] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#041B3B]">Local Tirupati Assistance</h4>
                  <p className="text-xs text-slate-600">Quick WhatsApp response and local dispatch coordination in Tirupati.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => handleOpenWholesaleEnquiry()}
                className="btn-homecare-green text-xs sm:text-sm font-bold min-h-[44px] px-6 py-3 rounded-xl inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request Current Price List</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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

      {/* Frequently Asked Questions */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-8 border-y border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-3 py-1 rounded-full inline-block">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#041B3B] tracking-tight">
              Cleaning Liquids & Wholesale FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#041B3B] cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#22AC33] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Sell: Cleaning Services */}
      <section className="bg-gradient-to-br from-[#041B3B] to-[#0A2E5C] text-white py-14 sm:py-16 px-4 sm:px-8 border-y border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#22AC33] border border-white/10">
              Garuda Cleaning Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Need Professional Mechanized Cleaning Services?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We also provide trained cleaning crews for apartments, villas, offices, water tanks, kitchens, and washrooms in Tirupati with upfront pricing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/services"
              className="btn-homecare-green text-xs sm:text-sm min-h-[48px] px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 shadow-lg"
            >
              <span>Explore All 19 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm min-h-[48px] px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 transition-colors"
            >
              <span>View Rate Card</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final WhatsApp / Call CTA */}
      <section className="py-14 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto text-center space-y-6">
        <span className="text-xs font-black uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-3.5 py-1 rounded-full inline-block">
          Direct Wholesale Support
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-[#041B3B] tracking-tight">
          Ready to Order Cleaning Liquids in Tirupati?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Message us on WhatsApp or call our team to confirm current price list, pack quantities, and delivery schedules in Tirupati.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={buildWholesaleWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { sourcePage: '/cleaning-liquids', context: 'final_cta' })}
            className="bg-[#22AC33] hover:bg-[#1A8C28] text-white min-h-[48px] px-7 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={BUSINESS_CONFIG.contact.phoneTel}
            onClick={() => trackEvent('call_click', { sourcePage: '/cleaning-liquids', context: 'final_cta' })}
            className="bg-white hover:bg-slate-50 text-[#041B3B] border border-slate-300 min-h-[48px] px-7 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4 text-[#22AC33]" />
            <span>Call +91 77995 52084</span>
          </a>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProductForModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setSelectedProductForModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0">
                <SafeImage
                  src={selectedProductForModal.image}
                  alt={selectedProductForModal.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-2 py-0.5 rounded-full">
                  {selectedProductForModal.categoryLabel}
                </span>
                <h3 className="text-lg font-black text-[#041B3B] mt-1">
                  {selectedProductForModal.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedProductForModal.availability}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div>
                <span className="font-bold text-[#041B3B] block mb-0.5">Description & Use:</span>
                <p className="text-slate-600 leading-relaxed">{selectedProductForModal.shortDescription}</p>
                <p className="text-slate-600 mt-1">{selectedProductForModal.use}</p>
              </div>

              <div>
                <span className="font-bold text-[#041B3B] block mb-1">Available Pack Sizes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProductForModal.packSizes.map((size, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-lg text-xs"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-[#041B3B] block mb-1">Recommended For:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProductForModal.suitableFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Wholesale Pricing</span>
                  <span className="text-xs font-bold text-[#22AC33]">
                    {selectedProductForModal.wholesalePrice || 'Wholesale Price on Request'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Tirupati Local Delivery</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href={buildWholesaleWhatsAppUrl({ products: [selectedProductForModal.name] })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-homecare-green flex-1 h-11 text-xs sm:text-sm font-bold justify-center flex items-center gap-2 rounded-xl"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  const prod = selectedProductForModal;
                  setSelectedProductForModal(null);
                  handleOpenWholesaleEnquiry(prod);
                }}
                className="bg-[#041B3B] hover:bg-[#062c5e] text-white px-4 h-11 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Bulk Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wholesale Custom Enquiry Modal */}
      {wholesaleModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          onClick={() => setWholesaleModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setWholesaleModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#22AC33] bg-[#E8F8EC] px-2 py-0.5 rounded-full">
                Tirupati Wholesale Supplies
              </span>
              <h3 className="text-xl font-black text-[#041B3B] mt-1">
                Wholesale Price List & Bulk Order Request
              </h3>
              <p className="text-xs text-slate-600">
                Submit your requirement to receive our latest wholesale price catalog via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSendWholesaleWhatsApp} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Your Name / Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Business / Requirement Type *
                </label>
                <select
                  value={enquiryForm.businessType}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, businessType: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-semibold text-[#041B3B] bg-white"
                >
                  <option value="Apartment / Residential Society">Apartment / Residential Society</option>
                  <option value="Hotel / Guest House / Lodge">Hotel / Guest House / Lodge</option>
                  <option value="Office / Corporate Workspace">Office / Corporate Workspace</option>
                  <option value="Shop / Supermarket / Showroom">Shop / Supermarket / Showroom</option>
                  <option value="School / Educational Institution">School / Educational Institution</option>
                  <option value="Cleaning Contractor / Housekeeping Vendor">Cleaning Contractor / Housekeeping Vendor</option>
                  <option value="Individual Home Buyer">Individual Home Buyer</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Preferred Pack Size
                </label>
                <select
                  value={enquiryForm.packSize}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, packSize: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium text-slate-900 bg-white"
                >
                  <option value="Wholesale Bulk Cans">Wholesale Bulk Quantities</option>
                  <option value="Retail Pack / Bottles">Standard Retail Bottles</option>
                  <option value="Assorted / Full Product Range">Assorted / Full Product Range</option>
                  <option value="Custom Requirement">Custom Requirement / Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Approximate Quantity
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 to 10 Cans, or Monthly Supply"
                  value={enquiryForm.quantity}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, quantity: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Location in Tirupati *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MR Palli, Balaji Colony, Renigunta Rd"
                  value={enquiryForm.location}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, location: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Specific Products / Message
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need Floor Cleaner, Phenyl & Dishwash rates"
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#22AC33] outline-none font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-homecare-green w-full h-11 text-xs sm:text-sm font-bold justify-center flex items-center gap-2 rounded-xl cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry to WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Subcomponent: Individual Product Card
const ProductCard: React.FC<{
  product: ProductItem;
  onEnquire: () => void;
  onViewDetails: () => void;
}> = ({ product, onEnquire, onViewDetails }) => {
  const directWhatsAppUrl = buildWholesaleWhatsAppUrl({
    products: [product.name],
    packSize: product.packSizes[0] || '5L Can'
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-200 group">
      <div className="space-y-4">
        {/* Category Pill & Wholesale Badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {product.categoryLabel}
          </span>
          <span className="text-[11px] font-bold text-[#22AC33] bg-[#E8F8EC] px-2 py-0.5 rounded-md">
            Wholesale
          </span>
        </div>

        {/* Clean Product Image Container */}
        <div
          onClick={onViewDetails}
          className="w-full aspect-square max-h-52 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 relative overflow-hidden cursor-pointer"
        >
          <SafeImage
            src={product.image}
            alt={`Garuda ${product.name} Wholesale Tirupati`}
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Title & Short Practical Use */}
        <div className="space-y-1">
          <h3
            onClick={onViewDetails}
            className="text-lg font-black text-[#041B3B] tracking-tight hover:text-[#22AC33] cursor-pointer transition-colors"
          >
            {product.name}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {product.use}
          </p>
        </div>

        {/* Pack Sizes */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
            Available Pack Sizes:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {product.packSizes.map((size, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Price Area */}
        <div className="pt-2">
          <div className="text-xs font-bold text-slate-600">
            Price: <span className="text-[#22AC33] font-black">{product.wholesalePrice || 'Wholesale Price on Request'}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { sourcePage: '/cleaning-liquids', context: `card_${product.id}` })}
          className="bg-[#22AC33] hover:bg-[#1A8C28] text-white flex-1 min-h-[42px] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp to Order</span>
        </a>

        <button
          type="button"
          onClick={onViewDetails}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
