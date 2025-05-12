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
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Adjust as needed
public class CustomerController {

    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    private CustomerService customerService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/auth/signup/customer")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupDtoCustomer signupDtoCustomer) {
        Customer customer = customerService.createCustomer(signupDtoCustomer);
        return ResponseEntity.ok(Map.of(
                "id", customer.getId(),
                "name", customer.getFullName(),
                "mobile", customer.getMobile()
        ));
    }

    @GetMapping("/auth/check-mobile/customer")
    public ResponseEntity<?> checkMobileExists(@RequestParam String mobile) {
        boolean exists = customerService.mobileExists(mobile);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        logger.info("Mobile exists response: {}", response);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/login/customer")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDtoCustomer loginDto) {
        String mobile = loginDto.getMobile();
        String role = loginDto.getRole();

        Customer customer = customerService.findByMobile(mobile);

        if (customer == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid mobile number or customer not found."));
        }

        String token = jwtTokenProvider.generateToken(mobile, role);

        return ResponseEntity.ok(Map.of(
                "token", token,
                "customerId", customer.getId(),
                "name", customer.getFullName(),
                "mobile", customer.getMobile(),
                "role", role
        ));
    }

    @GetMapping("/customer/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> getCustomerProfile(Authentication authentication) {
        String mobile = authentication.getName();
        Customer customer = customerService.findByMobile(mobile);

        if (customer == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Customer not found"));
        }

        return ResponseEntity.ok(Map.of(
                "name", customer.getFullName(),
                "photoUrl", customer.getPhotoUrl()
        ));

    }
}
