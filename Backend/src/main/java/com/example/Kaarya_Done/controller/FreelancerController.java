package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.dto.JobRequestDto;
import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.entity.JobRequest;
import com.example.Kaarya_Done.service.FreelancerService;
import com.example.Kaarya_Done.service.JobRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/freelancer")
@CrossOrigin(origins = "http://localhost:3000")
public class FreelancerController {

    @Autowired
    private FreelancerService freelancerService;

    @Autowired
    private JobRequestService jobRequestService;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('FREELANCER')")
    public ResponseEntity<?> getFreelancerProfile(Authentication authentication) {
        String id = authentication.getName();
        Freelancer freelancer = freelancerService.findById(id);

        if (freelancer == null) {
            return ResponseEntity.status(404).body(Map.of("error", "freelancer not found"));
        }

        System.out.println("Fetching profile Image : "+freelancer.getProfileImageUrl());
        return ResponseEntity.ok(Map.of(
                "id", freelancer.getId(),
                "name", freelancer.getFullName() != null ? freelancer.getFullName() : "",
                "role", freelancer.getRole() != null ? freelancer.getRole() : "freelancer",
                "earnings", freelancer.getEarnings() != null ? freelancer.getEarnings() : 0.0,
                "wallet", freelancer.getWalletBalance() != null ? freelancer.getWalletBalance() : 0.0,
                "rating", freelancer.getRating() != null ? freelancer.getRating() : 0.0,
                "completedJobs", freelancer.getCompletedJobs() != null ? freelancer.getCompletedJobs() : 0,
                "profileImageUrl", freelancer.getProfileImageUrl() != null ? freelancer.getProfileImageUrl() : ""
        ));

    }

    @GetMapping("/jobs")
    @PreAuthorize("hasRole('freelancer')")
    public ResponseEntity<?> getJobs(Authentication authentication) {
        try {
            System.out.println("Here!");

            String freelancerMobile = authentication.getName();
            System.out.println("Authenticated freelancer mobile: " + freelancerMobile);

            // Fetch job requests from service
            List<JobRequest> jobs = jobRequestService.getJobsForFreelancer(freelancerMobile);
            System.out.println("Jobs Received : " + jobs.size());

            // Convert entities to DTOs
            List<JobRequestDto> jobDtos = jobs.stream().map(job -> {
                // Convert mediaUrls from comma-separated String to List<String>
                List<String> mediaUrlsList = null;
                if (job.getMediaUrls() != null && !job.getMediaUrls().isEmpty()) {
                    mediaUrlsList = List.of(job.getMediaUrls().split(","));
                }

                return JobRequestDto.builder()
                        .id(job.getId())
                        .customerId(job.getCustomer() != null ? job.getCustomer().getId() : null)
                        .serviceItemId(job.getServiceItem() != null ? job.getServiceItem().getId() : null)
                        .city(job.getCity())
                        .state(job.getState())
                        .pincode(job.getPincode())
                        .locality(job.getLocality())
                        .title(job.getTitle())
                        .description(job.getDescription())
                        .mediaUrls(mediaUrlsList)
                        .status(job.getStatus().name())
                        .createdAt(job.getCreatedAt())
                        .updatedAt(job.getUpdatedAt())
                        .build();
            }).toList();

            return ResponseEntity.ok(jobDtos);
        } catch (Exception e) {
            System.err.println("Error fetching jobs: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch jobs.");
        }
    }

}
