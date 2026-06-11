package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Assistant")
@AttributeOverride(name = "id", column = @Column(name = "AssistantID"))
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assistant extends BaseEntity {

	@OneToOne
	@JoinColumn(name = "UserID", nullable = false, unique = true)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MangakaID", nullable = false)
	private Mangaka mangaka;

	@Column(name = "Specialization", length = 100)
	private String specialization;
}



