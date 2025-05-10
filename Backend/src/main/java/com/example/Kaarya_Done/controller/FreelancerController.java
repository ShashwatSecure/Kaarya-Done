package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.dto.SignupDtoFreelancer;
import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.service.FreelancerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class FreelancerController {

    @Autowired
    private FreelancerService freelancerService;

    @PostMapping("/signup/freelancer")
    public ResponseEntity<?> signupFreelancer(@RequestBody SignupDtoFreelancer signupDto) {
        // Check for existing mobile number
        if (freelancerService.mobileExists(signupDto.getMobile())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Mobile number already registered");
            return ResponseEntity.badRequest().body(error);
        }

        // Create and save the freelancer
        Freelancer savedFreelancer = freelancerService.createFreelancer(signupDto);
        return ResponseEntity.ok(savedFreelancer);
    }

    @GetMapping("/check-mobile/freelancer")
    public ResponseEntity<Map<String, Boolean>> checkMobileExists(@RequestParam String mobile) {
        boolean exists = freelancerService.mobileExists(mobile);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
}
