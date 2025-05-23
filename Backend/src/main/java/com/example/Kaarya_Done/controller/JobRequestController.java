package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.dto.JobRequestDto;
import com.example.Kaarya_Done.entity.Customer;
import com.example.Kaarya_Done.entity.ServiceItem;
import com.example.Kaarya_Done.service.CustomerService;
import com.example.Kaarya_Done.service.JobRequestService;
import com.example.Kaarya_Done.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/job-requests")
public class JobRequestController {

    @Autowired
    private JobRequestService jobRequestService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ServiceService serviceService;

    @PostMapping
    public ResponseEntity<?> createJobRequest(@RequestBody JobRequestDto dto) {
        try {
            // Fetch related entities
            Optional<Customer> customer = customerService.findById(String.valueOf(dto.getCustomerId()));
            if (customer.isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid customer ID");
            }

            Optional<ServiceItem> serviceItem = serviceService.findById(dto.getServiceItemId());
            return ResponseEntity.badRequest().body("Invalid service item ID");

            // Join media URLs into comma-separated string for storage
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating job request");
        }
    }
}
