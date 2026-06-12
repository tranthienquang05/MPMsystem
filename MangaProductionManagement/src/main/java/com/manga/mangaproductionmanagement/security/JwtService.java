package com.manga.mangaproductionmanagement.security;

import com.manga.mangaproductionmanagement.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtService {

	@Value("${jwt.secret}")
	private String jwtSecret;

	@Value("${jwt.expirationMs:86400000}")
	private long jwtExpirationMs;

	public String generateToken(User user) {
		Date now = new Date();
		Date expiry = new Date(now.getTime() + jwtExpirationMs);

		return Jwts.builder()
				.setSubject(user.getEmail() != null ? user.getEmail() : String.valueOf(user.getId()))
				.claim("id", user.getId())
				.claim("fullName", user.getFullName())
				.setIssuedAt(now)
				.setExpiration(expiry)
				.signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
				.compact();
	}
}
