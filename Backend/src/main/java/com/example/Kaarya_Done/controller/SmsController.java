package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.config.JwtTokenProvider;
import com.example.Kaarya_Done.service.SmsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/sms")
public class SmsController {

    private static final Logger logger = LoggerFactory.getLogger(SmsController.class);
    private final SmsService smsService;
    private final JwtTokenProvider jwtTokenProvider;

    // Temporary in-memory store for OTPs (use Redis in production)
    private static final ConcurrentHashMap<String, OtpRecord> otpStore = new ConcurrentHashMap<>();

    public SmsController(SmsService smsService, JwtTokenProvider jwtTokenProvider) {
        this.smsService = smsService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, Object>> sendOtp(@RequestParam String mobile) {
        String formattedNumber = "+91" + mobile;
        String otp = String.valueOf(new Random().nextInt(899999) + 100000); // 6-digit OTP

        otpStore.put(formattedNumber, new OtpRecord(otp, System.currentTimeMillis()));
        logger.info("Sending OTP to {}: {}", formattedNumber, otp);

        String response = smsService.sendOtpSms(formattedNumber, otp);
        System.out.println(response);
        Map<String, Object> responseMap = new HashMap<>();
        if (response.contains("Failed")) {
            responseMap.put("success", false);
            responseMap.put("message", "Failed to send OTP: " + response);
        } else {
            responseMap.put("success", true);
            responseMap.put("message", "OTP sent successfully to " + mobile);
        }

        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/verify-signup-otp")
    public ResponseEntity<Map<String, Object>> verifySignupOtp(@RequestBody Map<String, String> payload) {
        String mobile = payload.get("mobile");
        String otpReceived = payload.get("otp");
        String role = payload.get("role");  // Expected roles: freelancer, customer
        System.out.println("payload : "+payload);
        String formattedNumber = "+91" + mobile;

        OtpRecord otpRecord = otpStore.get(formattedNumber);
        Map<String, Object> responseMap = new HashMap<>();

        if (otpRecord == null) {
            responseMap.put("success", false);
            responseMap.put("message", "OTP not found for this mobile number");
            return new ResponseEntity<>(responseMap, HttpStatus.NOT_FOUND);
        }

        long currentTime = System.currentTimeMillis();
        if (currentTime - otpRecord.timestamp > TimeUnit.MINUTES.toMillis(5)) {
            otpStore.remove(formattedNumber);
            responseMap.put("success", false);
            responseMap.put("message", "OTP expired");
            return new ResponseEntity<>(responseMap, HttpStatus.GONE);
        }

        if (otpRecord.otp.equals(otpReceived)) {
            otpStore.remove(formattedNumber);

            responseMap.put("success", true);
            responseMap.put("message", "OTP verified successfully");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } else {
            responseMap.put("success", false);
            responseMap.put("message", "Invalid OTP");
            return new ResponseEntity<>(responseMap, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> payload) {
        String mobile = payload.get("mobile");
        String otpReceived = payload.get("otp");
        String role = payload.get("role");  // Expected roles: freelancer, customer
        System.out.println("payload : "+payload);
        String formattedNumber = "+91" + mobile;

        OtpRecord otpRecord = otpStore.get(formattedNumber);
        Map<String, Object> responseMap = new HashMap<>();

        if (otpRecord == null) {
            responseMap.put("success", false);
            responseMap.put("message", "OTP not found for this mobile number");
            return new ResponseEntity<>(responseMap, HttpStatus.NOT_FOUND);
        }

        long currentTime = System.currentTimeMillis();
        if (currentTime - otpRecord.timestamp > TimeUnit.MINUTES.toMillis(5)) {
            otpStore.remove(formattedNumber);
            responseMap.put("success", false);
            responseMap.put("message", "OTP expired");
            return new ResponseEntity<>(responseMap, HttpStatus.GONE);
        }

        if (otpRecord.otp.equals(otpReceived)) {
            otpStore.remove(formattedNumber);

            // ✅ Use JwtTokenProvider instead of JwtUtil
            String token = jwtTokenProvider.generateToken(mobile, role);

            responseMap.put("success", true);
            responseMap.put("message", "OTP verified successfully");
            responseMap.put("token", token);
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } else {
            responseMap.put("success", false);
            responseMap.put("message", "Invalid OTP");
            return new ResponseEntity<>(responseMap, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Inner class to hold OTP data
    private static class OtpRecord {
        String otp;
        long timestamp;

        OtpRecord(String otp, long timestamp) {
            this.otp = otp;
            this.timestamp = timestamp;
        }
    }
}
