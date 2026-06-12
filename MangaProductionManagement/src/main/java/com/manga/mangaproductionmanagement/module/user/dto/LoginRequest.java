package com.manga.mangaproductionmanagement.user.dto;

import lombok.Data;

/**
 * DTO for login requests. Accepts either username/fullName or email in the
 * usernameOrEmail field and a raw password.
 */
@Data
public class LoginRequest {
	private String usernameOrEmail;
	private String password;
}
