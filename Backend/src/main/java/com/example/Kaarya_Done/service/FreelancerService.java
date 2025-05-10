package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.dto.SignupDtoFreelancer;
import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.entity.ServiceCategory;
import com.example.Kaarya_Done.repository.FreelancerRepository;
import com.example.Kaarya_Done.repository.ServiceCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FreelancerService {

    @Autowired
    private FreelancerRepository freelancerRepository;

    @Autowired
    private ServiceCategoryRepository serviceCategoryRepository;

    @Transactional
    public Freelancer createFreelancer(SignupDtoFreelancer dto) {
        List<Integer> serviceCategoryIds = new ArrayList<>(dto.getServiceCategoryIds());
        List<ServiceCategory> services = serviceCategoryRepository.findAllById(serviceCategoryIds);

        if (services.size() != serviceCategoryIds.size()) {
            throw new IllegalArgumentException("Some provided services are not found");
        }

        Freelancer freelancer = Freelancer.builder()
                .fullName(dto.getFullName())
                .mobile(dto.getMobile())
                .bio(dto.getBio())
                .city(dto.getCity())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .aadhaarNumber(dto.getAadhaarNumber())
                .panNumber(dto.getPanNumber())
                .profileImageUrl(dto.getProfileImageUrl())
                .experience(dto.getExperience())
                .isVerified(false)
                .isAvailable(true)
                .build();

        // Sync both sides of the relationship
        services.forEach(service -> service.getFreelancers().add(freelancer));
        freelancer.setServiceCategories(new HashSet<>(services));

        return freelancerRepository.save(freelancer);
    }


    public boolean mobileExists(String mobile) {
        return freelancerRepository.existsByMobile(mobile);
    }
}
