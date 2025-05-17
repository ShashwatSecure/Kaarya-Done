package com.example.Kaarya_Done.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupDtoCustomer {
    @JsonProperty("full_name")
    private String fullName;
    private String mobile;
    private String address;
    private String state;
    private String city;
    private String pincode;
}
