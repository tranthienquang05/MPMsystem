package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Chapter")
@AttributeOverride(name = "id", column = @Column(name = "ChapterID"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chapter extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SeriesID", nullable = false)
	private Series series;

	@Column(name = "ChapterNumber", nullable = false)
	private Integer chapterNumber;

	@Column(name = "Title", length = 200)
	private String title;

	@jakarta.persistence.Enumerated(jakarta.persistence.EnumType.STRING)
	@Column(name = "Status", length = 50)
	private ChapterStatus status = ChapterStatus.Draft;

	@OneToMany(mappedBy = "chapter")
	private List<MangaPage> pages = new ArrayList<>();

	@OneToMany(mappedBy = "chapter")
	private List<PublicationSchedule> publicationSchedules = new ArrayList<>();
}


