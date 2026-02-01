package com.portfolio.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
@Schema(description = "Skill information")
public class SkillDTO {

    @Schema(description = "Unique identifier", example = "1")
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    @Schema(description = "Skill name", example = "Java", required = true)
    private String name;

    @Size(max = 100, message = "Category must not exceed 100 characters")
    @Schema(description = "Skill category", example = "Backend")
    private String category;

    @Min(value = 0, message = "Proficiency level must be at least 0")
    @Max(value = 100, message = "Proficiency level must not exceed 100")
    @Schema(description = "Proficiency level (0-100)", example = "85")
    private Integer proficiencyLevel;

    @Size(max = 500, message = "Icon URL must not exceed 500 characters")
    @Schema(description = "Skill icon URL")
    private String iconUrl;

    @Schema(description = "Display order", example = "1")
    private Integer displayOrder;
}
