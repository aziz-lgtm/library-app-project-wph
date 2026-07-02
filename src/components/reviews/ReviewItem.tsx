import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/reviews/StarRating"
import { formatDate } from "@/lib/date"
import type { Review } from "@/api/reviews"

export function ReviewItem({
  review,
  canDelete,
  onDelete,
  isDeleting,
}: {
  review: Review
  canDelete: boolean
  onDelete?: () => void
  isDeleting?: boolean
}) {
  return (
    <div className="flex flex-col gap-1 border-b py-3 last:border-b-0">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium">{review.user.name}</p>
          <div className="flex items-center gap-2">
            <StarRating value={review.star} />
            <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
          </div>
        </div>
        {canDelete && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onDelete}
            disabled={isDeleting}
            aria-label="Delete review"
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        )}
      </div>
      {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
    </div>
  )
}
