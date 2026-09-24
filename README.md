# Garuda Cleaning Services – Web Application

Professional website for **Garuda Cleaning Services**, a local residential, commercial, and mechanized cleaning business based in **Tirupati, Andhra Pradesh, India**.

Built with **React 19**, **Vite 6**, **TypeScript**, **Tailwind CSS 4**, and **React Router 7**.

---

## 1. Local Development & Build

### Prerequisites
- Node.js 20+ installed
- npm 10+ installed

### Commands
```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run oxlint linter
npm run lint

# Type check with TypeScript compiler
npx tsc -b

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 2. Business Configuration (`src/config/businessConfig.ts`)

`src/config/businessConfig.ts` is the **single source of truth** for all business contact and location details:
- **Phone & WhatsApp**: `contact.phoneDisplay`, `contact.whatsappRaw`, `contact.phoneTel`
- **Email & Address**: `contact.email`, `contact.address`, `contact.operatingHours`
- **Service Areas**: Array of covered localities across Tirupati (`serviceAreas`) with names and pincodes
- **WhatsApp Link Generator**: `buildWhatsAppUrl(options)`

To update the business phone number, operating hours, or address, update this single file. All components throughout the site automatically consume these values.

---

## 3. Trust & Ratings Configuration (`src/config/trustConfig.ts`)

Garuda Cleaning Services is an authentic new local business. In compliance with advertising standards and Google policies, **no fabricated ratings, fake review counts, or artificial testimonials are hardcoded.**

- `googleRating`: Set to verified Google Business Profile rating (default: `null`)
- `reviewCount`: Set to verified Google review count (default: `null`)
- `projectsCompleted`: Set to real milestone count (default: `null`)
- `googleReviewUrl`: Link to your live Google Business Profile review form (default: `null`)
- `testimonials`: Array of authentic customer reviews (ships empty: `[]`)
- `commitments`: Array of commitments with `ownerConfirmed: boolean`. Components only display commitments with `ownerConfirmed: true`.

> **Rule**: When `googleRating`, `projectsCompleted`, or `testimonials` are `null` or empty, the corresponding UI blocks either gracefully display an honest "Reviews Coming Soon" card or automatically hide.

---

## 4. How to Manage Services (`src/data/servicesData.ts`)

All services are defined in `src/data/servicesData.ts`:
- Each service has an `enabled: boolean` flag.
- Set `enabled: false` to immediately hide a service from:
  - Homepage category circles (`ServiceCircles`)
  - Full service catalogue (`ServicesGrid`)
  - Navigation menus (`Header` and `FooterSection`)
  - Service detail routes (`/services/:id`)
- To add a new service:
  1. Add a new `ServiceItem` object to `SERVICES_DATA`.
  2. Set `enabled: true`.
  3. Supply a real photo in `public/images/`. If no photo is supplied, `<SafeImage>` will render a branded fallback gradient with the service title.

---

## 5. How to Add Real Photos in Minutes (`npm run gallery:add`)

1. Save raw photos from your smartphone in the `gallery-raw/` folder named:
   - `{serviceSlug}-{n}-before.jpg`
   - `{serviceSlug}-{n}-after.jpg`
   - (Optional) `{serviceSlug}-{n}.json` containing `{ "locality": "Balaji Colony", "problem": "...", "work": "...", "date": "YYYY-MM-DD" }`
   *(e.g., `kitchen-deep-cleaning-1-before.jpg` and `kitchen-deep-cleaning-1-after.jpg`)*

2. Run the automated optimization command:
   ```bash
   npm run gallery:add
   ```
   This command automatically:
   - Validates that the service slug exists in `servicesData.ts`.
   - **Auto-rotates** photos based on EXIF sensors.
   - **Strips all EXIF and GPS coordinates** to protect customer location privacy.
   - Validates that the aspect ratio difference between before/after photos is within 5%.
   - Generates high-efficiency WebP images (1400w max, optimized `<= 180KB`) in `public/images/gallery/`.
   - Appends the new entry with `source: 'real'` to `src/data/galleryData.ts` and automatically retires the illustrative mock entry for that service.

### 📸 Photo-Shooting Best Practices Guide:
- **Same Spot & Angle**: Stand in the exact same spot and hold the phone at the same height/angle for both before and after shots.
- **Consistent Lighting**: Keep room lighting consistent (avoid mixing daylight in one and flash in the other).
- **Phone Held Steady**: Keep the camera steady to avoid motion blur.
- **Customer Privacy**: Always ask the customer's permission before taking photos.
- **Redact Identifiers**: Blur or avoid framing vehicle license plates, family photos, or personal identifying documents.

---

## 6. Deployment on Render & Soft 404 Notice

### Render Static Site Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

### SPA Rewrites & Soft 404s
In standard single-page applications, static hosting platforms require a rewrite rule to redirect all routes to `index.html`:
```text
/*    /index.html   200
```
> [!WARNING]
> While `/* /index.html 200` enables client-side routing on direct page refresh, it returns an **HTTP 200 OK** status code for all invalid URLs, causing **soft 404s** that search engine crawlers penalize.
> In **Phase 2 (Technical SEO)**, this configuration will be replaced by **build-time static prerendering (SSG)** so that every valid route outputs a pre-rendered `index.html` file, and invalid routes serve a genuine `404.html` with correct HTTP 404 status handling.
