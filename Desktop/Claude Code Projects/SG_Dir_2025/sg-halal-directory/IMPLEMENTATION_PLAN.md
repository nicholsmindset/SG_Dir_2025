# Phase 1 Implementation Plan

**Sprint Goal:** Build foundation for user engagement and business value
**Duration:** Current session + next 2-3 weeks
**Focus:** Reviews, Business Hours, Favorites

---

## Implementation Order (by Priority)

### 🔥 Priority 1: Reviews & Ratings System
**Why First:** Highest impact on engagement, trust, and SEO. Critical missing feature.
**Estimated Time:** 8-12 hours
**Dependencies:** None

**Implementation Steps:**
1. Database migrations for reviews tables
2. TypeScript types for reviews
3. Server actions (CRUD operations)
4. ReviewForm component (submit review)
5. ReviewList component (display reviews)
6. StarRating component (reusable)
7. Review moderation (admin)
8. Email notifications to business owners
9. Review response functionality
10. SEO: Review schema markup

---

### ⚡ Priority 2: Business Hours & Real-Time Status
**Why Second:** Quick win, essential information, relatively simple
**Estimated Time:** 4-6 hours
**Dependencies:** None

**Implementation Steps:**
1. Add business_hours JSONB column to businesses table
2. Create special_hours table for holidays
3. BusinessHoursEditor component
4. OpenNow status calculator (timezone-aware)
5. Display hours on business cards and detail pages
6. Add "Open Now" filter to search

---

### 🎯 Priority 3: User Favorites & Collections
**Why Third:** High engagement driver, creates sticky behavior
**Estimated Time:** 6-8 hours
**Dependencies:** None

**Implementation Steps:**
1. Database migrations for favorites and collections
2. Save/Unsave button component
3. Server actions for favorites
4. User favorites dashboard page
5. Collections manager
6. Public collection sharing
7. Email digest for new reviews on saved businesses

---

## Technical Architecture

### Database Changes

```sql
-- Reviews System
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT,
  photos TEXT[],
  helpful_count INTEGER DEFAULT 0,
  visit_date DATE,
  status TEXT DEFAULT 'approved', -- pending, approved, rejected, flagged
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, user_id)
);

CREATE TABLE review_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  response_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE review_helpfulness (
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  is_helpful BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(review_id, user_id)
);

-- Business Hours
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
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites
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
  UNIQUE(user_id, business_id)
);
```

### Component Structure

```
components/
├── reviews/
│   ├── ReviewForm.tsx          # Submit review form
│   ├── ReviewList.tsx          # Display reviews
│   ├── ReviewCard.tsx          # Individual review
│   ├── StarRating.tsx          # Reusable star rating
│   ├── ReviewResponse.tsx      # Business owner response
│   └── ReviewStats.tsx         # Aggregate stats
├── business/
│   ├── BusinessHours.tsx       # Display hours
│   ├── BusinessHoursEditor.tsx # Edit hours (dashboard)
│   ├── OpenNowBadge.tsx        # Real-time status
│   └── SpecialHoursManager.tsx # Manage holidays
└── favorites/
    ├── SaveButton.tsx          # Heart icon toggle
    ├── FavoritesList.tsx       # User's favorites
    ├── CollectionCard.tsx      # Collection display
    └── CollectionManager.tsx   # Create/edit collections
```

### Server Actions

```typescript
// app/actions/reviews.ts
- submitReview()
- updateReview()
- deleteReview()
- getBusinessReviews()
- markReviewHelpful()
- respondToReview() // Business owners only

// app/actions/favorites.ts
- saveBusiness()
- unsaveBusiness()
- createCollection()
- addToCollection()
- getUserFavorites()
- getPublicCollection()

// app/actions/business-hours.ts
- updateBusinessHours()
- addSpecialHours()
- getBusinessHours()
- isOpenNow()
```

---

## Success Metrics

### Reviews System
- Target: 20% of users leave at least 1 review within 30 days
- Target: Average 3+ reviews per business
- Target: 80% of reviews approved within 24 hours

### Business Hours
- Target: 50% of businesses add hours within first week
- Target: "Open Now" filter used by 30% of searches
- Target: Reduce "wasted trips" complaints

### Favorites
- Target: 40% of users save at least 1 business
- Target: Average 5+ saved businesses per active user
- Target: 10% of users create custom collections

---

## Testing Checklist

### Reviews
- [ ] User can submit review with rating and text
- [ ] User can upload photos with review
- [ ] Only one review per user per business
- [ ] Business owner receives email notification
- [ ] Business owner can respond to review
- [ ] Admin can approve/reject reviews
- [ ] Reviews display on business page sorted by date
- [ ] Average rating updates correctly
- [ ] Review schema markup generates correctly

### Business Hours
- [ ] Business owner can set weekly hours
- [ ] Business owner can add special holiday hours
- [ ] "Open Now" badge displays correctly
- [ ] "Open Now" updates in real-time (refresh)
- [ ] Hours display in correct timezone (Singapore)
- [ ] Closed days show "Closed" status
- [ ] Special hours override regular hours

### Favorites
- [ ] User can save/unsave businesses
- [ ] Save button shows correct state
- [ ] User can view all favorites
- [ ] User can create collections
- [ ] User can add businesses to collections
- [ ] Public collections are shareable
- [ ] Save count displays on business cards

---

## Deployment Plan

### Phase 1 (This Session)
1. Database migrations
2. Core components
3. Server actions
4. Basic UI integration

### Phase 2 (Next Session)
1. Email notifications
2. Admin moderation
3. Advanced features (helpful votes, responses)
4. Polish and bug fixes

### Phase 3 (Testing)
1. End-to-end testing
2. User acceptance testing
3. Performance optimization
4. Production deployment

---

## Notes

- Start with MVP features, iterate based on feedback
- Focus on core functionality before polish
- Ensure RLS policies are secure
- Add proper error handling and validation
- Monitor database performance with new tables

