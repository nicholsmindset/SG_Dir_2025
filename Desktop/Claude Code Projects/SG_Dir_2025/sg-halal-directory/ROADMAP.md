# Singapore Halal Directory - Product Roadmap 2025

**Version:** 1.0
**Last Updated:** November 4, 2025
**Current Platform Completion:** 82%

---

## Executive Summary

This roadmap outlines the strategic feature development plan for the Singapore Halal Directory platform. The focus is on three key objectives:

1. **Customer Stickiness** - Features that increase user engagement and retention
2. **Business Value** - Features that provide more value to business owners
3. **Revenue Growth** - Features that enhance monetization opportunities

The roadmap is organized into **4 phases** spanning 12-18 months, prioritized by impact and implementation complexity.

---

## Current State Analysis

### ✅ Strengths
- Solid authentication system (magic link)
- Robust admin management and approval workflows
- Featured listing monetization ($29/mo, $75/3mo, $140/6mo)
- SEO-optimized with schema markup (LocalBusiness, Organization, FAQPage)
- Geographic search capabilities
- Business claim verification system
- Badge/backlink program for free promotion

### ⚠️ Critical Gaps
- **No reviews/ratings system** - Major engagement driver missing
- **Limited user engagement features** - No favorites, saved searches, or notifications
- **Incomplete image management** - System exists but UI needs polish
- **Basic business profiles** - Missing hours, menus, special offers
- **No analytics for businesses** - Owners can't see performance
- **Limited monetization** - Only featured listings, no sponsored placements or ads
- **No mobile app** - Competing platforms have native apps

---

## Roadmap Overview

| Phase | Timeline | Focus | Key Metrics |
|-------|----------|-------|-------------|
| **Phase 1: Foundation** | Months 1-3 | Complete core features, user engagement | +50% user retention |
| **Phase 2: Engagement** | Months 4-6 | Social features, reviews, analytics | +200% user activity |
| **Phase 3: Monetization** | Months 7-9 | New revenue streams, premium features | +100% revenue |
| **Phase 4: Scale** | Months 10-12 | Mobile app, API, regional expansion | 10x user growth |

---

## Phase 1: Foundation & Core Features (Months 1-3)

**Goal:** Complete partially built features and add essential engagement drivers

### 1.1 Reviews & Ratings System ⭐ **HIGHEST PRIORITY**

**Impact:** 🔥 Critical for engagement and trust

**User Stories:**
- Users can rate businesses (1-5 stars)
- Users can write detailed reviews with photos
- Business owners can respond to reviews
- Reviews appear on business detail pages
- Filter/sort by rating

**Technical Requirements:**
- New `reviews` table: user_id, business_id, rating, review_text, photos[], helpful_count, created_at
- New `review_responses` table: review_id, business_id, response_text, created_at
- RLS policies: Verified users only, one review per business per user
- Email notifications to business owners on new reviews
- Moderation queue for admin (spam detection)
- Star rating aggregate calculation and caching

**Database Schema:**
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  photos TEXT[],
  helpful_count INTEGER DEFAULT 0,
  is_verified_visit BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected, flagged
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, user_id) -- One review per user per business
);

CREATE TABLE review_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id),
  user_id UUID REFERENCES profiles(id),
  response_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE review_helpfulness (
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  is_helpful BOOLEAN,
  PRIMARY KEY(review_id, user_id)
);
```

**Stickiness Factor:** ⭐⭐⭐⭐⭐
Users return to read reviews, write reviews, and track their contributions.

**Revenue Impact:** Medium - Increases trust, drives more business inquiries

---

### 1.2 Complete Image Management System

**Impact:** High - Visual content drives engagement

**Features:**
- Finish ImageUploader component integration
- Drag-and-drop reordering
- Image optimization (WebP, AVIF, compression)
- Lightbox gallery on business pages
- Image moderation queue for admin
- Image credits/attribution

**Technical Requirements:**
- Complete UI integration in `/dashboard/edit/[id]`
- Add image processing pipeline (Sharp library)
- Implement lazy loading with blur placeholders
- Add image CDN configuration (Supabase CDN or Cloudflare)
- Watermark generator for featured businesses (optional)

**Stickiness Factor:** ⭐⭐⭐
Better visual experience keeps users browsing longer.

---

### 1.3 User Saved Favorites & Collections

**Impact:** High - Personal connection to platform

**Features:**
- "Save" button on business cards
- Personal favorites dashboard
- Create custom collections ("Weekend Spots", "Date Night", etc.)
- Share collections via unique URL
- Email digest of new reviews on saved businesses

**Technical Requirements:**
- New `favorites` table: user_id, business_id, collection_name, created_at
- New `collections` table: user_id, name, description, is_public, slug
- Dashboard page: `/dashboard/favorites`
- Public collection pages: `/collections/[slug]`
- Email service integration for digests

**Database Schema:**
```sql
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, business_id, collection_id)
);
```

**Stickiness Factor:** ⭐⭐⭐⭐⭐
Creates personal investment in platform, increases return visits.

**Revenue Impact:** Medium - Engaged users more likely to upgrade businesses they own

---

### 1.4 Business Hours & Real-Time Status

**Impact:** High - Essential information for users

**Features:**
- Opening hours (weekdays, weekends, public holidays)
- Real-time status: Open Now, Closed, Opening Soon
- Holiday hours (Hari Raya, Chinese New Year, etc.)
- Special hours for Ramadan
- "Call to confirm" override option

**Technical Requirements:**
- Add `business_hours` JSON field to businesses table
- Add `special_hours` table for holidays
- Create timezone-aware status calculator
- Display prominently on business cards and detail pages
- Search filter: "Open Now"

**Database Schema:**
```sql
ALTER TABLE businesses ADD COLUMN business_hours JSONB DEFAULT '{
  "monday": {"open": "09:00", "close": "18:00", "closed": false},
  "tuesday": {"open": "09:00", "close": "18:00", "closed": false},
  "wednesday": {"open": "09:00", "close": "18:00", "closed": false},
  "thursday": {"open": "09:00", "close": "18:00", "closed": false},
  "friday": {"open": "09:00", "close": "18:00", "closed": false},
  "saturday": {"open": "10:00", "close": "16:00", "closed": false},
  "sunday": {"open": null, "close": null, "closed": true}
}';

CREATE TABLE special_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  reason TEXT, -- "Hari Raya", "Renovation", etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Stickiness Factor:** ⭐⭐⭐⭐
Reduces frustration, increases trust in platform accuracy.

---

### 1.5 Integrate Maps on Business Pages

**Impact:** Medium - Complete user experience

**Features:**
- Interactive map on business detail page
- "Get Directions" button (Google Maps, Apple Maps)
- Nearby businesses on map
- Distance calculator from user location
- Street view integration (if available)

**Technical Requirements:**
- Add `<BusinessMap />` component to `/business/[id]/page.tsx`
- Add geolocation permission request
- Implement "View on Map" tab
- Add map markers for nearby businesses (same area)
- Add OpenStreetMap tile attribution

**Stickiness Factor:** ⭐⭐⭐
Improves utility, reduces need to switch to other apps.

---

### 1.6 Advanced Search & Filtering

**Impact:** High - Improve discoverability

**Features:**
- **Filters:**
  - Business type (dropdown with counts)
  - Area (multi-select)
  - Open Now
  - Rating (4+ stars, 3+ stars)
  - Featured only
  - Distance from location
  - Price range ($ - $$$)
- **Sort Options:**
  - Relevance (default)
  - Rating (high to low)
  - Distance (near to far)
  - Most reviewed
  - Recently added
- **Search Suggestions:** Autocomplete with business names
- **Recent Searches:** Save last 5 searches

**Technical Requirements:**
- Upgrade search page UI with filter sidebar
- Add full-text search indexes on PostgreSQL
- Implement search analytics tracking
- Add SearchAction schema markup
- Save search history in localStorage
- Add "Save this search" feature (email alerts)

**Database Schema:**
```sql
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  filters JSONB, -- {area: ['bugis'], type: 'restaurant', rating_min: 4}
  email_alerts BOOLEAN DEFAULT false,
  alert_frequency TEXT, -- 'daily', 'weekly', 'monthly'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_businesses_search ON businesses USING gin(to_tsvector('english', name || ' ' || description));
```

**Stickiness Factor:** ⭐⭐⭐⭐
Makes platform essential for discovery, users return for specific needs.

---

## Phase 2: Engagement & Social Features (Months 4-6)

**Goal:** Transform from directory to community platform

### 2.1 Business Owner Analytics Dashboard ⭐ **HIGH PRIORITY**

**Impact:** 🔥 Critical for business retention

**Features:**
- **Metrics Dashboard:**
  - Page views (daily, weekly, monthly)
  - Click-to-call count
  - Website clicks
  - Direction requests
  - Favorites count
  - Review summary (avg rating, total reviews)
  - Featured listing ROI
- **Insights:**
  - Traffic sources (search, direct, social)
  - Peak viewing times
  - Comparison to similar businesses
  - Search keywords that led to profile
- **Export Reports:** PDF, CSV
- **Email Summaries:** Weekly/monthly reports

**Technical Requirements:**
- New `business_analytics` table: event tracking
- New `analytics_summary` materialized view for performance
- Dashboard page: `/dashboard/analytics/[business_id]`
- Analytics API endpoints for chart data
- Email service for reports
- Chart library (Recharts or Chart.js)

**Database Schema:**
```sql
CREATE TABLE business_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'page_view', 'phone_click', 'website_click', 'direction_click'
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_business_date ON business_analytics(business_id, created_at DESC);
CREATE INDEX idx_analytics_event_type ON business_analytics(event_type);

-- Materialized view for fast dashboard loading
CREATE MATERIALIZED VIEW business_analytics_summary AS
SELECT
  business_id,
  DATE_TRUNC('day', created_at) as date,
  event_type,
  COUNT(*) as count,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT session_id) as unique_sessions
FROM business_analytics
GROUP BY business_id, date, event_type;

CREATE UNIQUE INDEX ON business_analytics_summary(business_id, date, event_type);
```

**Stickiness Factor:** ⭐⭐⭐⭐⭐
Business owners check analytics regularly, increases perceived value.

**Revenue Impact:** High - Demonstrates ROI, justifies featured listing upgrades

---

### 2.2 Direct Messaging / Contact Form

**Impact:** High - Facilitates business inquiries

**Features:**
- Contact form on business page (for non-claimed businesses)
- Direct messaging for claimed businesses
- Inquiry types: General, Reservation, Catering, Partnership
- Email notifications to business owners
- Spam protection (reCAPTCHA or Turnstile)
- Message history for users

**Technical Requirements:**
- New `inquiries` table: user_id, business_id, message, inquiry_type, status
- Email service integration
- Spam detection (Akismet or similar)
- Dashboard inbox: `/dashboard/inquiries`
- Rate limiting: Max 5 inquiries per day per user

**Database Schema:**
```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT,
  inquiry_type TEXT, -- 'general', 'reservation', 'catering', 'partnership'
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- new, read, replied, closed
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Stickiness Factor:** ⭐⭐⭐⭐
Creates two-way interaction, increases platform utility.

**Revenue Impact:** Medium - More inquiries = more value for businesses = more upgrades

---

### 2.3 Special Offers & Promotions

**Impact:** High - Drives repeat visits

**Features:**
- Business owners can post limited-time offers
- Offer types: Discount %, Free item, Bundle deal
- Display on business card and detail page
- "Deals Near Me" filter
- "Save Offer" to favorites
- Email alerts for saved business offers
- Expiry dates and redemption limits

**Technical Requirements:**
- New `offers` table: business_id, title, description, discount_type, start_date, end_date
- Featured businesses get unlimited offers
- Standard businesses: 1 active offer at a time (upgrade incentive)
- Dashboard page: `/dashboard/offers`
- Public offers page: `/deals`

**Database Schema:**
```sql
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  offer_type TEXT, -- 'percentage', 'fixed_amount', 'free_item', 'bundle'
  discount_value NUMERIC,
  terms_conditions TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  redemption_limit INTEGER,
  redemptions_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_offers_active ON offers(business_id, is_active, end_date);
```

**Stickiness Factor:** ⭐⭐⭐⭐⭐
Users check daily for new deals, creates urgency.

**Revenue Impact:** High - Exclusive offers for featured businesses = upgrade incentive

---

### 2.4 Social Sharing & Viral Features

**Impact:** Medium - Organic growth

**Features:**
- Share buttons (WhatsApp, Telegram, Facebook, Twitter/X)
- "Share your review" after posting
- Share collections publicly
- Referral program: "Invite friends, get rewards"
- Social proof: "1,234 people saved this business"
- Open Graph meta tags for rich previews

**Technical Requirements:**
- Add Open Graph and Twitter Card meta tags
- Implement referral tracking system
- New `referrals` table: referrer_id, referred_user_id, reward_type
- Social share tracking analytics
- Viral coefficient monitoring

**Database Schema:**
```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  referred_email TEXT,
  referred_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending', -- pending, signed_up, qualified
  reward_type TEXT, -- 'free_featured_month', 'credit', 'badge'
  reward_value NUMERIC,
  reward_claimed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Stickiness Factor:** ⭐⭐⭐
Users invite friends, expanding network effect.

**Revenue Impact:** Medium - Referral rewards can include free featured listing trials

---

### 2.5 User Profiles & Activity Feed

**Impact:** Medium - Personalization

**Features:**
- Public user profiles (optional)
- Activity feed: Reviews written, collections created, badges earned
- User stats: Review count, helpful votes, collections
- Follow other users (curators)
- Leaderboard: Top reviewers, most helpful
- Profile customization: Bio, avatar, social links

**Technical Requirements:**
- Enhance `profiles` table with bio, avatar_url, is_public
- New `user_follows` table
- New `user_badges` table: "Top Reviewer", "Early Adopter", "Explorer" (10+ reviews)
- Profile page: `/profile/[username]`
- Activity feed API
- Gamification system

**Database Schema:**
```sql
ALTER TABLE profiles ADD COLUMN username TEXT UNIQUE;
ALTER TABLE profiles ADD COLUMN bio TEXT;
ALTER TABLE profiles ADD COLUMN avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN is_public BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN total_reviews INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN helpful_votes INTEGER DEFAULT 0;

CREATE TABLE user_follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(follower_id, following_id)
);

CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL, -- 'top_reviewer', 'early_adopter', 'explorer'
  badge_tier TEXT, -- 'bronze', 'silver', 'gold', 'platinum'
  earned_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Stickiness Factor:** ⭐⭐⭐⭐
Recognition and status increase engagement and retention.

---

### 2.6 Menu/Catalog Upload for Restaurants

**Impact:** High - Differentiation from competitors

**Features:**
- Upload menu PDFs or images
- Structured menu builder (categories, items, prices)
- Display on business page
- Search by menu item ("Find restaurants with nasi briyani")
- Dietary filters: Gluten-free, vegetarian, spicy

**Technical Requirements:**
- New `menu_items` table: business_id, category, name, description, price, image_url
- File upload for PDF menus (Supabase Storage)
- OCR integration for menu scanning (optional)
- Menu search indexes
- Dashboard page: `/dashboard/menu/[business_id]`

**Database Schema:**
```sql
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  image_url TEXT,
  dietary_tags TEXT[], -- ['vegetarian', 'gluten-free', 'spicy']
  is_available BOOLEAN DEFAULT true,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menu_items_search ON menu_items USING gin(to_tsvector('english', name || ' ' || description));
```

**Stickiness Factor:** ⭐⭐⭐⭐
Users browse menus, reducing need to visit multiple sites.

**Revenue Impact:** High - Premium feature for featured businesses only

---

## Phase 3: Monetization & Premium Features (Months 7-9)

**Goal:** Diversify revenue streams, increase ARPU

### 3.1 Sponsored Search Placements ⭐ **NEW REVENUE STREAM**

**Impact:** 🔥 High revenue potential

**Features:**
- Businesses can bid for top placement in search results
- "Sponsored" label on cards
- CPC (Cost Per Click) or CPM (Cost Per 1000 Impressions) model
- Budget management dashboard
- Geo-targeting: Show ads in specific areas
- Keyword targeting: Bid on search terms

**Technical Requirements:**
- New `sponsored_campaigns` table: business_id, budget, daily_limit, cpc_bid, status
- New `sponsored_clicks` table: campaign_id, user_id, cost, created_at
- Ad auction algorithm (simple highest bid to start)
- Admin dashboard for campaign approval
- Billing system integration with Stripe

**Database Schema:**
```sql
CREATE TABLE sponsored_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  daily_budget NUMERIC(10,2),
  total_budget NUMERIC(10,2),
  spent_amount NUMERIC(10,2) DEFAULT 0,
  cpc_bid NUMERIC(10,2), -- Cost per click in SGD
  target_keywords TEXT[],
  target_areas UUID[], -- Array of area IDs
  status TEXT DEFAULT 'pending', -- pending, active, paused, ended
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sponsored_impressions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES sponsored_campaigns(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  search_query TEXT,
  position INTEGER, -- Ad position (1-3)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sponsored_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES sponsored_campaigns(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  impression_id UUID REFERENCES sponsored_impressions(id),
  cost NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Revenue Model:**
- Minimum daily budget: $10 SGD
- Suggested CPC: $0.50 - $2.00 SGD
- Platform fee: 20% of ad spend
- Self-serve ad platform (admin approval required initially)

**Revenue Impact:** 🔥🔥🔥 High - New revenue stream, scalable with traffic

---

### 3.2 Premium Business Profiles (Tiered System)

**Impact:** High - Upsell existing customers

**Current:**
- Standard: Free (1 image, basic info)
- Featured: $29/mo (priority placement, 8 images)

**New Tiers:**
```
╔══════════════════════════════════════════════════════════════╗
║  FREE          ║  FEATURED ($29)  ║  PREMIUM ($79)  ║  ELITE ($149)  ║
╠══════════════════════════════════════════════════════════════╣
║  1 image       ║  8 images        ║  20 images      ║  50 images     ║
║  Basic info    ║  Priority sort   ║  Video tour     ║  360° tour     ║
║  -             ║  Featured badge  ║  Premium badge  ║  Elite badge   ║
║  -             ║  -               ║  Menu upload    ║  Menu + prices ║
║  -             ║  -               ║  3 offers/mo    ║  Unlimited     ║
║  -             ║  -               ║  -              ║  Analytics+    ║
║  -             ║  -               ║  -              ║  API access    ║
║  -             ║  -               ║  -              ║  Priority support ║
╚══════════════════════════════════════════════════════════════╝
```

**Technical Requirements:**
- Update `businesses` table with `tier` field (free, featured, premium, elite)
- Update Stripe pricing configuration
- Add feature gates in codebase
- Update dashboard UI to show tier limits
- Upsell modals when hitting limits

**Revenue Impact:** 🔥🔥 High - 3x increase in max ARPU

---

### 3.3 Lead Generation Form (For Service Businesses)

**Impact:** Medium - New value prop for certain business types

**Features:**
- Embedded lead capture form on business pages
- Custom form fields (Name, Email, Phone, Service Type, Date Needed)
- Business owner receives email alerts
- Dashboard to manage leads: `/dashboard/leads`
- Lead scoring and qualification
- Export leads to CSV
- Integration with CRMs (Zapier webhook)

**Technical Requirements:**
- New `leads` table: business_id, form_data JSONB, status, score
- Form builder UI for business owners
- Email notifications
- Lead management dashboard
- Rate limiting: Max 10 leads per day per user (spam prevention)

**Database Schema:**
```sql
CREATE TABLE lead_forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  form_fields JSONB NOT NULL, -- [{"name": "email", "label": "Email", "type": "email", "required": true}]
  success_message TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  form_data JSONB NOT NULL, -- {"name": "John Doe", "email": "john@example.com", ...}
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'new', -- new, contacted, qualified, converted, lost
  score INTEGER, -- Lead scoring 0-100
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Revenue Impact:** Medium - Premium/Elite feature only

---

### 3.4 Booking/Reservation Integration

**Impact:** High - High-value feature for restaurants

**Features:**
- Partner with booking platforms (Chope, OpenTable, etc.)
- Or build simple internal booking system
- Table availability calendar
- Real-time booking confirmation
- SMS/Email reminders
- No-show tracking
- Waitlist management

**Technical Requirements:**
- New `reservations` table if built internally
- Calendar UI component
- SMS service integration (Twilio)
- Email service integration
- Admin dashboard for restaurant staff

**Revenue Model:**
- Premium/Elite feature: Unlimited bookings
- Featured tier: Commission per booking ($1-2 per reservation)
- OR subscription add-on: $29/month for booking system

**Revenue Impact:** Medium-High - Could be premium add-on

---

### 3.5 Advertising Network (Display Ads)

**Impact:** Medium - Passive revenue

**Features:**
- Banner ad slots on high-traffic pages (homepage, search results)
- Sidebar ads on business pages
- Native ads in listings (every 5th result)
- Self-serve ad platform for local businesses
- CPM and CPC models
- Ad creative guidelines and approval

**Technical Requirements:**
- Ad server infrastructure or use Google AdSense/Ezoic
- Ad placement components
- Impression and click tracking
- Admin dashboard for ad management
- Ad blocker detection (polite message)

**Revenue Model:**
- Display ads: $2-5 CPM
- Native ads: $0.50-1.00 CPC
- Direct sales to local businesses

**Revenue Impact:** Medium - Scales with traffic, passive income

---

### 3.6 Agency & Bulk Packages

**Impact:** Medium - Higher contract values

**Features:**
- Multi-location management for chains
- Centralized billing for multiple businesses
- Agency dashboard with client switching
- White-label reporting for agencies
- Volume discounts (10+ locations = 20% off)
- Dedicated account manager (for $500+/month contracts)

**Technical Requirements:**
- New `agencies` table: name, contact, billing_info
- New `agency_clients` junction table
- Role: Agency Admin (can manage multiple businesses)
- Agency dashboard: `/agency/dashboard`
- Bulk operations (update hours, post offers across all locations)

**Database Schema:**
```sql
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  billing_email TEXT,
  discount_percentage NUMERIC(5,2), -- Volume discount
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE agency_clients (
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  PRIMARY KEY(agency_id, business_id)
);

ALTER TABLE profiles ADD COLUMN agency_id UUID REFERENCES agencies(id);
ALTER TABLE profiles ADD COLUMN is_agency_admin BOOLEAN DEFAULT false;
```

**Revenue Impact:** High - Larger contracts, more predictable revenue

---

## Phase 4: Scale & Mobile (Months 10-12)

**Goal:** 10x user growth, expand to mobile, enable integrations

### 4.1 Mobile App (iOS & Android) ⭐ **MAJOR MILESTONE**

**Impact:** 🔥 Critical for mainstream adoption

**Features:**
- Native apps for iOS and Android
- Push notifications for:
  - New reviews on saved businesses
  - Special offers near your location
  - New businesses in your area
  - Response to your reviews
- Location-based features:
  - "Near Me" mode with live map
  - AR view (point camera, see nearby businesses)
  - Geofence triggers (get offer when near business)
- Offline mode: Cache saved businesses
- Camera integration: Take photos for reviews
- One-tap call/directions
- Biometric login
- App-exclusive offers

**Technical Stack:**
- React Native (for code sharing)
- OR Flutter (if preferred)
- OR Progressive Web App (PWA) as intermediate step
- Push notifications: Firebase Cloud Messaging
- Deep linking: Open specific businesses from URLs
- Analytics: Firebase Analytics + Mixpanel

**Development Approach:**
1. Start with **PWA** (Month 10) - Faster to market
2. Build **React Native app** (Months 11-12) - Better UX
3. Submit to App Store & Google Play

**Revenue Impact:** High - Increases engagement, enables push notification marketing

**Stickiness Factor:** ⭐⭐⭐⭐⭐
Mobile apps have 3x higher retention than mobile web.

---

### 4.2 API for Third-Party Integrations

**Impact:** Medium - Platform effect

**Features:**
- Public API for approved partners
- Use cases:
  - Food delivery apps (GrabFood, Foodpanda) can pull business data
  - Mapping apps can show halal businesses
  - Travel apps can feature halal-friendly destinations
  - Affiliate sites can embed business cards
- REST API with rate limits
- API key management
- Webhook subscriptions for new businesses
- Developer documentation and sandbox

**Technical Requirements:**
- API gateway (use Supabase PostgREST or build custom with Next.js)
- Rate limiting: 1000 requests/hour for free tier
- API key generation and management
- Usage analytics dashboard
- Swagger/OpenAPI documentation

**Endpoints:**
```
GET /api/v1/businesses?area={area_id}&type={type}&featured=true
GET /api/v1/businesses/{id}
GET /api/v1/areas
GET /api/v1/search?q={query}
GET /api/v1/reviews?business_id={id}
POST /api/v1/leads (for partner integrations)
```

**Revenue Model:**
- Free tier: 1000 req/hour
- Pro tier: $99/mo - 10,000 req/hour
- Enterprise: Custom pricing - Unlimited + SLA

**Revenue Impact:** Medium - New revenue stream from partners

---

### 4.3 Multi-Language Support

**Impact:** High - Expand addressable market

**Languages:**
1. English (primary)
2. Malay (second official language)
3. Chinese (Mandarin, Simplified)
4. Tamil (Indian community)

**Features:**
- Language switcher in header
- Translated UI strings
- Business descriptions in multiple languages (optional)
- Auto-translate reviews (Google Translate API)
- SEO: Localized URLs and sitemaps

**Technical Requirements:**
- i18n library (next-intl or react-i18next)
- Translation files (JSON or database)
- Language detection from browser
- Professional translation service for accuracy
- Update schema markup with @language property

**Stickiness Factor:** ⭐⭐⭐⭐
Reaches non-English speaking users, increases addressable market by 3x.

---

### 4.4 Event Listings & Community Features

**Impact:** Medium - Additional value prop

**Features:**
- Halal food festivals, bazaars, pop-up markets
- Business-hosted events (cooking classes, tastings)
- Event calendar with map view
- RSVP system
- Ticket sales integration (Eventbrite, Peatix)
- Event photos and recaps
- Email newsletter: "This week's halal events"

**Technical Requirements:**
- New `events` table: business_id, title, description, start_date, location, ticket_url
- Event RSVP system
- Calendar view with filters
- Public events page: `/events`
- Email newsletter service

**Database Schema:**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
  organizer_name TEXT,
  organizer_email TEXT,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT, -- 'festival', 'popup', 'class', 'tasting', 'market'
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location_name TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  ticket_url TEXT,
  is_free BOOLEAN DEFAULT true,
  max_attendees INTEGER,
  image_url TEXT,
  status TEXT DEFAULT 'upcoming', -- upcoming, ongoing, ended, cancelled
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_rsvps (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'going', -- going, interested, not_going
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(event_id, user_id)
);
```

**Stickiness Factor:** ⭐⭐⭐⭐
Creates reason to check platform weekly, builds community.

**Revenue Impact:** Medium - Featured businesses can promote events

---

### 4.5 Blog & Content Marketing Platform

**Impact:** Medium - SEO and authority building

**Features:**
- Blog CMS for admin
- Article categories: Guides, News, Food Reviews, Halal Certification Explainers
- Author profiles (guest contributors)
- Comments on articles
- SEO-optimized articles with Article schema markup
- Email newsletter: Weekly digest
- Social sharing

**Technical Requirements:**
- New `blog_posts` table: title, slug, content, author_id, category
- Rich text editor (TipTap or Lexical)
- Admin page: `/admin/blog`
- Public blog: `/blog` with pagination
- RSS feed
- Email newsletter integration

**SEO Strategy:**
- Target long-tail keywords: "best halal restaurants in Bugis", "halal certification guide Singapore"
- Internal linking to business pages
- Build backlinks and domain authority
- Guest posts from food bloggers

**Stickiness Factor:** ⭐⭐⭐
Organic traffic discovery, email newsletter builds audience.

**Revenue Impact:** Low - Indirect via SEO and brand authority

---

### 4.6 White-Label Licensing

**Impact:** High - Expand to other markets/niches

**Features:**
- License platform to other markets:
  - Malaysia Halal Directory
  - Indonesia Halal Directory
  - Kosher directory (different niche, same platform)
  - Vegan restaurant directory
- Customizable branding (logo, colors, domain)
- Separate databases per client
- Multi-tenant architecture
- Setup fee + monthly licensing revenue

**Technical Requirements:**
- Multi-tenancy architecture (separate databases or tenant column)
- Tenant-specific configuration (env vars, themes)
- Admin super-dashboard to manage tenants
- White-label documentation and onboarding

**Revenue Model:**
- Setup fee: $5,000 - $10,000
- Monthly license: $500 - $1,000 per tenant
- OR revenue share: 20% of tenant's revenue

**Revenue Impact:** 🔥🔥 Very High - New markets without marketing spend

---

## Quick Wins (Can Be Done Anytime)

These features can be implemented in parallel during any phase:

### QW1. Email Newsletter System
- Weekly digest: New businesses, featured offers, top reviews
- Segmentation: By area preference, business types
- Resend integration (already have)
- Unsubscribe management
- **Impact:** Increases return visits by 30-50%

### QW2. Badge Program Automation
- Currently manual backlink verification
- Build cron job to auto-verify backlinks weekly
- Auto-grant featured listing month when verified
- Email reminders if backlink removed
- **Impact:** Increases badge program participation

### QW3. SEO Enhancements
- Add SearchAction schema markup
- Generate XML sitemap (next-sitemap)
- Implement structured data testing
- Add breadcrumbs to all pages
- Meta description optimization
- **Impact:** 20-30% organic traffic increase

### QW4. Performance Optimization
- Image lazy loading with blur placeholders
- Implement Redis caching for area pages
- Optimize database queries with indexes
- Code splitting and bundle optimization
- **Impact:** Faster load times = better SEO + UX

### QW5. Admin Tools Enhancements
- Bulk import businesses from CSV
- Duplicate detection (fuzzy matching on name + address)
- Bulk email to all business owners
- Scheduled announcements banner
- **Impact:** Reduces admin time, scales operations

---

## Technical Debt & Infrastructure

### Security
- [ ] Implement rate limiting on all public endpoints
- [ ] Add CAPTCHA on forms (Cloudflare Turnstile)
- [ ] Regular security audits (Snyk, Dependabot)
- [ ] SQL injection prevention audit
- [ ] CSRF token validation
- [ ] Content Security Policy (CSP) headers

### Monitoring & Observability
- [ ] Error tracking (Sentry or Rollbar)
- [ ] Application performance monitoring (New Relic, Datadog)
- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Database performance monitoring
- [ ] Alert system for critical errors

### Scalability
- [ ] Database connection pooling optimization
- [ ] Implement Redis for caching and sessions
- [ ] CDN for static assets (Cloudflare)
- [ ] Database read replicas for reporting
- [ ] Load testing and benchmarking

### Testing
- [ ] Finish Playwright E2E test suite
- [ ] Unit tests for critical functions
- [ ] Integration tests for API endpoints
- [ ] Visual regression testing
- [ ] CI/CD pipeline with automated tests

---

## Success Metrics & KPIs

### User Engagement
- **Monthly Active Users (MAU):** Target 50,000 by end of Phase 4
- **Daily Active Users (DAU):** Target DAU/MAU ratio of 20%
- **Session Duration:** Target 5+ minutes average
- **Pages per Session:** Target 4+ pages
- **Return Visitor Rate:** Target 40%+
- **Review Submission Rate:** Target 5% of users write at least 1 review
- **Favorite Save Rate:** Target 30% of users save at least 1 business

### Business Value
- **Businesses Listed:** Target 5,000+ (current claim)
- **Claimed Businesses:** Target 30% of total listings
- **Business Owner Active Rate:** Target 60% log in monthly
- **Average Review Response Time:** Target <24 hours
- **Business Profile Completion Rate:** Target 80% complete profiles

### Revenue Metrics
- **Monthly Recurring Revenue (MRR):** Target $10,000 by Phase 2, $50,000 by Phase 4
- **Average Revenue Per User (ARPU):** Target $30/month per paying customer
- **Customer Acquisition Cost (CAC):** Target <$50
- **Lifetime Value (LTV):** Target LTV/CAC ratio of 3:1
- **Churn Rate:** Target <5% monthly churn
- **Conversion Rate (Free → Paid):** Target 10% of claimed businesses upgrade

### Platform Health
- **Page Load Time:** Target <2 seconds (75th percentile)
- **Uptime:** Target 99.9% uptime
- **API Response Time:** Target <200ms average
- **Mobile Traffic:** Target 60% of traffic from mobile
- **Organic Search Traffic:** Target 40% of traffic from SEO

---

## Prioritization Framework

Use this framework to decide which features to build first:

| Feature | Impact | Effort | Priority Score (Impact/Effort) |
|---------|--------|--------|-------------------------------|
| Reviews & Ratings | 10 | 5 | 🔥 2.0 (CRITICAL) |
| Business Analytics | 9 | 4 | 🔥 2.25 (CRITICAL) |
| Favorites & Collections | 9 | 3 | 🔥 3.0 (CRITICAL) |
| Business Hours | 8 | 2 | 🔥 4.0 (QUICK WIN) |
| Complete Image Upload | 7 | 3 | 🟡 2.3 (HIGH) |
| Advanced Search | 8 | 4 | 🟡 2.0 (HIGH) |
| Special Offers | 9 | 4 | 🟡 2.25 (HIGH) |
| Sponsored Search | 10 | 7 | 🟡 1.4 (MEDIUM) |
| Mobile App | 10 | 10 | 🟡 1.0 (STRATEGIC) |

**Priority Tiers:**
- **🔥 Critical (Score 2.0+):** Do first, highest ROI
- **🟡 High (Score 1.5-2.0):** Do next
- **🟢 Medium (Score 1.0-1.5):** Nice to have
- **⚪ Low (Score <1.0):** Defer or skip

---

## Competitive Analysis

### Key Competitors in Singapore:
1. **Halal Tag** - Focus on social features
2. **HalalSG** - Government-backed certification database
3. **Burpple** - General restaurant discovery with halal filter
4. **Google Maps** - Universal platform with halal search

### Our Differentiation:
- ✅ **Niche Focus:** 100% halal, trusted certification verification
- ✅ **Monetization for Businesses:** Featured listings, not just ads
- ✅ **Community-Driven:** Reviews, collections, user curation
- ✅ **SEO-First:** Programmatic area pages, schema markup
- ✅ **Business Tools:** Analytics, offers, messaging built-in
- 🔄 **To Build:** Mobile app, advanced search, more social features

---

## Go-to-Market Strategy

### Phase 1-2: Foundation (Months 1-6)
**Goal:** 1,000 active users, 100 paying businesses

**Tactics:**
1. **Content Marketing:** Publish 20+ SEO-optimized blog posts
2. **Social Media:** Instagram, TikTok featuring halal food spots
3. **Influencer Outreach:** Partner with 10 food bloggers
4. **Business Outreach:** Email 500 businesses, offer free featured month
5. **Community Building:** Create Facebook group "Singapore Halal Foodies"

### Phase 3: Monetization (Months 7-9)
**Goal:** $10,000 MRR, 2,000 active users

**Tactics:**
1. **Paid Ads:** Google Ads for "halal restaurants Singapore"
2. **Referral Program:** Launch with $29 credit for both parties
3. **Partnerships:** Partner with food delivery apps
4. **Events:** Sponsor halal food festivals
5. **PR Campaign:** Press releases in local media

### Phase 4: Scale (Months 10-12)
**Goal:** $50,000 MRR, 10,000 active users

**Tactics:**
1. **Mobile App Launch:** PR blitz, app store optimization
2. **Expansion:** Launch Malaysia and Indonesia versions
3. **API Partners:** Integrate with 5 major platforms
4. **Enterprise Sales:** Dedicated sales team for agency packages
5. **Community Events:** Host quarterly halal food awards

---

## Budget Estimates

### Phase 1: Foundation ($15,000 - $25,000)
- Development: $10,000 - $15,000
- Design: $2,000 - $3,000
- Infrastructure: $1,000/mo
- Marketing: $2,000 - $5,000

### Phase 2: Engagement ($20,000 - $35,000)
- Development: $15,000 - $25,000
- Infrastructure: $2,000/mo
- Marketing: $5,000 - $10,000

### Phase 3: Monetization ($25,000 - $40,000)
- Development: $15,000 - $25,000
- Sales & Marketing: $10,000 - $15,000
- Infrastructure: $3,000/mo

### Phase 4: Scale ($50,000 - $100,000)
- Mobile App Development: $30,000 - $60,000
- Infrastructure: $5,000/mo
- Marketing & Growth: $20,000 - $40,000

**Total 12-Month Budget: $110,000 - $200,000**

**Expected ROI:** $600,000 - $1,200,000 ARR (Annual Recurring Revenue) by end of Phase 4

---

## Risk Mitigation

### Technical Risks
- **Risk:** Database performance issues at scale
  - **Mitigation:** Implement caching, read replicas, query optimization early

- **Risk:** Image storage costs balloon
  - **Mitigation:** Implement image compression, set limits, use CDN

### Business Risks
- **Risk:** Low business adoption
  - **Mitigation:** Free trial periods, success stories, dedicated onboarding

- **Risk:** Review spam and abuse
  - **Mitigation:** Verification requirements, moderation tools, rate limiting

- **Risk:** Competition from larger platforms
  - **Mitigation:** Focus on niche expertise, community, superior business tools

### Market Risks
- **Risk:** Market size too small
  - **Mitigation:** Expand to other markets (Malaysia, Indonesia), white-label model

---

## Conclusion

This roadmap provides a clear path to transforming the Singapore Halal Directory from a functional listing platform (82% complete) to a comprehensive ecosystem that serves both users and businesses.

**Key Themes:**
1. **Phase 1-2:** Build engagement features (reviews, favorites, analytics)
2. **Phase 3:** Diversify revenue (sponsored search, tiered pricing, ads)
3. **Phase 4:** Scale to mobile, API, and new markets

**Expected Outcomes (12-18 months):**
- ✅ 10,000+ monthly active users
- ✅ $50,000+ monthly recurring revenue
- ✅ 300+ paying business customers
- ✅ Market leader in Singapore halal directory space
- ✅ Expansion-ready platform for regional growth

**Next Steps:**
1. Review and approve roadmap priorities
2. Finalize Phase 1 feature specs
3. Begin development on Reviews & Ratings system
4. Set up analytics tracking for baseline metrics
5. Create project board with milestones

---

**Document Version:** 1.0
**Created:** November 4, 2025
**Next Review:** End of Phase 1 (Month 3)

