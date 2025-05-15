'use client';

import React, { useState, useEffect } from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const FreelancerNavbar: React.FC = () => {
  const [freelancer, setFreelancer] = useState<{ name: string; profileImage: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchFreelancerData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/login/freelancer');
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:8080/api/freelancer/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(res.status === 401 ? 'Unauthorized' : 'Failed to fetch freelancer data');
        }

        const data = await res.json();
        setFreelancer(data); 
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        localStorage.removeItem('authToken');
        router.push('/login/freelancer');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFreelancerData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="md:ml-64">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {freelancer?.name || 'Loading...'}</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaBell className="text-gray-600" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img
                    src={freelancer?.profileImage || '/default-avatar.webp'} 
                    alt="Profile"
                    className="w-10 h-8 rounded-full object-cover mb-1"
                  />
                  <span className="hidden md:inline text-gray-700">{freelancer?.name || 'Rajesh'}</span>
                  <FaChevronDown className="text-gray-500 text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerNavbar;
