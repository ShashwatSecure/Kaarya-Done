package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.service.FreelancerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/freelancer")
public class FreelancerController {

    @Autowired
    private FreelancerService freelancerService;


    @GetMapping("/profile")
    @PreAuthorize("hasRole('freelancer')")
    public ResponseEntity<?> getFreelancerProfile(Authentication authentication) {
        String mobile = authentication.getName();
        Freelancer freelancer = freelancerService.findByMobile(mobile);

        if (freelancer == null) {
            return ResponseEntity.status(404).body(Map.of("error", "freelancer not found"));
        }

        return ResponseEntity.ok(Map.of(
                "name", freelancer.getFullName(),
                "photoUrl", freelancer.getProfileImageUrl()
        ));

    }
}
