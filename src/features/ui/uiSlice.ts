import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"

interface UiState {
  search: string
  categoryId: number | null
  minRating: number | null
  page: number
}

const initialState: UiState = {
  search: "",
  categoryId: null,
  minRating: null,
  page: 1,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.page = 1
    },
    setCategoryId(state, action: PayloadAction<number | null>) {
      state.categoryId = action.payload
      state.page = 1
    },
    setMinRating(state, action: PayloadAction<number | null>) {
      state.minRating = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    resetFilters() {
      return initialState
    },
  },
})

export const { setSearch, setCategoryId, setMinRating, setPage, resetFilters } = uiSlice.actions
export default uiSlice.reducer

export const selectBookFilters = (state: RootState) => state.ui
