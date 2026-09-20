import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { FooterSection } from './components/FooterSection';
import { MobileStickyBar } from './components/MobileStickyBar';
import { ScrollToTop } from './components/ScrollToTop';
import { QuoteModalProvider } from './context/QuoteModalContext';
import { BookingModal } from './components/BookingModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ServiceAreaPage } from './pages/ServiceAreaPage';
import { ContactPage } from './pages/ContactPage';
import { PricingPage } from './pages/PricingPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FAQPage } from './pages/FAQPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QuoteModalProvider>
        <ScrollToTop />

        <div className="w-full min-h-screen bg-white text-[#0F172A] flex flex-col selection:bg-[#22AC33]/20 selection:text-[#041B3B]">
          <Header />

          <main className="flex-1 w-full pb-16 sm:pb-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/service-areas" element={<ServiceAreaPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
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
