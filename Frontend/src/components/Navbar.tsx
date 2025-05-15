'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customerProfile, setCustomerProfile] = useState<{ name: string; photoUrl: string } | null>(null);
  const [freelancerProfile, setFreelancerProfile] = useState<{ name: string; photoUrl: string } | null>(null);
  const [isFreelancerAuthenticated, setIsFreelancerAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const freelancerToken = localStorage.getItem('freelancerToken');

    if (token) {
      setIsAuthenticated(true);
      fetchCustomerProfile(token);
    }

    if (freelancerToken) {
      setIsFreelancerAuthenticated(true);
      fetchFreelancerProfile(freelancerToken);
    }
  }, []);

  const handleThrottle = async (fn: () => Promise<void>, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        await fn();
        return;
      } catch (err: any) {
        if (err.status === 429 && i < retries - 1) {
          await new Promise(res => setTimeout(res, delay * (i + 1)));
        } else {
          console.error("Throttle/retry failed:", err);
        }
      }
    }
  };

  const fetchCustomerProfile = async (token: string) => {
    await handleThrottle(async () => {
      const res = await fetch('http://localhost:8080/api/customer/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 429) {
        const error = new Error("Too Many Requests");
        // @ts-ignore
        error.status = 429;
        throw error;
      }

      if (res.ok) {
        const data = await res.json();
        setCustomerProfile({ name: data.name, photoUrl: data.photoUrl });
      } else {
        console.error("Failed to fetch customer profile");
      }
    });
  };

  const fetchFreelancerProfile = async (token: string) => {
    await handleThrottle(async () => {
      const res = await fetch('http://localhost:8080/api/freelancer/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 429) {
        const error = new Error("Too Many Requests");
        // @ts-ignore
        error.status = 429;
        throw error;
      }

      if (res.ok) {
        const data = await res.json();
        setFreelancerProfile({ name: data.name, photoUrl: data.photoUrl });
      } else {
        console.error("Failed to fetch freelancer profile");
      }
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('freelancerToken');
    setIsAuthenticated(false);
    setIsFreelancerAuthenticated(false);
    setDropdownOpen(false);
    setCustomerProfile(null);
    setFreelancerProfile(null);
  };

  const handleLoginSuccess = () => {
    const token = localStorage.getItem('authToken');
    const freelancerToken = localStorage.getItem('freelancerToken');

    if (token) {
      setIsAuthenticated(true);
      fetchCustomerProfile(token);
    }

    if (freelancerToken) {
      setIsFreelancerAuthenticated(true);
      fetchFreelancerProfile(freelancerToken);
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <header className="bg-white py-4 px-6 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-black">Fix</span>
              <span className="bg-[#ff9900] text-black px-1 rounded">ify</span>
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-8">
            <Link href="/" className="text-gray-800 hover:text-[#ff9900]">Home</Link>
            <Link href="/services" className="text-gray-800 hover:text-[#ff9900]">Services</Link>
            <Link href="/freelancers" className="text-gray-800 hover:text-[#ff9900]">Freelancers</Link>
            <Link href="/how-it-works" className="text-gray-800 hover:text-[#ff9900]">How It Works</Link>
            <Link href="/contactus" className="text-gray-800 hover:text-[#ff9900]">Contact Us</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {!isAuthenticated && !isFreelancerAuthenticated ? (
              <>
                <button onClick={openModal} className="text-gray-800 hover:text-[#ff9900]">Login</button>
                <button onClick={() => setIsRegisterModalOpen(true)} className="bg-[#ff9900] text-white px-4 py-2 rounded font-medium hover:bg-orange-600">SignUp</button>
              </>
            ) : isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex flex-col items-center hover:text-[#ff9900] focus:outline-none">
                  {customerProfile?.photoUrl && (
                    <img
                      src={`http://localhost:8080${customerProfile.photoUrl}`}
                      alt="Customer Profile"
                      className="w-10 h-8 rounded-full object-cover mb-1"
                    />
                  )}
                  <span className="text-sm text-black font-medium">{customerProfile?.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-md border rounded-lg py-2 z-50">
                    <button onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex flex-col items-center hover:text-[#ff9900] focus:outline-none">
                  {freelancerProfile?.photoUrl && (
                    <img
                      src={`http://localhost:8080${freelancerProfile.photoUrl}`}
                      alt="Freelancer Profile"
                      className="w-10 h-8 rounded-full object-cover mb-1"
                    />
                  )}
                  <span className="text-sm text-black font-medium">{freelancerProfile?.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-md border rounded-lg py-2 z-50">
                    <button onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            )}
            <button className="lg:hidden text-gray-800" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white border-t border-gray-200 px-6 py-6 space-y-4 z-40 shadow-md">
          <Link href="/" className="block text-gray-800 hover:text-[#ff9900]">Home</Link>
          <Link href="/services" className="block text-gray-800 hover:text-[#ff9900]">Services</Link>
          <Link href="/freelancers" className="block text-gray-800 hover:text-[#ff9900]">Freelancers</Link>
          <Link href="/how-it-works" className="block text-gray-800 hover:text-[#ff9900]">How It Works</Link>
          <Link href="/contactus" className="block text-gray-800 hover:text-[#ff9900]">Contact Us</Link>
        </div>
      )}

      <LoginModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}
