package com.example.Kaarya_Done.repository;

import com.example.Kaarya_Done.entity.BidOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidOfferRepository extends JpaRepository<BidOffer, Long> {
    List<BidOffer> findByBiddingIdOrderByCreatedAtAsc(Long biddingId);
}
