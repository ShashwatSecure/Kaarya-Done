package com.example.Kaarya_Done.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    public JwtAuthenticationEntryPoint(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("timestamp", LocalDateTime.now());
        responseBody.put("status", 401);
        responseBody.put("error", "Unauthorized");

        // Provide detailed error message and exception information
        responseBody.put("message", authException.getMessage() != null ? authException.getMessage() : "Authentication token was either missing, expired, or invalid.");

        // Optional: Add a unique correlation ID for tracking purposes
        responseBody.put("correlationId", UUID.randomUUID().toString());

        // Path to the requested resource
        responseBody.put("path", request.getRequestURI());

        // Writing the response body as JSON
        objectMapper.writeValue(response.getOutputStream(), responseBody);
    }
}
