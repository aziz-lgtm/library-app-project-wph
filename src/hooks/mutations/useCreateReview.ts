import { useMutation, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import { createReview } from "@/api/reviews"
import { queryKeys } from "@/hooks/queryKeys"

export function useCreateReview(bookId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { star: number; comment?: string }) =>
      createReview({ bookId, ...payload }),
    onSuccess: () => {
      toast.success("Review saved")
      queryClient.invalidateQueries({ queryKey: queryKeys.books.detail(bookId) })
      queryClient.invalidateQueries({ queryKey: ["books", "list"] })
    },
    onError: (error) => {
      const message = isAxiosError(error)
        ? (error.response?.data?.message ?? "Failed to save review")
        : "Failed to save review"
      toast.error(message)
    },
  })
}
