'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const FreelancerNavbar: React.FC = () => {
  const [freelancer, setFreelancer] = useState<{ name: string; profileImage: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    if (loggingOut) return; // extra safety to prevent double trigger

    setLoggingOut(true);
    setDropdownOpen(false);

    setTimeout(() => {
      localStorage.removeItem('authToken');
      setLoggingOut(false);
      router.push('/login/freelancer');
    }, 1000); // 1 second delay to show spinner
  };

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
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {freelancer?.name || 'Loading...'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Notifications">
                <FaBell className="text-gray-600" />
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-label="User menu"
                >
                  <img
                    src={freelancer?.profileImage || '/default-avatar.webp'}
                    alt="Profile"
                    className="w-10 h-8 rounded-full object-cover mb-1"
                  />
                  <span className="hidden md:inline text-gray-700">{freelancer?.name || 'Rajesh'}</span>
                  <FaChevronDown className="text-gray-500 text-xs" />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className={`block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 ${
                        loggingOut ? 'cursor-not-allowed opacity-50 hover:bg-transparent' : ''
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Loading overlay during logout */}
        {loggingOut && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerNavbar;