package com.example.Kaarya_Done.config;

import com.example.Kaarya_Done.service.CustomerService;
import com.example.Kaarya_Done.service.FreelancerService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Autowired
    private CustomerService customerService;

    @Autowired
    private FreelancerService freelancerService;

    // Inject from application properties or environment variables
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    // Generate a secure key from the secret
    private SecretKey getSigningKey() {
        // Ensure the secret is long enough (minimum 64 chars for HS512)
        if (jwtSecret.length() < 64) {
            logger.error("JWT Secret is too short - must be at least 64 characters");
            throw new IllegalArgumentException("JWT Secret must be at least 64 characters");
        }
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String mobile, String role) {
        Map<String, Object> claims = new HashMap<>();
        System.out.println("role : "+role);
        claims.put("role", role);
        claims.put("mobile", mobile);
        System.out.println("mobile : "+mobile);
        String id = "";
        if(role.equalsIgnoreCase("CUSTOMER"))
            id = Long.toString(customerService.findByMobile(mobile).getId());
        else if(role.equalsIgnoreCase("FREELANCER"))
            id = Long.toString(freelancerService.findByMobile(mobile).getId());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(id) // ✅ ID as subject
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    // Validate JWT token
    public boolean validateToken(String token) {
        try {
            // For debugging - log the first part of the token
            logger.debug("Validating token: {}", token.substring(0, Math.min(20, token.length())));

            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);

            logger.debug("Token validated successfully for: {}", claims.getBody().getSubject());
            return true;

        } catch (Exception e) {
            logger.error("JWT Validation Error - {} - Token: {}", e.getMessage(),
                    token.substring(0, Math.min(20, token.length())));
            return false;
        }
    }

    // Extract the mobile from the JWT token
    public String getMobileFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Extract the role from the JWT token
    public String getRoleFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }
}