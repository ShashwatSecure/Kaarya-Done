'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'

const FreelancerSignupPage = () => {
  const steps = ['Profile Info', 'Contact Details', 'Services', 'Availability', 'Review'];
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    password: '',
    profilePhoto: null as File | null,
    bio: '',
    languages: [] as string[],
    city: '',
    pincode: '',
    services: [] as string[],
    experience: '',
    rate: '',
    certifications: [] as File[],
    willingnessToTravel: 'no' as 'yes' | 'no' | 'maybe',
    availableDays: [] as string[],
    timeSlots: '',
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const updatedDays = checked
        ? [...prev.availableDays, value]
        : prev.availableDays.filter(day => day !== value);
      return { ...prev, availableDays: updatedDays };
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <main className="min-h-screen bg-gray-900 text-white px-4 py-10">
        <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Join as a Freelancer</h2>

          <div className="mb-6 flex justify-between items-center">
            {steps.map((label, idx) => (
              <div key={label} className="flex-1 text-center">
                <div
                  className={`w-10 h-10 mx-auto mb-1 rounded-full flex items-center justify-center font-bold ${idx + 1 === step ? 'bg-[#ff9900] text-black' : 'bg-gray-700'
                    }`}
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
                      {formData.profilePhoto ? (
                        <img
                          src={URL.createObjectURL(formData.profilePhoto)}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="fas fa-camera text-gray-500 text-xl" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profilePhoto: e.target.files?.[0] || null,
                          })
                        }
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Upload a clear photo of yourself</p>
                      <p className="text-xs text-gray-500">Max. 5MB (JPG, PNG)</p>
                    </div>
                  </div>
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

                {/* Languages Spoken */}
                <div>
                  <label className="block text-sm font-medium mb-2">Languages Spoken</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    {['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi', 'Bengali'].map((lang) => (
                      <label key={lang} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={lang}
                          checked={formData.languages.includes(lang)}
                          onChange={(e) => {
                            const newLangs = e.target.checked
                              ? [...formData.languages, lang]
                              : formData.languages.filter((l) => l !== lang);
                            setFormData({ ...formData, languages: newLangs });
                          }}
                          className="accent-orange-500"
                        />
                        <span>{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
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
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <input
                  type="email"
                  name="workEmail"
                  placeholder="Work Email"
                  value={formData.workEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            )}

            {/* Step 3: Services */}
            {step === 3 && (
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
                    {['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning'].map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple services</p>
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
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    placeholder="Hourly Rate"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Certifications</label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={(e) => {
                      const files = e.target.files ? Array.from(e.target.files) : [];
                      setFormData({ ...formData, certifications: files });
                    }}
                    multiple
                    className="w-full text-sm text-gray-500 file:bg-gray-700 file:border-none file:text-white file:px-4 file:py-2 file:rounded-md file:hover:bg-orange-500"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Availability */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Availability</h2>

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
                    <option value="maybe">Maybe</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2">Location (City & Pincode)</label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Available Days */}
                <div>
                  <label className="block text-sm font-medium mb-2">Available Days</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                      <label key={day} className="inline-flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="availableDays"
                          value={day}
                          checked={formData.availableDays?.includes(day)}
                          onChange={handleCheckboxChange}
                          className="form-checkbox text-orange-500 bg-gray-700 border-gray-600"
                        />
                        <span className="text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-sm font-medium mb-2">Time Slots</label>
                  <input
                    type="text"
                    name="timeSlots"
                    placeholder="e.g. 10am - 2pm, 5pm - 9pm"
                    value={formData.timeSlots}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            )}


            {step === 5 && !isFormSubmitted && (
              <div className="mt-6 space-y-6">
                {/* Profile Summary */}
                <div id="profile-summary" className="space-y-4">
                  {/* Basic Info Section */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Basic Information</h3>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-orange-500 text-sm flex items-center"
                      >
                        <i className="fas fa-edit mr-1"></i> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Profile Photo */}
                      <div>
                        <p className="text-sm text-gray-400">Profile Photo</p>
                        <div
                          id="summary-photo"
                          className="w-16 h-16 rounded-full bg-gray-600 mt-1 overflow-hidden"
                        >
                          {formData.profilePhoto && (
                            <img
                              src={URL.createObjectURL(formData.profilePhoto)}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <p className="text-sm text-gray-400">Bio</p>
                        <p id="summary-bio" className="text-sm mt-1 line-clamp-3">
                          {formData.bio || 'Not provided'}
                        </p>
                      </div>

                      {/* Languages */}
                      <div>
                        <p className="text-sm text-gray-400">Languages</p>
                        <p id="summary-languages" className="text-sm mt-1">
                          {formData.languages.length > 0 ? formData.languages.join(', ') : 'Not selected'}
                        </p>
                      </div>
                    </div>
                  </div>


                  {/* Contact Info Section */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Contact Information</h3>
                      <button type="button" onClick={() => setStep(2)} className="text-orange-500 text-sm flex items-center">
                        <i className="fas fa-edit mr-1"></i> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Full Name</p>
                        <p className="text-sm mt-1">{formData.fullName || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-sm mt-1">{formData.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Work Email</p>
                        <p className="text-sm mt-1">{formData.workEmail || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>


                  {/* Services Section */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Services & Experience</h3>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-orange-500 text-sm flex items-center"
                      >
                        <i className="fas fa-edit mr-1"></i> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Services */}
                      <div>
                        <p className="text-sm text-gray-400">Services</p>
                        <p id="summary-services" className="text-sm mt-1">
                          {formData.services.length > 0 ? formData.services.join(', ') : 'Not selected'}
                        </p>
                      </div>

                      {/* Experience */}
                      <div>
                        <p className="text-sm text-gray-400">Experience</p>
                        <p id="summary-experience" className="text-sm mt-1">
                          {formData.experience || 'Not provided'}
                        </p>
                      </div>

                      {/* Hourly Rate */}
                      <div>
                        <p className="text-sm text-gray-400">Hourly Rate</p>
                        <p id="summary-rate" className="text-sm mt-1">
                          {formData.rate ? `₹${formData.rate}/hr` : 'Not provided'}
                        </p>
                      </div>

                      {/* Certifications */}
                      <div className="md:col-span-3">
                        <p className="text-sm text-gray-400">Certifications</p>
                        <p id="summary-certifications" className="text-sm mt-1">
                          {formData.certifications.length > 0
                            ? `${formData.certifications.length} file(s) uploaded`
                            : 'None uploaded'}
                        </p>
                      </div>
                    </div>
                  </div>


                  {/* Availability Section */}
                  {/* Availability Section */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Availability & Location</h3>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-orange-500 text-sm flex items-center"
                      >
                        <i className="fas fa-edit mr-1"></i> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Available Days */}
                      <div>
                        <p className="text-sm text-gray-400">Available Days</p>
                        <p id="summary-days" className="text-sm mt-1">
                          {formData.availableDays.length > 0 ? formData.availableDays.join(', ') : 'Not selected'}
                        </p>
                      </div>


                      {/* Time Slots (optional field - adjust as needed) */}
                      <div>
                        <p className="text-sm text-gray-400">Time Slots</p>
                        <p id="summary-times" className="text-sm mt-1">
                          {formData.timeSlots ? formData.timeSlots : 'Not selected'}
                        </p>
                      </div>

                      {/* Location (city + pincode) */}
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p id="summary-location" className="text-sm mt-1">
                          {formData.city || formData.pincode
                            ? `${formData.city || ''}${formData.city && formData.pincode ? ', ' : ''}${formData.pincode || ''}`
                            : 'Not provided'}
                        </p>
                      </div>

                      {/* Willingness to Travel */}
                      <div>
                        <p className="text-sm text-gray-400">Willing to Travel</p>
                        <p id="summary-travel" className="text-sm mt-1">
                          {formData.willingnessToTravel.charAt(0).toUpperCase() + formData.willingnessToTravel.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={isTermsChecked}
                    onChange={() => setIsTermsChecked(!isTermsChecked)}
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm">
                    I agree to the{' '}
                    <Link href="/about#terms-of-service" className="text-orange-500 hover:underline">Terms of Service</Link> and{' '}
                    <Link href="/about#privacy-policy" className="text-orange-500 hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-700 rounded-md text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isTermsChecked}
                    className="px-4 py-2 bg-[#ff9900] hover:bg-orange-500 rounded-md text-black disabled:opacity-50"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation */}
            {isFormSubmitted && (
              <div className="text-center mt-8">
                <h3 className="text-2xl font-semibold">Thank you for signing up!</h3>
                <Link href="/login/freelancer" className='text-orange-500 hover:underline'>Login as Freelancer</Link>
              </div>
            )}
          </form>

          {/* Navigation Buttons */}
          {!isFormSubmitted && step < steps.length && (
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-700 rounded-md text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-[#ff9900] rounded-md text-black"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default FreelancerSignupPage;
