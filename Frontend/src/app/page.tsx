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
      <section className="relative bg-white py-20 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section: Content */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-black">
              Get Your Fix.<br />Anytime. Anywhere.
            </h1>
            <p className="text-gray-700 mb-8 text-lg">
              Connect with skilled professionals for all your home service needs. Fast, reliable, and hassle-free.
            </p>

            {/* Search bar */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Find a service - painter in Kolkata"
                className="w-full py-4 px-6 rounded-full bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="absolute right-2 top-2 bg-[#10B981] text-white px-6 py-2 rounded-full font-medium hover:bg-[#059669] transition duration-300">
                Search
              </button>
            </div>

            {/* Action buttons (in the same row) */}
            <div className="flex space-x-4">
              <button
                className="bg-[#10B981] text-white px-6 py-3 rounded-full font-medium hover:bg-[#059669] transition duration-300"
                onClick={() => router.push("/signup/freelancer")}
              >
                Join as Freelancer
              </button>
              <button
                className="bg-transparent border-2 border-emerald-500 text-emerald-500 px-6 py-3 rounded-full font-medium hover:bg-emerald-500 hover:text-white transition duration-300"
                onClick={() => router.push("/signup/customer")}
              >
                Join as Customer
              </button>
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="https://img.freepik.com/free-photo/medium-shot-man-posing-studio_23-2150275715.jpg?w=740"
              alt="Professional handyman"
              width={400}
              height={400}
              className="rounded-lg shadow-2xl max-w-md w-full h-auto glow-effect"
            />
          </div>
        </div>
      </section>

      <CategorySection />
      <FreelancerSection />
      <HowItWorksSection />
      <TestimonialsSection />

      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Ready to Get Started?</h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers and freelancers who are already using Fixify for their home service needs.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button
              className="bg-[#10B981] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#059669] transition duration-300"
              onClick={() => router.push('/signup/customer')}
            >
              Find a Professional
            </button>
            <button
              className="bg-transparent border-2 border-emerald-500 text-emerald-500 px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-500 hover:text-white transition duration-300"
              onClick={() => router.push('/signup/freelancer')}
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
