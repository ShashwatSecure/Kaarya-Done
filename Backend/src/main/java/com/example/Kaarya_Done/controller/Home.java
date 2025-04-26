package com.example.Kaarya_Done.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class Home {

    @GetMapping("")
    public ResponseEntity<String> homePage()
    {
        return new ResponseEntity<>("Started", HttpStatus.OK);
    }
}
