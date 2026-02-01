package com.portfolio.backend.mapper;

import com.portfolio.backend.dto.ProjectDTO;
import com.portfolio.backend.entity.Project;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProjectMapper {

    public ProjectDTO toDTO(Project entity) {
        if (entity == null) {
            return null;
        }

        return ProjectDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .imageUrl(entity.getImageUrl())
                .demoUrl(entity.getDemoUrl())
                .githubUrl(entity.getGithubUrl())
                .technologies(entity.getTechnologies())
                .category(entity.getCategory())
                .featured(entity.getFeatured())
                .displayOrder(entity.getDisplayOrder())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public Project toEntity(ProjectDTO dto) {
        if (dto == null) {
            return null;
        }

        Project entity = new Project();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setImageUrl(dto.getImageUrl());
        entity.setDemoUrl(dto.getDemoUrl());
        entity.setGithubUrl(dto.getGithubUrl());
        entity.setTechnologies(dto.getTechnologies());
        entity.setCategory(dto.getCategory());
        entity.setFeatured(dto.getFeatured());
        entity.setDisplayOrder(dto.getDisplayOrder());

        return entity;
    }

    public List<ProjectDTO> toDTOList(List<Project> entities) {
        if (entities == null) {
            return List.of(); // Return empty list instead of null
        }
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
