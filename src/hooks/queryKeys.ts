import type { GetBooksParams } from "@/api/books"
import type { GetMyLoansParams } from "@/api/loans"

export const queryKeys = {
  books: {
    all: ["books"] as const,
    list: (params: GetBooksParams) => ["books", "list", params] as const,
    detail: (id: number) => ["books", "detail", id] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  loans: {
    all: ["loans"] as const,
    my: (params: GetMyLoansParams) => ["loans", "my", params] as const,
  },
  me: {
    profile: ["me", "profile"] as const,
  },
}
