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
import { TeamInActionSection } from '../components/TeamInActionSection';
import { WorkProcessSection } from '../components/WorkProcessSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { HappySmilesSection } from '../components/HappySmilesSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { FAQAccordionSection } from '../components/FAQAccordionSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Hero with cleaner on couch + No. 1 splat badge */}
      <Hero />

      {/* 2. Intro section with line illustration */}
      <IntroSection />

      {/* 3. Mint green stats row (450+ Happy Customers, etc.) */}
      <StatsCounter />

      {/* 4. Circular Service categories carousel */}
      <ServiceCircles />

      {/* 5. Team with machines photo + 4.8★ yellow badge + About Us */}
      <TeamAboutSection />

      {/* 6. Running Marquee banner */}
      <MarqueeText />

      {/* 7. 3 Trusted Experts cards with dark image overlays */}
      <TrustedExpertsCards />

      {/* 8. Choose and Book 8 BHK/Service cards (2 rows of 4) */}
      <ChooseAndBookSection />

      {/* 9. Mint green Combo Offers table (Combo 01, 02, 03) */}
      <ComboOffersSection />

      {/* 10. See Our Cleaning Teams in Action (Video/Photo filmstrip) */}
      <TeamInActionSection />

      {/* 11. How Our Cleaning Services Works (4 steps) */}
      <WorkProcessSection />

      {/* 12. Customer Reviews with Google 4.8★ badge */}
      <ReviewsSection />

      {/* 13. A Precious Smile to see After the Cleaned (4 vertical photos) */}
      <HappySmilesSection />

      {/* 14. Benefits of Professional Cleaning in Tirupati (6 cards) */}
      <BenefitsSection />

      {/* 15. FAQ with cleaner photo on left */}
      <FAQAccordionSection />
    </div>
  );
};
