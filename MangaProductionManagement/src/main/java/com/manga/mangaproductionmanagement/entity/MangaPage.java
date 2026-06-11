package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MangaPage")
@AttributeOverride(name = "id", column = @Column(name = "PageID"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MangaPage extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ChapterID", nullable = false)
	private Chapter chapter;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MangakaID", nullable = false)
	private Mangaka mangaka;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "AssistantID", nullable = false)
	private Assistant assistant;

	@Column(name = "PageNumber", nullable = false)
	private Integer pageNumber;

	@Column(name = "ImageURL", length = 255)
	private String imageUrl;

	@jakarta.persistence.Enumerated(jakarta.persistence.EnumType.STRING)
	@Column(name = "Status", length = 50)
	private MangaPageStatus status = MangaPageStatus.Pending;

	@Column(name = "DueDate")
	private LocalDate dueDate;

	@OneToMany(mappedBy = "page")
	private List<Submission> submissions = new ArrayList<>();
}


