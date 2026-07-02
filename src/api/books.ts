import { apiClient } from "@/api/client"
import type { ApiResponse, Pagination } from "@/api/types"
import type { Category } from "@/api/categories"
import type { Review } from "@/api/reviews"

export interface Author {
  id: number
  name: string
  bio: string | null
}

export interface Book {
  id: number
  title: string
  description: string | null
  isbn: string
  publishedYear: number | null
  coverImage: string | null
  rating: number
  reviewCount: number
  totalCopies: number
  availableCopies: number
  borrowCount: number
  authorId: number
  categoryId: number
  author: Author
  category: Category
}

export interface BookDetail extends Book {
  reviews: Review[]
}

export interface GetBooksParams {
  q?: string
  categoryId?: number | null
  authorId?: number
  minRating?: number | null
  page?: number
  limit?: number
}

export async function getBooks(params: GetBooksParams) {
  const { data } = await apiClient.get<ApiResponse<{ books: Book[]; pagination: Pagination }>>(
    "/api/books",
    { params }
  )
  return data.data
}

export async function getBook(id: number): Promise<BookDetail> {
  const { data } = await apiClient.get<ApiResponse<BookDetail>>(`/api/books/${id}`)
  return data.data
}
