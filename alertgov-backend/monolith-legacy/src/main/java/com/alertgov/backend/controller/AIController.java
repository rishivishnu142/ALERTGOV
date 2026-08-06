package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @GetMapping("/insights")
    public ResponseEntity<Map<String, Object>> insights_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/ai/insights");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/insights/download")
    public ResponseEntity<Map<String, Object>> insights_download_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/ai/insights/download");
        return ResponseEntity.ok(response);
    }

}
