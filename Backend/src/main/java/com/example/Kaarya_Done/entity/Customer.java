package com.example.Kaarya_Done.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "customers", schema = "public")
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(name = "mobile_number", nullable = false, length = 15)
    private String mobile;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false, length = 60)  // BCrypt hash length
    private String password;

    @Column(length = 50)
    private String city;

    @Column(length = 10)
    private String pincode;
}