package com.netflix.backend.controller;

import com.netflix.backend.dto.AuthRequest;
import com.netflix.backend.dto.AuthResponse;
import com.netflix.backend.model.User;
import com.netflix.backend.repository.UserRepository;
import com.netflix.backend.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody AuthRequest request, HttpServletResponse response) {
        AuthResponse authResponse = authService.signup(request);
        setCookie(response, authResponse.getToken());
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request, HttpServletResponse response) {
        AuthResponse authResponse = authService.login(request);
        setCookie(response, authResponse.getToken());
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(HttpServletResponse response) {
        clearCookie(response);
        return ResponseEntity.ok(AuthResponse.builder().success(true).message("Logged out successfully").build());
    }

    private void setCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("jwt-netflix", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Set to true if using HTTPS in production
        cookie.setPath("/");
        cookie.setMaxAge(15 * 24 * 60 * 60); // 15 days
        // cookie.setSameSite("Strict"); // Java Servlet API might need custom header
        // for SameSite if not supported directly
        response.addCookie(cookie);
    }

    private void clearCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt-netflix", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    @GetMapping("/authCheck")
    public ResponseEntity<AuthResponse> authCheck(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401)
                    .body(AuthResponse.builder().success(false).message("Unauthorized").build());
        }
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElse(null);
        return ResponseEntity.ok(AuthResponse.builder().success(true).user(user).build());
    }
}
