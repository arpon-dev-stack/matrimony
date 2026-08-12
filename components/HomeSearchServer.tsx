import { Search } from "lucide-react";
import { gender_option, religions, age_range_option } from "@/app/lib/userFollow";

export default function SearchForm() {
  return (
    <form
      action="/search"
      method="GET"
      className="bg-white/95 backdrop-blur-md p-3 rounded-lg shadow-[0_12px_32px_-8px_rgba(0,35,73,0.08)] grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
    >
      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-wider text-[#43474e]">
          Looking For
        </label>
        <select
          name="looking_for"
          defaultValue={gender_option[0]}
          className="w-full border border-[#c4c6cf]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#775a19] focus:outline-none"
        >
          {gender_option.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-wider text-[#43474e]">
          Age Range
        </label>
        <select
          name="age_range"
          defaultValue={age_range_option[0]}
          className="w-full border border-[#c4c6cf]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#775a19] focus:outline-none"
        >
          {age_range_option.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-wider text-[#43474e]">
          Religion
        </label>
        <select
          name="religion"
          defaultValue={religions[0]}
          className="w-full border border-[#c4c6cf]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#775a19] focus:outline-none"
        >
          {religions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-bold tracking-wider text-[#43474e]">
          Location
        </label>
        <input
          type="text"
          name="location"
          placeholder="City or State"
          defaultValue="any"
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