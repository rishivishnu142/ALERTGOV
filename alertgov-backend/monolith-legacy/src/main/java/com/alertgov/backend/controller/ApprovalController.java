package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/approvals")
public class ApprovalController {

    @GetMapping("/district/recent")
    public ResponseEntity<Map<String, Object>> district_recent_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/approvals/district/recent");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/district")
    public ResponseEntity<Map<String, Object>> district_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/approvals/district");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> id_put(@RequestBody(required = false) Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for PUT /api/approvals/{id}");
        return ResponseEntity.ok(response);
    }

}
