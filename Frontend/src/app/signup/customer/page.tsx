'use client';
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function CustomerRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    address: "",
    photo_url: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Frontend validation
    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Mobile number must be 10 digits!");
      return;
    }
    
    if (!agreeToTerms) {
      alert("You must agree to the Terms & Conditions");
      return;
    }

    try {
      // Send data to Spring Boot backend
      const response = await fetch("http://localhost:8080/api/auth/signup/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          mobile: formData.mobile,
          address: formData.address,
          photo_url: formData.photo_url,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed!");
      }

      // Success: Redirect to login
      alert("Account created successfully! Welcome to Fixify.");
      router.push("/login/customer");

    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
      setFormData({
        full_name: "",
        mobile: "",
        address: "",
        photo_url: "",
      });
      setAgreeToTerms(false);
    }
  };

  return (
    <>
      <Navbar />
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
                      <label htmlFor="full_name" className="block text-sm font-medium mb-1">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <i className="fas fa-user text-gray-500"></i>
                        </div>
                        <input
                          type="text"
                          id="full_name"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
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
                      <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                      <div className="relative">
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          placeholder="Enter your address"
                          rows={4}
                          className="w-full pl-3 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>

                      
                    </div>
                    <div>
  <label htmlFor="photo_url" className="block text-sm font-medium mb-1">Photo URL</label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <i className="fas fa-image text-gray-500"></i>
    </div>
    <input
      type="text"
      id="photo_url"
      name="photo_url"
      value={formData.photo_url}
      onChange={handleChange}
      required
      placeholder="Enter photo URL"
      className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
    />
  </div>
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
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create My Customer Account"}
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
      <Footer />
    </>
  );
}
