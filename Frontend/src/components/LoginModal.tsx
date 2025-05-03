'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { FC } from 'react';
import RegisterModal from './RegisterModal';

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    if (!isOpen) return null;
    
  
  return (
    <div
  className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
  onClick={closeModal}
>

      <div
        className="bg-white rounded-lg w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}  
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Login to Fixify</h2>
          <button onClick={closeModal} className="text-gray-700 hover:text-black">
          <X />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">I want to login as:</label>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/login/freelancer"
              className="bg-gray-200 border border-gray-700 text-center text-black rounded px-4 py-3 hover:bg-orange-500 hover:text-white hover:border-white"
            >
              Freelancer
            </a>
            <a
              href="/login/customer"
              className="bg-gray-200 border border-gray-700 text-center text-black rounded px-4 py-3 hover:bg-white hover:border-orange-500"
            >
              Customer
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center">
          <p className="text-gray-600">
           Don't have an account?{' '}
            <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="text-gray-800 hover:text-[#ff9900] hover:underline"
          >
            SignUp
          </button>
          </p>
        </div>
      </div>
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </div>
  );
};

export default LoginModal;
