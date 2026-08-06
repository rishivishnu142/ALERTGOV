package com.alertgov.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/predictions")
public class PredictionController {

    @GetMapping("/weather-models")
    public ResponseEntity<Map<String, Object>> weather_models_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/predictions/weather-models");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/risk-probability")
    public ResponseEntity<Map<String, Object>> risk_probability_get() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Mock data for GET /api/predictions/risk-probability");
        return ResponseEntity.ok(response);
    }

}
