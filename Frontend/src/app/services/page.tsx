"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTint, faWrench, faFilter, faToilet, faTv, faSoap, faSnowflake, faFan, faBolt,
  faDoorOpen, faChair, faCouch, faBroom, faLaptop, faWifi, faVideo, faPaintRoller,
  faBorderStyle, faHouseChimney, faCar, faCarSide, faMotorcycle, faFire, faWind,
  faLock, faBug, faKey, faSun, faBlender, faSearch, faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define the service type
type Service = {
  id: number;
  title: string;
  description: string;
  icon: any;
};

const filterCategories = [
  'All Services', 'Home Services', 'Appliance Repair', 'Cleaning', 'Automotive', 'Tech Services', 'Personal Help'
];

const services: Service[] = [
  // Plumbing Services
  { id: 1, title: "Wash Basin Repair", description: "Fix leaks, cracks, or installation", icon: faTint },
  { id: 2, title: "Tap/Faucet Repair", description: "Dripping tap replacement or repair", icon: faWrench },
  { id: 3, title: "Pipe Unclogging", description: "Blocked kitchen/bathroom pipes", icon: faFilter },
  { id: 4, title: "Toilet Flush Repair", description: "Fix running or broken flush systems", icon: faToilet },
  { id: 5, title: "Water Tank Cleaning", description: "Overhead tank sanitization", icon: faTint },

  // Electrical & Appliances
  { id: 6, title: "TV Repair", description: "LED/LCD screen or power issues", icon: faTv },
  { id: 7, title: "Washing Machine Repair", description: "Motor, drum, or drainage fixes", icon: faSoap },
  { id: 8, title: "Refrigerator Repair", description: "Cooling gas refill or compressor", icon: faSnowflake },
  { id: 9, title: "AC Servicing", description: "Gas refill, cleaning, PCB repair", icon: faFan },
  { id: 10, title: "Inverter/UPS Repair", description: "Battery or circuit issues", icon: faBolt },

  // Carpentry
  { id: 11, title: "Door/Window Repair", description: "Hinge alignment or replacement", icon: faDoorOpen },
  { id: 12, title: "Furniture Repair", description: "Chair, table, or cupboard fixes", icon: faChair },
  { id: 13, title: "Sofa Polish/Repair", description: "Reupholstering or leg repair", icon: faCouch },

  // Cleaning
  { id: 14, title: "Deep Cleaning", description: "Post-renovation or pest control", icon: faBroom },
  { id: 15, title: "Sofa/Carpet Cleaning", description: "Stain removal or shampooing", icon: faSoap },
  { id: 16, title: "Septic Tank Cleaning", description: "Emptying and maintenance", icon: faToilet },

  // Electronics & IT
  { id: 17, title: "Laptop Repair", description: "Hardware or software issues", icon: faLaptop },
  { id: 18, title: "Wi-Fi Setup", description: "Router installation/troubleshooting", icon: faWifi },
  { id: 19, title: "CCTV Installation", description: "Camera setup and configuration", icon: faVideo },

  // Masonry
  { id: 20, title: "Wall Painting", description: "Interior/exterior paint jobs", icon: faPaintRoller },
  { id: 21, title: "Tile Fixing", description: "Floor/wall tile replacement", icon: faBorderStyle },
  { id: 22, title: "Waterproofing", description: "Terrace or balcony sealing", icon: faHouseChimney },

  // Automotive
  { id: 23, title: "Car Wash", description: "At-home detailing service", icon: faCar },
  { id: 24, title: "Car AC Repair", description: "Cooling system servicing", icon: faCarSide },
  { id: 25, title: "Bike Servicing", description: "Oil change or brake check", icon: faMotorcycle },

  // Appliance Installations
  { id: 26, title: "Geyser Installation", description: "Electric or gas geyser setup", icon: faFire },
  { id: 27, title: "Chimney Install", description: "Kitchen chimney fitting", icon: faWind },
  { id: 28, title: "Smart Lock Setup", description: "Digital lock installation", icon: faLock },

  // Miscellaneous
  { id: 29, title: "Pest Control", description: "Cockroach/termite treatment", icon: faBug },
  { id: 30, title: "Key Cutting", description: "Duplicate keys made", icon: faKey },
  { id: 31, title: "Solar Panel Cleaning", description: "Dust removal for efficiency", icon: faSun },
  { id: 32, title: "Grinder Repair", description: "Mixer/juicer servicing", icon: faBlender },
];

const FilterButton = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 text-sm rounded-full border border-[#ff9900] transition font-medium ${
      active ? 'bg-[#ff9900] text-white' : 'text-[#231F41] hover:bg-[#ff9900] hover:text-white'
    }`}
  >
    {label}
  </button>
);

const ServiceCard = ({ id, title, description, icon }: Service) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300">
    <div className="w-12 h-12 bg-[#ff9900]/20 rounded-lg flex items-center justify-center mb-4">
      <FontAwesomeIcon icon={icon} className="text-[#231F41] text-xl" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <button className="text-[#ff9900] font-medium hover:underline hover:text-orange-500 mt-2">
      View Freelancers →
    </button>
  </div>
);

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleLocationToggle = () => {
    setUseCurrentLocation(!useCurrentLocation);
  };

  // Filter services based on the search query
  const filteredServices = services.filter(service => {
    return service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           service.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-white min-h-screen text-[#231F41]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Fixify Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Skilled Help for Every Need. Find the perfect professional for your home or business requirements.
          </p>
        </section>

        {/* Search & Filter */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search services"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
              />
            </div>
            <button
              onClick={handleLocationToggle}
              className="bg-[#ff9900] hover:bg-orange-500 text-white text-sm py-2 px-4 rounded-md flex items-center"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-xs" />
              <span>{useCurrentLocation ? "Using Current Location" : "Use Current Location"}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {filterCategories.map((label, idx) => (
              <FilterButton
                key={idx}
                label={label}
                active={selectedCategory === label}
                onClick={() => handleCategoryChange(label)}
              />
            ))}
          </div>
        </section>

        {/* Service Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
