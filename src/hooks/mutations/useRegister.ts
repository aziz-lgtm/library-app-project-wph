import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import { register, type RegisterPayload } from "@/api/auth"

export function useRegister() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: () => {
      toast.success("Account created, please log in")
      navigate("/login")
    },
    onError: (error) => {
      const message = isAxiosError(error)
        ? (error.response?.data?.message ?? "Registration failed")
        : "Registration failed"
      toast.error(message)
    },
  })
}
