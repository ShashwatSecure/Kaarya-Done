package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.dto.SignupDtoCustomer;
import com.example.Kaarya_Done.dto.LoginDtoCustomer;
import com.example.Kaarya_Done.entity.Customer;
import com.example.Kaarya_Done.service.CustomerService;
import com.example.Kaarya_Done.config.JwtTokenProvider;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    private CustomerService customerService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> getCustomerProfile(Authentication authentication) {
        String mobile = authentication.getName();
        Customer customer = customerService.findByMobile(mobile);

        if (customer == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Customer not found"));
        }

        return ResponseEntity.ok(Map.of(
                "name", customer.getFullName(),
                "profileImageUrl", customer.getProfileImageUrl()
        ));

    }
}
