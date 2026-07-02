import { ReviewItem } from "@/components/reviews/ReviewItem"
import { EmptyState } from "@/components/common/EmptyState"
import type { Review } from "@/api/reviews"

export function ReviewList({
  reviews,
  currentUserId,
  onDelete,
  deletingId,
}: {
  reviews: Review[]
  currentUserId?: number
  onDelete?: (review: Review) => void
  deletingId?: number
}) {
  if (reviews.length === 0) {
    return <EmptyState message="No reviews yet. Be the first to review!" />
  }

  return (
    <div className="flex flex-col">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          canDelete={review.userId === currentUserId}
          onDelete={() => onDelete?.(review)}
          isDeleting={deletingId === review.id}
        />
      ))}
    </div>
  )
}
