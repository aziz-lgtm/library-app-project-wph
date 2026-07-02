import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { login, type LoginPayload } from "@/api/auth"
import { useAppDispatch } from "@/app/hooks"
import { setCredentials } from "@/features/auth/authSlice"
import { isAxiosError } from "axios"

export function useLogin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      dispatch(setCredentials(data))
      toast.success("Logged in successfully")
      navigate("/books")
    },
    onError: (error) => {
      const message = isAxiosError(error)
        ? (error.response?.data?.message ?? "Login failed")
        : "Login failed"
      toast.error(message)
    },
  })
}
