// TypeScript types for Reviews and Ratings

import { Database } from './database'

export type Review = Database['public']['Tables']['reviews']['Row']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update']

export type ReviewResponse = Database['public']['Tables']['review_responses']['Row']
export type ReviewResponseInsert = Database['public']['Tables']['review_responses']['Insert']

export type ReviewHelpfulness = Database['public']['Tables']['review_helpfulness']['Row']

// Extended review with user and business info
export interface ReviewWithUser extends Review {
  profiles: {
    id: string
    full_name: string | null
    email: string
  }
}

// Extended review with responses
export interface ReviewWithResponses extends ReviewWithUser {
  review_responses: Array<{
    id: string
    response_text: string
    created_at: string
    profiles: {
      id: string
      full_name: string | null
      is_business_owner: boolean
    }
  }>
}

// Rating breakdown structure
export interface RatingBreakdown {
  5: number
  4: number
  3: number
  2: number
  1: number
}

// Business rating stats
export interface BusinessRatingStats {
  average_rating: number
  review_count: number
  rating_breakdown: RatingBreakdown
}

// Review form data
export interface ReviewFormData {
  business_id: string
  rating: number
  review_text?: string
  photos?: string[]
  visit_date?: string
}

// Review filter options
export interface ReviewFilters {
  rating?: number  // Filter by specific rating
  has_photos?: boolean  // Only reviews with photos
  sort?: 'recent' | 'highest' | 'lowest' | 'helpful'
}
