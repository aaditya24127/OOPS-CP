package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

@Entity
@Table(name = "hackathons")
@Getter
@Setter
public class Hackathon extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;

    @Column(nullable = false)
    private String name;
    
    private String organizer;
    private String hackathonLink;
    private String platform;
    
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate registrationDeadline;
    private LocalDate submissionDeadline;
    private LocalDate resultDate;
    
    @Enumerated(EnumType.STRING)
    private HackathonStatus status;
    
    @Column(length = 2000)
    private String description;
    
    private String teamName;
    private String role;
    private String prize;
}
