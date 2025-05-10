'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface FormData {
  fullName: string;
  mobile: string;
  profileImageUrl: string;
  bio: string;
  state: string;
  aadhaarNumber: string;
  panNumber: string;
  city: string;
  pincode: string;
  serviceCategoryIds: string[]; // service IDs
  experience: number;
}

const FreelancerSignupPage = () => {
  const router = useRouter();
  const steps = ['Profile Info', 'Services', 'Review'];
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [mobileExists, setMobileExists] = useState<boolean | null>(null);
  const [mobileStatus, setMobileStatus] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpStatus, setOtpStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobile: '',
    profileImageUrl: '',
    bio: '',
    state: '',
    aadhaarNumber: '',
    panNumber: '',
    city: '',
    pincode: '',
    serviceCategoryIds: [],
    experience: 0,
  });

  useEffect(() => {
    const checkMobileNumber = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/auth/check-mobile/freelancer?mobile=${formData.mobile}`);
        if (!res.ok) throw new Error('Request failed');
        const text = await res.text();
        if (!text) throw new Error('Empty response');
        const data = JSON.parse(text);
        setMobileExists(data.exists);
        setMobileStatus(data.exists ? 'Mobile number has already been used.' : 'Mobile number is available.');
      } catch (err) {
        console.error('Mobile check failed:', err);
        setMobileStatus('Error checking mobile number.');
      }
    };

    if (/^\d{10}$/.test(formData.mobile)) {
      checkMobileNumber();
    } else {
      setMobileExists(null);
      setMobileStatus('');
    }
  }, [formData.mobile]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async (): Promise<string> => {
    if (!selectedFile) return '';
    const data = new FormData();
    data.append('file', selectedFile);
    const res = await fetch('http://localhost:8080/api/upload/profile-image/freelancer', {
      method: 'POST',
      body: data,
    });
    if (!res.ok) throw new Error('Failed to upload image');
    const result = await res.json();
    return result.imageUrl;
  };

  const sendOtp = async (mobile: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/sms/send-otp?mobile=${mobile}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setCooldown(30);
        alert('OTP sent successfully');
      } else {
        alert('Failed to send OTP: ' + data.message);
      }
    } catch (error: any) {
      alert('Error sending OTP: ' + error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/sms/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile, otp }),
      });
      const data = await res.json();
      const success = data.message === 'OTP verified successfully';
      setOtpVerified(success);
      setOtpStatus(data.message);
    } catch (error: any) {
      setOtpStatus('Error verifying OTP: ' + error.message);
    }
  };

  const handleNext = () => {
    if (step === 1 && !otpVerified) {
      alert('Please verify OTP before proceeding.');
      return;
    }
    if (step < steps.length) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);

    if (!/^\d{10}$/.test(formData.mobile)) return alert('Mobile must be 10 digits');
    if (!otpVerified) return alert('Verify OTP first');
    if (!/^\d{12}$/.test(formData.aadhaarNumber)) return alert('Aadhaar must be 12 digits');
    if (mobileExists) return alert('Mobile already registered');

    try {
      const imageUrl = selectedFile ? await uploadProfileImage() : formData.profileImageUrl;
      const payload = {
        ...formData,
        profileImageUrl: imageUrl,
        full_name: formData.fullName,
        aadhaar_number: formData.aadhaarNumber,
        pan_number: formData.panNumber,
        profile_image_url: imageUrl,
        services: formData.serviceCategoryIds.map((id) => parseInt(id)), // Send IDs as integers
      };

      const res = await fetch('http://localhost:8080/api/auth/signup/freelancer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error((await res.json()).message || 'Signup failed');
      }
      alert('Freelancer created successfully!');
      setIsFormSubmitted(true);
      router.push('/login/freelancer');
    } catch (err: any) {
      alert(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black px-4 py-10">
        <div className="max-w-3xl mx-auto bg-gray-200 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Join as a Freelancer</h2>
          <div className="mb-6 flex justify-between">
            {steps.map((label, idx) => (
              <div key={label} className="text-center flex-1">
                <div className={`w-10 h-10 mx-auto mb-1 rounded-full flex items-center justify-center font-bold ${idx + 1 === step ? 'bg-[#ff9900] text-black' : 'bg-gray-300'}`}>{idx + 1}</div>
                <p className="text-sm">{label}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex justify-start">
                  <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="profile-photo-upload" className="cursor-pointer">
                      <div className="w-28 h-28 rounded-full bg-gray-200 border border-gray-400 overflow-hidden flex items-center justify-center text-gray-600 hover:bg-gray-300 transition">
                        {preview ? (
                          <img src={preview} alt="Profile Preview" className="object-cover w-full h-full" />
                        ) : (
                          <div className="text-center">
                            <span className="text-2xl font-bold">+</span>
                            <p className="text-xs">Profile Picture</p>
                          </div>
                        )}
                      </div>
                    </label>
                    <input id="profile-photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </div>
                </div>
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" required />
                <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" required />
                {mobileStatus && <p className={`text-sm mt-1 ${mobileStatus.includes('used') ? 'text-red-500' : 'text-green-600'}`}>{mobileStatus}</p>}

                {!otpSent && !otpVerified && mobileStatus === 'Mobile number is available.' && (
                  <button
                    type="button"
                    onClick={() => sendOtp(formData.mobile)}
                    className="mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
                    disabled={cooldown > 0}
                  >
                    {cooldown > 0 ? `Send OTP (wait ${cooldown}s)` : 'Send OTP'}
                  </button>
                )}

                {otpSent && !otpVerified && (
                  <>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-black mt-2"
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      className="py-2 px-4 bg-green-600 text-white rounded mt-2"
                    >
                      Verify OTP
                    </button>
                  </>
                )}

                {otpVerified && <p className="text-sm text-green-600">OTP verified successfully</p>}
                {otpStatus && !otpVerified && <p className="text-sm text-red-600">{otpStatus}</p>}


                <select name="state" value={formData.state} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 rounded text-black" required>
                  <option value="">Select State</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
                <select name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 rounded text-black" required>
                  <option value="">Select City</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
                <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" />
                <input type="text" name="aadhaarNumber" placeholder="Aadhaar Number" value={formData.aadhaarNumber} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" required />
                <input type="text" name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" required />
                <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" required />
              </div>
            )}

            {/* Step 2 - Services */}
            {step === 2 && (
              <div className="space-y-6">
                <label className='font-medium'>Select your service category (you may choose more than one):<br /> <span className='text-gray-600 font-light'>Press 'ctrl' + click on the options to select multiple.</span></label>
                <select
  multiple
  name="serviceCategoryIds"
  value={formData.serviceCategoryIds}
  onChange={(e) => setFormData({ ...formData, serviceCategoryIds: Array.from(e.target.selectedOptions).map((o) => o.value) })}
  className="w-full px-3 py-2 bg-gray-100 rounded text-black mt-2"
>
  <option value="1">Electrician</option>
  <option value="2">Plumber</option>
  <option value="3">Carpenter</option>
  <option value="4">TV Technician</option>
  <option value="5">Computer Technician</option>
  <option value="6">Mobile Technician</option>
  <option value="7">Painter</option>
  <option value="8">Sweeper</option>
  <option value="9">Cook</option>
  <option value="10">Mechanic</option>
</select>

                <label className='font-medium '>Experience (in years)</label>
                <input type="number" name="experience" placeholder="Experience (years)" value={formData.experience} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 rounded text-black" />
              </div>
            )}

            {/* Step 3 - Reviews */}
            {step === 3 && (
              <div className="space-y-4">
                <p><strong>Full Name:</strong> {formData.fullName}</p>
                <p><strong>Mobile:</strong> {formData.mobile}</p>
                <p><strong>State:</strong> {formData.state}</p>
                <p><strong>City:</strong> {formData.city}</p>
                <p><strong>Services:</strong> {formData.serviceCategoryIds.join(', ')}</p>
                <p><strong>Experience:</strong> {formData.experience} years</p>
              </div>
            )}


<div className="mt-6 flex justify-between">
              {step > 1 && <button type="button" onClick={handleBack} className="px-4 py-2 bg-gray-500 text-white rounded">Back</button>}
              {step < steps.length && <button type="button" onClick={handleNext} className="px-4 py-2 bg-[#ff9900] text-white rounded">Next</button>}
              {step === steps.length && <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit'}</button>}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FreelancerSignupPage;
