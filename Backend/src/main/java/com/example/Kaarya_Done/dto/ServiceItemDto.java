package com.example.Kaarya_Done.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceItemDto {
    private Long id;
    private String title;
    private String description;
    private Long categoryId;
    private String icon;
}
