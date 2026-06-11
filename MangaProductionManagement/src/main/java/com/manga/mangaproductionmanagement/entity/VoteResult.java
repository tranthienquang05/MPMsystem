package com.manga.mangaproductionmanagement.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "VoteResult")
@AttributeOverride(name = "id", column = @Column(name = "VoteResultID"))
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoteResult extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SeriesID", nullable = false)
    private Series series;

    @Column(name = "VotePeriod")
    private LocalDate votePeriod;

    @Column(name = "TotalVotes")
    private Integer totalVotes = 0;

    @Column(name = "Ranking")
    private Integer ranking;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;
}


