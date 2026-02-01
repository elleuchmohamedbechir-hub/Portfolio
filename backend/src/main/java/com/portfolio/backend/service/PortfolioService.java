package com.portfolio.backend.service;

import com.portfolio.backend.dto.*;
import com.portfolio.backend.entity.*;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.mapper.*;
import com.portfolio.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for public portfolio operations
 * Handles read-only operations for portfolio data and contact message
 * submission
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PortfolioService {

    // Repositories
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final AboutRepository aboutRepository;
    private final EducationRepository educationRepository;
    private final LanguageRepository languageRepository;
    private final InterestRepository interestRepository;

    // Mappers
    private final AboutMapper aboutMapper;
    private final ProjectMapper projectMapper;
    private final SkillMapper skillMapper;
    private final ExperienceMapper experienceMapper;
    private final EducationMapper educationMapper;
    private final LanguageMapper languageMapper;
    private final InterestMapper interestMapper;
    private final ContactMessageMapper contactMessageMapper;

    private final ContactMessageRepository contactMessageRepository;

    /**
     * Get About section information
     * 
     * @return AboutDTO or null if not found
     */
    @Transactional(readOnly = true)
    public AboutDTO getAbout() {
        log.debug("Fetching About section");
        About about = aboutRepository.findAll().stream()
                .findFirst()
                .orElse(null);

        if (about == null) {
            log.warn("No About section found in database");
            return null;
        }

        return aboutMapper.toDTO(about);
    }

    /**
     * Get all projects ordered by displayOrder
     * 
     * @return List of ProjectDTO
     */
    @Transactional(readOnly = true)
    public List<ProjectDTO> getAllProjects() {
        log.debug("Fetching all projects");
        List<Project> projects = projectRepository.findAll();
        log.info("Found {} projects", projects.size());
        return projectMapper.toDTOList(projects);
    }

    /**
     * Get all skills ordered by category and displayOrder
     * 
     * @return List of SkillDTO
     */
    @Transactional(readOnly = true)
    public List<SkillDTO> getAllSkills() {
        log.debug("Fetching all skills");
        List<Skill> skills = skillRepository.findAll();
        log.info("Found {} skills", skills.size());
        return skillMapper.toDTOList(skills);
    }

    /**
     * Get all work experiences ordered by displayOrder
     * 
     * @return List of ExperienceDTO
     */
    @Transactional(readOnly = true)
    public List<ExperienceDTO> getAllExperiences() {
        log.debug("Fetching all experiences");
        List<Experience> experiences = experienceRepository.findAll();
        log.info("Found {} experiences", experiences.size());
        return experienceMapper.toDTOList(experiences);
    }

    /**
     * Get all education entries ordered by displayOrder
     * 
     * @return List of EducationDTO
     */
    @Transactional(readOnly = true)
    public List<EducationDTO> getAllEducation() {
        log.debug("Fetching all education entries");
        List<Education> educations = educationRepository.findAll();
        log.info("Found {} education entries", educations.size());
        return educationMapper.toDTOList(educations);
    }

    /**
     * Get all languages ordered by displayOrder
     * 
     * @return List of LanguageDTO
     */
    @Transactional(readOnly = true)
    public List<LanguageDTO> getAllLanguages() {
        log.debug("Fetching all languages");
        List<Language> languages = languageRepository.findAll();
        log.info("Found {} languages", languages.size());
        return languageMapper.toDTOList(languages);
    }

    /**
     * Get all interests ordered by displayOrder
     * 
     * @return List of InterestDTO
     */
    @Transactional(readOnly = true)
    public List<InterestDTO> getAllInterests() {
        log.debug("Fetching all interests");
        List<Interest> interests = interestRepository.findAll();
        log.info("Found {} interests", interests.size());
        return interestMapper.toDTOList(interests);
    }

    /**
     * Save a contact message
     *
     * @param messageDTO Contact message to save
     * @return Saved ContactMessageDTO
     */
    @Transactional
    public ContactMessageDTO saveMessage(ContactMessageDTO messageDTO) {
        log.info("Saving contact message from: {} ({})", messageDTO.getName(), messageDTO.getEmail());

        // Convert DTO to entity
        ContactMessage message = contactMessageMapper.toEntity(messageDTO);

        // Set default values
        message.setStatus(MessageStatus.UNREAD);
        message.setCreatedAt(java.time.LocalDateTime.now());

        // Save to database
        ContactMessage saved = contactMessageRepository.save(message);
        log.info("Contact message saved with ID: {}", saved.getId());

        return contactMessageMapper.toDTO(saved);
    }
}
