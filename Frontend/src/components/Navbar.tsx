'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFreelancerAuthenticated, setIsFreelancerAuthenticated] = useState(false);
  const [customerProfile, setCustomerProfile] = useState<{ id: string; name: string; profileImageUrl: string } | null>(null);
  const [freelancerProfile, setFreelancerProfile] = useState<{ name: string; profileImageUrl: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const freelancerToken = localStorage.getItem('freelancerToken');

    if (token) {
      fetchCustomerProfile(token)
        .then(() => setIsAuthenticated(true))
        .catch(() => localStorage.removeItem('authToken'));
    }

    if (freelancerToken) {
      fetchFreelancerProfile(freelancerToken)
        .then(() => setIsFreelancerAuthenticated(true))
        .catch(() => localStorage.removeItem('freelancerToken'));
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
      const res = await fetch(`http://localhost:8080/api/customer/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch customer profile");
      const data = await res.json();
      setCustomerProfile({ id: data.id, name: data.name, profileImageUrl: data.profileImageUrl });
    });
  };

  const fetchFreelancerProfile = async (token: string) => {
    return handleThrottle(async () => {
      const res = await fetch(`http://localhost:8080/api/freelancer/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch freelancer profile");
      const data = await res.json();
      setFreelancerProfile({ name: data.name, profileImageUrl: data.profileImageUrl });
    });
  };

  const handleLogout = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);
    setDropdownOpen(false);

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

  const isActive = (href: string) => pathname === href;

  const navLinkClass = (href: string) =>
    `px-3 py-2 rounded transition-colors duration-300
    ${isActive(href) ? 'text-orange-500' : 'text-gray-800'}
    hover:bg-orange-500 hover:text-white`;

  const dropdownBtnClass = `block w-full text-left px-4 py-2 rounded transition-colors duration-300 text-red-600
    hover:bg-orange-500 hover:text-white`;

  return (
    <>
      <header className="bg-white py-4 px-6 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-black">Fix</span>
            <span className="bg-[#ff9900] text-black px-1 rounded">ify</span>
          </Link>

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
                <button onClick={() => setIsModalOpen(true)} className="text-gray-800 hover:text-orange-500 transition-colors duration-300">
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
                  className="flex flex-col items-center hover:text-orange-500 transition"
                >
                  <img
                    src={`http://localhost:8080${customerProfile?.profileImageUrl}`}
                    alt="Avatar"
                    className="w-10 h-7 rounded-full object-cover mb-1"
                  />
                  <span className="text-sm text-black font-medium">{customerProfile?.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg py-2 z-50 min-w-[140px]">
                    <Link
                      href={`/customer/${customerProfile?.id}/dashboard`}
                      className="block px-4 py-2 hover:bg-orange-500 hover:text-white text-black"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
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
                  className="flex flex-col items-center hover:text-orange-500 transition"
                >
                  <img
                    src={`http://localhost:8080${freelancerProfile?.profileImageUrl}`}
                    alt="Freelancer Avatar"
                    className="w-10 h-8 rounded-full object-cover mb-1"
                  />
                  <span className="text-sm text-black font-medium">{freelancerProfile?.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg py-2 z-50 min-w-[140px]">
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
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-800 hover:text-orange-500 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden bg-white border-t border-gray-200 py-4 space-y-2 shadow-lg fixed top-[72px] left-0 right-0 z-40">
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
                  className={`block px-6 py-3 text-center font-semibold rounded transition-colors duration-300 ${
                    isActive(href) ? 'text-orange-500' : 'text-gray-800 hover:bg-orange-500 hover:text-white'
                  }`}
                >
                  {labelMap[href]}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <LoginModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
}
