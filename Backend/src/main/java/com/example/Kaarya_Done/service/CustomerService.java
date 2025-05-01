package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.dto.SignupDtoCustomer;
import com.example.Kaarya_Done.entity.Customer;
import com.example.Kaarya_Done.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer createCustomer(SignupDtoCustomer signupDtoCustomer) {
        Customer customer = new Customer();
        customer.setFullName(signupDtoCustomer.getFull_name());
        customer.setMobile(signupDtoCustomer.getMobile());
        customer.setAddress(signupDtoCustomer.getAddress());
        customer.setPhotoUrl(signupDtoCustomer.getPhoto_url());
        return customerRepository.save(customer);
    }
}
