package com.portfolio.backend.config;

import com.portfolio.backend.repository.*;
import com.portfolio.backend.service.TranslationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.HashMap;
import java.util.Map;

/**
 * Sample Translation Data Loader
 * Loads sample English translations for existing French data
 */
@Slf4j
@Configuration
@Profile("dev") // Only run in development
@RequiredArgsConstructor
public class TranslationDataLoader {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final AboutRepository aboutRepository;
    private final TranslationService translationService;

    @Bean
    public CommandLineRunner loadTranslations() {
        return args -> {
            log.info("🌍 Loading sample English translations...");

            // Load translations for Projects
            loadProjectTranslations();

            // Load translations for Skills
            loadSkillTranslations();

            // Load translations for Experiences
            loadExperienceTranslations();

            // Load translations for Education
            loadEducationTranslations();

            // Load translations for About
            loadAboutTranslations();

            log.info("✅ Sample translations loaded successfully!");
        };
    }

    private void loadProjectTranslations() {
        projectRepository.findAll().forEach(project -> {
            Map<String, String> translations = new HashMap<>();

            // Sample English translations (customize these based on your actual data)
            if (project.getTitle() != null && project.getTitle().contains("Gestion")) {
                translations.put("title", "School Management System");
                translations.put("description",
                        "A comprehensive school management platform with student tracking, grade management, and parent communication features.");
            } else if (project.getTitle() != null) {
                // Generic translation - you should customize this
                translations.put("title", project.getTitle() + " (EN)");
                if (project.getDescription() != null) {
                    translations.put("description", project.getDescription() + " (English version)");
                }
            }

            if (!translations.isEmpty()) {
                translationService.saveEntityTranslations("Project", project.getId(), "en", translations);
                log.debug("Added English translations for project: {}", project.getTitle());
            }
        });
    }

    private void loadSkillTranslations() {
        skillRepository.findAll().forEach(skill -> {
            // Skills usually have universal names (React, Java, etc.)
            // Only translate category if needed
            if (skill.getCategory() != null) {
                Map<String, String> translations = new HashMap<>();

                switch (skill.getCategory().toLowerCase()) {
                    case "frontend":
                        translations.put("category", "Frontend");
                        break;
                    case "backend":
                        translations.put("category", "Backend");
                        break;
                    case "base de données":
                    case "database":
                        translations.put("category", "Database");
                        break;
                    case "outils":
                    case "tools":
                        translations.put("category", "Tools");
                        break;
                    default:
                        translations.put("category", skill.getCategory());
                }

                if (!translations.isEmpty()) {
                    translationService.saveEntityTranslations("Skill", skill.getId(), "en", translations);
                }
            }
        });
    }

    private void loadExperienceTranslations() {
        experienceRepository.findAll().forEach(experience -> {
            Map<String, String> translations = new HashMap<>();

            // Sample translations - customize based on your data
            if (experience.getPosition() != null) {
                if (experience.getPosition().contains("Développeur")) {
                    translations.put("position", experience.getPosition().replace("Développeur", "Developer"));
                } else {
                    translations.put("position", experience.getPosition() + " (EN)");
                }
            }

            if (experience.getDescription() != null) {
                translations.put("description", "English description of the experience");
            }

            if (!translations.isEmpty()) {
                translationService.saveEntityTranslations("Experience", experience.getId(), "en", translations);
                log.debug("Added English translations for experience: {}", experience.getPosition());
            }
        });
    }

    private void loadEducationTranslations() {
        educationRepository.findAll().forEach(education -> {
            Map<String, String> translations = new HashMap<>();

            // Sample translations
            if (education.getDegree() != null) {
                if (education.getDegree().contains("Licence")) {
                    translations.put("degree", "Bachelor's Degree");
                } else if (education.getDegree().contains("Master")) {
                    translations.put("degree", "Master's Degree");
                } else {
                    translations.put("degree", education.getDegree() + " (EN)");
                }
            }

            if (education.getFieldOfStudy() != null) {
                translations.put("fieldOfStudy", education.getFieldOfStudy() + " (EN)");
            }

            if (education.getDescription() != null) {
                translations.put("description", "English description of the education");
            }

            if (!translations.isEmpty()) {
                translationService.saveEntityTranslations("Education", education.getId(), "en", translations);
            }
        });
    }

    private void loadAboutTranslations() {
        aboutRepository.findAll().stream().findFirst().ifPresent(about -> {
            Map<String, String> translations = new HashMap<>();

            // Sample translations for About section
            translations.put("title", "Full-Stack Developer");
            translations.put("description",
                    "Welcome to my portfolio! I am a passionate developer dedicated to creating innovative solutions and delivering high-quality web applications. With expertise in modern technologies, I strive to build experiences that are not only functional but also visually stunning.");

            translationService.saveEntityTranslations("About", about.getId(), "en", translations);
            log.info("Added English translations for About section");
        });
    }
}
