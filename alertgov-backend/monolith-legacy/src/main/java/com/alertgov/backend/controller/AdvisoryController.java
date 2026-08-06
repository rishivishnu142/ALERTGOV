package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/advisories")
public class AdvisoryController {

    @GetMapping("/state")
    public ResponseEntity<Map<String, Object>> state_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/advisories/state");
        return ResponseEntity.ok(response);
    }

}
