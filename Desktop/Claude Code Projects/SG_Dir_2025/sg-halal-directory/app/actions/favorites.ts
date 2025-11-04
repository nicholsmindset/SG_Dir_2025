'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { FavoriteWithBusiness, CollectionWithFavorites, CollectionFormData } from '@/types/favorites'

/**
 * Toggle favorite status for a business
 */
export async function toggleFavorite(businessId: string, collectionId?: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'You must be logged in to save favorites'
    }
  }

  // Check if already favorited
  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('business_id', businessId)
    .single()

  if (existing) {
    // Remove favorite
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', existing.id)

    if (error) {
      return {
        success: false,
        error: 'Failed to remove favorite'
      }
    }

    revalidatePath('/dashboard/favorites')
    return {
      success: true,
      action: 'removed'
    }
  } else {
    // Add favorite
    const { error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        business_id: businessId,
        collection_id: collectionId || null
      })

    if (error) {
      console.error('Error adding favorite:', error)
      return {
        success: false,
        error: 'Failed to add favorite'
      }
    }

    revalidatePath('/dashboard/favorites')
    return {
      success: true,
      action: 'added'
    }
  }
}

/**
 * Check if business is favorited by current user
 */
export async function isFavorited(businessId: string): Promise<boolean> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('business_id', businessId)
    .single()

  return !!data
}

/**
 * Get user's favorites with business details
 */
export async function getUserFavorites(): Promise<FavoriteWithBusiness[]> {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return []
  }

  const { data: favorites, error } = await supabase
    .from('favorites')
    .select(`
      *,
      businesses (
        id,
        name,
        slug,
        business_type,
        address,
        latitude,
        longitude,
        is_featured,
        average_rating,
        review_count,
        areas (
          name,
          slug
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching favorites:', error)
    return []
  }

  return favorites as FavoriteWithBusiness[]
}

/**
 * Get user's favorites count
 */
export async function getFavoritesCount(): Promise<number> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return 0
  }

  const { count, error } = await supabase
    .from('favorites')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  if (error) {
    return 0
  }

  return count || 0
}

/**
 * Create a new collection
 */
export async function createCollection(formData: CollectionFormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Generate slug from name
  const slug = formData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') +
    '-' + Math.random().toString(36).substring(7)

  const { data: collection, error } = await supabase
    .from('collections')
    .insert({
      user_id: user.id,
      name: formData.name,
      description: formData.description || null,
      is_public: formData.is_public || false,
      slug
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating collection:', error)
    return {
      success: false,
      error: 'Failed to create collection'
    }
  }

  revalidatePath('/dashboard/favorites')

  return {
    success: true,
    collection
  }
}

/**
 * Update a collection
 */
export async function updateCollection(collectionId: string, updates: Partial<CollectionFormData>) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify ownership
  const { data: collection } = await supabase
    .from('collections')
    .select('user_id')
    .eq('id', collectionId)
    .single()

  if (!collection || collection.user_id !== user.id) {
    return {
      success: false,
      error: 'Collection not found or access denied'
    }
  }

  const { error } = await supabase
    .from('collections')
    .update(updates)
    .eq('id', collectionId)

  if (error) {
    return {
      success: false,
      error: 'Failed to update collection'
    }
  }

  revalidatePath('/dashboard/favorites')

  return {
    success: true
  }
}

/**
 * Delete a collection
 */
export async function deleteCollection(collectionId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify ownership
  const { data: collection } = await supabase
    .from('collections')
    .select('user_id')
    .eq('id', collectionId)
    .single()

  if (!collection || collection.user_id !== user.id) {
    return {
      success: false,
      error: 'Collection not found or access denied'
    }
  }

  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', collectionId)

  if (error) {
    return {
      success: false,
      error: 'Failed to delete collection'
    }
  }

  revalidatePath('/dashboard/favorites')

  return {
    success: true
  }
}

/**
 * Get user's collections
 */
export async function getUserCollections(): Promise<CollectionWithFavorites[]> {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return []
  }

  const { data: collections, error } = await supabase
    .from('collections')
    .select(`
      *,
      favorites (
        *,
        businesses (
          id,
          name,
          slug,
          business_type,
          address,
          latitude,
          longitude,
          is_featured,
          average_rating,
          review_count,
          areas (
            name,
            slug
          )
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching collections:', error)
    return []
  }

  // Add business_count to each collection
  return collections.map(collection => ({
    ...collection,
    business_count: collection.favorites?.length || 0
  })) as CollectionWithFavorites[]
}

/**
 * Add business to collection
 */
export async function addToCollection(businessId: string, collectionId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Check if already favorited
  const { data: existing } = await supabase
    .from('favorites')
    .select('id, collection_id')
    .eq('user_id', user.id)
    .eq('business_id', businessId)
    .single()

  if (existing) {
    // Update collection
    const { error } = await supabase
      .from('favorites')
      .update({ collection_id: collectionId })
      .eq('id', existing.id)

    if (error) {
      return {
        success: false,
        error: 'Failed to update collection'
      }
    }
  } else {
    // Create new favorite in collection
    const { error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        business_id: businessId,
        collection_id: collectionId
      })

    if (error) {
      return {
        success: false,
        error: 'Failed to add to collection'
      }
    }
  }

  revalidatePath('/dashboard/favorites')

  return {
    success: true
  }
}

/**
 * Remove business from collection
 */
export async function removeFromCollection(favoriteId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify ownership
  const { data: favorite } = await supabase
    .from('favorites')
    .select('user_id')
    .eq('id', favoriteId)
    .single()

  if (!favorite || favorite.user_id !== user.id) {
    return {
      success: false,
      error: 'Favorite not found or access denied'
    }
  }

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('id', favoriteId)

  if (error) {
    return {
      success: false,
      error: 'Failed to remove from collection'
    }
  }

  revalidatePath('/dashboard/favorites')

  return {
    success: true
  }
}

/**
 * Get public collection by slug
 */
export async function getPublicCollection(slug: string): Promise<CollectionWithFavorites | null> {
  const supabase = await createClient()

  const { data: collection, error } = await supabase
    .from('collections')
    .select(`
      *,
      profiles (
        full_name
      ),
      favorites (
        *,
        businesses (
          id,
          name,
          slug,
          business_type,
          address,
          latitude,
          longitude,
          is_featured,
          average_rating,
          review_count,
          areas (
            name,
            slug
          )
        )
      )
    `)
    .eq('slug', slug)
    .eq('is_public', true)
    .single()

  if (error || !collection) {
    return null
  }

  return {
    ...collection,
    business_count: collection.favorites?.length || 0
  } as CollectionWithFavorites
}
