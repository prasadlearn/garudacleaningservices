/**
 * TRUST CONFIGURATION (Single source of truth for ratings, statistics, and testimonials)
 * 
 * GROUND RULES:
 * 1. This is a NEW business in Tirupati.
 * 2. Never fabricate review counts, star ratings, or completed project numbers.
 * 3. All unverified figures are set to `null` with TODO_OWNER tags.
 * 4. UI components MUST check if these values exist before displaying them.
 */

export interface TestimonialItem {
  id: string;
  author: string;
  role?: string;
  locality: string;
  rating: number;
  reviewText: string;
  serviceName: string;
  date: string;
}

export interface CommitmentItem {
  id: string;
  title: string;
  description: string;
  ownerConfirmed: boolean;
}

export interface TrustConfig {
  // TODO_OWNER: Set to actual Google Business Profile rating once verified reviews exist. Currently null.
  googleRating: number | null;
  // TODO_OWNER: Set to actual count of verified Google reviews once received. Currently null.
  reviewCount: number | null;
  // TODO_OWNER: Set to verified completed projects count once established. Currently null.
  projectsCompleted: number | null;
  // TODO_OWNER: Provide the direct Google Business Profile review link (e.g. "https://g.page/r/..."). Currently null.
  googleReviewUrl: string | null;

  // Testimonials ship as an empty array until authentic customer reviews are collected.
  testimonials: TestimonialItem[];

  // Verified commitments - only items with ownerConfirmed: true may render in the UI
  commitments: CommitmentItem[];
}

export const TRUST_CONFIG: TrustConfig = {
  // Real Google ratings - will be populated once GBP is live
  googleRating: null, // TODO_OWNER: Enter real rating e.g. 5.0
  reviewCount: null, // TODO_OWNER: Enter count of real reviews e.g. 12
  projectsCompleted: null, // TODO_OWNER: Enter real project milestone count

  // Google review link for the "Be our first review" card
  googleReviewUrl: null, // TODO_OWNER: Paste Google review link here when GBP is active

  // Authentic customer reviews (must remain empty until real reviews exist)
  testimonials: [],

  // Commitments backed strictly by business operations
  commitments: [
    {
      id: 'upfront-pricing',
      title: 'Fixed Upfront Pricing',
      description: 'Clear pricing with zero hidden charges or surprise add-ons before work begins.',
      ownerConfirmed: true, // Backed by businessConfig published rates
    },
    {
      id: 'all-week-availability',
      title: 'Open 7 Days a Week',
      description: 'We work Monday to Sunday, 7:00 AM to 9:00 PM across Tirupati.',
      ownerConfirmed: true, // Backed by businessConfig.contact.operatingHours
    },
    {
      id: 'free-quote',
      title: 'Instant WhatsApp Estimates',
      description: 'Send photos on WhatsApp for quick price estimates and booking.',
      ownerConfirmed: true, // Backed by WhatsApp booking flow
    },
    {
      id: 'satisfaction-inspection',
      title: 'Joint Customer Walkthrough',
      description: 'Post-service room-by-room inspection before the team departs.',
      ownerConfirmed: false, // TODO_OWNER: Confirm if your team conducts a mandatory checklist walkthrough before departure
    },
    {
      id: 'non-toxic-chemicals',
      title: 'Eco-Safe & Acid-Free Chemicals',
      description: 'Zero corrosive muriatic acids. Safe for children, pets, and modern tiles.',
      ownerConfirmed: false, // TODO_OWNER: Confirm exact chemical brands (Taski/Diversey/etc.) used
    },
    {
      id: 'background-verified',
      title: 'Verified Cleaning Specialists',
      description: 'Trained, uniformed, and background-checked staff.',
      ownerConfirmed: false, // TODO_OWNER: Confirm background-check status of all staff
    },
  ],
};

// Helper utilities for UI components to safely check trust metrics
export const hasVerifiedRating = (config: TrustConfig = TRUST_CONFIG): boolean => {
  return typeof config.googleRating === 'number' && config.googleRating > 0 && typeof config.reviewCount === 'number' && config.reviewCount > 0;
};

export const hasVerifiedProjects = (config: TrustConfig = TRUST_CONFIG): boolean => {
  return typeof config.projectsCompleted === 'number' && config.projectsCompleted > 0;
};

export const getConfirmedCommitments = (config: TrustConfig = TRUST_CONFIG): CommitmentItem[] => {
  return config.commitments.filter((c) => c.ownerConfirmed);
};
