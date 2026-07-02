import { useMutation, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import { deleteReview } from "@/api/reviews"
import { queryKeys } from "@/hooks/queryKeys"

export function useDeleteReview(bookId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      toast.success("Review deleted")
      queryClient.invalidateQueries({ queryKey: queryKeys.books.detail(bookId) })
      queryClient.invalidateQueries({ queryKey: ["books", "list"] })
    },
    onError: (error) => {
      const message = isAxiosError(error)
        ? (error.response?.data?.message ?? "Failed to delete review")
        : "Failed to delete review"
      toast.error(message)
    },
  })
}
