'use client';

import { useState } from 'react';
import { FC } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import LoginModal from './LoginModal';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!isOpen) return null;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Join Fixify</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">I want to join as:</label>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/signup/freelancer"
              className="bg-gray-200 border border-gray-700 text-center text-black rounded px-4 py-3 hover:bg-orange-500 hover:text-white hover:border-white"
            >
              Freelancer
            </Link>
            <Link
              href="/signup/customer"
              className="bg-gray-200 border border-gray-700 text-center  text-black rounded px-4 py-3 hover:bg-white hover:border-orange-500"
            >
              Customer
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
            onClick={openModal}
            className="text-gray-800 hover:text-[#ff9900] hover:underline"
          >
            Login
          </button>
          </p>
        </div>
      </div>
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default RegisterModal;
