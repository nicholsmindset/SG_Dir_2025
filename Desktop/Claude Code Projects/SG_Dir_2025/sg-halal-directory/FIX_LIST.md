# SINGAPORE HALAL DIRECTORY - FIX & ENHANCEMENT LIST

**Generated:** November 6, 2025
**Based on:** Comprehensive Application Audit
**Current Status:** 82% Complete (Phase 1 Infrastructure Added)

---

## 🔴 CRITICAL FIXES (Must fix before launch)

### 1. Contact Form Submission Not Working
**File:** `app/contact/page.tsx` (Line 25)
**Issue:** Form has `// TODO: Implement actual form submission` - just simulates with setTimeout
**Impact:** Users can't actually contact you
**Fix:**
- Create server action `submitContactForm()` in `app/actions/contact.ts`
- Send email via Resend API
- Add form validation
- Add success/error states

### 2. Route Name Inconsistency - Broken Links
**Files:** `app/contact/page.tsx`, other pages
**Issue:** Links to `/submit-business` but actual route is `/submit-listing`
**Impact:** Broken link on contact page
**Fix:**
- Search and replace all `/submit-business` references with `/submit-listing`
- Or create redirect from `/submit-business` to `/submit-listing`

### 3. Legal Pages in Wrong Location - 404 Errors
**Files:** Legal pages exist in `/Desktop/.../app/(legal)/` instead of project root
**Issue:** Privacy & Terms links return 404
**Impact:** Legal compliance, trust issues
**Fix:**
- Move `app/(legal)/privacy/page.tsx` to `sg-halal-directory/app/(legal)/privacy/page.tsx`
- Move `app/(legal)/terms/page.tsx` to `sg-halal-directory/app/(legal)/terms/page.tsx`

### 4. Reviews Database Complete But No Display UI
**Files:** Database ✓, Actions ✓, Components ❌
**Issue:** Users can submit reviews (via API) but can't see them anywhere
**Impact:** Reviews exist in database but invisible to users
**Fix:**
- Build `components/reviews/ReviewForm.tsx`
- Build `components/reviews/ReviewCard.tsx`
- Build `components/reviews/ReviewList.tsx`
- Add to `/business/[id]/page.tsx`

### 5. Business Ownership Not Verified on Upgrade
**File:** `app/upgrade/featured/page.tsx`
**Issue:** Form shows for any business without checking if user owns it
**Impact:** Security issue - could pay for someone else's business
**Fix:**
- Add ownership check: `businesses.claimed_by === user.id`
- Show error if not owner
- Redirect to claim flow if needed

---

## 🟡 HIGH PRIORITY (Should fix before launch)

### 6. Favorites/Collections Database Complete But No UI
**Files:** `types/favorites.ts` ✓, `app/actions/favorites.ts` ✓, Components ❌
**Impact:** Users can't see or manage their saved businesses
**Fix:**
- Build `components/favorites/SaveButton.tsx` (heart icon)
- Build `app/dashboard/favorites/page.tsx` (favorites list)
- Build `components/favorites/CollectionManager.tsx`
- Add SaveButton to business cards

### 7. Business Hours Database Complete But No Display
**Files:** `types/business-hours.ts` ✓, `app/actions/business-hours.ts` ✓, Components ❌
**Impact:** Business hours stored but never shown to users
**Fix:**
- Build `components/business-hours/BusinessHours.tsx` (display component)
- Build `components/business-hours/BusinessHoursEditor.tsx` (edit form)
- Build `components/business-hours/OpenNowBadge.tsx` (real-time status)
- Add to `/business/[id]/page.tsx`
- Add to `/dashboard/edit/[id]/page.tsx`

### 8. Review Email Notifications Missing
**File:** `app/actions/reviews.ts` (Line 88)
**Issue:** `// TODO: Send email notification to business owner` comment
**Impact:** Business owners don't know they got reviewed
**Fix:**
- Update `lib/email.ts` with `sendReviewNotification()` function
- Call in `submitReview()` action
- Include review rating, text, link to business page

### 9. No Submit Status Tracking for Users
**Issue:** User submits listing but no way to check approval status
**Impact:** Poor UX - no feedback loop
**Fix:**
- Add "My Submissions" tab to `/dashboard/my-claims/page.tsx`
- Show: Pending submissions, Approved businesses, Rejected (with reason)
- Add status badges and dates

### 10. Forms Lack Loading/Error States
**Files:** All form pages
**Issue:** No spinners during submission, unclear error messages
**Impact:** Users don't know if form is submitting or failed
**Fix:**
- Add `const [loading, setLoading] = useState(false)` to all forms
- Show spinner on submit button
- Add error message state and display
- Add success toast notifications

### 11. Post-Login Redirect Missing
**File:** `app/auth/login/page.tsx`, `middleware.ts`
**Issue:** Middleware supports `redirectTo` param but not consistently used
**Impact:** Users land on dashboard instead of where they wanted to go
**Fix:**
- Pass `redirectTo` query param to login page
- Store in session/cookie
- Redirect after successful auth

### 12. Missing Sitemap & Robots.txt
**Files:** Not created
**Issue:** Poor SEO, search engines can't efficiently crawl
**Impact:** Lower organic traffic
**Fix:**
- Create `app/sitemap.ts` with dynamic generation
- Create `app/robots.ts` with rules
- Include all area pages, business pages, static pages

### 13. Admin Breadcrumbs Missing
**Files:** `/app/admin/*` pages
**Issue:** Admin pages missing breadcrumb navigation
**Impact:** Hard to navigate back in admin panel
**Fix:**
- Add breadcrumb component to admin layout
- Show: Dashboard > [Current Page]

### 14. No Custom 404 Page
**File:** `app/not-found.tsx` (doesn't exist)
**Issue:** Using default Next.js 404 page
**Impact:** Poor branding, missed opportunity for conversion
**Fix:**
- Create `app/not-found.tsx` with branded design
- Add search bar
- Link to popular areas
- Link to submit business

### 15. Image Gallery/Carousel Not Implemented
**Issue:** Business cards show no images, detail pages just show grid
**Impact:** Less engaging, featured listings don't stand out
**Fix:**
- Add image carousel to business detail page
- Add hover preview on business cards
- Use featured businesses' 8-image limit

---

## 🟢 MEDIUM PRIORITY (Enhancements)

### 16. No Profile/Account Settings Page
**Impact:** Users can't update email, name, preferences
**Fix:**
- Create `/dashboard/settings/page.tsx`
- Allow: Name change, email change, notification preferences
- Add "Delete Account" option

### 17. Advanced Search Filters Missing
**File:** `app/search/page.tsx`
**Impact:** Users can only do basic text search
**Fix:**
- Add filter sidebar with:
  - Business type (multi-select)
  - Area (multi-select)
  - Open Now toggle
  - Rating (4+ stars, 3+ stars)
  - Featured only toggle
- Add sort options (relevance, rating, distance, newest)

### 18. No Business Analytics Dashboard
**Issue:** Business owners can't see views, clicks, engagement
**Impact:** Can't demonstrate ROI for featured listings
**Fix:**
- Create `/dashboard/analytics/[business_id]/page.tsx`
- Track: Page views, phone clicks, website clicks, direction requests
- Show: Charts, comparisons, date ranges

### 19. Mobile Responsiveness Testing
**Issue:** Most pages responsive but not tested thoroughly
**Impact:** Potential UX issues on mobile
**Fix:**
- Test all pages on mobile devices
- Fix BusinessMap mobile layout
- Fix admin tables scrolling
- Test forms on mobile

### 20. Accessibility Audit Needed
**Issues:** Missing alt text, no ARIA labels, untested keyboard nav
**Impact:** Inaccessible to users with disabilities
**Fix:**
- Add alt text to all images
- Add ARIA labels to interactive elements
- Test keyboard navigation
- Verify color contrast meets WCAG AA
- Add skip-to-content link

### 21. Performance Optimization
**Issues:** No image lazy loading, map loads full library, no pagination
**Impact:** Slow page loads, poor Core Web Vitals
**Fix:**
- Add Next.js Image optimization
- Lazy load maps
- Add pagination to listings (20 per page)
- Optimize Supabase queries

### 22. No Bulk Admin Actions
**File:** `/app/admin/businesses/page.tsx`, `/app/admin/claims/page.tsx`
**Impact:** Admin has to approve items one by one
**Fix:**
- Add checkboxes to tables
- Add "Approve Selected" button
- Add "Reject Selected" with bulk notes

### 23. No Review Schema Markup
**File:** `app/business/[id]/page.tsx`
**Impact:** Reviews won't show in Google search results
**Fix:**
- Add Review schema to business detail page
- Include rating, author, date, text
- Add AggregateRating schema

### 24. No Email Digest for Favorites
**Issue:** Users can save businesses but don't get updates
**Impact:** Missed opportunity for re-engagement
**Fix:**
- Create weekly/monthly digest email
- Include: New reviews on saved businesses, special offers, new businesses in area
- Add email preference settings

### 25. No Image Optimization Pipeline
**Issue:** Images uploaded at full resolution
**Impact:** Slow load times, high storage costs
**Fix:**
- Add image compression on upload
- Generate thumbnails (small, medium, large)
- Use WebP format with fallback
- Add blur placeholder

---

## 🔵 LOW PRIORITY (Nice to Have)

### 26. No User Badges/Gamification
**Impact:** Missed engagement opportunity
**Fix:**
- Add badges: Top Reviewer, Early Adopter, Explorer (10+ reviews)
- Display on profile
- Show in reviews

### 27. No Social Sharing Optimization
**Impact:** Shares look generic
**Fix:**
- Add Open Graph images for businesses
- Add Twitter Card meta tags
- Generate unique OG images per business

### 28. No Admin Audit Logging
**Impact:** Can't track who made changes
**Fix:**
- Create `audit_logs` table
- Log: User, action, timestamp, changes
- Show in admin dashboard

### 29. No Rate Limiting
**Impact:** Vulnerable to abuse
**Fix:**
- Add rate limiting on API routes
- Limit: Form submissions (5/day), searches (100/hour)
- Use Upstash Redis or similar

### 30. No Saved Searches
**Impact:** Users have to re-search each time
**Fix:**
- Create `saved_searches` table
- Add "Save this search" button
- Add to dashboard
- Optional: Email alerts

---

## 📊 TESTING REQUIREMENTS

### Unit Tests Needed
- [ ] Server actions (reviews, favorites, business-hours)
- [ ] Utility functions (geocoding, time formatting)
- [ ] Type validation

### Integration Tests Needed
- [ ] Business claim flow
- [ ] Featured upgrade flow
- [ ] Admin approval flow
- [ ] Review submission flow

### E2E Tests Needed (Playwright)
- [ ] User signup → claim business → edit → upgrade
- [ ] Public browse → view business → submit review
- [ ] Admin login → approve claim → manage business
- [ ] Search → filter → view results

---

## 🛠️ IMPLEMENTATION PRIORITY ORDER

### Week 1: Critical Fixes (Must Launch With)
1. ✅ Fix contact form submission
2. ✅ Fix route inconsistencies
3. ✅ Move legal pages to correct location
4. ✅ Add business ownership verification
5. ✅ Build Review UI components (Form, Card, List)
6. ✅ Add reviews to business detail page

### Week 2: High Priority UI (Core Features)
7. ✅ Build Favorites/SaveButton components
8. ✅ Build Business Hours display & editor
9. ✅ Add OpenNowBadge to business cards
10. ✅ Implement review email notifications
11. ✅ Add loading/error states to forms
12. ✅ Create custom 404 page

### Week 3: Polish & Enhancement
13. ✅ Add submit status tracking
14. ✅ Fix post-login redirects
15. ✅ Create sitemap & robots.txt
16. ✅ Add admin breadcrumbs
17. ✅ Implement image carousel
18. ✅ Add review schema markup

### Week 4: Testing & Optimization
19. ✅ Mobile responsiveness testing & fixes
20. ✅ Accessibility audit & fixes
21. ✅ Performance optimization (images, lazy loading)
22. ✅ Write E2E tests for critical flows
23. ✅ Security audit (RLS, permissions)

### Future Enhancements (Post-Launch)
24. Profile/account settings
25. Advanced search filters
26. Business analytics dashboard
27. Bulk admin actions
28. Email digests
29. Gamification/badges
30. Admin audit logging

---

## 📈 SUCCESS METRICS TO TRACK

After implementing fixes, monitor:

**User Engagement:**
- % of users who submit reviews
- % of users who save businesses
- Average favorites per user
- Return visitor rate

**Business Owner Engagement:**
- % of businesses with hours added
- % of businesses responding to reviews
- Featured listing conversion rate
- Average response time to reviews

**Technical Health:**
- Page load times (target < 2 seconds)
- Error rate (target < 0.1%)
- Uptime (target 99.9%)
- Mobile usability score (target 95+)

**SEO Performance:**
- Organic search traffic growth
- Pages indexed in Google
- Average position for target keywords
- Click-through rate from search

---

## 📝 NOTES

**Database Migrations:**
- Phase 1 migration ready: `20251104000001_add_reviews_hours_favorites.sql`
- Need to run migration on production database
- Test on staging first
- Backup before migrating

**Environment Variables Needed:**
```env
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_APP_URL=
ADMIN_EMAILS=
```

**Dependencies Already Installed:**
- Supabase client ✓
- Stripe SDK ✓
- Resend email ✓
- Leaflet maps ✓
- Playwright (not configured)

---

**Generated:** November 6, 2025
**Total Issues:** 30 items (5 critical, 10 high, 15 medium/low)
**Estimated Timeline:** 4 weeks to production-ready
**Current Completion:** 82% → Target: 98%
