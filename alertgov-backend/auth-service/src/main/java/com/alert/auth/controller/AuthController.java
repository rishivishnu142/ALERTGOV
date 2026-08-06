package com.alert.auth.controller;

import com.alert.auth.dto.AuthRequest;
import com.alert.auth.dto.AuthResponse;
import com.alert.auth.entity.AuthUser;
import com.alert.auth.repository.AuthUserRepository;
import com.alert.auth.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthUserRepository authUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        Optional<AuthUser> userOpt = authUserRepository.findById(request.getUsername());
        
        if (userOpt.isPresent()) {
            AuthUser user = userOpt.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
                AuthResponse.UserDetails userDetails = new AuthResponse.UserDetails(user.getUsername(), user.getRole());
                return ResponseEntity.ok(new AuthResponse(true, token, "Login successful", userDetails));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponse(false, null, "Invalid username or password", null));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthUser user) {
        if (authUserRepository.existsById(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        authUserRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
