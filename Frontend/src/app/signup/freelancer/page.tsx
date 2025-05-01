'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FreelancerSignupPage = () => {
  const steps = ['Profile Info', 'Services', 'Review'];
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

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
    willingnessToTravel: 'yes', // Default to 'yes'
  });

  const handleNext = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('mobile', formData.mobile);
    data.append('bio', formData.bio);
    data.append('state', formData.state);
    data.append('city', formData.city);
    data.append('pincode', formData.pincode);
    data.append('aadhaarNumber', formData.aadhaarNumber);
    data.append('panNumber', formData.panNumber);
    data.append('profileImageUrl', formData.profileImageUrl);
    data.append('services', JSON.stringify(formData.services)); 
    data.append('serviceDesc', formData.serviceDesc);
    data.append('experience', formData.experience.toString());
    data.append('hourlyRate', formData.hourlyRate.toString());
    data.append('willingnessToTravel', formData.willingnessToTravel);

    const res = await fetch('/api/auth/signup/freelancer', {
      method: 'POST',
      body: data,
    });

    if (res.ok) {
      setIsFormSubmitted(true);
    } else {
      setError('Something went wrong!');
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-900 text-white px-4 py-10">
        <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Join as a Freelancer</h2>

          <div className="mb-6 flex justify-between items-center">
            {steps.map((label, idx) => (
              <div key={label} className="flex-1 text-center">
                <div
                  className={`w-10 h-10 mx-auto mb-1 rounded-full flex items-center justify-center font-bold ${idx + 1 === step ? 'bg-[#ff9900] text-black' : 'bg-gray-700'}`}
                >
                  {idx + 1}
                </div>
                <p className="text-sm">{label}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Basic Profile Information</h2>

                {/* Profile Photo Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Profile Photo</label>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-600">
                      {formData.profileImageUrl ? (
                        <img src={formData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <i className="fas fa-camera text-gray-500 text-xl" />
                      )}
                      <input
                        type="text"
                        placeholder="Enter Image URL"
                        value={formData.profileImageUrl || ''}
                        onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Upload a clear photo of yourself</p>
                      <p className="text-xs text-gray-500">Max. 5MB (JPG, PNG)</p>
                    </div>
                  </div>
                </div>

                {/* Other Inputs */}
                <div className="space-y-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                </div>

                {/* Short Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium mb-2">Short Bio / About Me</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell clients about yourself, your skills, and experience..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 50 characters</p>
                </div>
              </div>
            )}

            {/* Step 2: Services */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Services & Experience</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">Services Offered</label>
                  <select
                    multiple
                    name="services"
                    value={formData.services}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
                      setFormData({ ...formData, services: selected });
                    }}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'Other'].map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple services</p>
                  <label htmlFor="serviceDesc" className="mt-2 block text-sm font-medium mb-2">Describe your service : </label>
                  <textarea
                    id="serviceDesc"
                    name="serviceDesc"
                    rows={2}
                    value={formData.serviceDesc}
                    onChange={handleChange}
                    placeholder="Tell clients about your service..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-500 ">Minimum 20 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    min="0"
                    max="50"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hourly Rate</label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    placeholder="Hourly Rate"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Willing to Travel */}
                <div>
                  <label className="block text-sm font-medium mb-2">Willing to Travel?</label>
                  <select
                    name="willingnessToTravel"
                    value={formData.willingnessToTravel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Review your Information</h2>

                {/* Display Form Data for Review */}
                <div className="space-y-4">
                  {Object.keys(formData).map((key) => (
                    <div key={key}>
                      <strong>{key.replace(/([A-Z])/g, ' $1')}</strong>: {formData[key as keyof typeof formData]}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isFormSubmitted}
                    className={`w-full py-3 mt-4 rounded bg-[#ff9900] text-black font-semibold ${isFormSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isFormSubmitted ? 'Submission Complete' : 'Submit'}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={handleBack} className="text-gray-500 hover:text-white">
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="bg-[#ff9900] text-black py-2 px-4 rounded"
              >
                {step === steps.length ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default FreelancerSignupPage;
