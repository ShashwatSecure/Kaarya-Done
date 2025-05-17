package com.example.Kaarya_Done.repository;

import com.example.Kaarya_Done.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByStateAndCityAndPincode(String state, String city, String pincode);
}
