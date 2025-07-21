'use client';
import React, { useState, useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  serviceId: number | null;
  serviceTitle: string;
  category: string;
  customerId: number | null;
  onSubmit: (data: {
    jobTitle: string;
    description: string;
    subCategory: string;
    urgency: string;
    budget: { min: string; max: string; isFlexible: boolean };
    timePreference: any;
    mediaUrls: string[];
    location: any;
    contactPreference: any;
    category: string;
    customerId: number | null;
  }) => void;
};

const JobRequestModal = ({
  open,
  onClose,
  serviceId,
  serviceTitle,
  category,
  customerId,
  onSubmit,
}: Props) => {
  const [title, setTitle] = useState(serviceTitle || '');
  const [description, setDescription] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [budget, setBudget] = useState({ min: '', max: '', isFlexible: false });
  const [timePreference, setTimePreference] = useState({
    preferredDate: '',
    timeSlots: [] as string[],
    isFlexible: false
  });
  const [media, setMedia] = useState<File[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [location, setLocation] = useState({
    coordinates: { latitude: null, longitude: null },
    address: '',
    pincode: '',
    accuracy: null,
    isLocationPermissionGranted: false,
    manualAddress: {
      state: '',
      city: '',
      locality: '',
      landmark: ''
    }
  });
  const [contactPreference, setContactPreference] = useState({
    phone: true,
    whatsapp: false,
    inApp: true,
    callTime: 'anytime'
  });
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const urgencyOptions = [
    { value: 'low', label: 'Not urgent - Within a week', color: 'text-green-600' },
    { value: 'normal', label: 'Normal - Within 2-3 days', color: 'text-blue-600' },
    { value: 'high', label: 'Urgent - Within 24 hours', color: 'text-orange-600' },
    { value: 'emergency', label: 'Emergency - ASAP', color: 'text-red-600' }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning (8 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
    { value: 'evening', label: 'Evening (5 PM - 8 PM)' },
    { value: 'anytime', label: 'Anytime' }
  ];

  const getSubCategories = (category: string) => {
    const categories: { [key: string]: string[] } = {
      'electrician': [
        'Power outage/No electricity',
        'Faulty wiring',
        'Switch/Socket repair',
        'Fan installation/repair',
        'Light fixture issues',
        'Electrical appliance repair'
      ],
      'plumber': [
        'Pipe leakage',
        'Blocked drain',
        'Tap repair',
        'Toilet issues',
        'Water heater problems',
        'Bathroom fitting'
      ],
      'carpenter': [
        'Furniture repair',
        'Door/Window repair',
        'Cabinet installation',
        'Shelving',
        'Custom furniture',
        'Wood polishing'
      ]
    };
    return categories[category] || [];
  };

  const getCurrentLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });
      
      const { latitude, longitude, accuracy } = position.coords;
      
      // Here you would call your reverse geocoding API
      // For now, we'll just set the coordinates
      setLocation(prev => ({
        ...prev,
        coordinates: { latitude, longitude },
        accuracy,
        isLocationPermissionGranted: true
      }));
      
      // Call reverse geocoding API here
      // const address = await reverseGeocode(latitude, longitude);
      
    } catch (error) {
      console.error('Location error:', error);
      alert('Unable to get your location. Please enter your address manually.');
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + media.length > 5) {
      alert('Maximum 5 files allowed');
      return;
    }
    setMedia([...media, ...files]);
  };

  const removeMedia = (index: number) => {
    const updated = [...media];
    updated.splice(index, 1);
    setMedia(updated);
  };

  const handleTimeSlotChange = (slot: string) => {
    setTimePreference(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter(s => s !== slot)
        : [...prev.timeSlots, slot]
    }));
  };

  const validateForm = () => {
    const newErrors = [];
    
    if (!description.trim()) newErrors.push('Problem description is required');
    if (!location.coordinates.latitude && !location.manualAddress.city) {
      newErrors.push('Location is required');
    }
    if (urgency === 'emergency' && !budget.min) {
      newErrors.push('Budget estimate required for emergency jobs');
    }
    if (timePreference.timeSlots.length === 0) {
      newErrors.push('Please select at least one time slot');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const uploadMediaAndSubmit = async () => {
    if (!validateForm()) return;

    try {
      setUploading(true);
      let mediaUrls: string[] = [];

      if (media.length > 0) {
        const formData = new FormData();
        media.forEach((file) => formData.append('files', file));

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('Upload failed');
        const { urls } = await res.json();
        mediaUrls = urls;
      }

      onSubmit({
        jobTitle: title,
        description,
        subCategory,
        urgency,
        budget,
        timePreference,
        mediaUrls,
        location,
        contactPreference,
        category,
        customerId,
      });

      onClose();
    } catch (error) {
      console.error('Submit failed:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto px-4 py-10">
        <div className="bg-white w-full max-w-3xl p-6 md:p-8 rounded-lg shadow-lg relative max-h-full overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6">Create Job Request</h2>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded-md">
              <ul className="text-sm text-red-700">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Job Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title (Optional)
            </label>
            <input
              type="text"
              placeholder="Brief title for your job"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe the problem in detail *
            </label>
            <textarea
              placeholder="Provide specific details about the issue, what you've tried, and any relevant information..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md h-24"
            />
          </div>

          {/* Urgency */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How urgent is this job? *
            </label>
            <div className="space-y-2">
              {urgencyOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value={option.value}
                    checked={urgency === option.value}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="mr-2"
                  />
                  <span className={`text-sm ${option.color}`}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Budget Range (₹)
            </label>
            <div className="flex gap-2 items-center mb-2">
              <input
                type="number"
                placeholder="Min"
                value={budget.min}
                onChange={(e) => setBudget({...budget, min: e.target.value})}
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={budget.max}
                onChange={(e) => setBudget({...budget, max: e.target.value})}
                className="flex-1 px-3 py-2 border rounded-md"
              />
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={budget.isFlexible}
                onChange={(e) => setBudget({...budget, isFlexible: e.target.checked})}
                className="mr-2"
              />
              <span className="text-sm">Budget is flexible</span>
            </label>
          </div>

          {/* Time Preference */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              When would you prefer the work to be done? *
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {timeSlots.map((slot) => (
                <label key={slot.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={timePreference.timeSlots.includes(slot.value)}
                    onChange={() => handleTimeSlotChange(slot.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">{slot.label}</span>
                </label>
              ))}
            </div>
            <input
              type="date"
              value={timePreference.preferredDate}
              onChange={(e) => setTimePreference({...timePreference, preferredDate: e.target.value})}
              className="px-3 py-2 border rounded-md"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                📍 Use Current Location
              </button>
              {location.isLocationPermissionGranted && (
                <span className="text-sm text-green-600 flex items-center">
                  ✓ Location detected
                </span>
              )}
            </div>
            
            {/* Manual Address Entry */}
            <div className="grid grid-cols-2 gap-2">
              <select
                value={location.manualAddress.state}
                onChange={(e) => setLocation({
                  ...location,
                  manualAddress: { ...location.manualAddress, state: e.target.value }
                })}
                className="px-3 py-2 border rounded-md"
              >
                <option value="">Select State</option>
                <option value="West Bengal">West Bengal</option>
              </select>
              <select
                value={location.manualAddress.city}
                onChange={(e) => setLocation({
                  ...location,
                  manualAddress: { ...location.manualAddress, city: e.target.value }
                })}
                className="px-3 py-2 border rounded-md"
              >
                <option value="">Select City</option>
                <option value="Kolkata">Kolkata</option>
              </select>
              <input
                type="text"
                placeholder="Locality"
                value={location.manualAddress.locality}
                onChange={(e) => setLocation({
                  ...location,
                  manualAddress: { ...location.manualAddress, locality: e.target.value }
                })}
                className="px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Landmark"
                value={location.manualAddress.landmark}
                onChange={(e) => setLocation({
                  ...location,
                  manualAddress: { ...location.manualAddress, landmark: e.target.value }
                })}
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload photos/videos (Recommended)
            </label>
            <label
              htmlFor="media-upload"
              className="flex flex-col items-center justify-center w-full h-24 bg-white border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:border-[#ff9900] transition-colors"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl text-gray-400 mb-1">📷</div>
                <p className="text-sm text-gray-600">Click to upload images/videos</p>
              </div>
              <input
                id="media-upload"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
              />
            </label>

            {media.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {media.map((file, index) => {
                  const url = URL.createObjectURL(file);
                  const isImage = file.type.startsWith('image');
                  return (
                    <div key={index} className="relative group">
                      <button
                        onClick={() => removeMedia(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-10"
                      >
                        ×
                      </button>
                      <div onClick={() => setSelectedMedia(url)} className="cursor-pointer">
                        {isImage ? (
                          <img src={url} alt={`preview-${index}`} className="w-full h-20 object-cover rounded" />
                        ) : (
                          <video src={url} className="w-full h-20 object-cover rounded" muted />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Contact Preference */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How would you like workers to contact you?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={contactPreference.phone}
                  onChange={(e) => setContactPreference({
                    ...contactPreference,
                    phone: e.target.checked
                  })}
                  className="mr-2"
                />
                <span className="text-sm">Phone call</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={contactPreference.whatsapp}
                  onChange={(e) => setContactPreference({
                    ...contactPreference,
                    whatsapp: e.target.checked
                  })}
                  className="mr-2"
                />
                <span className="text-sm">WhatsApp</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={contactPreference.inApp}
                  onChange={(e) => setContactPreference({
                    ...contactPreference,
                    inApp: e.target.checked
                  })}
                  className="mr-2"
                />
                <span className="text-sm">In-app messages</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={uploadMediaAndSubmit}
            disabled={uploading}
            className="bg-[#ff9900] text-white w-full py-3 rounded-md font-semibold hover:bg-orange-600 disabled:opacity-60 transition-colors"
          >
            {uploading ? 'Creating Request...' : 'Create Job Request'}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>
      </div>

      {/* Media Preview Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="max-w-4xl w-full">
            {selectedMedia.includes('video') ? (
              <video src={selectedMedia} controls className="w-full rounded-lg" />
            ) : (
              <img src={selectedMedia} alt="Preview" className="w-full rounded-lg" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JobRequestModal;