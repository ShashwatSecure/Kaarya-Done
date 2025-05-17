package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.dto.BidOfferRequestDto;
import com.example.Kaarya_Done.dto.BidRequestDto;
import com.example.Kaarya_Done.entity.*;
import com.example.Kaarya_Done.entity.Bidding.BidStatus;
import com.example.Kaarya_Done.entity.BidOffer.OfferBy;
import com.example.Kaarya_Done.repository.BidOfferRepository;
import com.example.Kaarya_Done.repository.BiddingRepository;
import com.example.Kaarya_Done.repository.FreelancerRepository;
import com.example.Kaarya_Done.repository.JobRequestRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BiddingService {

    private final BiddingRepository biddingRepository;
    private final BidOfferRepository bidOfferRepository;
    private final FreelancerRepository freelancerRepository;
    private final JobRequestRepository jobRequestRepository;

    // Submit initial bid with initial offer from freelancer
    public ResponseEntity<?> submitBid(BidRequestDto request, Long freelancerId) {
        if (request.getMinPrice() == null || request.getMaxPrice() == null
                || request.getMinPrice() <= 0 || request.getMaxPrice() < request.getMinPrice()) {
            return ResponseEntity.badRequest().body("Invalid price range. maxPrice must be >= minPrice and minPrice > 0.");
        }

        Freelancer freelancer = freelancerRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));

        JobRequest jobRequest = jobRequestRepository.findById(request.getJobRequestId())
                .orElseThrow(() -> new RuntimeException("Job request not found"));

        Bidding bid = Bidding.builder()
                .jobRequest(jobRequest)
                .freelancer(freelancer)
                .minPrice(BigDecimal.valueOf(request.getMinPrice()))
                .maxPrice(BigDecimal.valueOf(request.getMaxPrice()))
                .status(BidStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        biddingRepository.save(bid);

        // Save initial BidOffer by freelancer (initial offer = minPrice)
        BidOffer initialOffer = BidOffer.builder()
                .bidding(bid)
                .offerPrice(bid.getMinPrice())
                .offerBy(OfferBy.FREELANCER)
                .createdAt(LocalDateTime.now())
                .build();

        bidOfferRepository.save(initialOffer);

        return ResponseEntity.ok("Bid submitted successfully.");
    }

    // Submit counter offer (customer or freelancer)
    @Transactional
    public ResponseEntity<?> submitCounterOffer(Long biddingId, BidOfferRequestDto offerRequest, OfferBy offerBy) {
        Bidding bidding = biddingRepository.findById(biddingId)
                .orElseThrow(() -> new RuntimeException("Bidding not found"));

        if (bidding.getStatus() != BidStatus.PENDING) {
            return ResponseEntity.badRequest().body("Negotiation has ended. Cannot submit new offers.");
        }

        BigDecimal offerPrice = BigDecimal.valueOf(offerRequest.getOfferPrice());

        if (offerPrice.compareTo(BigDecimal.ZERO) <= 0) {
            return ResponseEntity.badRequest().body("Offer price must be positive.");
        }

        // Optional: validate price is within acceptable range or relative to previous offer

        // Save new offer
        BidOffer newOffer = BidOffer.builder()
                .bidding(bidding)
                .offerPrice(offerPrice)
                .offerBy(offerBy)
                .createdAt(LocalDateTime.now())
                .build();

        bidOfferRepository.save(newOffer);

        // Update bidding updatedAt
        bidding.setUpdatedAt(LocalDateTime.now());
        biddingRepository.save(bidding);

        return ResponseEntity.ok("Counter offer submitted.");
    }

    // Accept a bid (bidding) and end negotiation
    @Transactional
    public ResponseEntity<?> acceptBid(Long biddingId) {
        Bidding bidding = biddingRepository.findById(biddingId)
                .orElseThrow(() -> new RuntimeException("Bid not found"));

        if (bidding.getStatus() != BidStatus.PENDING) {
            return ResponseEntity.badRequest().body("Bid already accepted or rejected.");
        }

        bidding.setStatus(BidStatus.ACCEPTED);
        bidding.setUpdatedAt(LocalDateTime.now());
        biddingRepository.save(bidding);

        // Reject other bids for same job request
        biddingRepository.rejectOtherBids(
                bidding.getJobRequest().getId(),
                bidding.getId()
        );

        return ResponseEntity.ok(bidding);
    }

    // Reject a bid explicitly
    @Transactional
    public ResponseEntity<?> rejectBid(Long biddingId) {
        Bidding bidding = biddingRepository.findById(biddingId)
                .orElseThrow(() -> new RuntimeException("Bid not found"));

        if (bidding.getStatus() != BidStatus.PENDING) {
            return ResponseEntity.badRequest().body("Bid already accepted or rejected.");
        }

        bidding.setStatus(BidStatus.REJECTED);
        bidding.setUpdatedAt(LocalDateTime.now());
        biddingRepository.save(bidding);

        return ResponseEntity.ok("Bid rejected.");
    }

    // Get all offers in the negotiation for a bidding
    public List<BidOffer> getBidOffers(Long biddingId) {
        return bidOfferRepository.findByBiddingIdOrderByCreatedAtAsc(biddingId);
    }

    // Other existing methods
    public List<Bidding> getBidsForJob(Long jobRequestId) {
        return biddingRepository.findByJobRequestId(jobRequestId);
    }

    public List<Bidding> getBidsByFreelancer(Long freelancerId) {
        return biddingRepository.findByFreelancerId(freelancerId);
    }
}
