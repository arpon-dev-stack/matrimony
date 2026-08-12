"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Filter } from "lucide-react";
import { SelectInput } from "./SelectInput";
import { age_range_option, religions } from "@/app/lib/userFollow";

export default function SearchForm() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const educationLevels = ["Doctorate", "Masters"];

  // Default initial states
  const [lookingFor, setLookingFor] = useState("Woman");
  const [ageRange, setAgeRange] = useState("18 - 22");
  const [location, setLocation] = useState("");
  const [selectedReligion, setSelectedReligion] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<string[]>([]);

  const onOpen = () => setIsSidebarOpen(true);
  const onClose = () => setIsSidebarOpen(false);

  // Helper to format string values into lowercase snake_case
  const toSnakeCase = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");

  const toggleSelection = (
    item: string,
    list: string[],
    setList: (val: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // looking_for key and value in lowercase snake_case
    if (lookingFor) {
      params.set("looking_for", toSnakeCase(lookingFor));
    }

    // Split "18 - 22" into min_age=18 & max_age=22
    if (ageRange) {
      const parts = ageRange.split("-").map((v) => v.trim());
      if (parts[0]) params.set("min_age", parts[0]);
      if (parts[1]) params.set("max_age", parts[1]);
    }

    // location formatted in lowercase snake_case (e.g. "new_york")
    if (location.trim()) {
      params.set("location", toSnakeCase(location));
    }

    // Array options joined with lowercase snake_case values
    if (selectedReligion.length > 0) {
      params.set(
        "religion",
        selectedReligion.map((r) => toSnakeCase(r)).join(",")
      );
    }

    if (selectedEducation.length > 0) {
      params.set(
        "education",
        selectedEducation.map((e) => toSnakeCase(e)).join(",")
      );
    }

    router.push(`/search?${params.toString()}&page=1`);
    onClose();
  };

  const handleReset = () => {
    setLookingFor("Woman");
    setAgeRange("18 - 22");
    setLocation("");
    setSelectedReligion([]);
    setSelectedEducation([]);
    router.push("/search");
  };

  return (
    <>
      {/* Mobile / Tablet Filter Toggle Button */}
      <button
        type="button"
        onClick={onOpen}
        className="lg:hidden fixed bottom-28 right-6 z-30 bg-[#775a19] text-white p-3.5 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium hover:bg-[#5f4713] transition-all cursor-pointer"
        aria-label="Open Filters"
      >
        <Filter className="w-5 h-5" />
        <span>Filters</span>
      </button>

      {/* Mobile/Tablet Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar Form Container */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
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
            type="button"
            onClick={onClose}
            className="lg:hidden text-[#43474e] hover:text-[#000d22] p-1 text-xl font-bold cursor-pointer"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
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
                      name="looking_for"
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

            <SelectInput
              options={age_range_option}
              onChange={setAgeRange}
              label="Age Range"
              value={ageRange}
              name="age_range"
            />

            {/* Location Input Filter */}
            <section>
              <label className="text-xs text-[#43474e] block mb-2 uppercase tracking-wider font-semibold">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g., London, New York, Tokyo"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-[#c4c6cf] rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#000d22] outline-none placeholder:text-[#a0a4ab]"
              />
            </section>

            {/* Religion Filter */}
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
                        value={path}
                        checked={isChecked}
                        onChange={() =>
                          toggleSelection(
                            path,
                            selectedReligion,
                            setSelectedReligion
                          )
                        }
                        className="rounded border-[#c4c6cf] text-[#775a19] focus:ring-[#775a19]"
                      />
                      <span
                        className={`text-sm ${
                          isChecked
                            ? "text-[#775a19] font-semibold"
                            : "text-[#1b1c1c]"
                        } group-hover:text-[#775a19] transition-colors`}
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
                        value={edu}
                        checked={isChecked}
                        onChange={() =>
                          toggleSelection(
                            edu,
                            selectedEducation,
                            setSelectedEducation
                          )
                        }
                        className="rounded border-[#c4c6cf] text-[#775a19] focus:ring-[#775a19]"
                      />
                      <span
                        className={`text-sm ${
                          isChecked
                            ? "text-[#775a19] font-semibold"
                            : "text-[#1b1c1c]"
                        } group-hover:text-[#775a19] transition-colors`}
                      >
                        {edu}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-[#c4c6cf]/20 space-y-3">
            <button
              type="submit"
              className="w-full bg-[#775a19] text-[#ffffff] py-3 rounded-lg text-sm font-medium hover:bg-[#5f4713] transition-all shadow-md cursor-pointer"
            >
              Search / Apply Filters
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-[#000d22] text-[#ffffff] py-2.5 rounded-lg text-sm font-medium hover:bg-[#002349] transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}