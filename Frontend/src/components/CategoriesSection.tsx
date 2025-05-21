import { FC } from 'react';
import { FaFaucet, FaBolt, FaPaintRoller, FaSnowflake, FaTools } from 'react-icons/fa';

const CategorySection: FC = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-black">Popular Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Category Card 1 */}
          <div className="category-card bg-gray-100 rounded-lg p-6 text-center transition duration-300 cursor-pointer hover:shadow-lg">
            <div className="orange-bg text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#ff9900]">
              <FaFaucet className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Plumber</h3>
            <p className="text-gray-600">Leak repairs, installations</p>
          </div>

          {/* Category Card 2 */}
          <div className="category-card bg-gray-100 rounded-lg p-6 text-center transition duration-300 cursor-pointer hover:shadow-lg">
            <div className="orange-bg text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#ff9900]">
              <FaBolt className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Electrician</h3>
            <p className="text-gray-600">Wiring, repairs, installations</p>
          </div> 

          {/* Category Card 3 */}
          <div className="category-card bg-gray-100 rounded-lg p-6 text-center transition duration-300 cursor-pointer hover:shadow-lg">
            <div className="orange-bg text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#ff9900]">
              <FaPaintRoller className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Painter</h3>
            <p className="text-gray-600">Interior, exterior painting</p>
          </div>

          {/* Category Card 4 */}
          <div className="category-card bg-gray-100 rounded-lg p-6 text-center transition duration-300 cursor-pointer hover:shadow-lg">
            <div className="orange-bg text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#ff9900]">
              <FaSnowflake className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">AC Repair</h3>
            <p className="text-gray-600">Servicing, gas refill</p>
          </div>

          {/* Category Card 5 */}
          <div className="category-card bg-gray-100 rounded-lg p-6 text-center transition duration-300 cursor-pointer hover:shadow-lg">
            <div className="orange-bg text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#ff9900]">
              <FaTools className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Handyman</h3>
            <p className="text-gray-600">Multi-purpose repairs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
