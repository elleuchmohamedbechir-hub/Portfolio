package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Translation entity for storing multilingual content
 * Supports dynamic translation of any entity field
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "translations", uniqueConstraints = @UniqueConstraint(columnNames = { "entity_type", "entity_id",
        "field_name", "language" }))
public class Translation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Entity type (e.g., "Project", "Skill", "Experience")
     */
    @Column(name = "entity_type", nullable = false, length = 50)
    private String entityType;

    /**
     * ID of the entity being translated
     */
    @Column(name = "entity_id", nullable = false)
    private Long entityId;

    /**
     * Field name being translated (e.g., "title", "description")
     */
    @Column(name = "field_name", nullable = false, length = 50)
    private String fieldName;

    /**
     * Language code (ISO 639-1: "fr", "en", "ar", "es", etc.)
     */
    @Column(name = "language", nullable = false, length = 5)
    private String language;

    /**
     * Translated value
     */
    @Column(name = "value", columnDefinition = "TEXT")
    private String value;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
