package com.example.Kaarya_Done.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CustomerSignupDto {

    @NotBlank(message = "Full name is required")
    @Size(max = 100, message = "Full name must be less than 100 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 255, message = "Email must be less than 255 characters")
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Pattern(
            regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$",
            message = "Mobile number must be 10 digits"
    )
    private String mobile;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50,
            message = "Username must be between 3-50 characters")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @Size(max = 50, message = "City must be less than 50 characters")
    private String city;

    @Size(max = 10, message = "Pincode must be less than 10 characters")
    private String pincode;
}