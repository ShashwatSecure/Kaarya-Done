package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.dto.CustomerSignupDto;
import com.example.Kaarya_Done.entity.Customer;
import com.example.Kaarya_Done.exception.DuplicateResourceException;
import com.example.Kaarya_Done.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CustomerService(CustomerRepository customerRepository,
                           PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Customer createCustomer(CustomerSignupDto signupDto) {
        if (customerRepository.existsByUsername(signupDto.getUsername())) {
            throw new DuplicateResourceException("Username already taken");
        }

        Customer customer = new Customer();
        customer.setFullName(signupDto.getFullName());
        customer.setEmail(signupDto.getEmail());
        customer.setMobile(signupDto.getMobile());
        customer.setUsername(signupDto.getUsername());
        customer.setPassword(passwordEncoder.encode(signupDto.getPassword()));
        customer.setCity(signupDto.getCity());
        customer.setPincode(signupDto.getPincode());

        try {
            return customerRepository.save(customer);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateResourceException("Database constraint violation");
        }
    }
}