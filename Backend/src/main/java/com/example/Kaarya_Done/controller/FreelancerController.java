package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.dto.SignupDtoFreelancer;
import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.service.FreelancerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class FreelancerController {

    @Autowired
    private FreelancerService freelancerService;

    @PostMapping("/signup/freelancer")
    public ResponseEntity<?> signupFreelancer(@RequestBody SignupDtoFreelancer signupDto) {
        // Convert services (JSON string to Set)
        System.out.println(signupDto.getServices());
        Set<String> services = new HashSet<>(signupDto.getServices());
        System.out.println(services);

        // Convert 'willingnessToTravel' string to Boolean (Handle "yes"/"no" values)
        Boolean willingnessToTravel = "yes".equalsIgnoreCase(String.valueOf(signupDto.getWillingnessToTravel()));

        // Convert experience string to Integer
        Integer experience = Integer.parseInt(signupDto.getExperience().toString());

        // Convert hourly rate string to BigDecimal
        BigDecimal hourlyRate = new BigDecimal(signupDto.getHourlyRate().toString());

        // Create the Freelancer entity
        Freelancer freelancer = new Freelancer();
        freelancer.setFullName(signupDto.getFullName());
        freelancer.setMobile(signupDto.getMobile());
        freelancer.setBio(signupDto.getBio());
        freelancer.setState(signupDto.getState());
        freelancer.setCity(signupDto.getCity());
        freelancer.setPincode(signupDto.getPincode());
        freelancer.setAadhaarNumber(signupDto.getAadhaarNumber());
        freelancer.setPanNumber(signupDto.getPanNumber());
        freelancer.setProfileImageUrl(signupDto.getProfileImageUrl());
        freelancer.setServices(services);
        freelancer.setServiceDesc(signupDto.getServiceDesc());
        freelancer.setExperience(experience);
        freelancer.setHourlyRate(hourlyRate);
        freelancer.setWillingnessToTravel(willingnessToTravel);

        // Call service layer to save the freelancer
        Freelancer savedFreelancer = freelancerService.createFreelancer(signupDto);

        // Return successful response with the saved freelancer
        return ResponseEntity.ok(savedFreelancer);
    }

    @GetMapping("/check-mobile/freelancer")
    public ResponseEntity<?> checkMobileExists(@RequestParam String mobile) {
        boolean exists = freelancerService.mobileExists(mobile);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
}
