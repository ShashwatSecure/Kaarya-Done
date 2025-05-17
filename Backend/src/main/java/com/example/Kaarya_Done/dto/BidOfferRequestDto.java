package com.example.Kaarya_Done.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidOfferRequestDto {
    private Double offerPrice;

    public boolean isValid() {
        return offerPrice != null && offerPrice > 0;
    }
}
