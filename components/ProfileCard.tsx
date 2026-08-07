"use client";

import { useState } from "react";
import Link from "next/link";
import { LocateIcon } from "lucide-react";
export default function ProfileCard({ profile }) {
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
        {profile.badge && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[#775a19] text-[16px]">
              verified
            </span>
            <span className="text-[11px] text-[#000d22] uppercase font-bold tracking-wider">
              {profile.badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl text-[#000d22]">{profile.name}</h3>
          <span className="text-base text-[#775a19] font-semibold">
            {profile.age}
          </span>
        </div>

        <p className="text-sm text-[#43474e] mb-4 flex items-center gap-1">
          <LocateIcon className="w-4 h-4" />
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

        <div className="flex flex-wrap gap-2 mb-8">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-[#fbf9f8] text-[11px] text-[#785a1a] rounded font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

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
