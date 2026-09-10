package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

@Entity
@Table(name = "learning_resources")
@Getter
@Setter
public class LearningResource extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    @JsonIgnore
    private Skill skill;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String url;

    private String resourceType; // YouTube, Documentation, Course, Article

    @Column(length = 1000)
    private String description;

    private boolean completed = false;
    
    @Column(name = "sequence_order")
    private Integer order;

    private LocalDate completionDate;
}
