import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { FooterSection } from './components/FooterSection';
import { MobileStickyBar } from './components/MobileStickyBar';
import { ScrollToTop } from './components/ScrollToTop';
import { QuoteModalProvider } from './context/QuoteModalContext';
import { BookingModal } from './components/BookingModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';

// Eager load HomePage for instant first contentful paint
import { HomePage } from './pages/HomePage';

// Route-level code splitting for sub-pages
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const ServiceAreaPage = lazy(() => import('./pages/ServiceAreaPage').then(m => ({ default: m.ServiceAreaPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QuoteModalProvider>
        <ScrollToTop />

        <div className="w-full min-h-screen bg-white text-[#0F172A] flex flex-col selection:bg-[#22AC33]/20 selection:text-[#041B3B]">
          <Header />

          <main className="flex-1 w-full pt-[var(--header-h,64px)] pb-[calc(var(--bar-h,60px)+env(safe-area-inset-bottom,0px)+16px)] sm:pb-0">
            <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/service-areas" element={<ServiceAreaPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>

          <FooterSection />
          <MobileStickyBar />
          <ScrollToTopButton />
          <BookingModal />
        </div>
      </QuoteModalProvider>
    </BrowserRouter>
  );
};

export default App;

