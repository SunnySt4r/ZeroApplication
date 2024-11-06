package com.example.ZeroApplication.security.controller;

import com.example.ZeroApplication.security.dto.UserDto;
import com.example.ZeroApplication.security.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody UserDto userDto) {
        userService.createUser(userDto);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.CREATED)
    public void loginAccount() {;
    }
}
