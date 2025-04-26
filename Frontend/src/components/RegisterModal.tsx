'use client';

import { FC } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Join Fixify</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">I want to join as:</label>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/signup/freelancer"
              className="bg-gray-800 border border-gray-700 text-center text-white rounded px-4 py-3 hover:border-orange-500"
            >
              Freelancer
            </Link>
            <Link
              href="/signup/customer"
              className="bg-gray-800 border border-gray-700 text-center text-white rounded px-4 py-3 hover:border-orange-500"
            >
              Customer
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
