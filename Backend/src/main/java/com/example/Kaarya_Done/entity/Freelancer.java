package com.example.Kaarya_Done.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "freelancers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@ToString(of = {"id", "fullName", "mobile", "location"})
public class Freelancer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String mobile;

    @Column(columnDefinition = "TEXT")
    private String bio;

    // Reference Location entity instead of strings
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @Column(name = "aadhaar_number", unique = true)
    private String aadhaarNumber;

    @Column(name = "pan_number", unique = true)
    private String panNumber;

    @Column(name = "profile_image_url", columnDefinition = "VARCHAR(255) DEFAULT '/images/customer/default-avatar.webp'")
    private String profileImageUrl;

    /**
     * Services offered by the freelancer.
     * Many freelancers can offer many services.
     */
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
            name = "freelancer_services",
            joinColumns = @JoinColumn(name = "freelancer_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<ServiceCategory> serviceCategories;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "role", nullable = false, length = 50, columnDefinition = "varchar(50) default 'FREELANCER'", updatable = false)
    private final String role = "FREELANCER";

    @Column(name = "services_success", columnDefinition = "INT DEFAULT 0")
    private Integer servicesSuccess = 0;

    @Column(name = "services_failed", columnDefinition = "INT DEFAULT 0")
    private Integer servicesFailed = 0;

    @Column(name = "services_cancelled", columnDefinition = "INT DEFAULT 0")
    private Integer servicesCancelled = 0;

    @Column(name = "is_verified", columnDefinition = "BOOLEAN DEFAULT false")
    private boolean isVerified = false;

    @Column(name = "is_available", columnDefinition = "BOOLEAN DEFAULT true")
    private boolean isAvailable = true;

    @Column(name = "earnings", columnDefinition = "INT DEFAULT 0")
    private Integer earnings = 0;

    @Column(name = "wallet_balance", columnDefinition = "INT DEFAULT 0")
    private Integer walletBalance = 0;

    // Use Double for fractional ratings, with default 0.0
    @Column(name = "rating", columnDefinition = "DECIMAL(2,1) DEFAULT 0")
    private Double rating = 0.0;

    @Column(name = "completed_jobs", columnDefinition = "INT DEFAULT 0")
    private Integer completedJobs = 0;
}
