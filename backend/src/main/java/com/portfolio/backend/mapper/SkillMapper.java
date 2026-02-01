package com.portfolio.backend.mapper;

import com.portfolio.backend.dto.SkillDTO;
import com.portfolio.backend.entity.Skill;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SkillMapper {

    public SkillDTO toDTO(Skill entity) {
        if (entity == null) {
            return null;
        }

        return SkillDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .category(entity.getCategory())
                .proficiencyLevel(entity.getProficiencyLevel())
                .iconUrl(entity.getIconUrl())
                .displayOrder(entity.getDisplayOrder())
                .build();
    }

    public Skill toEntity(SkillDTO dto) {
        if (dto == null) {
            return null;
        }

        Skill entity = new Skill();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setCategory(dto.getCategory());
        entity.setProficiencyLevel(dto.getProficiencyLevel());
        entity.setIconUrl(dto.getIconUrl());
        entity.setDisplayOrder(dto.getDisplayOrder());

        return entity;
    }

    public List<SkillDTO> toDTOList(List<Skill> entities) {
        if (entities == null) {
            return List.of(); // Return empty list instead of null
        }
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
