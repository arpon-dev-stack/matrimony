"use client";

import { useAuth } from "@/app/_store/AuthContext";
import UserProfileSkeleton from "@/components/ui/UserLoading";
import { getProfile } from "@/app/lib/profiles";
import { useEffect, useState } from "react";
import { UserRow } from "@/app/lib/profiles";
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
  const [user, setUser] = useState<UserRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const id = userState?.id;

  useEffect(() => {
    let isCancled = false;
    const getUser = async (id: number | null) => {
      try {
        setIsLoading(true);
        const getUser = await getProfile(id!);
        if (!getUser) {
          setError("Don't Find Any User");
          setIsLoading(false);
        }

        if (!isCancled) {
          setUser(getUser);
          setIsLoading(false);
        }
      } catch (err) {
        setError(
          "Try again: " + (err instanceof Error ? err.message : String(err)),
        );
      } finally {
        setIsLoading(false);
      }
    };

    getUser(id!);

    return () => {
      isCancled = true;
    };
  }, [id]);

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
