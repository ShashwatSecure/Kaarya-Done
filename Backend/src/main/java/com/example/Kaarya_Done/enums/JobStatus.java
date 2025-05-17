package com.example.Kaarya_Done.enums;

public enum JobStatus {
    OPEN,               // Freelancers can submit bids
    FREELANCER_BOOKED,  // Customer accepted a freelancer’s bid; no more bidding allowed
    INSPECTION_STARTED, // Freelancer started inspecting the job
    IN_PROGRESS,        // Freelancer is working on the job
    COMPLETED,          // Freelancer completed the job
    CANCELLED,          // Job cancelled by customer or freelancer (can happen any time)
    REJECTED            // Job or bid rejected (could be by customer or system)
}
