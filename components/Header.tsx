"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function Header() {
  const router = useRouter();

  // Helper to convert strings into lowercase snake_case
  const toSnakeCase = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const term = formData.get("name")?.toString().trim();

    if (term) {
      const formattedTerm = toSnakeCase(term);
      router.push(`/search?name=${encodeURIComponent(formattedTerm)}&page=1`);
      e.currentTarget.reset();
    } else {
      router.push("/search");
    }
  };

  return (
    <header className="h-24 px-16 flex items-center justify-between border-b border-[#c4c6cf]/10 backdrop-blur-md bg-[#fbf9f8]/80 z-10">
      <form onSubmit={handleSearch} className="relative w-full h-11 max-w-2xl">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          className="w-full bg-[#f5f3f3] border border-[#c4c6cf]/30 rounded-full h-11 pl-4 pr-14 text-sm focus:ring-2 focus:ring-[#775a19]/20 focus:border-[#775a19] outline-none transition-all"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute rounded-full right-[2px] flex justify-center items-center top-[2px] h-10 w-10 bg-gradient-to-r from-[#C5A059] to-[#B08C45] hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Search className="h-5 w-5 text-white" />
        </button>
      </form>
    </header>
  );
}