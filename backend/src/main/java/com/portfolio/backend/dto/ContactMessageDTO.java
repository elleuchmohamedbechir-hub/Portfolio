package com.portfolio.backend.dto;

import com.portfolio.backend.entity.MessageStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Contact message information")
public class ContactMessageDTO {

    @Schema(description = "Unique identifier", example = "1")
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Schema(description = "Sender name", example = "John Doe", required = true)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Schema(description = "Sender email", example = "john.doe@example.com", required = true)
    private String email;

    @NotBlank(message = "Subject is required")
    @Size(min = 3, max = 200, message = "Subject must be between 3 and 200 characters")
    @Schema(description = "Message subject", example = "Project Inquiry", required = true)
    private String subject;

    @NotBlank(message = "Message is required")
    @Size(min = 10, max = 2000, message = "Message must be between 10 and 2000 characters")
    @Schema(description = "Message content", required = true)
    private String message;

    @Schema(description = "Message status", example = "UNREAD")
    private MessageStatus status;

    @Schema(description = "Message received timestamp")
    private LocalDateTime createdAt;

    @Schema(description = "Message read timestamp")
    private LocalDateTime readAt;
}
