package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Submission")
@AttributeOverride(name = "id", column = @Column(name = "SubmissionID"))
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PageID", nullable = false)
	private MangaPage page;

	@Column(name = "Version", nullable = false)
	private Integer version = 1;

	@Column(name = "FileURL", length = 255, nullable = false)
	private String fileUrl;

	@Column(name = "ReviewComment", length = 2000)
	private String reviewComment;

	@jakarta.persistence.Enumerated(jakarta.persistence.EnumType.STRING)
	@Column(name = "Status", length = 50)
	private SubmissionStatus status = SubmissionStatus.PendingReview;

	@Column(name = "SubmittedAt")
	private LocalDateTime submittedAt;
}



