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
@Table(name = "Series")
@AttributeOverride(name = "id", column = @Column(name = "SeriesID"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Series extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ProposalID", unique = true)
	private Proposal proposal;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MangakaID", nullable = false)
	private Mangaka mangaka;

	@Column(name = "Title", nullable = false, length = 200)
	private String title;

	@Column(name = "Description", length = 4000)
	private String description;

	@jakarta.persistence.Enumerated(jakarta.persistence.EnumType.STRING)
	@Column(name = "Status", length = 50)
	private SeriesStatus status = SeriesStatus.Ongoing;

	@Column(name = "StartDate")
	private LocalDate startDate;

	@OneToMany(mappedBy = "series")
	private List<Chapter> chapters = new ArrayList<>();
}


