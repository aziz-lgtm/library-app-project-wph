import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/api/categories"
import { queryKeys } from "@/hooks/queryKeys"

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  })
}
