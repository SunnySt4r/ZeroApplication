package com.example.ZeroApplication.security.service.impl;

import com.example.ZeroApplication.security.config.SecurityConfig;
import com.example.ZeroApplication.security.dto.UserDto;
import com.example.ZeroApplication.security.entity.User;
import com.example.ZeroApplication.security.repository.UserRepository;
import com.example.ZeroApplication.security.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userAccountRepository) {
        this.userRepository = userAccountRepository;
    }

    @Override
    public void createUser(UserDto userDto) {
        boolean isUsernameExists = this.userRepository.existsByUsername(userDto.getUsername());
        if (isUsernameExists) {
            throw new RuntimeException("Account with this username already exists");
        }
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        this.userRepository.save(user);
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }
}
