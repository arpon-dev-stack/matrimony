'use client';

import { useParams } from 'next/navigation';
import { PrimaryGoldButton } from '@/components/buttons/PrimaryColdenButton';
import { SecondaryOutlineButton } from '@/components/buttons/SecondaryOutlineButton';
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Heart, 
  Mail, 
  Compass, 
  GraduationCap, 
  Ruler, 
  Music, 
  Wine, 
  CloudDownload, 
  HeartHandshake, 
  Anchor, 
  Building2, 
  Star 
} from 'lucide-react';

const PROFILE_DATA = {
  name: "Julian Thorne",
  age: 32,
  location: "London, UK",
  neighborhood: "Chelsea, London",
  quote: "I believe in creating spaces and moments that stand the test of time, both in architecture and in the heart.",
  verified: true,
  isRoyalCircle: true,
  stats: {
    profession: "Architectural Designer",
    education: "Master of Architecture, Yale University",
    height: `6'2" (188 cm)`
  },
  bio: [
    "Raised between the quiet countryside of Cotswolds and the vibrant energy of London, I developed an early appreciation for the dialogue between tradition and modernity. This duality has shaped my perspective on life and my career in architecture—where I strive to design structures that honor the past while embracing the future.",
    "I am a person who finds immense joy in the details—the perfect acoustics of a concert hall, the precise notes of a vintage wine, or the quiet focus of a morning run. Beyond my professional life, I am deeply committed to lifelong learning and personal growth. I value intellectual curiosity, emotional intelligence, and a shared sense of adventure.",
    "I am looking for a partner who is equally passionate about their own path, yet seeks a deep, meaningful connection rooted in mutual respect and shared values. I believe that a great partnership is built on a foundation of friendship, laughter, and a collective vision for a purposeful life."
  ],
  values: {
    spiritual: "Spiritual, with deep respect for traditional values and mindful living.",
    family: "Very close-knit family; believe in strong community ties and frequent family gatherings.",
    community: "Active member of several architectural heritage trusts and local philanthropy circles.",
    lifestyle: "Health-conscious, vegetarian, enjoys an active lifestyle with regular fitness and travel."
  },
  interests: [
    { label: "Classical Piano", icon: Music },
    { label: "Vineyard Tours", icon: Wine },
    { label: "Polo", icon: CloudDownload },
    { label: "Philanthropy", icon: HeartHandshake },
    { label: "Sailing", icon: Anchor },
    { label: "Art Curation", icon: Building2 }
  ],
  preferences: {
    smokeDrink: "Never / Occasionally",
    relocation: "Open to discussing",
    languages: "English, French, Italian"
  },
  images: {
    hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiny1ZyW4clLOZ2TIojewCEh5J_peezsW1Npy-DY0XM-RUwHbLY7av1_VM7ii1oO3d3v97EKDFqoS2GePbXolS0GRXUxe8yCUz6jw4TBYv6BmcYQio9RJGNa1CrzOqcux3gsC-DGSS00R5c4HPecdoZCsFWg8XQp1rUb8OpaEZRpCtYcNrXIz9iDogRhPGDkhVw16MCQWvwKp8M7f6N0x3VtUXR-BuHNOQGxAWv1nWOnRvMVvzWRpJ",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCv3u_G6_hJJGd5zsbhu6mVBU0MgCZ5ygwzb-Cyie9ZTfGbh0lvJiN-TdzujZRrle3soSe3nfysq46l9O_vq0tiTUedyiTjiHydACgvf-gi3bD3E9deSlqg45Aw0ADd5sWGCX7shWyA7Judy57zWFQhNh6-5kZ5r_ZNKXx-9EvVP26JIkVHDGnebMxQV7flVLfRodOCRjgQPQOBLLRJFOjcbWJdCPT6XhirlrsBukHExGgnnJKjGBg_",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBt6YcZDfaz2xkEfJzmbyXs1Jy06ZutC_eUDa9se6YqT9l_zhwEatmIy_GZGbdY1qhMTcE6rMaZafkD3yKkJKsfn5eRD0izhENdiuZsuaPI6_c98CLfQAiNda64EvgxujPxmsoi2tHpgyNzNWQyFgZPOSymIUkdiwpMtE63JFBs3B9WFvqt6c1zbE7IxEVZvVAW5hZIQ2onmnZVWuacf6-4NxKN_igI6uaCCis56osjzF1bY5KB_IZB",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKamWHFsfHLn3PJXbCdJ4YhRf7ZMmsMZChkkUQ7-WtYpEGOyMXJcHaEziCuvlQYPF3svW3Q34O2uyJA52dPmR3-1UM-uC1gOh0P0T49hEKhcE6_5MgXSQSjvV41AidFZbLD-pLxwqCKrWOh-h2n5wUT6H8m1KvQDS6tenU0z0vxWRE5XzgVyjzoNMnyHUY7wKJWu4_lXOiJKK0yfgkRJuxm9hHTHoOpMiJSYTwbQ3CVUsT5uU_WsNp"
    ],
    map: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRFL2s0fTA7DNgdF2UnhodHHPHA-lLKKbDVzVZL0v6DR9Loe3n_Zl2SSlqPL8i6vAR2Ht3AjapC3YIdwV6wPzsTa5MpHJl1UPn6z-EQ2gvpP_v-LXOrPT9qMrDoFen9MGseN4kI86U5IfWc7a8ZTTrFm-OMyV1GKK__8FMC0xNWSdVPevEyRqPUPx9jjTnrjCcRdOrXnN700FuZrtrwy4GgOgNI7zd_eTYc8Qrt0Uoss5J5Pm9zuND"
  }
};

export default function ProfilePage() {
  const {id} = useParams();
  console.log(id);
  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-sans min-h-screen selection:bg-[#fed488] selection:text-[#261900] pb-20 lg:pb-0">
      <main className="mx-auto px-4 py-12">
        {/* Hero Section */}
        <HeroSection data={PROFILE_DATA} />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Bio, Values, and Gallery */}
          <div className="lg:col-span-8 space-y-12">
            <MyStory bio={PROFILE_DATA.bio} />
            <ValuesSection values={PROFILE_DATA.values} />
            <GallerySection images={PROFILE_DATA.images.gallery} />
          </div>

          {/* Right Column: Lifestyle & Quick Facts */}
          <aside className="lg:col-span-4 space-y-6">
            <Sidebar data={PROFILE_DATA} />
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ==========================================================================
   Sub-Components
   ========================================================================== */

function HeroSection({ data }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12">
      {/* Profile Photo */}
      <div className="lg:col-span-7 relative group">
        <div className="aspect-[4/5] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <img
            src={data.images.hero}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {data.verified && (
          <div className="absolute top-6 right-6">
            <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-[#C5A059]/30 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#775a19]" />
              <span className="text-[12px] tracking-wider uppercase font-semibold text-[#775a19]">
                Verified Profile
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Hero Details */}
      <div className="lg:col-span-5 pt-2">
        <div className="mb-6">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000d22] mb-2">
            {data.name}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 font-medium text-sm sm:text-base">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-5 h-5 text-gray-500" />
              {data.age} Years
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-5 h-5 text-gray-500" />
              {data.location}
            </span>
          </div>
        </div>

        <blockquote className="font-serif text-xl sm:text-2xl text-[#000d22] mb-6 italic leading-relaxed">
          "{data.quote}"
        </blockquote>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <PrimaryGoldButton className="py-4 px-8 flex-1">
            <Heart className="w-5 h-5 fill-current" />
            Send Interest
          </PrimaryGoldButton>
          <SecondaryOutlineButton className="py-4 px-8 flex-1">
            <Mail className="w-5 h-5" />
            Message
          </SecondaryOutlineButton>
        </div>

        {/* Core Stats Card */}
        <div className="grid grid-cols-1 gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <StatRow 
            icon={Compass} 
            label="Profession" 
            value={data.stats.profession} 
          />
          <div className="h-px bg-gray-100" />
          <StatRow 
            icon={GraduationCap} 
            label="Education" 
            value={data.stats.education} 
          />
          <div className="h-px bg-gray-100" />
          <StatRow 
            icon={Ruler} 
            label="Height" 
            value={data.stats.height} 
          />
        </div>
      </div>
    </section>
  );
}

function StatRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-[#000d22]/5 p-2 rounded-lg">
        <Icon className="w-5 h-5 text-[#000d22]" />
      </div>
      <div>
        <p className="text-[12px] tracking-wider uppercase font-semibold text-gray-500 mb-0.5">
          {label}
        </p>
        <p className="text-base text-[#000d22] font-semibold">{value}</p>
      </div>
    </div>
  );
}

function MyStory({ bio }) {
  return (
    <section>
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#000d22] mb-6 flex items-center gap-3">
        <span className="w-8 h-[2px] bg-[#775a19]" />
        My Story
      </h2>
      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
        {bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function ValuesSection({ values }) {
  return (
    <section className="bg-gray-50/80 p-8 rounded-xl border border-gray-200/80">
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#000d22] mb-8">
        Values & Background
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ValueItem label="Spiritual Path" value={values.spiritual} />
          <ValueItem label="Family Values" value={values.family} />
        </div>
        <div className="space-y-6">
          <ValueItem label="Community" value={values.community} />
          <ValueItem label="Diet & Lifestyle" value={values.lifestyle} />
        </div>
      </div>
    </section>
  );
}

function ValueItem({ label, value }) {
  return (
    <div>
      <h3 className="text-[12px] tracking-wider uppercase font-semibold text-[#775a19] mb-1">
        {label}
      </h3>
      <p className="text-base text-[#1b1c1c] leading-normal">{value}</p>
    </div>
  );
}

function GallerySection({ images }) {
  return (
    <section>
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#000d22] mb-6">
        Moments & Journeys
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((imgUrl, index) => (
          <div
            key={index}
            className={`aspect-square rounded-lg overflow-hidden border border-gray-200 ${
              index === 2 ? 'col-span-2 md:col-span-1' : ''
            }`}
          >
            <img
              src={imgUrl}
              alt={`Gallery moment ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Sidebar({ data }) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-6 space-y-6">
      <h3 className="font-serif text-2xl font-semibold text-[#000d22]">
        Lifestyle & Interests
      </h3>

      {/* Interests Chips */}
      <div>
        <p className="text-[12px] tracking-wider uppercase font-semibold text-gray-500 mb-3">
          Leisure Pursuits
        </p>
        <div className="flex flex-wrap gap-2">
          {data.interests.map((interest, idx) => {
            const Icon = interest.icon;
            return (
              <span
                key={idx}
                className="bg-[#fbf9f8] text-[#000d22] px-3.5 py-1.5 rounded-full text-sm font-medium border border-gray-200 flex items-center gap-2"
              >
                <Icon className="w-4 h-4 text-gray-600" />
                {interest.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Quick Preferences */}
      <div>
        <p className="text-[12px] tracking-wider uppercase font-semibold text-gray-500 mb-3">
          Quick Preferences
        </p>
        <ul className="space-y-3 text-sm">
          <PreferenceRow label="Smoke / Drink" value={data.preferences.smokeDrink} />
          <PreferenceRow label="Relocation" value={data.preferences.relocation} />
          <PreferenceRow label="Languages" value={data.preferences.languages} />
        </ul>
      </div>

      {/* Map Widget */}
      <div className="pt-2">
        <p className="text-[12px] tracking-wider uppercase font-semibold text-gray-500 mb-3">
          Primary Residence
        </p>
        <div className="relative h-40 rounded-lg overflow-hidden border border-gray-200 grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer group">
          <img
            src={data.images.map}
            alt="Residence Map Location"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#000d22]/10 flex items-center justify-center">
            <div className="bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#775a19] animate-pulse" />
              <span className="text-[12px] tracking-wider font-bold uppercase text-[#000d22]">
                {data.neighborhood}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Badge */}
      {data.isRoyalCircle && (
        <div className="bg-[#000d22] p-6 rounded-lg text-center text-white">
          <Star className="w-10 h-10 text-[#fed488] mx-auto mb-2 fill-current" />
          <h4 className="font-serif text-xl font-bold mb-1">Exclusive Match</h4>
          <p className="text-gray-300 text-xs leading-relaxed">
            Julian is a vetted member of the Royal Circle at EternalUnion.
          </p>
        </div>
      )}
    </section>
  );
}

function PreferenceRow({ label, value }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="text-[#000d22] font-medium">{value}</span>
    </li>
  );
}