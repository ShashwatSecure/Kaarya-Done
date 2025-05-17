package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.dto.BidOfferRequestDto;
import com.example.Kaarya_Done.dto.BidRequestDto;
import com.example.Kaarya_Done.entity.BidOffer;
import com.example.Kaarya_Done.entity.BidOffer.OfferBy;
import com.example.Kaarya_Done.entity.Bidding;
import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.service.BiddingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/biddings")
@RequiredArgsConstructor
public class BiddingController {

    private final BiddingService biddingService;

    @PostMapping("/bids")
    @PreAuthorize("hasRole('FREELANCER')")
    public ResponseEntity<?> submitBid(@RequestBody BidRequestDto bidRequestDto, @AuthenticationPrincipal Freelancer freelancer) {
        Long freelancerId = freelancer.getId();
        return biddingService.submitBid(bidRequestDto, freelancerId);
    }

    // Customer accepts a bid
    @PostMapping("/{biddingId}/accept")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> acceptBid(@PathVariable Long biddingId) {
        return biddingService.acceptBid(biddingId);
    }

    // Customer rejects a bid
    @PostMapping("/{biddingId}/reject")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> rejectBid(@PathVariable Long biddingId) {
        return biddingService.rejectBid(biddingId);
    }

    // Customer or Freelancer submits counter-offer
    @PostMapping("/{biddingId}/offers")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'FREELANCER')")
    public ResponseEntity<?> submitCounterOffer(@PathVariable Long biddingId,
                                                @RequestBody BidOfferRequestDto offerRequest,
                                                @AuthenticationPrincipal Object principal) {
        OfferBy offerBy;
        Long userId;

        // Determine offerBy based on role and principal type
        if (principal instanceof Freelancer && hasRole("FREELANCER")) {
            offerBy = OfferBy.FREELANCER;
            userId = ((Freelancer) principal).getId();
        } else if (hasRole("CUSTOMER")) {
            offerBy = OfferBy.CUSTOMER;
            // You will need to get Customer id from principal here (assuming you have Customer entity)
            // For demo, just put null or implement accordingly
            userId = null;
        } else {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        // Additional: Check if user is part of bidding (freelancer or customer owns bidding) - to prevent random users

        return biddingService.submitCounterOffer(biddingId, offerRequest, offerBy);
    }

    // Get offers for a bidding (negotiation history)
    @GetMapping("/{biddingId}/offers")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'FREELANCER')")
    public ResponseEntity<List<BidOffer>> getBidOffers(@PathVariable Long biddingId) {
        return ResponseEntity.ok(biddingService.getBidOffers(biddingId));
    }

    // Existing endpoints for fetching bids by job or freelancer
    @GetMapping("/job/{jobRequestId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<Bidding>> getBidsForJob(@PathVariable Long jobRequestId) {
        return ResponseEntity.ok(biddingService.getBidsForJob(jobRequestId));
    }

    @GetMapping("/freelancer/{freelancerId}")
    @PreAuthorize("hasRole('FREELANCER')")
    public ResponseEntity<List<Bidding>> getBidsByFreelancer(@PathVariable Long freelancerId) {
        return ResponseEntity.ok(biddingService.getBidsByFreelancer(freelancerId));
    }

    // Helper method to check role in security context (implement as per your security config)
    private boolean hasRole(String role) {
        // Implement role check based on SecurityContextHolder or your auth mechanism
        // Example:
        // Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // return auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_" + role));
        return true; // placeholder, replace with actual implementation
    }
}
