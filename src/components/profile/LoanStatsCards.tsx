import { Card, CardContent } from "@/components/ui/card"
import type { LoanStats } from "@/api/me"

export function LoanStatsCards({ stats, reviewsCount }: { stats: LoanStats; reviewsCount: number }) {
  const items = [
    { label: "Total Loans", value: stats.total },
    { label: "Active", value: stats.borrowed },
    { label: "Returned", value: stats.returned },
    { label: "Late", value: stats.late },
    { label: "Reviews", value: reviewsCount },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="flex flex-col items-center gap-1 py-2 text-center">
            <span className="text-2xl font-semibold">{item.value}</span>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
