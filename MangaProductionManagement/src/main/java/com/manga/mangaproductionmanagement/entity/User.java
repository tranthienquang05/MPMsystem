package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "User")
@AttributeOverride(name = "id", column = @Column(name = "UserID"))
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

	@Column(name = "FullName", length = 100, nullable = false)
	private String fullName;

	@Column(name = "Email", length = 100, nullable = false, unique = true)
	private String email;

	@Column(name = "PasswordHash", length = 255, nullable = false)
	private String passwordHash;

	@Enumerated(EnumType.STRING)
	@Column(name = "Status", length = 20, nullable = false)
	private UserStatus status = UserStatus.Active;
}



