package com.portfolio.backend.repository;

import com.portfolio.backend.entity.ContactMessage;
import com.portfolio.backend.entity.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findByStatusOrderByCreatedAtDesc(MessageStatus status);

    List<ContactMessage> findAllByOrderByCreatedAtDesc();

    long countByStatus(MessageStatus status);
}
