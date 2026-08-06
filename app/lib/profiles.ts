// lib/profiles.ts

import { db } from "./bd";

export interface Profile {
  id: number;
  name: string;
  gender?: string;
  age: number;
  location: string;
  religion?: string;
  profession: string;
  education: string;
  badge: string | null;
  tags: string[];
  imageUrl: string;
}

export const PROFILES_DATA: Profile[] = [
  {
    id: 1,
    name: "Alexander Sterling",
    gender: "Man",
    age: 29,
    location: "Kensington, London",
    religion: "Christianity",
    profession: "Investment Banker",
    education: "MBA, Cambridge",
    badge: "Verified",
    tags: ["Philosophy", "Polo", "Travel", "Fine Arts"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/...",
  },
  {
    id: 2,
    name: "Seraphina Chen",
    gender: "Woman",
    age: 27,
    location: "Dhaka",
    religion: "Hinduism",
    profession: "Neurosurgeon",
    education: "Masters",
    badge: "Premium",
    tags: ["Fine Arts", "Cello", "Wine Tasting"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/...",
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    gender: "Man",
    age: 31,
    location: "Downtown, Dubai",
    religion: "Hinduism",
    profession: "Tech Entrepreneur",
    education: "MSc, Stanford",
    badge: null,
    tags: ["Yachting", "Aviation", "Golf"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/...",
  },
  {
    id: 4,
    name: "Isabella Vane",
    gender: "Woman",
    age: 28,
    location: "Dhaka",
    religion: "Christianity",
    profession: "Corporate Lawyer",
    education: "Masters",
    badge: null,
    tags: ["Literature", "Fine Arts", "Classical Opera"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/...",
  },
];

export async function getFilteredProfiles(params: {
  lookingFor?: string;
  ageRange?: string;
  location?: string;
  religion?: string;
  education?: string;
  interests?: string;
}): Promise<Profile[]> {
  // If fetching from a real API backend, construct your query here:
  // const res = await fetch(`https://api.example.com/profiles?${new URLSearchParams(params)}`);
  // return res.json();

  return PROFILES_DATA.filter((profile) => {
    // 1. Gender check
    if (params.lookingFor && profile.gender) {
      if (profile.gender.toLowerCase() !== params.lookingFor.toLowerCase()) {
        return false;
      }
    }

    // 2. Age Range check (e.g., "24 - 30")
    if (params.ageRange) {
      const [minAge, maxAge] = params.ageRange
        .split("-")
        .map((val) => parseInt(val.trim(), 10));
      if (!isNaN(minAge) && profile.age < minAge) return false;
      if (!isNaN(maxAge) && profile.age > maxAge) return false;
    }

    // 3. Location check
    if (
      params.location &&
      !profile.location.toLowerCase().includes(params.location.toLowerCase())
    ) {
      return false;
    }

    // 4. Multi-value Religion check (comma separated: "Hinduism,Christianity")
    if (params.religion && profile.religion) {
      const selectedReligions = params.religion
        .split(",")
        .map((r) => r.trim().toLowerCase());
      if (!selectedReligions.includes(profile.religion.toLowerCase())) {
        return false;
      }
    }

    // 5. Education check
    if (
      params.education &&
      !profile.education.toLowerCase().includes(params.education.toLowerCase())
    ) {
      return false;
    }

    // 6. Interests / Tags check (comma separated: "Fine Arts")
    if (params.interests) {
      const requestedInterests = params.interests
        .split(",")
        .map((i) => i.trim().toLowerCase());
      const profileTags = profile.tags.map((t) => t.toLowerCase());
      const hasMatchingInterest = requestedInterests.some((interest) =>
        profileTags.includes(interest),
      );
      if (!hasMatchingInterest) return false;
    }

    return true;
  });
}

export async function getProfile(id: number): Promise<T> {
  const { data: user } = await db
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return { user };
}

export async function getProfiles(): Promise<T> {
  const { data: users } = await db
    .from("users")
    .select("*");

  return { users };
}
