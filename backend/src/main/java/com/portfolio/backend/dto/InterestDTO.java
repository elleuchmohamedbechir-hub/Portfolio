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
@Schema(description = "Personal interest information")
public class InterestDTO {

    @Schema(description = "Unique identifier", example = "1")
    private Long id;

    @NotBlank(message = "Interest name is required")
    @Size(min = 2, max = 100, message = "Interest name must be between 2 and 100 characters")
    @Schema(description = "Interest name", example = "Open Source Contribution", required = true)
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Schema(description = "Interest description")
    private String description;

    @Size(max = 100, message = "Icon must not exceed 100 characters")
    @Schema(description = "Icon identifier", example = "code")
    private String icon;

    @Schema(description = "Display order", example = "1")
    private Integer displayOrder;
}
