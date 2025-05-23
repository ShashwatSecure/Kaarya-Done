package com.example.Kaarya_Done.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobRequestDto {

    private Long id;

    private Long customerId;
    private Long serviceItemId;
    private String title;
    private String description;
    private List<String> mediaUrls;
    private String city;
    private String state;
    private String pincode;
    private String locality;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
