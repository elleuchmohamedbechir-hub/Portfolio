package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ContactMessageDTO;
import com.portfolio.backend.service.PortfolioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
@Tag(name = "Contact", description = "Contact form management")
public class ContactController {

    private final PortfolioService portfolioService;

    @Operation(summary = "Send contact message", description = "Submit a contact form message")
    @PostMapping
    public ResponseEntity<ContactMessageDTO> sendMessage(@Valid @RequestBody ContactMessageDTO message) {
        log.info("POST /api/v1/contact - Receiving contact message from: {}", message.getEmail());
        ContactMessageDTO saved = portfolioService.saveMessage(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
