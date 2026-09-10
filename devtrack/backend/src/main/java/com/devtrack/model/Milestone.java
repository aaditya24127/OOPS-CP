package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

@Entity
@Table(name = "milestones")
@Getter
@Setter
public class Milestone extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    @JsonIgnore
    private Project project;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    private LocalDate date;
    private String status; // Pending, Achieved
}
