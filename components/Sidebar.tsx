"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { SelectInput } from "./SelectInput";
import { age_Range_Option, religions } from "@/app/lib/userFollow";

export default function Sidebar() {
//     {
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const educationLevels = ["Doctorate", "Masters"];

  // Local state for all filters
  const [lookingFor, setLookingFor] = useState("Woman");
  const [ageRange, setAgeRange] = useState("24 - 30");
  const [location, setLocation] = useState("");
  const [selectedReligion, setSelectedReligion] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const onClose = () => setIsSidebarOpen(false);

  // Sync state with URL params on load or URL change
  useEffect(() => {
    setLookingFor(searchParams.get("lookingFor") || "Woman");
    setAgeRange(searchParams.get("ageRange") || "24 - 30");
    setLocation(searchParams.get("location") || "");
    setSelectedReligion(
      searchParams.get("religion")?.split(",").filter(Boolean) || [],
    );
    setSelectedEducation(
      searchParams.get("education")?.split(",").filter(Boolean) || [],
    );
    setSelectedInterests(
      searchParams.get("interests")?.split(",").filter(Boolean) || [],
    );
  }, [searchParams]);

  // Handle toggling arrays (religion, education, interests)
  const toggleSelection = (
    item: string,
    list: string[],
    setList: (val: string[]) => void,
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Submit and update searchParams in URL
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (lookingFor) params.set("lookingFor", lookingFor);
    else params.delete("lookingFor");

    if (ageRange) params.set("ageRange", ageRange);
    else params.delete("ageRange");

    if (location.trim()) {
      params.set("location", location.trim());
    } else {
      params.delete("location");
    }

    if (selectedReligion.length > 0) {
      params.set("religion", selectedReligion.join(","));
    } else {
      params.delete("religion");
    }

    if (selectedEducation.length > 0) {
      params.set("education", selectedEducation.join(","));
    } else {
      params.delete("education");
    }

    if (selectedInterests.length > 0) {
      params.set("interests", selectedInterests.join(","));
    } else {
      params.delete("interests");
    }

    push(`${pathname}?${params.toString()}`);
    if (onClose) onClose();
  };

  const handleReset = () => {
    setLookingFor("Woman");
    setAgeRange("24 - 30");
    setLocation("");
    setSelectedReligion([]);
    setSelectedEducation([]);
    setSelectedInterests([]);
    push(pathname);
  };

  return (
    <>
      {/* Backdrop for mobile/tablet drawer */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Container */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-80 h-full border-r border-[#c4c6cf]/30 bg-[#fbf9f8] 
          flex flex-col shrink-0 overflow-hidden
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-8 border-b border-[#c4c6cf]/20 flex justify-between items-center">
          <div>
            <h1 className="font-serif text-2xl text-[#000d22] font-semibold">
              EternalUnion
            </h1>
            <p className="text-sm text-[#43474e] mt-1">Refine your destiny</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-[#43474e] hover:text-[#000d22] p-1 text-xl font-bold"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {/* Looking For (Gender) Filter */}
          <section>
            <label className="block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#74777f] mb-3">
              Looking For
            </label>
            <div className="flex gap-6">
              {[
                { label: "Woman", value: "Woman" },
                { label: "Man", value: "Man" },
                { label: "Other", value: "Other" },
              ].map((genderOption) => (
                <label
                  key={genderOption.value}
                  className="flex items-center gap-2 cursor-pointer group capitalize"
                >
                  <input
                    type="radio"
                    name="lookingFor"
                    value={genderOption.value}
                    checked={lookingFor === genderOption.value}
                    onChange={(e) => setLookingFor(e.target.value)}
                    className="w-4 h-4 border-[#c4c6cf] text-[#775a19] focus:ring-[#775a19]"
                  />
                  <span className="text-base text-[#43474e] group-hover:text-[#000d22] transition-colors">
                    {genderOption.label}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Age Range Filter */}
          {/* <section>
            <label className="text-xs text-[#43474e] block mb-2 uppercase tracking-wider font-semibold">
              Age Range
            </label>
            <select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full bg-white border border-[#c4c6cf] rounded-lg p-3 text-sm appearance-none focus:ring-1 focus:ring-[#000d22] outline-none"
            >
              <option value="24 - 30">24 - 30</option>
              <option value="31 - 38">31 - 38</option>
              <option value="39 - 45">39 - 45</option>
            </select>
          </section> */}
          <SelectInput options={age_Range_Option} onChange={setAgeRange} label="Age Range" value={ageRange} name="age_range"/>

          {/* Location Text Input Filter */}
          <section>
            <label className="text-xs text-[#43474e] block mb-2 uppercase tracking-wider font-semibold">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g., London, New York, Tokyo"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full bg-white border border-[#c4c6cf] rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#000d22] outline-none placeholder:text-[#a0a4ab]"
            />
          </section>

          {/* religion Filter */}
          <section>
            <label className="text-xs text-[#43474e] block mb-2 uppercase tracking-wider font-semibold">
              Spiritual Path
            </label>
            <div className="space-y-2">
              {religions.map((path) => {
                const isChecked = selectedReligion.includes(path);
                return (
                  <label
                    key={path}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        toggleSelection(
                          path,
                          selectedReligion,
                          setSelectedReligion,
                        )
                      }
                      className="rounded border-[#c4c6cf] text-[#775a19] focus:ring-[#775a19]"
                    />
                    <span
                      className={`text-sm ${isChecked ? "text-[#775a19] font-semibold" : "text-[#1b1c1c]"} group-hover:text-[#775a19] transition-colors`}
                    >
                      {path}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Education Filter */}
          <section>
            <label className="text-xs text-[#43474e] block mb-2 uppercase tracking-wider font-semibold">
              Education
            </label>
            <div className="space-y-2">
              {educationLevels.map((edu) => {
                const isChecked = selectedEducation.includes(edu);
                return (
                  <label
                    key={edu}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        toggleSelection(
                          edu,
                          selectedEducation,
                          setSelectedEducation,
                        )
                      }
                      className="rounded border-[#c4c6cf] text-[#775a19] focus:ring-[#775a19]"
                    />
                    <span
                      className={`text-sm ${isChecked ? "text-[#775a19] font-semibold" : "text-[#1b1c1c]"} group-hover:text-[#775a19] transition-colors`}
                    >
                      {edu}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Passions Filter
          <section>
            <label className="text-xs text-[#43474e] block mb-3 uppercase tracking-wider font-semibold">
              Shared Passions
            </label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <span
                    key={interest}
                    onClick={() =>
                      toggleSelection(
                        interest,
                        selectedInterests,
                        setSelectedInterests,
                      )
                    }
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#785a1a] text-white"
                        : "bg-[#efeded] text-[#785a1a] hover:bg-[#ffdea5]"
                    }`}
                  >
                    {interest}
                  </span>
                );
              })}
            </div>
          </section> */}
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-[#c4c6cf]/20 space-y-3">
          <button
            onClick={handleSearch}
            className="w-full bg-[#775a19] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#5f4713] transition-all shadow-md"
          >
            Search / Apply Filters
          </button>

          <button
            onClick={handleReset}
            className="w-full bg-[#000d22] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#002349] transition-all"
          >
            Reset All Filters
          </button>
        </div>
      </aside>
    </>
  );
}
