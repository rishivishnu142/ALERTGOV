package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/state")
public class StateController {

    @GetMapping("/dashboard/summary")
    public ResponseEntity<Map<String, Object>> dashboard_summary_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/state/dashboard/summary");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/districts-monitor")
    public ResponseEntity<Map<String, Object>> districts_monitor_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/state/districts-monitor");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/districts/{id}/status")
    public ResponseEntity<Map<String, Object>> districts_id_status_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/state/districts/{id}/status");
        return ResponseEntity.ok(response);
    }

}
