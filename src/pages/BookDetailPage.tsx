import { Link, useParams } from "react-router-dom"
import { Star } from "lucide-react"
import { useBook } from "@/hooks/queries/useBook"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { StockBadge } from "@/components/books/StockBadge"
import { BorrowDialog } from "@/components/loans/BorrowDialog"
import { ReviewList } from "@/components/reviews/ReviewList"
import { ReviewForm } from "@/components/reviews/ReviewForm"
import { ErrorState } from "@/components/common/ErrorState"
import { useAppSelector } from "@/app/hooks"
import { selectCurrentUser, selectIsAuthenticated } from "@/features/auth/authSlice"
import { useDeleteReview } from "@/hooks/mutations/useDeleteReview"

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const bookId = Number(id)
  const currentUser = useAppSelector(selectCurrentUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const deleteReviewMutation = useDeleteReview(bookId)

  const { data: book, isLoading, isError, refetch } = useBook(bookId)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row">
        <Skeleton className="aspect-2/3 w-full sm:w-64" />
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  if (isError || !book) {
    return <ErrorState message="Book not found." onRetry={() => refetch()} />
  }

  return (
    <div className="flex flex-col gap-6">
      <Button variant="ghost" size="sm" asChild className="w-fit">
        <Link to="/books">&larr; Back to Books</Link>
      </Button>

      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="aspect-2/3 w-full overflow-hidden rounded-lg bg-muted sm:w-64 sm:shrink-0">
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No cover
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div>
            <h1 className="font-heading text-2xl font-semibold">{book.title}</h1>
            <p className="text-muted-foreground">{book.author.name}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{book.category.name}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {book.rating.toFixed(1)} ({book.reviewCount} reviews)
            </span>
            <StockBadge availableCopies={book.availableCopies} totalCopies={book.totalCopies} />
          </div>

          {book.description && <p className="text-sm text-muted-foreground">{book.description}</p>}

          <dl className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <dt className="text-muted-foreground">ISBN</dt>
              <dd>{book.isbn}</dd>
            </div>
            {book.publishedYear && (
              <div>
                <dt className="text-muted-foreground">Published</dt>
                <dd>{book.publishedYear}</dd>
              </div>
            )}
          </dl>

          <div>
            <BorrowDialog bookId={book.id} availableCopies={book.availableCopies} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg font-medium">Reviews</h2>
        {isAuthenticated && (
          <ReviewForm
            bookId={book.id}
            existingReview={book.reviews.find((review) => review.userId === currentUser?.id)}
          />
        )}
        <ReviewList
          reviews={book.reviews}
          currentUserId={currentUser?.id}
          deletingId={deleteReviewMutation.isPending ? deleteReviewMutation.variables : undefined}
          onDelete={(review) => deleteReviewMutation.mutate(review.id)}
        />
      </div>
    </div>
  )
}
