"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Freelancer {
  id: number;
  name: string;
  profession: string;
  image: string;
  badges: string[];
  rating: number;
  reviews: number;
  location: string;
  startingPrice: number;
}

const freelancers: Freelancer[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    profession: "Plumber",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    badges: ["Pipe Repair", "Bathroom Fitting", "Water Tank"],
    rating: 4.8,
    reviews: 128,
    location: "Kolkata",
    startingPrice: 500,
  },
  {
    id: 2,
    name: "Amit Sharma",
    profession: "Electrician",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    badges: ["Wiring", "Switch Repair", "AC Service"],
    rating: 4.6,
    reviews: 92,
    location: "Delhi",
    startingPrice: 450,
  },
  {
    id: 3,
    name: "Priya Patel",
    profession: "Painter",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    badges: ["Wall Painting", "Texture", "Waterproofing"],
    rating: 4.9,
    reviews: 156,
    location: "Mumbai",
    startingPrice: 600,
  },
];

const FreelancersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const freelancersPerPage = 8;

  const indexOfLastFreelancer = currentPage * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = freelancers.slice(indexOfFirstFreelancer, indexOfLastFreelancer);

  const totalPages = Math.ceil(freelancers.length / freelancersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 ">
            Find Your Perfect Service Provider
          </h2>
          <p className="text-gray-500 mt-2">
            Browse through our verified professionals ready to help you
          </p>
        </div>

        {/* Filters */}
        <div className="rounded-xl p-6 mb-8 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search plumber in Kolkata..."
                  className="w-full rounded-lg py-3 px-4 pl-10 border border-gray-300 focus:ring-4 focus:ring-[#ff9900] outline-none"
                />
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <select className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-800">
              <option value="">All Categories</option>
              <option value="plumber">Plumber</option>
              <option value="electrician">Electrician</option>
              <option value="painter">Painter</option>
              <option value="carpenter">Carpenter</option>
              <option value="cleaner">Cleaner</option>
              <option value="mechanic">Mechanic</option>
            </select>
            <select className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-800">
              <option value="">All Locations</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="kolkata">Kolkata</option>
              <option value="chennai">Chennai</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 items-center">
            <div className="flex items-center">
              <label className="text-gray-600 mr-2">Rating:</label>
              <select className="border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-800">
                <option value="">Any</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="text-gray-600 mr-2">Price:</label>
              <select className="border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-800">
                <option value="">Any</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="text-gray-600 mr-2">Availability:</label>
              <select className="border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-800">
                <option value="">Any</option>
                <option value="today">Today</option>
              </select>
            </div>
            <button className="ml-auto bg-[#ff9900] hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-lg">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Freelancer Cards */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              Showing {currentFreelancers.length} Professionals
            </h3>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">Sort by:</span>
              <select className="border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-800">
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentFreelancers.map((freelancer) => (
              <div
                key={freelancer.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={freelancer.image}
                    alt={freelancer.name}
                    className="w-14 h-14 rounded-full border-2 border-[#ff9900]"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold">{freelancer.name}</h4>
                    <p className="text-gray-500 text-sm">{freelancer.profession}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {freelancer.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full hover:bg-[#ff9900] hover:text-white transition"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>⭐ {freelancer.rating} ({freelancer.reviews})</span>
                  <span>📍 {freelancer.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">₹{freelancer.startingPrice} / hr</span>
                  <Link
                    href={`/freelancer/${freelancer.id}`}
                    className="text-[#ff9900] hover:underline text-sm font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-8 text-gray-600">
            <button
              className="hover:text-[#ff9900] disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page <strong>{currentPage}</strong> of {totalPages}
            </span>
            <button
              className="hover:text-[#ff9900] disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreelancersPage;
