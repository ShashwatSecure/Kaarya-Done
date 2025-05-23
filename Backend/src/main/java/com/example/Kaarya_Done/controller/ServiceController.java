package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.dto.ServiceItemDto;
import com.example.Kaarya_Done.entity.ServiceCategory;
import com.example.Kaarya_Done.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {


    @Autowired
    private ServiceService service;

    @GetMapping("/service-categories")
    public List<ServiceCategory> getServiceCategory()
    {
        return service.getServiceCategories();
    }

    @GetMapping
    public List<ServiceItemDto> getServices() {
        return service.getAllServices().stream().map(item -> ServiceItemDto.builder()
                .id(item.getId())
                .title(item.getTitle())
                .description(item.getDescription())
                .categoryId(item.getCategory().getId())
                .build()
        ).toList();
    }

}