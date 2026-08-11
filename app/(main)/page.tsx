"use server";

import { ArrowRight} from "lucide-react";
import Link from "next/link";
import HomeSearch from "@/components/HomeSearch";
import Footer from "@/components/ui/Footer";

// Data structure for profiles
interface Profile {
  id: number;
  name: string;
  age: number;
  profession: string;
  location: string;
  interests: string[];
  imageUrl: string;
  verified: boolean;
}

// Data structure for success stories
interface Story {
  id: number;
  names: string;
  date: string;
  quote: string;
  imageUrl: string;
}

const FEATURED_PROFILES: Profile[] = [
  {
    id: 1,
    name: "Saira J.",
    age: 28,
    profession: "Software Architect",
    location: "London, UK",
    interests: ["Travel", "Arts"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPMV_XoRP6Ai2C8p0xWTMRI2tS6p2Icd3e_331fIsHNrSYq--88wVpHn1vQexNueoQxuecyTEf8TrwW9NnA4hKKcvK-Y-_81wlJiQHC9hK1ZAAYKSL4i1_qxIQhoaQGdKaxjcsQT3COJhejxnpREuxIW-O8oN_CHHU3nz0ahYg9JI-l59J1XQXrJUZ9Zwxw5Ro3hB-Nz_kD45tJg8eKLtO6YNgnVP7wVkL1YU_00lhRvnpof3bjOs2",
    verified: true,
  },
  {
    id: 2,
    name: "Rohan M.",
    age: 32,
    profession: "Physician",
    location: "New York, USA",
    interests: ["Golf", "Reading"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC55GbvQp-uEQnF2D15RhxIUPItunJNHVDG8R8AHZp9cNpE0swaIjKtKs5MkXIT2U1OylSJ1umzPg81N4xyt0CURzmHmiG_UK-eZlkwot4o6w0rl2jifFO5dH1KYeOU5IjVbzjaJbaoY5xV8RFfpLIedGEd01gzD9_VtINfw8NevcqD3rD8GsV9OhhJI5RF5mr87ZjkTBj5o2vU1G0yihmrpsaQMmuZCKfZq0cTUsJzca9R4GDvCyIX",
    verified: true,
  },
  {
    id: 3,
    name: "Ananya K.",
    age: 26,
    profession: "Interior Designer",
    location: "Mumbai, India",
    interests: ["Design", "Yoga"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrbxd29kLYZm4Z0JYur5dcVH4d9n08sWCaCSPjhS5LaE5x8c93O4-7YWFgAngCFwh29MFlfNKrTOK4sgGjhHZYOoHOCXSTlbeqePGsma0B4K2WcuSzEQY1lEi7PY-fXULgbJq8-6IWuBgtH9UwT2CpOSecKNOTg2048p_04Lyz2fxiXvi1TkBoMW-cse6Ha3_zPja-dmaggxPLFC6WHH-Ek6KO5L7qyBX8I_-14dien8vLjnipbLMQ",
    verified: true,
  },
  {
    id: 4,
    name: "Karan S.",
    age: 30,
    profession: "Entrepreneur",
    location: "Dubai, UAE",
    interests: ["Fitness", "Stocks"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAKxy-nNL7qlaCI_2TQXld2IaelilDNRGnAfZlUtIn-9sINTX3NS8BqkcluZicscNwEYqdEUCtvYNtcsIlGGOKlsQ-x07NqYDjDJwMLp2liNoETSWaA6nR6wp1mesXmoZxwPsm9qeRc4yPmT9vL12oPlnGDMMy-VYtMIui3mSoQuDMoLcOwtA7upydaXzaxfhbA75RblTlJQsRe7AHRTlemTu9236OMNOtHy_LGj-cMOmLmASdOwO5",
    verified: true,
  },
];

const SUCCESS_STORIES: Story[] = [
  {
    id: 1,
    names: "Aditya & Meera",
    date: "Married Dec 2023",
    quote:
      "We found our shared values and vision for life here. EternalUnion truly understands what a serious commitment means.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCe4NklliJAkNUvcR3unRqWfEELNLtZzQEoc6YVHzEt-EPvS1P81yzdDOmtn_43MtO7zg5NSVPA4rroIxVizV4inAT2FVaTh62ZxHbqVYvogKhnG5z1qWPgfj-1b99jYaCC_Z0-idwmM62m2Qu4vlf4zuw_iBPgyjNn8PFWFi--D-aJnzQOeFGJ3PVSJCME4-ikyA8Vbyto05Uc8ggghLTbRmGHtg_D1U1UHhZQlvmFjims4ZP77U2S",
  },
  {
    id: 2,
    names: "Vikram & Anjali",
    date: "Engaged June 2023",
    quote:
      "The verification process gave me peace of mind. I met someone who was as serious about marriage as I was.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEahR8r6IX5KJUzW0ndCGcH47mYgEAXABWqYZVQqlS2JYiOcUsyWB7hi1lZA-4khHfLvhOnSjbtSZqiqXeInWeDJkFjO_JMIEMcspdrBsvjFdSBBknvZpjjxNadRzBYSpt2KEcfdKvYQqOAOIRFbg-waiw_coHo7zg9aEKhzpyrlvkktukAPLSqz0wIve5ykeZAN9QY4WqukbYausXIzyicz08IoGo4AeAICS5daiehqWoQuhGapLh",
  },
];

export  default async function EternalUnionMatrimony() {

  return (
    <main className="bg-[#fbf9f8] text-[#1b1c1c] font-sans selection:bg-[#fed488] min-h-screen">
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

            {/* Quick Search Widget */}
            <HomeSearch/>
          </div>
        </div>
      </section>

      {/* Value Proposition */}

      {/* Success Stories */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUCCESS_STORIES.map((story) => (
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
                <div>
                  <p className="italic text-[#43474e] text-sm mb-4">
                    `&quot`{story.quote}`&quot`
                  </p>
                  <h4 className="font-serif text-[#000d22] text-lg font-bold">
                    {story.names}
                  </h4>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#775a19]">
                    {story.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-12 px-4 md:px-16 max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-[#000d22]">
            Discover Distinguished Profiles
          </h2>
          <p className="text-[#43474e] text-base mt-2">
            Explore hand-picked matches that resonate with your background.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PROFILES.map((profile) => {
            return (
              <div
                key={profile.id}
                className="bg-white rounded-xl border border-[#c4c6cf]/30 overflow-hidden group hover:border-[#775a19] transition-colors duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url("${profile.imageUrl}")` }}
                  />
                  {profile.verified && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[#775a19] text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                      <span className="text-[10px] font-semibold text-[#000d22]">
                        VERIFIED
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-[#000d22] text-xl font-bold">
                    {profile.name}
                  </h3>
                  <p className="text-[#43474e] text-sm mt-1">
                    {profile.age} yrs • {profile.profession}
                  </p>
                  <p className="text-[#43474e] text-sm">{profile.location}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {profile.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest bg-[#f5f3f3] text-[#002349]"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <Link href='/profile' className={`block text-center w-full mt-10 text-xl p-2 text-white h-10 bg-gradient-to-r from-[#C5A059] to-[#B08C45] border font-medium rounded `}>
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="search"
            className="text-[#000d22] font-semibold flex items-center gap-2 mx-auto hover:gap-3 transition-all"
          >
            View All Featured Profiles
            <ArrowRight />
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 md:px-16 bg-[#000d22] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full border-l-[100px] border-[#775a19] transform rotate-45 translate-x-1/2" />
        </div>
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

      {/* Footer */}
      <Footer/>      
    </main>
  );
}
