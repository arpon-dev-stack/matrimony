"use client";

import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Plus,
  X,
  GripVertical,
  Trash2,
  ImagePlus,
  ShieldCheck,
  Info,
  UserX,
} from "lucide-react";

export interface UserDBRecord {
  id: number;
  name: string;
  occupation: string | null;
  location: string | null;
  education: string | null;
  religion: string | null;
  language: string | null;
  familyvalue: string | null;
  fitnessroutin: string | null;
  vegetarian: boolean | null;
  interests: string[] | null;
  images: { url: string; isProfile: boolean }[] | null;
}

interface EditProfileProps {
  user: UserDBRecord;
  updateProfileAction: (formData: FormData) => Promise<void>;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  user,
  updateProfileAction,
}) => {
  // Extract initial profile image from DB images array
  const initialProfileImg =
    user?.images?.find((img) => img.isProfile)?.url ||
    user?.images?.[0]?.url ||
    "";

  // Extract gallery images from DB (excluding profile image)
  const initialGallery =
    user?.images
      ?.filter((img) => !img.isProfile)
      .map((img, idx) => ({
        id: idx.toString(),
        src: img.url,
      })) || [];

  // --- Form States ---
  const [profileImage, setProfileImage] = useState<string>(initialProfileImg);
  const [fullName, setFullName] = useState<string>(user?.name || "");
  const [occupation, setOccupation] = useState<string>(user?.occupation || "");
  const [location, setLocation] = useState<string>(user?.location || "");
  const [education, setEducation] = useState<string>(user?.education || "");
  const [religion, setReligion] = useState<string>(user?.religion || "");
  const [language, setLanguage] = useState<string>(user?.language || "");
  const [familyValue, setFamilyValue] = useState<string>(user?.familyvalue || "Modern");
  const [fitnessRoutine, setFitnessRoutine] = useState<string>(user?.fitnessroutin || "3-4 times a week");
  const [dietary, setDietary] = useState<string>(user?.vegetarian ? "Vegetarian" : "Non-Vegetarian");

  // --- Dynamic Interests List ---
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [newInterest, setNewInterest] = useState("");
  const [isAddingInterest, setIsAddingInterest] = useState(false);

  // --- Gallery State ---
  const [gallery, setGallery] = useState<{ id: string; src: string }[]>(initialGallery);

  // --- Handlers ---
  const handleRemoveInterest = (tag: string) => {
    setInterests(interests.filter((i) => i !== tag));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
      setIsAddingInterest(false);
    }
  };

  const handleDeletePhoto = (id: string) => {
    setGallery(gallery.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased pb-16 md:pb-12">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#fbf9f8]/90 backdrop-blur-md border-b border-[#c4c6cf]/30 px-4 md:px-16 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center gap-4">
          <Link
            href="/profile"
            className="p-2 hover:bg-[#eae8e7] rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#000d22]" />
          </Link>
          <h1 className="font-serif text-2xl font-semibold text-[#000d22]">
            Edit Profile
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[900px] mx-auto px-4 md:px-16 py-12">
        <form action={updateProfileAction}>
          {/* Hidden Inputs for Complex State Serialization */}
          <input type="hidden" name="profileImage" value={profileImage} />
          <input type="hidden" name="interests" value={JSON.stringify(interests)} />
          <input type="hidden" name="gallery" value={JSON.stringify(gallery)} />

          {/* Profile Photo & Identity Section */}
          <section className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-12">
            <div className="relative group">
              <div className="w-48 h-48 rounded-full border-4 border-white shadow-xl overflow-hidden bg-[#e4e2e2] flex items-center justify-center">
                {profileImage ? (
                  <img
                    className="w-full h-full object-cover"
                    src={profileImage}
                    alt="Profile photo"
                  />
                ) : (
                  <span className="text-gray-400 font-medium">No Image</span>
                )}
              </div>

              {/* Cloudinary Upload for Profile Picture */}
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) => {
                  if (result?.info?.secure_url) {
                    setProfileImage(result.info.secure_url);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="absolute bottom-2 right-2 p-3 bg-[#775a19] text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                    aria-label="Upload photo"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </CldUploadWidget>
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#43474e]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none transition-colors font-serif text-2xl font-semibold text-[#000d22]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#43474e]">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none transition-colors text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#43474e]">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none transition-colors text-base"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Moments & Journeys Gallery */}
          <section className="mb-12">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#000d22]">
                  Moments &amp; Journeys
                </h2>
                <p className="text-sm text-[#43474e]">
                  Upload additional gallery pictures
                </p>
              </div>

              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) => {
                  if (result?.info?.secure_url) {
                    setGallery((prev) => [
                      ...prev,
                      { id: Date.now().toString(), src: result.info.secure_url },
                    ]);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#002349] text-[#718bb7] rounded-lg hover:bg-[#002349]/80 transition-colors font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Photo</span>
                  </button>
                )}
              </CldUploadWidget>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="relative group aspect-square rounded-xl overflow-hidden border border-[#c4c6cf]/30"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={item.src}
                    alt="Gallery item"
                  />
                  <div className="absolute inset-0 bg-[#000d22]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="p-2 bg-white rounded-full text-[#000d22] shadow-lg hover:bg-gray-100"
                    >
                      <GripVertical className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(item.id)}
                      className="p-2 bg-[#ffdad6] rounded-full text-[#ba1a1a] shadow-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) => {
                  if (result?.info?.secure_url) {
                    setGallery((prev) => [
                      ...prev,
                      { id: Date.now().toString(), src: result.info.secure_url },
                    ]);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="aspect-square rounded-xl border-2 border-dashed border-[#c4c6cf] flex flex-col items-center justify-center gap-2 text-[#43474e] hover:bg-[#efeded] hover:border-[#775a19] transition-all"
                  >
                    <ImagePlus className="w-8 h-8" />
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      Upload
                    </span>
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </section>

          {/* Lifestyle & Interests */}
          <section className="mb-12 bg-white p-8 rounded-xl border border-[#c4c6cf]/30 shadow-[0_12px_32px_-8px_rgba(0,35,73,0.08)]">
            <h2 className="font-serif text-2xl font-semibold text-[#000d22] mb-6">
              Lifestyle &amp; Interests
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#43474e] mb-3">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2 items-center">
                  {interests.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-[#f5f3f3] text-[#000d22] border border-[#c4c6cf]/30 rounded-full flex items-center gap-2 text-sm"
                    >
                      {tag}
                      <X
                        className="w-3.5 h-3.5 cursor-pointer hover:text-red-600 transition-colors"
                        onClick={() => handleRemoveInterest(tag)}
                      />
                    </span>
                  ))}

                  {isAddingInterest ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddInterest();
                          }
                        }}
                        autoFocus
                        placeholder="Type & press enter"
                        className="px-3 py-1.5 border border-[#775a19] rounded-full text-sm outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddInterest}
                        className="p-1 bg-[#775a19] text-white rounded-full hover:bg-[#775a19]/90"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingInterest(false)}
                        className="p-1 text-[#43474e] hover:text-black"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingInterest(true)}
                      className="px-4 py-2 border border-dashed border-[#775a19] text-[#775a19] rounded-full flex items-center gap-2 hover:bg-[#775a19]/5 transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" /> Add Interest
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#43474e]">
                    Dietary Preference
                  </label>
                  <select
                    name="dietary"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none appearance-none"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#43474e]">
                    Fitness Routine
                  </label>
                  <select
                    name="fitnessRoutine"
                    value={fitnessRoutine}
                    onChange={(e) => setFitnessRoutine(e.target.value)}
                    className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none appearance-none"
                  >
                    <option value="Daily / High Intensity">Daily / High Intensity</option>
                    <option value="3-4 times a week">3-4 times a week</option>
                    <option value="Occasional / Weekend">Occasional / Weekend</option>
                    <option value="Yoga & Meditation focus">Yoga &amp; Meditation focus</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Values & Background */}
          <section className="bg-white p-8 rounded-xl border border-[#c4c6cf]/30 shadow-[0_12px_32px_-8px_rgba(0,35,73,0.08)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl font-semibold text-[#000d22]">
                Values &amp; Background
              </h2>
              <ShieldCheck className="w-6 h-6 text-[#775a19]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#43474e]">
                  Religion / Spiritual Path
                </label>
                <input
                  type="text"
                  name="religion"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#43474e]">
                  Language
                </label>
                <input
                  type="text"
                  name="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#43474e]">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#43474e]">
                  Family Values
                </label>
                <select
                  name="familyValue"
                  value={familyValue}
                  onChange={(e) => setFamilyValue(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none appearance-none"
                >
                  <option value="Modern">Modern</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Liberal">Liberal</option>
                  <option value="Conservative Modern">Conservative Modern</option>
                </select>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#c4c6cf]/30">
              <div className="flex items-center gap-3 p-4 bg-[#002349]/10 rounded-lg border border-[#002349]/20">
                <Info className="w-5 h-5 text-[#002349] shrink-0" />
                <p className="text-sm text-[#2c476f]">
                  Values and background information help us find your most compatible matches.
                </p>
              </div>
            </div>
          </section>

          {/* Form Action Bar */}
          <div className="mt-8 flex justify-end gap-4">
            <Link
              href="/profile"
              className="px-6 py-2 border border-[#000d22] text-[#000d22] font-medium rounded-lg hover:bg-[#002349] hover:text-white transition-all flex items-center justify-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#C5A059] to-[#B08C45] text-white font-medium rounded-lg shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="text-[#ba1a1a] font-medium hover:underline flex items-center gap-2"
          >
            <UserX className="w-5 h-5" /> Deactivate Profile
          </button>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;