package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@Getter
@Setter
public class Project extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String shortDescription;

    @Column(length = 2000)
    private String problemStatement;
    
    @Column(length = 2000)
    private String solution;

    private String category;
    private String projectType; // Academic, Personal, Hackathon, Open Source
    private String status; // Idea, Planning, In Progress, Testing, Completed, On Hold

    @Column(length = 1000)
    private String techStack;

    private String githubUrl;
    private String liveDemoUrl;
    private String documentationUrl;

    private LocalDate startDate;
    private LocalDate expectedCompletionDate;
    private LocalDate completionDate;
    
    private boolean showOnPublicPortfolio = false;

    @ManyToMany
    @JoinTable(
        name = "project_skills",
        joinColumns = @JoinColumn(name = "project_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skillsUsed = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Milestone> milestones = new ArrayList<>();
}
