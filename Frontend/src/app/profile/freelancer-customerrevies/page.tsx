"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';

interface Review {
  id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  tags: string[];
  date: string;
  avatar: string;
}

interface FormData {
  name: string;
  service: string;
  rating: number;
  text: string;
  tags: string[];
}

const CustomerReviews = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [activeTab, setActiveTab] = useState('availability');
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [completion, setCompletion] = useState(65);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    service: '',
    rating: 0,
    text: '',
    tags: []
  });

  useEffect(() => {
    setReviews([
      {
        id: '1',
        name: 'Sarah Johnson',
        service: 'Plumbing',
        rating: 5,
        text: 'Absolutely fantastic service! Fixed my plumbing issue in no time.',
        tags: ['Quick Service'],
        date: '2 days ago',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        id: '2',
        name: 'Michael Chen',
        service: 'Electrical',
        rating: 4,
        text: 'Good electrical work done at my home. Quality work overall.',
        tags: ['Professional'],
        date: '1 week ago',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
      }
    ]);
  }, []);

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleCheckboxChange = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      avatar: `https://randomuser.me/api/portraits/${
        Math.random() > 0.5 ? 'women' : 'men'
      }/${Math.floor(Math.random() * 100)}.jpg`
    };

    setReviews(prev => [newReview, ...prev]);
    setShowModal(false);
    setFormData({ name: '', service: '', rating: 0, text: '', tags: [] });
    setCompletion(prev => Math.min(prev + 10, 100));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(review => review.id !== id));
  };

  const filteredReviews = reviews.filter(review => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '3') return review.rating <= 3;
    return review.rating === parseInt(activeFilter);
  });

  return (
    <div className="bg-[#1a1a1a] text-[#f5f5f5] min-h-screen">
    <Head>
        <title>Availability | Fixify</title>
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
            <span className="text-xs text-gray-400">Step 5 of 5</span>
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
                {['basic-info', 'services', 'portfolio', 'reviews', 'availability'].map((tab) => (
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <i className="fas fa-star mr-2 text-[#ff9900]"></i> Customer Feedback
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Average Rating:</span>
              <div className="flex items-center">
                <span className="text-yellow-400 font-bold mr-1">4.8</span>
                <div className="star-rating flex">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i}
                      className={`fas fa-star ${i < 4 ? 'text-yellow-400' : 'text-gray-400'}`}
                    ></i>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {['all', '5', '4', '3'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg border border-[#333333] hover:bg-[#ff9900] hover:text-[#1a1a1a] transition ${
                  activeFilter === filter ? 'bg-[#ff9900] text-[#1a1a1a]' : ''
                }`}
              >
                {filter === 'all' ? 'All Reviews' : (
                  <>
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    {filter === '3' ? '3 Stars & Below' : `${filter} Stars`}
                  </>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredReviews.map(review => (
              <div key={review.id} className="bg-[#333333] rounded-xl p-6 border border-[#333333]">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                      <img src={review.avatar} alt="Customer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <div className="star-rating flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < review.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-300 mb-4">"{review.text}"</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="text-xs bg-[#1a1a1a] px-2 py-1 rounded">{review.service}</span>
                    {review.tags.map(tag => (
                      <span key={tag} className="text-xs bg-[#1a1a1a] px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => deleteReview(review.id)}
                    className="text-red-400 text-sm hover:text-red-300 flex items-center"
                  >
                    <i className="fas fa-trash mr-1"></i> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => alert('Draft saved')}
              className="border border-[#333333] text-[#f5f5f5] px-6 py-3 rounded-lg hover:bg-[#333333] hover:border-[#ff9900] transition"
            >
              <i className="fas fa-save mr-2"></i> Save as Draft
            </button>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="border border-[#333333] text-[#f5f5f5] px-6 py-3 rounded-lg hover:bg-[#333333] hover:border-[#ff9900] transition"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (reviews.length === 0) {
                    alert('Please add at least one review');
                    return;
                  }
                  setCompletion(85);
                }}
                className="bg-[#ff9900] text-[#121212] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Continue to Availability <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#121212] rounded-xl p-6 w-full max-w-md">
            <form onSubmit={handleSubmitReview}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add Customer Review</h3>
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">Customer Name*</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-[#333333] border border-[#333333] rounded-lg px-4 py-2 focus:border-[#ff9900] focus:outline-none"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">Rating*</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleStarClick(rating)}
                      className={`text-2xl ${formData.rating >= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                    >
                      <i className="fas fa-star"></i>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">Review Text*</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  className="w-full bg-[#333333] border border-[#333333] rounded-lg px-4 py-2 focus:border-[#ff9900] focus:outline-none"
                  rows={4}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">Tags (optional)</label>
                <div className="flex flex-wrap gap-2">
                  {['Professional', 'Quick Service', 'Affordable', 'Quality Work'].map((tag) => (
                    <label key={tag} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.tags.includes(tag)}
                        onChange={() => handleCheckboxChange(tag)}
                        className="form-checkbox text-[#ff9900] rounded bg-[#333333] border-[#333333] focus:ring-[#ff9900]"
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border border-[#333333] text-[#f5f5f5] px-4 py-2 rounded-lg hover:bg-[#333333]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#ff9900] text-[#121212] px-4 py-2 rounded-lg font-medium hover:bg-opacity-90"
                >
                  Add Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;