import React from 'react';
import { Hero } from '../components/Hero';
import { IntroSection } from '../components/IntroSection';
import { StatsCounter } from '../components/StatsCounter';
import { ServiceCircles } from '../components/ServiceCircles';
import { TeamAboutSection } from '../components/TeamAboutSection';
import { MarqueeText } from '../components/MarqueeText';
import { TrustedExpertsCards } from '../components/TrustedExpertsCards';
import { ChooseAndBookSection } from '../components/ChooseAndBookSection';
import { ComboOffersSection } from '../components/ComboOffersSection';
import { HomeLiquidsSection } from '../components/HomeLiquidsSection';
import { TeamInActionSection } from '../components/TeamInActionSection';
import { WorkProcessSection } from '../components/WorkProcessSection';
import { CustomerFeedbackSection } from '../components/CustomerFeedbackSection';
import { BeforeAfterStrip } from '../components/BeforeAfterStrip';
import { BenefitsSection } from '../components/BenefitsSection';
import { FAQAccordionSection } from '../components/FAQAccordionSection';

export const HomePage: React.FC = () => {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://garudacleaningservices.in/#organization',
    name: 'Garuda Cleaning Services',
    alternateName: 'Garuda Cleaning Services Tirupati',
    url: 'https://garudacleaningservices.in/',
    logo: 'https://garudacleaningservices.in/icon-512.png',
    image: 'https://garudacleaningservices.in/images/services/home-cleaning.webp',
    telephone: '+917799552084',
    email: 'garudacleaningservices1@gmail.com',
    priceRange: '₹99 - ₹4999',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '08:00',
      closes: '20:00'
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Tirupati' },
      { '@type': 'AdministrativeArea', name: 'Renigunta' },
      { '@type': 'AdministrativeArea', name: 'Chandragiri' },
      { '@type': 'AdministrativeArea', name: 'Tiruchanur' },
      { '@type': 'AdministrativeArea', name: 'Balaji Colony' },
      { '@type': 'AdministrativeArea', name: 'Bhavani Nagar' },
      { '@type': 'AdministrativeArea', name: 'AIR Bypass Road' },
      { '@type': 'AdministrativeArea', name: 'MR Palli' }
    ],
    keywords: 'cleaning services near me, house cleaning near me, sofa cleaning near me, washroom cleaning near me, hard surface cleaning near me, home cleaning services in Tirupati',
    knowsAbout: [
      'Home Cleaning',
      'Apartment BHK Cleaning',
      'Washroom Acid-Free Descaling',
      'Fabric Sofa Shampooing & Extraction',
      'Hard-Surface Floor Cleaning',
      'Kitchen Platform Degreasing',
      'Office Cleaning',
      'Overhead Water Tank & Sump Cleaning',
      'Pest Control Services',
      'Fridge Cleaning',
      'Cleaning Liquids & Wholesale Supplies'
    ]
  };

  return (
    <div className="w-full">
      {/* React 19 Head Hoisting */}
      <title>Garuda Cleaning Services | Cleaning Services in Tirupati</title>
      <meta name="description" content="Garuda Cleaning Services provides professional residential & commercial cleaning in Tirupati. Upfront pricing, dedicated teams, and reliable service. Book online or call for a quote." />
      <link rel="canonical" href="https://garudacleaningservices.in/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      {/* 1. Hero with cleaner on couch */}
      <Hero />

      {/* 2. Intro section with line illustration */}
      <IntroSection />

      {/* 3. Stats row (auto-hides when unverified) */}
      <StatsCounter />

      {/* 4. Circular Service categories carousel */}
      <ServiceCircles />

      {/* 5. Team with machines photo + About Us */}
      <TeamAboutSection />

      {/* 6. Running Marquee banner */}
      <MarqueeText />

      {/* 7. Trusted Commitments cards */}
      <TrustedExpertsCards />

      {/* 8. Choose and Book 8 BHK/Service cards (2 rows of 4) */}
      <ChooseAndBookSection />

      {/* 9. Mint green Combo Offers table */}
      <ComboOffersSection />

      {/* 10. Direct Wholesale Cleaning Liquids & Supplies Showcase */}
      <HomeLiquidsSection />

      {/* 11. See Our Cleaning Teams in Action */}
      <TeamInActionSection />

      {/* 11. How Our Cleaning Services Works (4 steps) */}
      <WorkProcessSection />

      {/* 12. Customer Feedback (renders only when 3+ real reviews exist) */}
      <CustomerFeedbackSection />

      {/* 13. Transformations & Completed Work */}
      <BeforeAfterStrip />

      {/* 14. Benefits of Professional Cleaning in Tirupati (6 cards) */}
      <BenefitsSection />

      {/* 15. FAQ with cleaner photo on left */}
      <FAQAccordionSection />
    </div>
  );
};
