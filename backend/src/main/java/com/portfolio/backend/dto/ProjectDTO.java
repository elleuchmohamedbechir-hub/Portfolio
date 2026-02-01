package com.portfolio.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Project information")
public class ProjectDTO {

    @Schema(description = "Unique identifier", example = "1")
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(min = 2, max = 200, message = "Title must be between 2 and 200 characters")
    @Schema(description = "Project title", example = "E-Commerce Platform", required = true)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    @Schema(description = "Project description", required = true)
    private String description;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    @Schema(description = "Project image URL")
    private String imageUrl;

    @Size(max = 500, message = "Demo URL must not exceed 500 characters")
    @Schema(description = "Live demo URL")
    private String demoUrl;

    @Size(max = 500, message = "GitHub URL must not exceed 500 characters")
    @Schema(description = "GitHub repository URL")
    private String githubUrl;

    @Schema(description = "Technologies used", example = "[\"React\", \"Spring Boot\", \"MySQL\"]")
    private List<String> technologies;

    @Size(max = 100, message = "Category must not exceed 100 characters")
    @Schema(description = "Project category", example = "Web Development")
    private String category;

    @Schema(description = "Featured project flag", example = "true")
    private Boolean featured;

    @Schema(description = "Display order", example = "1")
    private Integer displayOrder;

    @Schema(description = "Creation timestamp")
    private LocalDateTime createdAt;

    @Schema(description = "Last update timestamp")
    private LocalDateTime updatedAt;
}
