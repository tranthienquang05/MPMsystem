package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "EditorialVote", uniqueConstraints = @UniqueConstraint(columnNames = {"ProposalID", "BoardID"}))
@AttributeOverride(name = "id", column = @Column(name = "VoteID"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EditorialVote extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ProposalID", nullable = false)
	private Proposal proposal;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "BoardID", nullable = false)
	private Board board;

	@jakarta.persistence.Enumerated(jakarta.persistence.EnumType.STRING)
	@Column(name = "VoteResult")
	private VoteResultType voteResult;

	@Column(name = "Comment", length = 2000)
	private String comment;

	@Column(name = "VoteDate")
	private LocalDateTime voteDate;
}


