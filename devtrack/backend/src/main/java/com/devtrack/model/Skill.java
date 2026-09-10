package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skills")
@Getter
@Setter
public class Skill extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;

    @Column(nullable = false)
    private String name; // e.g., Python, Java, React

    private String category; // e.g., Frontend, Backend, Data Science

    private String currentLevel; // Beginner, Intermediate, Advanced
    private String targetLevel;

    @Column(length = 1000)
    private String learningGoal;
    
    @Column(length = 1000)
    private String description;

    @OneToMany(mappedBy = "skill", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LearningResource> resources = new ArrayList<>();

    @OneToMany(mappedBy = "skill", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PracticeProblem> practiceProblems = new ArrayList<>();
}
