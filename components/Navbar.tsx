"use client";

import React, { useState } from "react";
import { CircleUser, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/_store/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const user420 = useAuth();
  console.log(user420);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper function to check if link is active
  const isActive = (path: string) => pathname === path;

  // Nav items configuration
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "Stories", href: "/stories" },
  ];

  return (
    <nav className="w-full bg-[#fbf9f8]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex justify-between items-center h-20 px-4 mx-auto">
        <div className="flex items-center gap-3 md:gap-8">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            className="md:hidden text-[#000d22] focus:outline-none p-1"
          >
            <Menu className="h-7 w-7" />
          </button>

          <Link
            href="/"
            className="font-serif text-[28px] md:text-3xl font-bold text-[#000d22] tracking-tight"
          >
            Forever
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    active
                      ? "text-[#775a19] font-semibold border-b-2 border-[#775a19] pb-1"
                      : "text-[#43474e] hover:text-[#000d22]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-[#43474e] hover:text-[#000d22] transition-colors font-medium">
            <Link href="/signin" className="flex items-center gap-2">
              Log In
              <CircleUser />
            </Link>
          </button>
          <Link
            href="/signup"
            className="hidden md:flex justify-center items-center bg-gradient-to-r from-[#C5A059] to-[#B08C45] text-white h-10 px-4 rounded-lg font-medium transition-transform active:scale-95"
          >
            Signup
          </Link>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden transition-opacity"
        />
      )}

      {/* Full-Height Sliding Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 h-screen w-72 bg-[#fbf9f8] shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header section with branding & close button */}
          <div className="flex justify-between items-center pb-6 mb-6 border-b border-[#000d22]/10">
            <Link
              href="/"
              onClick={toggleMenu}
              className="font-serif text-2xl font-bold text-[#000d22]"
            >
              Forever
            </Link>
            <button
              onClick={toggleMenu}
              aria-label="Close navigation menu"
              className="text-[#000d22] p-1.5 rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3 text-base">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  onClick={toggleMenu}
                  href={link.href}
                  className={`pl-3 py-2 rounded transition-colors ${
                    active
                      ? "text-[#775a19] font-semibold border-l-4 border-[#775a19] bg-[#775a19]/5"
                      : "text-[#43474e] hover:text-[#000d22] hover:bg-black/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              onClick={toggleMenu}
              href="/signup"
              className={`pl-3 py-2 rounded transition-colors ${
                isActive("/signup")
                  ? "text-[#775a19] font-semibold border-l-4 border-[#775a19] bg-[#775a19]/5"
                  : "text-[#43474e] hover:text-[#000d22] hover:bg-black/5"
              }`}
            >
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;