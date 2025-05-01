import { FC } from 'react';

interface Testimonial {
  rating: number;
  date: string;
  text: string;
  name: string;
  location: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    rating: 5,
    date: '2 days ago',
    text: "The plumber arrived right on time and fixed my leaking pipe in under an hour. Very professional and reasonably priced. Will definitely use Fixify again!",
    name: 'Neha Gupta',
    location: 'Mumbai',
    imageUrl: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
  {
    rating: 5,
    date: '1 week ago',
    text: "As a property manager, I regularly need multiple service providers. Fixify's bulk hiring feature has saved me so much time and effort. Highly recommended!",
    name: 'Rahul Mehta',
    location: 'Property Manager, Delhi',
    imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
];

const TestimonialsSection: FC = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-black">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-100 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
                <span className="text-gray-500 ml-2">{testimonial.date}</span>
              </div>
              <p className="text-gray-700 mb-6">{testimonial.text}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.imageUrl}
                  alt="Customer"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-black">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
