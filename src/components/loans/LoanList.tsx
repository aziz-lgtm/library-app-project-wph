import { Skeleton } from "@/components/ui/skeleton"
import { LoanRow } from "@/components/loans/LoanRow"
import { EmptyState } from "@/components/common/EmptyState"
import type { LoanListItem } from "@/api/loans"

export function LoanList({ loans, isLoading }: { loans: LoanListItem[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (loans.length === 0) {
    return <EmptyState message="No loans found." />
  }

  return (
    <div className="flex flex-col gap-3">
      {loans.map((loan) => (
        <LoanRow key={loan.id} loan={loan} />
      ))}
    </div>
  )
}
