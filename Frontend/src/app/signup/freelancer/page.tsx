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
  services: string[];
  serviceDesc: string;
  experience: number;
  hourlyRate: number;
  willingnessToTravel: boolean;
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
    services: [],
    serviceDesc: '',
    experience: 0,
    hourlyRate: 0,
    willingnessToTravel: true,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'willingnessToTravel' ? value === 'true' : value });
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
    console.log(res);
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
      setOtpVerified(data.message === 'OTP verified successfully');
      setOtpStatus(data.message);
    } catch (error: any) {
      setOtpStatus('Error verifying OTP: ' + error.message);
    }
  };

  const handleNext = () => { if (step < steps.length) setStep(step + 1); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };

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
        service_description: formData.serviceDesc,
        hourly_rate: formData.hourlyRate,
        willingness_to_travel: formData.willingnessToTravel,
      };

      const res = await fetch('http://localhost:8080/api/auth/signup/freelancer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error((await res.json()).message || 'Signup failed');
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
                            <p className="text-xs"> Profile Picture</p>
                          </div>
                        )}
                      </div>
                    </label>
                    <input
                      id="profile-photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" required />
                <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" required />
                {mobileStatus && <p className={`text-sm mt-1 ${mobileStatus.includes('used') ? 'text-red-500' : 'text-green-600'}`}>{mobileStatus}</p>}
                {mobileStatus === 'Mobile number is available.' && !otpSent && <button type="button" onClick={() => sendOtp(formData.mobile)} className="text-sm text-blue-600 underline">Send OTP</button>}
                {otpSent && (
                  <div className="space-y-2">
                    <input type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-black" />
                    <button type="button" onClick={verifyOtp} className="py-2 px-4 bg-green-600 text-white rounded">Verify OTP</button>
                    {otpStatus && <p className={`text-sm ${otpVerified ? 'text-green-600' : 'text-red-600'}`}>{otpStatus}</p>}
                  </div>
                )}
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" />
                <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" />
                <input type="text" name="aadhaarNumber" placeholder="Aadhaar Number" value={formData.aadhaarNumber} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" />
                <input type="text" name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 rounded text-black" />
                <textarea name="bio" rows={4} placeholder="Short bio..." value={formData.bio} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 rounded text-black" />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <select multiple name="services" value={formData.services} onChange={(e) => setFormData({ ...formData, services: Array.from(e.target.selectedOptions).map((o) => o.value) })} className="w-full px-3 py-2 bg-gray-100 rounded text-black">
                  {['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'Other'].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <textarea name="serviceDesc" rows={2} placeholder="Describe your service..." value={formData.serviceDesc} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 rounded text-black" />
                <input type="number" name="experience" placeholder="Experience (years)" value={formData.experience} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 rounded text-black" />
                <input type="number" name="hourlyRate" placeholder="Hourly Rate" value={formData.hourlyRate} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 rounded text-black" />
                <label htmlFor="willingnessToTravel" className="block text-sm font-medium text-gray-700">Willing to travel?</label>
                <select id="willingnessToTravel" name="willingnessToTravel" value={formData.willingnessToTravel.toString()} onChange={handleChange} className="w-full px-3 py-2 bg-gray-100 rounded text-black">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Review</h2>
                <div className="text-sm space-y-2">
                  {Object.entries(formData).map(([key, val]) => (
                    <div key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}</strong>: {Array.isArray(val) ? val.join(', ') : String(val)}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && <button type="button" onClick={handleBack} className="py-2 px-6 bg-gray-500 hover:bg-black text-white rounded">Back</button>}
              {step < 3 ? <button type="button" onClick={handleNext} className="py-2 px-6 bg-[#ff9900] text-white rounded">Next</button> : <button type="submit" className="py-2 px-6 bg-[#ff9900] hover:bg-orange-500 text-white rounded">{isLoading ? 'Submitting...' : 'Submit'}</button>}  
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FreelancerSignupPage;