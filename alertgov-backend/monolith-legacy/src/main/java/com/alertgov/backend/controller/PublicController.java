package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> stats_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/public/stats");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/alerts")
    public ResponseEntity<Map<String, Object>> alerts_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/public/alerts");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/feedback")
    public ResponseEntity<Map<String, Object>> feedback_post(@RequestBody(required = false) Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for POST /api/public/feedback");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> contact_post(@RequestBody(required = false) Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for POST /api/public/contact");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/content/policies")
    public ResponseEntity<Map<String, Object>> content_policies_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/public/content/policies");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/content/faq")
    public ResponseEntity<Map<String, Object>> content_faq_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/public/content/faq");
        return ResponseEntity.ok(response);
    }

}
