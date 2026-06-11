package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Mangaka")
@AttributeOverride(name = "id", column = @Column(name = "MangakaID"))
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mangaka extends BaseEntity {

	@OneToOne
	@JoinColumn(name = "UserID", nullable = false, unique = true)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "EditorID", nullable = false)
	private Editor editor;

	@Column(name = "PenName", length = 100)
	private String penName;

	@Column(name = "Biography", length = 4000)
	private String biography;

	// Relations available on the other side (Assistant.mangaka, Proposal.mangaka, Series.mangaka, MangaPage.mangaka)
}



