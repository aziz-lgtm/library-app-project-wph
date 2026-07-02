import { Badge } from "@/components/ui/badge"

export function StockBadge({
  availableCopies,
  totalCopies,
}: {
  availableCopies: number
  totalCopies: number
}) {
  if (availableCopies <= 0) {
    return <Badge variant="destructive">Out of stock</Badge>
  }
  return (
    <Badge variant="secondary">
      {availableCopies}/{totalCopies} available
    </Badge>
  )
}
