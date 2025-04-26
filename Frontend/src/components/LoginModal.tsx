import { FC } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div
  className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
  onClick={closeModal}
>

      <div
        className="bg-gray-900 rounded-lg w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Login to Fixify</h2>
          <button onClick={closeModal} className="text-gray-400 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">I want to login as:</label>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/login/freelancer"
              className="bg-gray-800 border border-gray-700 text-center text-white rounded px-4 py-3 hover:border-orange-500"
            >
              Freelancer
            </a>
            <a
              href="/login/customer"
              className="bg-gray-800 border border-gray-700 text-center text-white rounded px-4 py-3 hover:border-orange-500"
            >
              Customer
            </a>
          </div>
        </div>
        {/* <form>
          <div className="mb-4">
            <label htmlFor="loginEmail" className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="loginEmail"
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loginPassword" className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="loginPassword"
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            className="bg-[#ff9900] text-black w-full py-3 rounded font-bold hover:bg-orange-600 mb-4"
          >
            Login
          </button>
          <div className="text-center mb-4">
            <a href="/forgot-password" className="text-orange-500 hover:underline">Forgot password?</a>
          </div>
          <div className="border-t border-gray-800 pt-4 text-center">
            <p className="text-gray-400">Don't have an account? <a href="/register" className="text-orange-500 hover:underline">Sign up</a></p>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default LoginModal;
