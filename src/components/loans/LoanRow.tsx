import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoanStatusBadge } from "@/components/loans/LoanStatusBadge"
import { formatDate } from "@/lib/date"
import { useReturnLoan } from "@/hooks/mutations/useReturnLoan"
import type { LoanListItem } from "@/api/loans"

export function LoanRow({ loan }: { loan: LoanListItem }) {
  const returnMutation = useReturnLoan()
  const canReturn = loan.status === "BORROWED"

  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <Link to={`/books/${loan.book.id}`} className="shrink-0">
          <div className="h-20 w-14 overflow-hidden rounded bg-muted">
            {loan.book.coverImage && (
              <img
                src={loan.book.coverImage}
                alt={loan.book.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </Link>
        <div className="flex flex-1 flex-col gap-1">
          <Link to={`/books/${loan.book.id}`} className="font-medium hover:underline">
            {loan.book.title}
          </Link>
          <p className="text-sm text-muted-foreground">{loan.book.author.name}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <LoanStatusBadge status={loan.displayStatus} />
            <span>Borrowed {formatDate(loan.borrowedAt)}</span>
            <span>Due {formatDate(loan.dueAt)}</span>
            {loan.returnedAt && <span>Returned {formatDate(loan.returnedAt)}</span>}
          </div>
        </div>
        {canReturn && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => returnMutation.mutate(loan.id)}
            disabled={returnMutation.isPending}
          >
            {returnMutation.isPending ? "Returning..." : "Return"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
