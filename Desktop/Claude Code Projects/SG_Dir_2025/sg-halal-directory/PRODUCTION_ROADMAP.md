# 🚀 SINGAPORE HALAL DIRECTORY - PRODUCTION ROADMAP

**Generated:** November 4, 2025
**Project Status:** 82% Complete
**Estimated Time to Production:** 25-35 hours
**Target Launch Date:** [Set based on your timeline]

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Current Status Overview](#current-status-overview)
3. [Critical Pre-Launch Tasks](#critical-pre-launch-tasks)
4. [Phase 1: Core Fixes (Week 1)](#phase-1-core-fixes-week-1)
5. [Phase 2: Infrastructure Setup (Week 1-2)](#phase-2-infrastructure-setup-week-1-2)
6. [Phase 3: Testing & QA (Week 2)](#phase-3-testing--qa-week-2)
7. [Phase 4: Deployment (Week 3)](#phase-4-deployment-week-3)
8. [Phase 5: Post-Launch (Week 4+)](#phase-5-post-launch-week-4)
9. [Production Checklist](#production-checklist)
10. [Cost Structure](#cost-structure)
11. [Success Metrics](#success-metrics)

---

## 🎯 EXECUTIVE SUMMARY

### What's Already Built (82% Complete)

✅ **Core Foundation**
- 25+ fully functional pages (Homepage, Directory, Business Detail, Admin Panel, User Dashboard)
- Complete database schema (7 tables with RLS policies)
- Authentication system (Magic link login via Supabase)
- Stripe payment integration for featured listings
- Email notification system (Resend)
- Responsive design with Tailwind CSS
- SEO foundation with schema markup

✅ **Key Features Working**
- Business listing & search
- Business claim workflow
- Admin approval system
- Featured listing monetization ($29/1mo, $75/3mo, $140/6mo)
- Coupon code generation
- Badge generator for backlinks
- 17 Singapore areas with SEO data

### What Needs to be Done (18% Remaining)

🔴 **Critical Blockers** (Must fix before launch)
1. Image upload system not integrated
2. Map display not on business pages
3. Geocoding not fully wired
4. Missing privacy & terms pages
5. No custom error pages (404/500)

🟡 **Important but Not Blocking**
- Email flows need completion
- Search page schema markup
- Opening hours schema
- Rate limiting on APIs
- Enhanced footer

### Time Estimate Breakdown

| Phase | Duration | Priority |
|-------|----------|----------|
| **Phase 1: Core Fixes** | 15-20 hours | 🔴 Critical |
| **Phase 2: Infrastructure** | 3-5 hours | 🔴 Critical |
| **Phase 3: Testing & QA** | 4-6 hours | 🟡 Important |
| **Phase 4: Deployment** | 2-3 hours | 🔴 Critical |
| **Phase 5: Post-Launch** | Ongoing | 🟢 Enhancement |

**Total to Production:** 25-35 hours

---

## 📊 CURRENT STATUS OVERVIEW

### Completion by Module

| Module | Status | % Complete | Notes |
|--------|--------|------------|-------|
| **Database Schema** | ✅ | 90% | Missing: image optimization fields |
| **Authentication** | ✅ | 95% | Magic links working |
| **Pages & UI** | ✅ | 95% | 25 pages created |
| **Admin Panel** | ✅ | 100% | Complete |
| **Stripe Payments** | ✅ | 90% | Needs final testing |
| **Email Service** | 🟡 | 85% | Some flows incomplete |
| **Geocoding** | 🟡 | 60% | Database ready, integration needed |
| **Map Display** | 🟡 | 50% | Component exists, not integrated |
| **Image Upload** | 🟡 | 60% | Components exist, not wired |
| **SEO/Schema** | ✅ | 85% | Most pages covered |
| **Error Handling** | 🔴 | 30% | No custom error pages |
| **Rate Limiting** | 🔴 | 0% | Not implemented |
| **Legal Pages** | 🔴 | 0% | Privacy/Terms missing |

### Critical Dependencies Status

| Service | Required? | Status | Setup Time |
|---------|-----------|--------|------------|
| **Supabase** | ✅ Yes | Need API keys | 10 min |
| **Stripe** | ✅ Yes | Need API keys | 15 min |
| **Resend** | 🟡 Recommended | Need API keys | 5 min |
| **Domain** | ✅ Yes | Need to purchase | 10 min |
| **Hosting** | ✅ Yes | Vercel/Netlify | 10 min |
| **OneMap API** | 🟢 Optional | For geocoding | 10 min |

---

## 🔥 CRITICAL PRE-LAUNCH TASKS

### Priority 1: Must Have (Launch Blockers)

#### 1. Environment Setup (30 minutes)
- [ ] Create `.env.local` from `.env.local.example`
- [ ] Get Supabase credentials (URL, anon key, service role key)
- [ ] Get Stripe API keys (publishable, secret)
- [ ] Get Stripe webhook secret
- [ ] Set up Resend account and API key
- [ ] Configure admin emails list

**Files to configure:**
- `.env.local` (create from template)

#### 2. Database Setup (1 hour)
- [ ] Create Supabase project
- [ ] Run migrations from `supabase/migrations/`
- [ ] Create storage bucket for business images
- [ ] Set up RLS policies (should be in migrations)
- [ ] Verify database schema
- [ ] Seed initial data (Singapore areas)

**Commands:**
```bash
# Initialize Supabase
supabase init

# Link to remote project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push

# Create storage bucket
# (Do this via Supabase Dashboard: Storage > Create bucket > "business-images" > Public)
```

#### 3. Stripe Product Setup (30 minutes)
- [ ] Create Stripe account (if not exists)
- [ ] Create 3 products for featured listings:
  - 1 Month Featured - $29 USD
  - 3 Month Featured - $75 USD
  - 6 Month Featured - $140 USD
- [ ] Copy Price IDs to `.env.local`
- [ ] Set up webhook endpoint (use Stripe CLI for local testing)

**Stripe CLI Commands:**
```bash
# Install Stripe CLI
# Download from: https://stripe.com/docs/stripe-cli

# Test webhook locally
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret to .env.local
```

#### 4. Legal Pages (3-4 hours)
**Files to create:**
- `app/privacy/page.tsx` - Privacy Policy
- `app/terms/page.tsx` - Terms of Service
- `app/cookies/page.tsx` - Cookie Policy

**Content needed:**
- Standard privacy policy (use generator: https://www.privacypolicygenerator.info/)
- Terms of service (use generator: https://www.termsofservicegenerator.net/)
- Cookie policy (if using analytics)

#### 5. Error Pages (1 hour)
**Files to create:**
- `app/not-found.tsx` - Custom 404 page
- `app/error.tsx` - Error boundary component
- `app/global-error.tsx` - Global error handler

### Priority 2: High Impact (Needed for Good UX)

#### 6. Image Upload Integration (6-8 hours)

**What exists:**
- `components/ImageUploader.tsx` - Drag-drop component ✅
- `components/ImageManager.tsx` - Gallery management ✅
- Supabase Storage setup ready ✅

**What needs to be done:**
- [ ] Integrate ImageManager into `app/dashboard/edit/[id]/page.tsx`
- [ ] Wire up upload to Supabase Storage
- [ ] Implement image limit logic (1 for standard, 8 for featured)
- [ ] Add image deletion functionality
- [ ] Test with real image files

**Key files to edit:**
- `app/dashboard/edit/[id]/page.tsx`
- `app/actions/images.ts` (may need to create)
- `lib/supabase/client.ts` (add storage helpers)

#### 7. Map Integration (4-6 hours)

**What exists:**
- `components/BusinessMap.tsx` - Leaflet map component ✅
- `react-leaflet` dependency installed ✅

**What needs to be done:**
- [ ] Add lat/lng fields to business form
- [ ] Integrate geocoding API (OneMap Singapore or Google)
- [ ] Display map on business detail pages
- [ ] Add map to business edit page (for verification)
- [ ] Update LocalBusiness schema with geo coordinates

**Key files to edit:**
- `app/business/[id]/page.tsx` - Add map display
- `app/dashboard/edit/[id]/page.tsx` - Add map for editing
- `lib/geocoding.ts` - Wire up geocoding API
- `app/actions/business.ts` - Add geocoding on submission

#### 8. Geocoding Setup (2-3 hours)

**Options:**

**A. OneMap Singapore API (Recommended - Free)**
- Singapore-specific
- No API key required for low usage
- Accurate for SG postal codes
- Documentation: https://www.onemap.gov.sg/docs/

**B. Google Maps Geocoding API**
- $5 per 1000 requests (after $200 free credit)
- More global coverage
- Need API key with billing enabled

**Implementation:**
```typescript
// lib/geocoding.ts enhancement needed

export async function geocodeAddress(address: string, postalCode: string) {
  // Option A: OneMap (Free, no key needed)
  const response = await fetch(
    `https://developers.onemap.sg/commonapi/search?searchVal=${encodeURIComponent(postalCode)}&returnGeom=Y&getAddrDetails=Y`
  );

  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return {
      latitude: parseFloat(data.results[0].LATITUDE),
      longitude: parseFloat(data.results[0].LONGITUDE)
    };
  }

  throw new Error('Geocoding failed');
}
```

### Priority 3: SEO & Polish (Important but not blocking)

#### 9. SEO Enhancements (2-3 hours)
- [ ] Add noindex meta tags to private pages
  - Dashboard pages (`/dashboard/*`)
  - Admin pages (`/admin/*`)
  - Auth pages (`/auth/*`)
  - Upgrade pages (`/upgrade/*`)
- [ ] Add SearchAction schema to search page
- [ ] Add opening hours schema to businesses (if data available)
- [ ] Verify all schema markup with Google Rich Results Test

**Files to update:**
```typescript
// app/dashboard/layout.tsx
export const metadata = {
  robots: {
    index: false,
    follow: false,
  }
}
```

#### 10. Footer Enhancement (2 hours)
- [ ] Add sitemap links (all main pages)
- [ ] Add social media links
- [ ] Add newsletter signup (optional)
- [ ] Add footer schema (SiteNavigationElement)

**File to edit:**
- `components/Footer.tsx` (may need to create)
- Add to `app/layout.tsx`

---

## 🏗️ PHASE 1: CORE FIXES (Week 1)

**Goal:** Fix all critical functionality gaps
**Duration:** 15-20 hours
**Priority:** 🔴 Critical

### Day 1-2: Image Upload System (6-8 hours)

**Task 1.1: Set up Supabase Storage (1 hour)**
```bash
# In Supabase Dashboard:
1. Go to Storage
2. Create new bucket: "business-images"
3. Make it Public
4. Set up policies:
   - Allow authenticated users to upload
   - Allow public to read
```

**Task 1.2: Create Image Upload Actions (2 hours)**
Create/update `app/actions/images.ts`:
```typescript
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function uploadBusinessImage(
  businessId: string,
  formData: FormData
) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Check if business belongs to user
  const { data: business } = await supabase
    .from('businesses')
    .select('claimed_by, is_featured')
    .eq('id', businessId)
    .single()

  if (business.claimed_by !== user.id) {
    throw new Error('Not your business')
  }

  // Check image count limit
  const { count } = await supabase
    .from('images')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)

  const maxImages = business.is_featured ? 8 : 1
  if (count >= maxImages) {
    throw new Error(`Maximum ${maxImages} images allowed`)
  }

  // Upload to storage
  const file = formData.get('file') as File
  const fileExt = file.name.split('.').pop()
  const fileName = `${businessId}/${Date.now()}.${fileExt}`

  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('business-images')
    .upload(fileName, file)

  if (uploadError) throw uploadError

  // Get public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('business-images')
    .getPublicUrl(fileName)

  // Create image record
  const { error: dbError } = await supabase
    .from('images')
    .insert({
      business_id: businessId,
      url: publicUrl,
      display_order: count + 1
    })

  if (dbError) throw dbError

  revalidatePath(`/dashboard/edit/${businessId}`)
  return { success: true }
}

export async function deleteBusinessImage(imageId: string) {
  // Implementation for image deletion
}
```

**Task 1.3: Integrate into Edit Page (3-4 hours)**
- Update `app/dashboard/edit/[id]/page.tsx`
- Add ImageManager component
- Wire up upload/delete actions
- Add loading states and error handling

**Task 1.4: Test Image Upload (1 hour)**
- Test with various image formats (JPEG, PNG, WebP)
- Test size limits
- Test image limit enforcement (1 vs 8)
- Test deletion

### Day 3: Map Integration (4-6 hours)

**Task 1.5: Add Geocoding (2 hours)**
- Enhance `lib/geocoding.ts` with OneMap API
- Add geocoding to business submission action
- Add manual lat/lng input option

**Task 1.6: Display Maps on Business Pages (2 hours)**
- Integrate `BusinessMap.tsx` into `app/business/[id]/page.tsx`
- Add fallback for businesses without coordinates
- Style map container

**Task 1.7: Add Geo to Schema Markup (1 hour)**
- Update LocalBusiness schema in business detail pages
- Add geo coordinates to schema

**Task 1.8: Test Maps (1 hour)**
- Test with real Singapore addresses
- Verify map displays correctly
- Test on mobile devices

### Day 4: Legal Pages & Error Handling (4-5 hours)

**Task 1.9: Create Legal Pages (3 hours)**

Create `app/privacy/page.tsx`:
```typescript
export const metadata = {
  title: 'Privacy Policy | Singapore Halal Directory',
  description: 'Our privacy policy and data handling practices',
  robots: { index: true, follow: true }
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      {/* Add privacy policy content */}
    </div>
  )
}
```

Similar for:
- `app/terms/page.tsx`
- `app/cookies/page.tsx` (if needed)

**Task 1.10: Create Error Pages (1-2 hours)**

Create `app/not-found.tsx`:
```typescript
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <a href="/" className="text-green-600 hover:underline">
          Return to homepage
        </a>
      </div>
    </div>
  )
}
```

Create `app/error.tsx`:
```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
```

### Day 5: SEO & Polish (2-3 hours)

**Task 1.11: Add Noindex Tags (1 hour)**
- Update all dashboard layouts
- Update admin layouts
- Update auth layouts

**Task 1.12: Search Page Schema (1 hour)**
- Add SearchAction schema to search page
- Add BreadcrumbList

**Task 1.13: Enhanced Footer (1 hour)**
- Create comprehensive footer component
- Add to root layout

---

## ⚙️ PHASE 2: INFRASTRUCTURE SETUP (Week 1-2)

**Goal:** Set up all production services
**Duration:** 3-5 hours
**Priority:** 🔴 Critical

### Task 2.1: Supabase Production Setup (1 hour)

**Steps:**
1. Create production Supabase project
2. Run all migrations
3. Create storage bucket
4. Set up RLS policies
5. Configure email templates (for magic links)
6. Set up database backups

**Verification:**
```bash
# Test database connection
supabase db ping

# Verify tables exist
supabase db ls
```

### Task 2.2: Stripe Production Setup (1 hour)

**Steps:**
1. Switch Stripe account to live mode
2. Recreate products in live mode
3. Get live API keys
4. Set up production webhook endpoint
5. Test with real payment (small amount)

**Webhook URL:** `https://yourdomain.com/api/stripe/webhook`

### Task 2.3: Resend Production Setup (30 minutes)

**Steps:**
1. Verify domain in Resend
2. Add DNS records (SPF, DKIM, DMARC)
3. Test email sending
4. Set up email templates

### Task 2.4: Domain & DNS Setup (30 minutes)

**Recommended Domain:** `singaporehalaldir.com` or similar

**DNS Records Needed:**
```
Type    Name    Value               TTL
A       @       [Vercel IP]         Auto
CNAME   www     cname.vercel-dns.com Auto
TXT     @       [Resend verification] Auto
TXT     _dmarc  [DMARC policy]      Auto
```

### Task 2.5: Hosting Setup - Vercel (1 hour)

**Steps:**
1. Create Vercel account
2. Import GitHub repository
3. Configure environment variables (all from `.env.local`)
4. Set up custom domain
5. Configure build settings
6. Deploy to production

**Vercel Configuration:**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "regions": ["sin1"]
}
```

### Task 2.6: Analytics Setup (30 minutes)

**Google Analytics:**
1. Create GA4 property
2. Get Measurement ID
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Add GA script to `app/layout.tsx`

**Meta Pixel (optional):**
1. Create Meta Pixel
2. Add pixel ID to environment
3. Add pixel script

---

## 🧪 PHASE 3: TESTING & QA (Week 2)

**Goal:** Comprehensive testing before launch
**Duration:** 4-6 hours
**Priority:** 🟡 Important

### Task 3.1: Functional Testing (2 hours)

**Test Cases:**

| Feature | Test Steps | Expected Result | Status |
|---------|------------|-----------------|--------|
| **Sign Up** | Magic link flow | Email received, login successful | [ ] |
| **Business Claim** | Submit claim | Pending status, admin notified | [ ] |
| **Admin Approval** | Approve claim | Status changes, user notified | [ ] |
| **Featured Upgrade** | Complete checkout | Payment successful, featured active | [ ] |
| **Image Upload** | Upload photo | Image appears in gallery | [ ] |
| **Map Display** | View business | Map shows correct location | [ ] |
| **Search** | Search by name | Results appear | [ ] |
| **Badge Generator** | Generate code | Embed code copied | [ ] |
| **Coupon Code** | Use discount | Price reduced | [ ] |

### Task 3.2: Browser Testing (1 hour)

Test on:
- [ ] Chrome (desktop)
- [ ] Safari (desktop)
- [ ] Firefox (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (iOS)

### Task 3.3: Performance Testing (1 hour)

**Run Lighthouse Audit:**
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://yourdomain.com --view
```

**Targets:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Fix common issues:**
- Image optimization (use Next.js Image component)
- Minimize JavaScript
- Enable compression
- Set up caching headers

### Task 3.4: SEO Testing (1 hour)

**Tools:**
1. Google Rich Results Test: https://search.google.com/test/rich-results
2. Schema Markup Validator: https://validator.schema.org/
3. Google Search Console

**Test Pages:**
- Homepage (Organization schema)
- Business detail (LocalBusiness schema)
- Directory (ItemList schema)
- Area pages (FAQPage schema)

### Task 3.5: Security Testing (1 hour)

**Checklist:**
- [ ] All API routes protected with authentication
- [ ] RLS policies prevent unauthorized access
- [ ] No exposed API keys in client code
- [ ] HTTPS enabled
- [ ] Rate limiting on public endpoints (implement if missing)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (React automatic escaping)

---

## 🚀 PHASE 4: DEPLOYMENT (Week 3)

**Goal:** Launch to production
**Duration:** 2-3 hours
**Priority:** 🔴 Critical

### Pre-Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations applied
- [ ] Supabase storage bucket created
- [ ] Stripe products created in live mode
- [ ] Domain DNS configured
- [ ] Analytics tracking installed
- [ ] Error monitoring set up (optional: Sentry)

### Task 4.1: Initial Deployment (30 minutes)

```bash
# Push to main branch
git push origin main

# Vercel will auto-deploy
# Or manual deploy:
vercel --prod
```

### Task 4.2: Post-Deployment Verification (1 hour)

**Check:**
1. Homepage loads
2. Authentication works
3. Database connectivity
4. Stripe payments work (test with real card)
5. Email sending works
6. Image upload works
7. Maps display correctly
8. All pages accessible

### Task 4.3: SEO Submission (30 minutes)

**Google Search Console:**
1. Add property
2. Verify ownership
3. Submit sitemap
4. Request indexing for key pages

**Bing Webmaster Tools:**
1. Add site
2. Verify ownership
3. Submit sitemap

### Task 4.4: Monitoring Setup (30 minutes)

**Uptime Monitoring:**
- Use UptimeRobot (free: https://uptimerobot.com/)
- Monitor main pages every 5 minutes

**Error Tracking:**
- Vercel built-in error logging
- Optional: Sentry integration

**Analytics Dashboard:**
- Set up Google Analytics dashboard
- Track key metrics daily

---

## 📈 PHASE 5: POST-LAUNCH (Week 4+)

**Goal:** Growth and optimization
**Duration:** Ongoing
**Priority:** 🟢 Enhancement

### Week 4: Content & Data Population

**Task 5.1: Import Singapore Areas Data (4 hours)**
- Import from `singapore-areas-seo-data.json`
- Populate area descriptions
- Add landmarks and MRT info
- Update area FAQs

**Task 5.2: Seed Initial Businesses (variable time)**

**Option A: Manual Entry (10-20 businesses/hour)**
- Find halal businesses online
- Submit through frontend form
- Approve through admin panel

**Option B: Data Scraping (Setup: 8 hours, then automated)**
- Set up Jina.ai scraper
- Target HalalGo, MUIS database
- Run bulk import script
- Review and approve

**Target:** 100-500 businesses in first month

### Month 2: SEO & Growth

**Task 5.3: Content Marketing**
- Write blog posts (halal food guides)
- Create area guides
- Share on social media
- Reach out to food bloggers

**Task 5.4: Backlink Program**
- Email businesses about badge program
- Offer free featured month for backlink
- Track badge implementations

**Task 5.5: SEO Monitoring**
- Track keyword rankings
- Monitor Google Search Console
- Adjust meta descriptions
- Add more schema markup

### Month 3+: Features & Optimization

**Task 5.6: Enhanced Features**
- Badge verification tracking
- Enhanced dashboard with statistics
- Opening hours management
- User reviews system (optional)
- Mobile app (optional)

**Task 5.7: Performance Optimization**
- CDN configuration
- Image optimization
- Database query optimization
- Caching strategy

**Task 5.8: Marketing**
- Paid advertising (Google Ads, Facebook)
- Partnership with halal organizations
- Press releases
- Community engagement

---

## ✅ PRODUCTION CHECKLIST

### 🔴 Critical (Must Complete Before Launch)

#### Environment & Configuration
- [ ] Create `.env.local` with all required variables
- [ ] Supabase project created (production)
- [ ] Stripe account set up (live mode)
- [ ] Domain registered
- [ ] Hosting configured (Vercel/Netlify)
- [ ] DNS records configured
- [ ] SSL certificate active

#### Database
- [ ] All migrations applied
- [ ] RLS policies active
- [ ] Storage bucket created
- [ ] Initial data seeded (areas)
- [ ] Backup strategy configured

#### Core Features
- [ ] Authentication working
- [ ] Business listing functional
- [ ] Business claim flow working
- [ ] Admin approval system working
- [ ] Featured listing purchase working
- [ ] Image upload functional
- [ ] Map display working
- [ ] Email notifications working

#### Legal & Content
- [ ] Privacy policy page created
- [ ] Terms of service page created
- [ ] Contact information accurate
- [ ] Admin email addresses configured

#### SEO & Schema
- [ ] Organization schema on homepage
- [ ] LocalBusiness schema on business pages
- [ ] BreadcrumbList schema on directory
- [ ] FAQPage schema on area pages
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Noindex on private pages

#### Testing
- [ ] Authentication flow tested
- [ ] Payment flow tested (with real payment)
- [ ] Email sending tested
- [ ] Image upload tested
- [ ] Map display tested
- [ ] Mobile responsive verified
- [ ] Browser compatibility tested
- [ ] Lighthouse audit passed (90+)

#### Monitoring
- [ ] Google Analytics installed
- [ ] Google Search Console set up
- [ ] Uptime monitoring configured
- [ ] Error tracking set up

### 🟡 Important (Should Complete Soon After Launch)

- [ ] Meta Pixel installed (if using Facebook ads)
- [ ] Custom 404 page created
- [ ] Custom error page created
- [ ] Footer enhanced with sitemap links
- [ ] Search page schema markup added
- [ ] Opening hours schema added (if data available)
- [ ] Enhanced user dashboard
- [ ] Admin statistics dashboard
- [ ] Rate limiting implemented
- [ ] Email template customization

### 🟢 Nice to Have (Can Do Later)

- [ ] Badge verification tracking
- [ ] Data scraping system set up
- [ ] Blog/content section
- [ ] User reviews system
- [ ] Advanced search filters
- [ ] Business recommendations
- [ ] Newsletter system
- [ ] Social media integration
- [ ] Mobile app

---

## 💰 COST STRUCTURE

### Initial Setup (One-Time)

| Item | Cost | Notes |
|------|------|-------|
| **Domain** | $12-15/year | .com domain |
| **Logo Design** | $0-500 | Can use Canva (free) or hire designer |
| **Stock Photos** | $0 | Use Unsplash, Pexels (free) |
| **Total Initial** | $12-515 | |

### Monthly Operating Costs

#### Month 1 (Launch)

| Service | Tier | Monthly Cost | Notes |
|---------|------|--------------|-------|
| **Supabase** | Free | $0 | Up to 500MB DB, 1GB storage, 2GB bandwidth |
| **Vercel/Netlify** | Free | $0 | Up to 100GB bandwidth |
| **Stripe** | Pay-as-you-go | $0 + 3.4% | No monthly fee, only transaction fees |
| **Resend** | Free | $0 | 3,000 emails/month |
| **OneMap API** | Free | $0 | Geocoding for Singapore |
| **Total Month 1** | | **$0-10** | (Plus ~$5-10 in transaction fees if sales) |

#### Month 3 (Growing)

| Service | Tier | Monthly Cost | Notes |
|---------|------|--------------|-------|
| **Supabase** | Pro | $25 | Better performance, 8GB DB, 100GB storage |
| **Vercel/Netlify** | Free | $0 | Still within limits |
| **Stripe** | Pay-as-you-go | ~$15-50 | 3.4% of $500-1,500 revenue |
| **Resend** | Free | $0 | Still within 3,000 emails |
| **Analytics** | Free | $0 | Google Analytics |
| **Total Month 3** | | **$40-75** | |

#### Month 6 (Scaling)

| Service | Tier | Monthly Cost | Notes |
|---------|------|--------------|-------|
| **Supabase** | Pro/Team | $25-599 | Depends on traffic (likely $25-99) |
| **Vercel/Netlify** | Pro | $0-20 | May need if high traffic |
| **Stripe** | Pay-as-you-go | ~$70-340 | 3.4% of $2,000-10,000 revenue |
| **Resend** | Pro | $0-20 | If over 3,000 emails |
| **Marketing** | Variable | $100-500 | Google Ads, social media |
| **Scraping APIs** | Optional | $0-50 | Jina.ai, Firecrawl (if used) |
| **Total Month 6** | | **$195-1,029** | |

### Revenue Projections

#### Conservative Scenario
- **Month 1:** 2-3 featured listings = $60-90 revenue
- **Month 3:** 5-8 featured listings = $145-240 revenue
- **Month 6:** 10-15 featured listings = $290-450 revenue

#### Moderate Scenario
- **Month 1:** 5 featured listings = $145 revenue
- **Month 3:** 15 featured listings = $435 revenue
- **Month 6:** 30 featured listings = $870 revenue

#### Optimistic Scenario
- **Month 1:** 10 featured listings = $290 revenue
- **Month 3:** 30 featured listings = $870 revenue
- **Month 6:** 60 featured listings = $1,740 revenue

### Break-Even Analysis

**Monthly Break-Even Points:**
- **Month 1:** 1-2 featured listings ($29-58 revenue)
- **Month 3:** 5-6 featured listings ($145-174 revenue)
- **Month 6:** 15-20 featured listings ($435-580 revenue)

**Key Insight:** Need only 5 featured listings/month to cover costs by Month 3.

---

## 📊 SUCCESS METRICS

### 3-Month Targets

#### Traffic Metrics
| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| **Unique Visitors** | 500 | 2,000 | 6,000 |
| **Page Views** | 2,000 | 8,000 | 20,000 |
| **Bounce Rate** | <70% | <65% | <60% |
| **Avg Session** | >1min | >1.5min | >2min |
| **Pages/Session** | >2 | >2.5 | >3 |

#### Business Metrics
| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| **Total Businesses** | 100 | 500 | 1,500 |
| **Business Claims** | 5 | 15 | 30 |
| **Featured Listings** | 3 | 8 | 15 |
| **New Submissions** | 10 | 30 | 50 |
| **Badge Implementations** | 2 | 10 | 25 |

#### Revenue Metrics
| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| **Featured Sales** | 3 | 8 | 15 |
| **Monthly Revenue** | $87 | $232 | $435 |
| **Cumulative Revenue** | $87 | $350 | $1,100 |
| **Profit Margin** | High | High | High |

#### SEO Metrics
| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| **Pages Indexed** | 100 | 300 | 600 |
| **Organic Traffic** | 100 | 1,000 | 3,000 |
| **Avg Position** | 40 | 20 | 10 |
| **Backlinks** | 5 | 25 | 75 |
| **Domain Authority** | 5 | 15 | 25 |

### Key Performance Indicators (KPIs)

**Primary KPIs:**
1. **Monthly Recurring Revenue (MRR)**
   - Target: $500 by Month 6
   - Metric: Total featured listing revenue

2. **User Engagement Rate**
   - Target: >30% by Month 3
   - Metric: (Claims + Submissions + Featured) / Total Visitors

3. **SEO Visibility**
   - Target: 100 keywords in top 10 by Month 6
   - Metric: Google Search Console average position

4. **Content Growth**
   - Target: 1,500 businesses by Month 6
   - Metric: Total approved businesses in database

**Secondary KPIs:**
- Email open rate (target: >25%)
- Badge implementation rate (target: >15% of featured)
- Business claim approval rate (target: >80%)
- User return rate (target: >20%)

---

## 🎯 WEEKLY SPRINT PLAN

### Week 1: Core Development

**Monday:**
- [ ] Set up all environment variables
- [ ] Create Supabase project
- [ ] Run database migrations
- [ ] Start image upload integration

**Tuesday:**
- [ ] Complete image upload system
- [ ] Test image upload with various files
- [ ] Start map integration

**Wednesday:**
- [ ] Complete map integration
- [ ] Set up geocoding API
- [ ] Test maps on business pages

**Thursday:**
- [ ] Create privacy policy page
- [ ] Create terms of service page
- [ ] Create custom error pages

**Friday:**
- [ ] Add noindex tags to private pages
- [ ] Add schema markup to search page
- [ ] Enhanced footer
- [ ] Code review and bug fixes

### Week 2: Infrastructure & Testing

**Monday:**
- [ ] Set up Stripe production account
- [ ] Create products in live mode
- [ ] Configure webhook

**Tuesday:**
- [ ] Set up Resend production
- [ ] Verify domain for emails
- [ ] Test email sending

**Wednesday:**
- [ ] Register domain
- [ ] Configure DNS
- [ ] Set up Vercel project

**Thursday:**
- [ ] Comprehensive testing (all features)
- [ ] Browser testing
- [ ] Mobile testing
- [ ] Fix any bugs found

**Friday:**
- [ ] Performance testing (Lighthouse)
- [ ] SEO testing (schema validation)
- [ ] Security review
- [ ] Pre-launch preparations

### Week 3: Deployment & Launch

**Monday:**
- [ ] Final code review
- [ ] Deploy to production
- [ ] Post-deployment verification
- [ ] Monitor for errors

**Tuesday:**
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster
- [ ] Set up analytics
- [ ] Set up monitoring

**Wednesday:**
- [ ] Seed initial business data (50-100 businesses)
- [ ] Test all flows in production
- [ ] Announce launch on social media

**Thursday:**
- [ ] Monitor traffic and errors
- [ ] Respond to any user feedback
- [ ] Fix any production bugs

**Friday:**
- [ ] Week 1 retrospective
- [ ] Plan marketing activities
- [ ] Reach out to potential business partners

---

## 🚨 RISK MANAGEMENT

### Potential Risks & Mitigation

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Stripe webhook failures** | Medium | High | Test thoroughly, implement retry logic, monitor webhook events |
| **Database performance issues** | Low | High | Start with Supabase Pro, add indexes, monitor query performance |
| **Email deliverability problems** | Medium | Medium | Use Resend, set up SPF/DKIM/DMARC, warm up domain |
| **Geocoding API rate limits** | Medium | Medium | Use OneMap (no limits for SG), implement caching |
| **Image upload abuse** | Medium | Low | Enforce size limits, scan for inappropriate content |
| **Low initial traffic** | High | Medium | SEO optimization, content marketing, social media |
| **Slow business adoption** | High | Medium | Reach out directly, offer incentives, streamline claim process |
| **High infrastructure costs** | Low | Medium | Monitor usage, optimize queries, use free tiers initially |

### Contingency Plans

**If Stripe Payment Fails:**
- Manual payment processing via bank transfer
- Issue invoice and update database manually
- Investigate and fix Stripe integration

**If Email Delivery Fails:**
- Use alternative email service (SendGrid, Mailgun)
- Provide alternative contact methods
- Display notifications in dashboard

**If Database Performance Degrades:**
- Upgrade Supabase plan
- Add database indexes
- Implement caching layer (Redis)
- Optimize slow queries

**If Traffic Overload:**
- Upgrade hosting plan
- Implement CDN (Cloudflare)
- Add rate limiting
- Optimize assets (images, JS bundles)

---

## 📞 SUPPORT & RESOURCES

### Documentation References
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **Resend Docs:** https://resend.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

### Project Documentation
- `CLAUDE.md` - Complete development guide
- `API_KEYS_SETUP.md` - API keys setup instructions
- `PROJECT_STATUS.md` - Detailed status report
- `STRIPE_*.md` - Stripe integration guides
- `GEOCODING_*.md` - Geocoding documentation

### Community Support
- **Next.js Discord:** https://nextjs.org/discord
- **Supabase Discord:** https://discord.supabase.com
- **Stripe Support:** https://support.stripe.com

### Emergency Contacts
- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.com
- Stripe Support: https://support.stripe.com/contact

---

## 🎓 LEARNING RESOURCES

### For Developers New to the Stack

**Next.js:**
- Official Tutorial: https://nextjs.org/learn
- App Router Guide: https://nextjs.org/docs/app

**Supabase:**
- Quickstart: https://supabase.com/docs/guides/getting-started
- Authentication: https://supabase.com/docs/guides/auth

**Stripe:**
- Payments Quickstart: https://stripe.com/docs/payments/quickstart
- Webhooks Guide: https://stripe.com/docs/webhooks

**TypeScript:**
- Handbook: https://www.typescriptlang.org/docs/handbook/intro.html

---

## ✅ FINAL PRE-LAUNCH CHECKLIST

Print this and check off before launching:

### 🔴 Critical Items
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Supabase storage bucket created
- [ ] Stripe products created (live mode)
- [ ] Domain registered and configured
- [ ] SSL certificate active
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Contact information accurate
- [ ] Admin emails configured
- [ ] Test authentication flow (successful)
- [ ] Test payment flow with real card (successful)
- [ ] Test email sending (emails received)
- [ ] Image upload working
- [ ] Maps displaying correctly
- [ ] Mobile responsive (tested on real device)
- [ ] Lighthouse score >90 (performance)
- [ ] Schema markup validated
- [ ] Sitemap.xml accessible
- [ ] Google Search Console configured
- [ ] Analytics tracking installed
- [ ] Uptime monitoring configured
- [ ] Error tracking configured
- [ ] Backup strategy in place

### 🟡 Important Items
- [ ] Custom 404 page created
- [ ] Custom error page created
- [ ] Footer with sitemap links
- [ ] Search page schema markup
- [ ] Noindex on private pages
- [ ] Browser testing complete (Chrome, Safari, Firefox)
- [ ] Rate limiting implemented
- [ ] Email templates customized
- [ ] Social media accounts created
- [ ] Launch announcement prepared

### 🟢 Nice to Have
- [ ] Badge verification tracking
- [ ] Enhanced user dashboard
- [ ] Admin statistics dashboard
- [ ] Blog section
- [ ] Newsletter signup
- [ ] Social media integration

---

## 🚀 LAUNCH DAY CHECKLIST

### Pre-Launch (Morning)

**8:00 AM:**
- [ ] Final code review
- [ ] Check all environment variables
- [ ] Verify database connectivity
- [ ] Test Stripe webhooks

**9:00 AM:**
- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Test critical paths (auth, payment, image upload)

**10:00 AM:**
- [ ] Submit sitemap to Google
- [ ] Request indexing for homepage
- [ ] Post launch announcement (social media)
- [ ] Email launch announcement (if have list)

### Post-Launch (Throughout Day)

**Every 2 Hours:**
- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Check analytics (traffic)
- [ ] Test random pages

**End of Day:**
- [ ] Review analytics (visitors, page views)
- [ ] Check for any errors or issues
- [ ] Respond to any user feedback
- [ ] Plan next day activities

---

## 📈 POST-LAUNCH 30-DAY PLAN

### Week 1: Stability & Monitoring
- Monitor error logs daily
- Fix any critical bugs immediately
- Respond to user feedback
- Track key metrics
- Seed 50-100 initial businesses

### Week 2: Content & SEO
- Submit more pages to Google
- Write first blog post (halal food guide)
- Reach out to 20 businesses
- Monitor keyword rankings
- Add more area descriptions

### Week 3: Growth & Marketing
- Launch badge backlink program
- Email businesses about featuring
- Share content on social media
- Guest post on food blogs
- Run small test ad campaign ($50)

### Week 4: Optimization
- Analyze traffic patterns
- Optimize slow pages
- A/B test pricing (if needed)
- Improve conversion funnel
- Plan Month 2 strategy

---

## 🎯 SUCCESS CRITERIA

### Definition of "Production Ready"

The site is considered **production ready** when:

✅ **Functional:**
- All core features work without errors
- Users can sign up, claim businesses, and make payments
- Admin can approve claims and manage content
- Emails send successfully
- Images upload successfully
- Maps display correctly

✅ **Secure:**
- All sensitive pages protected with authentication
- RLS policies prevent unauthorized access
- HTTPS enabled
- No exposed API keys
- Rate limiting implemented

✅ **Legal:**
- Privacy policy published
- Terms of service published
- Cookie policy (if needed)
- Contact information accurate

✅ **Performance:**
- Lighthouse score >90 (mobile)
- Page load time <3 seconds
- No critical errors in console
- Mobile responsive

✅ **SEO:**
- Schema markup on key pages
- Sitemap submitted to Google
- Noindex on private pages
- Meta descriptions on all pages

✅ **Monitoring:**
- Analytics installed
- Error tracking configured
- Uptime monitoring active
- Database backups enabled

### Definition of "Launch Success"

The launch is considered **successful** after 30 days if:

✅ **Traffic:** >500 unique visitors
✅ **Engagement:** >50 user actions (claims, submissions, purchases)
✅ **Revenue:** >$100 from featured listings
✅ **Content:** >100 businesses in directory
✅ **SEO:** >50 pages indexed by Google
✅ **Stability:** <1% error rate, 99.9% uptime

---

## 📝 NOTES & TIPS

### Development Tips
- Use `npm run dev` for local development (port 3000)
- Use Stripe CLI for webhook testing locally
- Test on real mobile devices, not just browser dev tools
- Keep environment variables secure (never commit .env.local)

### Deployment Tips
- Deploy to staging first (use Vercel preview deployments)
- Test all critical flows on staging before production
- Have rollback plan (keep previous deployment ready)
- Monitor error logs for 24-48 hours post-launch

### Marketing Tips
- Focus on SEO first (free, long-term traffic)
- Build email list from day 1
- Engage with halal food community
- Partner with food bloggers and influencers
- Use social proof (testimonials, success stories)

### Growth Tips
- Make it easy for businesses to claim listings
- Offer free featured month for backlink (win-win)
- Respond quickly to user feedback
- Add businesses yourself initially (seed content)
- Focus on user experience (simple, fast, helpful)

---

## 🎉 CONCLUSION

You have a **solid 82% complete foundation** for the Singapore Halal Directory. With focused effort over the next 2-3 weeks (25-35 hours), you can launch a production-ready directory that will serve the Singapore halal community.

### Key Strengths of Your Project:
✅ Modern, scalable tech stack
✅ Comprehensive admin panel
✅ Monetization strategy built-in
✅ Strong SEO foundation
✅ Well-documented codebase

### Path to Launch:
1. **Week 1:** Fix critical gaps (images, maps, legal pages) - 15-20 hours
2. **Week 2:** Set up infrastructure & test thoroughly - 6-10 hours
3. **Week 3:** Deploy, monitor, and iterate - 4-5 hours

### Expected Outcomes in 3 Months:
- **2,000+ monthly visitors** (SEO + marketing)
- **500+ businesses** in directory
- **8-15 featured listings** per month
- **$200-400 monthly revenue**
- **Break-even or profitable**

**The market is ready. The tech is solid. Time to launch! 🚀**

---

**Document Version:** 1.0
**Last Updated:** November 4, 2025
**Next Review:** After Phase 1 Completion

**Questions or Issues?**
Refer to `PROJECT_STATUS.md`, `CLAUDE.md`, or `API_KEYS_SETUP.md` for detailed documentation.

---

