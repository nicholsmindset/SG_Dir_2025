// TypeScript types for Favorites and Collections

import { Database } from './database'

export type Favorite = Database['public']['Tables']['favorites']['Row']
export type FavoriteInsert = Database['public']['Tables']['favorites']['Insert']
export type FavoriteUpdate = Database['public']['Tables']['favorites']['Update']

export type Collection = Database['public']['Tables']['collections']['Row']
export type CollectionInsert = Database['public']['Tables']['collections']['Insert']
export type CollectionUpdate = Database['public']['Tables']['collections']['Update']

// Extended favorite with business info
export interface FavoriteWithBusiness extends Favorite {
  businesses: {
    id: string
    name: string
    slug: string
    business_type: string
    address: string
    latitude: number | null
    longitude: number | null
    is_featured: boolean
    average_rating: number
    review_count: number
    areas: {
      name: string
      slug: string
    } | null
  }
}

// Extended collection with favorites
export interface CollectionWithFavorites extends Collection {
  favorites: FavoriteWithBusiness[]
  business_count: number
}

// Collection form data
export interface CollectionFormData {
  name: string
  description?: string
  is_public?: boolean
}
