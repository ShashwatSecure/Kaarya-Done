package com.example.Kaarya_Done.repository;

import com.example.Kaarya_Done.entity.JobRequest;
import com.example.Kaarya_Done.enums.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRequestRepository extends JpaRepository<JobRequest, Long> {
    List<JobRequest> findByStatus(JobStatus status);
}
