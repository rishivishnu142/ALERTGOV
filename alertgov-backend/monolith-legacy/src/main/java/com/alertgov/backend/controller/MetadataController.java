package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/metadata")
public class MetadataController {

    @GetMapping("/incident-types")
    public ResponseEntity<Map<String, Object>> incident_types_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/metadata/incident-types");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/broadcast-zones")
    public ResponseEntity<Map<String, Object>> broadcast_zones_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/metadata/broadcast-zones");
        return ResponseEntity.ok(response);
    }

}
