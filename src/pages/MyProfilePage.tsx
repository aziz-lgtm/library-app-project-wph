import { Skeleton } from "@/components/ui/skeleton"
import { LoanStatsCards } from "@/components/profile/LoanStatsCards"
import { ProfileForm } from "@/components/profile/ProfileForm"
import { ErrorState } from "@/components/common/ErrorState"
import { useMyProfile } from "@/hooks/queries/useMyProfile"

export default function MyProfilePage() {
  const { data, isLoading, isError, refetch } = useMyProfile()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full max-w-md" />
      </div>
    )
  }

  if (isError || !data) {
    return <ErrorState message="Failed to load profile." onRetry={() => refetch()} />
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-semibold">My Profile</h1>
      <LoanStatsCards stats={data.loanStats} reviewsCount={data.reviewsCount} />
      <div className="max-w-md">
        <ProfileForm profile={data.profile} />
      </div>
    </div>
  )
}
