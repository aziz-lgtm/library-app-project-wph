import { apiClient } from "@/api/client"
import type { ApiResponse, Pagination } from "@/api/types"

export type LoanStatus = "BORROWED" | "RETURNED"
export type LoanDisplayStatus = "Active" | "Returned" | "Overdue"

export interface LoanBookSummary {
  id: number
  title: string
  coverImage: string | null
  isbn: string
  availableCopies: number
  totalCopies: number
  author: { id: number; name: string }
  category: { id: number; name: string }
}

export interface BorrowedLoan {
  id: number
  userId: number
  bookId: number
  status: LoanStatus
  borrowedAt: string
  dueAt: string
  returnedAt: string | null
}

export interface LoanListItem {
  id: number
  status: LoanStatus
  displayStatus: LoanDisplayStatus
  borrowedAt: string
  dueAt: string
  returnedAt: string | null
  durationDays: number
  book: LoanBookSummary
}

export interface GetMyLoansParams {
  status?: "all" | "active" | "returned" | "overdue"
  q?: string
  page?: number
  limit?: number
}

export async function borrowBook(payload: { bookId: number; days: number }) {
  const { data } = await apiClient.post<ApiResponse<{ loan: BorrowedLoan }>>("/api/loans", payload)
  return data.data.loan
}

export async function getMyLoans(params: GetMyLoansParams) {
  const { data } = await apiClient.get<ApiResponse<{ loans: LoanListItem[]; pagination: Pagination }>>(
    "/api/loans/my",
    { params }
  )
  return data.data
}

export async function returnLoan(id: number) {
  const { data } = await apiClient.patch<ApiResponse<{ loan: BorrowedLoan }>>(`/api/loans/${id}/return`)
  return data.data.loan
}
