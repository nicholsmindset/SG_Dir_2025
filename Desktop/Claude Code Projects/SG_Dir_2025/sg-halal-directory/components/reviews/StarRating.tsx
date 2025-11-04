'use client'

import { useState } from 'react'

interface StarRatingProps {
  rating: number
  onChange?: (rating: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  count?: number
}

export default function StarRating({
  rating,
  onChange,
  readonly = false,
  size = 'md',
  showCount = false,
  count
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const displayRating = hoverRating || rating

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          <svg
            className={`${sizeClasses[size]} ${
              star <= displayRating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
      {showCount && count !== undefined && (
        <span className="ml-2 text-sm text-gray-600">
          ({count} {count === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  )
}
