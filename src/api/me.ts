import { apiClient } from "@/api/client"
import type { ApiResponse } from "@/api/types"

export interface LoanStats {
  borrowed: number
  returned: number
  late: number
  total: number
}

export interface ProfileInfo {
  id: number
  name: string
  email: string
  phone: string | null
  profilePhoto: string | null
  role: "ADMIN" | "USER"
  createdAt: string
}

export interface Profile {
  profile: ProfileInfo
  loanStats: LoanStats
  reviewsCount: number
}

export async function getMyProfile(): Promise<Profile> {
  const { data } = await apiClient.get<ApiResponse<Profile>>("/api/me")
  return data.data
}

export interface UpdateProfilePayload {
  name?: string
  phone?: string
  profilePhoto?: File | string
}

export async function updateMyProfile(payload: UpdateProfilePayload): Promise<ProfileInfo> {
  const isFile = payload.profilePhoto instanceof File

  if (isFile) {
    const formData = new FormData()
    if (payload.name) formData.append("name", payload.name)
    if (payload.phone) formData.append("phone", payload.phone)
    formData.append("profilePhoto", payload.profilePhoto as File)
    const { data } = await apiClient.patch<ApiResponse<{ profile: ProfileInfo }>>(
      "/api/me",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
    return data.data.profile
  }

  const { data } = await apiClient.patch<ApiResponse<{ profile: ProfileInfo }>>("/api/me", payload)
  return data.data.profile
}
