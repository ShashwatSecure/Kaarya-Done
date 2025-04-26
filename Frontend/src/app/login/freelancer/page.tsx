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
    // Handle form submission, e.g., send the data to an API
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-6">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-white mb-6">Login as Freelancer</h2>

          <form action="/login/freelancer" method="POST" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="freelancerEmail" className="block text-gray-300 mb-2">Work Email</label>
              <input
                type="email"
                id="freelancerEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="freelancerPassword" className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="freelancerPassword"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="bg-[#ff9900] text-black w-full py-3 rounded font-bold hover:bg-orange-600 mb-4"
            >
              Login as Freelancer
            </button>
            <div className="text-center mb-4">
              <a href="/forgot-password/freelancer" className="text-orange-500 hover:underline">Forgot password?</a>
            </div>
            <div className="border-t border-gray-700 pt-4 text-center">
              <p className="text-gray-400">Don't have an account? <a href="/signup/freelancer" className="text-orange-500 hover:underline">Sign up</a></p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreelancerLoginForm;
