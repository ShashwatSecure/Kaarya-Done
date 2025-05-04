"use client";
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';

const FreelancerProfileCreation = () => {
  // Color configuration
  const colors = {
    accent: '#ff9900',
    dark: '#1a1a1a',
    darker: '#121212',
    light: '#f5f5f5',
    gray: '#333333',
  };

  // State management
  const [formData, setFormData] = useState({
    fullName: '',
    profession: '',
    state: '',
    city: '',
    phone: '',
    experience: '',
    bio: '',
    primaryService: '',
    secondaryService: '',
    serviceAreas: [] as string[],
    linkedin: '',
    instagram: '',
    website: '',
  });

  const [skills, setSkills] = useState<string[]>(['Electrical Wiring', 'Lighting Installation']);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(35);
  const [activeTab, setActiveTab] = useState('basic-info');
  const [certifications, setCertifications] = useState([
    { name: '', organization: '', year: '', file: null as File | null },
  ]);

  // Refs
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const skillsInputRef = useRef<HTMLInputElement>(null);

  // Event handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateCompletion();
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      serviceAreas: checked
        ? [...prev.serviceAreas, value]
        : prev.serviceAreas.filter(area => area !== value),
    }));
    updateCompletion();
  };

  const handleProfilePicUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target?.result as string);
        updateCompletion();
      };
      reader.readAsDataURL(file);
    }
  };

  // Skills management
  const addSkill = () => {
    const skill = skillsInputRef.current?.value.trim();
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
      if (skillsInputRef.current) skillsInputRef.current.value = '';
      updateCompletion();
    }
  };

  const removeSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
    updateCompletion();
  };

  // Certifications management
  const addCertification = () => {
    setCertifications(prev => [
      ...prev,
      { name: '', organization: '', year: '', file: null },
    ]);
    updateCompletion();
  };

  const removeCertification = (index: number) => {
    setCertifications(prev => prev.filter((_, i) => i !== index));
    updateCompletion();
  };

  const handleCertificationChange = (index: number, field: 'name' | 'organization' | 'year', value: string) => {
    const newCertifications = [...certifications];
    newCertifications[index][field] = value;
    setCertifications(newCertifications);
    updateCompletion();
  };

  const handleCertificationFileUpload = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newCertifications = [...certifications];
      newCertifications[index].file = file;
      setCertifications(newCertifications);
      updateCompletion();
    }
  };

  // Progress management
  const updateCompletion = (newValue?: number) => {
    if (newValue !== undefined) {
      setCompletionPercentage(newValue);
      return;
    }
    setCompletionPercentage(prev => Math.min(prev + 5, 100));
  };

  // Form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Profile saved! Moving to Services section.');
    updateCompletion(60);
  };

  // Tab navigation
  const navigateToTab = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Custom styles
  const customStyles = `
    .profile-creation-header {
      background: linear-gradient(135deg, ${colors.dark}99 0%, ${colors.darker}f2 100%);
    }
    .form-section {
      transition: all 0.3s ease;
    }
    .form-section:hover {
      box-shadow: 0 4px 6px ${colors.accent}33;
    }
    .skill-tag {
      transition: all 0.2s ease;
      background-color: ${colors.gray};
    }
    .skill-tag:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px ${colors.accent}4d;
    }
    .file-upload:hover label {
      border-color: ${colors.accent};
    }
    .progress-bar {
      transition: width 0.5s ease;
      background-color: ${colors.accent};
    }
    .tab-active {
      border-bottom: 3px solid ${colors.accent};
      color: ${colors.accent};
    }
  `;

  return (
    <div style={{ backgroundColor: colors.dark, color: colors.light, minHeight: '100vh' }}>
      <Head>
        <title>Create Freelancer Profile | Fixify</title>
        <style>{customStyles}</style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <Navbar />

      {/* Progress Bar */}
      <div style={{ backgroundColor: colors.darker, borderColor: colors.gray }}
        className="py-2 px-4 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Profile Completion: <span style={{ color: colors.accent }}>{completionPercentage}%</span>
            </span>
            <span className="text-xs" style={{ color: colors.gray }}>Step 2 of 5</span>
          </div>
          <div className="w-full rounded-full h-2" style={{ backgroundColor: colors.gray }}>
            <div className="progress-bar h-2 rounded-full"
              style={{ width: `${completionPercentage}%`, backgroundColor: colors.accent }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <section className="profile-creation-header rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="file-upload relative">
              <input type="file" id="profile-pic" className="hidden" accept="image/*"
                ref={profilePicInputRef} onChange={handleProfilePicUpload} />
              <label htmlFor="profile-pic" className="cursor-pointer">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden"
                  style={{ borderColor: colors.gray }}>
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <i className="fas fa-camera text-2xl mb-1" style={{ color: colors.gray }}></i>
                      <p className="text-xs" style={{ color: colors.gray }}>Upload Photo</p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">Create Your Profile</h1>
              {/* Tabs */}
              <div className="flex overflow-x-auto pb-2 space-x-6">
                {['basic-info', 'services', 'portfolio', 'pricing', 'availability'].map((tab) => (
                  <a key={tab} href={`#${tab}`} onClick={(e) => { e.preventDefault(); navigateToTab(tab); }}
                    className={`px-1 py-2 font-medium whitespace-nowrap ${
                      activeTab === tab 
                        ? 'tab-active border-b-3' 
                        : 'opacity-70'
                    }`}
                    style={{
                      color: activeTab === tab ? colors.accent : colors.light,
                      borderColor: activeTab === tab ? colors.accent : 'transparent'
                    }}>
                    <i className={`fas ${
                      tab === 'basic-info' ? 'fa-user' :
                      tab === 'services' ? 'fa-briefcase' :
                      tab === 'portfolio' ? 'fa-images' :
                      tab === 'pricing' ? 'fa-money-bill-wave' : 'fa-calendar-alt'
                    } mr-1`}></i>
                    {tab.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Form Sections */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <section id="basic-info" className="form-section rounded-xl p-6 border"
            style={{ backgroundColor: colors.darker, borderColor: colors.gray }}>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-user mr-2" style={{ color: colors.accent }}></i> Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['fullName', 'profession', 'state', 'city', 'phone'].map((field) => (
                <div key={field}>
                  <label className="block mb-2 font-medium">
                    {field.replace(/([A-Z])/g, ' $1').trim()}*
                  </label>
                  <input type={field === 'phone' ? 'tel' : 'text'} name={field}
                    value={formData[field as keyof typeof formData]} onChange={handleInputChange}
                    className="w-full rounded-lg px-4 py-3 focus:outline-none"
                    style={{ backgroundColor: colors.gray, borderColor: colors.gray }}
                    required />
                </div>
              ))}
              <div>
                <label className="block mb-2 font-medium">Years of Experience*</label>
                <select name="experience" value={formData.experience} onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 focus:outline-none"
                  style={{ backgroundColor: colors.gray, borderColor: colors.gray }}
                  required>
                  <option value="">Select</option>
                  {['0-1', '1-3', '3-5', '5-10', '10+'].map(opt => (
                    <option key={opt} value={opt}>{opt} years</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-2 font-medium">About You*</label>
              <textarea name="bio" rows={4} value={formData.bio} onChange={handleInputChange}
                className="w-full rounded-lg px-4 py-3 focus:outline-none"
                style={{ backgroundColor: colors.gray, borderColor: colors.gray }}
                required></textarea>
              <p className="text-xs mt-1" style={{ color: colors.gray }}>Minimum 100 characters</p>
            </div>
          </section>

          {/* Skills Section */}
          <section className="form-section rounded-xl p-6 border"
            style={{ backgroundColor: colors.darker, borderColor: colors.gray }}>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-star mr-2" style={{ color: colors.accent }}></i> Skills & Specializations
            </h2>
            <div className="mb-6">
              <div className="flex">
                <input type="text" ref={skillsInputRef} placeholder="e.g. Electrical Wiring, Plumbing Repair"
                  className="flex-1 rounded-l-lg px-4 py-3 focus:outline-none"
                  style={{ backgroundColor: colors.gray, borderColor: colors.gray }}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} />
                <button type="button" onClick={addSkill}
                  className="px-4 py-3 rounded-r-lg font-medium hover:opacity-90 transition"
                  style={{ backgroundColor: colors.accent }}>
                  Add
                </button>
              </div>
              <p className="text-xs mt-1" style={{ color: colors.gray }}>
                Press Enter or click Add to include a skill
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="skill-tag px-3 py-1 rounded-full text-sm flex items-center">
                  {skill}
                  <button type="button" onClick={() => removeSkill(index)}
                    className="ml-1 hover:opacity-70">
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="form-section rounded-xl p-6 border"
            style={{ backgroundColor: colors.darker, borderColor: colors.gray }}>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-list-alt mr-2" style={{ color: colors.accent }}></i> Services Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['primaryService', 'secondaryService'].map((serviceType) => (
                <div key={serviceType}>
                  <label className="block mb-3 font-medium">
                    {serviceType.includes('primary') ? 'Primary' : 'Secondary'} Service Category
                    {serviceType.includes('primary') && '*'}
                  </label>
                  <select name={serviceType} value={formData[serviceType as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="w-full rounded-lg px-4 py-3 focus:outline-none"
                    style={{ backgroundColor: colors.gray, borderColor: colors.gray }}
                    required={serviceType === 'primaryService'}>
                    <option value="">Select {serviceType.includes('primary') ? 'main' : 'additional'} service</option>
                    {['Electrical', 'Plumbing', 'Carpentry', 'Painting', 'Cleaning', 'Appliance', 'AC Repair', 'Moving'].map(service => (
                      <option key={service} value={service.toLowerCase()}>{service}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="block mb-3 font-medium">Service Area*</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Within 5 km', 'Within 10 km', 'Within city limits', 'Willing to travel further'].map((area) => (
                  <label key={area} className="flex items-center">
                    <input type="checkbox" value={area} checked={formData.serviceAreas.includes(area)}
                      onChange={handleCheckboxChange} className="form-checkbox rounded focus:ring-0"
                      style={{ backgroundColor: colors.gray, borderColor: colors.gray }} />
                    <span className="ml-2">{area}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section className="form-section rounded-xl p-6 border"
            style={{ backgroundColor: colors.darker, borderColor: colors.gray }}>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-certificate mr-2" style={{ color: colors.accent }}></i> Certifications & Qualifications
            </h2>
            <div>
              {certifications.map((cert, index) => (
                <div key={index} className="mb-4 p-4 rounded-lg"
                  style={{ backgroundColor: colors.gray }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    {(['name', 'organization', 'year'] as const).map((field) => (
                      <div key={field}>
                        <label className="block mb-1 font-medium">
                          {field.charAt(0).toUpperCase() + field.slice(1)}*
                        </label>
                        <input type={field === 'year' ? 'number' : 'text'} 
                          value={cert[field]}
                          onChange={(e) => handleCertificationChange(index, field, e.target.value)}
                          className="w-full rounded-lg px-3 py-2 focus:outline-none"
                          style={{ backgroundColor: colors.darker, borderColor: colors.gray }}
                          required />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button type="button" onClick={() => removeCertification(index)}
                      className="text-red-500 text-sm hover:underline">
                      Remove
                    </button>
                    <div className="file-upload">
                      <input type="file" id={`cert-file-${index}`} className="hidden" accept="image/*,.pdf"
                        onChange={(e) => handleCertificationFileUpload(index, e)} />
                      <label htmlFor={`cert-file-${index}`} className="text-sm hover:underline flex items-center cursor-pointer"
                        style={{ color: colors.accent }}>
                        <i className="fas fa-paperclip mr-1"></i> Upload Certificate
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addCertification} className="hover:underline flex items-center"
                style={{ color: colors.accent }}>
                <i className="fas fa-plus-circle mr-2"></i> Add Another Certification
              </button>
            </div>
          </section>

          {/* Social Media Section */}
          <section className="form-section rounded-xl p-6 border"
            style={{ backgroundColor: colors.darker, borderColor: colors.gray }}>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-share-alt mr-2" style={{ color: colors.accent }}></i> Social Media & Links
            </h2>
            <div className="space-y-4">
              {[
                { icon: 'linkedin-in', name: 'linkedin', placeholder: 'LinkedIn Profile URL' },
                { icon: 'instagram', name: 'instagram', placeholder: 'Instagram Profile URL' },
                { icon: 'globe', name: 'website', placeholder: 'Website/Portfolio URL' },
              ].map((social) => (
                <div key={social.name} className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: colors.gray }}>
                    <i className={`fab fa-${social.icon}`} style={{ color: colors.accent }}></i>
                  </div>
                  <input type="url" name={social.name} value={formData[social.name as keyof typeof formData]}
                    onChange={handleInputChange} placeholder={social.placeholder}
                    className="flex-1 rounded-lg px-4 py-3 focus:outline-none"
                    style={{ backgroundColor: colors.gray, borderColor: colors.gray }} />
                </div>
              ))}
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button type="button" className="border rounded-lg px-6 py-3 font-medium transition"
              style={{ backgroundColor: colors.gray, borderColor: colors.gray }}>
              Save as Draft
            </button>
            <div className="flex gap-4">
              <button type="button" className="border rounded-lg px-6 py-3 font-medium transition"
                style={{ backgroundColor: colors.gray, borderColor: colors.gray }}>
                Back
              </button>
              <button type="submit" className="px-6 py-3 rounded-lg font-medium transition"
                style={{ backgroundColor: colors.accent }}>
                Continue to Services
              </button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default FreelancerProfileCreation;