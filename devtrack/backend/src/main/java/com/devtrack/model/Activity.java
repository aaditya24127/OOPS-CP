package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "activities")
@Getter
@Setter
public class Activity extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;

    @Column(nullable = false)
    private String activityType; // e.g., "PROFILE_UPDATE", "HACKATHON_ADDED"
    
    @Column(nullable = false, length = 1000)
    private String description;
}
