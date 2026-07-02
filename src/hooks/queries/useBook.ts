import { useQuery } from "@tanstack/react-query"
import { getBook } from "@/api/books"
import { queryKeys } from "@/hooks/queryKeys"

export function useBook(id: number) {
  return useQuery({
    queryKey: queryKeys.books.detail(id),
    queryFn: () => getBook(id),
    enabled: Number.isFinite(id),
  })
}
