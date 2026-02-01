package com.portfolio.backend.mapper;

import com.portfolio.backend.dto.ContactMessageDTO;
import com.portfolio.backend.entity.ContactMessage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ContactMessageMapper {

    public ContactMessageDTO toDTO(ContactMessage entity) {
        if (entity == null) {
            return null;
        }

        return ContactMessageDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .subject(entity.getSubject())
                .message(entity.getMessage())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .readAt(entity.getReadAt())
                .build();
    }

    public ContactMessage toEntity(ContactMessageDTO dto) {
        if (dto == null) {
            return null;
        }

        ContactMessage entity = new ContactMessage();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setSubject(dto.getSubject());
        entity.setMessage(dto.getMessage());
        entity.setStatus(dto.getStatus());

        return entity;
    }

    public List<ContactMessageDTO> toDTOList(List<ContactMessage> entities) {
        if (entities == null) {
            return List.of(); // Return empty list instead of null
        }
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
