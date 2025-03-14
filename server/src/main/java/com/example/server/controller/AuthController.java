package com.example.server.controller;



import com.example.server.request.auth.AuthenticationRequest;
import com.example.server.request.auth.RegisterRequest;
import com.example.server.response.AuthenticationResponse;
import com.example.server.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }
}