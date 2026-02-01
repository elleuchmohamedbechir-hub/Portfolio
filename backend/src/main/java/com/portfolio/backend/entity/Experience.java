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
@Table(name = "experiences")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String company;

    @Column(nullable = false, length = 200)
    private String position;

    @Column(length = 200)
    private String location;

    @Column(nullable = false, length = 50)
    private String startDate;

    @Column(length = 50)
    private String endDate;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    @Builder.Default
    private Boolean current = false;

    private Integer displayOrder;
}
