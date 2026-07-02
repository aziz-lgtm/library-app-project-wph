import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/reviews/StarRating"
import { useCreateReview } from "@/hooks/mutations/useCreateReview"
import type { Review } from "@/api/reviews"

export function ReviewForm({
  bookId,
  existingReview,
}: {
  bookId: number
  existingReview?: Review
}) {
  const [star, setStar] = useState(existingReview?.star ?? 0)
  const [comment, setComment] = useState(existingReview?.comment ?? "")
  const createReviewMutation = useCreateReview(bookId)

  const handleSubmit = () => {
    if (star < 1) return
    createReviewMutation.mutate({ star, comment: comment || undefined })
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <p className="text-sm font-medium">
        {existingReview ? "Update your review" : "Write a review"}
      </p>
      <StarRating value={star} onChange={setStar} size="md" />
      <Textarea
        placeholder="Share your thoughts about this book..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />
      <Button
        onClick={handleSubmit}
        disabled={star < 1 || createReviewMutation.isPending}
        className="w-fit"
      >
        {createReviewMutation.isPending ? "Saving..." : existingReview ? "Update review" : "Submit review"}
      </Button>
    </div>
  )
}
