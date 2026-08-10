"use client";

import UserProfileSkeleton from "@/components/ui/UserLoading";
import { useUserProfile } from "@/app/lib/useUserProfile";
import UserDetails from "@/components/ui/UserDetails";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const {id} = useParams<{id: string}>()
  const numericId = id ? Number(id) : NaN;
  const {user, error, isLoading} = useUserProfile(numericId);

  if (error) {
    return (
      <div className="min-h-screen bg-[#fbf9f8] flex items-center justify-center text-gray-500 font-sans">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  return <UserDetails user={user} isUser={false} />;
}
