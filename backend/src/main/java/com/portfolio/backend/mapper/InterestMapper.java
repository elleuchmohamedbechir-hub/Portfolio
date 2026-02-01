package com.portfolio.backend.mapper;

import com.portfolio.backend.dto.InterestDTO;
import com.portfolio.backend.entity.Interest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class InterestMapper {

    public InterestDTO toDTO(Interest entity) {
        if (entity == null) {
            return null;
        }

        return InterestDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .icon(entity.getIcon())
                .displayOrder(entity.getDisplayOrder())
                .build();
    }

    public Interest toEntity(InterestDTO dto) {
        if (dto == null) {
            return null;
        }

        Interest entity = new Interest();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setIcon(dto.getIcon());
        entity.setDisplayOrder(dto.getDisplayOrder());

        return entity;
    }

    public List<InterestDTO> toDTOList(List<Interest> entities) {
        if (entities == null) {
            return List.of(); // Return empty list instead of null
        }
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
