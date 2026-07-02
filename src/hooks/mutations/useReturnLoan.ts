import { useMutation, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import { returnLoan } from "@/api/loans"
import { queryKeys } from "@/hooks/queryKeys"

export function useReturnLoan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => returnLoan(id),
    onSuccess: () => {
      toast.success("Book returned")
      queryClient.invalidateQueries({ queryKey: queryKeys.loans.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.books.all })
    },
    onError: (error) => {
      const message = isAxiosError(error)
        ? (error.response?.data?.message ?? "Failed to return book")
        : "Failed to return book"
      toast.error(message)
    },
  })
}
