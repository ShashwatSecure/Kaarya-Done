import {
  FaTachometerAlt, FaCalendarAlt, FaTools, FaUserCheck,
  FaBell, FaHistory} from 'react-icons/fa';

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

interface SidebarContentProps {
  freelancer: FreelancerData | null;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onClose?: () => void;
}
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  tab: TabType;
  activeTab: TabType;
  onClick: (tab: TabType) => void;
}

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

export default SidebarContent;