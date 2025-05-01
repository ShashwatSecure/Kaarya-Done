package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.dto.CustomerSignupDto;
import com.example.Kaarya_Done.entity.Customer;
import com.example.Kaarya_Done.exception.DuplicateResourceException;
import com.example.Kaarya_Done.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CustomerService customerService;

    public AuthController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/signup/customer")
    public ResponseEntity<?> registerCustomer(@Valid @RequestBody CustomerSignupDto signupDto) {
        try {
            Customer customer = customerService.createCustomer(signupDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(customer);
        } catch (DuplicateResourceException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}