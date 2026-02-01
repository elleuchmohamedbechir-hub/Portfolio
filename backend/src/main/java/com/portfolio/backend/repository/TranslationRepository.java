package com.portfolio.backend.repository;

import com.portfolio.backend.entity.Translation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TranslationRepository extends JpaRepository<Translation, Long> {

    /**
     * Find translation for a specific entity field in a specific language
     */
    Optional<Translation> findByEntityTypeAndEntityIdAndFieldNameAndLanguage(
            String entityType, Long entityId, String fieldName, String language);

    /**
     * Find all translations for a specific entity in a specific language
     */
    List<Translation> findByEntityTypeAndEntityIdAndLanguage(
            String entityType, Long entityId, String language);

    /**
     * Find all translations for a specific entity (all languages)
     */
    List<Translation> findByEntityTypeAndEntityId(String entityType, Long entityId);

    /**
     * Delete all translations for a specific entity
     */
    void deleteByEntityTypeAndEntityId(String entityType, Long entityId);

    /**
     * Check if translation exists
     */
    boolean existsByEntityTypeAndEntityIdAndFieldNameAndLanguage(
            String entityType, Long entityId, String fieldName, String language);
}
