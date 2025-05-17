package com.example.Kaarya_Done.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customers", uniqueConstraints = @UniqueConstraint(columnNames = "mobile_number"))
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "mobile_number", nullable = false, length = 15, unique = true)
    private String mobile;

    @Column(length = 500)
    private String address;

    // Link to Location entity for standardized location data
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @Column(name = "photo_url", length = 255)
    @Builder.Default
    private String profileImageUrl = "/images/customer/default-avatar.webp";

    @Column(name = "role", nullable = false, length = 50)
    @Setter(AccessLevel.NONE)
    @Builder.Default
    private String role = "CUSTOMER";

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
