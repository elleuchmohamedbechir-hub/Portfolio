package com.portfolio.backend.mapper;

import com.portfolio.backend.dto.ExperienceDTO;
import com.portfolio.backend.entity.Experience;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ExperienceMapper {

    public ExperienceDTO toDTO(Experience entity) {
        if (entity == null) {
            return null;
        }

        return ExperienceDTO.builder()
                .id(entity.getId())
                .company(entity.getCompany())
                .position(entity.getPosition())
                .location(entity.getLocation())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .description(entity.getDescription())
                .current(entity.getCurrent())
                .displayOrder(entity.getDisplayOrder())
                .build();
    }

    public Experience toEntity(ExperienceDTO dto) {
        if (dto == null) {
            return null;
        }

        Experience entity = new Experience();
        entity.setId(dto.getId());
        entity.setCompany(dto.getCompany());
        entity.setPosition(dto.getPosition());
        entity.setLocation(dto.getLocation());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setDescription(dto.getDescription());
        entity.setCurrent(dto.getCurrent());
        entity.setDisplayOrder(dto.getDisplayOrder());

        return entity;
    }

    public List<ExperienceDTO> toDTOList(List<Experience> entities) {
        if (entities == null) {
            return List.of(); // Return empty list instead of null
        }
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
