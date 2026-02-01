package com.portfolio.backend.mapper;

import com.portfolio.backend.dto.EducationDTO;
import com.portfolio.backend.entity.Education;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EducationMapper {

    public EducationDTO toDTO(Education entity) {
        if (entity == null) {
            return null;
        }

        return EducationDTO.builder()
                .id(entity.getId())
                .institution(entity.getInstitution())
                .degree(entity.getDegree())
                .fieldOfStudy(entity.getFieldOfStudy())
                .location(entity.getLocation())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .description(entity.getDescription())
                .grade(entity.getGrade())
                .displayOrder(entity.getDisplayOrder())
                .build();
    }

    public Education toEntity(EducationDTO dto) {
        if (dto == null) {
            return null;
        }

        Education entity = new Education();
        entity.setId(dto.getId());
        entity.setInstitution(dto.getInstitution());
        entity.setDegree(dto.getDegree());
        entity.setFieldOfStudy(dto.getFieldOfStudy());
        entity.setLocation(dto.getLocation());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setDescription(dto.getDescription());
        entity.setGrade(dto.getGrade());
        entity.setDisplayOrder(dto.getDisplayOrder());

        return entity;
    }

    public List<EducationDTO> toDTOList(List<Education> entities) {
        if (entities == null) {
            return List.of(); // Return empty list instead of null
        }
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
