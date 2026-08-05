
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProfileData from '@/components/ProfileData';
import { getFilteredProfiles } from '@/app/lib/profiles';

type SearchParams = Promise<{
  lookingFor?: string;
  ageRange?: string;
  location?: string;
  religion?: string;
  education?: string;
  interests?: string;
}>;

export default async function EternalUnionApp({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Await searchParams in Next.js 15+
  const resolvedParams = await searchParams;

  // Fetch or filter profiles based on parameters
  const filteredProfiles = await getFilteredProfiles(resolvedParams);

  return (
    <div className="flex w-full bg-[#fbf9f8] text-[#1b1c1c] antialiased overflow-hidden font-sans relative">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#fbf9f8]">
        <Header />

        <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16">
          <div className="flex justify-between items-center lg:items-end mb-8 gap-4">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#000d22]">
                Discover Chosen Profiles
              </h2>
              <p className="text-[#43474e] mt-1 text-sm md:text-base">
                {filteredProfiles.length} curated matches found based on your preferences
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                className="lg:hidden flex items-center gap-2 bg-[#000d22] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#002349] transition-all"
              >
                <span>Filters</span>
              </button>

              <div className="hidden sm:flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
                <span className="text-sm text-nowrap text-[#43474e]">Sort by:</span>
                <select className="bg-transparent border-none text-sm font-semibold text-[#000d22] focus:ring-0 cursor-pointer outline-none">
                  <option>Most Relevant</option>
                  <option>Recently Active</option>
                  <option>Newest Members</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pass fetched profiles into ProfileData */}
          <ProfileData profiles={filteredProfiles} />
        </div>
      </div>
    </div>
  );
}