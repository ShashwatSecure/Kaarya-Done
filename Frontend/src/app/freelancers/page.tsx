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

  // Calculate indexes
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
    <>
      <Navbar />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Find Your Perfect Service Provider</h2>
          <p className="text-gray-400 mt-2">
            Browse through our verified professionals ready to help you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search plumber in Kolkata..."
                  className="search-input w-full bg-gray-700 rounded-lg py-3 px-4 pl-10 text-gray-200 focus:outline-none focus:ring-4 focus:ring-orange-300"
                />
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
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

            {/* Category Dropdown */}
            <div>
              <select className="w-full bg-gray-700 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">All Categories</option>
                <option value="plumber">Plumber</option>
                <option value="electrician">Electrician</option>
                <option value="painter">Painter</option>
                <option value="carpenter">Carpenter</option>
                <option value="cleaner">Cleaner</option>
                <option value="mechanic">Mechanic</option>
              </select>
            </div>

            {/* Location Dropdown */}
            <div>
              <select className="w-full bg-gray-700 rounded-lg py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">All Locations</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
                <option value="kolkata">Kolkata</option>
                <option value="chennai">Chennai</option>
              </select>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center">
              <label className="text-gray-400 mr-2">Rating:</label>
              <select className="bg-gray-700 rounded-lg py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="">Any</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="text-gray-400 mr-2">Price:</label>
              <select className="bg-gray-700 rounded-lg py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="">Any</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="text-gray-400 mr-2">Availability:</label>
              <select className="bg-gray-700 rounded-lg py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="">Any</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="immediate">Immediate</option>
              </select>
            </div>

            <button className="ml-auto bg-orange-500 hover:bg-orange-600 text-gray-900 font-medium py-2 px-4 rounded-lg transition duration-200">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Freelancer Cards */}
        <div className="p-4">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                Showing {currentFreelancers.length} Professionals
              </h3>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Sort by:</span>
                <select className="bg-gray-800 rounded-lg py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentFreelancers.map((freelancer) => (
                <div
                  key={freelancer.id}
                  className="freelancer-card bg-gray-800 rounded-xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-400/20 border border-gray-700 hover:border-orange-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={freelancer.image}
                          alt={freelancer.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold">{freelancer.name}</h4>
                        <p className="text-gray-400 text-sm">{freelancer.profession}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {freelancer.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="category-badge bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full transition-all duration-200 hover:bg-orange-500 hover:text-gray-900"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm font-medium">{freelancer.rating}</span>
                      <span className="text-gray-400 text-sm ml-1">
                        ({freelancer.reviews})
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L12 11l-5.657 5.657"
                        />
                      </svg>
                      <span>{freelancer.location}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 font-medium">
                      ₹{freelancer.startingPrice} / hr
                    </span>
                    <Link
                      href={`/freelancer/${freelancer.id}`}
                      className="text-orange-500 hover:underline"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8">
              <button
                className="text-gray-400 hover:text-gray-300"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="flex items-center">
                <span className="text-gray-400 mr-3">Page</span>
                <span className="font-semibold text-lg">{currentPage}</span>
                <span className="text-gray-400 ml-3">of {totalPages}</span>
              </div>
              <button
                className="text-gray-400 hover:text-gray-300"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FreelancersPage;
