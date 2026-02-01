package com.portfolio.backend.controller;

import com.portfolio.backend.dto.*;
import com.portfolio.backend.service.PortfolioService;
import com.portfolio.backend.util.TranslationHelper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Public Portfolio Controller
 * Handles all public-facing portfolio endpoints with multilingual support
 */
@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Portfolio", description = "Public portfolio endpoints")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final TranslationHelper translationHelper;

    @Operation(summary = "Get About section", description = "Retrieve personal information and bio")
    @GetMapping("/about")
    public ResponseEntity<AboutDTO> getAbout(
            @RequestHeader(value = "Accept-Language", defaultValue = "fr") String language) {
        String lang = extractLanguage(language);
        log.debug("GET /api/about - Fetching about section [lang={}]", lang);
        AboutDTO about = portfolioService.getAbout();

        if (about != null && about.getId() != null) {
            translationHelper.applyTranslations(about, "About", about.getId(), lang);
        }

        return about != null
                ? ResponseEntity.ok(about)
                : ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get all projects", description = "Retrieve all portfolio projects")
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> getProjects(
            @RequestHeader(value = "Accept-Language", defaultValue = "fr") String language) {
        String lang = extractLanguage(language);
        log.debug("GET /api/projects - Fetching all projects [lang={}]", lang);
        List<ProjectDTO> projects = portfolioService.getAllProjects();
        translationHelper.applyTranslationsToList(projects, "Project", lang);
        return ResponseEntity.ok(projects);
    }

    @Operation(summary = "Get all skills", description = "Retrieve all technical skills")
    @GetMapping("/skills")
    public ResponseEntity<List<SkillDTO>> getSkills(
            @RequestHeader(value = "Accept-Language", defaultValue = "fr") String language) {
        String lang = extractLanguage(language);
        log.debug("GET /api/skills - Fetching all skills [lang={}]", lang);
        List<SkillDTO> skills = portfolioService.getAllSkills();
        translationHelper.applyTranslationsToList(skills, "Skill", lang);
        return ResponseEntity.ok(skills);
    }

    @Operation(summary = "Get all experiences", description = "Retrieve all work experiences")
    @GetMapping("/experiences")
    public ResponseEntity<List<ExperienceDTO>> getExperiences(
            @RequestHeader(value = "Accept-Language", defaultValue = "fr") String language) {
        String lang = extractLanguage(language);
        log.debug("GET /api/experiences - Fetching all experiences [lang={}]", lang);
        List<ExperienceDTO> experiences = portfolioService.getAllExperiences();
        translationHelper.applyTranslationsToList(experiences, "Experience", lang);
        return ResponseEntity.ok(experiences);
    }

    @Operation(summary = "Get all education", description = "Retrieve all education entries")
    @GetMapping("/education")
    public ResponseEntity<List<EducationDTO>> getEducation(
            @RequestHeader(value = "Accept-Language", defaultValue = "fr") String language) {
        String lang = extractLanguage(language);
        log.debug("GET /api/education - Fetching all education [lang={}]", lang);
        List<EducationDTO> educations = portfolioService.getAllEducation();
        translationHelper.applyTranslationsToList(educations, "Education", lang);
        return ResponseEntity.ok(educations);
    }

    @Operation(summary = "Get all languages", description = "Retrieve all spoken languages")
    @GetMapping("/languages")
    public ResponseEntity<List<LanguageDTO>> getLanguages(
            @RequestHeader(value = "Accept-Language", defaultValue = "fr") String language) {
        String lang = extractLanguage(language);
        log.debug("GET /api/languages - Fetching all languages [lang={}]", lang);
        List<LanguageDTO> languages = portfolioService.getAllLanguages();
        translationHelper.applyTranslationsToList(languages, "Language", lang);
        return ResponseEntity.ok(languages);
    }

    @Operation(summary = "Get all interests", description = "Retrieve all personal interests")
    @GetMapping("/interests")
    public ResponseEntity<List<InterestDTO>> getInterests(
            @RequestHeader(value = "Accept-Language", defaultValue = "fr") String language) {
        String lang = extractLanguage(language);
        log.debug("GET /api/interests - Fetching all interests [lang={}]", lang);
        List<InterestDTO> interests = portfolioService.getAllInterests();
        translationHelper.applyTranslationsToList(interests, "Interest", lang);
        return ResponseEntity.ok(interests);
    }

    /**
     * Extract language code from Accept-Language header
     * Supports formats: "fr", "en", "fr-FR", "en-US"
     * Returns lowercase 2-letter ISO code
     */
    private String extractLanguage(String acceptLanguage) {
        if (acceptLanguage == null || acceptLanguage.trim().isEmpty()) {
            return "fr"; // Default to French
        }

        // Extract first language from comma-separated list
        String lang = acceptLanguage.split(",")[0].trim();

        // Extract language code (before hyphen if present)
        if (lang.contains("-")) {
            lang = lang.split("-")[0];
        }

        // Normalize to lowercase
        lang = lang.toLowerCase();

        // Validate supported languages
        if ("en".equals(lang) || "fr".equals(lang)) {
            return lang;
        }

        // Default to French for unsupported languages
        return "fr";
    }
}
