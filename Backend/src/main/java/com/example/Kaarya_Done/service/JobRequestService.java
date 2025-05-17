package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.entity.JobRequest;
import com.example.Kaarya_Done.enums.JobStatus;
import com.example.Kaarya_Done.repository.FreelancerRepository;
import com.example.Kaarya_Done.repository.JobRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobRequestService {

    @Autowired
    private JobRequestRepository jobRequestRepository;

    @Autowired
    private FreelancerRepository freelancerRepository;

    /**
     * Returns job requests relevant for a freelancer.
     * For now, returns all OPEN jobs.
     *
     * @param freelancerMobile mobile number of the freelancer
     * @return list of job requests
     */
    public List<JobRequest> getJobsForFreelancer(String freelancerMobile) {
        Optional<Freelancer> freelancer = freelancerRepository.findByMobile(freelancerMobile);
        if (freelancer.isEmpty()) {
            // You may want to throw an exception or return empty list
            return List.of();
        }

        // Example: return all jobs with status OPEN
        List<JobRequest> jr = jobRequestRepository.findByStatus(JobStatus.OPEN);
        System.out.println("Jobs Received : "+jr);
        return jr;
    }
}
