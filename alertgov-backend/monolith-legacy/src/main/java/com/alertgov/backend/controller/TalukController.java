package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/taluk")
public class TalukController {

    @GetMapping("/dashboard/summary")
    public ResponseEntity<Map<String, Object>> dashboard_summary_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/taluk/dashboard/summary");
        return ResponseEntity.ok(response);
    }

}
