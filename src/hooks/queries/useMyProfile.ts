import { useQuery } from "@tanstack/react-query"
import { getMyProfile } from "@/api/me"
import { queryKeys } from "@/hooks/queryKeys"
import { useAppSelector } from "@/app/hooks"
import { selectIsAuthenticated } from "@/features/auth/authSlice"

export function useMyProfile() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return useQuery({
    queryKey: queryKeys.me.profile,
    queryFn: getMyProfile,
    enabled: isAuthenticated,
  })
}
