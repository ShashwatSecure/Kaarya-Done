package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.dto.SignupDtoFreelancer;
import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.entity.Location;
import com.example.Kaarya_Done.entity.ServiceCategory;
import com.example.Kaarya_Done.repository.FreelancerRepository;
import com.example.Kaarya_Done.repository.LocationRepository;
import com.example.Kaarya_Done.repository.ServiceCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class FreelancerService {

    private final FreelancerRepository freelancerRepository;
    private final ServiceCategoryRepository serviceCategoryRepository;
    private final LocationRepository locationRepository;

    public FreelancerService(FreelancerRepository freelancerRepository,
                             ServiceCategoryRepository serviceCategoryRepository,
                             LocationRepository locationRepository) {
        this.freelancerRepository = freelancerRepository;
        this.serviceCategoryRepository = serviceCategoryRepository;
        this.locationRepository = locationRepository;
    }

    @Transactional
    public Freelancer createFreelancer(SignupDtoFreelancer dto) {
        // Validate & fetch services
        Set<Integer> serviceCategoryIds = dto.getServiceCategoryIds();
        List<ServiceCategory> services = serviceCategoryRepository.findAllById(serviceCategoryIds);
        if (services.size() != serviceCategoryIds.size()) {
            throw new IllegalArgumentException("Some provided service categories not found");
        }

        // Find or create Location based on state, city, pincode
        Optional<Location> existingLocation = locationRepository
                .findByStateAndCityAndPincode(dto.getState(), dto.getCity(), dto.getPincode());

        Location location = existingLocation.orElseGet(() -> {
            Location newLocation = new Location();
            newLocation.setState(dto.getState());
            newLocation.setCity(dto.getCity());
            newLocation.setPincode(dto.getPincode());
            return locationRepository.save(newLocation);
        });

        // Build freelancer entity
        Freelancer freelancer = Freelancer.builder()
                .fullName(dto.getFullName())
                .mobile(dto.getMobile())
                .bio(dto.getBio())
                .location(location)
                .aadhaarNumber(dto.getAadhaarNumber())
                .panNumber(dto.getPanNumber())
                .profileImageUrl(dto.getProfileImageUrl())
                .experience(dto.getExperience())
                .isVerified(false)
                .isAvailable(true)
                .build();

        // Sync both sides of many-to-many
        services.forEach(service -> service.getFreelancers().add(freelancer));
        freelancer.setServiceCategories(new HashSet<>(services));

        return freelancerRepository.save(freelancer);
    }

    public boolean mobileExists(String mobile) {
        return freelancerRepository.existsByMobile(mobile);
    }

    public Freelancer findByMobile(String mobile) {
        return freelancerRepository.findByMobile(mobile).orElse(null);
    }

    public Freelancer findById(String id) {
        return freelancerRepository.findById(Long.parseLong(id)).orElse(null);
    }
}
