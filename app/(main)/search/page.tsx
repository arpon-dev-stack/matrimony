"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProfileData from "@/components/ProfileData";
import { ProfileSkeletonGrid } from "@/components/SearchResultSkeleton";
import { Suspense } from "react";

export default function EternalUnionApp() {
  return (
    <div className="flex w-full bg-[#fbf9f8] text-[#1b1c1c] antialiased overflow-hidden font-sans relative">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#fbf9f8]">
        <Header />

        <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16">
          <div className="flex justify-between items-center lg:items-end mb-8 gap-4">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#000d22]">
                Discover Chosen Profiles
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-row items-center gap-2 lg:gap-4">
                <span className="text-sm text-nowrap text-[#43474e]">
                  Sort by:
                </span>
                <select className="bg-transparent border-none text-sm font-semibold text-[#000d22] focus:ring-0 cursor-pointer outline-none">
                  <option>Most Relevant</option>
                  <option>Recently Active</option>
                  <option>Newest Members</option>
                </select>
              </div>
            </div>
          </div>
          <Suspense fallback={<ProfileSkeletonGrid />}>
            <ProfileData/>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
