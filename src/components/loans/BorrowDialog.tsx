import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppSelector } from "@/app/hooks"
import { selectIsAuthenticated } from "@/features/auth/authSlice"
import { useBorrowBook } from "@/hooks/mutations/useBorrowBook"

export function BorrowDialog({
  bookId,
  availableCopies,
}: {
  bookId: number
  availableCopies: number
}) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const [open, setOpen] = useState(false)
  const [days, setDays] = useState(7)
  const borrowMutation = useBorrowBook()

  const outOfStock = availableCopies <= 0

  if (!isAuthenticated) {
    return (
      <Button asChild disabled={outOfStock}>
        <Link to="/login">{outOfStock ? "Out of stock" : "Login to borrow"}</Link>
      </Button>
    )
  }

  const handleBorrow = () => {
    borrowMutation.mutate(
      { bookId, days },
      {
        onSuccess: () => setOpen(false),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={outOfStock}>{outOfStock ? "Out of stock" : "Borrow this book"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow this book</DialogTitle>
          <DialogDescription>Choose how many days you'd like to borrow it for.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="days">Duration (days)</Label>
          <Input
            id="days"
            type="number"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleBorrow}
            disabled={borrowMutation.isPending || days < 1 || days > 30}
          >
            {borrowMutation.isPending ? "Borrowing..." : "Confirm borrow"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
