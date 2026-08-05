'use client';
import React, { useState } from 'react';
import { Star, Heart, ArrowRight, Sparkles } from 'lucide-react';

const STORIES = [
  {
    id: 1,
    names: 'Aditya & Meera',
    location: 'LONDON • DEC 2023',
    quote:
      'The curated profiles on EternalUnion saved us from the noise. We found each other in weeks and knew in days.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDW9dlnue9vHRRnMOXfejVziTQU17prjt2NKVGis2Ao08UYfOcqC6QsvVgqoptJ8c5j4iPhedn6yOj3PEzXfLte_nykFyCc9I9tT3LZ7qPoh744X89RmhYLSIsWCvQEdPW3o6cucbpjc7LNkanOk8y3EuHBIhR2mQEejsY56dEDN5AKoVviHo5jMnFAJR2d7d_CCj00DWnlAD_qAl1h7h4WN-_2zeEcAnWKtYyDlOCK0kjkAfCKSE12',
  },
  {
    id: 2,
    names: 'Vikram & Sarah',
    location: 'NEW YORK • OCT 2023',
    quote:
      'Distance was no barrier. The video features allowed us to build a foundation before we even met in person.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCe_5P5XvqAwzXUNH8yWGA5WnyqlhOSgVKuYWmIVkAwngLnhGNzprer5sZ9YodD71LOKgTeUQSRL9_JWBKmY21MkS6aTnbqLsOrXtri1Gsh6EnaG01NpP4ZWJqviTMLYK4sjVeObqQkx5S1VwoIXSezzcSP3a1-6wqKVLFGGfmaE9qciyMCMJi939ckpZzzNEUee9n4Szc-wIUEOHWhbAH90-YKLvIlo_CwdHVOkYUzUN2bPnh9PwH',
  },
  {
    id: 3,
    names: 'Rohan & Diya',
    location: 'GOA • NOV 2023',
    quote:
      'Our families were so impressed with the transparency. It made the entire union seamless and joyful.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6JzfTvNN_VOI4bn4Y0jyJLg_9ZgK1SoGmwbv8tRGctcpUq6qnISeh7BdXt9_gslvcZWMZrgfH1TaxdePKAczaWWv42aJrwtccw6DzYV7QOIk1O0lYCOkTwtp2LvABTV5bLX8HbjZMbTa0RzEbBIJf94pwTfWm8hsmpWrR3MHTLclH7UqX-zaa9fhFgTh1QasAu7S1VldA8gTLdXcm-fwDkjNnwLEFHZg_ijmuYRkXNiCDYkImkwdc',
  },
  {
    id: 4,
    names: 'Kabir & Anjali',
    location: 'DELHI • JAN 2024',
    quote:
      'Finding a partner with the same career drives was easy here. We are a power couple thanks to EternalUnion.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdyHJUvNhgfEV_cscYMZKFCD8_dcUM8FCatgACbjFzSreu9DCziu1eCeFcimcTQ5HaVQOXpoEvYpyJqbrG29zjHSxWqpqilovhe0QVj42sDB3ikVJvJ6JQq8buuDeJj_rWU3JtlqyWFKpMgSeoMdn6Zu4oGPwvwI0HRaWZOnhjBbOvUZnzIyiMZpDLetYwGepB-cAuWYOEPWEEt__f3nqTR5sQG59MGlv4Vznn7Kh2hTbcZWNLoAgo',
  },
  {
    id: 5,
    names: 'Zayn & Myra',
    location: 'DUBAI • FEB 2024',
    quote:
      'The exclusivity of the community gave us peace of mind. Truly a premium experience from start to finish.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzA2QQ_UovHCPcnYmTgiy2xVccN1hyfz3jzEevq2aXzktM95Hk0pHpr7GNVrOa6b8ON5KVDL20oVm1FUb5dZZCpMYfwTpG5ryLen_KQgGezo5oNO4pQ8oDHUk6BgkqWWmek1J-xUamlnnLPwhawYa13xdqq8zakO3NyUdOEeSlAovZIEqJpGQEcNyeF6m0lUR4HBYXxC19ub_M5xvaAjLTABOLMjM1J_VzrwSp7dPxj2anh3Dz74ok',
  },
  {
    id: 6,
    names: 'Arjun & Priya',
    location: 'SINGAPORE • MAR 2024',
    quote:
      'What started as a simple interest became a lifelong commitment. We recommend this to all our serious friends.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDhUuZzVD1oQklpE1T_MWIIDXV7NIlk3U98NhHhPFkx6TwTlC4gKK5vzCkamNVKvrEsbnCZfpcDbUwz2HivpfKCotPzHlbSAyEPQesLwc-MtIduIB4ey5WXaH3_SBTdz2HUUhB-P52o2CpmP9uonGVcDw-H8UtoJ3NAyvx4IiBk0ZgC_0Q227t5zZYc_kPVmQVnxoI7UCmdLLCZBg8PMOgudjgJWg0bD87RC5Rnzt-PGCiSj18UHKcc',
  },
];

const StoryCard = ({ story }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/60 group"
    >
      <div className="h-64 overflow-hidden relative">
        <img
          src={story.image}
          alt={story.names}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
          <span className="text-white text-xs font-semibold tracking-widest uppercase">
            {story.location}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-serif text-2xl font-semibold text-[#000d22] mb-2">
          {story.names}
        </h4>
        <p className="text-slate-600 italic text-sm line-clamp-3 mb-6 leading-relaxed">
          "{story.quote}"
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-[#775a19] font-semibold text-sm group-hover:underline">
            View Story
          </span>
          <Heart
            className={`w-5 h-5 text-[#775a19] transition-all duration-300 ${
              isHovered ? 'fill-[#775a19]' : 'fill-none'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default function EternalLoveStories() {
  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[800px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center scale-105 transform transition-transform duration-700"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2MNLapcF-Jgtyhn0XtjzEkiR-8p6oqLZrR_OD-ZzbUXqrO0yhX-2Ht9gE02Cvvwgf1JBN3qHN_xzb6YnHnSFBbd-osH-lZJoLc79JywxKqFgCkYeJCeH5wHAt7o6ppNd9yd7ogZQv-Fy_hBLPkPLK0YR-viPfb-3PWaRp8mKL5GHi0anL_3zsFgkljmP1jfMfZ932utR9t2p8NzVt--tlbTZcQwgPskC8y3SPc47nUY3BRTtCpo06')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000d22]/40 to-[#000d22]/80" />
        </div>

        <div className="relative z-10 text-center px-4 md:px-0 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffdea5] mb-3 block">
            Testimonials
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Eternal Love Stories
          </h1>
          <p className="text-lg md:text-xl text-white/90 italic font-light">
            "Where soulmates meet and modern heritage begins."
          </p>
        </div>
      </section>

      {/* Featured Story Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px bg-[#775a19] w-12" />
          <h2 className="font-serif text-3xl font-semibold text-[#000d22]">
            Story of the Month
          </h2>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row items-stretch border border-slate-100">
          <div className="lg:w-1/2 relative min-h-[400px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwzPVbKWniWeidzkxta9mCb5siYIvfsXvPOndPKyUD2WzsCQeV4zC_MKa0IQ6Di0QRegc-nYIMKZK8ytpr2fPaDRZ_LQtF1nEzCDa9QebmyQ0JGN8bdDccGZi4M3a7ahpaBjjaWbHs3W-uNuIqVwx1ewLkf1j4sR4_Wa53YhPta2Qb0P4WW9Gs2ULLgBzO9Pg3_s5ocRvrH-ixFK40Q5TgVHQM09yWHOlYZzkaRrCs5vEHpROGOvNf')`,
              }}
            />
          </div>
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white border-l border-slate-100">
            <div className="mb-4 flex items-center gap-2 text-[#775a19]">
              <Star className="w-4 h-4 fill-[#775a19]" />
              <span className="text-xs font-semibold tracking-wider uppercase">
                Featured Union
              </span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-semibold text-[#000d22] mb-4">
              Aarav & Isha’s Synchronicity
            </h3>
            <p className="text-slate-600 text-lg italic mb-6 leading-relaxed">
              "We both approached EternalUnion with the hope of finding someone
              who valued tradition as much as modern ambition. From our first
              conversation, it felt like we had known each other for lifetimes.
              The platform didn't just give us a match; it gave us a mirror to
              our own souls."
            </p>
            <div className="space-y-1 mb-8">
              <p className="font-semibold text-[#1b1c1c]">
                Married September 2023
              </p>
              <p className="text-sm text-slate-500">
                The Taj Mahal Palace, Mumbai
              </p>
            </div>
            <div>
              <button className="bg-gradient-to-r from-[#C5A059] to-[#B08C45] text-white px-6 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-md">
                Read Full Journey
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Stories Section */}
      <section className="py-16 bg-[#f5f3f3] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#000d22] mb-2">
              Beautiful Beginnings
            </h2>
            <p className="text-slate-600">
              Discover the journeys of couples who found their forever on
              EternalUnion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STORIES.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#000d22] text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="mb-6 flex justify-center">
            <Sparkles className="w-12 h-12 text-[#C5A059]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-4">
            Is EternalUnion part of your journey?
          </h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            We believe every great love story deserves to be celebrated. Share
            your journey with us and inspire others seeking their perfect
            union.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-[#C5A059] to-[#B08C45] text-white px-8 py-4 rounded-lg font-bold text-base hover:shadow-lg transition-all w-full sm:w-auto">
              Share Your Story
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-white/10 transition-all w-full sm:w-auto">
              Contact Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}