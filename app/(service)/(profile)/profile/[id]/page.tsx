import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/app/lib/bd";
import { PrimaryGoldButton } from "@/components/buttons/PrimaryColdenButton";
import { SecondaryOutlineButton } from "@/components/buttons/SecondaryOutlineButton";
import { User } from "@/app/types/auth";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Heart,
  Mail,
  GraduationCap,
  Ruler,
  UserCheck,
  Utensils,
  Tag,
  Clock,
  Briefcase,
  Sparkles,
} from "lucide-react";

// Types
interface ImageItem {
  url: string;
  is_profile: boolean;
  is_removed: boolean;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { id } = await params;

  // Fetch user details from Supabase using `db`
  const { data: user, error } = await db
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !user) {
    notFound();
  }

  // Filter non-removed images
  const activeImages: ImageItem[] =
    user.images?.filter((img: ImageItem) => !img.is_removed) || [];

  // Determine main profile image
  const profileImage =
    activeImages.find((img) => img.is_profile)?.url ||
    activeImages[0]?.url ||
    "https://via.placeholder.com/600x750?text=No+Profile+Picture";

  // Gallery images (excluding the main profile picture)
  const galleryImages = activeImages.filter((img) => img.url !== profileImage);

  // Normalize bio paragraphs
  const bioParagraphs = Array.isArray(user.bio)
    ? user.bio
    : user.bio
    ? [user.bio]
    : [];

  // Format joined date
  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-sans min-h-screen selection:bg-[#fed488] selection:text-[#261900] pb-20 lg:pb-12">
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <HeroSection
          user={user}
          profileImage={profileImage}
        />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Details (Bio & Gallery) */}
          <div className="lg:col-span-8 space-y-12">
            {bioParagraphs.length > 0 && <BioSection bio={bioParagraphs} />}
            {galleryImages.length > 0 && <GallerySection images={galleryImages} />}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <Sidebar user={user} joinedDate={joinedDate} />
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ==========================================================================
   Sub-Components
   ========================================================================== */

function HeroSection({
  user,
  profileImage,
}: {
  user: User;
  profileImage: string;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12">
      {/* Profile Photo */}
      <div className="lg:col-span-6 xl:col-span-5 relative group">
        <div className="aspect-[4/5] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">
          <img
            src={profileImage}
            alt={user.name || "User profile image"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {user.is_verified && (
          <div className="absolute top-6 right-6">
            <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-[#C5A059]/30 shadow-sm text-xs font-semibold uppercase tracking-wider text-[#775a19]">
              <CheckCircle2 className="w-4 h-4 text-[#775a19]" />
              Verified Profile
            </span>
          </div>
        )}
      </div>

      {/* Hero Details */}
      <div className="lg:col-span-6 xl:col-span-7 pt-2 flex flex-col justify-between h-full">
        <div>
          <div className="mb-6">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000d22] mb-3 capitalize">
              {user.name || "Anonymous User"}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 font-medium text-sm">
              {user.age && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {user.age} Years Old
                </span>
              )}

              {user.gender && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1.5 capitalize">
                    <UserCheck className="w-4 h-4 text-gray-400" />
                    {user.gender}
                  </span>
                </>
              )}

              {user.location && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {user.location}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-md">
            <PrimaryGoldButton className="py-3 px-6 flex-1 text-sm font-semibold flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 fill-current" />
              Send Interest
            </PrimaryGoldButton>
            <SecondaryOutlineButton className="py-3 px-6 flex-1 text-sm font-semibold flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Message
            </SecondaryOutlineButton>
          </div>

          {/* Core Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <StatRow
              icon={Briefcase}
              label="Occupation"
              value={user.occupation || "Not Provided"}
            />
            <StatRow
              icon={GraduationCap}
              label="Education"
              value={user.education || "Not Provided"}
            />
            <StatRow
              icon={Sparkles}
              label="Religion"
              value={user.religion || "Not Provided"}
            />
            {user.height && (
              <StatRow icon={Ruler} label="Height" value={user.height} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-[#000d22]/5 p-2.5 rounded-lg text-[#000d22]">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[12px] tracking-wider uppercase font-semibold text-gray-500 mb-0.5">
          {label}
        </p>
        <p className="font-semibold text-[#000d22] text-sm capitalize">{value}</p>
      </div>
    </div>
  );
}

function BioSection({ bio }: { bio: string[] }) {
  return (
    <section>
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#000d22] mb-6 flex items-center gap-3">
        <span className="w-8 h-[2px] bg-[#775a19]" />
        My Story
      </h2>
      <div className="space-y-4 text-gray-700 leading-relaxed font-light text-base sm:text-lg">
        {bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function GallerySection({ images }: { images: ImageItem[] }) {
  return (
    <section>
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#000d22] mb-6 flex items-center gap-3">
        <span className="w-8 h-[2px] bg-[#775a19]" />
        Gallery
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
          >
            <img
              src={img.url}
              alt={`User picture ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Sidebar({
  user,
  joinedDate,
}: {
  user: User;
  joinedDate: string | null;
}) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6 space-y-6">
      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#000d22] border-b border-gray-100 pb-4">
        Personal Overview
      </h3>

      {/* Interests */}
      {user.interests && user.interests.length > 0 && (
        <div>
          <p className="text-[12px] tracking-wider uppercase font-semibold text-gray-500 mb-3 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            Interests
          </p>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, i) => (
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

      {/* Dietary Choice */}
      <div>
        <p className="text-[12px] tracking-wider uppercase font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
          <Utensils className="w-3.5 h-3.5" />
          Dietary Choice
        </p>
        <span className="inline-block bg-gray-50 text-[#000d22] px-3 py-1 rounded-md text-sm font-medium border border-gray-200">
          {user.vegetarian ? "Vegetarian" : "Non-Vegetarian"}
        </span>
      </div>

      {/* Profile Status Indicator */}
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Profile Status</span>
          <span
            className={`font-semibold px-2 py-0.5 rounded-full ${
              user.completed
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {user.completed ? "Completed" : "Incomplete"}
          </span>
        </div>
      </div>

      {/* Member Since */}
      {joinedDate && (
        <div className="pt-2 flex items-center gap-2 text-xs text-gray-400 border-t border-gray-100">
          <Clock className="w-3.5 h-3.5" />
          <span>Member since {joinedDate}</span>
        </div>
      )}
    </section>
  );
}