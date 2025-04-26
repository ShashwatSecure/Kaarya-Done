'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import LoginModal from './LoginModal'; 
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="bg-black py-4 px-6 border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-white">Fix</span>
              <span className="bg-[#ff9900] text-black px-1 rounded">ify</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8">
            <Link href="/" className="text-white hover:text-[#ff9900]">Home</Link>
            <Link href="/service" className="text-white hover:text-[#ff9900]">Services</Link>
            <Link href="/freelancers" className="text-white hover:text-[#ff9900]">Freelancers</Link>
            <Link href="/howitworks" className="text-white hover:text-[#ff9900]">How It Works</Link>
            <Link href="/contactus" className="text-white hover:text-[#ff9900]">Contact Us</Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={openModal}
              className="text-white hover:text-[#ff9900]">Login</button>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="bg-[#ff9900] text-black px-4 py-2 rounded font-medium hover:bg-orange-600"
            >SignUp</button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
  <div className="fixed top-16 left-0 right-0 bg-black border-t border-gray-800 px-6 py-6 space-y-4 z-40">
          <Link href="/" className="block text-white hover:text-[#ff9900]">Home</Link>
          <Link href="/service" className="block text-white hover:text-[#ff9900]">Services</Link>
          <Link href="/freelancers" className="block text-white hover:text-[#ff9900]">Freelancers</Link>
          <Link href="/howitworks" className="block text-white hover:text-[#ff9900]">How It Works</Link>
          <Link href="/contactus" className="block text-white hover:text-[#ff9900]">Contact Us</Link>
          <button
              onClick={openModal}
              className="text-white hover:text-[#ff9900]">Login</button>
          <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="block bg-[#ff9900] text-black px-4 py-2 rounded font-medium hover:bg-orange-600 w-full text-center"
            >SignUp</button>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />

      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
}
