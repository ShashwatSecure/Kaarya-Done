'use client'

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FreelancerLoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-6">
        <div className="w-full max-w-md bg-gray-200 p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login as Freelancer</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="freelancerEmail" className="block text-gray-700 mb-2">Work Email</label>
              <input
                type="email"
                id="freelancerEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9900] text-black"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="freelancerPassword" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="freelancerPassword"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9900] text-black"
              />
            </div>
            <button
              type="submit"
              className="bg-[#ff9900] text-white w-full py-3 rounded font-bold hover:bg-orange-500 mb-4 transition"
            >
              Login as Freelancer
            </button>
            <div className="text-center mb-4">
              <a href="/forgot-password/freelancer" className="text-[#ff9900] hover:underline">Forgot password?</a>
            </div>
            <div className="border-t border-gray-200 pt-4 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a href="/signup/freelancer" className="text-[#ff9900] hover:underline">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreelancerLoginForm;
