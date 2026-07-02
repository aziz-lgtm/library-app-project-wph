import { Skeleton } from "@/components/ui/skeleton"
import { BookCard } from "@/components/books/BookCard"
import { EmptyState } from "@/components/common/EmptyState"
import type { Book } from "@/api/books"

export function BookGrid({ books, isLoading }: { books: Book[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-2/3 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return <EmptyState message="No books match your filters." />
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
