"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface CustomerNavbarProps {
  name: string;
  profileImage: string;
}

const CustomerNavbar: React.FC<CustomerNavbarProps> = ({ name, profileImage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // TODO: Replace with actual auth logout logic
    console.log("Logging out...");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-[#231F41] hover:text-[#ff9900] transition-colors">
        Fixify
      </Link>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="focus:outline-none focus:ring-2 focus:ring-[#ff9900] rounded-full"
          aria-label="Toggle profile dropdown"
        >
          <Image
            src={profileImage || "vercel.svg"}
            alt={`${name}'s profile`}
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-300 hover:border-[#ff9900] transition"
          />
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
            <Link
              href="/customer/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </Link>
            <Link
              href="/customer/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomerNavbar;
