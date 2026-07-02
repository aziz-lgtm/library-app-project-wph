import { apiClient } from "@/api/client"
import type { ApiResponse, Pagination } from "@/api/types"

export interface Review {
  id: number
  star: number
  comment: string | null
  userId: number
  bookId: number
  createdAt: string
  user: { id: number; name: string }
}

export interface BookRatingStats {
  rating: number
  reviewCount: number
}

export async function getBookReviews(bookId: number, params?: { page?: number; limit?: number }) {
  const { data } = await apiClient.get<
    ApiResponse<{ bookId: number; reviews: Review[]; pagination: Pagination }>
  >(`/api/reviews/book/${bookId}`, { params })
  return data.data
}

export async function createReview(payload: { bookId: number; star: number; comment?: string }) {
  const { data } = await apiClient.post<
    ApiResponse<{
      review: { id: number; star: number; comment: string | null; userId: number; bookId: number; createdAt: string }
      bookStats: BookRatingStats
    }>
  >("/api/reviews", payload)
  return data.data
}

export async function deleteReview(id: number) {
  const { data } = await apiClient.delete<ApiResponse<{ bookStats: BookRatingStats }>>(
    `/api/reviews/${id}`
  )
  return data.data
}
