package com.portfolio.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
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
@Schema(description = "About section information")
public class AboutDTO {

    @Schema(description = "Unique identifier", example = "1")
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Schema(description = "Full name", example = "Mohamed Bechir Elleuch", required = true)
    private String name;

    @NotBlank(message = "Title is required")
    @Size(min = 2, max = 150, message = "Title must be between 2 and 150 characters")
    @Schema(description = "Professional title", example = "Full-Stack Developer", required = true)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 2000 characters")
    @Schema(description = "Professional description", required = true)
    private String description;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Schema(description = "Contact email", example = "contact@example.com", required = true)
    private String email;

    @Size(max = 20, message = "Phone must not exceed 20 characters")
    @Schema(description = "Contact phone", example = "+216 12 345 678")
    private String phone;

    @Size(max = 200, message = "Location must not exceed 200 characters")
    @Schema(description = "Location", example = "Tunis, Tunisia")
    private String location;

    @Size(max = 500, message = "LinkedIn URL must not exceed 500 characters")
    @Schema(description = "LinkedIn profile URL")
    private String linkedinUrl;

    @Size(max = 500, message = "GitHub URL must not exceed 500 characters")
    @Schema(description = "GitHub profile URL")
    private String githubUrl;

    @Size(max = 500, message = "Twitter URL must not exceed 500 characters")
    @Schema(description = "Twitter profile URL")
    private String twitterUrl;

    @Size(max = 500, message = "Resume URL must not exceed 500 characters")
    @Schema(description = "Resume/CV download URL")
    private String resumeUrl;

    @Size(max = 500, message = "Profile image URL must not exceed 500 characters")
    @Schema(description = "Profile image URL")
    private String profileImageUrl;
}
