package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> _get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/resources");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/allocate")
    public ResponseEntity<Map<String, Object>> allocate_post(@RequestBody(required = false) Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for POST /api/resources/allocate");
        return ResponseEntity.ok(response);
    }

}
