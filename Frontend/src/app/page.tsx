'use client';
import Image from "next/image";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "@/components/Navbar";
import CategorySection from "@/components/CategoriesSection";
import FreelancerSection from "@/components/TopFreelancers";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#231F41] leading-tight">
              Get Your Fix.<br />Anytime. Anywhere.
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Connect with skilled professionals for all your home service needs. Fast, reliable, and hassle-free.
            </p>

            {/* Search Bar */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Find a service – painter in Kolkata"
                className="w-full py-4 px-6 rounded-full bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-[#ff9900] shadow-sm"
              />
              <button className="absolute right-2 top-2 bg-[#ff9900] text-white px-6 py-2 rounded-full font-medium hover:bg-orange-500 transition">
                Search
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/signup/freelancer")}
                className="bg-[#ff9900] text-white px-6 py-3 rounded-full font-medium hover:bg-orange-500 transition"
              >
                Join as Freelancer
              </button>
              <button
                onClick={() => router.push("/signup/customer")}
                className="border-2 border-[#ff9900] text-[#ff9900] px-6 py-3 rounded-full font-medium hover:bg-[#ff9900] hover:text-white transition"
              >
                Join as Customer
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="https://img.freepik.com/free-photo/medium-shot-man-posing-studio_23-2150275715.jpg?w=740"
              alt="Professional handyman"
              width={420}
              height={420}
              className="rounded-xl shadow-2xl max-w-md w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Sections */}
      <CategorySection />
      <FreelancerSection />
      <HowItWorksSection />
      <TestimonialsSection />

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#231F41]">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-10">
            Join thousands of satisfied customers and freelancers already using Fixify to get work done efficiently and professionally.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push('/signup/customer')}
              className="bg-[#ff9900] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-500 transition"
            >
              Find a Professional
            </button>
            <button
              onClick={() => router.push('/signup/freelancer')}
              className="border-2 border-[#ff9900] text-[#ff9900] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#ff9900] hover:text-white transition"
            >
              Become a Freelancer
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
