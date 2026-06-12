package com.manga.mangaproductionmanagement.user;

import com.manga.mangaproductionmanagement.entity.User;
import com.manga.mangaproductionmanagement.entity.UserStatus;
import com.manga.mangaproductionmanagement.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public Map<String, Object> authenticate(String usernameOrEmail, String rawPassword) {
		if (usernameOrEmail == null || rawPassword == null) {
			throw new BadCredentialsException("Username/email and password must be provided");
		}

		Optional<User> userOpt = userRepository.findByEmail(usernameOrEmail);
		if (userOpt.isEmpty()) {
			userOpt = userRepository.findByFullName(usernameOrEmail);
		}

		User user = userOpt.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		if (user.getStatus() != UserStatus.Active) {
			throw new BadCredentialsException("User is not active");
		}

		if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
			throw new BadCredentialsException("Invalid credentials");
		}

		String token = jwtService.generateToken(user);

		Map<String, Object> userInfo = new HashMap<>();
		userInfo.put("id", user.getId());
		userInfo.put("fullName", user.getFullName());
		userInfo.put("email", user.getEmail());

		Map<String, Object> result = new HashMap<>();
		result.put("token", token);
		result.put("user", userInfo);
		return result;
	}
}
