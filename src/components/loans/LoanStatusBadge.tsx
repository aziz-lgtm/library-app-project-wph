import { Badge } from "@/components/ui/badge"
import type { LoanDisplayStatus } from "@/api/loans"

const VARIANTS: Record<LoanDisplayStatus, "default" | "secondary" | "destructive"> = {
  Active: "default",
  Returned: "secondary",
  Overdue: "destructive",
}

export function LoanStatusBadge({ status }: { status: LoanDisplayStatus }) {
  return <Badge variant={VARIANTS[status]}>{status}</Badge>
}
