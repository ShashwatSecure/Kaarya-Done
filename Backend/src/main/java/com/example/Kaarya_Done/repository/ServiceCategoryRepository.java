package com.example.Kaarya_Done.repository;

import com.example.Kaarya_Done.entity.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, Integer> {

    // Fetch ProvidedServices by a list of IDs
    List<ServiceCategory> findAllByIdIn(List<Long> ids);  // Using 'In' to find matching services by IDs
}
