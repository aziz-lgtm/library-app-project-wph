import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { LoanList } from "@/components/loans/LoanList"
import { BookPagination } from "@/components/books/BookPagination"
import { ErrorState } from "@/components/common/ErrorState"
import { useMyLoans } from "@/hooks/queries/useMyLoans"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import type { GetMyLoansParams } from "@/api/loans"

const LIMIT = 10

export default function MyLoansPage() {
  const [status, setStatus] = useState<NonNullable<GetMyLoansParams["status"]>>("all")
  const [searchInput, setSearchInput] = useState("")
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebouncedValue(searchInput, 400)

  const { data, isLoading, isError, refetch } = useMyLoans({
    status,
    q: debouncedSearch || undefined,
    page,
    limit: LIMIT,
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-2xl font-semibold">My Loans</h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={status}
          onValueChange={(value) => {
            setStatus(value as typeof status)
            setPage(1)
          }}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="returned">Returned</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          placeholder="Search by title or author..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value)
            setPage(1)
          }}
          className="sm:max-w-xs"
        />
      </div>

      {isError ? (
        <ErrorState message="Failed to load loans." onRetry={() => refetch()} />
      ) : (
        <>
          <LoanList loans={data?.loans ?? []} isLoading={isLoading} />
          {data && (
            <BookPagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  )
}
