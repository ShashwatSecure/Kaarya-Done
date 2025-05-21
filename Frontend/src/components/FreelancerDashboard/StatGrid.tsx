'use client';

import React from 'react';
import { FaRupeeSign, FaWallet, FaStar, FaCheckCircle } from 'react-icons/fa';
import { FreelancerData } from '@/types/FreelancerDashboardTypes';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bg, text }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${bg} ${text}`}>{icon}</div>
    </div>
  </div>
);

interface StatGridProps {
  freelancer: FreelancerData;
}

const StatGrid: React.FC<StatGridProps> = ({ freelancer }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard
      title="Monthly Earnings"
      value={`₹${freelancer.earnings ?? '0'}`}
      icon={<FaRupeeSign />}
      bg="bg-green-100"
      text="text-green-600"
    />
    <StatCard
      title="Wallet Balance"
      value={`₹${freelancer.wallet ?? '0'}`}
      icon={<FaWallet />}
      bg="bg-blue-100"
      text="text-blue-600"
    />
    <StatCard
      title="Current Ratings"
      value={freelancer.rating?.toString() || 'N/A'}
      icon={<FaStar />}
      bg="bg-yellow-100"
      text="text-yellow-600"
    />
    <StatCard
      title="Total Completed Jobs"
      value={freelancer.completedJobs?.toString() || '0'}
      icon={<FaCheckCircle />}
      bg="bg-purple-100"
      text="text-purple-600"
    />
  </div>
);

export default StatGrid;
