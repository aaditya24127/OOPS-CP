package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "resumes")
@Getter
@Setter
public class Resume extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;

    @Column(nullable = false)
    private String name; // e.g., "Software Developer Resume"

    private String targetRole; // e.g., "Java Developer"
    
    private String template; // Modern, Classic, Minimal

    // JSON string storing the configuration of which sections/items are included/hidden
    // In a full enterprise app, this would be a separate normalized entity (ResumeSection),
    // but storing it as a config payload simplifies the builder logic significantly.
    @Column(columnDefinition = "TEXT")
    private String layoutConfig;
}
