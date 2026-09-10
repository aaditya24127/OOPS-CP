package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "coding_statistics")
@Getter
@Setter
public class CodingStatistic extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    @JsonIgnore
    private CodingProfile profile;

    private Integer rating;
    private String rankName;
    private Integer maxRating;
    private String maxRank;
    
    private Integer totalSolved;
    
    // Additional granular stats if available
    private Integer easySolved;
    private Integer mediumSolved;
    private Integer hardSolved;
    
    private Integer contestParticipationCount;
}
