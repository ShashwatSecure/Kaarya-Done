package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.entity.ServiceItem;
import com.example.Kaarya_Done.repository.ServiceItemRepository;
import com.example.Kaarya_Done.util.KeywordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceItemService {

    @Autowired
    private ServiceItemRepository serviceItemRepository;

    public ServiceItem saveServiceItem(ServiceItem item) {
        return serviceItemRepository.save(item);
    }
}

