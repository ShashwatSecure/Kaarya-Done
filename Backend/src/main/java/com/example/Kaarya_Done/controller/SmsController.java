package com.example.Kaarya_Done.controller;

import com.example.Kaarya_Done.service.SmsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/sms")
public class SmsController {

    private static final Logger logger = LoggerFactory.getLogger(SmsController.class);  // For logging purposes
    private final SmsService smsService;

    // Temporary storage for OTP (for testing purposes only, replace with a more robust solution for production)
    private static final ConcurrentHashMap<String, OtpRecord> otpStore = new ConcurrentHashMap<>();

    public SmsController(SmsService smsService) {
        this.smsService = smsService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, Object>> sendOtp(@RequestParam String mobile) {
        String formattedNumber = "+91" + mobile;
        String otp = String.valueOf(new Random().nextInt(899999) + 100000); // 6-digit OTP

        // Store OTP with timestamp
        otpStore.put(formattedNumber, new OtpRecord(otp, System.currentTimeMillis()));

        // Log the OTP sent (for debugging purposes, but ensure you don't log sensitive data in production)
        logger.info("Sending OTP to {}: {}", formattedNumber, otp);

        // Sending OTP via SMS service
        String response = smsService.sendOtpSms(formattedNumber, otp);
        System.out.println(response);
        // Prepare response map
        Map<String, Object> responseMap = new HashMap<>();
        if (response.contains("Failed")) {
            responseMap.put("success", false);
            responseMap.put("message", "Failed to send OTP: " + response);
        } else {
            responseMap.put("success", true);
            responseMap.put("message", "OTP sent successfully to " + mobile);
        }
        System.out.println(responseMap);
        return ResponseEntity.ok(responseMap); // Return response with status and message
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> payload) {
        String mobile = payload.get("mobile");
        String otpReceived = payload.get("otp");
        String formattedNumber = "+91" + mobile;
        OtpRecord otpRecord = otpStore.get(formattedNumber);

        Map<String, Object> responseMap = new HashMap<>();

        if (otpRecord == null) {
            responseMap.put("success", false);
            responseMap.put("message", "OTP not found for this mobile number");
            return new ResponseEntity<>(responseMap, HttpStatus.NOT_FOUND);
        }

        // Check OTP expiry (5 minutes expiry time)
        long currentTime = System.currentTimeMillis();
        if (currentTime - otpRecord.timestamp > TimeUnit.MINUTES.toMillis(5)) {
            otpStore.remove(formattedNumber);  // Expired OTP, remove it
            responseMap.put("success", false);
            responseMap.put("message", "OTP expired");
            return new ResponseEntity<>(responseMap, HttpStatus.GONE);
        }

        // Verify OTP
        if (otpRecord.otp.equals(otpReceived)) {
            otpStore.remove(formattedNumber); // OTP valid, remove it after verification
            responseMap.put("success", true);
            responseMap.put("message", "OTP verified successfully");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } else {
            responseMap.put("success", false);
            responseMap.put("message", "Invalid OTP");
            return new ResponseEntity<>(responseMap, HttpStatus.NOT_ACCEPTABLE);
        }
    }


    // Simple class to hold OTP and its timestamp
    private static class OtpRecord {
        String otp;
        long timestamp;

        OtpRecord(String otp, long timestamp) {
            this.otp = otp;
            this.timestamp = timestamp;
        }
    }
}
