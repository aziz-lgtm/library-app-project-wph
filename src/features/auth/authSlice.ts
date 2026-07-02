import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"

export interface AuthUser {
  id: number
  name: string
  email: string
  role: "ADMIN" | "USER"
}

interface AuthState {
  token: string | null
  user: AuthUser | null
}

const STORAGE_KEY = "library_auth"

function loadPersistedAuth(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { token: null, user: null }
    return JSON.parse(raw) as AuthState
  } catch {
    return { token: null, user: null }
  }
}

function persist(state: AuthState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const authSlice = createSlice({
  name: "auth",
  initialState: loadPersistedAuth(),
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; user: AuthUser }>) {
      state.token = action.payload.token
      state.user = action.payload.user
      persist(state)
    },
    updateUser(state, action: PayloadAction<Partial<AuthUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        persist(state)
      }
    },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})

export const { setCredentials, updateUser, logout } = authSlice.actions
export default authSlice.reducer

export const selectToken = (state: RootState) => state.auth.token
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.token)
