package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.entity.ServiceCategory;
import com.example.Kaarya_Done.entity.ServiceItem;
import com.example.Kaarya_Done.repository.ServiceCategoryRepository;
import com.example.Kaarya_Done.repository.ServiceItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceService {

    @Autowired
    private ServiceItemRepository serviceItemRepository;

    @Autowired
    private ServiceCategoryRepository serviceCategoryRepository;

    public ServiceItem saveServiceItem(ServiceItem item) {
        return serviceItemRepository.save(item);
    }

    public List<ServiceItem> getAllServices(){
        return serviceItemRepository.findAll();
    }

    public List<ServiceCategory> getServiceCategories()
    {
        return serviceCategoryRepository.findAll();
    }

    public Optional<ServiceItem> findById(Long serviceItemId) {
        return serviceItemRepository.findById(serviceItemId);
    }
}

