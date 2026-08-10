"use client";


export default function UserProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans animate-pulse">
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
          {/* Main Profile Photo Skeleton */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            <div className="aspect-[4/5] rounded-xl bg-gray-200 border border-gray-300/60" />
          </div>

          {/* User Essential Info Skeleton */}
          <div className="lg:col-span-6 xl:col-span-7 pt-2 flex flex-col justify-between h-full space-y-6">
            <div>
              {/* Name & Basic Info Header */}
              <div className="mb-6 space-y-3">
                <div className="h-10 w-2/3 bg-gray-300 rounded-md" />
                <div className="flex items-center gap-4 pt-1">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <div className="h-4 w-28 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex gap-4 mb-8 max-w-md">
                <div className="flex-1 h-11 bg-gray-300 rounded-lg" />
                <div className="flex-1 h-11 bg-gray-200 rounded-lg border-2 border-gray-300" />
              </div>

              {/* Core Attributes Card Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200/80">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg shrink-0" />
                    <div className="space-y-1.5 w-full">
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                      <div className="h-4 w-3/4 bg-gray-300 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Since Skeleton */}
            <div className="mt-6 flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-gray-200" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
            </div>
          </div>
        </section>

        {/* Content Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Details (Bio & Gallery) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Bio Section Skeleton */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-gray-300" />
                <div className="h-6 w-32 bg-gray-300 rounded" />
              </div>
              <div className="space-y-2.5">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-11/12" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
              </div>
            </section>

            {/* Gallery Skeleton */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-gray-300" />
                <div className="h-6 w-24 bg-gray-300 rounded" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-gray-200 border border-gray-300/50"
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Skeleton */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 space-y-6">
              <div className="h-6 w-40 bg-gray-300 rounded border-b border-gray-100 pb-4" />

              {/* Interests Tags Skeleton */}
              <div className="space-y-3">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  <div className="h-6 w-14 bg-gray-200 rounded-full" />
                </div>
              </div>

              {/* Dietary Skeleton */}
              <div className="space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-7 w-28 bg-gray-200 rounded-md" />
              </div>

              {/* Status Skeleton */}
              <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-16 bg-gray-200 rounded-full" />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}