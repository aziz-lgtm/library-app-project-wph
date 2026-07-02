import { apiClient } from "@/api/client"
import type { ApiResponse } from "@/api/types"

export interface Category {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<ApiResponse<{ categories: Category[] }>>("/api/categories")
  return data.data.categories
}
