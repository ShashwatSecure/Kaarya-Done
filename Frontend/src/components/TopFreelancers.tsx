import { FC } from 'react';
import { FaStar } from 'react-icons/fa';

const freelancers = [
  {
    name: 'Rajesh Kumar',
    role: 'Plumber',
    rating: 4.9,
    reviews: 128,
    experience: '8 years',
    rate: '₹350/hr',
    jobs: '420+',
    description: 'Specialized in pipe fitting, leak detection and bathroom installations.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Amit Sharma',
    role: 'Electrician',
    rating: 4.8,
    reviews: 97,
    experience: '6 years',
    rate: '₹400/hr',
    jobs: '380+',
    description: 'Expert in wiring, switchboard installations and electrical troubleshooting.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Priya Patel',
    role: 'Painter',
    rating: 4.7,
    reviews: 86,
    experience: '5 years',
    rate: '₹300/hr',
    jobs: '350+',
    description: 'Specializes in interior wall painting, texture finishes and waterproofing.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const FreelancerSection: FC = () => {
  return (
    <section className="py-16 px-6 bg-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Top Rated Freelancers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((freelancer, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden transition duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={freelancer.image}
                  alt="Freelancer"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{freelancer.name}</h3>
                  <p className="text-[#ff9900]">{freelancer.role}</p>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 px-2 py-1 rounded-full text-sm">
                  <FaStar className="text-yellow-400" /> {freelancer.rating} ({freelancer.reviews})
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-gray-400">Experience</p>
                    <p className="font-medium text-white">{freelancer.experience}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Rate</p>
                    <p className="font-medium text-white">{freelancer.rate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Jobs</p>
                    <p className="font-medium text-white">{freelancer.jobs}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{freelancer.description}</p>
                <div className="flex space-x-2">
                  <button className="bg-[#ff9900] text-black px-4 py-2 rounded font-medium flex-1 hover:bg-orange-600 transition duration-300">
                    Book Now
                  </button>
                  <a
                    href="freelancer-detailpage.html"
                    className="bg-transparent border border-[#ff9900] text-orange-500 px-4 py-2 rounded font-medium hover:bg-orange-500 hover:text-black transition duration-300"
                  >
                    Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="bg-transparent border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-orange-500 hover:text-black transition duration-300">
            View All Freelancers
          </button>
        </div>
      </div>
    </section>
  );
};

export default FreelancerSection;
