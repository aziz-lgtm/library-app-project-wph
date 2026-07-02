import { apiClient } from "@/api/client"
import type { ApiResponse } from "@/api/types"
import type { AuthUser } from "@/features/auth/authSlice"

export interface LoginResponse {
  token: string
  user: AuthUser
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  phone?: string
  password: string
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<ApiResponse<LoginResponse>>("/api/auth/login", payload)
  return data.data
}

export async function register(payload: RegisterPayload): Promise<void> {
  await apiClient.post("/api/auth/register", payload)
}
