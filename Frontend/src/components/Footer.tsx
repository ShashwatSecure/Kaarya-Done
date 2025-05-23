import { FC } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6 border-t border-gray-300">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <a href="#" className="text-2xl font-bold mb-4 inline-block">
              <span className="">Fix</span>
              <span className="bg-[#ff9900]  px-1 rounded">ify</span>
            </a>
            <p className=" mb-4">
              Connecting skilled professionals with customers who need their services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className=" hover:text-[#ff9900]">
                <FaFacebookF />
              </a>
              <a href="#" className=" hover:text-[#ff9900]">
                <FaTwitter />
              </a>
              <a href="#" className=" hover:text-[#ff9900]">
                <FaInstagram />
              </a>
              <a href="#" className=" hover:text-[#ff9900]">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* For Customers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Customers</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  Find Services
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  Customer Support
                </a>
              </li>
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 ">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  Become a Freelancer
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  Freelancer Dashboard
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  How to Get Jobs
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  Freelancer Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 ">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-[#ff9900]">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-12 pt-8 text-center ">
          <p>&copy; 2023 Fixify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
