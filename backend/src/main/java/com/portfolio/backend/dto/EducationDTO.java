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
@Schema(description = "Education information")
public class EducationDTO {

    @Schema(description = "Unique identifier", example = "1")
    private Long id;

    @NotBlank(message = "Institution name is required")
    @Size(min = 2, max = 200, message = "Institution name must be between 2 and 200 characters")
    @Schema(description = "Institution name", example = "University of Tunis", required = true)
    private String institution;

    @NotBlank(message = "Degree is required")
    @Size(min = 2, max = 200, message = "Degree must be between 2 and 200 characters")
    @Schema(description = "Degree obtained", example = "Bachelor's in Computer Science", required = true)
    private String degree;

    @Size(max = 200, message = "Field of study must not exceed 200 characters")
    @Schema(description = "Field of study", example = "Software Engineering")
    private String fieldOfStudy;

    @Size(max = 200, message = "Location must not exceed 200 characters")
    @Schema(description = "Institution location", example = "Tunis, Tunisia")
    private String location;

    @NotBlank(message = "Start date is required")
    @Size(max = 50, message = "Start date must not exceed 50 characters")
    @Schema(description = "Start date", example = "September 2018", required = true)
    private String startDate;

    @Size(max = 50, message = "End date must not exceed 50 characters")
    @Schema(description = "End date (null or 'Present' for ongoing)", example = "June 2022")
    private String endDate;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    @Schema(description = "Additional details and achievements")
    private String description;

    @Size(max = 20, message = "Grade must not exceed 20 characters")
    @Schema(description = "Grade or GPA", example = "3.8/4.0")
    private String grade;

    @Schema(description = "Display order", example = "1")
    private Integer displayOrder;
}
