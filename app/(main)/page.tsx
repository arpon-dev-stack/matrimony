import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import { getFeaturedProfiles, getSuccessStories } from "@/app/lib/homeData";
import ProfileCard from "@/components/ProfileCard";
import SearchForm from "@/components/HomeSearchClient";

// 1. Separate Async Component for Success Stories
async function SuccessStoriesSection() {
  const stories = await getSuccessStories();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stories.map((story) => (
        <div
          key={story.id}
          className="bg-white p-2 rounded-xl shadow-[0_12px_32px_-8px_rgba(0,35,73,0.08)] flex flex-col gap-6 items-center"
        >
          <div className="w-full h-40 shrink-0 rounded-lg overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url("${story.imageUrl}")` }}
            />
          </div>
          <div className="px-2">
            <h4 className="font-serif pb-3 text-[#000d22] text-xl font-bold">
              {story.names}
            </h4>

            <p className="italic text-[#43474e] text-sm mb-4">
              &quot;{story.quote}&quot;
            </p>
            <span className="text-xs uppercase font-bold tracking-wider text-[#775a19]">
              {story.date}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// 2. Separate Async Component for Featured Profiles
async function FeaturedProfilesSection() {
  const profiles = await getFeaturedProfiles();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}

// Skeleton Components for Instant Loading States
function ProfilesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-gray-200 h-96 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

// 3. Main Page Component
export default function EternalUnionMatrimony() {
  return (
    <main className="bg-[#fbf9f8] text-[#1b1c1c] font-sans selection:bg-[#fed488] min-h-screen">
      {/* Hero Section renders instantly */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbOxXHKN0JMbzYoWSqmakBTbde2Ka1KCD0V9hG2Fvb2JBqAOwKe5QJD6jzSwxM1RW0KpQaW2rLiPzFlxD3g-QjBDtW4vR6yrQY4pYeRUMaH2cQo9ArxabzEsVqmbtFmQB5agouIXVv0GsT_aFnNiVbR56j2mcuvVJxUmYgk-P-8hfSheG7l11cbEGAD9TUfB5qL7JQBm__CIbDEJtKDg_sTMrkFw0drLGPtOVBO984DXXV2Kc00tc0")`,
            }}
          />
        </div>

        <div className="relative z-10 w-full px-4 md:px-16 max-w-[1280px] mx-auto mt-7">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Find Your <span className="text-[#ffdea5]">Eternal</span> Partner
            </h1>
            <p className="text-white/90 text-lg mb-7 max-w-lg">
              Experience the most exclusive matrimony platform designed for
              those who value tradition, integrity, and profound connection.
            </p>
            <SearchForm/>
          </div>
        </div>
      </section>

      {/* Success Stories streamed via Suspense */}
      <section className="py-12 bg-[#f5f3f3]">
        <div className="px-4 md:px-16 max-w-[1280px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#000d22]">
                Uniting Souls
              </h2>
              <p className="text-[#43474e] text-base mt-2">
                Real stories of love and commitment from our members.
              </p>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="h-40 bg-gray-200 rounded-xl animate-pulse" />
            }
          >
            <SuccessStoriesSection />
          </Suspense>
        </div>
      </section>

      {/* Featured Profiles streamed via Suspense */}
      <section className="py-12 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-[#000d22]">
            Discover Distinguished Profiles
          </h2>
          <p className="text-[#43474e] text-base mt-2">
            Explore hand-picked matches that resonate with your background.
          </p>
        </div>

        <Suspense fallback={<ProfilesSkeleton />}>
          <FeaturedProfilesSection />
        </Suspense>

        <div className="text-center mt-12">
          <Link
            href="/search"
            className="text-[#000d22] font-semibold flex items-center justify-center gap-2 hover:gap-3 transition-all"
          >
            View All Featured Profiles <ArrowRight />
          </Link>
        </div>
      </section>

      {/* Call to Action & Footer */}
      <section className="py-24 px-4 md:px-16 bg-[#000d22] text-white overflow-hidden relative">
        <div className="max-w-[1280px] mx-auto text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-[#d5e3ff] max-w-2xl mx-auto mb-10 text-lg">
            Join the most prestigious circle of singles seeking deep connection
            and lifelong partnership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-[#C5A059] to-[#B08C45] text-white px-10 py-4 rounded-lg font-bold text-lg shadow-xl shadow-black/20 hover:scale-105 transition-transform"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
