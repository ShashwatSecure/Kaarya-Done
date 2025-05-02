"use client";
import React, { useState } from 'react';
import { FaTools, FaHome, FaBuilding, FaUserPlus, FaCheckCircle, FaSearchDollar, FaHandHoldingUsd, FaClipboardList, FaStar, FaCalendarCheck, FaTasks, FaBullhorn, FaListOl, FaPaperPlane, FaUsersCog, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const tabs = [
    { id: 'freelancers', label: 'For Freelancers', icon: <FaTools /> },
    { id: 'customers', label: 'For Customers', icon: <FaHome /> },
];

const contentMap: Record<string, { icon: JSX.Element; title: string; description: string }[]> = {
    freelancers: [
        {
            icon: <FaUserPlus className="text-2xl" />,
            title: '1. Sign Up & Complete Profile',
            description: 'Create your account and showcase your skills, experience, and portfolio to attract clients.',
        },
        {
            icon: <FaCheckCircle className="text-2xl" />,
            title: '2. Get Verified',
            description: 'Our team verifies your credentials to build trust with potential clients.',
        },
        {
            icon: <FaSearchDollar className="text-2xl" />,
            title: '3. Browse & Apply',
            description: 'Find jobs that match your skills and submit competitive proposals.',
        },
        {
            icon: <FaHandHoldingUsd className="text-2xl" />,
            title: '4. Get Hired & Earn',
            description: 'Complete jobs, get paid securely, and build your reputation through reviews.',
        },
    ],
    customers: [
        {
            icon: <FaClipboardList className=" text-2xl" />,
            title: '1. Register & Choose Service',
            description: 'Sign up and browse our wide range of home services from plumbing to electrical work.',
        },
        {
            icon: <FaStar className=" text-2xl" />,
            title: '2. Select Your Pro',
            description: 'Compare profiles, ratings, and reviews to choose the perfect professional.',
        },
        {
            icon: <FaCalendarCheck className=" text-2xl" />,
            title: '3. Book & Pay Securely',
            description: 'Schedule at your convenience and pay through our protected payment system.',
        },
        {
            icon: <FaTasks className=" text-2xl" />,
            title: '4. Track & Rate',
            description: 'Monitor progress in real-time and leave feedback to help others.',
        },
    ],
    companies: [
        {
            icon: <FaBullhorn className=" text-2xl" />,
            title: '1. Create Bulk Post',
            description: 'Post multiple job openings at once with your specific requirements.',
        },
        {
            icon: <FaListOl className=" text-2xl" />,
            title: '2. Shortlist Professionals',
            description: 'Review applications and shortlist the best candidates for your needs.',
        },
        {
            icon: <FaPaperPlane className=" text-2xl" />,
            title: '3. Send Bulk Offers',
            description: 'Efficiently send offers to multiple professionals simultaneously.',
        },
        {
            icon: <FaUsersCog className=" text-2xl" />,
            title: '4. Manage Your Team',
            description: 'Track all your hired professionals from a centralized dashboard.',
        },
    ],
};

const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState('freelancers');
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    return (
        <div className='bg-white'>
            <Navbar />
            <div className="bg-white text-gray-800 min-h-screen px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">How Fixify Works</h1>
                    <p className="text-lg">Hiring help has never been this easy</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-8 border-b border-gray-700">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 font-medium transition border-b-2 ${activeTab === tab.id
                                    ? 'text-[#ff9900] border-[#ff9900]'
                                    : 'hover:text-[#ff9900] border-transparent'
                                }`}
                        >
                            <span className="inline-flex items-center gap-2">{tab.icon} {tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {contentMap[activeTab].map((step, i) => (
                        <div key={i} className="bg-fixify-darker p-6 rounded-lg shadow-lg step-card transition duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#ff9900] bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-800">{step.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="max-w-4xl mx-auto mt-16 text-center bg-fixify-darker p-8 rounded-xl">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-xl mb-6">Join thousands of professionals and clients finding perfect matches on Fixify</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/signup/freelancer" className="px-8 py-3 bg-[#ff9900] text-white rounded-lg font-bold hover:bg-orange-500 hover:bg-opacity-90 transition">Join as Freelancer</Link>
                        <Link href="/signup/customer" className="px-8 py-3 border border-[#ff9900] text-[#ff9900] rounded-lg font-bold hover:bg-orange-500 hover:bg-opacity-10 hover:text-white transition">Hire Professionals</Link>
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Is it free to join Fixify?',
                                a: 'Yes! Creating an account on Fixify is completely free for both professionals and clients. We only charge a small service fee when jobs are successfully completed through our platform.',
                            },
                            {
                                q: 'How do payments work?',
                                a: 'Fixify uses a secure escrow payment system. Clients pay upfront when hiring, and funds are released to the professional after job completion and client approval.',
                            },
                            {
                                q: 'What if I\'m not satisfied with the service?',
                                a: 'We have a satisfaction guarantee policy. If you\'re not happy with the work, you can request revisions through our resolution center.',
                            },
                            {
                                q: 'How long does verification take?',
                                a: 'For most professionals, the verification process is completed within 24-48 hours.',
                            },
                        ].map((faq, index) => (
                            <div key={index} className=" rounded-lg overflow-hidden">
                                <button
                                    className="w-full text-left p-4 font-medium flex justify-between items-center transition"
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                >
                                    <span>{faq.q}</span>
                                    <FaChevronDown className={`transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFAQ === index && (
                                    <div className="p-4 border-t border-gray-700">
                                        <p className="text-gray-800">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HowItWorks;
