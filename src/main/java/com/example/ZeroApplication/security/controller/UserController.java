package com.example.ZeroApplication.security.controller;

import com.example.ZeroApplication.security.dto.TokenDto;
import com.example.ZeroApplication.security.dto.UserDto;
import com.example.ZeroApplication.security.service.AuthService;
import com.example.ZeroApplication.security.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/reg")
    public ResponseEntity<TokenDto> registerAccount(@Valid @RequestBody UserDto userDto) {
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        return ResponseEntity.ok(authService.signUp(userDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> loginAccount(@Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(authService.signIn(userDto));
    }
}
