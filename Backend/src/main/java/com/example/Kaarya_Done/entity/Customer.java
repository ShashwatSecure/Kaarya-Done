package com.example.Kaarya_Done.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "customers", uniqueConstraints = @UniqueConstraint(columnNames = "mobile_number"))
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "mobile_number", nullable = false, length = 15)
    private String mobile;

    @Column(length = 500)
    private String address;

    @Column(length = 100)
    private String state;

    @Column(length = 100)
    private String city;

    @Column(length = 10)
    private String pincode;

    @Column(name = "photo_url", length = 255)
    private String photoUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
