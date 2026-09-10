package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;

@Entity
@Table(name = "coding_profiles")
@Getter
@Setter
public class CodingProfile extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;

    @Column(nullable = false)
    private String platform; // Codeforces, LeetCode, CodeChef

    @Column(nullable = false)
    private String handle;
    
    private String profileUrl;

    // Last successful sync from external API
    private LocalDateTime lastSynced;
    
    // Status: CONNECTED, SYNC_FAILED, NOT_CONNECTED
    private String syncStatus;

    @OneToOne(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private CodingStatistic statistics;
}
