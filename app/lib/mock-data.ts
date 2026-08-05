export type Profile = {
  id: string;
  name: string;
  age: number;
  city: string;
  occupation: string;
  bio: string;
  matchScore: number;
  interests: string[];
  accent: string;
};

export const profiles: Profile[] = [
  {
    id: "aisha",
    name: "Aisha Khan",
    age: 28,
    city: "Dubai",
    occupation: "Product Designer",
    bio: "Warm, curious, and drawn to thoughtful conversations over candlelit dinners.",
    matchScore: 97,
    interests: ["Travel", "Art", "Coffee walks"],
    accent: "from-rose-500 to-orange-400",
  },
  {
    id: "rahul",
    name: "Rahul Mehta",
    age: 31,
    city: "Mumbai",
    occupation: "Software Engineer",
    bio: "Loves weekend getaways, learning new cuisines, and building a calm home life.",
    matchScore: 95,
    interests: ["Cycling", "Cooking", "Music"],
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "neha",
    name: "Neha Sharma",
    age: 29,
    city: "Bengaluru",
    occupation: "Marketing Strategist",
    bio: "Bright and grounded, with a love for wellness, family values, and classic romance.",
    matchScore: 93,
    interests: ["Yoga", "Books", "Brunch"],
    accent: "from-amber-400 to-rose-400",
  },
  {
    id: "siddharth",
    name: "Siddharth Rao",
    age: 33,
    city: "Hyderabad",
    occupation: "Business Consultant",
    bio: "A steady partner who enjoys deep talks, long drives, and meaningful traditions.",
    matchScore: 91,
    interests: ["Photography", "Golf", "Food"],
    accent: "from-sky-500 to-cyan-500",
  },
];

export const stories = [
  {
    title: "From first chat to forever",
    quote:
      "We matched on our values first, and the chemistry followed naturally. Our families felt at ease from the beginning.",
    couple: "Naina & Arjun",
  },
  {
    title: "A calm, beautiful beginning",
    quote:
      "The experience felt intentional, warm, and respectful. We found each other without the pressure of a rushed timeline.",
    couple: "Sara & Dev",
  },
];
