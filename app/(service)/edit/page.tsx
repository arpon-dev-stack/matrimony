"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_store/AuthContext";
import { updateProfileAction } from "@/app/actions/updateProfileAction";
import { UserImage } from "@/app/types/auth";
import {
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

export const EditProfile: React.FC = () => {
  const { user, accessToken, updateUser } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const activeUser = user;

  // Filter out soft-deleted images (where is_removed is true)
  const activeImages =
    activeUser?.images?.filter((img: UserImage) => !img.is_removed) || [];

  // Initial Form States
  const initialProfileImg =
    activeImages.find((img: UserImage) => img.is_profile)?.url ||
    activeImages[0]?.url ||
    "";

  const initialGallery = activeImages
    .filter((img: UserImage) => !img.is_profile)
    .map((img: UserImage, idx: number) => ({
      id: idx.toString(),
      src: img.url,
      is_removed: false,
    }));

  const [profileImage, setProfileImage] = useState<string>(initialProfileImg);
  const [fullName, setFullName] = useState<string>(activeUser?.name || "");
  const [bio, setBio] = useState<string>(activeUser?.bio || "");
  const [occupation, setOccupation] = useState<string>(
    activeUser?.occupation || "",
  );
  const [location, setLocation] = useState<string>(activeUser?.location || "");
  const [education, setEducation] = useState<string>(
    activeUser?.education || "",
  );
  const [religion, setReligion] = useState<string>(activeUser?.religion || "");
  const [language, setLanguage] = useState<string>(activeUser?.language || "");
  const [familyValue, setFamilyValue] = useState<string>(
    activeUser?.family_value || "Modern",
  );
  const [fitnessRoutine, setFitnessRoutine] = useState<string>(
    activeUser?.fitness_routin || "3-4 times a week",
  );
  const [dietary, setDietary] = useState<string>(
    activeUser?.vegetarian ? "Vegetarian" : "Non-Vegetarian",
  );

  const [interests, setInterests] = useState<string[]>(
    activeUser?.interests || [],
  );
  const [newInterest, setNewInterest] = useState("");
  const [isAddingInterest, setIsAddingInterest] = useState(false);

  // Gallery state now retains the `is_removed` attribute
  const [gallery, setGallery] =
    useState<{ id: string; src: string; is_removed: boolean }[]>(
      initialGallery,
    );

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
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  // Submit Handler using Transition & Auth State Sync
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const res = await updateProfileAction({ success: false }, formData);

        if (res?.success) {
          // Reconstruct updated images array structure with explicit schema attributes
          const updatedImages = [
            ...(profileImage
              ? [{ url: profileImage, is_profile: true, is_removed: false }]
              : []),
            ...gallery.map((g) => ({
              url: g.src,
              is_profile: false,
              is_removed: g.is_removed ?? false,
            })),
          ];

          // Sync client-side Auth Context
          updateUser({
            name: fullName,
            bio,
            occupation,
            location,
            education,
            religion,
            language,
            family_value: familyValue,
            fitness_routin: fitnessRoutine,
            vegetarian: dietary,
            interests,
            images: updatedImages,
          });

          router.push("/user");
        }
      } catch (err) {
        console.error("Failed to update profile:", err);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased pb-16 md:pb-12">
      <main className="max-w-[900px] mx-auto px-4 md:px-16 py-12">
        <form onSubmit={handleSubmit}>
          {/* Hidden Inputs for Form Data Serialization */}
          <input type="hidden" name="id" value={user?.id} />
          <input type="hidden" name="accessToken" value={accessToken} />
          <input type="hidden" name="profileImage" value={profileImage} />
          <input
            type="hidden"
            name="interests"
            value={JSON.stringify(interests)}
          />
          <input type="hidden" name="gallery" value={JSON.stringify(gallery)} />

          {/* Profile Photo & Identity Section */}
          <section className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-12">
            <div className="relative group shrink-0">
              <div className="w-48 h-48 rounded-full border-4 border-white shadow-xl overflow-hidden bg-[#e4e2e2] flex items-center justify-center">
                {profileImage ? (
                  <Image
                    className="object-cover"
                    src={profileImage}
                    alt="Profile photo"
                    sizes="192px"
                  />
                ) : (
                  <span className="text-gray-400 font-medium">No Image</span>
                )}
              </div>

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
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#43474e]">
                    About You (Bio)
                  </label>
                  <span className="text-xs text-[#43474e]">
                    {bio.length}/500
                  </span>
                </div>
                <textarea
                  name="bio"
                  rows={3}
                  maxLength={500}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a little bit about yourself..."
                  className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none transition-colors text-base resize-y min-h-[90px]"
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
              <div className="space-x-4">
                <label htmlFor="date_of_birth" className="font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none transition-colors text-base"
                />
              </div>
            </div>
          </section>

          {/* Gallery Section */}
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
                      {
                        id: Date.now().toString(),
                        src: result.info.secure_url,
                        is_removed: false,
                      },
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
              {gallery
                .filter((item) => !item.is_removed)
                .map((item) => (
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
                      {
                        id: Date.now().toString(),
                        src: result.info.secure_url,
                        is_removed: false,
                      },
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
                    <option value="Daily / High Intensity">
                      Daily / High Intensity
                    </option>
                    <option value="3-4 times a week">3-4 times a week</option>
                    <option value="Occasional / Weekend">
                      Occasional / Weekend
                    </option>
                    <option value="Yoga & Meditation focus">
                      Yoga &amp; Meditation focus
                    </option>
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
                  <option value="Conservative Modern">
                    Conservative Modern
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#c4c6cf]/30">
              <div className="flex items-center gap-3 p-4 bg-[#002349]/10 rounded-lg border border-[#002349]/20">
                <Info className="w-5 h-5 text-[#002349] shrink-0" />
                <p className="text-sm text-[#2c476f]">
                  Values and background information help us find your most
                  compatible matches.
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
              disabled={isPending}
              className="px-6 py-2 bg-gradient-to-r from-[#C5A059] to-[#B08C45] text-white font-medium rounded-lg shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

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
