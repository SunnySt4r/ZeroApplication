package com.example.ZeroApplication.security.service;

import com.example.ZeroApplication.security.dto.UserDto;
import com.example.ZeroApplication.security.entity.User;

import java.util.Optional;

public interface UserService {
    void createUser(UserDto userDto);
    Optional<User> findUserByUsername(String username);
}
