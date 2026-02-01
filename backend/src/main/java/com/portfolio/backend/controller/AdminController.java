package com.portfolio.backend.controller;

import com.portfolio.backend.dto.*;
import com.portfolio.backend.entity.MessageStatus;
import com.portfolio.backend.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Admin Controller
 * Handles all admin CRUD operations for portfolio management
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin endpoints for portfolio management")
public class AdminController {

    private final AdminService adminService;

    // ==================== DASHBOARD ====================

    @Operation(summary = "Get dashboard statistics", description = "Retrieve dashboard stats including counts and recent messages")
    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        log.debug("GET /api/v1/admin/dashboard/stats");
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    // ==================== ABOUT ====================

    @Operation(summary = "Get About section", description = "Retrieve About section for editing")
    @GetMapping("/about")
    public ResponseEntity<AboutDTO> getAbout() {
        log.debug("GET /api/v1/admin/about");
        AboutDTO about = adminService.getAbout();
        return about != null
                ? ResponseEntity.ok(about)
                : ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update About section", description = "Create or update About section")
    @PutMapping("/about")
    public ResponseEntity<AboutDTO> updateAbout(@Valid @RequestBody AboutDTO aboutDTO) {
        log.info("PUT /api/v1/admin/about - Updating About section");
        return ResponseEntity.ok(adminService.saveAbout(aboutDTO));
    }

    // ==================== PROJECTS ====================

    @Operation(summary = "Get all projects", description = "Retrieve all projects for management")
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        log.debug("GET /api/v1/admin/projects");
        return ResponseEntity.ok(adminService.getAllProjects());
    }

    @Operation(summary = "Create project", description = "Create a new project")
    @PostMapping("/projects")
    public ResponseEntity<ProjectDTO> createProject(@Valid @RequestBody ProjectDTO projectDTO) {
        log.info("POST /api/v1/admin/projects - Creating new project: {}", projectDTO.getTitle());
        ProjectDTO created = adminService.saveProject(projectDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Operation(summary = "Update project", description = "Update an existing project")
    @PutMapping("/projects/{id}")
    public ResponseEntity<ProjectDTO> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectDTO projectDTO) {
        log.info("PUT /api/v1/admin/projects/{} - Updating project", id);
        projectDTO.setId(id);
        return ResponseEntity.ok(adminService.saveProject(projectDTO));
    }

    @Operation(summary = "Delete project", description = "Delete a project by ID")
    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/projects/{}", id);
        adminService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== SKILLS ====================

    @Operation(summary = "Get all skills", description = "Retrieve all skills for management")
    @GetMapping("/skills")
    public ResponseEntity<List<SkillDTO>> getAllSkills() {
        log.debug("GET /api/v1/admin/skills");
        return ResponseEntity.ok(adminService.getAllSkills());
    }

    @Operation(summary = "Create skill", description = "Create a new skill")
    @PostMapping("/skills")
    public ResponseEntity<SkillDTO> createSkill(@Valid @RequestBody SkillDTO skillDTO) {
        log.info("POST /api/v1/admin/skills - Creating new skill: {}", skillDTO.getName());
        SkillDTO created = adminService.saveSkill(skillDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Operation(summary = "Update skill", description = "Update an existing skill")
    @PutMapping("/skills/{id}")
    public ResponseEntity<SkillDTO> updateSkill(
            @PathVariable Long id,
            @Valid @RequestBody SkillDTO skillDTO) {
        log.info("PUT /api/v1/admin/skills/{} - Updating skill", id);
        skillDTO.setId(id);
        return ResponseEntity.ok(adminService.saveSkill(skillDTO));
    }

    @Operation(summary = "Delete skill", description = "Delete a skill by ID")
    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/skills/{}", id);
        adminService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== EXPERIENCES ====================

    @Operation(summary = "Get all experiences", description = "Retrieve all work experiences for management")
    @GetMapping("/experiences")
    public ResponseEntity<List<ExperienceDTO>> getAllExperiences() {
        log.debug("GET /api/v1/admin/experiences");
        return ResponseEntity.ok(adminService.getAllExperiences());
    }

    @Operation(summary = "Create experience", description = "Create a new work experience")
    @PostMapping("/experiences")
    public ResponseEntity<ExperienceDTO> createExperience(@Valid @RequestBody ExperienceDTO experienceDTO) {
        log.info("POST /api/v1/admin/experiences - Creating new experience");
        ExperienceDTO created = adminService.saveExperience(experienceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Operation(summary = "Update experience", description = "Update an existing work experience")
    @PutMapping("/experiences/{id}")
    public ResponseEntity<ExperienceDTO> updateExperience(
            @PathVariable Long id,
            @Valid @RequestBody ExperienceDTO experienceDTO) {
        log.info("PUT /api/v1/admin/experiences/{} - Updating experience", id);
        experienceDTO.setId(id);
        return ResponseEntity.ok(adminService.saveExperience(experienceDTO));
    }

    @Operation(summary = "Delete experience", description = "Delete a work experience by ID")
    @DeleteMapping("/experiences/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/experiences/{}", id);
        adminService.deleteExperience(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== EDUCATION ====================

    @Operation(summary = "Get all education", description = "Retrieve all education entries for management")
    @GetMapping("/education")
    public ResponseEntity<List<EducationDTO>> getAllEducation() {
        log.debug("GET /api/v1/admin/education");
        return ResponseEntity.ok(adminService.getAllEducation());
    }

    @Operation(summary = "Create education", description = "Create a new education entry")
    @PostMapping("/education")
    public ResponseEntity<EducationDTO> createEducation(@Valid @RequestBody EducationDTO educationDTO) {
        log.info("POST /api/v1/admin/education - Creating new education entry");
        EducationDTO created = adminService.saveEducation(educationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Operation(summary = "Update education", description = "Update an existing education entry")
    @PutMapping("/education/{id}")
    public ResponseEntity<EducationDTO> updateEducation(
            @PathVariable Long id,
            @Valid @RequestBody EducationDTO educationDTO) {
        log.info("PUT /api/v1/admin/education/{} - Updating education", id);
        educationDTO.setId(id);
        return ResponseEntity.ok(adminService.saveEducation(educationDTO));
    }

    @Operation(summary = "Delete education", description = "Delete an education entry by ID")
    @DeleteMapping("/education/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/education/{}", id);
        adminService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== LANGUAGES ====================

    @Operation(summary = "Get all languages", description = "Retrieve all languages for management")
    @GetMapping("/languages")
    public ResponseEntity<List<LanguageDTO>> getAllLanguages() {
        log.debug("GET /api/v1/admin/languages");
        return ResponseEntity.ok(adminService.getAllLanguages());
    }

    @Operation(summary = "Create language", description = "Create a new language")
    @PostMapping("/languages")
    public ResponseEntity<LanguageDTO> createLanguage(@Valid @RequestBody LanguageDTO languageDTO) {
        log.info("POST /api/v1/admin/languages - Creating new language");
        LanguageDTO created = adminService.saveLanguage(languageDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Operation(summary = "Update language", description = "Update an existing language")
    @PutMapping("/languages/{id}")
    public ResponseEntity<LanguageDTO> updateLanguage(
            @PathVariable Long id,
            @Valid @RequestBody LanguageDTO languageDTO) {
        log.info("PUT /api/v1/admin/languages/{} - Updating language", id);
        languageDTO.setId(id);
        return ResponseEntity.ok(adminService.saveLanguage(languageDTO));
    }

    @Operation(summary = "Delete language", description = "Delete a language by ID")
    @DeleteMapping("/languages/{id}")
    public ResponseEntity<Void> deleteLanguage(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/languages/{}", id);
        adminService.deleteLanguage(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== INTERESTS ====================

    @Operation(summary = "Get all interests", description = "Retrieve all interests for management")
    @GetMapping("/interests")
    public ResponseEntity<List<InterestDTO>> getAllInterests() {
        log.debug("GET /api/v1/admin/interests");
        return ResponseEntity.ok(adminService.getAllInterests());
    }

    @Operation(summary = "Create interest", description = "Create a new interest")
    @PostMapping("/interests")
    public ResponseEntity<InterestDTO> createInterest(@Valid @RequestBody InterestDTO interestDTO) {
        log.info("POST /api/v1/admin/interests - Creating new interest");
        InterestDTO created = adminService.saveInterest(interestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Operation(summary = "Update interest", description = "Update an existing interest")
    @PutMapping("/interests/{id}")
    public ResponseEntity<InterestDTO> updateInterest(
            @PathVariable Long id,
            @Valid @RequestBody InterestDTO interestDTO) {
        log.info("PUT /api/v1/admin/interests/{} - Updating interest", id);
        interestDTO.setId(id);
        return ResponseEntity.ok(adminService.saveInterest(interestDTO));
    }

    @Operation(summary = "Delete interest", description = "Delete an interest by ID")
    @DeleteMapping("/interests/{id}")
    public ResponseEntity<Void> deleteInterest(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/interests/{}", id);
        adminService.deleteInterest(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== MESSAGES ====================

    @Operation(summary = "Get contact messages", description = "Retrieve all contact messages, optionally filtered by status")
    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessageDTO>> getMessages(
            @RequestParam(required = false) MessageStatus status) {
        log.debug("GET /api/v1/admin/messages - Status filter: {}", status);
        return ResponseEntity.ok(adminService.getMessages(status));
    }

    @Operation(summary = "Mark message as read", description = "Mark a contact message as read")
    @PutMapping("/messages/{id}/read")
    public ResponseEntity<ContactMessageDTO> markAsRead(@PathVariable Long id) {
        log.info("PUT /api/v1/admin/messages/{}/read", id);
        return ResponseEntity.ok(adminService.markMessageAsRead(id));
    }

    @Operation(summary = "Delete message", description = "Delete a contact message by ID")
    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/messages/{}", id);
        adminService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}
