package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Proposal")
@AttributeOverride(name = "id", column = @Column(name = "ProposalID"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Proposal extends BaseEntity {

	@Column(name = "Title", nullable = false, length = 200)
	private String title;

	@Column(name = "Synopsis", length = 4000)
	private String synopsis;

	@Column(name = "Genre", length = 50)
	private String genre;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MangakaID", nullable = false)
	private Mangaka mangaka;

	@Column(name = "SubmissionDate")
	private LocalDateTime submissionDate;

	@jakarta.persistence.Enumerated(jakarta.persistence.EnumType.STRING)
	@Column(name = "Status", length = 50)
	private ProposalStatus status = ProposalStatus.Draft;

	@OneToMany(mappedBy = "proposal")
	private List<EditorialVote> editorialVotes = new ArrayList<>();
}


