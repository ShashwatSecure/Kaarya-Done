package com.example.Kaarya_Done.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;

@Entity
@Table(name = "service_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_title", nullable = false, unique = true)
    private String title;

    @Column(name = "category_desc", columnDefinition = "TEXT")
    private String description;

    /**
     * Freelancers who belong to this service category.
     * Marked as LAZY and ignored in JSON to prevent unnecessary loading and serialization.
     */
    @ManyToMany(mappedBy = "serviceCategories", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Freelancer> freelancers;
}
