package com.portfolio.backend.mapper;

import com.portfolio.backend.dto.AboutDTO;
import com.portfolio.backend.entity.About;
import org.springframework.stereotype.Component;

@Component
public class AboutMapper {

    public AboutDTO toDTO(About entity) {
        if (entity == null) {
            return null;
        }

        return AboutDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .location(entity.getLocation())
                .linkedinUrl(entity.getLinkedinUrl())
                .githubUrl(entity.getGithubUrl())
                .twitterUrl(entity.getTwitterUrl())
                .resumeUrl(entity.getResumeUrl())
                .profileImageUrl(entity.getProfileImageUrl())
                .build();
    }

    public About toEntity(AboutDTO dto) {
        if (dto == null) {
            return null;
        }

        About entity = new About();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setLocation(dto.getLocation());
        entity.setLinkedinUrl(dto.getLinkedinUrl());
        entity.setGithubUrl(dto.getGithubUrl());
        entity.setTwitterUrl(dto.getTwitterUrl());
        entity.setResumeUrl(dto.getResumeUrl());
        entity.setProfileImageUrl(dto.getProfileImageUrl());

        return entity;
    }
}
