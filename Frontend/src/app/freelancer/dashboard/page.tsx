'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  FaTachometerAlt, FaCalendarAlt, FaTools, FaUserCheck,
  FaBell, FaHistory, FaChevronRight, FaChevronLeft,
  FaRupeeSign, FaWallet, FaStar, FaCheckCircle
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import throttle from 'lodash/throttle';
import NewJobsTab from '@/components/NewJobsTab';
import Modal from '@/components/Modal';
import FreelancerNavbar from '@/components/FreelancerNavbar';

// Define types
type TabType = 'dashboard' | 'bookings' | 'services' | 'profile' | 'new_jobs' | 'job_history';

interface FreelancerData {
  name: string;
  profileImage: string;
  role: string;
  earnings: number;
  wallet: number;
  rating: number;
  reviews: number;
  completedJobs: number;
}

export interface JobRequestDto {
  id: number;
  title: string;
  description: string;
  serviceId: number;
  serviceName: string;
  customerId: number;
  customerName: string;
  customerPhone: string;
  location: {
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
    locality: string;
    latitude: number;
    longitude: number;
  };
  urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'IMMEDIATE';
  mediaUrls: string[]; // URLs of uploaded images or videos
  preferredDate: string; // ISO string format e.g., "2025-05-17T14:30:00Z"
  status: 'OPEN' | 'BID_PLACED' | 'FREELANCER_BOOKED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  tab: TabType;
  activeTab: TabType;
  onClick: (tab: TabType) => void;
}

interface SidebarContentProps {
  freelancer: FreelancerData | null;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onClose?: () => void;
}

// Component for individual stat cards
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bg, text }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${bg} ${text}`}>
        {icon}
      </div>
    </div>
  </div>
);

// Component for navigation items
const NavItem: React.FC<NavItemProps> = ({ icon, label, tab, activeTab, onClick }) => (
  <button
    onClick={() => onClick(tab)}
    className={`flex items-center w-full px-3 py-2 rounded hover:bg-orange-300 hover:text-black transition ${
      activeTab === tab ? 'bg-orange-500 text-white' : ''
    }`}
    aria-current={activeTab === tab ? 'page' : undefined}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </button>
);

// Component for sidebar content
const SidebarContent: React.FC<SidebarContentProps> = ({ freelancer, activeTab, onTabChange, onClose }) => (
  <>
    <div className="flex items-start justify-between px-4 py-4 border-b border-b-gray-300">
      <a href="/" className="text-2xl font-bold">
        <span className="text-black">Fix</span>
        <span className="bg-[#ff9900] text-black px-1 rounded">ify</span>
      </a>
      
    </div>

    <div className="p-4">
      <div className="flex items-center">
        <img
          src={freelancer?.profileImage || '/default-avatar.webp'}
          alt="Profile"
          className="w-10 h-8 rounded-full mr-3 object-cover"
        />
        <div>
          <p className="font-medium">{freelancer?.name || 'Loading...'}</p>
          <p className="text-xs text-gray-500">{freelancer?.role || ''}</p>
        </div>
      </div>
    </div>

    <nav className="p-4 space-y-1">
      <NavItem 
        icon={<FaTachometerAlt />} 
        label="Dashboard" 
        tab="dashboard" 
        activeTab={activeTab} 
        onClick={onTabChange} 
      />
      <NavItem 
        icon={<FaBell />} 
        label="New Job Requests" 
        tab="new_jobs" 
        activeTab={activeTab} 
        onClick={onTabChange} 
      />
      <NavItem 
        icon={<FaCalendarAlt />} 
        label="My Bookings" 
        tab="bookings" 
        activeTab={activeTab} 
        onClick={onTabChange} 
      />
      <NavItem 
        icon={<FaUserCheck />} 
        label="Profile & Verification" 
        tab="profile" 
        activeTab={activeTab} 
        onClick={onTabChange} 
      />
      <NavItem 
        icon={<FaTools />} 
        label="Services" 
        tab="services" 
        activeTab={activeTab} 
        onClick={onTabChange} 
      />
      <NavItem 
        icon={<FaHistory />} 
        label="Job History" 
        tab="job_history" 
        activeTab={activeTab} 
        onClick={onTabChange} 
      />
    </nav>
  </>
);

const FreelancerDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [freelancer, setFreelancer] = useState<FreelancerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<JobRequestDto[]>([]);

  const fetchFreelancerData = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login/freelancer');
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('http://192.168.1.4:8080/api/freelancer/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(res.status === 401 ? 'Unauthorized' : 'Failed to fetch data');
      }

      const data = await res.json();
      setFreelancer(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      localStorage.removeItem('authToken');
      router.push('/login/freelancer');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchFreelancerData();
  }, [fetchFreelancerData]);

  
  const fetchJobs = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login/freelancer');
      return;
    }

    try {
      const res = await fetch('http://192.168.1.4:8080/api/freelancer/jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error response:", text);
        setJobs([]);
        return;
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error("Expected array, received:", data);
        setJobs([]);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setJobs([]);
    }
  }, [router]);

  // Fetch jobs when new_jobs tab is active
  useEffect(() => {
    if (activeTab === 'new_jobs') {
      fetchJobs();
    }
  }, [activeTab, fetchJobs]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const openBidModal = () => setIsBidModalOpen(true);
  const closeBidModal = () => setIsBidModalOpen(false);
  const handleStartInspection = () => alert('Inspection started!');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <FreelancerNavbar />

      {/* Sidebar toggle button for mobile */}
      <button
  aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
  onClick={toggleSidebar}
  className={`fixed z-60 top-1/2 transform -translate-y-1/2 md:hidden p-2 bg-white rounded-full shadow-lg text-gray-700 transition-all duration-300 ${
    isSidebarOpen ? 'left-64 ml-2' : 'left-2'
  }`}
>
  {isSidebarOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
</button> 


      <div className="flex min-h-screen bg-gray-100 text-gray-800">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 bg-white h-screen shadow-lg fixed left-0 top-0 z-30">
          <SidebarContent 
            freelancer={freelancer} 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
        </aside>

        {/* Mobile Sidebar with Overlay */}
<>
  {/* Overlay */}
  <div 
    className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    onClick={toggleSidebar}
  />

  {/* Sidebar */}
  <aside
    className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-100 md:hidden transform transition-transform duration-300 ease-in-out ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    <SidebarContent
      freelancer={freelancer}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onClose={toggleSidebar}
    />
  </aside>
</>


        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'md:ml-64'}`}>
          {activeTab === 'dashboard' && freelancer && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Monthly Earnings" 
                value={`₹${freelancer?.earnings ?? '0'}`} 
                icon={<FaRupeeSign />} 
                bg="bg-green-100" 
                text="text-green-600" 
              />
              <StatCard 
                title="Wallet Balance" 
                value={`₹${freelancer?.wallet ?? '0'}`} 
                icon={<FaWallet />} 
                bg="bg-blue-100" 
                text="text-blue-600" 
              />
              <StatCard 
                title="Current Ratings" 
                value={`${freelancer?.rating?.toString() || 'N/A'}`} 
                icon={<FaStar />} 
                bg="bg-yellow-100" 
                text="text-yellow-600" 
              />
              <StatCard 
                title="Total Completed Jobs" 
                value={`${freelancer?.completedJobs?.toString() || '0'}`} 
                icon={<FaCheckCircle />} 
                bg="bg-purple-100" 
                text="text-purple-600" 
              />
            </div>
          )}

          {activeTab === 'new_jobs' && (
            <NewJobsTab onBidNow={openBidModal} onStartInspection={handleStartInspection} />
          )}

          {activeTab === 'bookings' && <p>Bookings content here</p>}
          {activeTab === 'services' && <p>Services content here</p>}
          {activeTab === 'profile' && <p>Profile & Verification content here</p>}
          {activeTab === 'job_history' && <p>Job History content here</p>}

          <Modal isOpen={isBidModalOpen} onClose={closeBidModal} title="Place Your Bid">
            <div className="p-4 space-y-4">
              <label className="block text-sm font-medium">Bid Amount (₹)</label>
              <input
                type="number"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your bid"
              />
              <button
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                onClick={closeBidModal}
              >
                Submit Bid
              </button>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default FreelancerDashboard;