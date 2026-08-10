"use client";

import { useState } from "react";
import { X } from "lucide-react";

const Note = () => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <div className="w-full h-9 bg-red-600 sticky z-50 top-0 left-0 flex justify-between items-center">
        <span className="text-white text-lg pl-3 pr-1 bg-red-900 h-full flex justify-center items-center">
          Note:
        </span>
        <span className="text-white">
          Fellas Its The Beta Version, with a Lot of Unknow Bug Your Support and
          Opinion Can Help Me To Build A Great Software.
        </span>
        <button onClick={() => setShow(!show)}>
          <X className="w-8 h-8 text-white mr-5" />
        </button>
      </div>
    );
  }
};

export default Note;
