'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useRouter, useParams } from 'next/navigation';
import FreelancerNavbar from '@/components/FreelancerDashboard/FreelancerNavbar';
import SidebarContent from '@/components/FreelancerDashboard/SidebarContent';
import MobileSidebar from '@/components/FreelancerDashboard/MobileSidebar';
import Modal from '@/components/Modal';
import StatGrid from '@/components/FreelancerDashboard/StatGrid';
import TabContent from '@/components/FreelancerDashboard/TabContent';

import { FreelancerData, JobRequestDto, TabType } from '@/types/FreelancerDashboardTypes';

const FreelancerDashboard: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const routeId = params?.id?.toString();

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
      const res = await fetch('http://localhost:8080/api/freelancer/profile', {
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
      const res = await fetch('http://localhost:8080/api/freelancer/jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Server error response:', text);
        setJobs([]);
        return;
      }

      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setJobs([]);
    }
  }, [router]);

  useEffect(() => {
    if (activeTab === 'new_jobs') fetchJobs();
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

  // 🚫 Access Denied check
  if (freelancer && routeId && freelancer.id.toString() !== routeId) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700 mb-6">
            You are not authorized to view this dashboard. Please make sure you're signed in with the correct account.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-[#ff9900] hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <FreelancerNavbar />

      <button
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        onClick={toggleSidebar}
        className={`fixed z-50 top-1/2 transform -translate-y-1/2 md:hidden p-2 bg-white rounded-full shadow-lg text-gray-700 transition-all duration-300 ${
          isSidebarOpen ? 'left-64 ml-2' : 'left-2'
        }`}
      >
        {isSidebarOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
      </button>

      <div className="flex min-h-screen bg-gray-100 text-gray-800">
        <aside className="hidden md:flex flex-col w-64 bg-white h-screen shadow-lg fixed left-0 top-0 z-30">
          <SidebarContent
            freelancer={freelancer}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </aside>

        <MobileSidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          freelancer={freelancer}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'md:ml-64'}`}>
          {activeTab === 'dashboard' && freelancer && (
            <StatGrid freelancer={freelancer} />
          )}

          <TabContent
            activeTab={activeTab}
            jobs={jobs}
            onBidNow={openBidModal}
            onStartInspection={handleStartInspection}
          />

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
