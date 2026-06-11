package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "PublicationSchedule")
@AttributeOverride(name = "id", column = @Column(name = "ScheduleID"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublicationSchedule extends BaseEntity {

	@OneToOne
	@JoinColumn(name = "ChapterID", nullable = false, unique = true)
	private Chapter chapter;

	@Column(name = "PlannedDate")
	private LocalDate plannedDate;

	@Column(name = "ActualDate")
	private LocalDate actualDate;

	@jakarta.persistence.Enumerated(jakarta.persistence.EnumType.STRING)
	@Column(name = "Status", length = 50)
	private PublicationStatus status = PublicationStatus.Planned;
}


