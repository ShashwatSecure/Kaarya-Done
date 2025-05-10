package com.example.Kaarya_Done.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProvidedService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_title", nullable = false, unique = true)
    private String title;

    @Column(name = "service_desc", columnDefinition = "TEXT")
    private String description;

    /**
     * Freelancers who offer this service.
     * Marked as LAZY and ignored in JSON to prevent massive data loading and serialization issues.
     */
    @ManyToMany(mappedBy = "servicesOffered", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Freelancer> freelancers;
}
