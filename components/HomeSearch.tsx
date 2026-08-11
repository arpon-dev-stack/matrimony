'use client';

import { useState, Suspense } from "react";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function HomeSearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const [searchFilter, setSearchFilter] = useState({
    lookingFor: searchParams.get("lookingFor") || "Woman",
    ageRange: searchParams.get("ageRange") || "24 - 30",
    religion: searchParams.get("religion") || "Any Community",
    location: searchParams.get("location") || "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(searchFilter).forEach(([key, value]) => {
      if (value && value !== "Any Community") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    push(`${pathname}search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur-md p-3 rounded-lg shadow-[0_12px_32px_-8px_rgba(0,35,73,0.08)] grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
    >
      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-wider text-[#43474e]">
          Looking For
        </label>
        <select
          value={searchFilter.lookingFor}
          onChange={(e) =>
            setSearchFilter({ ...searchFilter, lookingFor: e.target.value })
          }
          className="w-full border border-[#c4c6cf]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#775a19] focus:outline-none"
        >
          <option value="Woman">Woman</option>
          <option value="Man">Man</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-wider text-[#43474e]">
          Age Range
        </label>
        <select
          value={searchFilter.ageRange}
          onChange={(e) =>
            setSearchFilter({ ...searchFilter, ageRange: e.target.value })
          }
          className="w-full border border-[#c4c6cf]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#775a19] focus:outline-none"
        >
          <option value="24 - 30">24 - 30</option>
          <option value="31 - 38">31 - 38</option>
          <option value="39 - 45">39 - 45</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-wider text-[#43474e]">
          Religion
        </label>
        <select
          value={searchFilter.religion}
          onChange={(e) =>
            setSearchFilter({ ...searchFilter, religion: e.target.value })
          }
          className="w-full border border-[#c4c6cf]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#775a19] focus:outline-none"
        >
          <option value="Any Community">Any Community</option>
          <option value="Hindu">Hindu</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
          <option value="Sikh">Sikh</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-wider text-[#43474e]">
          Location
        </label>
        <input
          type="text"
          placeholder="City or State"
          value={searchFilter.location}
          onChange={(e) =>
            setSearchFilter({ ...searchFilter, location: e.target.value })
          }
          className="w-full border border-[#c4c6cf]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#775a19] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-[#C5A059] to-[#B08C45] text-white h-[42px] rounded-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}

export default function HomeSearch() {
  return (
    <Suspense fallback={<div className="h-20 bg-white/95 rounded-lg animate-pulse" />}>
      <HomeSearchForm />
    </Suspense>
  );
}