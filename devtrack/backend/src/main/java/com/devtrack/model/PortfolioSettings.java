package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "portfolio_settings")
@Getter
@Setter
public class PortfolioSettings extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;

    private boolean isPublic = false;
    
    @Column(unique = true)
    private String customUrl; // username for devtrack/profile/{username}
    
    private String theme; // Clean, Developer, Minimal
    
    @Column(columnDefinition = "TEXT")
    private String visibleSectionsConfig; // JSON config of visible modules
}
