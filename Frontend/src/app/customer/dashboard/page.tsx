'use client';

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar"; // Replace with regular Navbar component
import Footer from "@/components/Footer";

const CustomerDashboard = () => {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      const token = localStorage.getItem("authToken"); // Check token from localStorage
      if (!token) return;

      try {
        const response = await fetch("http://localhost:8080/api/customer/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setPhotoUrl(data.photoUrl || ""); // fallback if no photo URL
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchCustomerProfile();
  }, []);

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar /> {/* Use the regular Navbar component */}
      
      <main className="max-w-8xl px-2 py-8 flex gap-6">
        {/* Left Sidebar (20%) */}
        <aside className="w-1/5 space-y-4">
          {[
            "Current / Upcoming Bookings",
            "Booking History",
            "Saved Freelancers",
            "Ratings & Reviews",
            "Support / Help",
            "Security & Settings",
          ].map((item, idx) => (
            <button
              key={idx}
              className="w-full text-left bg-gray-100 hover:bg-orange-400 hover:text-white border rounded-lg py-3 px-4 text-sm font-medium shadow-sm"
            >
              {item}
            </button>
          ))}
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerDashboard;
