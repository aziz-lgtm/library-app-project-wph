import { Link } from "react-router-dom"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StockBadge } from "@/components/books/StockBadge"
import type { Book } from "@/api/books"

export function BookCard({ book }: { book: Book }) {
  return (
    <Link to={`/books/${book.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="flex flex-col gap-2">
          <div className="aspect-2/3 w-full overflow-hidden rounded-lg bg-muted">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                No cover
              </div>
            )}
          </div>
          <h3 className="line-clamp-2 font-heading text-sm font-medium">{book.title}</h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">{book.author.name}</p>
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {book.rating.toFixed(1)} ({book.reviewCount})
            </span>
            <StockBadge availableCopies={book.availableCopies} totalCopies={book.totalCopies} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
