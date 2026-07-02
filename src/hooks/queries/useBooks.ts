import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getBooks, type GetBooksParams } from "@/api/books"
import { queryKeys } from "@/hooks/queryKeys"

export function useBooks(params: GetBooksParams) {
  return useQuery({
    queryKey: queryKeys.books.list(params),
    queryFn: () => getBooks(params),
    placeholderData: keepPreviousData,
  })
}
