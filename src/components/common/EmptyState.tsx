export function EmptyState({ message = "Nothing here yet." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-16 text-center text-muted-foreground">
      {message}
    </div>
  )
}
