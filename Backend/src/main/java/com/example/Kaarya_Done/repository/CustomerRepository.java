package com.example.Kaarya_Done.repository;

import com.example.Kaarya_Done.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Check if username exists (for validation)
    boolean existsByUsername(String username);

    // Find by email (for login functionality)
    Optional<Customer> findByEmail(String email);

    // Supabase-compatible query using native PostgreSQL syntax
    @Query(value = "SELECT * FROM customers WHERE mobile_number = :mobile", nativeQuery = true)
    Optional<Customer> findByMobileNumber(@Param("mobile") String mobile);

    // Custom query example for future use
    @Query("SELECT c FROM Customer c WHERE c.city = :city AND c.pincode = :pincode")
    List<Customer> findByLocation(@Param("city") String city,
                                  @Param("pincode") String pincode);
}