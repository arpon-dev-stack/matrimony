"use client";

import { useAuth } from "@/app/_store/AuthContext";
import UserProfileSkeleton from "@/components/ui/UserLoading";
import { useUserProfile } from "@/app/lib/useUserProfile";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Edit,
  LogOut,
  Briefcase,
  GraduationCap,
  Mail,
  UserCheck,
  Utensils,
  Sparkles,
  Tag,
  Clock,
} from "lucide-react";
import UserDetails from "@/components/ui/UserDetails";

export default function UserProfile() {
  const { user: userState } = useAuth();
  const {user, error, isLoading} = useUserProfile(userState?.id as number)

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

  return <UserDetails user={user} isUser={true} />;
}
