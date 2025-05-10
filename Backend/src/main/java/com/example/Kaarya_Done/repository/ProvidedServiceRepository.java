package com.example.Kaarya_Done.repository;

import com.example.Kaarya_Done.entity.ProvidedService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProvidedServiceRepository extends JpaRepository<ProvidedService, Long> {

    // Fetch ProvidedServices by a list of IDs
    List<ProvidedService> findAllByIdIn(List<Long> ids);  // Using 'In' to find matching services by IDs
}
