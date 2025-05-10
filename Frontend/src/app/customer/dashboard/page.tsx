"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CustomerDashboard = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />
      <main className="max-w-8xl px-2 py-8 flex gap-6">
        {/* Left Sidebar (20%) */}
        <aside className="w-1/5 space-y-4 ">
          {[
            "Current / Upcoming Bookings",
            "Booking History",
            "Saved Freelancers",
            "Payment Methods",
            "Address Book",
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
        
        {/* Main Services Section (80%) */}
        <section className="w-4/5">
          <div className="bg-gray-100 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">What service are you looking for?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search plumber, electrician..."
                className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-4 focus:ring-[#ff9900] outline-none"
              />
              <select className="w-full rounded-lg py-3 px-4 border border-gray-300 text-gray-800">
                <option value="">Select Category</option>
                <option value="plumber">Plumber</option>
                <option value="electrician">Electrician</option>
                <option value="mechanic">Mechanic</option>
              </select>
              <select className="w-full rounded-lg py-3 px-4 border border-gray-300 text-gray-800">
                <option value="">Select City</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="kolkata">Kolkata</option>
              </select>
              <input
                type="text"
                placeholder="Enter Pincode"
                className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:ring-4 focus:ring-[#ff9900] outline-none"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-[#ff9900] hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-lg">
                Search
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
