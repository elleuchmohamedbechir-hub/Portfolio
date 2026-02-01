package com.portfolio.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Work experience information")
public class ExperienceDTO {

    @Schema(description = "Unique identifier", example = "1")
    private Long id;

    @NotBlank(message = "Company name is required")
    @Size(min = 2, max = 200, message = "Company name must be between 2 and 200 characters")
    @Schema(description = "Company name", example = "Tech Solutions Inc.", required = true)
    private String company;

    @NotBlank(message = "Position is required")
    @Size(min = 2, max = 200, message = "Position must be between 2 and 200 characters")
    @Schema(description = "Job position", example = "Senior Full-Stack Developer", required = true)
    private String position;

    @Size(max = 200, message = "Location must not exceed 200 characters")
    @Schema(description = "Work location", example = "Tunis, Tunisia")
    private String location;

    @NotBlank(message = "Start date is required")
    @Size(max = 50, message = "Start date must not exceed 50 characters")
    @Schema(description = "Start date", example = "January 2022", required = true)
    private String startDate;

    @Size(max = 50, message = "End date must not exceed 50 characters")
    @Schema(description = "End date (null or 'Present' for current)", example = "Present")
    private String endDate;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    @Schema(description = "Job description and responsibilities")
    private String description;

    @Schema(description = "Currently working here", example = "true")
    private Boolean current;

    @Schema(description = "Display order", example = "1")
    private Integer displayOrder;
}
