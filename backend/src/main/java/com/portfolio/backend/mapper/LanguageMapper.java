package com.portfolio.backend.mapper;

import com.portfolio.backend.dto.LanguageDTO;
import com.portfolio.backend.entity.Language;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LanguageMapper {

    public LanguageDTO toDTO(Language entity) {
        if (entity == null) {
            return null;
        }

        return LanguageDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .proficiency(entity.getProficiency())
                .proficiencyPercentage(entity.getProficiencyPercentage())
                .displayOrder(entity.getDisplayOrder())
                .build();
    }

    public Language toEntity(LanguageDTO dto) {
        if (dto == null) {
            return null;
        }

        Language entity = new Language();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setProficiency(dto.getProficiency());
        entity.setProficiencyPercentage(dto.getProficiencyPercentage());
        entity.setDisplayOrder(dto.getDisplayOrder());

        return entity;
    }

    public List<LanguageDTO> toDTOList(List<Language> entities) {
        if (entities == null) {
            return List.of(); // Return empty list instead of null
        }
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
