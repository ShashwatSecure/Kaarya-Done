'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FreelancerLoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ mobile: '' });
  const [otp, setOtp] = useState('');
  const [mobileExists, setMobileExists] = useState(false);
  const [checkingMobile, setCheckingMobile] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'mobile' && !/^\d{0,10}$/.test(value)) return;

    setFormData(prev => ({ ...prev, [name]: value }));
    setOtpSent(false);
    setOtpVerified(false);
    setError('');
    setStatusMessage('');
  };

  useEffect(() => {
    const checkMobile = async () => {
      if (formData.mobile.length === 10) {
        setCheckingMobile(true);
        try {
          const res = await fetch(`http://localhost:8080/api/auth/check-mobile?mobile=${formData.mobile}`);
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const data = await res.json();
          setMobileExists(data.exists);
          if (!data.exists) setError('Mobile number not registered.');
        } catch (err) {
          console.error('Error checking mobile:', err);
          setError('Something went wrong while checking the number.');
        } finally {
          setCheckingMobile(false);
        }
      }
    };
    checkMobile();
  }, [formData.mobile]);

  const handleSendOtp = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/sms/send-otp?mobile=${formData.mobile}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setStatusMessage('OTP sent successfully.');
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      console.error('Send OTP failed:', err);
      setError('Error sending OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/sms/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: formData.mobile, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpVerified(true);
        setStatusMessage('OTP verified! Logging in...');
        // Simulate login action
        console.log('User logged in successfully:', formData.mobile);
        // Redirect or save token as needed
      } else {
        setError(data.message || 'Invalid OTP.');
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError('Error verifying OTP.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-6">
        <div className="w-full max-w-md bg-gray-200 p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login as Freelancer</h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9900] text-black"
                required
              />
              {checkingMobile && <p className="text-sm text-gray-600 mt-1">Checking mobile number...</p>}
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
              {statusMessage && <p className="text-sm text-green-600 mt-1">{statusMessage}</p>}
            </div>

            {mobileExists && !otpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-[#ff9900] text-white w-full py-3 rounded font-bold hover:bg-orange-500 mb-4 transition"
              >
                Send OTP
              </button>
            )}

            {otpSent && !otpVerified && (
              <>
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-gray-700 mb-2">Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9900] text-black"
                    maxLength={6}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="bg-[#ff9900] text-white w-full py-3 rounded font-bold hover:bg-orange-500 mb-4 transition"
                >
                  Verify OTP
                </button>
              </>
            )}
          </form>

          <div className="border-t border-gray-200 pt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="/signup/freelancer" className="text-[#ff9900] hover:underline">Sign up</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreelancerLoginForm;
