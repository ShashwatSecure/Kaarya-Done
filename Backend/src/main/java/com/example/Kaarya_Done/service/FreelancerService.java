package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.dto.SignupDtoFreelancer;
import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.entity.ProvidedService;
import com.example.Kaarya_Done.repository.FreelancerRepository;
import com.example.Kaarya_Done.repository.ProvidedServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FreelancerService {

    @Autowired
    private FreelancerRepository freelancerRepository;

    @Autowired
    private ProvidedServiceRepository providedServiceRepository;

    @Transactional
    public Freelancer createFreelancer(SignupDtoFreelancer dto) {
        // Convert Set<Long> to List<Long>
        List<Long> serviceIds = dto.getServiceIds().stream().collect(Collectors.toList());

        // Fetch services from the database using the provided service IDs
        List<ProvidedService> services = providedServiceRepository.findAllByIdIn(serviceIds);

        // Check if any provided services are missing
        if (services.size() != serviceIds.size()) {
            throw new IllegalArgumentException("Some provided services are not found");
        }

        // Create the Freelancer entity
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
                .servicesOffered(new HashSet<>(services))  // Add the fetched services to freelancer
                .experience(dto.getExperience())
                .isVerified(false)
                .isAvailable(true)
                .build();

        // Save the freelancer to the database
        return freelancerRepository.save(freelancer);
    }

    public boolean mobileExists(String mobile) {
        return freelancerRepository.existsByMobile(mobile);
    }
}
