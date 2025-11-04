'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { ReviewFormData, ReviewWithUser, ReviewWithResponses, BusinessRatingStats } from '@/types/reviews'

/**
 * Submit a new review for a business
 */
export async function submitReview(formData: ReviewFormData) {
  const supabase = await createClient()

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'You must be logged in to submit a review'
    }
  }

  // Validate rating
  if (formData.rating < 1 || formData.rating > 5) {
    return {
      success: false,
      error: 'Rating must be between 1 and 5 stars'
    }
  }

  // Check if business exists and is approved
  const { data: business, error: businessError } = await supabase
    .from('businesses')
    .select('id, status, name')
    .eq('id', formData.business_id)
    .single()

  if (businessError || !business) {
    return {
      success: false,
      error: 'Business not found'
    }
  }

  if (business.status !== 'approved') {
    return {
      success: false,
      error: 'Cannot review unapproved businesses'
    }
  }

  // Check if user already reviewed this business
  const { data: existingReview } = await supabase
    .from('reviews')
    .select('id')
    .eq('business_id', formData.business_id)
    .eq('user_id', user.id)
    .single()

  if (existingReview) {
    return {
      success: false,
      error: 'You have already reviewed this business. You can edit your existing review instead.'
    }
  }

  // Create the review
  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .insert({
      business_id: formData.business_id,
      user_id: user.id,
      rating: formData.rating,
      review_text: formData.review_text || null,
      photos: formData.photos || [],
      visit_date: formData.visit_date || null,
      status: 'approved', // Auto-approve for now, can add moderation later
    })
    .select()
    .single()

  if (reviewError) {
    console.error('Error creating review:', reviewError)
    return {
      success: false,
      error: 'Failed to submit review. Please try again.'
    }
  }

  // Revalidate the business page
  revalidatePath(`/business/${formData.business_id}`)

  // TODO: Send email notification to business owner

  return {
    success: true,
    review
  }
}

/**
 * Update an existing review
 */
export async function updateReview(reviewId: string, updates: Partial<ReviewFormData>) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify user owns this review
  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .select('id, user_id, business_id')
    .eq('id', reviewId)
    .single()

  if (reviewError || !review) {
    return {
      success: false,
      error: 'Review not found'
    }
  }

  if (review.user_id !== user.id) {
    return {
      success: false,
      error: 'You can only edit your own reviews'
    }
  }

  // Update the review
  const { data: updatedReview, error: updateError } = await supabase
    .from('reviews')
    .update({
      ...(updates.rating && { rating: updates.rating }),
      ...(updates.review_text !== undefined && { review_text: updates.review_text }),
      ...(updates.photos && { photos: updates.photos }),
      ...(updates.visit_date && { visit_date: updates.visit_date }),
    })
    .eq('id', reviewId)
    .select()
    .single()

  if (updateError) {
    console.error('Error updating review:', updateError)
    return {
      success: false,
      error: 'Failed to update review'
    }
  }

  revalidatePath(`/business/${review.business_id}`)

  return {
    success: true,
    review: updatedReview
  }
}

/**
 * Delete a review
 */
export async function deleteReview(reviewId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify user owns this review
  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .select('id, user_id, business_id')
    .eq('id', reviewId)
    .single()

  if (reviewError || !review) {
    return {
      success: false,
      error: 'Review not found'
    }
  }

  if (review.user_id !== user.id) {
    return {
      success: false,
      error: 'You can only delete your own reviews'
    }
  }

  // Delete the review
  const { error: deleteError } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)

  if (deleteError) {
    console.error('Error deleting review:', deleteError)
    return {
      success: false,
      error: 'Failed to delete review'
    }
  }

  revalidatePath(`/business/${review.business_id}`)

  return {
    success: true
  }
}

/**
 * Get reviews for a business
 */
export async function getBusinessReviews(businessId: string, limit = 10, offset = 0): Promise<ReviewWithUser[]> {
  const supabase = await createClient()

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id (
        id,
        full_name,
        email
      )
    `)
    .eq('business_id', businessId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return reviews as ReviewWithUser[]
}

/**
 * Get review count for a business
 */
export async function getBusinessReviewCount(businessId: string): Promise<number> {
  const supabase = await createClient()

  const { count, error } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('status', 'approved')

  if (error) {
    console.error('Error counting reviews:', error)
    return 0
  }

  return count || 0
}

/**
 * Get business rating statistics
 */
export async function getBusinessRatingStats(businessId: string): Promise<BusinessRatingStats> {
  const supabase = await createClient()

  // Use the database function
  const { data, error } = await supabase.rpc('get_business_rating', {
    business_id_param: businessId
  })

  if (error || !data || data.length === 0) {
    console.error('Error fetching rating stats:', error)
    return {
      average_rating: 0,
      review_count: 0,
      rating_breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    }
  }

  return {
    average_rating: parseFloat(data[0].average_rating || 0),
    review_count: parseInt(data[0].review_count || 0),
    rating_breakdown: data[0].rating_breakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  }
}

/**
 * Check if user has reviewed a business
 */
export async function hasUserReviewed(businessId: string): Promise<boolean> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('id')
    .eq('business_id', businessId)
    .eq('user_id', user.id)
    .single()

  return !!data && !error
}

/**
 * Get user's review for a business
 */
export async function getUserReview(businessId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('business_id', businessId)
    .eq('user_id', user.id)
    .single()

  if (error) {
    return null
  }

  return data
}

/**
 * Mark review as helpful
 */
export async function markReviewHelpful(reviewId: string, isHelpful: boolean) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Upsert the helpfulness vote
  const { error } = await supabase
    .from('review_helpfulness')
    .upsert({
      review_id: reviewId,
      user_id: user.id,
      is_helpful: isHelpful
    }, {
      onConflict: 'review_id,user_id'
    })

  if (error) {
    console.error('Error marking review helpful:', error)
    return {
      success: false,
      error: 'Failed to record your vote'
    }
  }

  // Update helpful count
  if (isHelpful) {
    await supabase.rpc('increment', {
      table_name: 'reviews',
      row_id: reviewId,
      column_name: 'helpful_count'
    })
  }

  return {
    success: true
  }
}

/**
 * Business owner responds to a review
 */
export async function respondToReview(reviewId: string, responseText: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify user owns the business
  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .select(`
      id,
      business_id,
      businesses!inner (
        id,
        claimed_by
      )
    `)
    .eq('id', reviewId)
    .single()

  if (reviewError || !review) {
    return {
      success: false,
      error: 'Review not found'
    }
  }

  // @ts-ignore - Type issue with nested select
  if (review.businesses.claimed_by !== user.id) {
    return {
      success: false,
      error: 'Only business owners can respond to reviews'
    }
  }

  // Create the response
  const { data: response, error: responseError } = await supabase
    .from('review_responses')
    .insert({
      review_id: reviewId,
      user_id: user.id,
      response_text: responseText
    })
    .select()
    .single()

  if (responseError) {
    console.error('Error creating response:', responseError)
    return {
      success: false,
      error: 'Failed to post response'
    }
  }

  // @ts-ignore
  revalidatePath(`/business/${review.business_id}`)

  return {
    success: true,
    response
  }
}

/**
 * Update a review response
 */
export async function updateReviewResponse(responseId: string, responseText: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify user owns the response
  const { data: response, error: responseError } = await supabase
    .from('review_responses')
    .select('id, user_id')
    .eq('id', responseId)
    .single()

  if (responseError || !response || response.user_id !== user.id) {
    return {
      success: false,
      error: 'You can only edit your own responses'
    }
  }

  // Update the response
  const { error: updateError } = await supabase
    .from('review_responses')
    .update({ response_text: responseText })
    .eq('id', responseId)

  if (updateError) {
    return {
      success: false,
      error: 'Failed to update response'
    }
  }

  return {
    success: true
  }
}

/**
 * Delete a review response
 */
export async function deleteReviewResponse(responseId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify user owns the response
  const { data: response, error: responseError } = await supabase
    .from('review_responses')
    .select('id, user_id')
    .eq('id', responseId)
    .single()

  if (responseError || !response || response.user_id !== user.id) {
    return {
      success: false,
      error: 'You can only delete your own responses'
    }
  }

  // Delete the response
  const { error: deleteError } = await supabase
    .from('review_responses')
    .delete()
    .eq('id', responseId)

  if (deleteError) {
    return {
      success: false,
      error: 'Failed to delete response'
    }
  }

  return {
    success: true
  }
}
