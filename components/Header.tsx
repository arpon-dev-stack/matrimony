"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState} from "react";
import { Search } from "lucide-react";

export default function Header() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const [term, setTerm] = useState("");

  // Sync input value with URL search param on load or URL update

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (term.trim()) {
      params.set("name", term.trim());
      setTerm('');
    } else {
      params.delete("name");
    }

    push(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="h-24 px-16 flex items-center justify-between border-b border-[#c4c6cf]/10 backdrop-blur-md bg-[#fbf9f8]/80 z-10">
      <div className="relative w-full h-11 max-w-2xl">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search by name"
          className="w-full bg-[#f5f3f3] border border-[#c4c6cf]/30 rounded-full h-11 pl-4 pr-14 text-sm focus:ring-2 focus:ring-[#775a19]/20 focus:border-[#775a19] outline-none transition-all"
        />
        <button
          onClick={handleSearch}
          type="button"
          aria-label="Search"
          className="absolute rounded-full right-[2px] flex justify-center items-center top-[2px] h-10 w-10 bg-gradient-to-r from-[#C5A059] to-[#B08C45] hover:opacity-90 transition-opacity"
        >
          <Search className="h-5 w-5 text-white" />
        </button>
      </div>
    </header>
  );
}