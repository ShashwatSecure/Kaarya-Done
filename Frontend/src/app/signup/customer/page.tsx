'use client';
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function CustomerRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    city: "",
    pincode: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (!agreeToTerms) {
      alert("You must agree to the Terms & Conditions");
      return;
    }
    
    console.log("Form submitted!", formData);
    alert("Account created successfully! Welcome to Fixify.");
  
    // Reset the form
    setFormData({
      fullname: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      city: "",
      pincode: "",
    });
    setAgreeToTerms(false);
  
    // Redirect to login page
    router.push("/login/customer");
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2 w-full">
            <div className="bg-gray-800 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">Sign up to book trusted freelancers near you</h2>
              <p className="text-gray-400 mb-6">Create your account to access thousands of skilled professionals</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Personal Details</h3>

                  <div>
                    <label htmlFor="fullname" className="block text-sm font-medium mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="fas fa-user text-gray-500"></i>
                      </div>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="fas fa-envelope text-gray-500"></i>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium mb-1">Mobile Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="fas fa-phone text-gray-500"></i>
                      </div>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        placeholder="9876543210"
                        className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="fas fa-lock text-gray-500"></i>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-gray-500 hover:text-gray-300`}></i>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="fas fa-lock text-gray-500"></i>
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength={8}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-gray-500 hover:text-gray-300`}></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Location (Optional)</h3>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select your city</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Pune">Pune</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium mb-1">Pincode</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength={6}
                      placeholder="400001"
                      className="w-full pl-3 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={handleCheckboxChange}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm">
                    I agree to the {" "}
                    <Link href="/about#terms-of-service" className="text-orange-500 hover:underline">Terms of Service</Link> and {" "}
                    <Link href="/about#privacy-policy" className="text-orange-500 hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition duration-300"
                >
                  Create My Customer Account
                </button>

                <div className="text-center text-sm text-gray-400">
                  Already have an account? {" "}
                  <Link href="/login/customer" className="text-orange-500 hover:underline">Login</Link>
                </div>
              </form>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/2">
            <div className="bg-gray-800 rounded-xl p-8 h-full flex flex-col justify-center items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3058/3058972.png"
                alt="Customer Registration"
                className="w-full max-w-md"
              />
              <div className="mt-8 text-center">
                <h2 className="text-xl font-semibold mb-2">Find & Book Skilled Professionals</h2>
                <p className="text-gray-400">Join thousands of customers who trust Fixify for their home service needs</p>
                <div className="mt-6 space-y-4 max-w-md mx-auto">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span>Verified & background-checked professionals</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span>Transparent pricing & reviews</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span>Easy booking & secure payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}
