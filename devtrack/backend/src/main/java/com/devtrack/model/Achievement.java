package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "achievements")
@Getter
@Setter
public class Achievement extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;

    @Column(nullable = false)
    private String title;

    private String category; // Certificate, Hackathon Achievement, Course Completion
    private String organization;

    @Column(length = 2000)
    private String description;

    private LocalDate dateAchieved;

    private String credentialId;
    private String credentialUrl;
    private String verificationUrl;

    // Verified, Verification Available, Not Verified, Self Added
    private String verificationStatus; 
    
    private String visibility; // Public, Private

    @ManyToMany
    @JoinTable(
        name = "achievement_skills",
        joinColumns = @JoinColumn(name = "achievement_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> associatedSkills = new ArrayList<>();
}
