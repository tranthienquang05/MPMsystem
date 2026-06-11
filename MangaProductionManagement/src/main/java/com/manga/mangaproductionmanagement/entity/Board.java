package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
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
@Table(name = "Board")
@AttributeOverride(name = "id", column = @Column(name = "BoardID"))
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board extends BaseEntity {

	@OneToOne
	@JoinColumn(name = "UserID", nullable = false, unique = true)
	private User user;

	@Column(name = "Position", length = 100)
	private String position;

	@OneToMany(mappedBy = "board")
	private List<EditorialVote> editorialVotes = new ArrayList<>();
}



