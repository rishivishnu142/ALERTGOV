package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/reports")
public class ReportExportController {

    @GetMapping("/taluk")
    public ResponseEntity<Map<String, Object>> taluk_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/reports/taluk");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/taluk/export")
    public ResponseEntity<Map<String, Object>> taluk_export_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/reports/taluk/export");
        return ResponseEntity.ok(response);
    }

}
