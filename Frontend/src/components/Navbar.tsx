'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation'; // <-- Import usePathname
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const pathname = usePathname(); // get current pathname client-side

  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customerProfile, setCustomerProfile] = useState<{ name: string; photoUrl: string } | null>(null);
  const [freelancerProfile, setFreelancerProfile] = useState<{ name: string; photoUrl: string } | null>(null);
  const [isFreelancerAuthenticated, setIsFreelancerAuthenticated] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem('authToken');
  const freelancerToken = localStorage.getItem('freelancerToken');

  if (token) {
    fetchCustomerProfile(token)
      .then(() => setIsAuthenticated(true))
      .catch(() => {
        localStorage.removeItem('authToken');
      });
  }

  if (freelancerToken) {
    fetchFreelancerProfile(freelancerToken)
      .then(() => setIsFreelancerAuthenticated(true))
      .catch(() => {
        localStorage.removeItem('freelancerToken');
      });
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
          throw err;
        }
      }
    }
  };

 const fetchCustomerProfile = async (token: string) => {
  return handleThrottle(async () => {
    const res = await fetch('http://localhost:8080/api/customer/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch customer profile");

    const data = await res.json();
    setCustomerProfile({ name: data.name, photoUrl: data.photoUrl });
  });
};

const fetchFreelancerProfile = async (token: string) => {
  return handleThrottle(async () => {
    const res = await fetch('http://localhost:8080/api/freelancer/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch freelancer profile");

    const data = await res.json();
    setFreelancerProfile({ name: data.name, photoUrl: data.photoUrl });
  });
};


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    if (logoutLoading) return; // throttle logout
    setLogoutLoading(true);
    setDropdownOpen(false);

    // simulate logout delay, e.g. server call or animation
    setTimeout(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('freelancerToken');
      setIsAuthenticated(false);
      setIsFreelancerAuthenticated(false);
      setCustomerProfile(null);
      setFreelancerProfile(null);
      setLogoutLoading(false);
    }, 800);
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

  // Use pathname from next/navigation directly, no need to check window
  const isActive = (href: string) => pathname === href;

  // Link classes for nav options, active and hover styling
  const navLinkClass = (href: string) =>
    `px-3 py-2 rounded transition-colors duration-300
    ${isActive(href) ? 'text-orange-500' : 'text-gray-800'}
    hover:bg-orange-500 hover:text-white`;

  // Dropdown button classes for logout and others
  const dropdownBtnClass = `block w-full text-left px-4 py-2 rounded transition-colors duration-300 text-red-600
    hover:bg-orange-500 hover:text-white`;

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

          <nav className="hidden lg:flex space-x-2">
            <Link href="/" className={navLinkClass('/')}>Home</Link>
            <Link href="/services" className={navLinkClass('/services')}>Services</Link>
            <Link href="/freelancers" className={navLinkClass('/freelancers')}>Freelancers</Link>
            <Link href="/how-it-works" className={navLinkClass('/how-it-works')}>How It Works</Link>
            <Link href="/contactus" className={navLinkClass('/contactus')}>Contact Us</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {!isAuthenticated && !isFreelancerAuthenticated ? (
              <>
                <button onClick={openModal} className="text-gray-800 hover:text-orange-500 transition-colors duration-300">
                  Login
                </button>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="bg-orange-500 text-white px-4 py-2 rounded font-medium hover:bg-orange-600 transition-colors duration-300"
                >
                  SignUp
                </button>
              </>
            ) : isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex flex-col items-center hover:text-orange-500 focus:outline-none transition-colors duration-300"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
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
                  <div className="absolute right-0 mt-2 bg-white shadow-md border rounded-lg py-2 z-50 min-w-[120px]">
                    <button
                      onClick={handleLogout}
                      disabled={logoutLoading}
                      className={`${dropdownBtnClass} ${logoutLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      {logoutLoading ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex flex-col items-center hover:text-orange-500 focus:outline-none transition-colors duration-300"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
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
                  <div className="absolute right-0 mt-2 bg-white shadow-md border rounded-lg py-2 z-50 min-w-[120px]">
                    <button
                      onClick={handleLogout}
                      disabled={logoutLoading}
                      className={`${dropdownBtnClass} ${logoutLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      {logoutLoading ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            )}
            <button
              className="lg:hidden text-gray-800 hover:text-orange-500 transition-colors duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="lg:hidden bg-white border-t border-gray-200 py-4 space-y-2 shadow-lg fixed top-[64px] left-0 right-0 z-40">
            {['/', '/services', '/freelancers', '/how-it-works', '/contactus'].map((href) => {
              const labelMap: Record<string, string> = {
                '/': 'Home',
                '/services': 'Services',
                '/freelancers': 'Freelancers',
                '/how-it-works': 'How It Works',
                '/contactus': 'Contact Us',
              };
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-6 py-3 rounded transition-colors duration-300 text-center font-semibold
                    ${
                      isActive(href)
                        ? 'text-[#ff9900]'
                        : 'text-gray-800 hover:bg-[#ff9900] hover:text-white'
                    }`}
                >
                  {labelMap[href]}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Modals */}
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
