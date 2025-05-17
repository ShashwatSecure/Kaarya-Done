package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.config.JwtTokenProvider;
import com.example.Kaarya_Done.dto.LoginDtoCustomer;
import com.example.Kaarya_Done.dto.LoginDtoFreelancer;
import com.example.Kaarya_Done.dto.SignupDtoCustomer;
import com.example.Kaarya_Done.dto.SignupDtoFreelancer;
import com.example.Kaarya_Done.entity.Customer;
import com.example.Kaarya_Done.entity.Freelancer;
import com.example.Kaarya_Done.service.CustomerService;
import com.example.Kaarya_Done.service.FreelancerService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private CustomerService customerService;

    @Autowired
    private FreelancerService freelancerService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup/customer")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupDtoCustomer signupDtoCustomer) {
        System.out.println(signupDtoCustomer);
        Customer customer = customerService.createCustomer(signupDtoCustomer);
        return ResponseEntity.ok(Map.of(
                "id", customer.getId(),
                "name", customer.getFullName(),
                "mobile", customer.getMobile()
        ));
    }

    @GetMapping("/check-mobile/customer")
    public ResponseEntity<?> checkCustomerExists(@RequestParam String mobile) {
        boolean exists = customerService.mobileExists(mobile);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        logger.info("Mobile exists response: {}", response);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login/customer")
    public ResponseEntity<?> loginCustomer(@Valid @RequestBody LoginDtoCustomer loginDto) {
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

    @PostMapping("/signup/freelancer")
    public ResponseEntity<?> signupFreelancer(@RequestBody SignupDtoFreelancer signupDto) {
        // Check for existing mobile number
        if (freelancerService.mobileExists(signupDto.getMobile())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Mobile number already registered");
            return ResponseEntity.badRequest().body(error);
        }

        System.out.println("Service Category IDs from frontend: " + signupDto.getServiceCategoryIds());

        // Create and save the freelancer
        Freelancer savedFreelancer = freelancerService.createFreelancer(signupDto);
        return ResponseEntity.ok(savedFreelancer);
    }

    @GetMapping("/check-mobile/freelancer")
    public ResponseEntity<Map<String, Boolean>> checkFreelancerExists(@RequestParam String mobile) {
        boolean exists = freelancerService.mobileExists(mobile);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login/freelancer")
    public ResponseEntity<?> loginFreelancer(@Valid @RequestBody LoginDtoFreelancer loginDto) {
        String mobile = loginDto.getMobile();
        String role = loginDto.getRole();

        Freelancer freelancer = freelancerService.findByMobile(mobile);

        if (freelancer == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid mobile number or freelancer not found."));
        }

        String token = jwtTokenProvider.generateToken(mobile, role);
        System.out.println(token+"\n"+freelancer.getId()+"\n"+freelancer.getMobile()+"\n"+role);

        return ResponseEntity.ok(Map.of(
                "token", token,
                "freelancerId", freelancer.getId(),
                "name", freelancer.getFullName(),
                "mobile", freelancer.getMobile(),
                "role", role,
                "profileImage",freelancer.getProfileImageUrl()
        ));
    }
}
