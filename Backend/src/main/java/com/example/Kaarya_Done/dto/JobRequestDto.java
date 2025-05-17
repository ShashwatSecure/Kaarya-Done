package com.example.Kaarya_Done.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobRequestDto {

    private Long id;

    private String city;
    private String state;
    private String pincode;
    private String locality;

    private String title;
    private String description;
    private boolean isUrgent;

    private String mediaUrls;

    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Optional: name of the service item (to avoid loading full ServiceItem object)
    private String serviceItemName;

    // Optional: customer name or identifier (if needed for frontend)
    private String customerName;

    private String profileImage;
}
