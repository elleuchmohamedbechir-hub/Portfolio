package com.portfolio.backend.util;

import com.portfolio.backend.service.TranslationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

/**
 * Utility class for applying translations to DTOs
 */
@Component
@RequiredArgsConstructor
public class TranslationHelper {

    private final TranslationService translationService;

    /**
     * Fields that should be translated
     */
    private static final List<String> TRANSLATABLE_FIELDS = Arrays.asList(
            "title", "description", "name", "position", "company",
            "location", "category", "institution", "degree", "fieldOfStudy");

    /**
     * Apply translations to a DTO object
     * 
     * @param dto        The DTO object
     * @param entityType Entity type (e.g., "Project", "Skill")
     * @param entityId   Entity ID
     * @param language   Target language
     */
    public void applyTranslations(Object dto, String entityType, Long entityId, String language) {
        if (dto == null || "fr".equalsIgnoreCase(language)) {
            return; // No translation needed for French (default)
        }

        try {
            Class<?> clazz = dto.getClass();
            for (Field field : clazz.getDeclaredFields()) {
                String fieldName = field.getName();

                // Only translate String fields that are in the translatable list
                if (field.getType().equals(String.class) && TRANSLATABLE_FIELDS.contains(fieldName)) {
                    field.setAccessible(true);
                    String originalValue = (String) field.get(dto);

                    if (originalValue != null && !originalValue.isEmpty()) {
                        String translatedValue = translationService.applyTranslation(
                                originalValue, entityType, entityId, fieldName, language);
                        field.set(dto, translatedValue);
                    }
                }
            }
        } catch (Exception e) {
            // Log error but don't fail - return original DTO
            System.err.println("Error applying translations: " + e.getMessage());
        }
    }

    /**
     * Apply translations to a list of DTOs
     */
    public <T> void applyTranslationsToList(List<T> dtos, String entityType, String language) {
        if (dtos == null || dtos.isEmpty() || "fr".equalsIgnoreCase(language)) {
            return;
        }

        for (T dto : dtos) {
            try {
                // Get the ID field
                Field idField = dto.getClass().getDeclaredField("id");
                idField.setAccessible(true);
                Long entityId = (Long) idField.get(dto);

                if (entityId != null) {
                    applyTranslations(dto, entityType, entityId, language);
                }
            } catch (Exception e) {
                // Continue with next item
                System.err.println("Error applying translations to list item: " + e.getMessage());
            }
        }
    }
}
