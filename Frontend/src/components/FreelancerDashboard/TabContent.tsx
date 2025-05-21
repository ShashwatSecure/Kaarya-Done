'use client';

import React from 'react';
import NewJobsTab from './NewJobsTab';
import Modal from '../Modal';
import StatGrid from './StatGrid';
import { FreelancerData, JobRequestDto, TabType } from '@/types/FreelancerDashboardTypes';

interface TabContentProps {
  activeTab: TabType;
  jobs: JobRequestDto[];
  freelancer?: FreelancerData;
  isBidModalOpen?: boolean;
  onCloseBidModal?: () => void;
  onOpenBidModal?: () => void;
  onBidNow?: () => void;
  onStartInspection?: () => void;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  isBidModalOpen,
  onCloseBidModal,
  onOpenBidModal,
  onStartInspection,
  jobs,
}) => {
  switch (activeTab) {
    case 'new_jobs':
      return (
        <>
          <NewJobsTab
  onBidNow={onOpenBidModal ?? (() => {})}
  onStartInspection={onStartInspection ?? (() => {})}
  jobs={jobs}
/>

          <Modal isOpen={isBidModalOpen ?? false} onClose={onCloseBidModal ?? (() => {})} title="Place Your Bid">
            <div className="p-4 space-y-4">
              <label className="block text-sm font-medium">Bid Amount (₹)</label>
              <input
                type="number"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your bid"
              />
              <button
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                onClick={onCloseBidModal}
              >
                Submit Bid
              </button>
            </div>
          </Modal>
        </>
      );

    case 'bookings':
      return <p>Bookings content here</p>;

    case 'services':
      return <p>Services content here</p>;

    case 'profile':
      return <p>Profile & Verification content here</p>;

    case 'job_history':
      return <p>Job History content here</p>;
  }
};

export default TabContent;
