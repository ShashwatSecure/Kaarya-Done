package com.example.Kaarya_Done.repository;

import com.example.Kaarya_Done.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Check if a mobile number already exists
    boolean existsByMobile(String mobile);

    // Find customer by mobile number
    Optional<Customer> findByMobile(String mobile);

    // Find customer by full name
    Optional<Customer> findByFullName(String fullName);
}
