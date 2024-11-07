package com.example.ZeroApplication.security.service;

import com.example.ZeroApplication.security.entity.User;
import com.example.ZeroApplication.security.repository.UserRepository;
import com.example.ZeroApplication.security.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService{
    private final UserRepository userRepository;
    
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }


    public UserDetailsService userDetailsService() {
        return this::findUserByUsername;
    }


    public User getCurrentUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        return findUserByUsername(authentication.getName());
    }


    public void save(User user) {
        userRepository.save(user);
    }
}
