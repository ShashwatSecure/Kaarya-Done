"use client";

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
type Service = {
  title: string;
  description: string;
  price: string;
  priceType: string;
  portfolio: string[];
};

type ServiceArea = 'Within 5 km' | 'Within 10 km' | 'Within city limits';

const FreelancerProfileCreation = () => {
  // State management
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([{
    title: '',
    description: '',
    price: '',
    priceType: '',
    portfolio: []
  }]);
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [willingToTravel, setWillingToTravel] = useState('');
  const [completion, setCompletion] = useState(35);
  const [activeTab, setActiveTab] = useState('services');

  // Refs
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const profilePicRef = useRef<HTMLInputElement>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Profile picture upload handler
  const handleProfilePicUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target?.result as string);
        updateCompletion(40);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new service block
  const addService = () => {
    setServices(prev => [...prev, {
      title: '',
      description: '',
      price: '',
      priceType: '',
      portfolio: []
    }]);
  };

  // Handle service input changes
  const handleServiceChange = (index: number, field: keyof Service, value: string) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  // Handle portfolio upload
  const handlePortfolioUpload = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const readers = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    const images = await Promise.all(readers);
    const newServices = [...services];
    newServices[index].portfolio = [...newServices[index].portfolio, ...images];
    setServices(newServices);
  };

  // Remove portfolio image
  const removePortfolioImage = (serviceIndex: number, imageIndex: number) => {
    const newServices = [...services];
    newServices[serviceIndex].portfolio.splice(imageIndex, 1);
    setServices(newServices);
  };

  // Handle service area selection
  const handleServiceAreaChange = (area: ServiceArea, checked: boolean) => {
    setServiceAreas(prev => checked ? [...prev, area] : prev.filter(a => a !== area));
  };

  // Update completion percentage
  const updateCompletion = (newPercentage: number) => {
    setCompletion(Math.min(Math.max(newPercentage, 0), 100));
  };

  // Form validation
  const validateForm = () => {
    const validServices = services.every(service => 
      service.title.trim() && 
      service.description.trim() && 
      service.price.trim() && 
      service.priceType
    );
    
    if (!validServices) {
      alert('Please fill all required service fields');
      return false;
    }
    
    if (serviceAreas.length === 0) {
      alert('Please select at least one service area');
      return false;
    }
    
    if (!willingToTravel) {
      alert('Please specify willingness to travel');
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', { services, serviceAreas, willingToTravel });
      updateCompletion(50);
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-[#f5f5f5] min-h-screen">
      <Head>
        <title>Create Freelancer Profile | Fixify</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

       {/* Navigation */}
       <nav className="bg-[#121212] py-4 px-6 flex justify-between items-center border-b border-[#333333]">
        <div className="flex items-center space-x-2">
          <i className="fas fa-tools text-[#ff9900] text-2xl"></i>
          <span className="text-xl font-bold">Fixify</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Available</span>
            <label className="relative inline-block w-14 h-8">
              <input 
                type="checkbox" 
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="opacity-0 w-0 h-0"
              />
              <span className={`absolute inset-0 rounded-full transition-colors ${
                isAvailable ? 'bg-[#10B981]' : 'bg-[#333333]'
              }`}>
                <span className={`absolute left-1 bottom-1 bg-white w-6 h-6 rounded-full transition-transform ${
                  isAvailable ? 'translate-x-5' : 'translate-x-0'
                }`}></span>
              </span>
            </label>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 bg-[#333333] px-3 py-1 rounded-lg hover:bg-[#444444] transition"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm">John Doe</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-[#333333] rounded-lg shadow-lg overflow-hidden">
                <a href="#" className="block px-4 py-2 hover:bg-[#444444]">
                  <i className="fas fa-user mr-2"></i> Profile
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-[#444444]">
                  <i className="fas fa-cog mr-2"></i> Settings
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-[#444444]">
                  <i className="fas fa-question-circle mr-2"></i> Help
                </a>
                <div className="border-t border-[#333333]"></div>
                <a href="#" className="block px-4 py-2 hover:bg-[#444444]">
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
 {/* Progress Bar */}

      <div className="bg-[#121212] py-2 px-4 border-b border-[#333333]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Profile Completion: <span className="text-[#ff9900]">{completion}%</span>
            </span>
            <span className="text-xs text-gray-400">Step 2 of 5</span>
          </div>
          <div className="w-full bg-[#333333] rounded-full h-2">
            <div 
              className="bg-[#ff9900] h-2 rounded-full transition-all duration-500" 
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
      <section className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#121212]/95 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-dashed border-[#333333] overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                {isAvailable && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#1a1a1a]"></div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">Set Your Availability</h1>
              <div className="flex overflow-x-auto pb-2 space-x-6">
                {['basic-info', 'services', 'portfolio', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-1 py-2 font-medium whitespace-nowrap ${
                      activeTab === tab 
                        ? 'text-[#ff9900] border-b-3 border-[#ff9900]' 
                        : 'text-gray-400'
                    }`}
                  >
                    <i className={`fas fa-${tab.split('-')[0]} mr-1`}></i>
                    {tab.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#121212] rounded-xl p-6 border border-[#333333]">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <i className="fas fa-list-alt mr-2 text-[#ff9900]"></i> Services Type
          </h2>

          <div className="space-y-6">
            {services.map((service, index) => (
              <div key={index} className="service-block">
                <div className="mb-6">
                  <label className="block mb-3 font-medium">Primary Service Category*</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                    placeholder="Enter your main service"
                    className="w-full bg-[#333333] border border-[#333333] rounded-lg px-4 py-3 focus:border-[#ff9900] focus:outline-none"
                  />

                  <label className="block mt-4 mb-3 font-medium">Service Description*</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                    className="w-full bg-[#333333] border border-[#333333] rounded-lg px-4 py-3 focus:border-[#ff9900] focus:outline-none"
                    rows={4}
                  ></textarea>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block mb-3 font-medium">Price*</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">₹</span>
                        <input
                          type="number"
                          value={service.price}
                          onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                          className="w-full bg-[#333333] border border-[#333333] rounded-lg px-4 py-3 pl-8 focus:border-[#ff9900] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-3 font-medium">Price Type*</label>
                      <select
                        value={service.priceType}
                        onChange={(e) => handleServiceChange(index, 'priceType', e.target.value)}
                        className="w-full bg-[#333333] border border-[#333333] rounded-lg px-4 py-3 focus:border-[#ff9900] focus:outline-none"
                      >
                        <option value="">Select price type</option>
                        <option value="fixed">Fixed Price</option>
                        <option value="hourly">Hourly Rate</option>
                        <option value="per_sqft">Per Sq. Ft.</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block mb-3 font-medium">Service Portfolio*</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {service.portfolio.map((image, imgIndex) => (
                        <div key={imgIndex} className="relative group">
                          <img src={image} className="w-full h-32 object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <button
                              onClick={() => removePortfolioImage(index, imgIndex)}
                              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <input
                      type="file"
                      ref={el => fileInputRefs.current[index] = el}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => handlePortfolioUpload(index, e)}
                    />
                    <button
                      onClick={() => fileInputRefs.current[index]?.click()}
                      className="w-full bg-[#333333] border-2 border-dashed border-[#333333] rounded-lg p-4 text-center hover:border-[#ff9900] transition"
                    >
                      <i className="fas fa-plus-circle text-2xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-400">Add Portfolio Images</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addService}
              className="bg-[#ff9900] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
            >
              Add More Services
            </button>
          </div>

          <div className="mt-6">
            <label className="block mb-3 font-medium">Service Area*</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Within 5 km', 'Within 10 km', 'Within city limits'].map((area) => (
                <label key={area} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={serviceAreas.includes(area as ServiceArea)}
                    onChange={(e) => handleServiceAreaChange(area as ServiceArea, e.target.checked)}
                    className="form-checkbox text-[#ff9900] rounded bg-[#333333] border-[#333333] focus:ring-[#ff9900]"
                  />
                  <span className="ml-2">{area}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-6">
              <label className="block mb-2 font-medium">Willing to travel further*</label>
              <select
                value={willingToTravel}
                onChange={(e) => setWillingToTravel(e.target.value)}
                className="w-full bg-[#333333] border border-[#333333] rounded-lg px-4 py-3 focus:ring-[#ff9900] focus:outline-none"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              className="bg-transparent border border-[#333333] text-[#f5f5f5] px-6 py-3 rounded-lg hover:bg-[#333333] hover:border-[#ff9900] transition"
            >
              <i className="fas fa-save mr-2"></i> Save as Draft
            </button>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="bg-transparent border border-[#333333] text-[#f5f5f5] px-6 py-3 rounded-lg hover:bg-[#333333] hover:border-[#ff9900] transition"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#ff9900] text-[#121212] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Continue to Gallery <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FreelancerProfileCreation;