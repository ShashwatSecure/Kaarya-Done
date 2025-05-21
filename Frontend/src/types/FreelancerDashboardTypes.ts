export interface JobRequestDto {
  id: number;
  customerName: string;
  customerPhone: string;
  address: string;
  serviceName: string;
  serviceDescription: string;
  urgencyLevel: 'Low' | 'Medium' | 'High';
  location: string;
  status: 'open' | 'booked' | 'inspection' | 'completed';
  createdAt: string;
  mediaUrls: string[];
}

export type TabType = 'dashboard' | 'bookings' | 'services' | 'profile' | 'new_jobs' | 'job_history';

export interface FreelancerData {
  id:string;
  name: string;
  profileImage: string;
  role: string;
  earnings: number;
  wallet: number;
  rating: number;
  reviews: number;
  completedJobs: number;
}