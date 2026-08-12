"use client";

import { useState } from "react";
import { X } from "lucide-react";

const Note = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="w-full h-9 bg-red-600 sticky z-50 top-0 left-0 flex items-center justify-between overflow-hidden">
      {/* Sticky prefix so 'Note:' remains visible on the left */}
      <span className="text-white text-lg pl-3 pr-2 bg-red-900 h-full flex justify-center items-center z-10 shrink-0 font-medium">
        Note:
      </span>

      {/* Marquee Container */}
      <div className="relative flex-1 overflow-hidden h-full flex items-center">
        <div className="animate-marquee whitespace-nowrap text-nowrap text-white text-sm md:text-base">
          Fellas Its The Beta Version, with a Lot of Unknow Bug Your Support and
          Opinion Can Help Me To Build A Great Software.
        </div>
      </div>

      {/* Sticky close button on the right */}
      <button
        onClick={() => setShow(false)}
        className="z-10 shrink-0 bg-red-600 h-full flex items-center pl-2 pr-3 hover:bg-red-700 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default Note;