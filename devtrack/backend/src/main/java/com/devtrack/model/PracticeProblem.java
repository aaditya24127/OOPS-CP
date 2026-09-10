package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

@Entity
@Table(name = "practice_problems")
@Getter
@Setter
public class PracticeProblem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    @JsonIgnore
    private Skill skill;

    @Column(nullable = false)
    private String problemTitle;

    private String problemLink;
    
    private String difficulty; // Easy, Medium, Hard
    private String topic;

    @Column(columnDefinition = "TEXT")
    private String solutionCode;

    @Column(length = 2000)
    private String notes;

    private LocalDate dateSolved;
}
