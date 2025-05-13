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

    @Column(name = "services_success")
    private Integer servicesSuccess;

    @Column(name = "services_failed")
    private Integer servicesFailed;

    @Column(name = "services_cancelled")
    private Integer servicesCancelled;

    /**
     * Becomes true after successfully serving 5 customers.
     */
    @Column(name = "is_verified")
    private boolean isVerified = false;

    /**
     * Becomes false when the freelancer is busy or voluntarily unavailable.
     */
    @Column(name = "is_available")
    private boolean isAvailable = true;
}
