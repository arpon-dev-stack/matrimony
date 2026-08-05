"use client";

import { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

export default function CloudinaryUploadPage() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [publicId, setPublicId] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-6">
      <h1 className="text-2xl font-bold">Cloudinary Image Upload</h1>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} // Replace with your unsigned preset name
        onSuccess={(result: any) => {
          // secure_url gives the public URL, public_id allows Cloudinary optimizations
          if (result?.info?.secure_url) {
            setImageUrl(result.info.secure_url);
            setPublicId(result.info.public_id);
          }
        }}
        onError={(error) => {
          console.error("Upload error:", error);
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Upload Image / Drag & Drop
          </button>
        )}
      </CldUploadWidget>

      {imageUrl && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-gray-600">Image URL:</p>
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all text-center text-sm"
          >
            {imageUrl}
          </a>

          {/* Render with Cloudinary's optimized CldImage component */}
          <div className="relative w-64 h-64 mt-2 border rounded-lg overflow-hidden">
            <CldImage
              src={publicId}
              alt="Uploaded Preview"
              width="300"
              height="300"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </main>
  );
}
