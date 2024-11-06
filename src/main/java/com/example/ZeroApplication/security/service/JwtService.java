package com.example.ZeroApplication.security.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.ZeroApplication.security.entity.User;

@Service
public class JwtService {

  @Value("${token.signing.key}")
  private String jwtSigningKey;


  public String extractUserName(String token) {
    return extractClaim(token, Claims::getSubject);
  }


  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    if (userDetails instanceof User customUserDetails) {
      claims.put("id", customUserDetails.getId());
      claims.put("username", customUserDetails.getUsername());
    }
    return generateToken(claims, userDetails);
  }


  private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
    return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 100000 * 60 * 24))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
  }


  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String userName = extractUserName(token);
    return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
  }


  private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
    final Claims claims = extractAllClaims(token);
    return claimsResolvers.apply(claims);
  }


  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }


  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }


  private Claims extractAllClaims(String token) {
    return Jwts.parser().setSigningKey(getSigningKey()).build().parseClaimsJws(token)
        .getBody();
  }


  private Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(jwtSigningKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
