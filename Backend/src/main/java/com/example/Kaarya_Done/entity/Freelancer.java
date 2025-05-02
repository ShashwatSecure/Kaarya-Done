package com.example.Kaarya_Done.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "freelancers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Freelancer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String mobile;

    private String bio;

    private String city;

    private String state;

    private String pincode;

    @Column(name = "aadhaar_number", unique = true)
    private String aadhaarNumber;

    @Column(name = "pan_number", unique = true)
    private String panNumber;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "freelancer_services", joinColumns = @JoinColumn(name = "freelancer_id"))
    private Set<String> services;

    @Column(name = "service_desc")
    private String serviceDesc;

    @Column(name = "experience")
    private Integer experience;  // Changed to Integer

    @Column(name = "hourly_rate")
    private BigDecimal hourlyRate;  // Changed to BigDecimal

    @Column(name = "willingness_to_travel")
    private Boolean willingnessToTravel;  // Changed to Boolean

    private boolean isVerified = false;

    private boolean isActive = true;
}
