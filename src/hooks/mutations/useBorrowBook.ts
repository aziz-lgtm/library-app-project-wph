import { useMutation, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import { borrowBook } from "@/api/loans"
import type { Book, BookDetail } from "@/api/books"
import type { Pagination } from "@/api/types"
import { queryKeys } from "@/hooks/queryKeys"

interface BooksListPage {
  books: Book[]
  pagination: Pagination
}

const booksListKeyPrefix = ["books", "list"] as const

export function useBorrowBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { bookId: number; days: number }) => borrowBook(payload),

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.books.detail(payload.bookId) })
      await queryClient.cancelQueries({ queryKey: booksListKeyPrefix })

      const previousDetail = queryClient.getQueryData<BookDetail>(
        queryKeys.books.detail(payload.bookId)
      )
      const previousLists = queryClient.getQueriesData<BooksListPage>({
        queryKey: booksListKeyPrefix,
      })

      if (previousDetail) {
        queryClient.setQueryData(queryKeys.books.detail(payload.bookId), {
          ...previousDetail,
          availableCopies: Math.max(0, previousDetail.availableCopies - 1),
          borrowCount: previousDetail.borrowCount + 1,
        })
      }

      queryClient.setQueriesData<BooksListPage | undefined>(
        { queryKey: booksListKeyPrefix },
        (old) => {
          if (!old) return old
          return {
            ...old,
            books: old.books.map((book) =>
              book.id === payload.bookId
                ? {
                    ...book,
                    availableCopies: Math.max(0, book.availableCopies - 1),
                    borrowCount: book.borrowCount + 1,
                  }
                : book
            ),
          }
        }
      )

      return { previousDetail, previousLists }
    },

    onError: (error, payload, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(queryKeys.books.detail(payload.bookId), context.previousDetail)
      }
      context?.previousLists?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data)
      })
      const message = isAxiosError(error)
        ? (error.response?.data?.message ?? "Failed to borrow book")
        : "Failed to borrow book"
      toast.error(message)
    },

    onSuccess: () => {
      toast.success("Book borrowed successfully")
    },

    onSettled: (_data, _error, payload) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books.detail(payload.bookId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.books.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.loans.all })
    },
  })
}
