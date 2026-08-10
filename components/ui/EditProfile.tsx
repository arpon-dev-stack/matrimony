"use client";

import React from "react";

export const EditProfileSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased pb-16 md:pb-12">
      <main className="max-w-[900px] mx-auto px-4 md:px-16 py-12 animate-pulse">
        {/* Profile Photo & Identity Section Skeleton */}
        <section className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-12">
          {/* Avatar Skeleton */}
          <div className="relative shrink-0">
            <div className="w-48 h-48 rounded-full bg-[#e4e2e2] border-4 border-white shadow-xl" />
            <div className="absolute bottom-2 right-2 w-11 h-11 bg-[#d0cece] rounded-full shadow-lg" />
          </div>

          {/* User Fields Skeleton */}
          <div className="flex-1 space-y-6 w-full">
            {/* Full Name */}
            <div className="space-y-2">
              <div className="h-3 w-20 bg-[#e4e2e2] rounded" />
              <div className="h-12 w-full bg-[#e4e2e2] rounded-lg" />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-3 w-28 bg-[#e4e2e2] rounded" />
                <div className="h-3 w-10 bg-[#e4e2e2] rounded" />
              </div>
              <div className="h-24 w-full bg-[#e4e2e2] rounded-lg" />
            </div>

            {/* Occupation & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-3 w-24 bg-[#e4e2e2] rounded" />
                <div className="h-11 w-full bg-[#e4e2e2] rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 bg-[#e4e2e2] rounded" />
                <div className="h-11 w-full bg-[#e4e2e2] rounded-lg" />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <div className="h-3 w-28 bg-[#e4e2e2] rounded" />
              <div className="h-11 w-full bg-[#e4e2e2] rounded-lg" />
            </div>
          </div>
        </section>

        {/* Gallery Section Skeleton */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <div className="space-y-2">
              <div className="h-7 w-48 bg-[#e4e2e2] rounded" />
              <div className="h-4 w-60 bg-[#e4e2e2] rounded" />
            </div>
            <div className="h-10 w-28 bg-[#e4e2e2] rounded-lg" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-xl bg-[#e4e2e2]" />
            <div className="aspect-square rounded-xl bg-[#e4e2e2]" />
            <div className="aspect-square rounded-xl bg-[#e4e2e2]" />
            <div className="aspect-square rounded-xl bg-[#e4e2e2] border-2 border-dashed border-[#c4c6cf]" />
          </div>
        </section>

        {/* Lifestyle & Interests Skeleton */}
        <section className="mb-12 bg-white p-8 rounded-xl border border-[#c4c6cf]/30 shadow-sm space-y-6">
          <div className="h-7 w-44 bg-[#e4e2e2] rounded mb-6" />

          <div className="space-y-3">
            <div className="h-3 w-20 bg-[#e4e2e2] rounded" />
            <div className="flex flex-wrap gap-2">
              <div className="h-9 w-24 bg-[#e4e2e2] rounded-full" />
              <div className="h-9 w-20 bg-[#e4e2e2] rounded-full" />
              <div className="h-9 w-28 bg-[#e4e2e2] rounded-full" />
              <div className="h-9 w-32 bg-[#e4e2e2] rounded-full border border-dashed border-[#c4c6cf]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <div className="h-3 w-32 bg-[#e4e2e2] rounded" />
              <div className="h-11 w-full bg-[#e4e2e2] rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-28 bg-[#e4e2e2] rounded" />
              <div className="h-11 w-full bg-[#e4e2e2] rounded-lg" />
            </div>
          </div>
        </section>

        {/* Values & Background Skeleton */}
        <section className="bg-white p-8 rounded-xl border border-[#c4c6cf]/30 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="h-7 w-48 bg-[#e4e2e2] rounded" />
            <div className="w-6 h-6 bg-[#e4e2e2] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-2">
              <div className="h-3 w-36 bg-[#e4e2e2] rounded" />
              <div className="h-11 w-full bg-[#e4e2e2] rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 bg-[#e4e2e2] rounded" />
              <div className="h-11 w-full bg-[#e4e2e2] rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 bg-[#e4e2e2] rounded" />
              <div className="h-11 w-full bg-[#e4e2e2] rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-28 bg-[#e4e2e2] rounded" />
              <div className="h-11 w-full bg-[#e4e2e2] rounded-lg" />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#c4c6cf]/30">
            <div className="h-14 w-full bg-[#e4e2e2] rounded-lg" />
          </div>
        </section>

        {/* Actions Skeleton */}
        <div className="mt-8 flex justify-end gap-4">
          <div className="h-10 w-24 bg-[#e4e2e2] rounded-lg" />
          <div className="h-10 w-32 bg-[#e4e2e2] rounded-lg" />
        </div>
      </main>
    </div>
  );
};

export default EditProfileSkeleton;