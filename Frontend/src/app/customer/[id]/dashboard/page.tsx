'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  FaCalendarAlt, FaHistory, FaLock, FaStar,
  FaHeart, FaHeadset, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import { useParams, useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

type TabType = 'bookings' | 'history' | 'saved' | 'ratings' | 'support' | 'settings';

interface CustomerData {
  name: string;
  photoUrl?: string;
}

interface JWTData {
  sub: string;
  exp: number;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  tab: TabType;
  activeTab: TabType;
  onClick: (tab: TabType) => void;
}> = ({ icon, label, tab, activeTab, onClick }) => (
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

const SidebarContent: React.FC<{
  customer: CustomerData | null;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}> = ({ customer, activeTab, onTabChange }) => (
  <>
    <div className="p-4">
      <div className="flex items-center">
        <img
          src={customer?.photoUrl || '/default-avatar.webp'}
          alt="Profile"
          className="w-10 h-8 rounded-full mr-3 object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-avatar.webp';
          }}
        />
        <div>
          <p className="font-medium">{customer?.name || 'Loading...'}</p>
          <p className="text-xs text-gray-500">Customer</p>
        </div>
      </div>
    </div>
    <nav className="p-4 space-y-1">
      <NavItem icon={<FaCalendarAlt />} label="Bookings" tab="bookings" activeTab={activeTab} onClick={onTabChange} />
      <NavItem icon={<FaHistory />} label="Booking History" tab="history" activeTab={activeTab} onClick={onTabChange} />
      <NavItem icon={<FaHeart />} label="Saved Freelancers" tab="saved" activeTab={activeTab} onClick={onTabChange} />
      <NavItem icon={<FaStar />} label="Ratings & Reviews" tab="ratings" activeTab={activeTab} onClick={onTabChange} />
      <NavItem icon={<FaHeadset />} label="Support / Help" tab="support" activeTab={activeTab} onClick={onTabChange} />
      <NavItem icon={<FaLock />} label="Security & Settings" tab="settings" activeTab={activeTab} onClick={onTabChange} />
    </nav>
  </>
);

const CustomerDashboard = () => {
  const router = useRouter();
  const params = useParams();
  const customerIdFromUrl = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('bookings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      try {
        const decoded: JWTData = jwtDecode(token);
        if (decoded.sub !== customerIdFromUrl) {
          setAccessDenied(true);
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8080/api/customer/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setCustomer(data);
        } else {
          setAccessDenied(true);
        }
      } catch (error) {
        console.error('Access check failed:', error);
        setAccessDenied(true);
      } finally {
        setLoading(false);
      }
    };

    if (customerIdFromUrl) {
      fetchCustomerProfile();
    } else {
      setAccessDenied(true);
      setLoading(false);
    }
  }, [customerIdFromUrl]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center mt-20">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600 mt-2">You are not authorized to view this dashboard.</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <button
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        onClick={toggleSidebar}
        className={`fixed z-60 top-1/2 transform -translate-y-1/2 md:hidden p-2 bg-white rounded-full shadow-lg text-gray-700 transition-all duration-300 ${
          isSidebarOpen ? 'left-64 ml-2' : 'left-2'
        }`}
      >
        {isSidebarOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
      </button>

      <div className="flex flex-1 bg-gray-100 text-gray-800">
        <aside className="hidden md:flex flex-col w-64 bg-white h-full shadow-lg fixed left-0 top-0 pt-16 z-30 mt-4">
          <SidebarContent customer={customer} activeTab={activeTab} onTabChange={handleTabChange} />
        </aside>

        <>
          <div
            className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleSidebar}
          />
          <aside
            className={`fixed top-0 left-0 h-full w-64 mt-20 bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <SidebarContent customer={customer} activeTab={activeTab} onTabChange={handleTabChange} />
          </aside>
        </>

        <main className="flex-1 md:ml-64 p-4 ">
          <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-600">
              Currently viewing: <strong>{activeTab}</strong>
            </p>
            {/* Dynamic tab content goes here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
