import { Navigate, Route, Routes } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { ProtectedRoute } from "@/routes/ProtectedRoute"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import BookListPage from "@/pages/BookListPage"
import BookDetailPage from "@/pages/BookDetailPage"
import MyLoansPage from "@/pages/MyLoansPage"
import MyProfilePage from "@/pages/MyProfilePage"
import NotFoundPage from "@/pages/NotFoundPage"

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/my-loans" element={<MyLoansPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
