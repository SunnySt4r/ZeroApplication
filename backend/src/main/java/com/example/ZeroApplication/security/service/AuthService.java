package com.example.ZeroApplication.security.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.example.ZeroApplication.security.dto.TokenDto;
import com.example.ZeroApplication.security.dto.UserDto;
import com.example.ZeroApplication.security.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    
    public TokenDto signUp(UserDto request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        userService.save(user);
        var jwt = jwtService.generateToken(user);
        return new TokenDto(jwt);
    }


  public TokenDto signIn(UserDto request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
        request.getUsername(),
        request.getPassword()
    ));

    var user = userService.userDetailsService()
        .loadUserByUsername(request.getUsername());
    var jwt = jwtService.generateToken(user);
    return new TokenDto(jwt);
  }
}
