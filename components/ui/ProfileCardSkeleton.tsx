export function ProfileCardSkeleton() {
  return (
    <div className="bg-white border border-[#c4c6cf]/30 rounded-xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Header (Name & Age) */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="h-5 bg-gray-200 rounded w-8" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>

        {/* Details Grid (Profession & Education) */}
        <div className="grid grid-cols-2 gap-y-3 mb-6">
          <div className="flex flex-col gap-1.5">
            <div className="h-2.5 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-2.5 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>

        {/* Button Placeholder */}
        <div className="h-11 bg-gray-200 rounded w-full mt-8" />
      </div>
    </div>
  );
}

export function ProfileSkeletonGrid() {
  return (
    <>
      {/* Match count indicator skeleton */}
      <div className="h-5 bg-gray-200 rounded w-64 mb-10 animate-pulse" />

      {/* Grid of 6 card skeletons to simulate a full page load */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProfileCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}

export default ProfileSkeletonGrid;
