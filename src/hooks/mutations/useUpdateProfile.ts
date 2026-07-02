import { useMutation, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import { updateMyProfile, type UpdateProfilePayload } from "@/api/me"
import { queryKeys } from "@/hooks/queryKeys"
import { useAppDispatch } from "@/app/hooks"
import { updateUser } from "@/features/auth/authSlice"

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateMyProfile(payload),
    onSuccess: (profile) => {
      dispatch(updateUser({ name: profile.name }))
      toast.success("Profile updated")
      queryClient.invalidateQueries({ queryKey: queryKeys.me.profile })
    },
    onError: (error) => {
      const message = isAxiosError(error)
        ? (error.response?.data?.message ?? "Failed to update profile")
        : "Failed to update profile"
      toast.error(message)
    },
  })
}
