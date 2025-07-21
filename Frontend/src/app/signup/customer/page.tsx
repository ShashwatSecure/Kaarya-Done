'use client';
import { useState, useEffect } from "react";
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
    state: "",
    city: "",
    pincode: ""
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileUnique, setMobileUnique] = useState(true);
  const [checkingMobile, setCheckingMobile] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "mobile") {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
  };

  useEffect(() => {
  const timer = setTimeout(() => {
    const checkMobile = async () => {
      const mobile = formData.mobile.trim();
      if (mobile.length === 10) {
        setCheckingMobile(true);
        try {
          const res = await fetch(`http://localhost:8080/api/auth/check-mobile/customer?mobile=${mobile}`);
          const data = await res.json();
          setMobileUnique(!data.exists);
        } catch (err) {
          console.error('Error checking mobile:', err);
          setMobileUnique(false);
        } finally {
          setCheckingMobile(false);
        }
      }
    };

    checkMobile();
  }, 500); // debounce delay

  return () => clearTimeout(timer);
}, [formData.mobile]);


  const handleSendOtp = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/sms/send-otp?mobile=${formData.mobile}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        alert('OTP sent!');
        setOtpSent(true);
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Send OTP failed:', err);
      alert('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/sms/verify-signup-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile, otp,role: "CUSTOMER" }),
      });
      const data = await res.json();
      if (data.success) {
        alert('OTP verified successfully');
        setOtpVerified(true);
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (err) {
      console.error('Verify OTP error:', err);
      alert('Failed to verify OTP');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Mobile number must be 10 digits!");
      setIsLoading(false);
      return;
    }

    if (!mobileUnique) {
      alert("Mobile number already in use!");
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      alert("You must agree to the Terms & Conditions");
      setIsLoading(false);
      return;
    }

    if (!otpVerified) {
      alert("Please verify your OTP before submitting.");
      setIsLoading(false);
      return;
    }

    try {
      console.log(formData);
      const response = await fetch("http://localhost:8080/api/auth/signup/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed!");
      }

      alert("Account created successfully! Welcome to Fixify.");
      setFormData({
        full_name: "",
        mobile: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
      });
      setAgreeToTerms(false);
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      router.push("/login/customer");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white text-black min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2 w-full">
              <div className="bg-gray-200 rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-2">Sign up to book trusted freelancers near you</h2>
                <p className="text-gray-700 mb-6">Create your account to access thousands of skilled professionals</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Personal Details</h3>

                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium mb-1">Full Name</label>
                      <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required className="w-full pl-3 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
                    </div>

                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium mb-1">Mobile Number</label>
                      <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full pl-3 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
                      {checkingMobile && <p className="text-sm text-gray-600 mt-1">Checking mobile number...</p>}
                      {!mobileUnique && !checkingMobile && (
                        <p className="text-sm text-red-600 mt-1">Mobile number already in use</p>
                      )}
                      {formData.mobile.length === 10 && mobileUnique && !otpSent && (
                        <button type="button" onClick={handleSendOtp} className="mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md">
                          Send OTP
                        </button>
                      )}
                    </div>

                    {otpSent && !otpVerified && (
                      <>
                        <div className="mt-4">
                          <label htmlFor="otp" className="block text-sm font-medium mb-1">Enter OTP</label>
                          <input type="text" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter the OTP" className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
                        </div>
                        <button type="button" onClick={handleVerifyOtp} className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
                          Verify OTP
                        </button>
                      </>
                    )}

                    {otpSent && !otpVerified && (
  <button onClick={handleSendOtp} className="mt-1 text-sm text-blue-600 underline">
    Resend OTP
  </button>
)}


                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                      <select id="state" name="state" value={formData.state} onChange={handleChange} required className="w-full pl-3 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        <option value="">Select State</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                      <select id="city" name="city" value={formData.city} onChange={handleChange} required className="w-full pl-3 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        <option value="">Select City</option>
                        <option value="Kolkata">Kolkata</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium mb-1">Pincode (Optional)</label>
                      <select id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full pl-3 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                        <option value="">Select Pincode</option>
                        <option value="700102">700102</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="locality" className="block text-sm font-medium mb-1">Locality (Optional)</label>
                      <textarea id="locality" name="address" value={formData.address} onChange={handleChange} rows={2} placeholder="Enter locality (e.g., Keshtopur, New Town)" className="w-full pl-3 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-md" />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" id="terms" checked={agreeToTerms} onChange={handleCheckboxChange} className="mt-1" />
                    <label htmlFor="terms" className="ml-2 text-sm">
                      I agree to the <Link href="/about#terms-of-service" className="text-orange-500 hover:underline">Terms of Service</Link> and <Link href="/about#privacy-policy" className="text-orange-500 hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition duration-300" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create My Customer Account"}
                  </button>

                  <div className="text-center text-sm text-gray-700">
                    Already have an account? <Link href="/login/customer" className="text-orange-500 hover:underline">Login</Link>
                  </div>
                </form>
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/2">
              <div className="bg-gray-200 rounded-xl p-8 h-full flex flex-col justify-center items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/3058/3058972.png" alt="Customer Registration" className="w-full max-w-md" />
                <div className="mt-8 text-center">
                  <h2 className="text-xl font-semibold mb-2">Find & Book Skilled Professionals</h2>
                  <p className="text-gray-700">Join thousands of customers who trust Fixify for their home service needs</p>
                  <div className="mt-6 space-y-4 max-w-md mx-auto">
                    {["Verified & background-checked professionals", "Transparent pricing & reviews", "Easy booking & secure payments"].map((item, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
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
