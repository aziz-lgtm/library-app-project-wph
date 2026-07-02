import { format, formatDistanceToNow, isPast } from "date-fns"

export function formatDate(date: string | Date): string {
  return format(new Date(date), "d MMM yyyy")
}

export function formatRelative(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function isOverdue(dueAt: string | Date): boolean {
  return isPast(new Date(dueAt))
}
