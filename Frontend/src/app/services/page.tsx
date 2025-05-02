import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBorderStyle,
  faHardHat,
  faFire,
  faPalette,
  faHome,
  faNetworkWired,
  faPlug,
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  { id: 33, title: "Tile/Marble Work", description: "Installation and repair of tiles and marble", icon: faBorderStyle },
  { id: 34, title: "Civil Construction Helper", description: "Assistance with construction and renovation work", icon: faHardHat },
  { id: 35, title: "Welder/Fabricator", description: "Metal fabrication and welding services", icon: faFire },
  { id: 36, title: "Painter (Wall Art / Texture)", description: "Creative wall painting and texture work", icon: faPalette },
  { id: 37, title: "Home Automation Specialist", description: "Smart home setup and automation solutions", icon: faHome },
  { id: 38, title: "IT Networking Technician", description: "Network setup, cabling and troubleshooting", icon: faNetworkWired },
  { id: 39, title: "Appliance Installation", description: "Installation of microwaves, chimneys and other appliances", icon: faPlug },
];

const Services = () => {
  return (
    <div className="bg-white min-h-screen text-[#231F41]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Title Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Fixify Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Skilled Help for Every Need. Find the perfect professional for your home or business requirements.
          </p>
        </section>

        {/* Search and Filter */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search a service – e.g., Electrician in Delhi"
                className="w-full border border-gray-300 rounded-lg py-3 px-4 pl-12 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            </div>
            <button className="bg-[#ff9900] hover:bg-orange-500 text-white py-3 px-6 rounded-lg flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span>Filter by Location</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "All Services",
              "Home Services",
              "Appliance Repair",
              "Cleaning",
              "Automotive",
              "Tech Services",
              "Personal Help",
            ].map((label, idx) => (
              <button
                key={idx}
                className={`py-2 px-4 text-sm rounded-full border border-[#ff9900] hover:bg-[#ff9900] hover:text-white transition ${
                  idx === 0 ? 'bg-[#ff9900] text-white' : 'text-[#231F41]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Service Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#ff9900]/20 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={service.icon} className="text-[#231F41] text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <button className="text-[#ff9900] font-medium hover:underline hover:text-orange-500">
                View Freelancers →
              </button>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
