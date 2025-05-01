package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.dto.SignupDtoFreelancer;
import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.repository.FreelancerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FreelancerService {

    @Autowired
    private FreelancerRepository freelancerRepository;

    public Freelancer createFreelancer(SignupDtoFreelancer dto) {
        // You can add additional validation, duplication checks, etc. here

        // Map DTO fields to the Freelancer entity
        Freelancer freelancer = Freelancer.builder()
                .fullName(dto.getFullName())
                .mobile(dto.getMobile())
                .city(dto.getCity())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .aadhaarNumber(dto.getAadhaarNumber())
                .panNumber(dto.getPanNumber())
                .profileImageUrl(dto.getProfileImageUrl())
                .services(dto.getServices())  // Map services list
                .serviceDesc(dto.getServiceDesc()) // Map service description
                .experience(dto.getExperience())  // Map years of experience
                .hourlyRate(dto.getHourlyRate())  // Map hourly rate
                .willingnessToTravel(dto.getWillingnessToTravel()) // Map willingness to travel
                .isVerified(false)  // Set default verified status
                .isActive(true)  // Set default active status
                .build();

        return freelancerRepository.save(freelancer);
    }
}
