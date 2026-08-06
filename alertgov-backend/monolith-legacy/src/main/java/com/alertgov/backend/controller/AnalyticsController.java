package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @GetMapping("/district/weekly-chart")
    public ResponseEntity<Map<String, Object>> district_weekly_chart_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/analytics/district/weekly-chart");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/district/response-trend")
    public ResponseEntity<Map<String, Object>> district_response_trend_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/analytics/district/response-trend");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/district/incidents-by-type")
    public ResponseEntity<Map<String, Object>> district_incidents_by_type_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/analytics/district/incidents-by-type");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/district/broadcasts-by-month")
    public ResponseEntity<Map<String, Object>> district_broadcasts_by_month_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/analytics/district/broadcasts-by-month");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/executive/response-trend")
    public ResponseEntity<Map<String, Object>> executive_response_trend_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/analytics/executive/response-trend");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/executive/financial-impact")
    public ResponseEntity<Map<String, Object>> executive_financial_impact_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/analytics/executive/financial-impact");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/executive/taluk-performance")
    public ResponseEntity<Map<String, Object>> executive_taluk_performance_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/analytics/executive/taluk-performance");
        return ResponseEntity.ok(response);
    }

}
