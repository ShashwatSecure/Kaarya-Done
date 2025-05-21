'use client';

import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import SidebarContent from '@/components/FreelancerDashboard/SidebarContent';

type TabType = 'dashboard' | 'bookings' | 'services' | 'profile' | 'new_jobs' | 'job_history';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  freelancer: any; // match your FreelancerData type
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  freelancer,
  activeTab,
  onTabChange,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        <SidebarContent
          freelancer={freelancer}
          activeTab={activeTab}
          onTabChange={(tab) => {
            onTabChange(tab);
            onClose(); // Close sidebar after tab change
          }}
          onClose={onClose}
        />
      </aside>
    </>
  );
};

export default MobileSidebar;
