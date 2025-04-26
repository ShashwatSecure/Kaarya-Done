import { FC } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: FC = () => {
  return (
    <footer className="bg-black py-12 px-6 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <a href="#" className="text-2xl font-bold mb-4 inline-block">
              <span className="text-white">Fix</span>
              <span className="bg-[#ff9900] text-black px-1 rounded">ify</span>
            </a>
            <p className="text-gray-400 mb-4">
              Connecting skilled professionals with customers who need their services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* For Customers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">For Customers</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Find Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Customer Support
                </a>
              </li>
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Become a Freelancer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Freelancer Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  How to Get Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Freelancer Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2023 Fixify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
