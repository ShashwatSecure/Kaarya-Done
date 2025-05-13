'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CustomerLoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';
  const [formData, setFormData] = useState({ mobile: '' });
  const [otp, setOtp] = useState('');
  const [mobileExists, setMobileExists] = useState(false);
  const [checkingMobile, setCheckingMobile] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [isMounted, setIsMounted] = useState(true); // For cleanup
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'mobile' && !/^\d{0,10}$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
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
          const res = await fetch(
            `${BACKEND_URL}/api/auth/check-mobile/customer?mobile=${formData.mobile}`,
            {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              },
            }
          );
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
    return () => setIsMounted(false); // Cleanup on unmount
  }, [formData.mobile]);

  useEffect(() => {
    if (statusMessage || error) {
      const timeout = setTimeout(() => {
        if (isMounted) {
          setStatusMessage('');
          setError('');
        }
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [statusMessage, error, isMounted]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [timerActive, resendTimer]);

  const handleSendOtp = async () => {
    setLoading(true); // Start loading
    try {
      const res = await fetch(`${BACKEND_URL}/api/sms/send-otp?mobile=${formData.mobile}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOtpSent(true);
        setStatusMessage('OTP sent successfully.');
        setResendTimer(30);
        setTimerActive(true);
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      console.error('Send OTP failed:', err);
      setError('Error sending OTP.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true); // Start loading
    try {
      const res = await fetch(`${BACKEND_URL}/api/sms/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ mobile: formData.mobile, otp }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpVerified(true);
        setStatusMessage('OTP verified! Logging in...');

        const loginRes = await fetch(`${BACKEND_URL}/api/auth/login/customer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ mobile: formData.mobile, role: 'customer' }),
        });

        const loginData = await loginRes.json();
        if (loginRes.ok) {
          localStorage.setItem('authToken', loginData.token);

          setTimeout(() => {
            const safeRedirect =
              redirectTo.startsWith('/') && !redirectTo.startsWith('//') ? redirectTo : '/';
            router.replace(safeRedirect !== '/login/customer' ? safeRedirect : '/');
          }, 1000);
        } else {
          setError(loginData.message || 'Login failed.');
        }
      } else {
        setError(data.message || 'Invalid OTP.');
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError('Error verifying OTP.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleOtpKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleVerifyOtp();
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-6">
        <div className="w-full max-w-md bg-gray-200 p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login as Customer</h2>

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
                aria-label="Mobile number"
              />
              {checkingMobile && <p className="text-sm text-gray-600 mt-1">Checking mobile number...</p>}
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
              {statusMessage && <p className="text-sm text-green-600 mt-1">{statusMessage}</p>}
            </div>

            {mobileExists && !otpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading} // Disable button during loading
                className="bg-[#ff9900] text-white w-full py-3 rounded font-bold hover:bg-orange-500 mb-4 transition"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
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
                    onChange={(e) => {
                      if (/^\d{0,6}$/.test(e.target.value)) setOtp(e.target.value);
                    }}
                    onKeyDown={handleOtpKeyPress}
                    className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9900] text-black"
                    maxLength={6}
                    required
                    aria-label="OTP"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={loading} // Disable button during loading
                  className="bg-[#ff9900] text-white w-full py-3 rounded font-bold hover:bg-orange-500 mb-2 transition"
                >
                  {loading ? 'Verifying OTP...' : 'Verify OTP'}
                </button>

                {timerActive ? (
                  <p className="text-sm text-gray-600 text-center mb-2">
                    Resend OTP in {resendTimer} sec
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[#ff9900] font-medium text-sm hover:underline w-full mb-4"
                  >
                    Resend OTP
                  </button>
                )}
              </>
            )}
          </form>

          <div className="border-t border-gray-200 pt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/signup/customer" className="text-[#ff9900] hover:underline">Sign up</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerLoginForm;
