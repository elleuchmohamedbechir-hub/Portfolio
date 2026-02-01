package com.portfolio.backend.service;

import com.portfolio.backend.entity.Translation;
import com.portfolio.backend.repository.TranslationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Service for managing translations
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TranslationService {

    private final TranslationRepository translationRepository;

    /**
     * Get translation for a specific field
     */
    public Optional<String> getTranslation(String entityType, Long entityId, String fieldName, String language) {
        return translationRepository
                .findByEntityTypeAndEntityIdAndFieldNameAndLanguage(entityType, entityId, fieldName, language)
                .map(Translation::getValue);
    }

    /**
     * Get all translations for an entity in a specific language
     */
    public Map<String, String> getEntityTranslations(String entityType, Long entityId, String language) {
        List<Translation> translations = translationRepository
                .findByEntityTypeAndEntityIdAndLanguage(entityType, entityId, language);

        Map<String, String> result = new HashMap<>();
        translations.forEach(t -> result.put(t.getFieldName(), t.getValue()));
        return result;
    }

    /**
     * Save or update a translation
     */
    @Transactional
    public Translation saveTranslation(String entityType, Long entityId, String fieldName, String language,
            String value) {
        Optional<Translation> existing = translationRepository
                .findByEntityTypeAndEntityIdAndFieldNameAndLanguage(entityType, entityId, fieldName, language);

        Translation translation;
        if (existing.isPresent()) {
            translation = existing.get();
            translation.setValue(value);
            log.debug("Updating translation: {} #{} - {} [{}]", entityType, entityId, fieldName, language);
        } else {
            translation = Translation.builder()
                    .entityType(entityType)
                    .entityId(entityId)
                    .fieldName(fieldName)
                    .language(language)
                    .value(value)
                    .build();
            log.debug("Creating translation: {} #{} - {} [{}]", entityType, entityId, fieldName, language);
        }

        return translationRepository.save(translation);
    }

    /**
     * Save multiple translations for an entity
     */
    @Transactional
    public void saveEntityTranslations(String entityType, Long entityId, String language,
            Map<String, String> translations) {
        translations.forEach((fieldName, value) -> saveTranslation(entityType, entityId, fieldName, language, value));
    }

    /**
     * Delete all translations for an entity
     */
    @Transactional
    public void deleteEntityTranslations(String entityType, Long entityId) {
        translationRepository.deleteByEntityTypeAndEntityId(entityType, entityId);
        log.info("Deleted all translations for {} #{}", entityType, entityId);
    }

    /**
     * Apply translations to a field value
     * Returns translated value if available, otherwise returns original value
     */
    public String applyTranslation(String originalValue, String entityType, Long entityId, String fieldName,
            String language) {
        // If language is French (default), return original
        if ("fr".equalsIgnoreCase(language)) {
            return originalValue;
        }

        // Try to get translation
        return getTranslation(entityType, entityId, fieldName, language)
                .orElse(originalValue); // Fallback to original if translation not found
    }
}
