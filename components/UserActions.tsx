"use client";

import Link from "next/link";
import { useAuth } from "@/app/_store/AuthContext";
import { Edit, LogOut } from "lucide-react";

export function UserActions() {
  const { signOut } = useAuth();

  return (
    <div className="flex gap-4 mb-8 max-w-md">
      <Link
        href="/edit"
        className="flex-1 py-3 px-4 rounded-lg text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-[#C5A059] to-[#B08C45] hover:brightness-105 transition-all shadow-md text-sm"
      >
        <Edit className="w-4 h-4" />
        Edit Profile
      </Link>
      <button
        onClick={signOut}
        className="flex-1 py-3 px-4 rounded-lg border-2 border-[#000d22] text-[#000d22] font-semibold flex items-center justify-center gap-2 hover:bg-[#000d22]/5 transition-all text-sm"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}