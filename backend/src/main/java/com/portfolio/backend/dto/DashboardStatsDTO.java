package com.portfolio.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Dashboard statistics")
public class DashboardStatsDTO {

    @Schema(description = "Total number of projects", example = "12")
    private Long totalProjects;

    @Schema(description = "Total number of skills", example = "25")
    private Long totalSkills;

    @Schema(description = "Total number of experiences", example = "5")
    private Long totalExperiences;

    @Schema(description = "Total number of education entries", example = "3")
    private Long totalEducation;

    @Schema(description = "Total number of languages", example = "4")
    private Long totalLanguages;

    @Schema(description = "Total number of interests", example = "6")
    private Long totalInterests;

    @Schema(description = "Total number of messages", example = "48")
    private Long totalMessages;

    @Schema(description = "Number of unread messages", example = "5")
    private Long unreadMessages;

    @Schema(description = "Number of read messages", example = "43")
    private Long readMessages;

    @Schema(description = "Recent messages")
    private List<ContactMessageDTO> recentMessages;
}
