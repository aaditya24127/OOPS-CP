package com.devtrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Getter
@Setter
public class Task extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    @JsonIgnore
    private Project project;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    private String priority; // Low, Medium, High
    private String status; // Todo, In Progress, Completed

    private LocalDate deadline;
}
