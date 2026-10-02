import React from 'react';
import { ShoppingBag } from 'lucide-react';
import {
  CleaningLiquidsHero,
  HeroOfferStrip,
  ProductFilters,
  DeliveryNotice,
  ProductGrid,
  BulkOffers,
  WholesaleBanner,
  WholesaleAudienceSection,
  BulkOrderSteps,
  CleaningLiquidsFaq,
  WholesaleCta,
  WholesaleCart,
  useProductFilters,
  useWholesaleCart
} from '../features/cleaning-liquids';

export const CleaningLiquidsPage: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    totalProductsCount,
    resetFilters
  } = useProductFilters();

  const {
    cartItems,
    addItem,
    updateQuantity,
    openDrawer
  } = useWholesaleCart();

  const liquidsSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Garuda Cleaning Liquids & Wholesale Supplies',
    description:
      'Buy cleaning liquids and bulk cleaning supplies in Tirupati for homes, offices, shops, hotels and institutions. View pack prices, bulk offers and enquire on WhatsApp.',
    url: 'https://garudacleaningservices.in/cleaning-liquids',
    telephone: '+917799552084',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Garuda Cleaning Services',
      url: 'https://garudacleaningservices.in'
    },
    areaServed: {
      '@type': 'City',
      name: 'Tirupati'
    },
    priceRange: '₹₹'
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* React 19 SEO Metadata */}
      <title>Cleaning Liquids & Wholesale Supplies in Tirupati | Garuda</title>
      <meta
        name="description"
        content="Cleaning liquids, detergents and wholesale cleaning supplies in Tirupati for homes, businesses, hotels and institutions. View pack prices and enquire on WhatsApp."
      />
      <link rel="canonical" href="https://garudacleaningservices.in/cleaning-liquids" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(liquidsSchema) }}
      />

      {/* 1. Streamlined Hero Section */}
      <CleaningLiquidsHero />

      {/* 2. Trust Value Strip */}
      <HeroOfferStrip />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* 3. Product Catalog Section (Top of Page for instant mobile access) */}
        <section id="catalog" className="space-y-4 sm:space-y-5 scroll-mt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#22AC33] block mb-0.5">
                Tirupati Product Catalog ({totalProductsCount} Liquids)
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#041B3B]">
                Cleaning Liquids & Maintenance Supplies
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium md:max-w-xs">
              Bottle sizes for home use and commercial 5L cans for facility maintenance.
            </p>
          </div>

          <ProductFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <DeliveryNotice variant="compact" />

          {/* Compact 2-Column Mobile Grid with Bottom Sheet Details */}
          <ProductGrid
            products={filteredProducts}
            cartItems={cartItems}
            onAddToCart={addItem}
            onUpdateQuantity={updateQuantity}
            onResetFilters={resetFilters}
          />
        </section>

        {/* 4. Wholesale Promotional Banner */}
        <WholesaleBanner onOpenEnquiryModal={openDrawer} />

        {/* 6. Wholesale Audience Grid */}
        <WholesaleAudienceSection />

        {/* 7. Bulk Order Steps */}
        <BulkOrderSteps />

        {/* 8. FAQ Section */}
        <CleaningLiquidsFaq />

        {/* 9. Conversion Call to Action */}
        <WholesaleCta />
      </main>
    </div>
  );
};
