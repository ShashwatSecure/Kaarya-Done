package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.dto.SignupDtoCustomer;
import com.example.Kaarya_Done.entity.Customer;
import com.example.Kaarya_Done.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/signup/customer")
    public ResponseEntity<Customer> signup(@RequestBody SignupDtoCustomer signupDtoCustomer) {
        Customer customer = customerService.createCustomer(signupDtoCustomer);
        return ResponseEntity.ok(customer);
    }

    @GetMapping("/check-mobile/customer")
    public ResponseEntity<?> checkMobileExists(@RequestParam String mobile) {
        boolean exists = customerService.mobileExists(mobile);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
}