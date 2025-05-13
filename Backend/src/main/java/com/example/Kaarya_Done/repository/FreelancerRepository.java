package com.example.Kaarya_Done.repository;

import com.example.Kaarya_Done.entity.Customer;
import com.example.Kaarya_Done.entity.Freelancer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FreelancerRepository extends JpaRepository<Freelancer, Long> {
    boolean existsByMobile(String mobile);
    boolean existsByAadhaarNumber(String aadhaarNumber);
    boolean existsByPanNumber(String panNumber);

    Optional<Freelancer> findByMobile(String mobile);
}
