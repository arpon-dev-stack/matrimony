"use client";

import { useState } from "react";
import { getAgeInYears } from "@/app/lib/getAgeInYear";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { CardProfile } from "@/app/lib/profiles";
export default function ProfileCard({ profile }: { profile: CardProfile }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border border-[#c4c6cf]/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#775a19] group"
    >
      <div className="relative h-64 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url(${profile.imageUrl})`,
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl text-[#000d22]">{profile.name}</h3>
          <span className="text-base text-[#775a19] font-semibold">
            {getAgeInYears(profile.date_of_birth || "0")}
          </span>
        </div>

        <p className="text-sm text-[#43474e] mb-4 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {profile.location}
        </p>

        <div className="grid grid-cols-2 gap-y-3 mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#43474e] uppercase tracking-widest font-semibold">
              Profession
            </span>
            <span className="text-sm text-[#000d22] font-medium">
              {profile.profession}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#43474e] uppercase tracking-widest font-semibold">
              Education
            </span>
            <span className="text-sm text-[#000d22] font-medium">
              {profile.education}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8"></div>

        <Link
          href={`/profile/${profile.id}`}
          className="w-full block text-center py-3 rounded text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #C5A059 0%, #B08C45 100%)",
          }}
        >
          View Profiel
        </Link>
      </div>
  </div>
  );
}
