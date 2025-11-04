-- Singapore Halal Directory - Phase 1 Features
-- This migration adds: Reviews, Business Hours, and Favorites functionality

-- ============================================================================
-- REVIEWS SYSTEM
-- Enable users to rate and review businesses
-- ============================================================================

-- Main reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  photos TEXT[], -- Array of image URLs
  helpful_count INTEGER DEFAULT 0,
  visit_date DATE,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, user_id) -- One review per user per business
);

-- Review responses from business owners
CREATE TABLE review_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id), -- Business owner
  response_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track helpful votes on reviews
CREATE TABLE review_helpfulness (
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(review_id, user_id)
);

-- Indexes for reviews
CREATE INDEX idx_reviews_business ON reviews(business_id, created_at DESC);
CREATE INDEX idx_reviews_user ON reviews(user_id, created_at DESC);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_review_responses_review ON review_responses(review_id);

-- ============================================================================
-- BUSINESS HOURS
-- Store operating hours for businesses
-- ============================================================================

-- Add business_hours column to businesses table
ALTER TABLE businesses ADD COLUMN business_hours JSONB DEFAULT '{
  "monday": {"open": "09:00", "close": "18:00", "closed": false},
  "tuesday": {"open": "09:00", "close": "18:00", "closed": false},
  "wednesday": {"open": "09:00", "close": "18:00", "closed": false},
  "thursday": {"open": "09:00", "close": "18:00", "closed": false},
  "friday": {"open": "09:00", "close": "18:00", "closed": false},
  "saturday": {"open": "10:00", "close": "16:00", "closed": false},
  "sunday": {"open": null, "close": null, "closed": true}
}';

-- Special hours for holidays and exceptions
CREATE TABLE special_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  reason TEXT, -- "Hari Raya", "Renovation", etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for special hours lookups
CREATE INDEX idx_special_hours_business_date ON special_hours(business_id, date);

-- ============================================================================
-- FAVORITES & COLLECTIONS
-- Allow users to save businesses and organize them
-- ============================================================================

-- User collections
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User favorites
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, business_id) -- Can only favorite a business once
);

-- Indexes for favorites and collections
CREATE INDEX idx_favorites_user ON favorites(user_id, created_at DESC);
CREATE INDEX idx_favorites_business ON favorites(business_id);
CREATE INDEX idx_favorites_collection ON favorites(collection_id);
CREATE INDEX idx_collections_user ON collections(user_id);
CREATE INDEX idx_collections_slug ON collections(slug);
CREATE INDEX idx_collections_public ON collections(is_public) WHERE is_public = true;

-- ============================================================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ============================================================================

-- Update updated_at timestamp for reviews
CREATE OR REPLACE FUNCTION update_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_reviews_updated_at();

-- Update updated_at timestamp for review_responses
CREATE TRIGGER trigger_update_review_responses_updated_at
  BEFORE UPDATE ON review_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_reviews_updated_at();

-- Update updated_at timestamp for special_hours
CREATE TRIGGER trigger_update_special_hours_updated_at
  BEFORE UPDATE ON special_hours
  FOR EACH ROW
  EXECUTE FUNCTION update_reviews_updated_at();

-- Update updated_at timestamp for collections
CREATE TRIGGER trigger_update_collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW
  EXECUTE FUNCTION update_reviews_updated_at();

-- ============================================================================
-- TRIGGER TO UPDATE BUSINESS AVERAGE RATING
-- ============================================================================

-- Add average_rating and review_count columns to businesses
ALTER TABLE businesses ADD COLUMN average_rating NUMERIC(3, 2) DEFAULT 0;
ALTER TABLE businesses ADD COLUMN review_count INTEGER DEFAULT 0;
ALTER TABLE businesses ADD COLUMN favorite_count INTEGER DEFAULT 0;

-- Function to update business rating
CREATE OR REPLACE FUNCTION update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the business with new average and count
  UPDATE businesses
  SET
    average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE business_id = COALESCE(NEW.business_id, OLD.business_id)
        AND status = 'approved'
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE business_id = COALESCE(NEW.business_id, OLD.business_id)
        AND status = 'approved'
    )
  WHERE id = COALESCE(NEW.business_id, OLD.business_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update rating on review insert/update/delete
CREATE TRIGGER trigger_update_business_rating_insert
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_business_rating();

CREATE TRIGGER trigger_update_business_rating_update
  AFTER UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_business_rating();

CREATE TRIGGER trigger_update_business_rating_delete
  AFTER DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_business_rating();

-- ============================================================================
-- TRIGGER TO UPDATE FAVORITE COUNT
-- ============================================================================

-- Function to update favorite count
CREATE OR REPLACE FUNCTION update_favorite_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE businesses
  SET favorite_count = (
    SELECT COUNT(*)
    FROM favorites
    WHERE business_id = COALESCE(NEW.business_id, OLD.business_id)
  )
  WHERE id = COALESCE(NEW.business_id, OLD.business_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update favorite count
CREATE TRIGGER trigger_update_favorite_count_insert
  AFTER INSERT ON favorites
  FOR EACH ROW
  EXECUTE FUNCTION update_favorite_count();

CREATE TRIGGER trigger_update_favorite_count_delete
  AFTER DELETE ON favorites
  FOR EACH ROW
  EXECUTE FUNCTION update_favorite_count();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all new tables
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_helpfulness ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- REVIEWS RLS POLICIES
-- ============================================================================

-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  USING (status = 'approved');

-- Authenticated users can create reviews for approved businesses
CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM businesses
      WHERE id = reviews.business_id
      AND status = 'approved'
    )
  );

-- Users can update their own pending/approved reviews
CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all reviews
CREATE POLICY "Admins can view all reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_admin = true
    )
  );

-- Admins can update any review
CREATE POLICY "Admins can update any review"
  ON reviews FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_admin = true
    )
  );

-- ============================================================================
-- REVIEW RESPONSES RLS POLICIES
-- ============================================================================

-- Anyone can view review responses
CREATE POLICY "Anyone can view review responses"
  ON review_responses FOR SELECT
  USING (true);

-- Business owners can respond to reviews of their businesses
CREATE POLICY "Business owners can respond to reviews"
  ON review_responses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses b
      JOIN reviews r ON r.business_id = b.id
      WHERE r.id = review_responses.review_id
      AND b.claimed_by = auth.uid()
    )
  );

-- Users can update their own responses
CREATE POLICY "Users can update their own responses"
  ON review_responses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own responses
CREATE POLICY "Users can delete their own responses"
  ON review_responses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- REVIEW HELPFULNESS RLS POLICIES
-- ============================================================================

-- Authenticated users can view helpfulness votes
CREATE POLICY "Authenticated users can view helpfulness"
  ON review_helpfulness FOR SELECT
  TO authenticated
  USING (true);

-- Users can vote on review helpfulness
CREATE POLICY "Users can vote on review helpfulness"
  ON review_helpfulness FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own votes
CREATE POLICY "Users can update their own votes"
  ON review_helpfulness FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own votes
CREATE POLICY "Users can delete their own votes"
  ON review_helpfulness FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- SPECIAL HOURS RLS POLICIES
-- ============================================================================

-- Anyone can view special hours
CREATE POLICY "Anyone can view special hours"
  ON special_hours FOR SELECT
  USING (true);

-- Business owners can manage their special hours
CREATE POLICY "Business owners can create special hours"
  ON special_hours FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE id = special_hours.business_id
      AND claimed_by = auth.uid()
    )
  );

CREATE POLICY "Business owners can update special hours"
  ON special_hours FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE id = special_hours.business_id
      AND claimed_by = auth.uid()
    )
  );

CREATE POLICY "Business owners can delete special hours"
  ON special_hours FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE id = special_hours.business_id
      AND claimed_by = auth.uid()
    )
  );

-- Admins can manage all special hours
CREATE POLICY "Admins can manage all special hours"
  ON special_hours FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_admin = true
    )
  );

-- ============================================================================
-- COLLECTIONS RLS POLICIES
-- ============================================================================

-- Anyone can view public collections
CREATE POLICY "Anyone can view public collections"
  ON collections FOR SELECT
  USING (is_public = true);

-- Users can view their own collections
CREATE POLICY "Users can view their own collections"
  ON collections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own collections
CREATE POLICY "Users can create collections"
  ON collections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own collections
CREATE POLICY "Users can update their own collections"
  ON collections FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own collections
CREATE POLICY "Users can delete their own collections"
  ON collections FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- FAVORITES RLS POLICIES
-- ============================================================================

-- Users can view their own favorites
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own favorites
CREATE POLICY "Users can create favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own favorites
CREATE POLICY "Users can update their own favorites"
  ON favorites FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own favorites
CREATE POLICY "Users can delete their own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get business average rating
CREATE OR REPLACE FUNCTION get_business_rating(business_id_param UUID)
RETURNS TABLE (
  average_rating NUMERIC,
  review_count BIGINT,
  rating_breakdown JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(AVG(rating), 0)::NUMERIC(3,2) as average_rating,
    COUNT(*) as review_count,
    jsonb_build_object(
      '5', COUNT(*) FILTER (WHERE rating = 5),
      '4', COUNT(*) FILTER (WHERE rating = 4),
      '3', COUNT(*) FILTER (WHERE rating = 3),
      '2', COUNT(*) FILTER (WHERE rating = 2),
      '1', COUNT(*) FILTER (WHERE rating = 1)
    ) as rating_breakdown
  FROM reviews
  WHERE business_id = business_id_param
    AND status = 'approved';
END;
$$ LANGUAGE plpgsql;

-- Function to check if business is open now
CREATE OR REPLACE FUNCTION is_business_open_now(business_id_param UUID)
RETURNS BOOLEAN AS $$
DECLARE
  hours JSONB;
  current_day TEXT;
  current_time TIME;
  day_hours JSONB;
  special_hour RECORD;
BEGIN
  -- Get current day and time in Singapore timezone
  current_day := LOWER(TO_CHAR(NOW() AT TIME ZONE 'Asia/Singapore', 'Day'));
  current_day := TRIM(current_day);
  current_time := (NOW() AT TIME ZONE 'Asia/Singapore')::TIME;

  -- Check for special hours first
  SELECT * INTO special_hour
  FROM special_hours
  WHERE business_id = business_id_param
    AND date = (NOW() AT TIME ZONE 'Asia/Singapore')::DATE
  LIMIT 1;

  -- If special hours exist, use them
  IF FOUND THEN
    IF special_hour.is_closed THEN
      RETURN false;
    ELSIF special_hour.open_time IS NOT NULL AND special_hour.close_time IS NOT NULL THEN
      RETURN current_time >= special_hour.open_time AND current_time <= special_hour.close_time;
    END IF;
  END IF;

  -- Otherwise, use regular hours
  SELECT business_hours INTO hours
  FROM businesses
  WHERE id = business_id_param;

  IF hours IS NULL THEN
    RETURN false;
  END IF;

  day_hours := hours->current_day;

  IF day_hours IS NULL THEN
    RETURN false;
  END IF;

  -- Check if closed
  IF (day_hours->>'closed')::BOOLEAN THEN
    RETURN false;
  END IF;

  -- Check if within opening hours
  IF day_hours->>'open' IS NOT NULL AND day_hours->>'close' IS NOT NULL THEN
    RETURN current_time >= (day_hours->>'open')::TIME
       AND current_time <= (day_hours->>'close')::TIME;
  END IF;

  RETURN false;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Add index for business rating lookups
CREATE INDEX idx_businesses_rating ON businesses(average_rating DESC NULLS LAST);
CREATE INDEX idx_businesses_review_count ON businesses(review_count DESC);

-- Composite index for featured + rating
CREATE INDEX idx_businesses_featured_rating ON businesses(is_featured DESC, average_rating DESC NULLS LAST);

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE reviews IS 'User reviews and ratings for businesses';
COMMENT ON TABLE review_responses IS 'Business owner responses to reviews';
COMMENT ON TABLE review_helpfulness IS 'User votes on review helpfulness';
COMMENT ON TABLE special_hours IS 'Special operating hours for holidays and exceptions';
COMMENT ON TABLE collections IS 'User-created collections of businesses';
COMMENT ON TABLE favorites IS 'User favorites and saved businesses';

COMMENT ON COLUMN businesses.business_hours IS 'Regular weekly operating hours in JSONB format';
COMMENT ON COLUMN businesses.average_rating IS 'Cached average rating from approved reviews';
COMMENT ON COLUMN businesses.review_count IS 'Cached count of approved reviews';
COMMENT ON COLUMN businesses.favorite_count IS 'Cached count of times business has been favorited';
