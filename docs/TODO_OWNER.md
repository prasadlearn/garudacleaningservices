# Garuda Cleaning Services – Owner Verification Checklist (TODO_OWNER)

This document tracks all items requiring verification or input from the business owner before production launch.

---

## 1. Business & Service Area Verification
- [ ] **PIN Codes & Landmarks**: Verify exact postal codes and landmark boundaries in `src/config/businessConfig.ts` (`serviceAreasVerified`).
- [ ] **Operating Hours Confirmation**: Confirm exact operating hours: `Monday – Sunday: 7:00 AM – 9:00 PM`.
- [ ] **Official Contact Number**: Confirm primary phone line (`+91 77995 52084`) and WhatsApp routing.

---

## 2. Real Customer Photos & Project Gallery
- [ ] **Replace Illustrative Gallery Photos**: Capture genuine before/after photos of Tirupati cleaning jobs using `npm run gallery:add`.
  - [ ] BHK Deep Cleaning
  - [ ] Villa Deep Cleaning
  - [ ] Kitchen Deep Cleaning
  - [ ] Bathroom Deep Cleaning
  - [ ] Sofa Shampooing & Extraction
  - [ ] Water Tank / Sump Cleaning
  - [ ] Floor Scrubbing & Marble Polishing
  - [ ] Commercial & Office Deep Cleaning
- [ ] **Set Production Flag**: Ensure `VITE_SHOW_ILLUSTRATIVE=false` in production hosting environment variables to show only verified customer jobs.

---

## 3. Ratings & Testimonials
- [ ] **Google Business Profile URL**: Once published on Google Maps, paste the live profile review link into `src/config/trustConfig.ts` (`googleReviewUrl`).
- [ ] **Customer Testimonials**: Add real client quotes and verified ratings into `src/config/trustConfig.ts` (`testimonials` array).

---

## 4. Legal & Billing Details
- [ ] **GST Number (if registered)**: Provide GSTIN and registered business legal entity name for invoices and footer disclosure.
- [ ] **Terms of Service & Privacy Policy**: Review standard terms for residential on-site services.
