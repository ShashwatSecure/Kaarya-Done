'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import Fuse from 'fuse.js';
import JobRequestModal from '@/components/JobRequestModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  categoryId: number;
};

type Category = {
  id: number;
  title: string;
};

const getCustomerIdFromToken = (): number | null => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  try {
    const payload = jwtDecode<any>(token);
    return payload?.customerId || null;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

const FilterButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 text-sm rounded-full border border-[#ff9900] transition font-medium ${
      active
        ? 'bg-[#ff9900] text-white'
        : 'text-[#231F41] hover:bg-[#ff9900] hover:text-white'
    }`}
  >
    {label}
  </button>
);

const ServiceCard = ({
  id,
  title,
  description,
  icon,
  categoryId,
  onDescribeClick,
}: Service & { onDescribeClick: (service: Service) => void }) => {
  const faIcon = (icons as any)[icon] || icons.faWrench;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300">
      <div className="w-12 h-12 bg-[#ff9900]/20 rounded-lg flex items-center justify-center mb-4">
        <FontAwesomeIcon icon={faIcon} className="text-[#231F41] text-xl" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <button
        onClick={() =>
          onDescribeClick({ id, title, description, icon, categoryId })
        }
        className="text-[#ff9900] font-medium hover:underline hover:text-orange-500 mt-2"
      >
        Describe your issue →
      </button>
    </div>
  );
};

const Services = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);

  useEffect(() => {
    const id = getCustomerIdFromToken();
    setCustomerId(id);
  }, []);

  useEffect(() => {
    const query = searchParams.get('search') || '';
    const categoryIdStr = searchParams.get('categoryId');
    const serviceIdStr = searchParams.get('serviceId');

    setSearchQuery(query);

    if (categoryIdStr) {
      setSelectedCategoryId(Number(categoryIdStr));
    }

    if (serviceIdStr) {
      setSelectedService({
        id: Number(serviceIdStr),
        title: '',
        description: '',
        icon: '',
        categoryId: -1,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, categoriesRes] = await Promise.all([
          axios.get<Service[]>('http://localhost:8080/api/services'),
          axios.get<Category[]>('http://localhost:8080/api/services/service-categories'),
        ]);
        setServices(servicesRes.data);
        setCategories([{ id: -1, title: 'All Services' }, ...categoriesRes.data]);
      } catch (err) {
        console.error('Failed to fetch services or categories:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      selectedService &&
      selectedService.id &&
      services.length > 0 &&
      (selectedService.title === '' || selectedService.description === '')
    ) {
      const fullService = services.find((s) => s.id === selectedService.id);
      if (fullService) {
        setSelectedService(fullService);
      } else {
        setSelectedService(null);
      }
    }
  }, [services, selectedService]);

  const fuse = new Fuse(services, {
    keys: ['title', 'description'],
    threshold: 0.4,
    distance: 100,
    minMatchCharLength: 2,
  });

  const filtered = searchQuery.trim()
    ? fuse.search(searchQuery).map((result) => result.item)
    : services;

  const filteredServices = filtered.filter(
    (service) => selectedCategoryId === -1 || service.categoryId === selectedCategoryId
  );

  const isCustomerLoggedIn = () => {
    return !!localStorage.getItem('authToken');
  };

  const handleDescribeClick = (service: Service) => {
    if (!isCustomerLoggedIn()) {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedCategoryId !== -1)
        params.set('categoryId', selectedCategoryId.toString());
      params.set('serviceId', service.id.toString());

      const redirectUrl = `/services?${params.toString()}`;
      const encodedRedirect = encodeURIComponent(redirectUrl);

      router.push(`/login/customer?redirect=${encodedRedirect}`);
      return;
    }

    setSelectedService(service);
  };

  const handleJobRequestSubmit = (data: {
    jobTitle: string;
    description: string;
    mediaFiles: File[];
    address: {
      state?: string;
      city?: string;
      pincode?: string;
      locality?: string;
      landmark?: string;
    };
  }) => {
    console.log('Job Request Data:', {
      ...data,
      serviceId: selectedService?.id,
    });
    alert('Job request submitted!');
    setSelectedService(null);
  };

  return (
    <div className="bg-white min-h-screen text-[#231F41] relative">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Fixify Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Skilled Help for Every Need. Find the perfect professional for your home or business requirements.
          </p>
        </section>

        <section className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <FilterButton
                key={category.id}
                label={category.title}
                active={selectedCategoryId === category.id}
                onClick={() => setSelectedCategoryId(category.id)}
              />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              onDescribeClick={handleDescribeClick}
            />
          ))}
        </section>
      </main>
      <Footer />

      <JobRequestModal
        open={!!selectedService}
        serviceId={selectedService?.id ?? null}
        serviceTitle={selectedService?.title ?? ''}
        category={
          selectedService
            ? categories.find(cat => cat.id === selectedService.categoryId)?.title ?? ''
            : ''
        }
        customerId={customerId}
        onClose={() => setSelectedService(null)}
        onSubmit={handleJobRequestSubmit}
      />
    </div>
  );
};

export default Services;
