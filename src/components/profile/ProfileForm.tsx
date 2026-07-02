import { useState, type ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUpdateProfile } from "@/hooks/mutations/useUpdateProfile"
import type { ProfileInfo } from "@/api/me"

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || (value.length >= 8 && value.length <= 20), {
      message: "Phone must be 8-20 characters",
    }),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfileForm({ profile }: { profile: ProfileInfo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: profile.name, phone: profile.phone ?? "" },
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(profile.profilePhoto)
  const updateProfileMutation = useUpdateProfile()

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const onSubmit = (values: ProfileFormValues) => {
    updateProfileMutation.mutate({
      name: values.name,
      phone: values.phone || undefined,
      profilePhoto: photoFile ?? undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar size="lg">
          {previewUrl && <AvatarImage src={previewUrl} alt={profile.name} />}
          <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <Label htmlFor="profilePhoto" className="cursor-pointer text-sm underline">
            Change photo
          </Label>
          <Input
            id="profilePhoto"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={profile.email} disabled />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" aria-invalid={!!errors.name} {...register("name")} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" aria-invalid={!!errors.phone} {...register("phone")} />
        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
      </div>

      <Button type="submit" disabled={updateProfileMutation.isPending} className="w-fit">
        {updateProfileMutation.isPending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  )
}
