package com.example.Kaarya_Done.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidRequestDto {
    private Long jobRequestId;
    private Double minPrice;
    private Double maxPrice;

    // Add validation
    public boolean isValid() {
        return minPrice != null && maxPrice != null && minPrice > 0 && maxPrice >= minPrice;
    }
}

