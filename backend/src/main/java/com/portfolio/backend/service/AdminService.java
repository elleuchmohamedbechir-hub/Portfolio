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

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service for admin operations
 * Handles CRUD operations for all portfolio entities
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {

    // Repositories
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final ContactMessageRepository contactMessageRepository;
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

    // ==================== PROJECTS ====================

    /**
     * Get all projects
     */
    @Transactional(readOnly = true)
    public List<ProjectDTO> getAllProjects() {
        log.debug("Admin: Fetching all projects");
        List<Project> projects = projectRepository.findAll();
        return projectMapper.toDTOList(projects);
    }

    /**
     * Save or update a project
     */
    public ProjectDTO saveProject(ProjectDTO projectDTO) {
        log.info("Admin: Saving project: {}", projectDTO.getTitle());
        Project project = projectMapper.toEntity(projectDTO);
        Project saved = projectRepository.save(project);
        log.info("Admin: Project saved with ID: {}", saved.getId());
        return projectMapper.toDTO(saved);
    }

    /**
     * Delete a project
     */
    public void deleteProject(Long id) {
        log.info("Admin: Deleting project with ID: {}", id);
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with ID: " + id);
        }
        projectRepository.deleteById(id);
        log.info("Admin: Project deleted successfully");
    }

    // ==================== SKILLS ====================

    /**
     * Get all skills
     */
    @Transactional(readOnly = true)
    public List<SkillDTO> getAllSkills() {
        log.debug("Admin: Fetching all skills");
        List<Skill> skills = skillRepository.findAll();
        return skillMapper.toDTOList(skills);
    }

    /**
     * Save or update a skill
     */
    public SkillDTO saveSkill(SkillDTO skillDTO) {
        log.info("Admin: Saving skill: {}", skillDTO.getName());
        Skill skill = skillMapper.toEntity(skillDTO);
        Skill saved = skillRepository.save(skill);
        log.info("Admin: Skill saved with ID: {}", saved.getId());
        return skillMapper.toDTO(saved);
    }

    /**
     * Delete a skill
     */
    public void deleteSkill(Long id) {
        log.info("Admin: Deleting skill with ID: {}", id);
        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found with ID: " + id);
        }
        skillRepository.deleteById(id);
        log.info("Admin: Skill deleted successfully");
    }

    // ==================== EXPERIENCES ====================

    /**
     * Get all experiences
     */
    @Transactional(readOnly = true)
    public List<ExperienceDTO> getAllExperiences() {
        log.debug("Admin: Fetching all experiences");
        List<Experience> experiences = experienceRepository.findAll();
        return experienceMapper.toDTOList(experiences);
    }

    /**
     * Save or update an experience
     */
    public ExperienceDTO saveExperience(ExperienceDTO experienceDTO) {
        log.info("Admin: Saving experience: {} at {}", experienceDTO.getPosition(), experienceDTO.getCompany());
        Experience experience = experienceMapper.toEntity(experienceDTO);
        Experience saved = experienceRepository.save(experience);
        log.info("Admin: Experience saved with ID: {}", saved.getId());
        return experienceMapper.toDTO(saved);
    }

    /**
     * Delete an experience
     */
    public void deleteExperience(Long id) {
        log.info("Admin: Deleting experience with ID: {}", id);
        if (!experienceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Experience not found with ID: " + id);
        }
        experienceRepository.deleteById(id);
        log.info("Admin: Experience deleted successfully");
    }

    // ==================== ABOUT ====================

    /**
     * Get About section
     */
    @Transactional(readOnly = true)
    public AboutDTO getAbout() {
        log.debug("Admin: Fetching About section");
        About about = aboutRepository.findAll().stream()
                .findFirst()
                .orElse(null);

        if (about == null) {
            log.warn("Admin: No About section found");
            return null;
        }

        return aboutMapper.toDTO(about);
    }

    /**
     * Save or update About section
     * Ensures only one About record exists
     */
    public AboutDTO saveAbout(AboutDTO aboutDTO) {
        log.info("Admin: Saving About section for: {}", aboutDTO.getName());

        // Check if About already exists
        About existing = aboutRepository.findAll().stream().findFirst().orElse(null);

        About about = aboutMapper.toEntity(aboutDTO);

        // If exists, update the existing record
        if (existing != null) {
            about.setId(existing.getId());
            log.info("Admin: Updating existing About section with ID: {}", existing.getId());
        } else {
            log.info("Admin: Creating new About section");
        }

        About saved = aboutRepository.save(about);
        log.info("Admin: About section saved successfully");
        return aboutMapper.toDTO(saved);
    }

    // ==================== EDUCATION ====================

    /**
     * Get all education entries
     */
    @Transactional(readOnly = true)
    public List<EducationDTO> getAllEducation() {
        log.debug("Admin: Fetching all education entries");
        List<Education> educations = educationRepository.findAll();
        return educationMapper.toDTOList(educations);
    }

    /**
     * Save or update an education entry
     */
    public EducationDTO saveEducation(EducationDTO educationDTO) {
        log.info("Admin: Saving education: {} at {}", educationDTO.getDegree(), educationDTO.getInstitution());
        Education education = educationMapper.toEntity(educationDTO);
        Education saved = educationRepository.save(education);
        log.info("Admin: Education saved with ID: {}", saved.getId());
        return educationMapper.toDTO(saved);
    }

    /**
     * Delete an education entry
     */
    public void deleteEducation(Long id) {
        log.info("Admin: Deleting education with ID: {}", id);
        if (!educationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Education not found with ID: " + id);
        }
        educationRepository.deleteById(id);
        log.info("Admin: Education deleted successfully");
    }

    // ==================== LANGUAGES ====================

    /**
     * Get all languages
     */
    @Transactional(readOnly = true)
    public List<LanguageDTO> getAllLanguages() {
        log.debug("Admin: Fetching all languages");
        List<Language> languages = languageRepository.findAll();
        return languageMapper.toDTOList(languages);
    }

    /**
     * Save or update a language
     */
    public LanguageDTO saveLanguage(LanguageDTO languageDTO) {
        log.info("Admin: Saving language: {}", languageDTO.getName());
        Language language = languageMapper.toEntity(languageDTO);
        Language saved = languageRepository.save(language);
        log.info("Admin: Language saved with ID: {}", saved.getId());
        return languageMapper.toDTO(saved);
    }

    /**
     * Delete a language
     */
    public void deleteLanguage(Long id) {
        log.info("Admin: Deleting language with ID: {}", id);
        if (!languageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Language not found with ID: " + id);
        }
        languageRepository.deleteById(id);
        log.info("Admin: Language deleted successfully");
    }

    // ==================== INTERESTS ====================

    /**
     * Get all interests
     */
    @Transactional(readOnly = true)
    public List<InterestDTO> getAllInterests() {
        log.debug("Admin: Fetching all interests");
        List<Interest> interests = interestRepository.findAll();
        return interestMapper.toDTOList(interests);
    }

    /**
     * Save or update an interest
     */
    public InterestDTO saveInterest(InterestDTO interestDTO) {
        log.info("Admin: Saving interest: {}", interestDTO.getName());
        Interest interest = interestMapper.toEntity(interestDTO);
        Interest saved = interestRepository.save(interest);
        log.info("Admin: Interest saved with ID: {}", saved.getId());
        return interestMapper.toDTO(saved);
    }

    /**
     * Delete an interest
     */
    public void deleteInterest(Long id) {
        log.info("Admin: Deleting interest with ID: {}", id);
        if (!interestRepository.existsById(id)) {
            throw new ResourceNotFoundException("Interest not found with ID: " + id);
        }
        interestRepository.deleteById(id);
        log.info("Admin: Interest deleted successfully");
    }

    // ==================== CONTACT MESSAGES ====================

    /**
     * Get messages filtered by status
     */
    @Transactional(readOnly = true)
    public List<ContactMessageDTO> getMessages(MessageStatus status) {
        log.debug("Admin: Fetching messages with status: {}", status);

        List<ContactMessage> messages;
        if (status == null) {
            messages = contactMessageRepository.findAllByOrderByCreatedAtDesc();
        } else {
            messages = contactMessageRepository.findByStatusOrderByCreatedAtDesc(status);
        }

        log.info("Admin: Found {} messages", messages.size());
        return contactMessageMapper.toDTOList(messages);
    }

    /**
     * Mark a message as read
     */
    public ContactMessageDTO markMessageAsRead(Long id) {
        log.info("Admin: Marking message {} as read", id);

        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + id));

        message.setStatus(MessageStatus.READ);
        message.setReadAt(LocalDateTime.now());

        ContactMessage saved = contactMessageRepository.save(message);
        log.info("Admin: Message marked as read successfully");

        return contactMessageMapper.toDTO(saved);
    }

    /**
     * Delete a message
     */
    public void deleteMessage(Long id) {
        log.info("Admin: Deleting message with ID: {}", id);
        if (!contactMessageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Message not found with ID: " + id);
        }
        contactMessageRepository.deleteById(id);
        log.info("Admin: Message deleted successfully");
    }

    // ==================== DASHBOARD STATS ====================

    /**
     * Get dashboard statistics
     */
    @Transactional(readOnly = true)
    public DashboardStatsDTO getDashboardStats() {
        log.debug("Admin: Fetching dashboard statistics");

        long totalProjects = projectRepository.count();
        long totalSkills = skillRepository.count();
        long totalMessages = contactMessageRepository.count();
        long unreadMessages = contactMessageRepository.countByStatus(MessageStatus.UNREAD);

        // Get recent 5 messages
        List<ContactMessage> recentMessageEntities = contactMessageRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .limit(5)
                .toList();

        List<ContactMessageDTO> recentMessages = contactMessageMapper.toDTOList(recentMessageEntities);

        DashboardStatsDTO stats = DashboardStatsDTO.builder()
                .totalProjects(totalProjects)
                .totalSkills(totalSkills)
                .totalMessages(totalMessages)
                .unreadMessages(unreadMessages)
                .recentMessages(recentMessages)
                .build();

        log.info("Admin: Dashboard stats - Projects: {}, Skills: {}, Messages: {}, Unread: {}",
                totalProjects, totalSkills, totalMessages, unreadMessages);

        return stats;
    }
}
