package com.netflix.backend.service;

import com.netflix.backend.dto.AuthRequest;
import com.netflix.backend.dto.AuthResponse;
import com.netflix.backend.model.User;
import com.netflix.backend.repository.UserRepository;
import com.netflix.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    private static final String[] PROFILE_PICS = {
            "/avatar1.png", "/avatar2.png", "/avatar3.png" // Placeholder paths, update with actual logic
    };

    public AuthResponse signup(AuthRequest request) {
        if (request.getEmail() == null || request.getPassword() == null || request.getUsername() == null) {
            throw new IllegalArgumentException("All fields are required");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (request.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }

        // Random profile pic logic (simplified)
        String image = PROFILE_PICS[new Random().nextInt(PROFILE_PICS.length)];

        var user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setImage(image);

        userRepository.save(user);

        var token = jwtUtil.generateToken(user.getUsername());
        return AuthResponse.builder()
                .success(true)
                .user(user)
                .token(token)
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        var token = jwtUtil.generateToken(user.getUsername());
        return AuthResponse.builder()
                .success(true)
                .user(user)
                .token(token)
                .build();
    }
}
