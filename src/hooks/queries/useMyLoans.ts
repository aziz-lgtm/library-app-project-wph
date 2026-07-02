import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getMyLoans, type GetMyLoansParams } from "@/api/loans"
import { queryKeys } from "@/hooks/queryKeys"
import { useAppSelector } from "@/app/hooks"
import { selectIsAuthenticated } from "@/features/auth/authSlice"

export function useMyLoans(params: GetMyLoansParams) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return useQuery({
    queryKey: queryKeys.loans.my(params),
    queryFn: () => getMyLoans(params),
    enabled: isAuthenticated,
    placeholderData: keepPreviousData,
  })
}
