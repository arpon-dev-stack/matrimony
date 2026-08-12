'use client';

import { UserRow } from "@/app/lib/profiles";
import { UserImage } from "@/app/types/auth";
import UserAction from "./UserAction";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  UserCheck,
  Utensils,
  Sparkles,
  Tag,
  Clock,
} from "lucide-react";
import { getAgeInYears } from "@/app/lib/getAgeInYear";
import ProfileAction from "./ProfileAction";

const UserDetails = ({isUser = true, user}: {isUser: boolean, user: UserRow | null}) => {
  const activeImages =
    user?.images?.filter((img: UserImage) => !img.is_removed) || [];

  // Identify main profile image or fall back to a placeholder
  const profileImage =
    activeImages.find((img: UserImage) => img.is_profile)?.url ||
    activeImages[0]?.url ||
    "https://via.placeholder.com/600x750?text=No+Profile+Picture";

  // Gallery images (excluding the main profile picture if others exist)
  const galleryImages = activeImages.filter(
    (img: UserImage) => img.url !== profileImage,
  );

  // Normalize bio to handle array of strings or single string
  const bioParagraphs = Array.isArray(user?.bio)
    ? user?.bio
    : user?.bio
      ? [user?.bio]
      : [];

  // Formatting registration date
  const joinedDate = user?.created_at
    ? new Date(user?.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans selection:bg-[#ffdea5]">
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
          {/* Main Profile Photo */}
          <div className="lg:col-span-6 xl:col-span-5 relative group">
            <div className="aspect-[4/5] overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              <img
                src={profileImage}
                alt={user?.name || "userData profile image"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {user?.is_verified && (
              <div className="absolute top-6 right-6">
                <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-[#C5A059]/30 shadow-sm text-xs font-semibold uppercase tracking-wider text-[#775a19]">
                  <CheckCircle2 className="w-4 h-4 text-[#775a19]" />
                  Verified Profile
                </span>
              </div>
            )}
          </div>

          {/* userData Essential Info */}
          <div className="lg:col-span-6 xl:col-span-7 pt-2 flex flex-col justify-between h-full">
            <div>
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#000d22] mb-3 capitalize">
                  {user?.name || "Anonymous userData"}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 font-medium text-sm">
                  {user?.date_of_birth && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {getAgeInYears(user?.date_of_birth)}
                    </span>
                  )}

                  {user?.gender && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      <span className="flex items-center gap-1.5 capitalize">
                        <UserCheck className="w-4 h-4 text-gray-400" />
                        {user?.gender}
                      </span>
                    </>
                  )}

                  {user?.location && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {user?.location}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {isUser ? <UserAction/> : <ProfileAction/>}

              {/* Core Attributes Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-[#000d22]/5 p-2.5 rounded-lg text-[#000d22]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-0.5">
                      Email
                    </p>
                    <p className="font-semibold text-[#000d22] text-sm break-all">
                      {user?.email || "Not Provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#000d22]/5 p-2.5 rounded-lg text-[#000d22]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-0.5">
                      Occupation
                    </p>
                    <p className="font-semibold text-[#000d22] text-sm capitalize">
                      {user?.occupation || "Not Provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#000d22]/5 p-2.5 rounded-lg text-[#000d22]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-0.5">
                      Education
                    </p>
                    <p className="font-semibold text-[#000d22] text-sm capitalize">
                      {user?.education || "Not Provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#000d22]/5 p-2.5 rounded-lg text-[#000d22]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-0.5">
                      Religion
                    </p>
                    <p className="font-semibold text-[#000d22] text-sm capitalize">
                      {user?.religion || "Not Provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {joinedDate && (
              <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Member since {joinedDate}</span>
              </div>
            )}
          </div>
        </section>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Details (Bio & Gallery) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Bio Section */}
            {bioParagraphs.length > 0 && (
              <section>
                <h2 className="text-2xl font-serif text-[#000d22] mb-4 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#775a19]"></span>
                  About Me
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed font-light">
                  {bioParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery Images */}
            {galleryImages.length > 0 && (
              <section>
                <h2 className="text-2xl font-serif text-[#000d22] mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#775a19]"></span>
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((img: UserImage, idx: number) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
                    >
                      <img
                        src={img.url}
                        alt={`userData picture ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (Interests & Lifestyle) */}
          <aside className="lg:col-span-4 space-y-6">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6 space-y-6">
              <h3 className="text-xl font-serif text-[#000d22] border-b border-gray-100 pb-4">
                Personal Overview
              </h3>

              {/* Interests Tags */}
              {user?.interests && user?.interests.length > 0 && (
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-3 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Interests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user?.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="bg-[#fbf9f8] text-[#000d22] px-3 py-1 rounded-full text-xs font-medium border border-gray-200 capitalize"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Diet / Lifestyle Attribute */}
              <div>
                <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  Dietary Choice
                </p>
                <span className="inline-block bg-gray-50 text-[#000d22] px-3 py-1 rounded-md text-sm font-medium border border-gray-200">
                  {user?.dietary ? "Vegetarian" : "Non-Vegetarian"}
                </span>
              </div>

              {/* Setup Status Indicator */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Profile Status</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full ${
                      user?.completed
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {user?.completed ? "Completed" : "Incomplete"}
                  </span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default UserDetails;
