package com.example.Kaarya_Done.repository;

import com.example.Kaarya_Done.entity.Bidding;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BiddingRepository extends JpaRepository<Bidding, Long> {

    List<Bidding> findByJobRequestId(Long jobRequestId);

    List<Bidding> findByFreelancerId(Long freelancerId);

    @Modifying
    @Query("UPDATE Bidding b SET b.status = 'REJECTED' WHERE b.jobRequest.id = :jobId AND b.id <> :acceptedBidId")
    void rejectOtherBids(Long jobId, Long acceptedBidId);
}
