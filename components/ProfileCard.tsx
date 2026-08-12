'use client';

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { getAgeInYears } from "@/app/lib/getAgeInYear";
import { CardProfile } from "@/app/lib/profiles";

export default function ProfileCard({ profile }: { profile: CardProfile }) {
  return (
    <div className="group bg-white border border-[#c4c6cf]/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#775a19]">
      {/* Image Container with CSS scale on group hover */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={profile.imageUrl}
          alt={profile.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
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
          className="w-full block text-center py-3 rounded text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 bg-gradient-to-br from-[#C5A059] to-[#B08C45]"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}