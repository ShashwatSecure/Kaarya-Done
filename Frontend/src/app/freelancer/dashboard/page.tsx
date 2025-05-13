'use client';

import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaTools,
  FaUserCheck,
  FaBell,
  FaWallet,
  FaHistory,
  FaHeadset,
  FaCog,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const FreelancerDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'services' | 'profile'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/freelancer/login');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100 text-gray-800">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white h-screen shadow-lg fixed left-0 top-18">
          <Profile />
          <NavLinks activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        {/* Mobile Sidebar */}
        <aside
          className={`md:hidden fixed left-0 top-18 h-screen bg-white shadow-lg transition-all duration-300 z-40 ${
            isSidebarOpen ? "w-1/2" : "w-0"
          }`}
        >
          {/* Arrow Toggle Button - Fixed on left */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white"
          >
            {isSidebarOpen ? (
              <FaChevronLeft size={18} />
            ) : (
              <FaChevronRight size={18} />
            )}
          </button>

          {/* Sidebar Content */}
          <div className={`overflow-y-auto h-full ${isSidebarOpen ? "block" : "hidden"}`}>
            <Profile />
            <NavLinks activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-6 ${isSidebarOpen ? "md:ml-64 ml-[50%]" : "md:ml-64 ml-12"}`}>
          {activeTab === 'dashboard' && <DashboardSection />}
          {activeTab === 'bookings' && <BookingsSection />}
          {activeTab === 'services' && <ServicesSection />}
          {activeTab === 'profile' && <ProfileSection />}
        </main>
      </div>
    </div>
  );
};

// Profile Component (unchanged from your Sidebar)
const Profile = () => (
  <div className="p-4 border-b md:border-none">
    <div className="flex items-center">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Profile"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <p className="font-medium">Rajesh Kumar</p>
        <p className="text-xs text-gray-500">Plumber</p>
      </div>
    </div>
  </div>
);

// NavLinks Component with active state
type NavLinksProps = {
  activeTab: string;
  setActiveTab: (tab: 'dashboard' | 'bookings' | 'services' | 'profile') => void;
};

const NavLinks: React.FC<NavLinksProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", tab: "dashboard" },
    { icon: <FaCalendarAlt />, label: "My Bookings", tab: "bookings" },
    { icon: <FaTools />, label: "Services", tab: "services" },
    { icon: <FaUserCheck />, label: "Profile & Verification", tab: "profile" },
    // Additional items from your Sidebar that you might want to map to tabs
    { icon: <FaBell />, label: "New Job Requests", tab: "bookings" },
    { icon: <FaWallet />, label: "Wallet & Payments", tab: null },
    { icon: <FaHistory />, label: "Job History", tab: null },
    { icon: <FaHeadset />, label: "Support", tab: null },
    { icon: <FaCog />, label: "Settings", tab: null },
  ];

  return (
    <nav className="p-4 space-y-1">
      {navItems.map(({ icon, label, tab }) => (
        <button
          key={label}
          onClick={() => tab && setActiveTab(tab as any)}
          className={`flex items-center w-full px-3 py-2 rounded hover:bg-orange-300 hover:text-black transition ${
            activeTab === tab ? 'bg-orange-500 text-white' : ''
          }`}
        >
          <span className={`mr-3 ${activeTab === tab ? 'text-white' : 'text-gray-600'}`}>
            {icon}
          </span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

// Rest of your components remain unchanged
const DashboardSection: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <DashboardCard title="New Service Requests" value="5" />
    <DashboardCard title="Upcoming Bookings" value="3" />
    <DashboardCard title="Earnings This Month" value="₹12,300" />
    <DashboardCard title="Completed Jobs" value="27" />
    <DashboardCard title="Customer Ratings" value="4.7 / 5" />
    <DashboardCard title="Profile Views" value="142" />
  </div>
);

type DashboardCardProps = {
  title: string;
  value: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => (
  <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition-all">
    <h2 className="text-sm text-gray-500 mb-2">{title}</h2>
    <p className="text-2xl font-bold text-[#231F41]">{value}</p>
  </div>
);

const BookingsSection: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
    <p className="text-gray-500">You have 3 bookings scheduled this week.</p>
  </div>
);

const ServicesSection: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Your Services</h2>
    <p className="text-gray-500">You currently offer: Electrician, AC Repair</p>
  </div>
);

const ProfileSection: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
    <p className="text-gray-500">Edit your contact, experience, and service areas.</p>
  </div>
);

export default FreelancerDashboard;