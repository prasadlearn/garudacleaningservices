import React, { useState, useMemo } from 'react';
import type { GalleryFilterCategory } from '../data/galleryData';
import {
  BENTO_GALLERY_ITEMS,
  BEFORE_AFTER_ITEMS
} from '../data/galleryData';
import { GalleryHero } from '../components/gallery/GalleryHero';
import { GalleryFilters } from '../components/gallery/GalleryFilters';
import { BeforeAfterSection } from '../components/gallery/BeforeAfterSection';
import { FeaturedBentoGrid } from '../components/gallery/FeaturedBentoGrid';
import { ServicesGalleryGrid } from '../components/gallery/ServicesGalleryGrid';
import { TeamGallerySection } from '../components/gallery/TeamGallerySection';
import { EquipmentSection } from '../components/gallery/EquipmentSection';
import { ProjectProcessSection } from '../components/gallery/ProjectProcessSection';
import { GalleryLightboxModal } from '../components/gallery/GalleryLightboxModal';
import { GalleryCTASection } from '../components/gallery/GalleryCTASection';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryFilterCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered Bento Items
  const filteredBentoItems = useMemo(() => {
    if (activeCategory === 'All') return BENTO_GALLERY_ITEMS;
    return BENTO_GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Filtered Before/After Items
  const filteredBeforeAfterItems = useMemo(() => {
    if (activeCategory === 'All' || activeCategory === 'Before & After') {
      return BEFORE_AFTER_ITEMS;
    }
    return BEFORE_AFTER_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Dynamic Item Counts for Filter Pills
  const countsByCategory = useMemo(() => {
    const counts: Record<GalleryFilterCategory, number> = {
      'All': BENTO_GALLERY_ITEMS.length + BEFORE_AFTER_ITEMS.length,
      'Residential': 0,
      'Commercial': 0,
      'Deep Cleaning': 0,
      'Office Cleaning': 0,
      'Floor & Carpet': 0,
      'Glass Cleaning': 0,
      'Before & After': BEFORE_AFTER_ITEMS.length,
      'Our Team': 4,
      'Equipment': 4
    };

    BENTO_GALLERY_ITEMS.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });

    BEFORE_AFTER_ITEMS.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });

    return counts;
  }, []);

  // Schema.org ImageGallery Structured Data for SEO
  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Garuda Cleaning Services - Project Work Gallery',
    description: 'Before & after cleaning comparisons, project photos, trained team, and equipment in Tirupati, Andhra Pradesh.',
    url: 'https://garudacleaningservices.com/gallery',
    publisher: {
      '@type': 'LocalBusiness',
      name: 'Garuda Cleaning Services',
      telephone: '+917799552084',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tirupati',
        addressRegion: 'Andhra Pradesh',
        postalCode: '517501',
        addressCountry: 'IN'
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* React 19 SEO Metadata */}
      <title>Cleaning Services Gallery in Tirupati | Garuda Cleaning Services</title>
      <meta
        name="description"
        content="Browse verified cleaning results, before & after transformations, and equipment photos from Garuda Cleaning Services in Tirupati."
      />
      <link rel="canonical" href="https://garudacleaningservices.in/gallery" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />

      {/* 1. Hero Banner */}
      <GalleryHero />

      {/* 2. Sticky Category Filter Bar */}
      <GalleryFilters
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        countsByCategory={countsByCategory}
      />

      {/* 3. Main Content Sections based on Active Category */}
      <main className="space-y-0">
        {/* Before & After Section */}
        {(activeCategory === 'All' ||
          activeCategory === 'Before & After' ||
          filteredBeforeAfterItems.length > 0) && (
          <BeforeAfterSection items={filteredBeforeAfterItems} />
        )}

        {/* Bento Grid Section */}
        {(activeCategory === 'All' || filteredBentoItems.length > 0) && (
          <FeaturedBentoGrid
            items={filteredBentoItems}
            onOpenLightbox={(index) => setLightboxIndex(index)}
          />
        )}

        {/* Specialized Services Showcase (Visible in 'All' or specific service tabs) */}
        {activeCategory === 'All' && <ServicesGalleryGrid />}

        {/* Team Showcase */}
        {(activeCategory === 'All' || activeCategory === 'Our Team') && (
          <TeamGallerySection />
        )}

        {/* Equipment & Tools Showcase */}
        {(activeCategory === 'All' || activeCategory === 'Equipment') && (
          <EquipmentSection />
        )}

        {/* 5-Step Process Timeline */}
        {activeCategory === 'All' && <ProjectProcessSection />}

        {/* Bottom Booking CTA */}
        <GalleryCTASection />
      </main>

      {/* Lightbox Modal */}
      <GalleryLightboxModal
        items={filteredBentoItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
};
