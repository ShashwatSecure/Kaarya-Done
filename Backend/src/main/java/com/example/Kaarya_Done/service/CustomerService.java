package com.example.Kaarya_Done.service;

import com.example.Kaarya_Done.dto.SignupDtoCustomer;
import com.example.Kaarya_Done.entity.Customer;
import com.example.Kaarya_Done.entity.Location;
import com.example.Kaarya_Done.repository.CustomerRepository;
import com.example.Kaarya_Done.repository.LocationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Transactional
    public Customer createCustomer(SignupDtoCustomer signupDtoCustomer) {
        Customer customer = new Customer();

        // Use DTO getter methods (adjust if DTO uses getFull_name() instead of getFullName())
        customer.setFullName(signupDtoCustomer.getFullName());
        customer.setMobile(signupDtoCustomer.getMobile());
        customer.setAddress(signupDtoCustomer.getAddress());

        // Find existing Location by state, city, and pincode
        Optional<Location> locationOpt = locationRepository.findByStateAndCityAndPincode(
                signupDtoCustomer.getState(),
                signupDtoCustomer.getCity(),
                signupDtoCustomer.getPincode()
        );

        Location location = locationOpt.orElseGet(() -> {
            // Create new Location if not found
            Location newLocation = new Location();
            newLocation.setState(signupDtoCustomer.getState());
            newLocation.setCity(signupDtoCustomer.getCity());
            newLocation.setPincode(signupDtoCustomer.getPincode());
            return locationRepository.save(newLocation);
        });

        customer.setLocation(location);

        return customerRepository.save(customer);
    }

    public boolean mobileExists(String mobile) {
        return customerRepository.existsByMobile(mobile);
    }

    public Customer findByMobile(String mobile) {
        return customerRepository.findByMobile(mobile).orElse(null);
    }

    public Optional<Customer> findById(String id) {
        return Optional.ofNullable(customerRepository.findById(Long.parseLong(id)).orElse(null));
    }
}
