'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FreelancerSignupPage = () => {
  const router = useRouter();
  const steps = ['Profile Info', 'Services', 'Review'];
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    profileImageUrl: '',
    bio: '',
    state: '',
    aadhaarNumber: '',
    panNumber: '',
    city: '',
    pincode: '',
    services: [] as string[],
    serviceDesc: '',
    experience: 0,
    hourlyRate: 0,
    willingnessToTravel: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'willingnessToTravel') {
      setFormData({ ...formData, [name]: value === 'true' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!/^\d{10}$/.test(formData.mobile)) {
      alert('Mobile number must be 10 digits!');
      setIsLoading(false);
      return;
    }

    if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      alert('Aadhaar number must be 12 digits!');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/signup/freelancer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          full_name: formData.fullName,
          aadhaar_number: formData.aadhaarNumber,
          pan_number: formData.panNumber,
          profile_image_url: formData.profileImageUrl,
          service_description: formData.serviceDesc,
          hourly_rate: formData.hourlyRate,
          willingness_to_travel: formData.willingnessToTravel,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Signup failed!');
      }

      alert('Freelancer account created successfully! Welcome to Fixify.');
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
      <main className="min-h-screen bg-gray-900 text-white px-4 py-10">
        <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Join as a Freelancer</h2>

          <div className="mb-6 flex justify-between">
            {steps.map((label, idx) => (
              <div key={label} className="text-center flex-1">
                <div className={`w-10 h-10 mx-auto mb-1 rounded-full flex items-center justify-center font-bold ${idx + 1 === step ? 'bg-[#ff9900] text-black' : 'bg-gray-700'}`}>
                  {idx + 1}
                </div>
                <p className="text-sm">{label}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Image URL input */}
                <div>
                  <label className="block text-sm mb-1">Profile Photo URL</label>
                  <input
                    type="text"
                    name="profileImageUrl"
                    value={formData.profileImageUrl}
                    onChange={handleChange}
                    className="w-full bg-gray-700 px-3 py-2 rounded"
                    placeholder="Enter image URL"
                  />
                </div>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 rounded"
                  required
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 rounded"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 rounded"
                />
                <input
                  type="text"
                  name="aadhaarNumber"
                  placeholder="Aadhaar Number"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 rounded"
                />
                <input
                  type="text"
                  name="panNumber"
                  placeholder="PAN Number"
                  value={formData.panNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 rounded"
                />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Short bio about you..."
                  className="w-full px-3 py-2 bg-gray-700 rounded"
                />
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <select
                  multiple
                  name="services"
                  value={formData.services}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      services: Array.from(e.target.selectedOptions).map((o) => o.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded"
                >
                  {['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'Other'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <textarea
                  name="serviceDesc"
                  rows={2}
                  placeholder="Describe your service..."
                  value={formData.serviceDesc}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded"
                />
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Years of Experience"
                  className="w-full px-3 py-2 bg-gray-700 rounded"
                />
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="Hourly Rate"
                  className="w-full px-3 py-2 bg-gray-700 rounded"
                />
                <select
                  name="willingnessToTravel"
                  value={formData.willingnessToTravel ? 'true' : ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded"
                >
                  <option value="true">Yes</option>
                  <option value="">No</option>
                </select>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Review Your Info</h2>
                <div className="text-sm space-y-2">
                  {Object.entries(formData).map(([key, val]) => (
                    <div key={key}>
                      <strong>{key.replace(/([A-Z])/g, ' $1')}</strong>:{" "}
                      {Array.isArray(val) ? val.join(', ') : String(val)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="mt-6 flex justify-between items-center">
              <button type="button" onClick={handleBack} className="text-gray-400 hover:text-white">Back</button>
              {step < steps.length ? (
                <button type="button" onClick={handleNext} className="bg-[#ff9900] text-black px-5 py-2 rounded">
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || isFormSubmitted}
                  className={`bg-[#ff9900] text-black px-5 py-2 rounded ${isLoading || isFormSubmitted ? 'opacity-50' : ''}`}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FreelancerSignupPage;
