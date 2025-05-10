package com.example.Kaarya_Done.dto;

import lombok.*;

import java.util.Collections;
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
    private Set<Integer> serviceCategoryIds = Collections.emptySet();  // Changed from serviceIds to serviceCategoryIds

    private Integer experience;    // Years of experience
}
