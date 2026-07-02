import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectBookFilters, setPage } from "@/features/ui/uiSlice"
import { useBooks } from "@/hooks/queries/useBooks"
import { BookFilters } from "@/components/books/BookFilters"
import { BookGrid } from "@/components/books/BookGrid"
import { BookPagination } from "@/components/books/BookPagination"
import { ErrorState } from "@/components/common/ErrorState"

const LIMIT = 12

export default function BookListPage() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectBookFilters)

  const { data, isLoading, isError, refetch } = useBooks({
    q: filters.search || undefined,
    categoryId: filters.categoryId,
    minRating: filters.minRating,
    page: filters.page,
    limit: LIMIT,
  })

  return (
    <div className="flex flex-col gap-6">
      <BookFilters />

      {isError ? (
        <ErrorState message="Failed to load books." onRetry={() => refetch()} />
      ) : (
        <>
          <BookGrid books={data?.books ?? []} isLoading={isLoading} />
          {data && (
            <BookPagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
              onPageChange={(page) => dispatch(setPage(page))}
            />
          )}
        </>
      )}
    </div>
  )
}
