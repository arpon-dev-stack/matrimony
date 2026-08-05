import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SimpleHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#fbf9f8]/90 backdrop-blur-md border-b border-[#c4c6cf]/30 px-4 md:px-16 py-4">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 p-1 hover:bg-[#eae8e7] rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#000d22]" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
