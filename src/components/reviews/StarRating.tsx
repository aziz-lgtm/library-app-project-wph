import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({
  value,
  onChange,
  size = "sm",
}: {
  value: number
  onChange?: (value: number) => void
  size?: "sm" | "md"
}) {
  const iconSize = size === "sm" ? "size-4" : "size-6"
  const interactive = Boolean(onChange)

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={cn(!interactive && "cursor-default")}
        >
          <Star
            className={cn(
              iconSize,
              star <= value ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
            )}
          />
        </button>
      ))}
    </div>
  )
}
