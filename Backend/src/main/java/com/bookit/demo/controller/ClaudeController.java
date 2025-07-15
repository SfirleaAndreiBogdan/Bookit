package com.bookit.demo.controller;


import com.bookit.demo.dto.ClaudeRequest;
import com.bookit.demo.service.assistantClaude.AssistantClaudeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/api/claude")
@CrossOrigin(origins = "http://localhost:4200")
public class ClaudeController {


    private final AssistantClaudeService assistantClaudeService;

    @PostMapping("/message")
    public ResponseEntity<String> sendMessage(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Message cannot be empty.");
        }

        String response = assistantClaudeService.sendMessage(message);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/messageWithData")
    public ResponseEntity<String> sendMessageWithData(
            @RequestBody @Validated ClaudeRequest requestData) {
        String response = assistantClaudeService.sendMessageWithData(
                requestData.getMessage(),
                requestData.getBookings(),
                requestData.getReviews(),
                requestData.getReservationDtoList(),
                requestData.getRole()
        );
        return ResponseEntity.ok(response);
    }
}
