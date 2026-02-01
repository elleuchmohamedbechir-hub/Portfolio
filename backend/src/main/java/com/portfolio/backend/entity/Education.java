package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "educations")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String institution;

    @Column(nullable = false, length = 200)
    private String degree;

    @Column(length = 200)
    private String fieldOfStudy;

    @Column(length = 200)
    private String location;

    @Column(nullable = false, length = 50)
    private String startDate;

    @Column(length = 50)
    private String endDate;

    @Column(length = 2000)
    private String description;

    @Column(length = 20)
    private String grade;

    private Integer displayOrder;
}
