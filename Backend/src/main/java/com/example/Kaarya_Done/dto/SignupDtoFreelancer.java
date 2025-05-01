package com.example.Kaarya_Done.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupDtoFreelancer {

    // Step 1: Personal Information
    private String fullName;
    private String mobile;
    private String bio;
    private String state;
    private String city;
    private String pincode;
    private String aadhaarNumber;
    private String panNumber;
    private String profileImageUrl;

    // Step 2: Services and Experience
    private Set<String> services;  // List of services offered by the freelancer
    private String serviceDesc;     // Description of the services

    // Changed to Integer for better comparison operations
    private Integer experience;     // Years of experience (Integer instead of String)

    // Changed to BigDecimal for precision in monetary values
    private BigDecimal hourlyRate;        // Hourly rate (BigDecimal instead of String)

    // Changed to Boolean to reflect true/false options (Yes, No, Maybe)
    private Boolean willingnessToTravel;  // Willingness to travel (true/false/nullable)
}
