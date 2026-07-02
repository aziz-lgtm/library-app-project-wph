import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectBookFilters, setCategoryId, setMinRating, setSearch } from "@/features/ui/uiSlice"
import { useCategories } from "@/hooks/queries/useCategories"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"

const ALL = "all"

export function BookFilters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectBookFilters)
  const { data: categories } = useCategories()

  const [searchInput, setSearchInput] = useState(filters.search)
  const debouncedSearch = useDebouncedValue(searchInput, 400)

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      dispatch(setSearch(debouncedSearch))
    }
  }, [debouncedSearch])

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        placeholder="Search books..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="sm:max-w-xs"
      />
      <Select
        value={filters.categoryId ? String(filters.categoryId) : ALL}
        onValueChange={(value) => dispatch(setCategoryId(value === ALL ? null : Number(value)))}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All categories</SelectItem>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.minRating ? String(filters.minRating) : ALL}
        onValueChange={(value) => dispatch(setMinRating(value === ALL ? null : Number(value)))}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Min rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Any rating</SelectItem>
          {[4, 3, 2, 1].map((rating) => (
            <SelectItem key={rating} value={String(rating)}>
              {rating}+ stars
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
