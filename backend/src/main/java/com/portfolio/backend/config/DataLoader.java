package com.portfolio.backend.config;

import com.portfolio.backend.entity.*;
import com.portfolio.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * DataLoader - Initializes default data on application startup
 * Creates admin user and sample portfolio data if database is empty
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

        private final UserRepository userRepository;
        private final AboutRepository aboutRepository;
        private final ProjectRepository projectRepository;
        private final SkillRepository skillRepository;
        private final ExperienceRepository experienceRepository;
        private final EducationRepository educationRepository;
        private final LanguageRepository languageRepository;
        private final InterestRepository interestRepository;
        private final PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) {
                log.info("=== DataLoader: Starting data initialization ===");

                log.info("Checking existing data...");

                if (userRepository.count() == 0) {
                        createAdminUser();
                } else {
                        log.info("Users already exist. Skipping user creation.");
                }

                if (aboutRepository.count() == 0) {
                        createAboutSection();
                }

                if (skillRepository.count() == 0) {
                        createSkills();
                }

                if (projectRepository.count() == 0) {
                        createProjects();
                }

                if (experienceRepository.count() == 0) {
                        createExperiences();
                }

                if (educationRepository.count() == 0) {
                        createEducation();
                }

                if (languageRepository.count() == 0) {
                        createLanguages();
                }

                if (interestRepository.count() == 0) {
                        createInterests();
                }

                log.info("=== DataLoader: Data initialization check completed ===");
        }

        private void createAdminUser() {
                log.info("Creating admin user...");

                User admin = User.builder()
                                .username("admin")
                                .password(passwordEncoder.encode("admin123"))
                                .email("admin@portfolio.com")
                                .role(Role.ADMIN)
                                .build();

                userRepository.save(admin);
                log.info("✓ Admin user created (username: admin, password: admin123)");
        }

        private void createAboutSection() {
                log.info("Creating About section...");

                About about = About.builder()
                                .name("Mohamed Bechir Elleuch")
                                .title("Full-Stack Developer & Software Engineer")
                                .description("Passionate Full-Stack Developer with expertise in building modern web applications. "
                                                +
                                                "Specialized in Spring Boot, React, and cloud technologies. " +
                                                "I love creating elegant solutions to complex problems and continuously learning new technologies.")
                                .email("elleuchmohamedbechir@gmail.com")
                                .phone("+216 XX XXX XXX")
                                .location("Tunisia")
                                .linkedinUrl("https://linkedin.com/in/mohamed-bechir-elleuch")
                                .githubUrl("https://github.com/elleuchmohamedbechir")
                                .twitterUrl("https://twitter.com/yourusername")
                                .resumeUrl("/assets/resume.pdf")
                                .profileImageUrl("/assets/profile.jpg")
                                .build();

                aboutRepository.save(about);
                log.info("✓ About section created");
        }

        private void createSkills() {
                log.info("Creating skills...");

                List<Skill> skills = Arrays.asList(
                                // Backend
                                Skill.builder().name("Java").category("Backend").proficiencyLevel(90)
                                                .iconUrl("java-icon.svg")
                                                .displayOrder(1).build(),
                                Skill.builder().name("Spring Boot").category("Backend").proficiencyLevel(85)
                                                .iconUrl("spring-icon.svg")
                                                .displayOrder(2).build(),
                                Skill.builder().name("Node.js").category("Backend").proficiencyLevel(75)
                                                .iconUrl("nodejs-icon.svg")
                                                .displayOrder(3).build(),

                                // Frontend
                                Skill.builder().name("React").category("Frontend").proficiencyLevel(85)
                                                .iconUrl("react-icon.svg")
                                                .displayOrder(4).build(),
                                Skill.builder().name("JavaScript").category("Frontend").proficiencyLevel(90)
                                                .iconUrl("js-icon.svg")
                                                .displayOrder(5).build(),
                                Skill.builder().name("TypeScript").category("Frontend").proficiencyLevel(80)
                                                .iconUrl("ts-icon.svg")
                                                .displayOrder(6).build(),
                                Skill.builder().name("HTML/CSS").category("Frontend").proficiencyLevel(95)
                                                .iconUrl("html-icon.svg")
                                                .displayOrder(7).build(),

                                // Database
                                Skill.builder().name("MySQL").category("Database").proficiencyLevel(85)
                                                .iconUrl("mysql-icon.svg")
                                                .displayOrder(8).build(),
                                Skill.builder().name("PostgreSQL").category("Database").proficiencyLevel(80)
                                                .iconUrl("postgres-icon.svg").displayOrder(9).build(),
                                Skill.builder().name("MongoDB").category("Database").proficiencyLevel(75)
                                                .iconUrl("mongo-icon.svg")
                                                .displayOrder(10).build(),

                                // Tools
                                Skill.builder().name("Git").category("Tools").proficiencyLevel(90)
                                                .iconUrl("git-icon.svg")
                                                .displayOrder(11).build(),
                                Skill.builder().name("Docker").category("Tools").proficiencyLevel(75)
                                                .iconUrl("docker-icon.svg")
                                                .displayOrder(12).build(),
                                Skill.builder().name("AWS").category("Tools").proficiencyLevel(70)
                                                .iconUrl("aws-icon.svg")
                                                .displayOrder(13).build());

                skillRepository.saveAll(skills);
                log.info("✓ {} skills created", skills.size());
        }

        private void createProjects() {
                log.info("Creating projects...");

                List<Project> projects = Arrays.asList(
                                Project.builder()
                                                .title("E-Commerce Platform")
                                                .description(
                                                                "Full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. Built with Spring Boot and React.")
                                                .technologies(Arrays.asList("Spring Boot", "React", "MySQL", "Stripe",
                                                                "Docker"))
                                                .category("Web Application")
                                                .imageUrl("/assets/projects/ecommerce.jpg")
                                                .githubUrl("https://github.com/yourusername/ecommerce-platform")
                                                .demoUrl("https://ecommerce-demo.com")
                                                .featured(true)
                                                .displayOrder(1)
                                                .build(),

                                Project.builder()
                                                .title("Task Management System")
                                                .description(
                                                                "Collaborative task management application with real-time updates, team collaboration features, and project tracking.")
                                                .technologies(Arrays.asList("Node.js", "React", "MongoDB", "Socket.io",
                                                                "Redux"))
                                                .category("Web Application")
                                                .imageUrl("/assets/projects/taskmanager.jpg")
                                                .githubUrl("https://github.com/yourusername/task-manager")
                                                .demoUrl("https://taskmanager-demo.com")
                                                .featured(true)
                                                .displayOrder(2)
                                                .build(),

                                Project.builder()
                                                .title("Weather Dashboard")
                                                .description(
                                                                "Real-time weather dashboard with forecasts, interactive maps, and weather alerts. Integrates with multiple weather APIs.")
                                                .technologies(Arrays.asList("React", "TypeScript", "Tailwind CSS",
                                                                "OpenWeather API"))
                                                .category("Web Application")
                                                .imageUrl("/assets/projects/weather.jpg")
                                                .githubUrl("https://github.com/yourusername/weather-dashboard")
                                                .demoUrl("https://weather-demo.com")
                                                .featured(false)
                                                .displayOrder(3)
                                                .build(),

                                Project.builder()
                                                .title("Portfolio CMS")
                                                .description(
                                                                "Content Management System for personal portfolios with drag-and-drop builder and customizable themes.")
                                                .technologies(Arrays.asList("Spring Boot", "React", "PostgreSQL",
                                                                "AWS S3"))
                                                .category("CMS")
                                                .imageUrl("/assets/projects/cms.jpg")
                                                .githubUrl("https://github.com/yourusername/portfolio-cms")
                                                .featured(false)
                                                .displayOrder(4)
                                                .build());

                projectRepository.saveAll(projects);
                log.info("✓ {} projects created", projects.size());
        }

        private void createExperiences() {
                log.info("Creating experiences...");

                List<Experience> experiences = Arrays.asList(
                                Experience.builder()
                                                .company("Tech Solutions Inc.")
                                                .position("Full-Stack Developer")
                                                .location("Remote")
                                                .startDate("Jan 2023")
                                                .endDate(null)
                                                .current(true)
                                                .description(
                                                                "• Developed and maintained multiple web applications using Spring Boot and React\n"
                                                                                +
                                                                                "• Implemented RESTful APIs and microservices architecture\n"
                                                                                +
                                                                                "• Collaborated with cross-functional teams in Agile environment\n"
                                                                                +
                                                                                "• Reduced application load time by 40% through optimization")
                                                .displayOrder(1)
                                                .build(),

                                Experience.builder()
                                                .company("Digital Agency XYZ")
                                                .position("Junior Developer")
                                                .location("Tunisia")
                                                .startDate("Jun 2021")
                                                .endDate("Dec 2022")
                                                .current(false)
                                                .description("• Built responsive web applications for various clients\n"
                                                                +
                                                                "• Worked with React, Node.js, and MongoDB\n" +
                                                                "• Participated in code reviews and team meetings\n" +
                                                                "• Delivered 15+ successful projects")
                                                .displayOrder(2)
                                                .build(),

                                Experience.builder()
                                                .company("Freelance")
                                                .position("Web Developer")
                                                .location("Remote")
                                                .startDate("Jan 2020")
                                                .endDate("May 2021")
                                                .current(false)
                                                .description("• Developed custom websites for small businesses\n" +
                                                                "• Provided technical consulting and support\n" +
                                                                "• Managed client relationships and project timelines")
                                                .displayOrder(3)
                                                .build());

                experienceRepository.saveAll(experiences);
                log.info("✓ {} experiences created", experiences.size());
        }

        private void createEducation() {
                log.info("Creating education entries...");

                List<Education> educations = Arrays.asList(
                                Education.builder()
                                                .institution("University of Technology")
                                                .degree("Master's Degree")
                                                .fieldOfStudy("Computer Science")
                                                .location("Tunisia")
                                                .startDate("2019")
                                                .endDate("2021")
                                                .description("Specialized in Software Engineering and Web Technologies. "
                                                                +
                                                                "Thesis on Microservices Architecture and Cloud Computing.")
                                                .grade("Distinction")
                                                .displayOrder(1)
                                                .build(),

                                Education.builder()
                                                .institution("National Institute of Applied Sciences")
                                                .degree("Bachelor's Degree")
                                                .fieldOfStudy("Information Technology")
                                                .location("Tunisia")
                                                .startDate("2016")
                                                .endDate("2019")
                                                .description("Fundamentals of programming, databases, and software development. "
                                                                +
                                                                "Final year project on E-commerce platform development.")
                                                .grade("Good")
                                                .displayOrder(2)
                                                .build());

                educationRepository.saveAll(educations);
                log.info("✓ {} education entries created", educations.size());
        }

        private void createLanguages() {
                log.info("Creating languages...");

                List<Language> languages = Arrays.asList(
                                Language.builder().name("Arabic").proficiency("Native").proficiencyPercentage(100)
                                                .displayOrder(1)
                                                .build(),
                                Language.builder().name("French").proficiency("Fluent").proficiencyPercentage(90)
                                                .displayOrder(2)
                                                .build(),
                                Language.builder().name("English").proficiency("Fluent").proficiencyPercentage(85)
                                                .displayOrder(3)
                                                .build());

                languageRepository.saveAll(languages);
                log.info("✓ {} languages created", languages.size());
        }

        private void createInterests() {
                log.info("Creating interests...");

                List<Interest> interests = Arrays.asList(
                                Interest.builder()
                                                .name("Open Source")
                                                .description(
                                                                "Contributing to open-source projects and building tools for the developer community")
                                                .icon("code")
                                                .displayOrder(1)
                                                .build(),

                                Interest.builder()
                                                .name("Cloud Computing")
                                                .description("Exploring cloud technologies and serverless architectures")
                                                .icon("cloud")
                                                .displayOrder(2)
                                                .build(),

                                Interest.builder()
                                                .name("AI & Machine Learning")
                                                .description(
                                                                "Learning about artificial intelligence and its applications in software development")
                                                .icon("brain")
                                                .displayOrder(3)
                                                .build(),

                                Interest.builder()
                                                .name("Tech Blogging")
                                                .description("Writing technical articles and sharing knowledge with the community")
                                                .icon("pen")
                                                .displayOrder(4)
                                                .build());

                interestRepository.saveAll(interests);
                log.info("✓ {} interests created", interests.size());
        }
}
