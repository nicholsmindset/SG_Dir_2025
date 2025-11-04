'use client'

import { BusinessRatingStats } from '@/types/reviews'
import StarRating from './StarRating'

interface ReviewStatsProps {
  stats: BusinessRatingStats
}

export default function ReviewStats({ stats }: ReviewStatsProps) {
  const { average_rating, review_count, rating_breakdown } = stats

  if (review_count === 0) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <p className="text-gray-500 text-center">No reviews yet. Be the first to review!</p>
      </div>
    )
  }

  const getBarWidth = (count: number) => {
    return (count / review_count) * 100
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Overall Rating */}
        <div className="flex flex-col items-center md:items-start md:border-r md:pr-6">
          <div className="text-5xl font-bold text-gray-900">
            {average_rating.toFixed(1)}
          </div>
          <StarRating rating={average_rating} readonly size="md" />
          <p className="text-sm text-gray-600 mt-2">
            Based on {review_count} {review_count === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = rating_breakdown[star as keyof typeof rating_breakdown] || 0
            const percentage = review_count > 0 ? (count / review_count) * 100 : 0

            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-8">{star} ★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
