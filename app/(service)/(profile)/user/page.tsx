"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/_store/AuthContext";
import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Edit,
  LogOut,
  Ruler,
  GraduationCap,
  Briefcase,
  Music,
  Wine,
  HeartHandshake,
  Ship,
  Landmark,
  Star,
  Heart,
  Mail,
} from "lucide-react";

export default function UserProfile() {
  const {signOut} = useAuth();
  const [profile, setProfile] = useState({
    name: "Julian Thorne",
    age: 32,
    location: "London, UK",
    quote:
      "I believe in creating spaces and moments that stand the test of time, both in architecture and in the heart.",
    verified: true,
    profession: "Architectural Designer",
    education: "Master of Architecture, Yale University",
    height: `6'2" (188 cm)`,
    bio: [
      "Raised between the quiet countryside of Cotswolds and the vibrant energy of London, I developed an early appreciation for the dialogue between tradition and modernity. This duality has shaped my perspective on life and my career in architecture—where I strive to design structures that honor the past while embracing the future.",
      "I am a person who finds immense joy in the details—the perfect acoustics of a concert hall, the precise notes of a vintage wine, or the quiet focus of a morning run. Beyond my professional life, I am deeply committed to lifelong learning and personal growth. I value intellectual curiosity, emotional intelligence, and a shared sense of adventure.",
      "I am looking for a partner who is equally passionate about their own path, yet seeks a deep, meaningful connection rooted in mutual respect and shared values. I believe that a great partnership is built on a foundation of friendship, laughter, and a collective vision for a purposeful life.",
    ],
    values: {
      spiritualPath:
        "Spiritual, with deep respect for traditional values and mindful living.",
      familyValues:
        "Very close-knit family; believe in strong community ties and frequent family gatherings.",
      community:
        "Active member of several architectural heritage trusts and local philanthropy circles.",
      dietLifestyle:
        "Health-conscious, vegetarian, enjoys an active lifestyle with regular fitness and travel.",
    },
    preferences: {
      smokeDrink: "Never / Occasionally",
      relocation: "Open to discussing",
      languages: "English, French, Italian",
    },
    residence: "Chelsea, London",
  });

  const hobbies = [
    { name: "Classical Piano", icon: Music },
    { name: "Vineyard Tours", icon: Wine },
    { name: "Polo", icon: Star },
    { name: "Philanthropy", icon: HeartHandshake },
    { name: "Sailing", icon: Ship },
    { name: "Art Curation", icon: Landmark },
  ];

  const galleryImages = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv3u_G6_hJJGd5zsbhu6mVBU0MgCZ5ygwzb-Cyie9ZTfGbh0lvJiN-TdzujZRrle3soSe3nfysq46l9O_vq0tiTUedyiTjiHydACgvf-gi3bD3E9deSlqg45Aw0ADd5sWGCX7shWyA7Judy57zWFQhNh6-5kZ5r_ZNKXx-9EvVP26JIkVHDGnebMxQV7flVLfRodOCRjgQPQOBLLRJFOjcbWJdCPT6XhirlrsBukHExGgnnJKjGBg_",
      alt: "Julian at a vineyard",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt6YcZDfaz2xkEfJzmbyXs1Jy06ZutC_eUDa9se6YqT9l_zhwEatmIy_GZGbdY1qhMTcE6rMaZafkD3yKkJKsfn5eRD0izhENdiuZsuaPI6_c98CLfQAiNda64EvgxujPxmsoi2tHpgyNzNWQyFgZPOSymIUkdiwpMtE63JFBs3B9WFvqt6c1zbE7IxEVZvVAW5hZIQ2onmnZVWuacf6-4NxKN_igI6uaCCis56osjzF1bY5KB_IZB",
      alt: "Hands playing piano",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKamWHFsfHLn3PJXbCdJ4YhRf7ZMmsMZChkkUQ7-WtYpEGOyMXJcHaEziCuvlQYPF3svW3Q34O2uyJA52dPmR3-1UM-uC1gOh0P0T49hEKhcE6_5MgXSQSjvV41AidFZbLD-pLxwqCKrWOh-h2n5wUT6H8m1KvQDS6tenU0z0vxWRE5XzgVyjzoNMnyHUY7wKJWu4_lXOiJKK0yfgkRJuxm9hHTHoOpMiJSYTwbQ3CVUsT5uU_WsNp",
      alt: "Formal evening gala",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans selection:bg-[#ffdea5]">
      <main className="mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
          {/* Main Photo */}
          <div className="lg:col-span-7 relative group">
            <div className="aspect-[4/5] overflow-hidden rounded-xl border border-gray-200">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiny1ZyW4clLOZ2TIojewCEh5J_peezsW1Npy-DY0XM-RUwHbLY7av1_VM7ii1oO3d3v97EKDFqoS2GePbXolS0GRXUxe8yCUz6jw4TBYv6BmcYQio9RJGNa1CrzOqcux3gsC-DGSS00R5c4HPecdoZCsFWg8XQp1rUb8OpaEZRpCtYcNrXIz9iDogRhPGDkhVw16MCQWvwKp8M7f6N0x3VtUXR-BuHNOQGxAWv1nWOnRvMVvzWRpJ"
                alt={profile.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
              />
            </div>
            {profile.verified && (
              <div className="absolute top-6 right-6">
                <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-[#C5A059]/30 shadow-sm text-xs font-semibold uppercase tracking-wider text-[#775a19]">
                  <CheckCircle2 className="w-4 h-4 text-[#775a19]" />
                  Verified Profile
                </span>
              </div>
            )}
          </div>

          {/* Hero Details */}
          <div className="lg:col-span-5 pt-2">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#000d22] mb-2">
                {profile.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 font-medium text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {profile.age} Years
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </span>
              </div>
            </div>

            <p className="font-serif text-xl text-[#000d22] mb-6 italic leading-relaxed">
              "{profile.quote}"
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Link href='/edit' className="flex-1 py-3.5 px-4 rounded-lg text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-[#C5A059] to-[#B08C45] hover:brightness-105 transition-all shadow-md">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Link>
              <button onClick={signOut} className="flex-1 py-3.5 px-4 rounded-lg border-2 border-[#000d22] text-[#000d22] font-semibold flex items-center justify-center gap-2 hover:bg-[#000d22]/5 transition-all">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            {/* Core Stats */}
            <div className="grid grid-cols-1 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-[#000d22]/5 p-2 rounded-lg text-[#000d22]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-0.5">
                    Profession
                  </p>
                  <p className="font-semibold text-[#000d22]">
                    {profile.profession}
                  </p>
                </div>
              </div>

              <div className="h-px bg-gray-100"></div>

              <div className="flex items-start gap-4">
                <div className="bg-[#000d22]/5 p-2 rounded-lg text-[#000d22]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-0.5">
                    Education
                  </p>
                  <p className="font-semibold text-[#000d22]">
                    {profile.education}
                  </p>
                </div>
              </div>

              <div className="h-px bg-gray-100"></div>

              <div className="flex items-start gap-4">
                <div className="bg-[#000d22]/5 p-2 rounded-lg text-[#000d22]">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-0.5">
                    Height
                  </p>
                  <p className="font-semibold text-[#000d22]">
                    {profile.height}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Story */}
            <section>
              <h2 className="text-2xl md:text-3xl font-serif text-[#000d22] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#775a19]"></span>
                My Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg font-light">
                {profile.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Values */}
            <section className="bg-gray-100/50 p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-serif text-[#000d22] mb-6">
                Values & Background
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-[#775a19] tracking-wider mb-1">
                      Spiritual Path
                    </h3>
                    <p className="text-gray-800">
                      {profile.values.spiritualPath}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-[#775a19] tracking-wider mb-1">
                      Family Values
                    </h3>
                    <p className="text-gray-800">
                      {profile.values.familyValues}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-[#775a19] tracking-wider mb-1">
                      Community
                    </h3>
                    <p className="text-gray-800">{profile.values.community}</p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-semibold text-[#775a19] tracking-wider mb-1">
                      Diet & Lifestyle
                    </h3>
                    <p className="text-gray-800">
                      {profile.values.dietLifestyle}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Photo Gallery */}
            <section>
              <h2 className="text-2xl md:text-3xl font-serif text-[#000d22] mb-6">
                Moments & Journeys
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded-lg overflow-hidden border border-gray-200 ${
                      idx === 2 ? "col-span-2 md:col-span-1" : ""
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-xl font-serif text-[#000d22] mb-6">
                Lifestyle & Interests
              </h3>

              {/* Interests Tags */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-3">
                    Leisure Pursuits
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {hobbies.map((hobby, i) => {
                      const IconComponent = hobby.icon;
                      return (
                        <span
                          key={i}
                          className="bg-[#fbf9f8] text-[#000d22] px-3.5 py-1.5 rounded-full text-xs font-medium border border-gray-200 flex items-center gap-1.5"
                        >
                          <IconComponent className="w-3.5 h-3.5 text-gray-600" />
                          {hobby.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* Quick Preferences */}
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-3">
                    Quick Preferences
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Smoke / Drink</span>
                      <span className="font-medium text-[#000d22]">
                        {profile.preferences.smokeDrink}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Relocation</span>
                      <span className="font-medium text-[#000d22]">
                        {profile.preferences.relocation}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Languages</span>
                      <span className="font-medium text-[#000d22]">
                        {profile.preferences.languages}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Location Map Preview */}
                <div className="pt-2">
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-3">
                    Primary Residence
                  </p>
                  <div className="relative h-36 rounded-lg overflow-hidden border border-gray-200 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRFL2s0fTA7DNgdF2UnhodHHPHA-lLKKbDVzVZL0v6DR9Loe3n_Zl2SSlqPL8i6vAR2Ht3AjapC3YIdwV6wPzsTa5MpHJl1UPn6z-EQ2gvpP_v-LXOrPT9qMrDoFen9MGseN4kI86U5IfWc7a8ZTTrFm-OMyV1GKK__8FMC0xNWSdVPevEyRqPUPx9jjTnrjCcRdOrXnN700FuZrtrwy4GgOgNI7zd_eTYc8Qrt0Uoss5J5Pm9zuND"
                      alt="Map view"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#000d22]/10 flex items-center justify-center">
                      <div className="bg-white px-3 py-1 rounded-full shadow border border-gray-100 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#775a19] animate-pulse"></span>
                        <span className="text-xs font-bold text-[#000d22]">
                          {profile.residence}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exclusive Badge */}
                <div className="bg-[#000d22] p-6 rounded-lg text-center text-white">
                  <Star className="w-8 h-8 text-[#C5A059] mx-auto mb-2 fill-[#C5A059]" />
                  <h4 className="font-serif text-lg font-semibold mb-1">
                    Exclusive Match
                  </h4>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Julian is a vetted member of the Royal Circle at
                    EternalUnion.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
