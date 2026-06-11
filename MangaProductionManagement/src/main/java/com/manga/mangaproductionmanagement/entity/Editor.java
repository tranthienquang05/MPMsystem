package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Editor")
@AttributeOverride(name = "id", column = @Column(name = "EditorID"))
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Editor extends BaseEntity {

	@OneToOne
	@JoinColumn(name = "UserID", nullable = false, unique = true)
	private User user;

	@Column(name = "Department")
	private String department;

	// Bidirectional relation available on Mangaka side (Mangaka.editor)
}



