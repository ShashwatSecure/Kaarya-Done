package com.example.Kaarya_Done.repository;

import com.example.Kaarya_Done.entity.Freelancer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FreelancerRepository extends JpaRepository<Freelancer, Long> {
    boolean existsByMobile(String mobile);
    boolean existsByAadhaarNumber(String aadhaarNumber);
    boolean existsByPanNumber(String panNumber);
}
