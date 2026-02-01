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
@Schema(description = "Language proficiency information")
public class LanguageDTO {

    @Schema(description = "Unique identifier", example = "1")
    private Long id;

    @NotBlank(message = "Language name is required")
    @Size(min = 2, max = 100, message = "Language name must be between 2 and 100 characters")
    @Schema(description = "Language name", example = "English", required = true)
    private String name;

    @NotBlank(message = "Proficiency level is required")
    @Size(min = 2, max = 50, message = "Proficiency must be between 2 and 50 characters")
    @Schema(description = "Proficiency level", example = "Fluent", required = true)
    private String proficiency;

    @Min(value = 0, message = "Proficiency percentage must be at least 0")
    @Max(value = 100, message = "Proficiency percentage must not exceed 100")
    @Schema(description = "Proficiency percentage (0-100)", example = "95")
    private Integer proficiencyPercentage;

    @Schema(description = "Display order", example = "1")
    private Integer displayOrder;
}
