package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/map")
public class MapController {

    @GetMapping("/incidents")
    public ResponseEntity<Map<String, Object>> incidents_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/map/incidents");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/gis-layers")
    public ResponseEntity<Map<String, Object>> gis_layers_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/map/gis-layers");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/resources")
    public ResponseEntity<Map<String, Object>> resources_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/map/resources");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/situation-overview")
    public ResponseEntity<Map<String, Object>> situation_overview_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/map/situation-overview");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/state-heatmap")
    public ResponseEntity<Map<String, Object>> state_heatmap_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/map/state-heatmap");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/state-overview")
    public ResponseEntity<Map<String, Object>> state_overview_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/map/state-overview");
        return ResponseEntity.ok(response);
    }

}
