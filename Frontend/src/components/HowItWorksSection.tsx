import { FC } from 'react';

const steps = [
  {
    number: 1,
    title: 'Find a Professional',
    description: 'Search for skilled freelancers in your area or post a job request.',
  },
  {
    number: 2,
    title: 'Book & Schedule',
    description: 'Choose your preferred time slot and confirm the booking.',
  },
  {
    number: 3,
    title: 'Get the Job Done',
    description: 'The professional arrives and completes the job to your satisfaction.',
  },
];

const HowItWorksSection: FC = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-black">How Fixify Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-[#ff9900] text-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
